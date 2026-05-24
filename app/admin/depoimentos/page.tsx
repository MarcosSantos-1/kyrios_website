"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  MessageSquareQuote,
  Plus,
  RefreshCw,
  Save,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { db, storage } from "../../lib/firebase";
import { revalidateTestimonials } from "../../lib/actions";
import { fallbackTestimonials, type Testimonial } from "../../lib/cms";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(query(collection(db, "testimonials"), orderBy("order", "asc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Testimonial, "id">) })));
    } catch (e) {
      setError(humanize(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addNew = () => {
    const id = `t-${Date.now()}`;
    setItems((cur) => [
      ...cur,
      {
        id,
        name: "",
        role: "",
        quote: "",
        initials: "",
        order: (cur.at(-1)?.order ?? 0) + 1,
      },
    ]);
  };

  const update = <K extends keyof Testimonial>(id: string, k: K, v: Testimonial[K]) => {
    setItems((cur) => cur.map((it) => (it.id === id ? { ...it, [k]: v } : it)));
  };

  const save = async (item: Testimonial) => {
    if (!item.name.trim() || !item.quote.trim()) {
      setError("Nome e citação são obrigatórios.");
      return;
    }
    setSaving(item.id);
    setError(null);
    try {
      const initials =
        item.initials?.trim() ||
        item.name
          .split(" ")
          .map((s) => s[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
      await setDoc(
        doc(db, "testimonials", item.id),
        { ...item, initials, updatedAt: Timestamp.now() },
        { merge: true }
      );
      await revalidateTestimonials();
      setSeededMsg("✓ Salvo");
      setTimeout(() => setSeededMsg(null), 1800);
    } catch (e) {
      setError(humanize(e));
    } finally {
      setSaving(null);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Apagar este depoimento?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      await revalidateTestimonials();
      setItems((cur) => cur.filter((it) => it.id !== id));
    } catch (e) {
      setError(humanize(e));
    }
  };

  const uploadPhoto = async (id: string, file: File) => {
    setUploadingPhoto(id);
    setError(null);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const ref = storageRef(storage, `testimonials/${id}/photo.${ext}`);
      await uploadBytes(ref, file, { contentType: file.type || "image/jpeg" });
      const url = await getDownloadURL(ref);
      update(id, "photoUrl", url);
    } catch (e) {
      setError(humanize(e));
    } finally {
      setUploadingPhoto(null);
    }
  };

  const seedDefaults = async () => {
    if (!window.confirm("Importar os 3 depoimentos padrão?")) return;
    try {
      for (const t of fallbackTestimonials) {
        await setDoc(doc(db, "testimonials", t.id), {
          ...t,
          updatedAt: Timestamp.now(),
        });
      }
      await revalidateTestimonials();
      setSeededMsg("✓ Depoimentos importados.");
      await load();
    } catch (e) {
      setError(humanize(e));
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tealDeep">Reviews</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            Depoimentos
          </h1>
          <p className="mt-1 text-sm text-ink/65">
            Aparecem na home. Os mais bem posicionados (menor número de ordem) ficam mais visíveis.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink/80 transition hover:border-tealDeep hover:text-tealDeep">
            <RefreshCw className="h-4 w-4" /> Recarregar
          </button>
          {items.length === 0 && !loading && (
            <button onClick={seedDefaults} className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-ink shadow-soft transition hover:bg-amber/90">
              <Upload className="h-4 w-4" /> Importar padrão
            </button>
          )}
          <button onClick={addNew} className="inline-flex items-center gap-2 rounded-full bg-tealDeep px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink">
            <Plus className="h-4 w-4" /> Novo depoimento
          </button>
        </div>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {seededMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-tealDeep/30 bg-tealDeep/5 px-4 py-3 text-sm text-tealDeep">
          <CheckCircle2 className="h-4 w-4" /> {seededMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-ink/65">
          <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
          Carregando…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <MessageSquareQuote className="mx-auto h-10 w-10 text-ink/30" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink">Nenhum depoimento ainda</h2>
          <p className="mt-2 text-sm text-ink/65">Crie um novo ou importe os padrões.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <article key={it.id} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex gap-0.5 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="font-mono text-[10px] text-ink/40">{it.id}</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">Nome</span>
                    <input
                      type="text"
                      value={it.name}
                      onChange={(e) => update(it.id, "name", e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-tealDeep focus:outline-none"
                    />
                  </label>
                  <label>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">Ordem</span>
                    <input
                      type="number"
                      value={it.order ?? 0}
                      onChange={(e) => update(it.id, "order", Number(e.target.value))}
                      className="mt-1 block w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-tealDeep focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">Cargo / contexto</span>
                  <input
                    type="text"
                    value={it.role}
                    onChange={(e) => update(it.id, "role", e.target.value)}
                    placeholder="Ex.: Cliente — Bustos personalizados"
                    className="mt-1 block w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-tealDeep focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">Citação</span>
                  <textarea
                    value={it.quote}
                    onChange={(e) => update(it.id, "quote", e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-tealDeep focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">Iniciais (avatar)</span>
                  <input
                    type="text"
                    maxLength={3}
                    value={it.initials}
                    onChange={(e) => update(it.id, "initials", e.target.value.toUpperCase())}
                    placeholder="Auto se vazio"
                    className="mt-1 block w-32 rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold uppercase tracking-widest focus:border-tealDeep focus:outline-none"
                  />
                </label>

                <div className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">
                    Foto da testemunha (opcional — substitui as iniciais)
                  </span>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-line bg-mist">
                      {it.photoUrl ? (
                        <Image
                          src={it.photoUrl}
                          alt={it.name || "Foto"}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-sm font-bold text-ink/40">
                          {it.initials || "?"}
                        </span>
                      )}
                    </div>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        disabled={uploadingPhoto === it.id}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadPhoto(it.id, file);
                          e.target.value = "";
                        }}
                      />
                      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink/70 transition hover:border-tealDeep hover:text-tealDeep">
                        {uploadingPhoto === it.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <ImagePlus className="h-3.5 w-3.5" />
                        )}
                        {it.photoUrl ? "Trocar foto" : "Subir foto"}
                      </span>
                    </label>
                    {it.photoUrl && (
                      <button
                        type="button"
                        onClick={() => update(it.id, "photoUrl", undefined)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => remove(it.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
                >
                  <Trash2 className="h-3 w-3" /> Remover
                </button>
                <button
                  type="button"
                  onClick={() => save(it)}
                  disabled={saving === it.id}
                  className="inline-flex items-center gap-2 rounded-full bg-tealDeep px-4 py-2 text-xs font-bold text-white transition hover:bg-ink disabled:opacity-50"
                >
                  {saving === it.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  Salvar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function humanize(e: unknown): string {
  if (typeof e === "object" && e && "code" in e) return `Firestore: ${String((e as { code: string }).code)}`;
  return "Erro inesperado.";
}

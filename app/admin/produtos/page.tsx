"use client";

import Image from "next/image";
import Link from "next/link";
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
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  GripVertical,
  Loader2,
  Package,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { db, storage } from "../../lib/firebase";
import { revalidateProducts } from "../../lib/actions";
import { works as fallbackProducts, formatPrice, type Product } from "../../data/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedProgress, setSeedProgress] = useState<string | null>(null);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Drag-and-drop state
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(query(collection(db, "products"), orderBy("order", "asc")));
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
      setProducts(list);
    } catch (e) {
      setError(humanize(e));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  /** Salva a nova ordem no Firestore em batch + invalida o cache do site. */
  const persistOrder = async (ordered: Product[]) => {
    setSavingOrder(true);
    setError(null);
    try {
      const batch = writeBatch(db);
      const now = Timestamp.now();
      ordered.forEach((p, idx) => {
        batch.update(doc(db, "products", p.id), { order: idx + 1, updatedAt: now });
      });
      await batch.commit();
      await revalidateProducts();
      setSeededMsg("✓ Ordem atualizada — primeiro vira o destaque automaticamente.");
      setTimeout(() => setSeededMsg(null), 2400);
    } catch (e) {
      setError(humanize(e));
      // Recarrega pra voltar pro estado real do banco em caso de erro.
      await load();
    } finally {
      setSavingOrder(false);
    }
  };

  /** Move um item pra cima ou pra baixo (fallback pra mobile/teclado). */
  const moveItem = async (idx: number, dir: -1 | 1) => {
    if (!products) return;
    const target = idx + dir;
    if (target < 0 || target >= products.length) return;
    const next = [...products];
    [next[idx], next[target]] = [next[target], next[idx]];
    setProducts(next);
    await persistOrder(next);
  };

  /* ---------- Drag handlers ---------- */
  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", String(idx)); } catch {}
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (hoverIdx !== idx) setHoverIdx(idx);
  };

  const handleDragLeave = (idx: number) => {
    if (hoverIdx === idx) setHoverIdx(null);
  };

  const handleDragEnd = () => {
    setDragIdx(null);
    setHoverIdx(null);
  };

  const handleDrop = async (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    const from = dragIdx;
    handleDragEnd();
    if (!products || from === null || from === idx) return;
    const next = [...products];
    const [moved] = next.splice(from, 1);
    next.splice(idx, 0, moved);
    setProducts(next);
    await persistOrder(next);
  };

  const seedFromCode = async () => {
    if (!window.confirm("Vou subir os 6 produtos atuais do código pro Firestore E enviar todas as fotos pro Storage. Pode demorar 1-2 min. Continuar?")) return;
    setSeeding(true);
    setSeededMsg(null);
    setError(null);
    try {
      let prodCount = 0;
      let imgCount = 0;
      for (let i = 0; i < fallbackProducts.length; i++) {
        const p = fallbackProducts[i];
        setSeedProgress(`(${i + 1}/${fallbackProducts.length}) ${p.title} — subindo fotos…`);

        const localImages = p.images && p.images.length > 0 ? p.images : [p.image];
        const uploadedUrls: string[] = [];

        for (const localPath of localImages) {
          if (/^https?:\/\//.test(localPath)) {
            uploadedUrls.push(localPath);
            continue;
          }
          try {
            const resp = await fetch(localPath);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const baseName = localPath.split("/").pop() || "image.webp";
            const fileName = `${Date.now()}-${baseName}`;
            const ref = storageRef(storage, `products/${p.id}/${fileName}`);
            await uploadBytes(ref, blob, { contentType: blob.type || "image/webp" });
            const url = await getDownloadURL(ref);
            uploadedUrls.push(url);
            imgCount++;
          } catch (uploadErr) {
            console.warn(`[seed] falha ao subir ${localPath}:`, uploadErr);
            uploadedUrls.push(localPath);
          }
        }

        setSeedProgress(`(${i + 1}/${fallbackProducts.length}) ${p.title} — salvando no Firestore…`);
        await setDoc(doc(db, "products", p.id), {
          ...p,
          image: uploadedUrls[0] ?? p.image,
          images: uploadedUrls,
          order: i + 1,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        prodCount++;
      }
      await revalidateProducts();
      setSeededMsg(`✓ ${prodCount} produtos no Firestore · ${imgCount} fotos no Storage.`);
      await load();
    } catch (e) {
      setError(humanize(e));
    } finally {
      setSeeding(false);
      setSeedProgress(null);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Apagar esse produto?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      await revalidateProducts();
      setProducts((cur) => cur?.filter((p) => p.id !== id) ?? null);
    } catch (e) {
      setError(humanize(e));
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tealDeep">Catálogo</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            Produtos
          </h1>
          <p className="mt-1 text-sm text-ink/65">
            Arraste para reordenar. <strong className="text-ink">O primeiro vira o destaque</strong> automaticamente na home.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink/80 transition hover:border-tealDeep hover:text-tealDeep"
          >
            <RefreshCw className="h-4 w-4" /> Recarregar
          </button>
          <Link
            href="/admin/produtos/novo"
            className="inline-flex items-center gap-2 rounded-full bg-tealDeep px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
          >
            <Plus className="h-4 w-4" />
            Novo produto
          </Link>
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-emerge-tight">
          {error}
        </div>
      )}

      {seededMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-tealDeep/30 bg-tealDeep/5 px-4 py-3 text-sm text-tealDeep animate-emerge-tight">
          <CheckCircle2 className="h-4 w-4" /> {seededMsg}
        </div>
      )}

      {savingOrder && (
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink/70 animate-emerge-tight">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-tealDeep" /> Salvando ordem…
        </div>
      )}

      {!loading && (products?.length ?? 0) === 0 && (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <Package className="mx-auto h-10 w-10 text-ink/30" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink">Firestore ainda está vazio</h2>
          <p className="mt-2 text-sm text-ink/65">
            Você pode importar os 6 produtos hardcoded de uma vez, ou criar do zero clicando em "Novo produto".
          </p>
          <button
            type="button"
            onClick={seedFromCode}
            disabled={seeding}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-bold text-ink shadow-soft transition hover:bg-amber/90 disabled:opacity-50"
          >
            {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Importar produtos (com fotos pro Storage)
          </button>
          {seedProgress && (
            <p className="mt-3 text-xs text-ink/65 animate-emerge-tight">{seedProgress}</p>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-ink/65">
          <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
          Carregando produtos…
        </div>
      ) : (products?.length ?? 0) > 0 && (
        <ul className="overflow-hidden rounded-2xl border border-line bg-white divide-y divide-line/70">
          {products?.map((p, idx) => {
            const isDragging = dragIdx === idx;
            const isHovered = dragIdx !== null && hoverIdx === idx && dragIdx !== idx;
            const insertAbove = isHovered && (dragIdx ?? 0) > idx;
            const insertBelow = isHovered && (dragIdx ?? 0) < idx;
            const isFirst = idx === 0;
            const isLast = idx === (products?.length ?? 0) - 1;

            return (
              <li
                key={p.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragLeave={() => handleDragLeave(idx)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, idx)}
                className={`relative flex items-center gap-3 px-3 py-3 transition-all md:gap-4 md:px-4 ${
                  isDragging ? "opacity-40 scale-[0.99]" : "hover:bg-mist/30"
                } ${
                  insertAbove ? "border-t-2 border-tealDeep" : ""
                } ${
                  insertBelow ? "border-b-2 border-tealDeep" : ""
                } ${isFirst ? "bg-amber/[0.04]" : ""}`}
              >
                {/* Drag handle + arrows */}
                <div className="flex shrink-0 items-center gap-0.5">
                  <span
                    className={`grid h-8 w-6 cursor-grab place-items-center rounded text-ink/35 transition hover:bg-mist hover:text-ink active:cursor-grabbing ${
                      isDragging ? "cursor-grabbing" : ""
                    }`}
                    title="Arraste para reordenar"
                    aria-hidden="true"
                  >
                    <GripVertical className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => moveItem(idx, -1)}
                      disabled={isFirst || savingOrder}
                      title="Mover pra cima"
                      aria-label={`Mover ${p.title} pra cima`}
                      className="grid h-4 w-6 place-items-center text-ink/40 transition hover:text-tealDeep disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(idx, 1)}
                      disabled={isLast || savingOrder}
                      title="Mover pra baixo"
                      aria-label={`Mover ${p.title} pra baixo`}
                      className="grid h-4 w-6 place-items-center text-ink/40 transition hover:text-tealDeep disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Position number */}
                <span className="hidden w-8 shrink-0 text-center font-mono text-xs tabular-nums text-ink/35 sm:inline">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Thumb */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-mist">
                  {p.image && (
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="56px" unoptimized />
                  )}
                  {isFirst && (
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-amber text-ink shadow-md ring-2 ring-white">
                      <Sparkles className="h-3 w-3" />
                    </span>
                  )}
                </div>

                {/* Title + meta */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-ink truncate">{p.title}</p>
                    {isFirst && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                        <Sparkles className="h-2.5 w-2.5" /> Destaque
                      </span>
                    )}
                    {p.corporate && (
                      <span className="rounded-full bg-tealBright px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Corporativo
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink/55">
                    <span className="font-mono">{p.id}</span> · {p.category}
                    {p.priceFrom !== undefined && (
                      <> · <span className="text-ink/70">{formatPrice(p.priceFrom)}</span></>
                    )}
                    {p.leadTimeDays && <> · {p.leadTimeDays}d</>}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1.5">
                  <Link
                    href={`/produtos/${p.id}`}
                    target="_blank"
                    title="Abrir página pública"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink/65 transition hover:border-tealDeep hover:text-tealDeep"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/produtos/${p.id}`}
                    title="Editar"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink/65 transition hover:border-tealDeep hover:text-tealDeep"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    title="Remover"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink/65 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function humanize(e: unknown): string {
  if (typeof e === "object" && e && "code" in e) {
    return `Firestore: ${String((e as { code: string }).code)}`;
  }
  return "Erro inesperado.";
}

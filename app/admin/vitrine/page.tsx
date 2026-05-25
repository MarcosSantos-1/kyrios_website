"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
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
  Save,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";
import { db, storage } from "../../lib/firebase";
import { revalidateSiteConfig } from "../../lib/actions";
import { fallbackSiteConfig, type SiteConfig } from "../../lib/cms";
import type { Product } from "../../data/products";

export default function VitrineConfigPage() {
  const [config, setConfig] = useState<SiteConfig>(fallbackSiteConfig);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState<number | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [cfgSnap, prodsSnap] = await Promise.all([
          getDoc(doc(db, "siteConfig", "default")),
          getDocs(query(collection(db, "products"), orderBy("order", "asc"))),
        ]);
        if (cfgSnap.exists()) setConfig({ ...fallbackSiteConfig, ...(cfgSnap.data() as SiteConfig) });
        setProducts(prodsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) })));
      } catch (e) {
        setError(humanize(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await setDoc(
        doc(db, "siteConfig", "default"),
        { ...config, updatedAt: Timestamp.now().toMillis() },
        { merge: true }
      );
      await revalidateSiteConfig();
      setSavedAt(Date.now());
    } catch (e) {
      setError(humanize(e));
    } finally {
      setSaving(false);
    }
  };

  const setHeroAvatar = (index: number, url?: string) => {
    setConfig((c) => {
      const heroAvatars = [...(c.heroAvatars ?? [])];
      heroAvatars[index] = url ?? "";
      return { ...c, heroAvatars };
    });
  };

  const uploadHeroAvatar = async (index: number, file: File) => {
    setUploadingAvatar(index);
    setError(null);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const ref = storageRef(storage, `site/hero-avatars/avatar-${index + 1}.${ext}`);
      await uploadBytes(ref, file, { contentType: file.type || "image/jpeg" });
      const url = await getDownloadURL(ref);
      setHeroAvatar(index, url);
    } catch (e) {
      setError(humanize(e));
    } finally {
      setUploadingAvatar(null);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tealDeep">Configuração do site</p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
          Vitrine & promoções
        </h1>
        <p className="mt-1 text-sm text-ink/65">
          Defina o que aparece em destaque na home, números do hero e promoções globais.
        </p>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-ink/65">
          <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
          Carregando configuração…
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Vitrine editorial" icon={Sparkles}>
            <div className="rounded-xl border border-tealDeep/20 bg-tealDeep/5 p-4 text-sm text-ink/75">
              <p className="font-display text-base font-bold text-ink">
                Destaque agora é arrastando.
              </p>
              <p className="mt-1.5 text-xs text-ink/65">
                Em <strong>Produtos</strong>, arraste o produto que você quer
                como destaque pro topo da lista. Ele vira automaticamente o card
                grande da Vitrine editorial na home.
              </p>
            </div>

            <div className="mt-5">
              <Label>Edição (texto da vitrine)</Label>
              <input
                type="text"
                value={config.vitrineEdition ?? ""}
                onChange={(e) => setConfig((c) => ({ ...c, vitrineEdition: e.target.value }))}
                placeholder="Ex.: Edição #02"
                className="block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-tealDeep focus:outline-none"
              />
            </div>
          </Card>

          <Card title="Promoção global" icon={Tag}>
            <Toggle
              label="Promoção ativa"
              description="Mostra um ribbon de desconto no site."
              value={!!config.promo?.enabled}
              onChange={(v) =>
                setConfig((c) => ({ ...c, promo: { ...(c.promo ?? {}), enabled: v } }))
              }
            />

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <Label>Texto do banner</Label>
                <input
                  type="text"
                  value={config.promo?.label ?? ""}
                  onChange={(e) =>
                    setConfig((c) => ({ ...c, promo: { ...(c.promo ?? { enabled: false }), label: e.target.value } }))
                  }
                  placeholder="Ex.: Black Friday — 20% OFF"
                  className="block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-tealDeep focus:outline-none"
                />
              </div>
              <div>
                <Label>Desconto (%)</Label>
                <input
                  type="number"
                  min={0}
                  max={90}
                  value={config.promo?.discountPct ?? ""}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      promo: {
                        ...(c.promo ?? { enabled: false }),
                        discountPct: e.target.value === "" ? undefined : Number(e.target.value),
                      },
                    }))
                  }
                  className="block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-tealDeep focus:outline-none"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-ink/55">
              💡 Pra dar desconto em produto específico, edite o produto e preencha "Preço promocional".
            </p>
          </Card>

          <Card title="Hero — Stats" icon={TrendingUp}>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label>Peças entregues</Label>
                <input
                  type="number"
                  value={config.heroStats?.deliveredCount ?? ""}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      heroStats: { ...(c.heroStats ?? {}), deliveredCount: Number(e.target.value) },
                    }))
                  }
                  className="block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-tealDeep focus:outline-none"
                />
              </div>
              <div>
                <Label>Aprovação (%)</Label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={config.heroStats?.approvalPct ?? ""}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      heroStats: { ...(c.heroStats ?? {}), approvalPct: Number(e.target.value) },
                    }))
                  }
                  className="block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-tealDeep focus:outline-none"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-ink/55">
              Aparecem ao lado das estrelas/avatares no hero da home.
            </p>

            <div className="mt-6 border-t border-line pt-5">
              <Label>Rostos dos clientes no hero</Label>
              <p className="mb-4 text-xs text-ink/55">
                Suba até 5 fotos para substituir as abreviações perto de "Dezenas de clientes satisfeitos".
              </p>
              <div className="grid gap-3 sm:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => {
                  const url = config.heroAvatars?.[index];
                  return (
                    <div key={index} className="rounded-xl border border-line bg-mist/40 p-3 text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center overflow-hidden rounded-full border-2 border-white bg-tealDeep text-xs font-bold text-white shadow-sm">
                        {url ? (
                          <Image
                            src={url}
                            alt={`Rosto ${index + 1}`}
                            width={56}
                            height={56}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        ) : (
                          `#${index + 1}`
                        )}
                      </div>
                      <label className="mt-3 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-ink/70 transition hover:border-tealDeep hover:text-tealDeep">
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          disabled={uploadingAvatar === index}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadHeroAvatar(index, file);
                            e.target.value = "";
                          }}
                        />
                        {uploadingAvatar === index ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <ImagePlus className="h-3.5 w-3.5" />
                        )}
                        {url ? "Trocar" : "Subir"}
                      </label>
                      {url && (
                        <button
                          type="button"
                          onClick={() => setHeroAvatar(index)}
                          className="mt-2 block w-full text-[11px] font-semibold text-red-500 hover:underline"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card title="Headline alternativa do hero" icon={Sparkles}>
            <Label>Frase principal (opcional)</Label>
            <input
              type="text"
              value={config.heroHeadline ?? ""}
              onChange={(e) => setConfig((c) => ({ ...c, heroHeadline: e.target.value }))}
              placeholder="Deixe vazio pra manter a padrão"
              className="block w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-tealDeep focus:outline-none"
            />
            <p className="mt-3 text-xs text-ink/55">
              ⚠️ Por enquanto não está conectada à home (precisa de ajuste no template). Salvo aqui pra uso futuro.
            </p>
          </Card>
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white/90 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <span className="text-xs text-ink/55">
          {savedAt && Date.now() - savedAt < 3000 ? (
            <span className="inline-flex items-center gap-1.5 text-tealDeep">
              <CheckCircle2 className="h-3.5 w-3.5" /> Salvo · cache do site invalidado.
            </span>
          ) : (
            "Mudanças refletem no site público em segundos após salvar."
          )}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-tealDeep px-6 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Salvar configuração
        </button>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon: typeof Sparkles; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <header className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-tealDeep" />
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">{children}</p>;
}

function Toggle({
  label, description, value, onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
        value ? "border-tealDeep bg-tealDeep/5" : "border-line bg-white hover:border-tealDeep/40"
      }`}
    >
      <span className={`mt-0.5 grid h-6 w-11 shrink-0 items-center rounded-full transition ${value ? "bg-tealDeep" : "bg-line"}`}>
        <span className={`h-5 w-5 rounded-full bg-white shadow transition ${value ? "translate-x-[1.375rem]" : "translate-x-0.5"}`} />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-bold text-ink">{label}</span>
        {description && <span className="block text-xs text-ink/60">{description}</span>}
      </span>
    </button>
  );
}

function humanize(e: unknown): string {
  if (typeof e === "object" && e && "code" in e) return `Firestore: ${String((e as { code: string }).code)}`;
  return "Erro inesperado.";
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { CheckCircle2, Loader2, Save, ShieldAlert, Trash2 } from "lucide-react";
import { db } from "../../lib/firebase";
import { revalidateProducts } from "../../lib/actions";
import type { Product, ProductCategory } from "../../data/products";
import { ImageUploader } from "./ImageUploader";

const CATEGORY_OPTIONS: ProductCategory[] = [
  "Colecionáveis",
  "Acessórios",
  "Corporativo",
  "Utilidades",
  "Casa",
  "Mimos & Brindes",
];

export type ProductFormValues = Product & {
  /** Ordem de exibição no catálogo. */
  order?: number;
};

type FormResult = { type: "success" | "error"; message: string };

type Props = {
  mode: "create" | "edit";
  initial?: Partial<ProductFormValues>;
};

const empty: ProductFormValues = {
  id: "",
  title: "",
  description: "",
  fullDescription: "",
  image: "",
  images: [],
  category: "Colecionáveis",
  features: [],
  specifications: { material: "PETG ou PLA Premium", colors: ["Diversas Cores"] },
  priceFrom: undefined,
  salePriceFrom: undefined,
  leadTimeDays: undefined,
  tags: [],
  featured: false,
  corporate: false,
  shopeeUrl: "",
  order: 999,
};

export function ProductForm({ mode, initial }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({ ...empty, ...initial });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);

  const set = <K extends keyof ProductFormValues>(k: K, v: ProductFormValues[K]) => {
    setValues((cur) => ({ ...cur, [k]: v }));
  };

  const setSpec = <K extends keyof ProductFormValues["specifications"]>(k: K, v: ProductFormValues["specifications"][K]) => {
    setValues((cur) => ({ ...cur, specifications: { ...cur.specifications, [k]: v } }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    const id = slugify(values.id || values.title);
    if (!id) { setResult({ type: "error", message: "Defina um ID/slug pro produto." }); return; }
    if (!values.title.trim()) { setResult({ type: "error", message: "Título é obrigatório." }); return; }
    if ((values.images?.length ?? 0) === 0) { setResult({ type: "error", message: "Adicione pelo menos uma imagem." }); return; }

    setSaving(true);
    try {
      const cover = values.images?.[0] ?? "";
      const rawPayload = {
        ...values,
        id,
        image: cover,
        images: values.images ?? [],
        features: values.features?.filter(Boolean) ?? [],
        tags: values.tags?.filter(Boolean) ?? [],
        priceFrom: numericOrUndef(values.priceFrom),
        salePriceFrom: numericOrUndef(values.salePriceFrom),
        leadTimeDays: numericOrUndef(values.leadTimeDays),
        order: numericOrUndef(values.order) ?? 999,
        shopeeUrl: stringOrUndef(values.shopeeUrl),
        specifications: {
          material: values.specifications.material,
          colors: values.specifications.colors,
          dimensions: stringOrUndef(values.specifications.dimensions),
        },
        updatedAt: Timestamp.now(),
        ...(mode === "create" ? { createdAt: Timestamp.now() } : {}),
      };
      const payload = stripUndefined(rawPayload);
      await setDoc(doc(db, "products", id), payload, { merge: mode === "edit" });
      await revalidateProducts();
      setResult({ type: "success", message: mode === "create" ? "Produto criado!" : "Alterações salvas!" });
      // Pequeno respiro pra o usuário ver o feedback antes de navegar.
      setTimeout(() => router.push("/admin/produtos"), 900);
    } catch (e) {
      setResult({ type: "error", message: humanize(e) });
    } finally {
      setSaving(false);
    }
  };

  const removeProduct = async () => {
    if (mode !== "edit" || !values.id) return;
    if (!window.confirm(`Apagar "${values.title}" do catálogo? Essa ação não pode ser desfeita.`)) return;
    setDeleting(true);
    setResult(null);
    try {
      await deleteDoc(doc(db, "products", values.id));
      await revalidateProducts();
      router.push("/admin/produtos");
    } catch (e) {
      setResult({ type: "error", message: humanize(e) });
      setDeleting(false);
    }
  };

  const path = `products/${values.id || slugify(values.title || "novo")}`;

  const busy = saving || deleting;

  return (
    <form onSubmit={save} className="space-y-8">
      <Section title="Imagens" subtitle="A primeira imagem é a capa.">
        <ImageUploader
          path={path}
          value={values.images ?? []}
          onChange={(urls) => set("images", urls)}
        />
      </Section>

      <Section title="Informações básicas">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" required>
            <input
              type="text"
              required
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
              className="input"
              placeholder="Ex.: Bustos personalizados"
            />
          </Field>
          <Field label="Slug / ID (URL)" hint="Sem espaços. Ex.: bustos">
            <input
              type="text"
              value={values.id}
              onChange={(e) => set("id", slugify(e.target.value))}
              className="input"
              placeholder="auto-gerado se vazio"
              disabled={mode === "edit"}
            />
          </Field>
          <Field label="Categoria">
            <input
              type="text"
              list="cat-list"
              value={values.category}
              onChange={(e) => set("category", e.target.value as ProductCategory)}
              className="input"
            />
            <datalist id="cat-list">
              {CATEGORY_OPTIONS.map((c) => <option key={c} value={c} />)}
            </datalist>
          </Field>
          <Field label="Ordem no catálogo" hint="Menor = aparece primeiro">
            <input
              type="number"
              value={values.order ?? ""}
              onChange={(e) => set("order", Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="Descrição curta (card)">
            <input
              type="text"
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              className="input"
              placeholder="1 frase, max ~80 caracteres"
            />
          </Field>
          <Field label="Tags" hint="Separadas por vírgula">
            <input
              type="text"
              value={(values.tags ?? []).join(", ")}
              onChange={(e) => set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              className="input"
              placeholder="Ex.: Alta resolução, Sob medida"
            />
          </Field>
        </div>
        <Field label="Descrição completa (página do produto)">
          <textarea
            value={values.fullDescription}
            onChange={(e) => set("fullDescription", e.target.value)}
            rows={4}
            className="input"
            placeholder="Texto longo descrevendo o produto."
          />
        </Field>
      </Section>

      <Section title="Preço & prazo">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Preço a partir de (R$)">
            <input
              type="number"
              step="0.01"
              value={values.priceFrom ?? ""}
              onChange={(e) => set("priceFrom", e.target.value === "" ? undefined : Number(e.target.value))}
              className="input"
              placeholder="Ex.: 149"
            />
          </Field>
          <Field label="Preço promocional (R$)" hint="Deixe vazio se não estiver em promoção">
            <input
              type="number"
              step="0.01"
              value={values.salePriceFrom ?? ""}
              onChange={(e) => set("salePriceFrom", e.target.value === "" ? undefined : Number(e.target.value))}
              className="input"
              placeholder="Ex.: 119"
            />
          </Field>
          <Field label="Prazo (dias úteis)">
            <input
              type="number"
              value={values.leadTimeDays ?? ""}
              onChange={(e) => set("leadTimeDays", e.target.value === "" ? undefined : Number(e.target.value))}
              className="input"
              placeholder="Ex.: 5"
            />
          </Field>
        </div>
      </Section>

      <Section title="Link da Shopee" subtitle="Se preenchido, o botão 'Ver na Shopee' aparece na página do produto.">
        <Field label="URL do produto na Shopee" hint="Cole a URL completa. Deixe vazio se não tem.">
          <input
            type="url"
            value={values.shopeeUrl ?? ""}
            onChange={(e) => set("shopeeUrl", e.target.value)}
            className="input"
            placeholder="https://shopee.com.br/kyrios3d/produto..."
          />
        </Field>
      </Section>

      <Section title="Destaques" subtitle="Listados como bullets na página do produto.">
        <TextListInput
          values={values.features ?? []}
          onChange={(arr) => set("features", arr)}
          placeholder="Ex.: Acabamento manual opcional"
        />
      </Section>

      <Section title="Especificações">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Material">
            <input
              type="text"
              value={values.specifications.material}
              onChange={(e) => setSpec("material", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Dimensões">
            <input
              type="text"
              value={values.specifications.dimensions ?? ""}
              onChange={(e) => setSpec("dimensions", e.target.value || undefined)}
              className="input"
              placeholder="Ex.: até 30cm"
            />
          </Field>
          <Field label="Cores" hint="Separadas por vírgula">
            <input
              type="text"
              value={values.specifications.colors.join(", ")}
              onChange={(e) =>
                setSpec("colors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
              }
              className="input"
            />
          </Field>
        </div>
      </Section>

      <Section title="Visibilidade">
        <div className="grid gap-3 md:grid-cols-2">
          <Toggle
            label="Destaque editorial"
            description="Aparece como hero da Vitrine editorial na home."
            value={!!values.featured}
            onChange={(v) => set("featured", v)}
          />
          <Toggle
            label="Linha corporativa"
            description="Marca como produto pra empresas/brindes."
            value={!!values.corporate}
            onChange={(v) => set("corporate", v)}
          />
        </div>
      </Section>

      <FormFooter
        busy={busy}
        saving={saving}
        deleting={deleting}
        result={result}
        mode={mode}
        onCancel={() => router.back()}
        onDelete={removeProduct}
      />

      <style jsx global>{`
        .input {
          display: block;
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #d7e2e0;
          background: #fff;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #123b3c;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input::placeholder { color: rgba(18, 59, 60, 0.35); }
        .input:focus {
          outline: none;
          border-color: #075d5d;
          box-shadow: 0 0 0 3px rgba(7, 93, 93, 0.12);
        }
        .input:disabled { background: #f0f5f4; color: rgba(18, 59, 60, 0.5); }
        textarea.input { font-family: inherit; resize: vertical; }
      `}</style>
    </form>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <header className="mb-4">
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-ink/60">{subtitle}</p>}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label, hint, required, children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[11px] text-ink/45">{hint}</p>}
    </label>
  );
}

function TextListInput({
  values, onChange, placeholder,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={v}
            onChange={(e) => {
              const copy = [...values];
              copy[i] = e.target.value;
              onChange(copy);
            }}
            className="input"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-ink/65 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label="Remover"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="rounded-full border border-dashed border-tealDeep/40 px-4 py-2 text-xs font-bold text-tealDeep hover:bg-tealDeep/5"
      >
        + Adicionar item
      </button>
    </div>
  );
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
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
        value ? "border-tealDeep bg-tealDeep/5" : "border-line bg-white hover:border-tealDeep/40"
      }`}
    >
      <span
        className={`mt-0.5 grid h-6 w-11 shrink-0 items-center rounded-full transition ${
          value ? "bg-tealDeep" : "bg-line"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition ${
            value ? "translate-x-[1.375rem]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-bold text-ink">{label}</span>
        {description && <span className="block text-xs text-ink/60">{description}</span>}
      </span>
    </button>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function numericOrUndef(v: unknown): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function stringOrUndef(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const trimmed = v.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** Remove recursivamente chaves `undefined` (defesa em profundidade, além
 *  da flag `ignoreUndefinedProperties` do Firestore). */
function stripUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => stripUndefined(v)) as unknown as T;
  }
  if (obj && typeof obj === "object" && !(obj instanceof Date)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v === undefined) continue;
      out[k] = stripUndefined(v);
    }
    return out as T;
  }
  return obj;
}

function humanize(e: unknown): string {
  if (typeof e === "object" && e && "code" in e) {
    const code = String((e as { code: string }).code);
    if (code === "permission-denied")
      return "Sem permissão pra escrever no Firestore. Verifique as regras + se o e-mail está no allowlist.";
    if (code === "invalid-argument")
      return "Algum campo está com formato inválido. Tenta de novo — se persistir, me avisa.";
    if (code === "unavailable")
      return "Sem conexão com o Firestore. Verifica sua internet.";
    return `Erro Firestore: ${code}`;
  }
  if (e instanceof Error) return e.message;
  return "Não consegui salvar. Tenta de novo.";
}

/* -------------------------------------------------------------------------- */
/* Form footer: botões + mensagem com animação emerge                          */
/* -------------------------------------------------------------------------- */

function FormFooter({
  busy, saving, deleting, result, mode, onCancel, onDelete,
}: {
  busy: boolean;
  saving: boolean;
  deleting: boolean;
  result: FormResult | null;
  mode: "create" | "edit";
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="sticky bottom-0 -mx-4 -mb-8 border-t border-line bg-white/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
      {busy ? (
        <div className="animate-emerge-tight flex items-center justify-center gap-2 py-2 text-sm text-ink/70">
          <Loader2 className="h-4 w-4 animate-spin text-tealDeep" />
          {saving ? "Salvando produto…" : "Apagando…"}
        </div>
      ) : (
        <div key={result?.message ?? "idle"} className="space-y-3">
          {result && (
            <div
              className={`animate-emerge flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm ${
                result.type === "success"
                  ? "border-tealDeep/30 bg-tealDeep/5 text-tealDeep"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {result.type === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{result.message}</span>
            </div>
          )}

          <div className="animate-emerge flex flex-wrap items-center justify-between gap-3" style={{ animationDelay: result ? "80ms" : "0ms" }}>
            {mode === "edit" ? (
              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                Apagar produto
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-ink/80 transition hover:border-ink"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-tealDeep px-6 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
              >
                <Save className="h-4 w-4" />
                {mode === "create" ? "Criar produto" : "Salvar alterações"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

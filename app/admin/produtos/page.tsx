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
} from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import {
  ArrowUpRight,
  CheckCircle2,
  Edit3,
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
  const [error, setError] = useState<string | null>(null);

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
          // Se já é URL externa (re-execução do seed), reaproveita
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
            // Fallback: mantém o path local (vai funcionar em dev mas não em prod com domínio diferente)
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
            Adicione, edite ou remova. Mudanças refletem no site público em segundos.
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
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {seededMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-tealDeep/30 bg-tealDeep/5 px-4 py-3 text-sm text-tealDeep">
          <CheckCircle2 className="h-4 w-4" /> {seededMsg}
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
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead className="bg-mist/50 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3 hidden md:table-cell">Categoria</th>
                <th className="px-4 py-3 hidden lg:table-cell">Preço</th>
                <th className="px-4 py-3 hidden lg:table-cell">Prazo</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {products?.map((p) => (
                <tr key={p.id} className="transition hover:bg-mist/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line bg-mist">
                        {p.image && (
                          <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" unoptimized />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-ink">{p.title}</p>
                        <p className="font-mono text-[10px] text-ink/45">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-bold text-ink/70">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell font-semibold text-ink">
                    {formatPrice(p.priceFrom)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-ink/70">
                    {p.leadTimeDays ? `${p.leadTimeDays} dias` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold text-ink">
                          <Sparkles className="h-2.5 w-2.5" /> Destaque
                        </span>
                      )}
                      {p.corporate && (
                        <span className="rounded-full bg-tealBright px-2 py-0.5 text-[10px] font-bold text-white">
                          Corporativo
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1.5">
                      <Link
                        href={`/produtos/${p.id}`}
                        target="_blank"
                        title="Abrir página pública"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink/65 hover:border-tealDeep hover:text-tealDeep"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/produtos/${p.id}`}
                        title="Editar"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink/65 hover:border-tealDeep hover:text-tealDeep"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        title="Remover"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink/65 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

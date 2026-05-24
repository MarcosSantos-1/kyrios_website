"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { db } from "../../../lib/firebase";
import type { Product } from "../../../data/products";
import { ProductForm } from "../../_components/ProductForm";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "products", id));
        if (!snap.exists()) {
          setError("Produto não encontrado no Firestore. Talvez tenha sido removido.");
          setLoading(false);
          return;
        }
        setProduct({ id: snap.id, ...(snap.data() as Omit<Product, "id">) });
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/produtos"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink/65 hover:text-tealDeep"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar pra produtos
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            {product?.title || "Editar produto"}
          </h1>
          {product && (
            <p className="mt-1 font-mono text-xs text-ink/45">{product.id}</p>
          )}
        </div>
        {product && (
          <Link
            href={`/produtos/${product.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink/80 transition hover:border-tealDeep hover:text-tealDeep"
          >
            <ExternalLink className="h-4 w-4" /> Abrir no site
          </Link>
        )}
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-ink/65">
          <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
          Carregando produto…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : product ? (
        <ProductForm mode="edit" initial={product} />
      ) : null}
    </div>
  );
}

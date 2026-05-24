"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/produtos"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink/65 hover:text-tealDeep"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar pra produtos
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Novo produto
        </h1>
        <p className="mt-1 text-sm text-ink/65">
          Preencha as informações e suba imagens. Tudo salvo no Firestore e Storage.
        </p>
      </header>

      <ProductForm mode="create" />
    </div>
  );
}

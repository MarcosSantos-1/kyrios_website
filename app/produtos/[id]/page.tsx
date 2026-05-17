import { works } from "../../data/products";
import { ArrowLeft, Box, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function LogoMark() {
  return (
    <span className="flex items-center">
      <img src="/assets/kyrios-logo.svg" alt="Kyrios Impressão 3D" className="h-12 w-auto" width={120} height={32} />
    </span>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = works.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7faf9] text-ink">
      {/* Header Simples */}
      <header className="container-px py-6 flex items-center justify-between bg-white border-b border-line">
        <Link href="/" className="flex items-center gap-2 text-tealDeep font-bold hover:opacity-80 transition">
          <ArrowLeft className="h-5 w-5" />
          Voltar para o Início
        </Link>
        <div className="flex items-center gap-2">
          <LogoMark />
        </div>
      </header>

      <section className="container-px py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Imagem do Produto */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Informações do Produto */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-2 text-xs font-bold text-teal">
              {product.category}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold text-ink">
              {product.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              {product.fullDescription}
            </p>

            <div className="mt-10 space-y-8">
              {/* Destaques */}
              <div>
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Check className="h-5 w-5 text-teal" />
                  Destaques do Projeto
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-ink/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Especificações Técnicas */}
              <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Especificações Técnicas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink/60 text-sm">Material</span>
                    <span className="font-semibold text-sm">{product.specifications.material}</span>
                  </div>
                  {product.specifications.dimensions && (
                    <div className="flex justify-between border-b border-line pb-2">
                      <span className="text-ink/60 text-sm">Dimensões</span>
                      <span className="font-semibold text-sm">{product.specifications.dimensions}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink/60 text-sm">Cores</span>
                    <span className="font-semibold text-sm">{product.specifications.colors.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/5511993796258?text=Olá! Gostaria de saber mais sobre o produto: ${product.title}`}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-lg bg-tealDeep px-8 py-4 text-base font-bold text-white shadow-soft transition hover:bg-ink animate-pulse-subtle"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-laser" />
                <MessageCircle className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Solicitar Orçamento</span>
              </a>
              <a
                href="https://shopee.com.br/kyrios3d"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-lg bg-[#EE4D2D] px-8 py-4 text-base font-bold text-white shadow-soft transition hover:bg-[#d73d1d] animate-pulse-subtle"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-laser" />
                <Image src="/assets/Shoppe-icon-white.png" alt="Shopee" width={20} height={20} className="relative z-10 object-contain" />
                <span className="relative z-10">Ver na Shopee</span>
              </a>
              <Link
                href="/#produtos"
                className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-8 py-4 text-base font-bold text-ink transition hover:border-teal hover:text-teal"
              >
                Ver outros produtos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="container-px py-12 border-t border-line bg-white text-center">
        <p className="text-ink/60 text-sm">
          © 2026 Kyrios Impressão 3D. Transformando ideias em realidade.
        </p>
      </footer>
    </main>
  );
}

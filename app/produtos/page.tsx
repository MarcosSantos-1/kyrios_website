import { ArrowRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { ProductCatalog } from "../components/ProductCatalog";
import { SiteFooter, SiteHeader, WHATSAPP_URL, WhatsAppIcon } from "../components/SiteChrome";
import { Reveal, StickyMobileCTA } from "../components/Interactive";
import { getProducts } from "../lib/cms";

export const metadata: Metadata = {
  title: "Catálogo — Kyrios Impressão 3D",
  description: "Explore todo o catálogo Kyrios: bustos, peças personalizadas, decoração, brindes corporativos e mais. Preços e prazos atualizados.",
};

export default async function ProdutosPage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen bg-[#f7faf9] text-ink">
      <SiteHeader activeLabel="Produtos" />

      {/* PAGE HERO */}
      <section className="relative overflow-hidden border-b border-line/70 bg-white">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]" />
        <div className="container-px relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
              <Sparkles className="h-3.5 w-3.5" /> Catálogo Kyrios
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Tudo que <span className="italic text-tealDeep">imprimimos</span>.
              <br />
              Curado, à mão.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 md:text-lg">
              Cada peça é feita sob encomenda, com PETG ou PLA premium. Use os filtros pra encontrar algo pronto — ou peça sob medida, o jeito que tem que ser.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft md:p-6">
              <Stat label="Categorias" value={`${new Set(products.map((p) => p.category)).size}`} />
              <Stat label="Produtos" value={`${products.length}`} />
              <Stat label="Prazo médio" value="5–7 dias" small />
            </dl>
            <a
              href={`${WHATSAPP_URL}?text=Olá!%20Quero%20fazer%20um%20pedido%20personalizado.`}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-tealDeep px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedir algo sob medida
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* CATALOG */}
      <section className="container-px py-12 md:py-16">
        <ProductCatalog products={products} />
      </section>

      <SiteFooter />
      <StickyMobileCTA />
    </main>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">{label}</dt>
      <dd className={`mt-1 font-display font-bold text-ink ${small ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}>
        {value}
      </dd>
    </div>
  );
}

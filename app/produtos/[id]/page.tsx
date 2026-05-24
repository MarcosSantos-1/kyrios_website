import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Home as HomeIcon,
  Layers,
  Palette,
  Ruler,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { ProductGallery } from "../../components/ProductGallery";
import { Reveal, StickyMobileCTA } from "../../components/Interactive";
import { SiteFooter, SiteHeader, WHATSAPP_URL, WhatsAppIcon } from "../../components/SiteChrome";
import { formatPrice } from "../../data/products";
import { computeEffectivePrice, getProducts, getSiteConfig } from "../../lib/cms";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

// Permite que novos produtos criados no admin sejam servidos sob demanda (ISR).
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const products = await getProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Produto não encontrado — Kyrios" };
  return {
    title: `${product.title} — Kyrios Impressão 3D`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [products, siteConfig] = await Promise.all([getProducts(), getSiteConfig()]);
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const { display: displayPrice, original: originalPrice } = computeEffectivePrice(product, siteConfig);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 3);
  const relatedFinal = related.length > 0 ? related : fallbackRelated;

  const wppMessage = `https://wa.me/5511993796258?text=Olá!%20Quero%20um%20orçamento%20de%20${encodeURIComponent(product.title)}.`;

  return (
    <main className="min-h-screen bg-[#f7faf9] text-ink">
      <SiteHeader activeLabel="Produtos" />

      {/* BREADCRUMB */}
      <nav aria-label="Caminho" className="container-px border-b border-line/60 bg-white/70 py-4 text-sm text-ink/60 backdrop-blur">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="inline-flex items-center gap-1 hover:text-teal">
              <HomeIcon className="h-3.5 w-3.5" /> Início
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
          <li>
            <Link href="/produtos" className="hover:text-teal">Catálogo</Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
          <li className="font-semibold text-ink">{product.title}</li>
        </ol>
      </nav>

      <section className="container-px py-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* GALERIA */}
          <Reveal>
            <ProductGallery images={product.images ?? [product.image]} alt={product.title} />
          </Reveal>

          {/* INFO + STICKY CARD */}
          <div className="lg:sticky lg:top-24">
            <Reveal delay={1}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-teal">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                    <Sparkles className="h-3 w-3" /> Destaque
                  </span>
                )}
                {product.corporate && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-tealBright/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    Corporativo
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink md:text-5xl lg:text-6xl">
                {product.title}
              </h1>
              <p className="mt-6 text-base leading-7 text-ink/75 md:text-lg">
                {product.fullDescription}
              </p>

              {/* PREÇO + PRAZO */}
              <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">A partir de</p>
                  {originalPrice !== undefined && (
                    <del className="mt-0.5 block text-sm font-semibold text-ink/40 line-through">{formatPrice(originalPrice)}</del>
                  )}
                  <p className="mt-1 font-display text-3xl font-bold text-ink">{formatPrice(displayPrice)}</p>
                  <p className="mt-1 text-xs text-ink/55">orçamento personalizado no WhatsApp</p>
                </div>
                <div className="border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">Prazo estimado</p>
                  <p className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-bold text-ink">
                    <Clock className="h-5 w-5 text-tealDeep" />
                    {product.leadTimeDays ? `${product.leadTimeDays} dias úteis` : "Sob consulta"}
                  </p>
                  <p className="mt-1 text-xs text-ink/55">acompanhe pelo WhatsApp</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={wppMessage}
                  className="group relative inline-flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-full bg-tealDeep px-7 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-ink animate-pulse-subtle"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-laser" />
                  <WhatsAppIcon className="h-5 w-5" />
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                {product.shopeeUrl && (
                  <a
                    href={product.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EE4D2D] px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-[#d73d1d]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Ver na Shopee
                  </a>
                )}
              </div>

              <p className="mt-3 text-center text-[11px] text-ink/50 sm:text-left">
                Pagamento por Pix, Cartão ou Boleto. Entrega pra todo o Brasil.
              </p>
            </Reveal>

            {/* Destaques + Specs */}
            <Reveal delay={2}>
              <div className="mt-10 space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                    <Check className="h-5 w-5 text-teal" /> Destaques do projeto
                  </h3>
                  <ul className="mt-4 grid gap-2.5">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-ink/80">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                          <Check className="h-3 w-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink">Especificações</h3>
                  <dl className="mt-4 divide-y divide-line/70 text-sm">
                    <SpecRow icon={Layers} label="Material" value={product.specifications.material} />
                    {product.specifications.dimensions && (
                      <SpecRow icon={Ruler} label="Dimensões" value={product.specifications.dimensions} />
                    )}
                    <SpecRow
                      icon={Palette}
                      label="Cores"
                      value={product.specifications.colors.join(", ")}
                    />
                    {product.leadTimeDays && (
                      <SpecRow icon={Truck} label="Entrega" value={`Aprox. ${product.leadTimeDays} dias úteis`} />
                    )}
                  </dl>
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink/65"
                      >
                        # {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RELACIONADOS */}
      <section className="container-px border-t border-line/70 bg-white py-16 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
                Continue explorando
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                Você também pode gostar
              </h2>
            </div>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-teal hover:text-teal"
            >
              Ver catálogo completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedFinal.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
              <Link href={`/produtos/${p.id}`}>
                <article className="tilt-card group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_rgba(18,59,60,0.06)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                      <p className="mt-0.5 text-xs text-ink/55">a partir de <strong className="text-ink">{formatPrice(p.priceFrom)}</strong></p>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink transition group-hover:bg-tealDeep group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
      <StickyMobileCTA />
    </main>
  );
}

function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <dt className="inline-flex items-center gap-2 text-ink/60">
        <Icon className="h-4 w-4 text-tealDeep" /> {label}
      </dt>
      <dd className="text-right font-semibold text-ink">{value}</dd>
    </div>
  );
}

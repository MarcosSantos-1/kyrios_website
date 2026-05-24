"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock, Filter, Package, Sparkles, Tag } from "lucide-react";
import { formatPrice, type Product, type ProductCategory } from "../data/products";

type SortKey = "destaque" | "preco-asc" | "preco-desc" | "prazo";

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: "destaque", label: "Em destaque" },
  { key: "preco-asc", label: "Menor preço" },
  { key: "preco-desc", label: "Maior preço" },
  { key: "prazo", label: "Entrega mais rápida" },
];

export function ProductCatalog({ products }: { products: Product[] }) {
  const allCategories = useMemo(() => {
    const set = new Set<ProductCategory>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const [activeCat, setActiveCat] = useState<ProductCategory | "Todos">("Todos");
  const [sort, setSort] = useState<SortKey>("destaque");

  const filtered = useMemo(() => {
    let list = activeCat === "Todos" ? products : products.filter((p) => p.category === activeCat);
    list = [...list].sort((a, b) => {
      if (sort === "preco-asc") return (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity);
      if (sort === "preco-desc") return (b.priceFrom ?? -Infinity) - (a.priceFrom ?? -Infinity);
      if (sort === "prazo") return (a.leadTimeDays ?? 99) - (b.leadTimeDays ?? 99);
      // destaque: featured primeiro, depois corporate, depois ordem original
      const aScore = (a.featured ? 2 : 0) + (a.corporate ? 1 : 0);
      const bScore = (b.featured ? 2 : 0) + (b.corporate ? 1 : 0);
      return bScore - aScore;
    });
    return list;
  }, [products, activeCat, sort]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[68px] z-20 -mx-4 mb-10 border-b border-line/70 bg-[#f7faf9]/85 px-4 py-4 backdrop-blur md:-mx-0 md:px-0 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
            <span className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/55 md:flex">
              <Filter className="h-3.5 w-3.5" /> Categoria
            </span>
            <Chip
              active={activeCat === "Todos"}
              onClick={() => setActiveCat("Todos")}
              count={products.length}
            >
              Todos
            </Chip>
            {allCategories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <Chip key={cat} active={activeCat === cat} onClick={() => setActiveCat(cat)} count={count}>
                  {cat}
                </Chip>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/55">Ordenar</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-full border border-line bg-white px-4 py-2 pr-9 text-sm font-semibold text-ink shadow-sm transition hover:border-teal focus:border-teal focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40">▾</span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink/55">
          Mostrando <strong className="text-ink">{filtered.length}</strong> {filtered.length === 1 ? "produto" : "produtos"}
          {activeCat !== "Todos" && <> em <strong className="text-ink">{activeCat}</strong></>}.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-16 text-center">
          <Package className="mx-auto h-10 w-10 text-ink/30" />
          <p className="mt-4 font-display text-2xl font-bold text-ink">Nada por aqui ainda.</p>
          <p className="mt-2 text-sm text-ink/60">Tente outra categoria — ou peça sob medida no WhatsApp.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <CatalogCard key={p.id} product={p} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  count,
  children,
  onClick,
}: {
  active: boolean;
  count: number;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-tealDeep bg-tealDeep text-white shadow-soft"
          : "border-line bg-white text-ink hover:border-teal hover:text-teal"
      }`}
    >
      {children}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
          active ? "bg-white/20 text-white" : "bg-mist text-ink/60"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function CatalogCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/produtos/${product.id}`} className="group block">
      <article className="tilt-card relative h-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_rgba(18,59,60,0.06)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent opacity-90" />
          {/* Top tags */}
          <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
              {product.category}
            </span>
            {product.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                <Sparkles className="h-3 w-3" /> Destaque
              </span>
            )}
            {product.corporate && !product.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-tealBright/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                Corporativo
              </span>
            )}
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="font-display text-xl font-bold leading-tight">{product.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-white/80">{product.description}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 p-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/55">A partir de</p>
            <p className="mt-0.5 font-display text-2xl font-bold text-ink">{formatPrice(product.priceFrom)}</p>
            {product.leadTimeDays && (
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink/60">
                <Clock className="h-3.5 w-3.5" /> Entrega ~ {product.leadTimeDays} dias úteis
              </p>
            )}
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-ink transition group-hover:bg-tealDeep group-hover:text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-line/70 px-5 py-3">
            {product.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[10px] font-semibold text-ink/65">
                <Tag className="h-2.5 w-2.5" /> {t}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

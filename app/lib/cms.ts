/**
 * Camada de dados — Firestore com cache + fallback pros dados hardcoded.
 *
 * Estratégia:
 * - Reads de servidor usam `unstable_cache` (com tags `products`, `testimonials`, `site-config`).
 * - Em produção, qualquer mutation no /admin chama `revalidateTagSafe(tag)` (server action).
 * - Se o Firestore estiver vazio ou der erro, voltamos pros dados hardcoded — o site nunca quebra.
 */

import { unstable_cache } from "next/cache";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type Firestore,
} from "firebase/firestore";
import { db } from "./firebase";
import { works as fallbackProducts, type Product } from "../data/products";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  order?: number;
  /** Optional photo URL stored in Firebase Storage. When set, replaces initials in the avatar circle. */
  photoUrl?: string;
};

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marina A.",
    role: "Cliente — Bustos personalizados",
    quote:
      "Pedi um busto de presente e o nível de detalhe me impressionou. Acabamento impecável e entrega bem antes do prazo.",
    initials: "MA",
    order: 1,
  },
  {
    id: "t2",
    name: "João P.",
    role: "Empresário — Logos em 3D",
    quote:
      "Coloquei o logo da empresa na recepção e mudou tudo. Atenderam minhas mudanças sem reclamar e o resultado ficou top.",
    initials: "JP",
    order: 2,
  },
  {
    id: "t3",
    name: "Larissa I.",
    role: "Cliente — Decoração",
    quote:
      "Conversa direta no WhatsApp, mandaram preview antes de imprimir e a peça chegou perfeita. Já encomendei outras.",
    initials: "LI",
    order: 3,
  },
];

export type SiteConfig = {
  /** ID do produto destacado na vitrine editorial. */
  featuredProductId?: string;
  /** Texto "Edição #01" exibido na vitrine. */
  vitrineEdition?: string;
  /** Promoção global (banner ou ribbon). */
  promo?: {
    enabled: boolean;
    label?: string;
    discountPct?: number;
  };
  /** Frase do hero (mantida pra futuro). */
  heroHeadline?: string;
  /** Stats do hero. */
  heroStats?: {
    deliveredCount?: number;
    approvalPct?: number;
  };
  /** Fotos exibidas nos círculos de prova social do hero. */
  heroAvatars?: string[];
  updatedAt?: number;
};

export const fallbackSiteConfig: SiteConfig = {
  vitrineEdition: "Edição #01",
  promo: { enabled: false },
  heroStats: { deliveredCount: 500, approvalPct: 98 },
};

/* -------------------------------------------------------------------------- */
/* Helpers internos                                                            */
/* -------------------------------------------------------------------------- */

async function fetchProductsFromFirestore(): Promise<Product[] | null> {
  try {
    const snap = await getDocs(query(collection(db as Firestore, "products"), orderBy("order", "asc")));
    if (snap.empty) return null;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
  } catch (err) {
    // Em build sem Firestore acessível ou regras bloqueando, falha silenciosa.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[cms] fetchProductsFromFirestore falhou, usando fallback:", err);
    }
    return null;
  }
}

async function fetchTestimonialsFromFirestore(): Promise<Testimonial[] | null> {
  try {
    const snap = await getDocs(query(collection(db as Firestore, "testimonials"), orderBy("order", "asc")));
    if (snap.empty) return null;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Testimonial, "id">) }));
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[cms] fetchTestimonialsFromFirestore falhou, usando fallback:", err);
    }
    return null;
  }
}

async function fetchSiteConfigFromFirestore(): Promise<SiteConfig | null> {
  try {
    const snap = await getDoc(doc(db as Firestore, "siteConfig", "default"));
    if (!snap.exists()) return null;
    return snap.data() as SiteConfig;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[cms] fetchSiteConfigFromFirestore falhou, usando fallback:", err);
    }
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* API pública (cached)                                                       */
/* -------------------------------------------------------------------------- */

export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const fromDb = await fetchProductsFromFirestore();
    return fromDb ?? fallbackProducts;
  },
  ["products"],
  { tags: ["products"], revalidate: 60 * 60 } // refresh por hora ou na revalidateTag
);

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const fromDb = await fetchTestimonialsFromFirestore();
    return fromDb ?? fallbackTestimonials;
  },
  ["testimonials"],
  { tags: ["testimonials"], revalidate: 60 * 60 }
);

export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    const fromDb = await fetchSiteConfigFromFirestore();
    return { ...fallbackSiteConfig, ...(fromDb ?? {}) };
  },
  ["site-config"],
  { tags: ["site-config"], revalidate: 60 * 5 }
);

/** Convenience pra pegar tudo num shot. */
export async function getHomeData() {
  const [products, testimonials, siteConfig] = await Promise.all([
    getProducts(),
    getTestimonials(),
    getSiteConfig(),
  ]);
  return { products, testimonials, siteConfig };
}

/** Acha o produto destaque da vitrine, respeitando config admin. */
export function pickFeatured(products: Product[], cfg: SiteConfig): Product {
  if (cfg.featuredProductId) {
    const match = products.find((p) => p.id === cfg.featuredProductId);
    if (match) return match;
  }
  return products.find((p) => p.featured) ?? products[0];
}

/**
 * Computes the effective display price for a product considering:
 * 1. Individual `salePriceFrom` always takes priority (and is excluded from global promo).
 * 2. Global promo discount applies only when `salePriceFrom` is not set.
 *
 * Returns `{ display, original }` where `original` is defined only when a discount is active.
 */
export function computeEffectivePrice(
  product: Pick<Product, "priceFrom" | "salePriceFrom">,
  cfg: SiteConfig
): { display: number | undefined; original: number | undefined } {
  if (product.salePriceFrom !== undefined) {
    return { display: product.salePriceFrom, original: product.priceFrom };
  }
  if (cfg.promo?.enabled && cfg.promo.discountPct) {
    const discounted =
      product.priceFrom !== undefined
        ? Math.round(product.priceFrom * (1 - cfg.promo.discountPct / 100))
        : undefined;
    return { display: discounted, original: product.priceFrom };
  }
  return { display: product.priceFrom, original: undefined };
}

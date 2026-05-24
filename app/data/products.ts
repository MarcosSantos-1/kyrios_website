export type ProductCategory =
  | "Colecionáveis"
  | "Acessórios"
  | "Corporativo"
  | "Utilidades"
  | "Casa"
  | "Mimos & Brindes";

export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  /** Primary cover image (kept for back-compat). */
  image: string;
  /** Full gallery; the first item should be the cover. */
  images?: string[];
  category: ProductCategory;
  features: string[];
  specifications: {
    material: string;
    dimensions?: string;
    colors: string[];
  };
  /** Starting price in BRL. `undefined` means "Sob consulta". */
  priceFrom?: number;
  /** Sale (promotional) starting price in BRL. */
  salePriceFrom?: number;
  /** Estimated lead time in business days. */
  leadTimeDays?: number;
  /** Visible tags shown in cards. */
  tags?: string[];
  /** Whether this product is featured in the corporate section. */
  corporate?: boolean;
  /** Whether to spotlight as the editorial hero. */
  featured?: boolean;
  /** Direct link to this product on Shopee. If set, a "Ver na Shopee" button appears. */
  shopeeUrl?: string;
}

export const works: Product[] = [
  {
    id: "bustos",
    title: "Bustos",
    description: "Réplicas detalhadas e personalizadas.",
    fullDescription:
      "Nossos bustos são impressos com a mais alta resolução para capturar cada detalhe da face e textura. Perfeitos para colecionadores, presentes exclusivos ou decoração de alto nível.",
    image: "/images/1.webp",
    images: ["/images/1.webp", "/images/4.webp", "/images/5.webp"],
    category: "Colecionáveis",
    features: ["Alta definição de detalhes", "Acabamento manual opcional", "Diversos tamanhos disponíveis"],
    specifications: {
      material: "PETG ou PLA Premium",
      dimensions: "Personalizável (até 30cm)",
      colors: ["Diversas Cores"],
    },
    priceFrom: 149,
    leadTimeDays: 7,
    tags: ["Alta resolução", "Sob medida"],
    featured: true,
  },
  {
    id: "chaveiros-1",
    title: "Itens Personalizados",
    description: "Sua marca ou ideia sempre com você.",
    fullDescription:
      "Itens Personalizados e resistentes, ideais presentes ou decoração. Podemos criar qualquer formato a partir de um modelo ou ideia sua.",
    image: "/images/2.1.webp",
    images: ["/images/2.1.webp", "/images/3.webp"],
    category: "Acessórios",
    features: ["Leve e resistente", "Design exclusivo", "Ótimo para brindes e presentes"],
    specifications: {
      material: "PETG ou PLA Premium",
      colors: ["Diversas Cores"],
    },
    priceFrom: 19,
    leadTimeDays: 5,
    tags: ["Leve", "Brinde"],
    corporate: true,
  },
  {
    id: "chaveiros-2",
    title: "Chaveiros Temáticos",
    description: "Personagens e temas variados.",
    fullDescription:
      "Coleção de chaveiros inspirados em filmes, jogos e cultura pop, também personalizáveis. Feitos com cores vibrantes e material durável.",
    image: "/images/3.webp",
    images: ["/images/3.webp", "/images/2.1.webp"],
    category: "Acessórios",
    features: ["Cores vibrantes", "Material durável", "Temas variados"],
    specifications: {
      material: "PETG ou PLA Premium",
      colors: ["Diversas Cores"],
    },
    priceFrom: 14,
    leadTimeDays: 4,
    tags: ["Cultura pop", "Cores vivas"],
  },
  {
    id: "logos-placas",
    title: "Logos e Placas",
    description: "Identidade visual em 3D para seu negócio.",
    fullDescription:
      "Transforme seu logo em uma peça física de destaque. Placas de mesa, parede ou sinalização interna com acabamento profissional.",
    image: "/images/8.webp",
    images: ["/images/8.webp", "/images/1.webp"],
    category: "Corporativo",
    features: ["Efeito 3D real", "Fácil instalação", "Durabilidade"],
    specifications: {
      material: "PETG ou PLA Premium",
      dimensions: "Sob consulta",
      colors: ["Diversas Cores"],
    },
    priceFrom: 89,
    leadTimeDays: 7,
    tags: ["Sinalização", "Identidade visual"],
    corporate: true,
  },
  {
    id: "suportes",
    title: "Suportes",
    description: "Organização e funcionalidade com design.",
    fullDescription:
      "Suportes para fones, controles, celulares e organização de mesa. Unimos utilidade com a estética da impressão 3D.",
    image: "/images/7.webp",
    images: ["/images/7.webp", "/images/6.1.webp"],
    category: "Utilidades",
    features: ["Design ergonômico", "Estabilidade", "Organização"],
    specifications: {
      material: "PETG ou PLA Premium",
      colors: ["Diversas Cores"],
    },
    priceFrom: 39,
    leadTimeDays: 5,
    tags: ["Setup", "Organização"],
  },
  {
    id: "decoracao",
    title: "Decoração",
    description: "Peças únicas para transformar ambientes.",
    fullDescription:
      "Vasos, esculturas geométricas e itens decorativos que só a impressão 3D consegue criar. Design paramétrico e moderno.",
    image: "/images/6.1.webp",
    images: ["/images/6.1.webp", "/images/5.webp", "/images/4.webp"],
    category: "Casa",
    features: ["Design exclusivo", "Leveza", "Estilo moderno"],
    specifications: {
      material: "PETG ou PLA Premium",
      colors: ["Diversas Cores"],
    },
    priceFrom: 59,
    leadTimeDays: 6,
    tags: ["Design paramétrico", "Moderno"],
  },
];

/** Localized currency formatter for BRL. */
export function formatPrice(value?: number): string {
  if (value === undefined) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export const categories: ProductCategory[] = [
  "Colecionáveis",
  "Acessórios",
  "Corporativo",
  "Utilidades",
  "Casa",
];

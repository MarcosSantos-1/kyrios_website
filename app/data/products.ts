export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  features: string[];
  specifications: {
    material: string;
    dimensions?: string;
    colors: string[];
  };
}

export const works: Product[] = [
  {
    id: "bustos",
    title: "Bustos",
    description: "Réplicas detalhadas e personalizadas.",
    fullDescription: "Nossos bustos são impressos com a mais alta resolução para capturar cada detalhe da face e textura. Perfeitos para colecionadores, presentes exclusivos ou decoração de alto nível.",
    image: "/images/1.png",
    category: "Colecionáveis",
    features: ["Alta definição de detalhes", "Acabamento manual opcional", "Diversos tamanhos disponíveis"],
    specifications: {
      material: "Resina ou PLA Premium",
      dimensions: "Personalizável (até 30cm)",
      colors: ["Bronze", "Mármore", "Cinza", "Pintura Personalizada"]
    }
  },
  {
    id: "chaveiros-1",
    title: "Itens Personalizados",
    description: "Sua marca ou ideia sempre com você.",
    fullDescription: "Itens Personalizados e resistentes, ideais presentes ou decoração. Podemos criar qualquer formato a partir de um modelo ou ideia sua.",
    image: "/images/2.1.png",
    category: "Acessórios",
    features: ["Leve e resistente", "Design exclusivo", "Ótimo para brindes e presentes"],
    specifications: {
      material: "PETG de alta resistência",
      colors: ["Diversas cores disponíveis"]
    }
  },
  {
    id: "chaveiros-2",
    title: "Chaveiros Temáticos",
    description: "Personagens e temas variados.",
    fullDescription: "Coleção de chaveiros inspirados em filmes, jogos e cultura pop, também personalizáveis. Feitos com cores vibrantes e material durável.",
    image: "/images/3.png",
    category: "Acessórios",
    features: ["Cores vibrantes", "Material durável", "Temas variados"],
    specifications: {
      material: "PLA Silk / PETG",
      colors: ["Multicolorido"]
    }
  },
  {
    id: "logos-placas",
    title: "Logos e Placas",
    description: "Identidade visual em 3D para seu negócio.",
    fullDescription: "Transforme seu logo em uma peça física de destaque. Placas de mesa, parede ou sinalização interna com acabamento profissional.",
    image: "/images/8.png",
    category: "Corporativo",
    features: ["Efeito 3D real", "Fácil instalação", "Durabilidade"],
    specifications: {
      material: "PLA / PETG",
      dimensions: "Sob consulta",
      colors: ["Cores da sua marca"]
    }
  },
  {
    id: "suportes",
    title: "Suportes",
    description: "Organização e funcionalidade com design.",
    fullDescription: "Suportes para fones, controles, celulares e organização de mesa. Unimos utilidade com a estética da impressão 3D.",
    image: "/images/7.png",
    category: "Utilidades",
    features: ["Design ergonômico", "Estabilidade", "Organização"],
    specifications: {
      material: "PETG (mais resistente)",
      colors: ["Preto", "Branco", "Cinza Espacial"]
    }
  },
  {
    id: "decoracao",
    title: "Decoração",
    description: "Peças únicas para transformar ambientes.",
    fullDescription: "Vasos, esculturas geométricas e itens decorativos que só a impressão 3D consegue criar. Design paramétrico e moderno.",
    image: "/images/6.1.png",
    category: "Casa",
    features: ["Design exclusivo", "Leveza", "Estilo moderno"],
    specifications: {
      material: "PLA Wood / Silk",
      colors: ["Madeira", "Cobre", "Ouro", "Prata"]
    }
  }
];

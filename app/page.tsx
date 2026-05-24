import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Box,
  Briefcase,
  Check,
  Clock,
  Cuboid,
  ExternalLink,
  Gift,
  Instagram,
  Layers,
  MessageSquare,
  Package,
  Palette,
  Printer,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Truck,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { formatPrice, works } from "./data/products";
import { CountUp, FAQ, Reveal, StickyMobileCTA } from "./components/Interactive";
import {
  SiteFooter,
  SiteHeader,
  WHATSAPP_CORPORATE,
  WHATSAPP_URL,
  WhatsAppIcon,
} from "./components/SiteChrome";

type IconComponent =
  | ComponentType<{ className?: string }>
  | ComponentType<SVGProps<SVGSVGElement>>;

const highlights: Array<{ title: string; text: string; icon: IconComponent }> = [
  { title: "Alta qualidade", text: "Impressões precisas com ótimo acabamento", icon: Check },
  { title: "Entrega rápida", text: "Prazos ágeis e cumpridos", icon: Sparkles },
  { title: "Atendimento humano", text: "Fale com a gente pelo WhatsApp", icon: WhatsAppIcon },
];

const strengths = [
  { icon: Cuboid, title: "Tecnologia de ponta", text: "Equipamentos precisos para garantir o melhor resultado." },
  { icon: Palette, title: "Materiais de qualidade", text: "Trabalhamos com PETG ou PLA em diversas cores." },
  { icon: Wand2, title: "Personalização completa", text: "Projetos únicos, do seu jeito, com atenção aos detalhes." },
  { icon: ShieldCheck, title: "Segurança e confiabilidade", text: "Seus dados e projetos sempre protegidos conosco." },
];

const steps: Array<{ n: string; title: string; text: string; icon: LucideIcon }> = [
  { n: "01", title: "Conte sua ideia", text: "Mande uma referência, foto ou descrição pelo WhatsApp. A gente responde rápido.", icon: MessageSquare },
  { n: "02", title: "Modelagem ou escolha", text: "Criamos do zero pra você, ou você escolhe um modelo pronto no MakerWorld.", icon: Layers },
  { n: "03", title: "Impressão premium", text: "Imprimimos com PETG ou PLA premium em alta resolução e várias cores disponíveis.", icon: Printer },
  { n: "04", title: "Entrega segura", text: "Embalamos com cuidado e enviamos pra qualquer canto do Brasil.", icon: Truck },
];

const marqueeItems = [
  "PETG Premium", "PLA Premium", "Alta resolução", "Diversas cores",
  "Entrega 5–7 dias", "Personalização total", "Atendimento humano",
  "Modelos sob medida", "Impressão FDM", "Acabamento manual",
];

const corporateUseCases: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Gift, title: "Brindes & mimos", text: "Lembranças que ninguém joga fora. Personalizadas com a sua marca." },
  { icon: Award, title: "Trofeús & placas", text: "Premiações, sinalização interna e logos em 3D pra recepção." },
  { icon: Package, title: "Kits de evento", text: "Lançamentos, feiras, treinamentos — peças únicas, em lote." },
  { icon: Briefcase, title: "Linha customizada", text: "Para sua loja, agência ou e-commerce: produção em escala, sob marca branca." },
];

const testimonials = [
  {
    name: "Marina A.",
    role: "Cliente — Bustos personalizados",
    quote: "Pedi um busto de presente e o nível de detalhe me impressionou. Acabamento impecável e entrega bem antes do prazo.",
    initials: "MA",
  },
  {
    name: "João P.",
    role: "Empresário — Logos em 3D",
    quote: "Coloquei o logo da empresa na recepção e mudou tudo. Atenderam minhas mudanças sem reclamar e o resultado ficou top.",
    initials: "JP",
  },
  {
    name: "Larissa I.",
    role: "Cliente — Decoração",
    quote: "Conversa direta no WhatsApp, mandaram preview antes de imprimir e a peça chegou perfeita. Já encomendei outras.",
    initials: "LI",
  },
];

const faqItems = [
  {
    q: "Quanto tempo leva pra ficar pronto?",
    a: "Depende do tamanho e complexidade. A maioria dos pedidos sai em 5 a 7 dias úteis. Em peças mais simples, conseguimos prazos ainda menores — sempre combinado antes na conversa.",
  },
  {
    q: "Quais materiais e cores vocês trabalham?",
    a: "Imprimimos em PETG e PLA premium. Temos várias cores disponíveis (preto, branco, verde, vermelho, dourado, transparente, e muitas outras). Se quiser uma cor específica, é só pedir e a gente combina.",
  },
  {
    q: "Qual o tamanho máximo de impressão?",
    a: "Imprimimos peças de até 30 cm em geral, mas peças maiores podem ser feitas em partes encaixadas. Mande sua ideia que a gente te diz a melhor forma.",
  },
  {
    q: "Posso mandar um modelo do MakerWorld pra vocês imprimirem?",
    a: "Sim! É só escolher o modelo no MakerWorld, copiar o link e mandar pelo WhatsApp. A gente confere a impressão, te passa o orçamento e cuida do resto.",
  },
  {
    q: "Vocês entregam pra todo o Brasil?",
    a: "Entregamos sim, pra qualquer cidade do Brasil. Para São Paulo capital, também temos opções de entrega rápida.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos Pix, cartão e boleto. Para pedidos personalizados, normalmente trabalhamos com uma reserva pra começar e o restante na finalização.",
  },
  {
    q: "Fazem pedidos em lote pra empresas?",
    a: "Fazemos sim, e amamos esses projetos. Brindes, sinalização, mimos de evento, linhas customizadas com sua marca — temos desconto progressivo e briefing dedicado. Veja a seção Corporativo aqui em cima.",
  },
];

const avatars = ["MA", "JP", "LI", "BR", "CA"];

// Featured product (editorial spotlight) + supporting cast
const featuredProduct = works.find((p) => p.featured) ?? works[0];
const supportingProducts = works.filter((p) => p.id !== featuredProduct.id);

export default function Home() {
  return (
    <main className="overflow-hidden">
      <SiteHeader activeLabel="Início" />

      {/* HERO */}
      <section id="inicio" className="relative">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="container-px relative grid min-h-0 items-start gap-8 pb-14 pt-1 md:pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20 lg:pt-4">
          <div className="hero-wave pointer-events-none absolute -left-12 -top-12 h-[400px] w-[400px] opacity-30 lg:hidden" />
          <div className="hero-wave pointer-events-none absolute -right-24 -top-24 hidden h-[800px] w-[800px] opacity-40 lg:block" />

          <div className="relative z-10 max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/70 px-4 py-2 text-xs font-bold text-ink backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-teal opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-teal" />
                </span>
                Impressoras rodando agora — Pedidos abertos
              </span>
            </Reveal>

            <Reveal delay={1} as="h1">
              <span className="mt-6 block font-display text-[3.35rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl lg:text-[4.55rem] xl:text-[5rem]">
                Ideias que ganham{" "}
                <span className="relative inline-block italic text-tealDeep">
                  forma
                  <svg viewBox="0 0 200 14" className="absolute -bottom-2 left-0 h-3 w-full text-amber" aria-hidden="true">
                    <path d="M2,9 Q50,2 100,7 T198,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                , com precisão
              </span>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-6 max-w-md text-base leading-8 text-ink/70 sm:text-lg">
                Da sua ideia ao produto final. Impressão 3D personalizada com qualidade, agilidade e atenção aos detalhes.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-7 grid gap-4 text-xs text-ink/70 sm:grid-cols-3">
                {highlights.map(({ title, text, icon: Icon }) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-tealDeep text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="block text-ink">{title}</strong>
                      <span>{text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-tealDeep px-8 py-5 text-sm font-bold text-white shadow-soft transition hover:bg-ink animate-pulse-subtle">
                  <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-laser" />
                  <WhatsAppIcon />
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <Link href="/produtos" className="inline-flex items-center justify-center rounded-full border border-line bg-white/70 px-8 py-5 text-sm font-bold text-ink backdrop-blur transition hover:border-teal hover:text-teal">
                  Ver catálogo
                </Link>
                <a
                  href="https://shopee.com.br/kyrios3d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EE4D2D] px-8 py-5 text-sm font-bold text-white shadow-soft transition hover:bg-[#d73d1d] animate-pulse-subtle"
                >
                  <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-laser" />
                  <Image src="/assets/Shoppe-icon-white.png" alt="Shopee" width={20} height={20} className="relative z-10 object-contain" />
                  <span className="relative z-10">Loja na Shopee</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={5}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {avatars.map((avatar) => (
                      <span key={avatar} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-tealDeep text-[10px] font-bold text-white">
                        {avatar}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm font-bold text-ink">
                    <span className="text-amber">★★★★★</span> 4,9/5
                    <span className="block font-normal text-ink/70">Dezenas de clientes satisfeitos</span>
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-line sm:block" />
                <div className="flex gap-8">
                  <div>
                    <p className="font-display text-3xl font-bold text-ink"><CountUp end={500} suffix="+" /></p>
                    <p className="text-xs text-ink/60">peças entregues</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-ink"><CountUp end={98} suffix="%" /></p>
                    <p className="text-xs text-ink/60">aprovação</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative z-10 min-h-[480px] lg:min-h-[780px]">
            <div className="pointer-events-none absolute -right-10 top-20 h-72 w-72 rounded-full bg-tealBright/15 blur-3xl" />
            <Image
              src="/assets/KyriosMainImage.webp"
              alt="Produtos impressos em 3D da Kyrios"
              fill
              className="object-contain object-[center_top] lg:object-[right_top]"
              priority
              sizes="(max-width: 1280px) 100vw, 55vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative isolate overflow-hidden border-y border-tealDeep/20 bg-tealDeep py-5 text-white">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-tealDeep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-tealDeep to-transparent" />
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6 font-display text-2xl font-medium uppercase tracking-wide md:text-3xl">
              {item}
              <Sparkles className="h-4 w-4 text-amber" />
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre" className="relative bg-tealDeep text-white">
        <div className="container-px relative z-10 pb-16 pt-14 md:pb-24 md:pt-20">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
              <Zap className="h-3.5 w-3.5 text-amber" />
              Por que Kyrios
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Qualidade que se vê — e se sente na mão.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Cada projeto passa pelas nossas mãos do briefing à embalagem. Sem terceirização, sem atalho.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4} className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-amber/40 hover:bg-white/[0.07]">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 transition group-hover:bg-amber/20">
                  <Icon className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
                <span className="pointer-events-none absolute right-5 top-5 text-[11px] font-bold tabular-nums text-white/25">0{i + 1}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="relative bg-[#f7faf9] py-20 md:py-28">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(180deg,transparent,black_20%,black_80%,transparent)]" />
        <div className="container-px relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
              <Sparkles className="h-3.5 w-3.5" />
              Como funciona
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              Da ideia à <span className="italic text-tealDeep">peça na mão</span> em 4 passos
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-ink/70 md:text-lg">
              Um processo simples, sem enrolação. Você acompanha cada etapa pelo WhatsApp.
            </p>
          </Reveal>

          <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-8 right-8 top-10 hidden h-px lg:block" aria-hidden="true">
              <svg className="h-px w-full" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="#147678" strokeDasharray="4 6" strokeOpacity="0.35" />
              </svg>
            </div>
            {steps.map(({ n, title, text, icon: Icon }, i) => (
              <Reveal key={n} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4} className="relative">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_10px_30px_rgba(18,59,60,0.05)] transition hover:-translate-y-2 hover:border-teal/40 hover:shadow-[0_20px_50px_rgba(18,59,60,0.12)]">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl font-bold tracking-tight text-tealDeep/15 group-hover:text-tealDeep/30">{n}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-tealDeep text-white transition group-hover:rotate-6 group-hover:bg-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SHOWCASE */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="container-px py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-tealBright/30 via-transparent to-amber/20 blur-2xl" />
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-glow">
                  <video
                    src="/assets/mp_.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="aspect-[9/16] h-auto w-full object-cover sm:aspect-video"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-amber opacity-80" />
                      <span className="relative h-2 w-2 rounded-full bg-amber" />
                    </span>
                    Produção
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber">
                <Printer className="h-3.5 w-3.5" />
                Veja a mágica acontecer
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Sua peça nascendo, <span className="italic text-tealBright">camada por camada</span>.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg">
                Toda peça que sai da produção passa por essa mesma cadência: precisão, atenção e zero pressa pra entregar bem feito.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/80">
                {[
                  "Impressoras calibradas pra cada projeto",
                  "Acompanhamento em tempo real pelo WhatsApp",
                  "Preview do modelo antes de iniciar",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-tealBright/20 text-tealBright">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href={`${WHATSAPP_URL}?text=Olá!%20Vi%20o%20vídeo%20no%20site%20e%20quero%20fazer%20um%20orçamento.`} className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-7 py-4 text-sm font-bold text-ink shadow-[0_18px_40px_rgba(232,163,61,0.35)] transition hover:bg-white">
                  <WhatsAppIcon className="h-5 w-5" />
                  Quero a minha peça
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a href="https://www.instagram.com/kyrios_3d/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                  <Instagram className="h-4 w-4" />
                  Mais bastidores no Insta
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRODUTOS — EDITORIAL */}
      <section id="produtos" className="relative bg-[#f7faf9] py-20 md:py-28">
        <div className="container-px">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
                    <Box className="h-3.5 w-3.5" />
                    Vitrine editorial
                  </span>
                  <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40 sm:inline">
                    Edição #01 · {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink md:text-6xl lg:text-7xl">
                  Esta semana, em <span className="italic text-tealDeep">destaque</span> —
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 md:text-lg">
                  Uma seleção curada do que está saindo da produção. Cada peça é prova de que detalhes não são detalhes.
                </p>
              </div>
              <Link
                href="/produtos"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-tealDeep"
              >
                Catálogo completo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Magazine spread: 1 featured + 2 stacked */}
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <FeaturedSpread product={featuredProduct} />
            </Reveal>

            <div className="grid gap-6 lg:col-span-5">
              {supportingProducts.slice(0, 2).map((p, i) => (
                <Reveal key={p.id} delay={(i + 1) as 1 | 2}>
                  <SecondarySpread product={p} index={i + 2} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Horizontal scroll strip with the rest */}
          {supportingProducts.length > 2 && (
            <Reveal delay={3}>
              <div className="mt-12 border-t border-line/70 pt-10">
                <div className="mb-5 flex items-end justify-between">
                  <p className="font-display text-xl font-bold text-ink">
                    Mais do nosso trabalho
                    <span className="ml-3 text-sm font-normal text-ink/50">deslize →</span>
                  </p>
                  <Link href="/produtos" className="text-sm font-bold text-tealDeep hover:underline">
                    Ver tudo
                  </Link>
                </div>
                <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4">
                  {supportingProducts.slice(2).map((p, i) => (
                    <StripCard key={p.id} product={p} index={i + 4} />
                  ))}
                  {/* Custom CTA tile at the end */}
                  <Link
                    href="/produtos"
                    className="group flex w-[260px] shrink-0 snap-start flex-col items-start justify-between gap-6 rounded-2xl border border-dashed border-tealDeep/40 bg-mist/40 p-6 transition hover:border-tealDeep hover:bg-mist"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tealDeep text-white">
                      <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-12" />
                    </span>
                    <div>
                      <p className="font-display text-2xl font-bold leading-tight text-ink">Ver tudo no catálogo</p>
                      <p className="mt-2 text-sm text-ink/65">Filtros, preços e prazos por categoria.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* CTA BANNER */}
        <Reveal as="section" className="container-px mt-16 lg:mt-20">
          <div className="isolate mx-auto flex min-h-[260px] max-w-4xl items-center justify-center bg-[url('/assets/HeroButtonBackground.webp')] bg-contain bg-center bg-no-repeat px-4 py-10 md:min-h-[300px] md:py-12 lg:min-h-[400px] lg:max-w-6xl lg:py-16 xl:min-h-[460px] xl:max-w-7xl">
            <a
              href={WHATSAPP_URL}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/65 bg-gradient-to-b from-white/50 via-white/22 to-white/[0.12] px-10 py-4 text-sm font-bold text-ink shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_8px_32px_rgba(18,59,60,0.12)] backdrop-blur-2xl transition duration-300 md:px-12 md:py-5 md:text-base hover:border-white/90 hover:from-white/65 hover:via-white/35 hover:to-white/18 animate-pulse-subtle"
            >
              <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-laser" />
              Faça seu orçamento agora
            </a>
          </div>
        </Reveal>
      </section>

      {/* CORPORATIVO */}
      <section id="corporativo" className="relative overflow-hidden bg-sand text-ink">
        <div className="pointer-events-none absolute inset-0 grain-light opacity-60" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-tealDeep/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-amber/20 blur-3xl" />

        <div className="container-px relative py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/80 backdrop-blur">
                  <Briefcase className="h-3.5 w-3.5 text-tealDeep" />
                  Para sua empresa
                </span>
                <span className="hidden h-px w-12 bg-ink/20 sm:block" />
              </div>

              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink md:text-5xl lg:text-6xl">
                Brindes, mimos & peças sob medida.{" "}
                <span className="italic text-tealDeep">Em escala.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-ink/75 md:text-lg">
                Linhas customizadas para sua empresa, agência ou e-commerce. Da ideação à entrega — com a sua marca,
                sua cor, sua história. Desconto progressivo a partir de 10 unidades.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <CorporateStat label="Mínimo" value="10 un" />
                <CorporateStat label="Desconto" value="até 30%" />
                <CorporateStat label="Prazo" value="10–14 dias" />
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_CORPORATE}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(18,59,60,0.25)] transition hover:bg-tealDeep"
                >
                  <Briefcase className="h-4 w-4" />
                  Solicitar proposta corporativa
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <Link
                  href="/produtos?categoria=Corporativo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-white/70 px-6 py-4 text-sm font-bold text-ink backdrop-blur transition hover:border-tealDeep hover:bg-white"
                >
                  Ver linha corporativa
                </Link>
              </div>

              <p className="mt-5 inline-flex items-center gap-2 text-xs text-ink/60">
                <ShieldCheck className="h-4 w-4 text-tealDeep" />
                NDA e marca branca disponíveis sob solicitação.
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div className="grid gap-4 sm:grid-cols-2">
                {corporateUseCases.map(({ icon: Icon, title, text }, i) => (
                  <article
                    key={title}
                    className={`tilt-card group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/90 p-6 backdrop-blur shadow-[0_10px_30px_rgba(18,59,60,0.06)] ${
                      i % 2 === 1 ? "sm:mt-8" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-tealDeep text-white transition group-hover:rotate-6 group-hover:bg-ink">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-2xl font-bold text-tealDeep/15">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MAKERWORLD */}
      <section id="modelos-3d" className="relative overflow-hidden bg-gradient-to-br from-mist via-white to-mist py-20 md:py-28">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-tealBright/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-amber/15 blur-3xl" />
        <div className="container-px relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber">
                <Layers className="h-3.5 w-3.5" />
                Biblioteca infinita
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                Não achou? Tem <span className="italic text-tealDeep">milhares</span> de modelos prontos.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-ink/75 md:text-lg">
                A gente é parceira do MakerWorld — a maior biblioteca de modelos 3D do mundo, oficial da Bambu Lab. Você escolhe, manda o link, e nós imprimimos pra você.
              </p>

              <ol className="mt-8 space-y-4">
                {[
                  { n: "1", t: "Explora o MakerWorld", d: "Bustos, decoração, peças funcionais, brinquedos — tem de tudo." },
                  { n: "2", t: "Copia o link do modelo", d: "Qualquer modelo, qualquer tamanho." },
                  { n: "3", t: "Manda no WhatsApp", d: "A gente confere, te dá o orçamento e imprime." },
                ].map((step) => (
                  <li key={step.n} className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tealDeep font-display text-base font-bold text-white">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-ink">{step.t}</p>
                      <p className="mt-0.5 text-sm text-ink/65">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://makerworld.com/en/3d-models"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-tealDeep"
                >
                  Explorar modelos no MakerWorld
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={`${WHATSAPP_URL}?text=Olá!%20Encontrei%20um%20modelo%20no%20MakerWorld%20e%20quero%20um%20orçamento.%20Link:%20`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/40 bg-white px-7 py-4 text-sm font-bold text-ink transition hover:border-teal hover:bg-teal hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Já tenho um modelo
                </a>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-tealBright/20 via-amber/10 to-tealDeep/15 blur-2xl" />
                <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                  <div className="flex items-center gap-2 border-b border-line bg-mist/60 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] font-mono text-ink/60">
                      <span className="text-ink/40">makerworld.com</span>/en/3d-models
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4 sm:gap-3 sm:p-5">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-mist to-line"
                      >
                        <div className="absolute inset-0 grid place-items-center">
                          <Cuboid className="h-8 w-8 text-tealDeep/40 transition group-hover:rotate-12 group-hover:text-tealDeep/70" style={{ transform: `rotate(${(i * 17) % 30 - 15}deg)` }} />
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-tealDeep/60 to-amber/60 opacity-70" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-line bg-mist/40 px-5 py-3 text-xs text-ink/60">
                    <span>Mais de <strong className="text-ink">100 mil</strong> modelos</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-tealDeep">
                      Bambu Lab oficial <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="relative bg-[#f7faf9] py-20 md:py-28">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber">
              <Star className="h-3.5 w-3.5 fill-current" />
              Clientes Kyrios
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              Quem confiou, <span className="italic text-tealDeep">recomenda</span>.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
                <figure className="tilt-card relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_10px_30px_rgba(18,59,60,0.05)]">
                  <Quote className="absolute right-5 top-5 h-10 w-10 text-tealDeep/10" />
                  <div className="flex gap-0.5 text-amber">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-lg leading-7 text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-tealDeep text-xs font-bold text-white">
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{t.name}</p>
                      <p className="text-xs text-ink/60">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-[#f7faf9] pb-20 md:pb-28">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
                Dúvidas
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
                Perguntas <span className="italic text-tealDeep">comuns</span>.
              </h2>
              <p className="mt-5 text-base leading-7 text-ink/70">
                Se não achar o que procura, manda mensagem direto no WhatsApp — a gente responde rapidinho.
              </p>
              <a
                href={WHATSAPP_URL}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-tealDeep px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Tirar dúvida agora
              </a>
            </Reveal>
            <Reveal delay={1}>
              <FAQ items={faqItems} />
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
      <StickyMobileCTA />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Vitrine helpers                                                            */
/* -------------------------------------------------------------------------- */

function FeaturedSpread({ product }: { product: (typeof works)[number] }) {
  return (
    <Link href={`/produtos/${product.id}`} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(18,59,60,0.25)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist md:aspect-[5/4]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
            <Sparkles className="h-3 w-3" /> Em destaque
          </span>
          <span className="absolute right-5 top-5 font-display text-3xl font-bold leading-none tabular-nums text-white/80">
            01
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
              {product.category}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-[1.05] md:text-4xl lg:text-5xl">
              {product.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-base">
              {product.description}
            </p>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">A partir de</span>
                  <span className="font-display text-2xl font-bold text-white">{formatPrice(product.priceFrom)}</span>
                </span>
                {product.leadTimeDays && (
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <Clock className="h-3.5 w-3.5" /> Entrega ~ {product.leadTimeDays} dias
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-ink transition group-hover:bg-amber">
                Ver detalhes
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SecondarySpread({ product, index }: { product: (typeof works)[number]; index: number }) {
  return (
    <Link href={`/produtos/${product.id}`} className="group block h-full">
      <article className="tilt-card relative grid h-full grid-cols-[1fr_1.2fr] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_rgba(18,59,60,0.06)]">
        <div className="relative overflow-hidden bg-mist">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-col justify-between gap-3 p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-teal">
                {product.category}
              </span>
              <span className="font-display text-xl font-bold tabular-nums text-ink/15">
                0{index}
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-bold leading-tight text-ink">{product.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs text-ink/60">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink/50">A partir de</p>
              <p className="font-display text-lg font-bold text-ink">{formatPrice(product.priceFrom)}</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink transition group-hover:bg-tealDeep group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function StripCard({ product, index }: { product: (typeof works)[number]; index: number }) {
  return (
    <Link
      href={`/produtos/${product.id}`}
      className="group flex w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:border-teal/40 hover:shadow-[0_18px_40px_-15px_rgba(18,59,60,0.18)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="260px"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
          0{index}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/55">{product.category}</p>
          <h4 className="mt-1 font-display text-lg font-bold leading-tight text-ink">{product.title}</h4>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-bold text-ink">{formatPrice(product.priceFrom)}</span>
          <ArrowRight className="h-4 w-4 text-ink/40 transition group-hover:translate-x-1 group-hover:text-tealDeep" />
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 text-[9px] font-semibold text-ink/60">
                <Tag className="h-2.5 w-2.5" /> {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function CorporateStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white/80 p-4 backdrop-blur">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}

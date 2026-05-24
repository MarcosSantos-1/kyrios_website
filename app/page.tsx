import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  Cuboid,
  ExternalLink,
  Headphones,
  Instagram,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  PackageCheck,
  Palette,
  Printer,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { works } from "./data/products";
import { CountUp, FAQ, Reveal, StickyMobileCTA } from "./components/Interactive";

const navItems = ["Início", "Sobre", "Como funciona", "Produtos", "Modelos 3D", "Contato"];
type IconComponent = ComponentType<{ className?: string }> | ComponentType<SVGProps<SVGSVGElement>>;

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
];

const avatars = ["MA", "JP", "LI", "BR", "CA"];

const footerBenefits: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: PackageCheck, title: "Impressão 3D de qualidade", text: "Materiais resistentes e acabamento premium" },
  { icon: Truck, title: "Entrega rápida e segura", text: "Para todo o Brasil" },
  { icon: Headphones, title: "Atendimento humano", text: "Fale diretamente com a gente" },
  { icon: ShieldCheck, title: "Pagamento seguro", text: "Pix, Cartão e Boleto" },
];

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.13 0C5.61 0 .3 5.31.3 11.83c0 2.08.54 4.12 1.58 5.91L.2 24l6.4-1.68a11.8 11.8 0 0 0 5.53 1.41h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.45-8.42ZM12.14 21.73h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.22-3.8 1 1.01-3.7-.24-.38a9.78 9.78 0 0 1-1.5-5.23c0-5.42 4.42-9.83 9.86-9.83 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.95c0 5.43-4.42 9.84-9.79 9.89Zm5.38-7.36c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.19.29-.77.96-.94 1.15-.17.2-.35.22-.64.07-.29-.14-1.24-.46-2.36-1.46a8.8 8.8 0 0 1-1.63-2.02c-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.03-.52-.07-.14-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.03 1-1.03 2.44 0 1.45 1.06 2.84 1.2 3.04.15.2 2.08 3.17 5.03 4.45.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.74-.71 1.99-1.39.24-.68.24-1.27.17-1.39-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* HEADER */}
      <header className="container-px sticky top-0 z-30 flex items-center justify-between py-3 backdrop-blur supports-[backdrop-filter]:bg-white/65 md:py-4">
        <a href="#inicio" className="flex items-center gap-3">
          <LogoMark />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink/90 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-").normalize("NFD").replace(/[̀-ͯ]/g, "")}`}
              className={index === 0 ? "border-b border-teal pb-1 text-teal" : "relative transition hover:text-teal"}
            >
              {item}
            </a>
          ))}
        </nav>
        <a href="https://wa.me/5511993796258" className="hidden items-center gap-2 rounded-full bg-tealDeep px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-ink md:flex">
          <WhatsAppIcon />
          Fale no WhatsApp
        </a>
      </header>

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
                <a href="https://wa.me/5511993796258" className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-tealDeep px-8 py-5 text-sm font-bold text-white shadow-soft transition hover:bg-ink animate-pulse-subtle">
                  <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-laser" />
                  <WhatsAppIcon />
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a href="#produtos" className="inline-flex items-center justify-center rounded-full border border-line bg-white/70 px-8 py-5 text-sm font-bold text-ink backdrop-blur transition hover:border-teal hover:text-teal">
                  Ver produtos
                </a>
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

      {/* SOBRE / POR QUE ESCOLHER */}
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
                Toda peça que sai do ateliê passa por essa mesma cadência: precisão, atenção e zero pressa pra entregar bem feito.
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
                <a href="https://wa.me/5511993796258?text=Olá!%20Vi%20o%20vídeo%20no%20site%20e%20quero%20fazer%20um%20orçamento." className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-7 py-4 text-sm font-bold text-ink shadow-[0_18px_40px_rgba(232,163,61,0.35)] transition hover:bg-white">
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

      {/* PRODUTOS */}
      <section id="produtos" className="container-px relative bg-[#f7faf9] py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
              <Box className="h-3.5 w-3.5" />
              Nossos trabalhos
            </span>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink">
              Ideias que <span className="italic text-tealDeep">ganham forma</span>.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              Cada projeto é impresso com precisão, atenção aos detalhes e paixão pelo que fazemos.
            </p>
            <a href="https://wa.me/5511993796258" className="mt-8 inline-flex items-center gap-3 rounded-full border border-teal/40 px-7 py-4 text-sm font-bold text-ink transition hover:bg-teal hover:text-white">
              Quero um projeto único <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-10 rounded-2xl border border-line bg-white p-5">
              <p className="font-display text-3xl font-bold text-ink">
                <CountUp end={500} suffix="+" /> projetos
              </p>
              <p className="mt-1 text-sm text-ink/60">entregues nos últimos meses</p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work, i) => (
              <Reveal key={work.id} delay={(((i % 3) + 1) as 1 | 2 | 3)}>
                <Link href={`/produtos/${work.id}`}>
                  <article className="tilt-card group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_35px_rgba(18,59,60,0.06)]">
                    <div className="relative aspect-[1.08] overflow-hidden bg-[#eef3f2]">
                      <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
                        <Box className="h-3 w-3 text-teal" /> {work.category}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-ink backdrop-blur-sm">
                          Ver detalhes <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold text-ink">{work.title}</h3>
                      <p className="mt-2 text-sm text-ink/65 line-clamp-2">{work.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal">
                          <Sparkles className="h-3.5 w-3.5" /> Premium
                        </span>
                        <span className="text-xs font-semibold text-ink/50 transition group-hover:text-teal">
                          Ver detalhes →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <Reveal as="section" className="mt-16 lg:mt-20">
          <div className="isolate mx-auto flex min-h-[260px] max-w-4xl items-center justify-center bg-[url('/assets/HeroButtonBackground.webp')] bg-contain bg-center bg-no-repeat px-4 py-10 md:min-h-[300px] md:py-12 lg:min-h-[400px] lg:max-w-6xl lg:py-16 xl:min-h-[460px] xl:max-w-7xl">
            <a
              href="https://wa.me/5511993796258"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/65 bg-gradient-to-b from-white/50 via-white/22 to-white/[0.12] px-10 py-4 text-sm font-bold text-ink shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_8px_32px_rgba(18,59,60,0.12)] backdrop-blur-2xl transition duration-300 md:px-12 md:py-5 md:text-base hover:border-white/90 hover:from-white/65 hover:via-white/35 hover:to-white/18 animate-pulse-subtle"
            >
              <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-laser" />
              Faça seu orçamento agora
            </a>
          </div>
        </Reveal>
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
                  href="https://wa.me/5511993796258?text=Olá!%20Encontrei%20um%20modelo%20no%20MakerWorld%20e%20quero%20um%20orçamento.%20Link:%20"
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
                        style={{ animationDelay: `${i * 120}ms` }}
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
                href="https://wa.me/5511993796258"
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

      {/* FOOTER */}
      <footer id="contato" className="bg-tealDeep text-white">
        <div className="container-px grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-20">
          <div>
            <LogoMark2 />
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/78">
              Impressão 3D de qualidade para transformar ideias em produtos reais.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/5511993796258" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/kyrios_3d/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://shopee.com.br/kyrios3d" target="_blank" rel="noopener noreferrer" aria-label="Loja na Shopee" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                <ShoppingBag className="h-5 w-5" />
              </a>
            </div>
          </div>
          <FooterList title="Navegação" items={navItems} />
          <FooterList
            title="Produtos"
            items={["Busto", "Itens Personalizados", "Chaveiros Personalizados", "Placas e Logos", "Porta fotos / quadros", "Decoração", "Peças Técnicas", "e muito mais."]}
          />
          <div>
            <h3 className="font-display text-lg font-bold">Fale conosco</h3>
            <a href="https://wa.me/5511993796258" className="mt-6 flex items-center justify-between rounded-xl border border-white/20 p-4 transition hover:bg-white/10">
              <span className="flex items-center gap-3">
                <WhatsAppIcon />
                <span>
                  <strong className="block">WhatsApp</strong>(11) 99379-6258
                </span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="https://shopee.com.br/kyrios3d" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between rounded-xl border border-white/20 p-4 transition hover:bg-white/10">
              <span className="flex items-center gap-3">
                <Image src="/assets/Shoppe-icon-white.png" alt="Shopee" width={20} height={20} className="object-contain" />
                <span>
                  <strong className="block">Loja na Shopee</strong>shopee.com.br/kyrios3d
                </span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="mt-6 space-y-4 text-sm text-white/78">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5" /> contato@kyrios3d.com</p>
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5" /> São Paulo - SP</p>
            </div>
          </div>
        </div>
        <div className="container-px grid gap-5 border-t border-white/14 py-8 text-sm text-white/75 md:grid-cols-4">
          {footerBenefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="h-8 w-8 text-white/90" />
              <p><strong className="block text-white">{title}</strong>{text}</p>
            </div>
          ))}
        </div>
        <div className="container-px flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Kyrios Impressão 3D. Todos os direitos reservados.</p>
          <p className="flex gap-8">
            <a href="#inicio">Política de Privacidade</a>
            <a href="#inicio">Termos de Uso</a>
          </p>
        </div>
      </footer>

      <StickyMobileCTA />
    </main>
  );
}

function LogoMark() {
  return (
    <Image
      src="/assets/kyrios-logo.png"
      alt="Kyrios Impressão 3D"
      width={220}
      height={60}
      className="h-14 w-auto md:h-16"
      priority
    />
  );
}

function LogoMark2() {
  return (
    <Image
      src="/assets/kyrios-logo.png"
      alt="Kyrios Impressão 3D"
      width={220}
      height={60}
      className="h-16 w-auto md:h-20 brightness-0 invert"
    />
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <ul className="mt-6 space-y-3 text-sm text-white/78">
        {items.map((item) => (
          <li key={item}>
            <a href="#inicio" className="hover:text-white">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

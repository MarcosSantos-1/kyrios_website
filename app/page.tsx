import {
  ArrowRight,
  Box,
  Check,
  Cuboid,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Palette,
  Play,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { works } from "./data/products";

const navItems = ["Início", "Sobre", "Produtos", "Como funciona", "Contato"];
type IconComponent = ComponentType<{ className?: string }> | ComponentType<SVGProps<SVGSVGElement>>;

const highlights: Array<{ title: string; text: string; icon: IconComponent }> = [
  { title: "Alta qualidade", text: "Impressões precisas com ótimo acabamento", icon: Check },
  { title: "Entrega rápida", text: "Prazos ágeis e cumpridos", icon: Sparkles },
  { title: "Atendimento humano", text: "Fale com a gente pelo WhatsApp", icon: WhatsAppIcon },
];

const strengths = [
  {
    icon: Cuboid,
    title: "Tecnologia de ponta",
    text: "Equipamentos precisos para garantir o melhor resultado.",
  },
  {
    icon: Palette,
    title: "Materiais de qualidade",
    text: "Trabalhamos com PETG ou PLA em diversas cores.",
  },
  {
    icon: Wand2,
    title: "Personalização completa",
    text: "Projetos únicos, do seu jeito, com atenção aos detalhes.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e confiabilidade",
    text: "Seus dados e projetos sempre protegidos conosco.",
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
      <header className="container-px relative z-20 flex items-center justify-between py-3 md:py-4">
        <a href="#inicio" className="flex items-center gap-3">
          <LogoMark />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink/90 lg:flex">
          {navItems.map((item, index) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className={index === 0 ? "border-b border-teal pb-1 text-teal" : "hover:text-teal"}>
              {item}
            </a>
          ))}
        </nav>
        <a href="https://wa.me/5511993796258" className="hidden items-center gap-2 rounded-lg bg-tealDeep px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-ink md:flex">
          <WhatsAppIcon />
          Fale no WhatsApp
        </a>
      </header>

      <section id="inicio" className="container-px relative grid min-h-0 items-start gap-8 pb-14 pt-1 md:pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20 lg:pt-4">
        <div className="hero-wave pointer-events-none absolute -left-12 -top-12 h-[400px] w-[400px] opacity-30 lg:hidden" />
        <div className="hero-wave pointer-events-none absolute -right-24 -top-24 hidden h-[800px] w-[800px] opacity-40 lg:block" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8efee] px-4 py-2 text-xs font-bold text-ink">
            <Box className="h-4 w-4 text-teal" />
            Impressão 3D de Qualidade
          </span>
          <h1 className="mt-6 font-display text-[3.35rem] font-bold leading-[0.95] tracking-normal text-ink sm:text-7xl lg:text-[4.55rem] xl:text-[5rem]">
            Ideias que ganham forma, com precisão
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-ink/70 sm:text-lg">
            Da sua ideia ao produto final. Impressão 3D personalizada com qualidade, agilidade e atenção aos detalhes.
          </p>

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

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/5511993796258" className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-lg bg-tealDeep px-8 py-5 text-sm font-bold text-white shadow-soft transition hover:bg-ink animate-pulse-subtle">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-laser" />
              <WhatsAppIcon />
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#produtos" className="inline-flex items-center justify-center rounded-lg border border-line bg-white/70 px-8 py-5 text-sm font-bold text-ink transition hover:border-teal hover:text-teal">
              Ver produtos
            </a>
            <a
              href="https://shopee.com.br/kyrios3d"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg bg-[#EE4D2D] px-8 py-5 text-sm font-bold text-white shadow-soft transition hover:bg-[#d73d1d] animate-pulse-subtle"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-laser" />
              <Image src="/assets/Shoppe-icon-white.png" alt="Shopee" width={20} height={20} className="relative z-10 object-contain" />
              <span className="relative z-10">Loja na Shopee</span>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((avatar) => (
                <span key={avatar} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-tealDeep text-[10px] font-bold text-white">
                  {avatar}
                </span>
              ))}
            </div>
            <div className="text-sm font-bold text-ink">
              <span className="text-[#ff9f1c]">★★★★★</span> 4,9/5
              <span className="block font-normal text-ink/70">Dezenas de clientes satisfeitos</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 min-h-[480px] lg:min-h-[780px]">
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
      </section>

      <section id="sobre" className="relative bg-tealDeep text-white">
        <div className="absolute -top-12 left-0 h-16 w-full rounded-t-[52%] bg-tealDeep" />
        <div className="container-px relative z-10 pb-16 pt-12 md:pb-20">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">Por que escolher a Kyrios?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map(({ icon: Icon, title, text }) => (
              <article key={title} className="text-center">
                <Icon className="mx-auto h-12 w-12 stroke-[1.5]" />
                <h3 className="mx-auto mt-5 max-w-[12rem] text-lg font-bold leading-tight">{title}</h3>
                <p className="mx-auto mt-5 max-w-[16rem] text-sm leading-7 text-white/82">{text}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section id="produtos" className="container-px bg-[#f7faf9] py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8efee] px-4 py-2 text-xs font-bold">
              <Box className="h-4 w-4 text-teal" />
              Nossos trabalhos
            </span>
            <h2 className="mt-5 font-display text-5xl font-bold leading-tight text-ink">Ideias que ganham forma.</h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">Cada projeto e impresso com precisao, atencao aos detalhes e paixao pelo que fazemos.</p>
            <a href="#contato" className="mt-8 inline-flex items-center gap-3 rounded-lg border border-teal/40 px-7 py-4 text-sm font-bold text-ink transition hover:bg-teal hover:text-white">
              Ver todos os trabalhos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <Link key={work.id} href={`/produtos/${work.id}`}>
                <article className="group overflow-hidden rounded-xl border border-line bg-white shadow-[0_10px_35px_rgba(18,59,60,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(18,59,60,0.12)] hover:-translate-y-1 h-full">
                  <div className="relative aspect-[1.08] overflow-hidden bg-[#eef3f2]">
                    <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-xs font-bold text-ink backdrop-blur-sm">
                        Ver detalhes <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-ink">{work.title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-medium text-ink/60">
                        <Box className="h-4 w-4 text-teal" />
                        {work.category}
                      </p>
                      <span className="rounded-full bg-teal/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal">
                        Premium
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <section id="cta-whatsapp" aria-label="Chamada para ação" className="mt-12 lg:mt-14">
          <div
            className="isolate mx-auto flex min-h-[260px] max-w-4xl items-center justify-center bg-[url('/assets/HeroButtonBackground.webp')] bg-contain bg-center bg-no-repeat px-4 py-10 md:min-h-[300px] md:py-12 lg:min-h-[400px] lg:max-w-6xl lg:py-16 xl:min-h-[460px] xl:max-w-7xl"
          >
            <a
              href="https://wa.me/5511993796258"
              className="group relative overflow-hidden z-10 inline-flex items-center justify-center rounded-full border border-white/65 bg-gradient-to-b from-white/50 via-white/22 to-white/[0.12] px-10 py-4 text-sm font-bold text-ink shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),inset_0_-1px_0_0_rgba(18,59,60,0.06),0_8px_32px_rgba(18,59,60,0.12)] backdrop-blur-2xl backdrop-saturate-200 transition duration-300 md:px-12 md:py-5 md:text-base lg:border-white/75 lg:from-white/55 lg:via-white/25 lg:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),inset_0_-1px_0_0_rgba(18,59,60,0.05),0_12px_40px_rgba(18,59,60,0.14)] lg:backdrop-blur-[28px] hover:border-white/90 hover:from-white/65 hover:via-white/35 hover:to-white/18 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_16px_48px_rgba(18,59,60,0.16)] animate-pulse-subtle"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-laser" />
              Faça seu orçamento agora
            </a>
          </div>
        </section>
{ /* AVALIAÇÕES 
        <div id="avaliacoes" className="mt-14 grid items-center gap-6 rounded-lg border border-line bg-white/80 p-5 shadow-[0_14px_45px_rgba(18,59,60,0.06)] md:grid-cols-[1fr_auto_1fr] md:p-7">
          <div className="flex items-center gap-4">
            <button aria-label="Assistir depoimentos" className="grid h-14 w-14 place-items-center rounded-full border border-teal text-teal">
              <Play className="h-5 w-5 fill-current" />
            </button>
            <div>
              <strong>Veja o que nossos clientes dizem</strong>
              <p className="text-sm text-ink/65">Assista agora ao vídeo com avaliações reais</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatars.map((avatar) => (
                <span key={avatar} className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-ink text-[10px] font-bold text-white">
                  {avatar}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <strong><span className="text-[#ff9f1c]">★★★★★</span> 4,9/5</strong>
              <p className="text-ink/65">+250 avaliações no Google</p>
            </div>
          </div>
          <a href="#contato" className="inline-flex items-center justify-center gap-3 rounded-lg border border-teal/50 px-7 py-4 text-sm font-bold">
            Assistir video <Play className="h-4 w-4 fill-current" />
          </a>
        </div>*/ }
      </section>

      <footer id="contato" className="bg-tealDeep text-white">
        <div className="container-px grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-20">
          <div>
            <LogoMark2 />
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/78">Impressão 3D de qualidade para transformar ideias em produtos reais.</p>
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
          <FooterList title="Produtos" items={["Busto", "Itens Personalizados", "Chaveiros Personalizados", "Placas e Logos", "Porta fotos / quadros", "Decoração", "Peças Técnicas", "e muito mais."]} />
          <div>
            <h3 className="font-bold">Fale conosco</h3>
            <a href="https://wa.me/5511993796258" className="mt-6 flex items-center justify-between rounded-lg border border-white/20 p-4 transition hover:bg-white/10">
              <span className="flex items-center gap-3">
                <WhatsAppIcon />
                <span><strong className="block">WhatsApp</strong>(11) 99379-6258</span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="https://shopee.com.br/kyrios3d" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between rounded-lg border border-white/20 p-4 transition hover:bg-white/10">
              <span className="flex items-center gap-3">
                <Image src="/assets/Shoppe-icon-white.png" alt="Shopee" width={20} height={20} className="object-contain" />
                <span><strong className="block">Loja na Shopee</strong>shopee.com.br/kyrios3d</span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="mt-6 space-y-4 text-sm text-white/78">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5" /> contato@kyrios3d.com</p>
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5" /> Sao Paulo - SP</p>
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
          <p className="flex gap-8"><a href="#inicio">Politica de Privacidade</a><a href="#inicio">Termos de Uso</a></p>
        </div>
      </footer>
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
      <h3 className="font-bold">{title}</h3>
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

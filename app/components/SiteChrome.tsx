import Image from "next/image";
import Link from "next/link";
import { works } from "../data/products";
import {
  ArrowRight,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/5511993796258";
export const WHATSAPP_CORPORATE = "https://wa.me/5511993796258?text=Olá!%20Quero%20um%20orçamento%20corporativo%20(brindes%20/%20mimos%20de%20empresa%20/%20lote).";

export const navItems: Array<{ label: string; href: string }> = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Produtos", href: "/produtos" },
  { label: "Corporativo", href: "/#corporativo" },
  { label: "Modelos 3D", href: "/#modelos-3d" },
  { label: "Contato", href: "/#contato" },
];

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.13 0C5.61 0 .3 5.31.3 11.83c0 2.08.54 4.12 1.58 5.91L.2 24l6.4-1.68a11.8 11.8 0 0 0 5.53 1.41h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.45-8.42ZM12.14 21.73h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.22-3.8 1 1.01-3.7-.24-.38a9.78 9.78 0 0 1-1.5-5.23c0-5.42 4.42-9.83 9.86-9.83 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.95c0 5.43-4.42 9.84-9.79 9.89Zm5.38-7.36c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.19.29-.77.96-.94 1.15-.17.2-.35.22-.64.07-.29-.14-1.24-.46-2.36-1.46a8.8 8.8 0 0 1-1.63-2.02c-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.03-.52-.07-.14-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.03 1-1.03 2.44 0 1.45 1.06 2.84 1.2 3.04.15.2 2.08 3.17 5.03 4.45.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.74-.71 1.99-1.39.24-.68.24-1.27.17-1.39-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  );
}

export function LogoMark({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Image
      src="/assets/kyrios-logo.png"
      alt="Kyrios Impressão 3D"
      width={220}
      height={60}
      className={className ?? `h-14 w-auto md:h-16 ${inverted ? "brightness-0 invert" : ""}`}
      priority
    />
  );
}

type HeaderProps = {
  /** Mark which nav item should be highlighted as current. Match against `label`. */
  activeLabel?: string;
};

export function SiteHeader({ activeLabel = "Início" }: HeaderProps) {
  return (
    <header className="container-px sticky top-0 z-30 flex items-center justify-between py-3 backdrop-blur supports-[backdrop-filter]:bg-white/65 md:py-4">
      <Link href="/" className="flex items-center gap-3">
        <LogoMark />
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/90 lg:flex">
        {navItems.map((item) => {
          const isActive = item.label === activeLabel;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? "border-b border-teal pb-1 text-teal"
                  : "relative transition hover:text-teal"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <a
        href={WHATSAPP_URL}
        className="hidden items-center gap-2 rounded-full bg-tealDeep px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-ink md:flex"
      >
        <WhatsAppIcon />
        Fale no WhatsApp
      </a>
    </header>
  );
}

const footerBenefits: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: PackageCheck, title: "Impressão 3D de qualidade", text: "Materiais resistentes e acabamento premium" },
  { icon: Truck, title: "Entrega rápida e segura", text: "Para todo o Brasil" },
  { icon: Headphones, title: "Atendimento humano", text: "Fale diretamente com a gente" },
  { icon: ShieldCheck, title: "Pagamento seguro", text: "Pix, Cartão e Boleto" },
];

function FooterList({ title, items }: { title: string; items: Array<{ label: string; href: string }> | string[] }) {
  const normalized = items.map((it) => (typeof it === "string" ? { label: it, href: "/" } : it));
  return (
    <div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <ul className="mt-6 space-y-3 text-sm text-white/78">
        {normalized.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-tealDeep text-white">
      <div className="container-px grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <LogoMark inverted className="h-16 w-auto md:h-20 brightness-0 invert" />
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/78">
            Impressão 3D de qualidade para transformar ideias em produtos reais.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
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
          title="Catálogo"
          items={[
            { label: "Todos os produtos", href: "/produtos" },
            ...works.slice(0, 6).map((p) => ({ label: p.title, href: `/produtos/${p.id}` })),
          ]}
        />

        <div>
          <h3 className="font-display text-lg font-bold">Fale conosco</h3>
          <a href={WHATSAPP_URL} className="mt-6 flex items-center justify-between rounded-xl border border-white/20 p-4 transition hover:bg-white/10">
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
        <p className="flex flex-wrap gap-6">
          <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
          <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
          <Link href="/#contato" className="hover:text-white">Contato</Link>
        </p>
      </div>
    </footer>
  );
}

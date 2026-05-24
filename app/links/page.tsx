import Image from "next/image";
import {
  ArrowUpRight,
  Cuboid,
  Globe,
  Instagram,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

type LinkItem = {
  title: string;
  subtitle: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  effect?: boolean;
};

const links: LinkItem[] = [
  {
    title: "WhatsApp",
    subtitle: "Solicite seu orçamento agora",
    url: "https://wa.me/5511993796258",
    icon: <MessageCircle className="h-5 w-5" />,
    color: "bg-tealDeep",
    effect: true,
  },
  {
    title: "Instagram",
    subtitle: "Acompanhe nosso trabalho",
    url: "https://www.instagram.com/kyrios_3d/",
    icon: <Instagram className="h-5 w-5" />,
    color: "bg-[#E4405F]",
  },
  {
    title: "Loja na Shopee",
    subtitle: "Compre nossos produtos prontos",
    url: "https://shopee.com.br/kyrios3d",
    icon: <ShoppingBag className="h-5 w-5" />,
    color: "bg-[#EE4D2D]",
  },
  {
    title: "Catálogo no site",
    subtitle: "Conheça todos os nossos produtos",
    url: "/produtos",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-ink",
  },
  {
    title: "MakerWorld",
    subtitle: "Escolha um modelo e nós imprimimos",
    url: "https://makerworld.com/en/3d-models",
    icon: <Cuboid className="h-5 w-5" />,
    color: "bg-gradient-to-br from-amber to-[#d18820]",
  },
];

export default function LinksPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-5 py-10">
      <div className="fixed inset-0 z-0">
        <Image
          src="/link/linketree.webp"
          alt=""
          fill
          className="object-cover md:hidden"
          priority
          unoptimized
        />
        <Image
          src="/link/linketree-desktop.webp"
          alt=""
          fill
          className="object-cover hidden md:block"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
        <div className="mb-3 transition-all duration-500 transform hover:scale-105 drop-shadow-2xl">
          <Image
            src="/assets/kyrios-logo.png"
            alt="Kyrios Impressão 3D"
            width={320}
            height={100}
            className="h-24 w-auto md:h-28 brightness-0 invert"
            priority
          />
        </div>  

        <p className="mb-7 text-center text-[13px] leading-relaxed text-white/85 max-w-[300px] font-medium">
          ✨ Impressão 3D personalizada · <br/> 👨‍💻 Do digital, direto para sua mão! · Em SP 🇧🇷 · Criatividade · Tecnologia · Qualidade
          <br />
          <span className="text-white/65">PETG · PLA · entrega 5–7 dias 🚚</span>
        </p>

        <div className="w-full space-y-2.5">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target={link.url.startsWith("/") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`group relative overflow-hidden flex items-center gap-3 p-3 rounded-xl ${link.color} text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${link.effect ? "animate-pulse-subtle" : ""}`}
            >
              {link.effect && (
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-laser" />
              )}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                {link.icon}
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <h2 className="font-bold text-[15px] leading-tight">{link.title}</h2>
                <p className="text-white/75 text-[11px] truncate">{link.subtitle}</p>
              </div>
              <ArrowUpRight className="relative z-10 h-4 w-4 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-12" />
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/55 text-[10px] font-semibold tracking-[0.18em] uppercase">
            Kyrios Impressão 3D · kyrios3d.com
          </p>
        </div>
      </div>
    </main>
  );
}

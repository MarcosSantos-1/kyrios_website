"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, MessageCircle, Globe, ArrowRight } from "lucide-react";

export default function LinksPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handler);
    return () => darkModeMediaQuery.removeEventListener("change", handler);
  }, []);

  const links = [
    {
      title: "WhatsApp",
      subtitle: "Solicite seu orçamento agora",
      url: "https://wa.me/5511993796258",
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-tealDeep",
      effect: true,
    },
    {
      title: "Instagram",
      subtitle: "Siga nosso trabalho",
      url: "https://www.instagram.com/kyrios_3d/",
      icon: <Instagram className="h-6 w-6" />,
      color: "bg-[#E4405F]",
      effect: false,
    },
    {
      title: "Website Oficial",
      subtitle: "Conheça todos os nossos produtos",
      url: "/",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-ink",
      effect: false,
    },
  ];

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const logoSrc = isDarkMode ? "/assets/kyrios-logo-white.svg" : "/assets/kyrios-logo.svg";

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-12">
      {/* Backgrounds Fixos */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/link/linketree.png"
          alt="Background"
          fill
          className="object-cover md:hidden"
          priority
          quality={60}
        />
        <Image
          src="/link/linketree-desktop.png"
          alt="Background Desktop"
          fill
          className="object-cover hidden md:block"
          priority
          quality={60}
        />
        {/* Overlay para legibilidade */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
        {/* Logo */}
        <div className="mb-10 transition-all duration-500 transform hover:scale-105 drop-shadow-2xl">
          <Image
            src={logoSrc}
            alt="Kyrios Design"
            width={320}
            height={100}
            className="h-32 w-auto md:h-40"
            priority
          />
        </div>

        {/* Links */}
        <div className="w-full space-y-4">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target={link.url === "/" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl ${link.color} text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] ${link.effect ? 'animate-pulse-subtle' : ''}`}
            >
              {link.effect && (
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-laser" />
              )}
              
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                {link.icon}
              </div>
              
              <div className="relative z-10 flex-1">
                <h2 className="font-bold text-lg leading-tight">{link.title}</h2>
                <p className="text-white/70 text-xs">{link.subtitle}</p>
              </div>

              <div className="relative z-10 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight className="h-5 w-5" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-xs font-medium tracking-widest uppercase">
            Kyrios Impressões 3D
          </p>
        </div>
      </div>
    </main>
  );
}

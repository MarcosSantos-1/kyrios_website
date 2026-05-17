"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, MessageCircle, Globe, ArrowRight } from "lucide-react";

export default function LinksPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-12">
      {/* Backgrounds Fixos */}
      <div className="fixed inset-0 z-0">
        {/* Mobile Background */}
        <div className="block md:hidden relative w-full h-full">
          <Image
            src="/link/linketree.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Desktop Background */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src="/link/linketree-desktop.png"
            alt="Background Desktop"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay para legibilidade */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 transition-all duration-500">
          <Image
            src={isDarkMode ? "/assets/kyrios-logo-white.svg" : "/assets/kyrios-logo.svg"}
            alt="Kyrios Design"
            width={180}
            height={60}
            className="h-20 w-auto"
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

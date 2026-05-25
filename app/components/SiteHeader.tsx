"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Instagram,
  Mail,
  MapPin,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  LogoMark,
  WHATSAPP_URL,
  WhatsAppIcon,
  navItems,
} from "./SiteChrome";

type HeaderProps = {
  /** Marca o item ativo do menu (match pelo `label` em `navItems`). */
  activeLabel?: string;
};

export function SiteHeader({ activeLabel = "Início" }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="container-px sticky top-0 z-30 flex items-center justify-between gap-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/75 md:py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Kyrios — voltar pra home">
          <LogoMark />
        </Link>

        {/* Nav inline — só desktop */}
        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink/90 lg:flex xl:gap-6">
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

        <div className="flex items-center gap-2.5">
          <a
            href={WHATSAPP_URL}
            className="hidden items-center gap-2 rounded-full bg-tealDeep px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-ink md:flex"
          >
            <WhatsAppIcon />
            Fale no WhatsApp
          </a>
          {/* Hambúrguer — só mobile/tablet (< lg). Sombra forte pra
              destacar como "sempre disponível" enquanto rola a página. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="site-menu"
            className="group relative grid h-12 w-12 place-items-center rounded-full border border-tealDeep/15 bg-white text-ink shadow-[0_10px_30px_rgba(18,59,60,0.18)] transition hover:border-tealDeep hover:bg-tealDeep hover:text-white active:scale-95 lg:hidden"
          >
            <Menu className="h-5 w-5 transition group-hover:scale-110" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} activeLabel={activeLabel} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  activeLabel,
}: {
  open: boolean;
  onClose: () => void;
  activeLabel: string;
}) {
  if (!open) return null;
  return (
    <div
      id="site-menu"
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        className="absolute inset-0 animate-emerge-tight bg-ink/55 backdrop-blur-md"
      />

      {/* Panel — slides from right */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-mist shadow-[-30px_0_80px_-20px_rgba(18,59,60,0.35)] animate-slide-in-right">
        <div className="grain-light pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative flex items-center justify-between border-b border-line/60 px-6 py-5">
          <Link href="/" onClick={onClose}>
            <LogoMark className="h-14 w-auto" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-tealDeep hover:bg-tealDeep hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="relative flex flex-col gap-1 px-4 py-6">
          {navItems.map((item, i) => {
            const isActive = item.label === activeLabel;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`group relative flex items-center justify-between gap-3 rounded-2xl px-5 py-4 font-display text-2xl font-bold tracking-tight transition animate-emerge ${
                  isActive
                    ? "bg-tealDeep text-white shadow-soft"
                    : "text-ink hover:bg-white hover:text-tealDeep"
                }`}
                style={{ animationDelay: `${80 + i * 50}ms` }}
              >
                <span className="flex items-baseline gap-3">
                  <span className={`font-mono text-xs tabular-nums ${isActive ? "text-white/60" : "text-ink/35"}`}>
                    0{i + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowRight
                  className={`h-5 w-5 shrink-0 transition group-hover:translate-x-1 ${
                    isActive ? "" : "opacity-40"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="relative mt-auto space-y-3 border-t border-line/60 px-5 py-5">
          <a
            href={WHATSAPP_URL}
            className="flex items-center justify-center gap-2 rounded-full bg-tealDeep px-5 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
            onClick={onClose}
          >
            <WhatsAppIcon className="h-4 w-4" />
            (11) 99379-6258
          </a>
          <a
            href="https://shopee.com.br/kyrios3d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-4 text-sm font-bold text-ink transition hover:border-tealDeep hover:text-tealDeep"
            onClick={onClose}
          >
            <ShoppingBag className="h-4 w-4" />
            Loja na Shopee
          </a>

          <div className="flex items-center justify-between border-t border-line/60 pt-4 text-xs text-ink/60">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> contato@kyrios3d.com
            </span>
            <a
              href="https://www.instagram.com/kyrios_3d/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-tealDeep hover:text-tealDeep"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <p className="flex items-center justify-center gap-1.5 pt-2 text-[10px] uppercase tracking-[0.18em] text-ink/45">
            <MapPin className="h-3 w-3" /> São Paulo · SP
          </p>
        </div>
      </div>
    </div>
  );
}

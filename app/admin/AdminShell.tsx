"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Boxes,
  Home as HomeIcon,
  Inbox,
  LayoutGrid,
  LogOut,
  MessageSquareQuote,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { LogoMark } from "../components/SiteChrome";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Boxes;
  description?: string;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, description: "Visão geral" },
  { href: "/admin/produtos", label: "Produtos", icon: Boxes, description: "Catálogo, imagens e preços" },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquareQuote, description: "Reviews exibidos no site" },
  { href: "/admin/vitrine", label: "Vitrine & site", icon: Sparkles, description: "Destaques, hero, promoção" },
  { href: "/admin/mensagens", label: "Mensagens", icon: Inbox, description: "Contato dos clientes" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-mist text-ink">
      {/* TOP BAR (mobile) */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/85 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <LogoMark className="h-9 w-auto" />
        <button
          type="button"
          onClick={handleSignOut}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink"
          aria-label="Sair"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-line bg-white/95 px-5 pb-6 pt-5 backdrop-blur transition-transform lg:relative lg:translate-x-0 lg:bg-white/70 ${
            mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/admin" className="block">
              <LogoMark className="h-10 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
            Painel Kyrios
          </p>

          <nav className="mt-7 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition ${
                    isActive
                      ? "bg-tealDeep text-white shadow-soft"
                      : "text-ink/75 hover:bg-mist hover:text-ink"
                  }`}
                >
                  <item.icon className={`mt-0.5 h-5 w-5 shrink-0 ${isActive ? "" : "text-tealDeep"}`} />
                  <span className="leading-tight">
                    <span className="block text-sm font-bold">{item.label}</span>
                    {item.description && (
                      <span className={`block text-xs ${isActive ? "text-white/70" : "text-ink/50"}`}>
                        {item.description}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-5 left-5 right-5 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-line bg-white/85 px-3 py-2.5 text-xs font-bold text-ink/70 transition hover:border-tealDeep hover:text-tealDeep"
            >
              <HomeIcon className="h-4 w-4" />
              Ver site público
            </Link>
            <div className="rounded-xl border border-line bg-white/85 p-3">
              <p className="truncate text-xs font-bold text-ink">
                {user?.displayName || user?.email}
              </p>
              <p className="truncate text-[10px] text-ink/50">{user?.email}</p>
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-tealDeep hover:underline"
              >
                <LogOut className="h-3 w-3" /> Sair
              </button>
            </div>
          </div>
        </aside>

        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* CONTENT */}
        <main className="min-w-0 flex-1 px-4 py-8 md:px-8 md:py-10 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}

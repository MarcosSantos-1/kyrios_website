"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { AdminShell } from "./AdminShell";

export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname?.startsWith("/admin/login") ?? false;

  useEffect(() => {
    if (loading || isLoginRoute) return;
    if (!user || !isAdmin) {
      router.replace("/admin/login");
    }
  }, [loading, user, isAdmin, isLoginRoute, router]);

  // Páginas de login renderizam livremente, sem shell.
  if (isLoginRoute) return <>{children}</>;

  if (loading) return <FullScreenLoader label="Carregando admin…" />;
  if (!user || !isAdmin) return <FullScreenLoader label="Redirecionando…" />;

  return <AdminShell>{children}</AdminShell>;
}

function FullScreenLoader({ label }: { label: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-mist text-ink">
      <div className="flex items-center gap-3 text-sm text-ink/65">
        <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
        {label}
      </div>
    </div>
  );
}

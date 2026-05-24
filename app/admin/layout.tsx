import type { Metadata } from "next";
import { AuthProvider } from "../lib/auth-context";
import { AdminGate } from "./AdminGate";

export const metadata: Metadata = {
  title: "Admin — Kyrios Impressão 3D",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGate>{children}</AdminGate>
    </AuthProvider>
  );
}

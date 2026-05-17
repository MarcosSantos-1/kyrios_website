import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links Úteis | Kyrios Impressão 3D",
  description: "Acesse nossos canais oficiais: WhatsApp, Instagram e Website.",
  openGraph: {
    title: "Kyrios Impressão 3D | Links",
    description: "Transformando ideias em realidade com impressão 3D.",
    images: ["/assets/kyrios-logo.svg"],
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

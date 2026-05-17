import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyrios Impressão 3D",
  description: "Ideias que ganham forma com impressão 3D personalizada.",
  icons: {
    icon: "/assets/kyrios-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

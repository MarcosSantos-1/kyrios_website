import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyrios Impressão 3D",
  description: "Ideias que ganham forma com impressão 3D personalizada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          href="/assets/kyrios-logo.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/assets/kyrios-logo-white.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

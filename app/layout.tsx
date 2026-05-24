import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Kyrios Impressão 3D — Ideias que ganham forma",
  description:
    "Impressão 3D personalizada de alta qualidade em São Paulo. Bustos, chaveiros, peças técnicas, decoração e modelos do MakerWorld impressos com PETG e PLA premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${jakarta.variable}`}>
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

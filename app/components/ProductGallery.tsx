"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const safeImages = images.length > 0 ? images : ["/assets/KyriosMainImage.webp"];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((cur) => (cur + dir + safeImages.length) % safeImages.length);
    },
    [safeImages.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  return (
    <div className="space-y-4">
      {/* Hero image */}
      <div className="relative">
        <div className="absolute -inset-3 -z-10 rounded-[24px] bg-gradient-to-br from-tealBright/15 via-transparent to-amber/10 blur-2xl" />
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white shadow-soft"
          aria-label="Ampliar imagem"
        >
          <Image
            src={safeImages[active]}
            alt={alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow backdrop-blur transition group-hover:bg-white">
            <Expand className="h-4 w-4" />
          </span>
          {/* Counter pill */}
          <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold tabular-nums text-white backdrop-blur">
            {active + 1} / {safeImages.length}
          </span>
        </button>

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-4">
          {safeImages.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                i === active
                  ? "border-teal shadow-glow"
                  : "border-line/70 opacity-80 hover:opacity-100 hover:border-teal/40"
              }`}
            >
              <Image src={src} alt={`${alt} — miniatura ${i + 1}`} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox — renderizado via portal pra escapar de stacking contexts
          criados por ancestrais com `transform` (ex.: Reveal). */}
      <Lightbox
        open={lightbox}
        onClose={() => setLightbox(false)}
        images={safeImages}
        active={active}
        onNav={go}
        alt={alt}
      />
    </div>
  );
}

function Lightbox({
  open, onClose, images, active, onNav, alt,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  active: number;
  onNav: (dir: -1 | 1) => void;
  alt: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!open || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada"
      className="fixed inset-0 z-[9999] grid place-items-center bg-ink/95 p-4 backdrop-blur-sm animate-emerge-tight"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Fechar"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <div
        className="relative h-[80vh] w-[min(1200px,92vw)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-contain"
          sizes="92vw"
          unoptimized
        />
      </div>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold tabular-nums text-white">
        {active + 1} / {images.length}
      </p>
    </div>,
    document.body
  );
}

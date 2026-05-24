"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: keyof JSX.IntrinsicElements;
};

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
  // @ts-expect-error generic ref on dynamic tag
  return <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>{children}</Tag>;
}

type FAQItem = { q: string; a: string };

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-line/70 overflow-hidden rounded-2xl border border-line bg-white/85 backdrop-blur">
      {items.map((item, i) => (
        <details key={item.q} className="group" {...(i === 0 ? { open: true } : {})}>
          <summary className="flex items-center justify-between gap-6 px-6 py-5 text-left text-base font-semibold text-ink transition hover:bg-mist/60 md:px-8 md:py-6 md:text-lg">
            <span className="font-display tracking-tight">{item.q}</span>
            <span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/30 bg-teal/5 text-teal transition-transform duration-300">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 text-[15px] leading-7 text-ink/75 md:px-8 md:pb-7">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

import { MessageCircle } from "lucide-react";

export function StickyMobileCTA() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current && y > 300;
      setHidden(goingDown);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/5511993796258"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(37,211,102,0.4)] transition-all duration-300 lg:hidden ${
        hidden ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      Falar agora
    </a>
  );
}

export function CountUp({ end, suffix = "", duration = 1400 }: { end: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(end * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

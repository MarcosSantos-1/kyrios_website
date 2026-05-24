"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import {
  ArrowRight,
  Boxes,
  Database,
  ExternalLink,
  Inbox,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth-context";

type CountState = {
  products: number | null;
  testimonials: number | null;
  messages: number | null;
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [counts, setCounts] = useState<CountState>({
    products: null,
    testimonials: null,
    messages: null,
  });
  const [seedReady, setSeedReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [p, t, m] = await Promise.all([
          getCountFromServer(collection(db, "products")),
          getCountFromServer(collection(db, "testimonials")),
          getCountFromServer(collection(db, "messages")),
        ]);
        const products = p.data().count;
        const testimonials = t.data().count;
        const messages = m.data().count;
        setCounts({ products, testimonials, messages });
        setSeedReady(products === 0);
      } catch (e) {
        // Sem permissão / Firestore vazio — segue.
        console.warn("[admin] count read falhou:", e);
        setCounts({ products: 0, testimonials: 0, messages: 0 });
        setSeedReady(true);
      }
    })();
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return "Boa madrugada";
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  })();

  const name = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0];

  return (
    <div className="space-y-10">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tealDeep">Dashboard</p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
          {greeting}, <span className="italic text-tealDeep">{name}</span>.
        </h1>
        <p className="mt-2 text-sm text-ink/65">
          Painel de gestão da Kyrios. Mudanças aqui refletem no site em segundos.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Produtos no catálogo" value={counts.products} icon={Boxes} href="/admin/produtos" />
        <StatCard label="Depoimentos" value={counts.testimonials} icon={MessageSquareQuote} href="/admin/depoimentos" />
        <StatCard label="Mensagens" value={counts.messages} icon={Inbox} href="/admin/mensagens" />
        <StatCard
          label="Status do banco"
          value={null}
          icon={Database}
          customValue={
            <span className="inline-flex items-center gap-2 font-display text-lg font-bold text-tealDeep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-tealDeep opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-tealDeep" />
              </span>
              Online
            </span>
          }
        />
      </section>

      {seedReady && (
        <section className="rounded-2xl border border-amber/40 bg-amber/10 p-5">
          <div className="flex items-start gap-4">
            <Sparkles className="mt-1 h-5 w-5 text-amber" />
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-ink">Banco vazio. Bora subir os produtos atuais?</h2>
              <p className="mt-1 text-sm text-ink/70">
                Como o Firestore ainda não tem produtos, o site público está mostrando os dados de fallback (os 6 originais do código).
                Vai até <strong>Produtos → Importar do código</strong> pra subir os hardcoded de uma vez. Depois você pode editar tudo daqui.
              </p>
              <Link
                href="/admin/produtos"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-tealDeep"
              >
                Abrir produtos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="font-display text-xl font-bold text-ink">Acessos rápidos</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <QuickLink
            href="/admin/produtos"
            title="Editar produtos"
            text="Adicione, edite ou remova produtos. Upload de imagem direto pro Storage."
            icon={Boxes}
          />
          <QuickLink
            href="/admin/vitrine"
            title="Vitrine e promoções"
            text="Defina o destaque da semana, ajuste hero e ative promoções."
            icon={Sparkles}
          />
          <QuickLink
            href="/admin/depoimentos"
            title="Depoimentos"
            text="Mantenha as reviews que aparecem na home."
            icon={MessageSquareQuote}
          />
          <QuickLink
            href="/"
            title="Ver site público"
            text="Abra o site em uma nova aba pra checar o resultado."
            icon={ExternalLink}
            external
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label, value, icon: Icon, href, customValue,
}: {
  label: string;
  value: number | null;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  customValue?: React.ReactNode;
}) {
  const inner = (
    <div className="group h-full rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(18,59,60,0.04)] transition hover:-translate-y-0.5 hover:border-tealDeep/40">
      <div className="flex items-start justify-between">
        <Icon className="h-5 w-5 text-tealDeep" />
        {href && <ArrowRight className="h-4 w-4 text-ink/30 transition group-hover:translate-x-1 group-hover:text-tealDeep" />}
      </div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">{label}</p>
      {customValue ? (
        <div className="mt-1">{customValue}</div>
      ) : (
        <p className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">
          {value === null ? <span className="text-ink/20">—</span> : value}
        </p>
      )}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function QuickLink({
  href, title, text, icon: Icon, external,
}: {
  href: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}) {
  const props = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      {...props}
      className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-tealDeep/40"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tealDeep text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="font-display text-base font-bold text-ink">{title}</p>
        <p className="mt-0.5 text-xs text-ink/60">{text}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-ink/30 transition group-hover:translate-x-1 group-hover:text-tealDeep" />
    </Link>
  );
}

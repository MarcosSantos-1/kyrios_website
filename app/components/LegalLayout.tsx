import Link from "next/link";
import { ChevronRight, FileText, Home as HomeIcon } from "lucide-react";

export type LegalSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
  /** Shown at the very end. */
  footerNote?: React.ReactNode;
};

export function LegalDocument({ eyebrow, title, intro, updatedAt, sections, footerNote }: Props) {
  return (
    <article className="container-px relative py-12 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Caminho" className="mb-8 text-sm text-ink/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="inline-flex items-center gap-1 hover:text-teal">
              <HomeIcon className="h-3.5 w-3.5" /> Início
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
          <li className="font-semibold text-ink">{title}</li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:items-start">
        {/* Sidebar TOC */}
        <aside className="lg:sticky lg:top-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
            <FileText className="h-3.5 w-3.5" /> {eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-xs text-ink/55">Última atualização: {updatedAt}</p>

          <nav aria-label="Sumário" className="mt-8 hidden border-l-2 border-line/70 pl-4 text-sm lg:block">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">Sumário</p>
            <ol className="space-y-2.5 text-ink/70">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-teal">
                    <span className="mr-2 text-ink/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Main content */}
        <div className="prose-legal max-w-3xl">
          <p className="text-lg leading-8 text-ink/80">{intro}</p>

          <div className="mt-10 space-y-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
                  Seção {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-ink/80">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          {footerNote && (
            <div className="mt-14 rounded-2xl border border-line bg-white p-6 text-sm leading-7 text-ink/70">
              {footerNote}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

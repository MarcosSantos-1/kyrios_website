"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { Inbox, Loader2, MessageCircle, RefreshCw } from "lucide-react";
import { db } from "../../lib/firebase";
import { WHATSAPP_URL } from "../../components/SiteChrome";

type Message = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  createdAt?: Timestamp;
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(query(collection(db, "messages"), orderBy("createdAt", "desc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Message, "id">) })));
    } catch (e) {
      setItems([]);
      if (typeof e === "object" && e && "code" in e && (e as { code: string }).code !== "permission-denied") {
        setError(String((e as { code: string }).code));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tealDeep">Contato</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            Mensagens
          </h1>
          <p className="mt-1 text-sm text-ink/65">
            Mensagens enviadas pelo formulário público (ainda não ativo) ou via API.
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink/80 transition hover:border-tealDeep hover:text-tealDeep"
        >
          <RefreshCw className="h-4 w-4" /> Recarregar
        </button>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-ink/65">
          <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
          Carregando…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <Inbox className="mx-auto h-10 w-10 text-ink/30" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink">Sem mensagens por aqui</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">
            O canal principal hoje é o WhatsApp. Quando você quiser ativar um formulário no site
            pra alimentar essa aba, é só me pedir — a estrutura do Firestore já tá pronta
            (coleção <code className="rounded bg-mist px-1 py-0.5 font-mono text-xs">messages</code>).
          </p>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-[#1eb455]"
          >
            <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{m.name || "Sem nome"}</p>
                  <p className="text-xs text-ink/55">
                    {m.email && <span>{m.email}</span>}
                    {m.email && m.phone && " · "}
                    {m.phone && <span>{m.phone}</span>}
                  </p>
                </div>
                <p className="text-[11px] text-ink/45">
                  {m.createdAt ? new Date(m.createdAt.seconds * 1000).toLocaleString("pt-BR") : ""}
                </p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink/80">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

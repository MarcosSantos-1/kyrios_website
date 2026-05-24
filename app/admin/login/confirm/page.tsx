"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Loader2, ShieldAlert } from "lucide-react";
import { auth, isAdminEmail } from "../../../lib/firebase";
import { LogoMark } from "../../../components/SiteChrome";

const EMAIL_STORAGE_KEY = "kyrios:emailForSignIn";

export default function MagicLinkConfirmPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "needs-email" | "error" | "ok">("loading");
  const [emailPrompt, setEmailPrompt] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const href = window.location.href;
        if (!isSignInWithEmailLink(auth, href)) {
          setStatus("error");
          setErrMsg("Esse link não é um link de login válido.");
          return;
        }
        const stored = window.localStorage.getItem(EMAIL_STORAGE_KEY);
        if (!stored) {
          setStatus("needs-email");
          return;
        }
        await completeSignIn(stored, href);
        if (cancelled) return;
        setStatus("ok");
        router.replace("/admin");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setErrMsg(humanError(e));
      }
    })();
    return () => { cancelled = true; };
  }, [router]);

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    try {
      await completeSignIn(emailPrompt, window.location.href);
      setStatus("ok");
      router.replace("/admin");
    } catch (e) {
      setStatus("error");
      setErrMsg(humanError(e));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-mist via-white to-mist text-ink">
      <div className="container-px flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-soft md:p-10">
          <LogoMark className="h-12 w-auto" />

          {status === "loading" && (
            <div className="mt-8 flex items-center gap-3 text-ink/70">
              <Loader2 className="h-5 w-5 animate-spin text-tealDeep" />
              <p>Validando seu link de acesso…</p>
            </div>
          )}

          {status === "needs-email" && (
            <form onSubmit={submitEmail} className="mt-8 space-y-4">
              <h1 className="font-display text-2xl font-bold text-ink">Confirma seu e-mail</h1>
              <p className="text-sm text-ink/65">
                Você abriu o link em um navegador diferente. Pra confirmar quem é, digita o e-mail que recebeu o link.
              </p>
              <input
                type="email"
                value={emailPrompt}
                onChange={(e) => setEmailPrompt(e.target.value)}
                placeholder="seu@email.com"
                required
                className="block w-full rounded-xl border border-line bg-white px-4 py-3 text-sm shadow-sm focus:border-tealDeep focus:outline-none focus:ring-2 focus:ring-tealDeep/15"
              />
              {errMsg && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errMsg}</span>
                </div>
              )}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tealDeep px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink"
              >
                Confirmar e entrar
              </button>
            </form>
          )}

          {status === "ok" && (
            <p className="mt-8 text-ink/70">Tudo certo. Redirecionando…</p>
          )}

          {status === "error" && (
            <div className="mt-8">
              <h1 className="font-display text-2xl font-bold text-ink">Não foi possível entrar</h1>
              <p className="mt-2 text-sm text-ink/70">{errMsg}</p>
              <Link
                href="/admin/login"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-tealDeep px-6 py-3 text-sm font-bold text-white"
              >
                Voltar pro login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

async function completeSignIn(email: string, href: string) {
  if (!isAdminEmail(email)) {
    throw new Error("Esse e-mail não está autorizado no admin.");
  }
  const cred = await signInWithEmailLink(auth, email, href);
  if (!isAdminEmail(cred.user.email)) {
    await auth.signOut();
    throw new Error("Esse e-mail não está autorizado no admin.");
  }
  window.localStorage.removeItem(EMAIL_STORAGE_KEY);
}

function humanError(err: unknown): string {
  if (err instanceof Error) {
    const code = (err as { code?: string }).code;
    if (code === "auth/invalid-action-code") return "Esse link expirou ou já foi usado. Peça outro na tela de login.";
    if (code === "auth/expired-action-code") return "Link expirado. Peça outro pelo login.";
    return err.message;
  }
  return "Não foi possível validar esse link.";
}

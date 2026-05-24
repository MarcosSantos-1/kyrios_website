"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loader2, Mail, MoveRight, ShieldAlert } from "lucide-react";
import { auth, isAdminEmail } from "../../lib/firebase";
import { useAuth } from "../../lib/auth-context";
import { LogoMark } from "../../components/SiteChrome";

const EMAIL_STORAGE_KEY = "kyrios:emailForSignIn";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Já logado e admin → vai direto pro dashboard.
  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [loading, user, isAdmin, router]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isAdminEmail(email)) {
      setError("Esse e-mail não está autorizado no admin.");
      return;
    }
    setSubmitting(true);
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/admin/login/confirm`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem(EMAIL_STORAGE_KEY, email);
      setLinkSent(true);
    } catch (err: unknown) {
      setError(getFriendlyError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isAdminEmail(email)) {
      setError("Esse e-mail não está autorizado no admin.");
      return;
    }
    setSubmitting(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!isAdminEmail(cred.user.email)) {
        await auth.signOut();
        setError("Esse e-mail não está autorizado no admin.");
        return;
      }
      router.replace("/admin");
    } catch (err: unknown) {
      setError(getFriendlyError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-mist via-white to-mist text-ink">
      <div className="container-px flex min-h-screen items-center justify-center py-12">
        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Left: marketing */}
          <div className="hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-ink/70 hover:text-tealDeep">
              ← Voltar ao site
            </Link>
            <h1 className="mt-8 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink">
              Painel <span className="italic text-tealDeep">Kyrios</span>.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-ink/70">
              Gerencie produtos, depoimentos, vitrine e mensagens. Acesso restrito a contas autorizadas.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                ["Magic link", "Login sem senha por e-mail"],
                ["Senha", "Login tradicional via Firebase Auth"],
                ["Cache & ISR", "Mudanças refletem em segundos"],
                ["Storage", "Imagens hospedadas na nuvem"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-ink/10 bg-white/70 p-4 backdrop-blur">
                  <p className="font-display text-base font-bold text-ink">{title}</p>
                  <p className="mt-1 text-xs text-ink/65">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="relative rounded-3xl border border-line bg-white p-7 shadow-soft md:p-10">
            <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-tealBright/15 via-amber/10 to-tealDeep/10 blur-2xl" />

            <div className="flex flex-col items-start gap-4">
              <LogoMark className="h-12 w-auto" />
              <div>
                <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Entrar no admin</h2>
                <p className="mt-1 text-sm text-ink/60">Escolha o método de acesso.</p>
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full border border-line bg-mist/50 p-1 text-sm font-bold">
              <button
                type="button"
                onClick={() => { setMode("magic"); setError(null); setLinkSent(false); }}
                className={`rounded-full px-4 py-2 transition ${
                  mode === "magic" ? "bg-tealDeep text-white shadow" : "text-ink/65 hover:text-ink"
                }`}
              >
                Magic link
              </button>
              <button
                type="button"
                onClick={() => { setMode("password"); setError(null); setLinkSent(false); }}
                className={`rounded-full px-4 py-2 transition ${
                  mode === "password" ? "bg-tealDeep text-white shadow" : "text-ink/65 hover:text-ink"
                }`}
              >
                E-mail e senha
              </button>
            </div>

            {linkSent ? (
              <div className="mt-7 rounded-2xl border border-tealDeep/30 bg-tealDeep/5 p-5 text-sm leading-6 text-ink">
                <p className="font-display text-lg font-bold text-tealDeep">Cheque seu e-mail ✉️</p>
                <p className="mt-2">
                  Enviamos um link de acesso pra <strong>{email}</strong>. Clique no link no mesmo navegador pra completar o login.
                </p>
                <button
                  type="button"
                  onClick={() => { setLinkSent(false); setEmail(""); }}
                  className="mt-4 text-xs font-bold text-tealDeep underline-offset-2 hover:underline"
                >
                  Usar outro e-mail
                </button>
              </div>
            ) : mode === "magic" ? (
              <form onSubmit={handleMagicLink} className="mt-7 space-y-4">
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton submitting={submitting}>
                  <Mail className="h-4 w-4" />
                  Receber link de acesso
                  <MoveRight className="h-4 w-4" />
                </SubmitButton>
                <p className="text-xs text-ink/55">
                  Sem senha. A gente manda um link único pro seu e-mail. Funciona uma vez só.
                </p>
              </form>
            ) : (
              <form onSubmit={handlePassword} className="mt-7 space-y-4">
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
                <Field
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton submitting={submitting}>
                  Entrar
                  <MoveRight className="h-4 w-4" />
                </SubmitButton>
                <p className="text-xs text-ink/55">
                  Conta criada manualmente no Firebase Auth pelo admin.
                </p>
              </form>
            )}

            <Link href="/" className="mt-7 block text-center text-xs font-bold text-ink/55 hover:text-tealDeep lg:hidden">
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label, type, value, onChange, placeholder, required, autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink shadow-sm transition placeholder:text-ink/35 focus:border-tealDeep focus:outline-none focus:ring-2 focus:ring-tealDeep/15"
      />
    </label>
  );
}

function SubmitButton({ submitting, children }: { submitting: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tealDeep px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink disabled:cursor-wait disabled:opacity-60"
    >
      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {!submitting && children}
    </button>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function getFriendlyError(err: unknown): string {
  const msg = typeof err === "object" && err && "code" in err ? String((err as { code: string }).code) : String(err);
  switch (msg) {
    case "auth/invalid-email": return "E-mail inválido.";
    case "auth/user-not-found": return "Conta não encontrada. Crie no Firebase Auth ou use Magic Link.";
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Senha incorreta.";
    case "auth/too-many-requests": return "Muitas tentativas. Tente novamente em alguns minutos.";
    case "auth/operation-not-allowed": return "Método de login não habilitado no Firebase Console.";
    case "auth/network-request-failed": return "Sem conexão. Verifique sua internet.";
    default: return "Não consegui completar o login. Tenta de novo.";
  }
}

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { GripVertical, ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import { storage } from "../../lib/firebase";

type Props = {
  /** Pasta no Storage. Ex.: "products/bustos" */
  path: string;
  value: string[];
  onChange: (urls: string[]) => void;
};

export function ImageUploader({ path, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const storageRef = ref(storage, `${path}/${safeName}`);
        const task = uploadBytesResumable(storageRef, file);
        const url = await new Promise<string>((resolve, reject) => {
          task.on(
            "state_changed",
            (snap) => {
              const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
              setProgress((p) => ({ ...p, [safeName]: pct }));
            },
            (err) => reject(err),
            async () => {
              try {
                const downloadUrl = await getDownloadURL(task.snapshot.ref);
                resolve(downloadUrl);
              } catch (e) { reject(e); }
            }
          );
        });
        uploaded.push(url);
      }
      onChange([...value, ...uploaded]);
    } catch (e) {
      setError(humanize(e));
    } finally {
      setUploading(false);
      setProgress({});
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = async (idx: number) => {
    const url = value[idx];
    onChange(value.filter((_, i) => i !== idx));
    // Best-effort: tenta apagar do Storage se for URL nossa
    try {
      if (url.includes("firebasestorage.googleapis.com")) {
        const decoded = decodeURIComponent(url);
        const match = decoded.match(/\/o\/(.*?)\?/);
        if (match?.[1]) {
          await deleteObject(ref(storage, match[1]));
        }
      }
    } catch (e) {
      console.warn("[uploader] não deu pra apagar do Storage:", e);
    }
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = idx + dir;
    if (next < 0 || next >= value.length) return;
    const copy = [...value];
    const [item] = copy.splice(idx, 1);
    copy.splice(next, 0, item);
    onChange(copy);
  };

  const setAsCover = (idx: number) => {
    if (idx === 0) return;
    const copy = [...value];
    const [item] = copy.splice(idx, 1);
    copy.unshift(item);
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-tealDeep px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-ink">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {uploading ? "Enviando…" : "Adicionar imagens"}
        </label>
        <span className="text-xs text-ink/55">A primeira imagem é a capa exibida no catálogo.</span>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {Object.keys(progress).length > 0 && (
        <div className="space-y-1.5 rounded-lg border border-line bg-mist p-3">
          {Object.entries(progress).map(([k, v]) => (
            <div key={k} className="text-xs text-ink/65">
              <p className="truncate">{k}</p>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div className="h-full bg-tealDeep transition-all" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-mist/50 p-8 text-center text-sm text-ink/55">
          Nenhuma imagem ainda. Clique acima pra subir do seu computador.
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {value.map((url, idx) => (
            <li
              key={url + idx}
              className={`group relative aspect-square overflow-hidden rounded-xl border-2 ${
                idx === 0 ? "border-tealDeep shadow-glow" : "border-line"
              } bg-white`}
            >
              <Image src={url} alt={`Imagem ${idx + 1}`} fill className="object-cover" sizes="200px" unoptimized />
              {idx === 0 && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-tealDeep px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  <Star className="h-2.5 w-2.5 fill-current" /> Capa
                </span>
              )}
              <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-transparent to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    title="Mover pra esquerda"
                    className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink hover:bg-white"
                  >
                    <GripVertical className="h-3.5 w-3.5 -rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    title="Mover pra direita"
                    className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink hover:bg-white"
                  >
                    <GripVertical className="h-3.5 w-3.5 rotate-90" />
                  </button>
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => setAsCover(idx)}
                      title="Definir como capa"
                      className="grid h-7 w-7 place-items-center rounded-full bg-amber text-ink hover:bg-amber/90"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  title="Remover"
                  className="grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function humanize(e: unknown): string {
  if (typeof e === "object" && e && "code" in e) {
    const code = String((e as { code: string }).code);
    if (code === "storage/unauthorized")
      return "Sem permissão pra subir no Storage. Verifique as Storage Rules.";
    if (code === "storage/canceled") return "Upload cancelado.";
    return `Erro Storage: ${code}`;
  }
  return "Não consegui subir essas imagens. Tenta de novo.";
}

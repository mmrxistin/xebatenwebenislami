// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArchiveRestore,
  EyeOff,
  Loader2,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  adminPurgePost,
  adminRestorePost,
  adminSoftDeletePost,
  adminUpdatePost,
} from "./actions";

export interface PostRow {
  id: string;
  content: string[];
  createdAt: string;
  deletedAt: string | null;
  author: {
    id: string;
    username: string;
    displayName: string;
  };
  attachmentCount: number;
}

const card =
  "rounded-3xl border border-slate-200 bg-card p-5 shadow-sm dark:border-slate-800";
const areaClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

export default function PostsManager({ posts }: { posts: PostRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "LIVE" | "HIDDEN">("ALL");
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter === "LIVE" && p.deletedAt) return false;
      if (filter === "HIDDEN" && !p.deletedAt) return false;
      if (!q) return true;
      return (
        p.content.join(" ").toLowerCase().includes(q) ||
        p.author.username.toLowerCase().includes(q) ||
        p.author.displayName.toLowerCase().includes(q)
      );
    });
  }, [posts, query, filter]);

  const liveCount = posts.filter((p) => !p.deletedAt).length;

  function run(fn: () => Promise<{ error?: string; ok?: boolean }>, okText: string) {
    setNotice(null);
    startTransition(async () => {
      try {
        const res = await fn();
        if (res.error) {
          setNotice({ type: "err", text: res.error });
          return;
        }
        setNotice({ type: "ok", text: okText });
        setEditingId(null);
        router.refresh();
      } catch {
        setNotice({ type: "err", text: "İşlem yapılamadı. Yetkiniz olmayabilir." });
      }
    });
  }

  function startEdit(p: PostRow) {
    setEditingId(p.id);
    setDraft([...(p.content ?? []), ""]);
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
          Paylaşım Yönetimi
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">Paylaşımlar</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {posts.length} paylaşım · {liveCount} yayında. Silme işlemi geri alınabilir; ardından
          &quot;Tamamen Sil&quot; ile kalıcı olarak kaldırılır.
        </p>
      </header>

      {notice && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${notice.type === "ok"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
            }`}
        >
          {notice.text}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-9"
            placeholder="Başlık, içerik veya yazar ara"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-slate-200 p-1 dark:border-slate-800">
          {(["ALL", "LIVE", "HIDDEN"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === f
                  ? "bg-red-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
            >
              {f === "ALL" ? "Tümü" : f === "LIVE" ? "Yayında" : "Gizli"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
            Paylaşım bulunamadı.
          </p>
        )}

        {filtered.map((p) => {
          const [title = "", topic = "", ...body] = p.content;
          const editing = editingId === p.id;
          return (
            <article key={p.id} className={card}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                    {title || "(başlıksız)"}
                  </h3>
                  {topic && (
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-red-600">
                      {topic}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                    {body.join(" ")}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    @{p.author.username} · {new Date(p.createdAt).toLocaleString("tr-TR")}
                    {p.attachmentCount > 0 && ` · ${p.attachmentCount} dosya`}
                    {p.deletedAt && (
                      <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Gizli
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => (editing ? setEditingId(null) : startEdit(p))}>
                    <Pencil className="mr-1 h-4 w-4" /> {editing ? "Kapat" : "Düzenle"}
                  </Button>
                  {p.deletedAt ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => run(() => adminRestorePost(p.id), "Paylaşım yeniden yayında.")}
                    >
                      <ArchiveRestore className="mr-1 h-4 w-4" /> Geri Al
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => run(() => adminSoftDeletePost(p.id), "Paylaşım gizlendi.")}
                    >
                      <EyeOff className="mr-1 h-4 w-4" /> Gizle
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                    disabled={isPending}
                    onClick={() =>
                      run(() => adminPurgePost(p.id), "Paylaşım tamamen silindi.")
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editing && (
                <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Başlık</label>
                      <Input
                        value={draft[0] ?? ""}
                        onChange={(e) =>
                          setDraft((d) => {
                            const n = [...d];
                            n[0] = e.target.value;
                            return n;
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-500">Konu / Kategori</label>
                      <Input
                        value={draft[1] ?? ""}
                        onChange={(e) =>
                          setDraft((d) => {
                            const n = [...d];
                            n[1] = e.target.value;
                            return n;
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Açıklama (her satır ayrı paragraf)
                    </label>
                    <textarea
                      className={areaClass}
                      rows={5}
                      value={(draft.slice(2) ?? []).join("\n")}
                      onChange={(e) =>
                        setDraft((d) => [d[0] ?? "", d[1] ?? "", ...e.target.value.split("\n")])
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditingId(null)}>
                      <X className="mr-1 h-4 w-4" /> Vazgeç
                    </Button>
                    <Button
                      disabled={isPending}
                      onClick={() =>
                        run(
                          () => adminUpdatePost({ id: p.id, content: draft }),
                          "Paylaşım güncellendi.",
                        )
                      }
                    >
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Kaydet
                    </Button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

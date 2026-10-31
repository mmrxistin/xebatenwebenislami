// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateSiteContent } from "@/lib/site-content-actions";
import { slugifyTitle, type SiteCustomPage, type SiteSocialLink } from "@/lib/site-config";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";

interface Props {
  initialSocial: SiteSocialLink[];
  initialPages: SiteCustomPage[];
}

type Key = "social" | "pages";

export default function PanelSettingsEditor({ initialSocial, initialPages }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [social, setSocial] = useState<SiteSocialLink[]>(initialSocial);
  const [pages, setPages] = useState<SiteCustomPage[]>(initialPages);
  const [saved, setSaved] = useState<Set<Key>>(new Set());

  function save(key: Key) {
    startTransition(async () => {
      try {
        await updateSiteContent(key, key === "social" ? social : pages);
        setSaved((prev) => new Set([...prev, key]));
        toast({ description: "Kaydedildi" });
      } catch {
        toast({ variant: "destructive", description: "Kaydedilemedi. Admin yetkisi gerekiyor." });
      }
    });
  }

  function patchPage(idx: number, patch: Partial<SiteCustomPage>) {
    setPages((prev) => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
    setSaved((prev) => new Set([...prev].filter((k) => k !== "pages")));
  }

  const card = "rounded-3xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-800";
  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

  return (
    <div className="space-y-8">
      <div className={card}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Özel Sayfalar</h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Oluşturduğunuz sayfalar /malper/dinamik/[adres] ile yayınlanır ve menüye otomatik eklenir.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setPages((prev) => [
                ...prev,
                { slug: "", title: "Yeni Sayfa", description: "", content: "", published: true },
              ]);
              setSaved((prev) => new Set([...prev].filter((k) => k !== "pages")));
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Yeni Sayfa
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {pages.length === 0 && (
            <p className="text-sm text-slate-500">Henüz özel sayfa yok.</p>
          )}
          {pages.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Başlık</label>
                  <Input
                    value={p.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const autoSlug = !p.slug || p.slug === slugifyTitle(p.title);
                      patchPage(idx, { title, ...(autoSlug ? { slug: slugifyTitle(title) } : {}) });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Adres (slug) — /malper/dinamik/{p.slug || "..."}
                  </label>
                  <Input value={p.slug} onChange={(e) => patchPage(idx, { slug: slugifyTitle(e.target.value) })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Kısa Açıklama</label>
                  <Input value={p.description} onChange={(e) => patchPage(idx, { description: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    İçerik (paragrafları boş satırla ayırın)
                  </label>
                  <textarea
                    className={inputClass}
                    rows={6}
                    value={p.content}
                    onChange={(e) => patchPage(idx, { content: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={p.published !== false}
                    onChange={(e) => patchPage(idx, { published: e.target.checked })}
                  />
                  Yayında
                </label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    setPages((prev) => prev.filter((_, i) => i !== idx));
                    setSaved((prev) => new Set([...prev].filter((k) => k !== "pages")));
                  }}
                >
                  <Trash2 className="h-4 w-4" /> Sil
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => save("pages")} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saved.has("pages") ? <Check className="mr-2 h-4 w-4" /> : null}
            Kaydet
          </Button>
        </div>
      </div>

      <div className={card}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sosyal Medya</h2>
          <Button size="sm" variant="outline" onClick={() => setSocial((prev) => [...prev, { label: "", href: "" }])}>
            <Plus className="mr-1 h-4 w-4" /> Ekle
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {social.map((s, idx) => (
            <div key={idx} className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={s.label}
                placeholder="Kısa ad (IG, X, YT...)"
                onChange={(e) => {
                  setSocial((prev) => prev.map((n, i) => (i === idx ? { ...n, label: e.target.value } : n)));
                  setSaved((prev) => new Set([...prev].filter((k) => k !== "social")));
                }}
              />
              <Input
                value={s.href}
                placeholder="https://..."
                onChange={(e) => {
                  setSocial((prev) => prev.map((n, i) => (i === idx ? { ...n, href: e.target.value } : n)));
                  setSaved((prev) => new Set([...prev].filter((k) => k !== "social")));
                }}
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-red-600"
                onClick={() => {
                  setSocial((prev) => prev.filter((_, i) => i !== idx));
                  setSaved((prev) => new Set([...prev].filter((k) => k !== "social")));
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => save("social")} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saved.has("social") ? <Check className="mr-2 h-4 w-4" /> : null}
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}

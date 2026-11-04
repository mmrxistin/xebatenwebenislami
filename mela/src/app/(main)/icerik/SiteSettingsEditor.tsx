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
import BrandLogo from "@/components/BrandLogo";
import { HALAL_RULES, type SiteConfig } from "@/lib/site-config";
import { Check, Loader2, Lock, Plus, Trash2 } from "lucide-react";

interface Props {
  initialConfig: SiteConfig;
}

type SaveKey = "general" | "sections" | "theme" | "navigation";

const GENERAL_FIELDS: { key: keyof SiteConfig["general"]; label: string; textarea?: boolean }[] = [
  { key: "siteName", label: "Site Adı" },
  { key: "tagline", label: "Kısa Slogan" },
  { key: "description", label: "Site Açıklaması", textarea: true },
  { key: "email", label: "E-posta" },
  { key: "phone", label: "Telefon" },
  { key: "address", label: "Adres" },
  { key: "footerNote", label: "Footer Notu" },
];

const SECTION_FIELDS: { key: keyof SiteConfig["sections"]; label: string }[] = [
  { key: "hero", label: "Hero (Giriş)" },
  { key: "work", label: "Seçili İşler" },
  { key: "services", label: "Hizmetler" },
  { key: "manifesto", label: "Manifesto" },
  { key: "news", label: "Duyurular" },
  { key: "contact", label: "İletişim / CTA" },
];

const THEME_FIELDS: { key: keyof SiteConfig["theme"]; label: string }[] = [
  { key: "accent", label: "Vurgu Rengi" },
  { key: "background", label: "Zemin Rengi" },
  { key: "foreground", label: "Yazı Rengi" },
];

export default function SiteSettingsEditor({ initialConfig }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [config, setConfig] = useState<SiteConfig>(initialConfig);

  const [saved, setSaved] = useState<Set<SaveKey>>(new Set());

  function patch<K extends SaveKey>(key: K, value: SiteConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaved((prev) => new Set([...prev].filter((k) => k !== key)));
  }

  function save(key: SaveKey) {
    startTransition(async () => {
      try {
        await updateSiteContent(key, config[key]);
        setSaved((prev) => new Set([...prev, key]));
        toast({ description: "Kaydedildi" });
      } catch {
        toast({ variant: "destructive", description: "Kaydedilemedi. Admin yetkisi gerekiyor." });
      }
    });
  }

  function SaveButton({ k, label }: { k: SaveKey; label?: string }) {
    return (
      <div className="mt-4 flex justify-end">
        <Button onClick={() => save(k)} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saved.has(k) ? <Check className="mr-2 h-4 w-4" /> : null}
          {label ?? "Kaydet"}
        </Button>
      </div>
    );
  }

  const card = "rounded-3xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-800";
  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

  return (
    <div className="space-y-8">
      {/* GENEL BİLGİLER */}
      <div className={card}>
        <h2 className="text-lg font-semibold">Genel Bilgiler</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {GENERAL_FIELDS.map((f) => (
            <div key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">{f.label}</label>
              {f.textarea ? (
                <textarea
                  className={inputClass}
                  rows={3}
                  value={config.general[f.key]}
                  onChange={(e) => patch("general", { ...config.general, [f.key]: e.target.value })}
                />
              ) : (
                <Input
                  value={config.general[f.key]}
                  onChange={(e) => patch("general", { ...config.general, [f.key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>
        <SaveButton k="general" />
      </div>

      {/* LOGO — KİLİTLİ */}
      <div className={card}>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-emerald-600" />
          <h2 className="text-lg font-semibold">Logo (Kilitli)</h2>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <BrandLogo size={72} title={config.general.siteName} />
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            Logo değiştirilemez: yeşil zemin üzerinde beyaz sancak. Yalnızca boyut ayarlanabilir.
          </p>
        </div>
        <div className="mt-4 max-w-xs">
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
            Logo Boyutu: {config.general.logoSize}px
          </label>
          <input
            type="range"
            min={24}
            max={96}
            step={2}
            className="w-full accent-emerald-600"
            value={config.general.logoSize}
            onChange={(e) => patch("general", { ...config.general, logoSize: Number(e.target.value) })}
          />
        </div>
        <SaveButton k="general" />
      </div>

      {/* RENKLER */}
      <div className={card}>
        <h2 className="text-lg font-semibold">Renkler</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {THEME_FIELDS.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">{f.label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-transparent"
                  value={config.theme[f.key]}
                  onChange={(e) => patch("theme", { ...config.theme, [f.key]: e.target.value })}
                />
                <Input
                  value={config.theme[f.key]}
                  onChange={(e) => patch("theme", { ...config.theme, [f.key]: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
        <SaveButton k="theme" />
      </div>

      {/* MENÜ */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menü</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => patch("navigation", [...config.navigation, { href: "/malper", label: "Yeni Bağlantı" }])}
          >
            <Plus className="mr-1 h-4 w-4" /> Ekle
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {config.navigation.map((l, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={l.label}
                placeholder="Etiket"
                onChange={(e) => {
                  const next = config.navigation.map((n, j) => (j === i ? { ...n, label: e.target.value } : n));
                  patch("navigation", next);
                }}
              />
              <Input
                value={l.href}
                placeholder="/malper/..."
                onChange={(e) => {
                  const next = config.navigation.map((n, j) => (j === i ? { ...n, href: e.target.value } : n));
                  patch("navigation", next);
                }}
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-red-600"
                onClick={() => patch("navigation", config.navigation.filter((_, j) => j !== i))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <SaveButton k="navigation" />
      </div>

      {/* BÖLÜM BAŞLIKLARI */}
      <div className={card}>
        <h2 className="text-lg font-semibold">Bölüm Başlıkları</h2>
        <div className="mt-4 space-y-6">
          {SECTION_FIELDS.map((s) => (
            <div key={s.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{s.label}</h3>
              <div className="grid gap-3">
                <Input
                  value={config.sections[s.key].label}
                  placeholder="Küçük etiket"
                  onChange={(e) =>
                    patch("sections", {
                      ...config.sections,
                      [s.key]: { ...config.sections[s.key], label: e.target.value },
                    })
                  }
                />
                <Input
                  value={config.sections[s.key].title}
                  placeholder="Başlık"
                  onChange={(e) =>
                    patch("sections", {
                      ...config.sections,
                      [s.key]: { ...config.sections[s.key], title: e.target.value },
                    })
                  }
                />
                <textarea
                  className={inputClass}
                  rows={3}
                  placeholder="Açıklama"
                  value={config.sections[s.key].text}
                  onChange={(e) =>
                    patch("sections", {
                      ...config.sections,
                      [s.key]: { ...config.sections[s.key], text: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <SaveButton k="sections" />
      </div>



      {/* HELAL KURALLAR */}
      <div className={card}>
        <h2 className="text-lg font-semibold">Helal İçerik Kuralları</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          {HALAL_RULES.map((r) => (
            <li key={r} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

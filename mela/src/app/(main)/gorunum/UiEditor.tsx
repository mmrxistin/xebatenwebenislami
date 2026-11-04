// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateSiteContent } from "@/lib/site-content-actions";
import {
  DEFAULT_SITE_CONFIG,
  FONT_CHOICES,
  fontCss,
  type SiteConfig,
  type SiteSections,
  type SiteTheme,
  type SiteUi,
} from "@/lib/site-config";

interface LinkItem {
  href: string;
  label: string;
}

interface Props {
  initialUi: SiteUi;
  initialTheme: SiteTheme;
  initialGeneral: SiteConfig["general"];
  initialSections: SiteSections;
  initialExtraLinks?: LinkItem[];
}

const card = "rounded-3xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-800";
const labelClass = "mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400";

export default function UiEditor({
  initialUi,
  initialTheme,
  initialGeneral,
  initialSections,
  initialExtraLinks = [],
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [ui, setUi] = useState<SiteUi>(initialUi);
  const [theme, setTheme] = useState<SiteTheme>(initialTheme);
  const [general, setGeneral] = useState(initialGeneral);
  const [sections, setSections] = useState(initialSections);
  // Site menüsüne (tüm sayfalarda) eklenecek bağlantılar.
  const [extraLinks, setExtraLinks] = useState<LinkItem[]>(initialExtraLinks);

  function saveUi() {
    startTransition(async () => {
      try {
        await updateSiteContent("ui", ui);
        toast({ description: "Görünüm kaydedildi." });
        router.refresh();
      } catch {
        toast({ variant: "destructive", description: "Kaydedilemedi. Admin yetkisi gerekiyor." });
      }
    });
  }

  function saveThemeAndText() {
    startTransition(async () => {
      try {
        await updateSiteContent("theme", theme);
        await updateSiteContent("general", general);
        await updateSiteContent("sections", sections);
        toast({ description: "Tema ve metinler kaydedildi." });
        router.refresh();
      } catch {
        toast({ variant: "destructive", description: "Kaydedilemedi. Admin yetkisi gerekiyor." });
      }
    });
  }

  function saveExtraLinks() {
    startTransition(async () => {
      try {
        await updateSiteContent(
          "extraLinks",
          extraLinks.filter((l) => l.href.trim() && l.label.trim()),
        );
        toast({ description: "Bağlantılar kaydedildi." });
        router.refresh();
      } catch {
        toast({ variant: "destructive", description: "Kaydedilemedi. Admin yetkisi gerekiyor." });
      }
    });
  }

  function resetUi() {
    setUi(DEFAULT_SITE_CONFIG.ui);
    toast({ description: "Varsayılan görünüme dönüldü. Kaydetmeyi unutmayın." });
  }

  const patchUi = <K extends keyof SiteUi>(key: K, value: SiteUi[K]) =>
    setUi((prev) => ({ ...prev, [key]: value }));

  const font = fontCss(ui.fontFamily);
  const radius = `${ui.radius}px`;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">Görünüm</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Site Tasarımı
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Sitenin her yerini etkileyen yazı tipi, renk, buton, başlık ve alt bilgi ayarları.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/malper" target="_blank">
            Siteyi Önizle
          </Link>
        </Button>
      </header>

      {/* CANLI ÖNİZLEME */}
      <section
        className={card}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
          fontFamily: font,
          fontSize: `${ui.fontScale}%`,
        }}
      >
        <div
          className="overflow-hidden rounded-2xl border border-white/10 p-6"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div
            className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3"
            style={{
              color:
                ui.headerStyle === "light"
                  ? "#111"
                  : ui.headerStyle === "plain"
                    ? theme.foreground
                    : theme.foreground,
            }}
          >
            <span className="text-sm font-semibold">{general.siteName}</span>
            <span className="text-xs opacity-70">Menü · Hakkında · İletişim</span>
          </div>
          <h2
            className="font-semibold"
            style={{ color: theme.accent, fontSize: `${ui.headlineSize}px`, lineHeight: 1.3 }}
          >
            {sections.hero.title || general.tagline}
          </h2>
          {sections.hero.text && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-70">{sections.hero.text}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <span
              className="px-4 py-2 text-xs no-underline"
              style={{
                borderRadius: radius,
                border: `1px solid ${ui.buttonColor}`,
                backgroundColor: ui.buttonStyle === "solid" ? ui.buttonColor : "transparent",
                color: ui.buttonStyle === "solid" ? ui.buttonTextColor : ui.buttonColor,
              }}
            >
              Örnek Buton
            </span>
            <span
              className="px-4 py-2 text-xs"
              style={{ borderRadius: radius, border: "1px solid rgba(255,255,255,0.2)" }}
            >
              İkincil
            </span>
          </div>
        </div>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] opacity-50">
          Canlı önizleme — kaydettiğinizde site genelinde uygulanır.
        </p>
      </section>

      {/* YAZI TİPİ VE ÖLÇÜ */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Yazı Tipi ve Ölçü</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Yazı Tipi</label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              value={ui.fontFamily}
              onChange={(e) => patchUi("fontFamily", e.target.value)}
            >
              {FONT_CHOICES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Yazı Büyüklüğü: {ui.fontScale}%</label>
            <input
              type="range"
              min={85}
              max={130}
              step={5}
              className="w-full accent-red-600"
              value={ui.fontScale}
              onChange={(e) => patchUi("fontScale", Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelClass}>Başlık Boyutu: {ui.headlineSize}px</label>
            <input
              type="range"
              min={18}
              max={44}
              step={1}
              className="w-full accent-red-600"
              value={ui.headlineSize}
              onChange={(e) => patchUi("headlineSize", Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelClass}>Köşe Yuvarlaklığı: {ui.radius}px</label>
            <input
              type="range"
              min={0}
              max={28}
              step={2}
              className="w-full accent-red-600"
              value={ui.radius}
              onChange={(e) => patchUi("radius", Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      {/* BUTONLAR */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Butonlar</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Stil</label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              value={ui.buttonStyle}
              onChange={(e) => patchUi("buttonStyle", e.target.value as SiteUi["buttonStyle"])}
            >
              <option value="outline">Çerçeveli</option>
              <option value="solid">Dolu</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Buton Rengi</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-transparent"
                value={ui.buttonColor}
                onChange={(e) => patchUi("buttonColor", e.target.value)}
              />
              <Input value={ui.buttonColor} onChange={(e) => patchUi("buttonColor", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Dolu Buton Yazı Rengi</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-transparent"
                value={ui.buttonTextColor}
                onChange={(e) => patchUi("buttonTextColor", e.target.value)}
              />
              <Input
                value={ui.buttonTextColor}
                onChange={(e) => patchUi("buttonTextColor", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={saveUi} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Görünümü Kaydet
          </Button>
        </div>
      </section>

      {/* ÜST MENÜ VE ALT BİLGİ */}
      <section className={card}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menü ve Alt Bilgi</h2>
          <Button variant="ghost" size="sm" onClick={resetUi}>
            <RotateCcw className="mr-1 h-4 w-4" /> Varsayılan Görünüm
          </Button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Üst Menü Stili</label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              value={ui.headerStyle}
              onChange={(e) => patchUi("headerStyle", e.target.value as SiteUi["headerStyle"])}
            >
              <option value="dark">Koyu</option>
              <option value="light">Açık</option>
              <option value="plain">Sade (saydam)</option>
            </select>
          </div>
          <div className="flex flex-col justify-end gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={ui.showFooter}
                onChange={(e) => patchUi("showFooter", e.target.checked)}
              />
              Alt bilgiyi göster
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={ui.showLoginLink}
                onChange={(e) => patchUi("showLoginLink", e.target.checked)}
              />
              Menüde &quot;Giriş / Üye Ol&quot; bağlantısını göster
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Alt Bilgi Yazısı</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              value={ui.footerText}
              placeholder={general.description}
              onChange={(e) => patchUi("footerText", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Ek Menü Bağlantıları</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Bu bağlantılar tüm malper sayfalarının menüsüne eklenir.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setExtraLinks((prev) => [...prev, { label: "", href: "/malper/" }])}
            >
              <Plus className="mr-1 h-4 w-4" /> Ekle
            </Button>
          </div>
          <div className="mt-3 space-y-3">
            {extraLinks.length === 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Henüz ek bağlantı yok. Menü yalnızca yukarıdaki ayarlardan besleniyor.
              </p>
            )}
            {extraLinks.map((l, i) => (
              <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  placeholder="Etiket"
                  value={l.label}
                  onChange={(e) =>
                    setExtraLinks((prev) =>
                      prev.map((n, j) => (j === i ? { ...n, label: e.target.value } : n)),
                    )
                  }
                />
                <Input
                  placeholder="/malper/..."
                  value={l.href}
                  onChange={(e) =>
                    setExtraLinks((prev) =>
                      prev.map((n, j) => (j === i ? { ...n, href: e.target.value } : n)),
                    )
                  }
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => setExtraLinks((prev) => prev.filter((_, j) => j !== i))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={saveExtraLinks} disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
              Bağlantıları Kaydet
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Alt Bilgi Bağlantıları</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => patchUi("footerLinks", [...ui.footerLinks, { label: "", href: "" }])}
            >
              <Plus className="mr-1 h-4 w-4" /> Ekle
            </Button>
          </div>
          <div className="mt-3 space-y-3">
            {ui.footerLinks.map((l, i) => (
              <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  placeholder="Etiket"
                  value={l.label}
                  onChange={(e) =>
                    patchUi(
                      "footerLinks",
                      ui.footerLinks.map((n, j) => (j === i ? { ...n, label: e.target.value } : n)),
                    )
                  }
                />
                <Input
                  placeholder="/malper/..."
                  value={l.href}
                  onChange={(e) =>
                    patchUi(
                      "footerLinks",
                      ui.footerLinks.map((n, j) => (j === i ? { ...n, href: e.target.value } : n)),
                    )
                  }
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => patchUi("footerLinks", ui.footerLinks.filter((_, j) => j !== i))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={saveUi} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Görünümü Kaydet
          </Button>
        </div>
      </section>

      {/* RENKLER VE BAŞLIK METİNLERİ */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Renkler ve Başlık Metinleri</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {(
            [
              { key: "accent", label: "Vurgu Rengi" },
              { key: "background", label: "Zemin Rengi" },
              { key: "foreground", label: "Yazı Rengi" },
            ] as const
          ).map((f) => (
            <div key={f.key}>
              <label className={labelClass}>{f.label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-transparent"
                  value={theme[f.key]}
                  onChange={(e) => setTheme((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
                <Input
                  value={theme[f.key]}
                  onChange={(e) => setTheme((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Site Adı</label>
            <Input
              value={general.siteName}
              onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Başlık Şablonu (%s = sayfa adı)</label>
            <Input
              value={general.titleTemplate}
              onChange={(e) => setGeneral({ ...general, titleTemplate: e.target.value })}
            />
          </div>
          {(
            [
              { key: "hero", label: "Giriş (Hero)" },
              { key: "work", label: "Yazılar" },
              { key: "services", label: "Bilgiler" },
              { key: "news", label: "Duyurular" },
            ] as const
          ).map((s) => (
            <div key={s.key}>
              <label className={labelClass}>{s.label} Başlığı</label>
              <Input
                value={sections[s.key].title}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    [s.key]: { ...sections[s.key], title: e.target.value },
                  })
                }
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className={labelClass}>Giriş Metni</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              value={sections.hero.text}
              onChange={(e) =>
                setSections({ ...sections, hero: { ...sections.hero, text: e.target.value } })
              }
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={saveThemeAndText} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Renk ve Metinleri Kaydet
          </Button>
        </div>
      </section>
    </div>
  );
}

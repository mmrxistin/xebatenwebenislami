// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah

export const LOCKED_LOGO = {
  src: "/alarengin.webp",
  color: "#0f7a3d",
  flag: "#ffffff",
  locked: true as const,
};

export interface SiteGeneral {
  siteName: string;
  titleTemplate: string;
  metaDescription: string;
  metaKeywords: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  footerNote: string;
  logoSize: number;
}

export interface SiteSection {
  label: string;
  title: string;
  text: string;
}

export interface SiteSections {
  hero: SiteSection;
  work: SiteSection;
  services: SiteSection;
  manifesto: SiteSection;
  news: SiteSection;
  contact: SiteSection;
}



export interface SiteTheme {
  accent: string;
  background: string;
  foreground: string;
}

export interface SiteSocialLink {
  label: string;
  href: string;
}

// Panelden eklenen özel sayfalar (/malper/sayfa/[slug] ile yayınlanır)
export interface SiteCustomPage {
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
}

// Görünüm: font, buton, başlık ve alt bilgi tasarımı
// (admin "Görünüm" panelinden düzenlenir).
export interface SiteUi {
  fontFamily: string;
  fontScale: number; // 85 - 130 (%)
  radius: number; // 0 - 28 px
  headlineSize: number; // 18 - 44 px
  buttonStyle: "solid" | "outline";
  buttonColor: string;
  buttonTextColor: string;
  headerStyle: "plain" | "dark" | "light";
  showFooter: boolean;
  footerText: string;
  footerLinks: { href: string; label: string }[];
  showLoginLink: boolean;
}

export interface SiteConfig {
  general: SiteGeneral;
  sections: SiteSections;
  theme: SiteTheme;
  navigation: { href: string; label: string }[];
  social: SiteSocialLink[];
  pages: SiteCustomPage[];
  ui: SiteUi;
}


export const HALAL_RULES = [
  "TİCARİ HİÇBİR ŞEY YAPILAMAZ. Site üzerinden satış, ürün tanıtımı, reklam, abonelik, ücretli üyelik, komisyon, bağlantı geliri ve sponsorluk yapılamaz. Site yalnızca bilgi ve davettir.",
  "Reklam ağı, analitik/pazarlama betikleri ve üçüncü taraf ticari eklentiler (sohbet balonu, popup, takip kodu) siteye eklenemez.",
  "Dini sömüren vakıf, dernek ve bağış toplama siteleri YASAKTIR. Dini duyguları kullanarak para/tahsilat toplayan hiçbir site kurulamaz, yayınlanamaz ve bu platformda barındırılamaz.",
  "Yardımlaşma, imece, 'ortak fon' gibi adlar altında yapılan hırsızlık ve dolandırıcılık YASAKTIR.",
  "Bu platformda HİÇBİR para transferi yapılmaz: ödeme, havale, EFT, IBAN, kripto cüzdan ve bunlar gibi yöntemlerle para alıp verme yeri yoktur.",
  "Site adı, açıklaması veya içeriğinde bağış çağrısı, zekât/sadaka/yardım hesabı, IBAN ve ödeme isteme yer alamaz.",
  "Bağış yoluyla gelir kuranlar, dini öne çıkararak maddi çıkar sağlayan siteler tespit edilirse derhal kaldırılır.",
  "Faiz (ribâ), kumar, şans oyunu ve borsa/spekülasyon yapılmaz ve tanıtılmaz.",
  "Haram ürün (içki, domuz, tesettüre aykırı ürün) tanıtımı ve satışı yapılamaz.",
  "Görsellerde tesettür ve mahremiyet (hicâb) ölçülerine uyulur.",
  "Müzik, dans ve benzeri dini ölçülere aykırı içerik yayınlanmaz.",
  "Alkol, tütün ve zararlı madde tanıtımı kabul edilmez.",
  "Yalan, iftira, gıybet ve kardeşlik bağını zedeleyen içerik yayınlanmaz.",
];

// Dini sömürü denetimi: içerik/paylaşım bu kalıpları taşıyorsa panelde uyarı verir.
export const DIN_SOMURU_DESENLERI: { etiket: string; kalip: RegExp }[] = [
  { etiket: "Bağış toplama", kalip: /bağ[ıi]ş|yard[ıi]m topla|sadaka topla/i },
  { etiket: "Zekât/tahsilat", kalip: /zek[âa]t|tahsilat|havuz hesab[ıi]/i },
  { etiket: "Para/ödeme çağrısı", kalip: /IBAN|ödeme yap|para gönder|havale et|eft/i },
  { etiket: "Kripto cüzdan", kalip: /kripto|cüzdan|wallet|USDT|BTC|ETH/i },
  { etiket: "İmece/ortak fon", kalip: /imece|ortak fon|yard[ıi]mlaşma fon/i },
  { etiket: "Vakıf/dernek toplama", kalip: /vakf[ıi]|dernek(bi)? .*topla/i },
  { etiket: "Ticari satış/reklam", kalip: /sat[ıi]n al|sepete ekle|fiyat[ıi]?\s*[:\d]|indirim|kampanya|reklam|sponsor|abonelik|üyelik ücreti|komisyon/i },
  { etiket: "Üçüncü taraf ticari eklenti", kalip: /google-analytics|gtag\(|fbq\(|adsbygoogle|tawk\.to|intercom|hotjar/i },
];

export function diniSomuruTespit(metin: string): string[] {
  if (!metin) return [];
  return DIN_SOMURU_DESENLERI.filter((d) => d.kalip.test(metin)).map((d) => d.etiket);
}

// ticari içerik denetimi — dini sömürü denetimiyle aynı kalıp listesini kullanır
export const TICARI_DESENLERI = DIN_SOMURU_DESENLERI.filter((d) =>
  ["Ticari satış/reklam", "Üçüncü taraf ticari eklenti", "Kripto cüzdan", "Para/ödeme çağrısı"].includes(d.etiket),
);

export function ticariIcerikTespit(metin: string): string[] {
  if (!metin) return [];
  return TICARI_DESENLERI.filter((d) => d.kalip.test(metin)).map((d) => d.etiket);
}


export const DEFAULT_SITE_CONFIG: SiteConfig = {
  general: {
    siteName: "Emanet",
    titleTemplate: "%s | Emanet",
    metaDescription: "Sade, reklamsız ve ticari olmayan bilgi sitesi.",
    metaKeywords: "emanet, sade site, reklamsız, bağışsız, ticaret yok",
    tagline: "Emanet",
    description: "Sade, gösterişsiz, reklamsız ve ticari olmayan bir bilgi sitesi.",
    email: "merhaba@emanet.site",
    phone: "+90 555 000 00 00",
    address: "İstanbul, Türkiye",
    footerNote: "Emanet",
    logoSize: 40,
  },
  sections: {
    hero: {
      label: "",
      title: "Bismillahir Rahmanir Rahim",
      text: "",
    },
    work: {
      label: "",
      title: "Yazılar",
      text: "",
    },
    services: {
      label: "",
      title: "Bilgiler",
      text: "",
    },
    manifesto: {
      label: "",
      title: "",
      text: "",
    },
    news: {
      label: "",
      title: "Duyurular",
      text: "",
    },
    contact: {
      label: "",
      title: "İletişim",
      text: "",
    },
  },
  theme: {
    accent: "#0f7a3d",
    background: "#0b1512",
    foreground: "#e9f2ee",
  },
  navigation: [
    { href: "/malper", label: "Ana Sayfa" },
    { href: "/malper/hakkinda", label: "Hakkında" },
    { href: "/malper/hizmetler", label: "Hizmetler" },
    { href: "/malper/isler", label: "Yazılar" },
    { href: "/malper/kariyer", label: "Eğitim" },
    { href: "/malper/iletisim", label: "İletişim" },
  ],
  social: [
    { label: "IG", href: "#" },
    { label: "X", href: "#" },
    { label: "GR", href: "#" },
    { label: "YT", href: "#" },
  ],
  pages: [],
  ui: {
    fontFamily: "system",
    fontScale: 100,
    radius: 24,
    headlineSize: 30,
    buttonStyle: "outline",
    buttonColor: "#0f7a3d",
    buttonTextColor: "#e9f2ee",
    headerStyle: "dark",
    showFooter: true,
    footerText: "",
    footerLinks: [],
    showLoginLink: true,
  },
};

// Görünüm panelinde seçilebilen yazı tipleri.
export const FONT_CHOICES: { value: string; label: string; css: string }[] = [
  { value: "system", label: "Sistem", css: "system-ui, -apple-system, Segoe UI, sans-serif" },
  { value: "serif", label: "Serif", css: "Georgia, 'Times New Roman', serif" },
  { value: "mono", label: "Mono", css: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  { value: "rounded", label: "Yuvarlak", css: "'Trebuchet MS', 'Segoe UI', sans-serif" },
];

export function fontCss(value: string): string {
  return (FONT_CHOICES.find((f) => f.value === value) ?? FONT_CHOICES[0]).css;
}

export type SiteConfigKey = keyof SiteConfig;

export const SITE_CONFIG_KEYS: SiteConfigKey[] = [
  "general",
  "sections",
  "theme",
  "navigation",
  "social",
  "pages",
  "ui",
];


export function mergeSiteConfig(stored: Record<string, unknown>): SiteConfig {
  const pick = (key: SiteConfigKey) => (stored[key] ?? {}) as Record<string, unknown>;
  const out = structuredClone(DEFAULT_SITE_CONFIG) as unknown as Record<string, any>;

  for (const [k, v] of Object.entries(pick("general"))) {
    if (v !== undefined && v !== null && v !== "") out.general[k] = v;
  }
  for (const [sectionKey, sectionVal] of Object.entries(pick("sections"))) {
    if (!out.sections[sectionKey]) continue;
    for (const [k, v] of Object.entries(sectionVal as Record<string, unknown>)) {
      if (v !== undefined && v !== null) out.sections[sectionKey][k] = v;
    }
  }
  for (const [k, v] of Object.entries(pick("theme"))) {
    if (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v)) out.theme[k] = v;
  }
  const nav = stored.navigation;
  if (Array.isArray(nav) && nav.length) {
    out.navigation = (nav as { href: string; label: string }[]).filter(
      (l) => l && typeof l.href === "string" && typeof l.label === "string",
    );
  }
  const social = stored.social;
  if (Array.isArray(social)) {
    out.social = (social as SiteSocialLink[]).filter(
      (l) => l && typeof l.href === "string" && typeof l.label === "string",
    );
  }

  const pages = stored.pages;
  if (Array.isArray(pages)) {
    out.pages = (pages as SiteCustomPage[])
      .filter((p) => p && typeof p.slug === "string" && p.slug.trim())
      .map((p) => ({ ...p, published: p.published !== false }));
  }

  const size = Number(out.general.logoSize);
  out.general.logoSize = Number.isFinite(size) ? Math.min(96, Math.max(24, size)) : 40;

  // Görünüm ayarları: yalnızca geçerli değerler kabul edilir.
  const ui = pick("ui");
  const clamp = (v: unknown, min: number, max: number, fallback: number) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
  };
  const hex = (v: unknown, fallback: string) =>
    typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;
  if (ui && typeof ui === "object") {
    const d = DEFAULT_SITE_CONFIG.ui;
    out.ui = {
      fontFamily: FONT_CHOICES.some((f) => f.value === ui.fontFamily) ? ui.fontFamily : d.fontFamily,
      fontScale: clamp(ui.fontScale, 85, 130, d.fontScale),
      radius: clamp(ui.radius, 0, 28, d.radius),
      headlineSize: clamp(ui.headlineSize, 18, 44, d.headlineSize),
      buttonStyle: ui.buttonStyle === "solid" ? "solid" : "outline",
      buttonColor: hex(ui.buttonColor, d.buttonColor),
      buttonTextColor: hex(ui.buttonTextColor, d.buttonTextColor),
      headerStyle:
        ui.headerStyle === "light" || ui.headerStyle === "plain" ? ui.headerStyle : "dark",
      showFooter: ui.showFooter !== false,
      footerText: typeof ui.footerText === "string" ? ui.footerText : "",
      footerLinks: Array.isArray(ui.footerLinks)
        ? (ui.footerLinks as { href: string; label: string }[]).filter(
            (l) => l && typeof l.href === "string" && typeof l.label === "string",
          )
        : [],
      showLoginLink: ui.showLoginLink !== false,
    };
  }

  return out as SiteConfig;
}

export function slugifyTitle(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

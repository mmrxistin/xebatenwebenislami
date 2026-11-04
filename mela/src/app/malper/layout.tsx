 // BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe illAllahu vahdehu la sharika leh, lehu'l-mulku ve lehu'l-hamdu.
// yuhyi ve yumit
// ve Huwe Hayyûn La yemût
// bîyadîhîl xayr
//  ve huve ala kulli şey'in kadir
// La ilahe ill Allah Muhammeden Rasulullah
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illAllah, Allahu Ekber, Allahu Ekber ve lillahi'l-hamd
import React from "react";
import type { Metadata } from "next";
import RedNavbar from "./components/red-nav";
import RedFooter from "./components/red-footer";
import AdminSiteBar from "./components/admin-site-bar";
import SiteTheme from "./components/site-theme";
import DestpekLoginListener from "./components/destpek-login";
import { getSiteConfig, getSiteContent } from "@/lib/site-content";
import { fontCss } from "@/lib/site-config";
import { validateRequest } from "@/auth";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { general } = await getSiteConfig();
  return {
    title: {
      template: general.titleTemplate,
      default: general.siteName,
    },
    description: general.metaDescription,
    keywords: general.metaKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();
  const content = await getSiteContent();
  const { user } = await validateRequest();
  // Menü: panelden düzenlenen bağlantılar + yayınlanmış özel sayfalar + ek bağlantılar.
  // Aynı adres iki kez eklenmez.
  const extraLinks = Array.isArray(content.extraLinks)
    ? (content.extraLinks as { href: string; label: string }[]).filter(
        (l) => l && typeof l.href === "string" && typeof l.label === "string",
      )
    : [];
  const seen = new Set<string>();
  const nav = [
    ...config.navigation,
    ...config.pages
      .filter((p) => p.published !== false)
      .map((p) => ({ href: `/malper/dinamik/${p.slug}`, label: p.title })),
    ...extraLinks,
  ].filter((l) => {
    if (!l.href || seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
  const ui = config.ui;
  const isAdmin = user?.role === "ADMIN";

  // Görünüm ayarları CSS değişkeni olarak tüm siteye uygulanır.
  // Görünüm ayarları CSS değişkeni olarak tüm siteye uygulanır.
  // (px değerleri calc ile ölçeklenir; üst menü ve boşluklar bozulmaz.)
  const style = {
    backgroundColor: config.theme.background,
    color: config.theme.foreground,
    fontSize: `${ui.fontScale}%`,
    "--site-accent": config.theme.accent,
    "--site-button": ui.buttonColor,
    "--site-button-text": ui.buttonTextColor,
    "--site-radius": `${ui.radius}px`,
    "--site-headline": `${ui.headlineSize}px`,
    "--site-font": fontCss(ui.fontFamily),
    // Üstte sabit çubuk (yönetici/üye) varsa menü onun altından başlar.
    "--site-bar-h": user ? "46px" : "0px",
  } as React.CSSProperties;

  return (
    <div
      className="site-theme-root min-h-screen antialiased"
      style={style}
      data-header={ui.headerStyle}
      data-button={ui.buttonStyle}
    >
      <SiteTheme config={config} />
      <DestpekLoginListener />
      {user && <AdminSiteBar isAdmin={isAdmin} />}
      {/* Üst menü + içerik: yönetici/üye çubuğu hem menüyü hem sayfayı aşağı iter. */}
      <div className="site-menu-offset pt-20">
        <RedNavbar config={{ ...config, navigation: nav }} />
        <div className="site-main-pad">{children}</div>
      </div>
      {ui.showFooter && <RedFooter config={{ ...config, navigation: nav }} />}
    </div>
  );
}

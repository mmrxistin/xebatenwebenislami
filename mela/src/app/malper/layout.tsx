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
import DestpekLoginListener from "./components/destpek-login";
import { getSiteConfig } from "@/lib/site-content";

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
  const nav = [
    ...config.navigation,
    ...config.pages
      .filter((p) => p.published !== false)
      .map((p) => ({ href: `/malper/dinamik/${p.slug}`, label: p.title })),
  ];
  return (
    <div
      className="min-h-screen antialiased"
      style={
        {
          backgroundColor: config.theme.background,
          color: config.theme.foreground,
          "--site-accent": config.theme.accent,
        } as React.CSSProperties
      }
    >
      <DestpekLoginListener />
      <RedNavbar config={{ ...config, navigation: nav }} />
      <div className="pt-20">{children}</div>
      <RedFooter config={{ ...config, navigation: nav }} />
    </div>
  );
}

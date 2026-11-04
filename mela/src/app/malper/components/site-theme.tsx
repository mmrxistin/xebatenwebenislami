// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";

// Tüm malper sayfalarına görünüm ayarlarını (zemin, yazı rengi, font, başlık ölçüsü)
// uygular. Admin "Görünüm" panelindeki değerler her sayfada aynı şekilde görünür.
import { useEffect } from "react";
import type { SiteConfig } from "@/lib/site-config";

export default function SiteTheme({ config }: { config: SiteConfig }) {
  const { theme, ui } = config;

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
  }, [theme.background]);

  return (
    <style>{`
      body { background-color: ${theme.background}; }
      .site-theme-root {
        background-color: ${theme.background};
        color: ${theme.foreground};
      }
      /* İçerik sayfaları zemin/yazı rengini ayardan alır (kendi util sınıfları ezilir). */
      .site-theme-root main {
        background-color: transparent !important;
        color: inherit !important;
        font-size: ${ui.fontScale}%;
      }
      /* Başlık ölçüsü yalnızca site içeriğinde; menü ve kart başlıkları kendi ölçüsünde. */
      .site-theme-root .site-main-pad main h1,
      .site-theme-root .site-main-pad main h2 {
        font-size: var(--site-headline, ${ui.headlineSize}px);
        line-height: 1.2;
      }
      /* Görünüm panelindeki zemin/yazı rengi tüm sayfada geçerli olsun diye
         koyu/açık tema sınıflarını da ayarın rengiyle eziyoruz. */
      .site-theme-root main,
      .site-theme-root main * {
        color: ${theme.foreground};
      }
      .site-theme-root main .text-zinc-400,
      .site-theme-root main .text-zinc-500,
      .site-theme-root main .text-zinc-600,
      .site-theme-root main .text-white\\/40,
      .site-theme-root main .text-white\\/50,
      .site-theme-root main .text-white\\/60,
      .site-theme-root main .text-white\\/70,
      .site-theme-root main .text-white\\/80 {
        color: color-mix(in srgb, ${theme.foreground} 70%, transparent);
      }
      .site-theme-root main input,
      .site-theme-root main textarea,
      .site-theme-root main select {
        background-color: color-mix(in srgb, ${theme.foreground} 6%, transparent) !important;
        color: ${theme.foreground} !important;
        border-color: color-mix(in srgb, ${theme.foreground} 22%, transparent) !important;
      }
      .site-theme-root main input::placeholder,
      .site-theme-root main textarea::placeholder {
        color: color-mix(in srgb, ${theme.foreground} 45%, transparent) !important;
      }
      .site-theme-root main svg { color: inherit; }
      .site-theme-root main .bg-white\\/5,
      .site-theme-root main .bg-white\\/[0.03],
      .site-theme-root main .bg-white\\/[0.04] {
        background-color: color-mix(in srgb, ${theme.foreground} 6%, transparent) !important;
      }
      .site-theme-root main .bg-white:not(.site-button) {
        background-color: ${theme.accent} !important;
        color: ${theme.background} !important;
      }
      .site-theme-root main a:not(.site-button) {
        color: inherit;
      }
      .site-theme-root main a:hover:not(.site-button) {
        color: ${theme.accent};
      }
      .site-theme-root main .border-white\\/10,
      .site-theme-root main .border-white\\/15 {
        border-color: color-mix(in srgb, ${theme.foreground} 14%, transparent) !important;
      }
    `}</style>
  );
}

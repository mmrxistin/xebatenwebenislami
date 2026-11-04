// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahirabbulalemin
// Ve salatu ve selamu ala resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah,  La ilahe illAllah u Allahu Ekber
"use client";

import React, { useState } from "react";

/**
 * Üst slider: Son Dakika (solda) + Yazarlar (sağda)
 * Otomatik geçişli, ok butonlu modern slider.
 */

const sonDakika = [
  { title: "Yeni deneme kitabı 'Eşiğin Öte Yanı' raflarda", href: "/malper/isler", cat: "KİTAP" },
  { title: "Hafıza ve yazmak üzerine söyleşi yayınlandı", href: "/malper/isler", cat: "SÖYLEŞİ" },
  { title: "Hikâye Ödülleri'nde jüri seçkisinde", href: "/malper/isler", cat: "ÖDÜL" },
  { title: "Güz dönemi yazarlık atölyesi kayıtları açıldı", href: "/malper/isler", cat: "ATÖLYE" },
  { title: "Kütüphane Günleri'nde imza ve söyleşi", href: "/malper/isler", cat: "ETKİNLİK" },
];
const yazarlar = [
  { title: "Susmak da bir anlatma biçimidir", author: "Emanet", href: "/malper/isler" },
  { title: "Bir şehir unutur mu?", author: "Emanet", href: "/malper/isler" },
  { title: "İlk cümle üzerine notlar", author: "Emanet", href: "/malper/isler" },
  { title: "Okumanın sessiz telaşı", author: "Emanet", href: "/malper/isler" },
  { title: "Defterin kenarındaki üç satır", author: "Emanet", href: "/malper/isler" },
];

function useAutoIndex(length: number) {
  const [index, setIndex] = useState(0);
  return [index, setIndex] as const;
}

function ArrowButtons({
  count,
  index,
  setIndex,
  dark,
}: {
  count: number;
  index: number;
  setIndex: (i: number) => void;
  dark?: boolean;
}) {
  const base =
    "mm-slider-arrow flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all hover:scale-105";
  const cls = dark
    ? `${base} border-zinc-600 bg-zinc-800/80 text-white hover:bg-zinc-700`
    : `${base} border-zinc-300 bg-white/90 text-zinc-800 hover:bg-zinc-100`;

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Önceki"
        className={cls}
        onClick={() => setIndex((index - 1 + count) % count)}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Sonraki"
        className={cls}
        onClick={() => setIndex((index + 1) % count)}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

function SonDakikaSlider() {
  const [index, setIndex] = useAutoIndex(sonDakika.length);
  const item = sonDakika[index];

  return (
    <div className="mm-hero-slider">
      <div className="mm-slider-tag mm-slider-tag-red">
        <span className="size-2 rounded-full bg-white animate-pulse" />
YENİ
      </div>

      <a href={item.href} className="mm-slider-content group" key={index}>
        <span className="mm-slider-cat">{item.cat}</span>
        <h3 className="mm-slider-title">{item.title}</h3>
      </a>

      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-3">
        <ArrowButtons count={sonDakika.length} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}

export function YazarSlider() {
  const [index, setIndex] = useAutoIndex(yazarlar.length);
  const item = yazarlar[index];

  return (
    <div className="mm-yazar-slider">
      <div className="mm-slider-tag mm-slider-tag-dark">YAZAR NOTLARI</div>

      <a href={item.href} className="mm-yazar-content" key={index}>
        <div className="mm-yazar-avatar">
          {item.author.slice(0, 1)}
        </div>
        <div>
          <h3 className="mm-yazar-title">{item.title}</h3>
          <span className="mm-yazar-name">{item.author}</span>
        </div>
      </a>

      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-3">
        <ArrowButtons count={yazarlar.length} index={index} setIndex={setIndex} dark />
      </div>
    </div>
  );
}

function WeatherWidget() {
  return (
    <div className="mm-weather-panel" aria-label="Günün sözü">
      <div className="mm-weather-header">
        <span className="mm-weather-badge">GÜNÜN SÖZÜ</span>
        <span className="mm-weather-city">Notlar</span>
      </div>
      <div className="mm-weather-body">
        <div className="mm-weather-icon" aria-hidden="true">
          📖
        </div>
        <div className="mm-weather-main">
          <div className="mm-weather-temp">“”</div>
          <div className="mm-weather-meta">Kelimeler, sessizliğin çocuklarıdır.</div>
        </div>
      </div>
    </div>
  );
}

export default function MmSlider() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-5 lg:grid-cols-[2fr_1fr] lg:items-center">
      <div>
        <SonDakikaSlider />
      </div>

      <WeatherWidget />
    </div>
  );
}

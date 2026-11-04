// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirrahim
// Yazarın video kanalı — büyük oynatıcı + altında seçilebilir yayın listesi
"use client";

import React, { useState } from "react";

const CHANNEL_ID = "UCeHJLmZ75jsot6tzDk-BUUA";
const UPLOADS_PLAYLIST = "UUeHJLmZ75jsot6tzDk-BUUA";

// ABC WATCH mimarisi: sol/sağ liste öğesi seçilince üstteki oynatıcı değişir
const YAYINLAR = [
  {
    id: "live",
    badge: "CANLI",
    title: "Canlı Söyleşi",
    sub: "Kesintisiz yayın akışı",
    src: "https://www.youtube.com/embed/fZondUOmR9k?autoplay=0",
    live: true,
  },
  {
    id: "son-videolar",
    badge: "VİDEO",
    title: "Son Videolar",
    sub: "Kanalın en yeni okuma ve söyleşileri",
    src: `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}`,
    live: false,
  },
  {
    id: "video-galeri",
    badge: "ARŞİV",
    title: "Video Arşivi",
    sub: "Tüm söyleşi ve okuma videoları",
    src: `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}&index=2`,
    live: false,
  },
];

function MmLiveTv() {
  const [aktif, setAktif] = useState(0);
  const yayin = YAYINLAR[aktif];

  return (
    <div className="mm-live">

      {/* ÜST BAŞLIK — ABC LIVE bandı */}
      <div className="mm-live-head">
        <span className="mm-live-badge">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
VİDEOLAR
        </span>

        <a
          href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
          target="_blank"
          rel="noreferrer"
          className="mm-live-link"
        >
Kanal ↗
        </a>
      </div>

      {/* BÜYÜK OYNATICI */}
      <div className="mm-live-player">
        <iframe
          key={yayin.id}
          className="absolute inset-0 h-full w-full"
          src={yayin.src}
          title={yayin.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* OYNATICI ALT BİLGİ */}
      <div className="mm-live-now">
        {yayin.live ? (
          <span className="mm-live-now-dot" />
        ) : null}
        <div className="min-w-0">
          <div className="mm-live-now-title">{yayin.title}</div>
          <div className="mm-live-now-sub">{yayin.sub}</div>
        </div>
      </div>

      {/* YAYIN LİSTESİ — ABC WATCH list mimarisi */}
      <div className="mm-live-list">
        <div className="mm-live-list-head">
          <span className="mm-live-list-title">Yayınlar</span>
          <a
            href={`https://www.youtube.com/channel/${CHANNEL_ID}/videos`}
            target="_blank"
            rel="noreferrer"
            className="mm-live-list-more"
          >
            Tümü →
          </a>
        </div>

        <ul className="m-0 list-none p-0">
          {YAYINLAR.map((y, i) => (
            <li key={y.id}>
              <button
                type="button"
                onClick={() => setAktif(i)}
                className={`mm-live-item ${i === aktif ? "mm-live-item-active" : ""}`}
                aria-pressed={i === aktif}
              >
                <span className={`mm-live-item-badge ${y.live ? "is-live" : ""}`}>
                  {y.badge}
                </span>
                <span className="mm-live-item-txt">
                  <span className="mm-live-item-title">{y.title}</span>
                  <span className="mm-live-item-sub">{y.sub}</span>
                </span>
                <span className="mm-live-item-play">▶</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default MmLiveTv;

// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import { LOCKED_LOGO } from "@/lib/site-config";

// Logo kilitli: public/alarengin.webp üzerinden servis edilir, boyut dışında hiçbir özelliği değiştirilemez.
export const BRAND_LOGO_SRC = LOCKED_LOGO.src;

export default function BrandLogo({
  size = 40,
  className = "",
  title = "Helal Site",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${title} — yeşil zeminde beyaz sancak`}
      className={`inline-grid shrink-0 place-items-center overflow-hidden rounded-lg ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: LOCKED_LOGO.color,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BRAND_LOGO_SRC}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        draggable={false}
        className="h-full w-full select-none object-contain"
      />
    </span>
  );
}

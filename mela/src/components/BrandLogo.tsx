// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import { LOCKED_LOGO } from "@/lib/site-config";

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
      className={`inline-grid shrink-0 place-items-center rounded-lg ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: LOCKED_LOGO.color,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.62}
        height={size * 0.62}
        aria-hidden="true"
      >

        <rect x="4" y="2.5" width="1.8" height="19" rx="0.9" fill={LOCKED_LOGO.flag} />

        <path
          d="M6.8 3.6 L18.2 3.6 C19.3 3.6 19.8 4.8 19.1 5.7 C17.9 7 17.9 8.3 19.1 9.5 C19.8 10.2 19.3 11.4 18.2 11.4 L6.8 11.4 Z"
          fill={LOCKED_LOGO.flag}
        />

        <circle cx="13.6" cy="7.5" r="1.4" fill={LOCKED_LOGO.color} />
        <circle cx="14.3" cy="7.2" r="1.25" fill={LOCKED_LOGO.flag} />
      </svg>
    </span>
  );
}

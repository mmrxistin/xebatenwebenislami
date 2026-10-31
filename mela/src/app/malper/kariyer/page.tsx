// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import Link from "next/link";
import { AGENCY } from "../ajans-veri";

export const metadata = { title: "Eğitim" };

const PROGRAMLAR = [
  { title: "Haftalık Ders Halkası", type: "Dönemlik", loc: "İstanbul" },
  { title: "Okuma Programı", type: "8 hafta", loc: "İstanbul / Çevrimiçi" },
  { title: "Gençlik Buluşması", type: "Aylık", loc: "Çevrimiçi" },
  { title: "Yaz Dönemi Programı", type: "4 hafta", loc: "Çevrimiçi" },
];

export default function KariyerPage() {
  return (
    <main className="min-h-screen px-4 py-12 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-semibold">Eğitim</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Dönem içinde düzenlenen programlar.
          </p>
        </header>

        <ul className="divide-y divide-white/10 border-b border-white/10">
          {PROGRAMLAR.map((o) => (
            <li key={o.title}>
              <Link
                href="/malper/iletisim"
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4 text-sm no-underline"
              >
                <span className="text-zinc-200">{o.title}</span>
                <span className="ml-auto text-xs text-zinc-500">{o.type}</span>
                <span className="text-xs text-zinc-500">{o.loc}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-zinc-400">
          Sorularınız için{" "}
          <a href={`mailto:${AGENCY.email}`} className="no-underline hover:text-white">
            {AGENCY.email}
          </a>
        </p>
      </div>
    </main>
  );
}

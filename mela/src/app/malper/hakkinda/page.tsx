// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import { AGENCY, STATS } from "../ajans-veri";

export const metadata = { title: "Hakkında" };

const ILKELER = ["Sadelik", "Reklamsız", "Ticari değil", "Şeffaflık"];

export default function HakkindaPage() {
  return (
    <main className="min-h-screen px-4 py-12 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-2xl font-semibold">Hakkında</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {AGENCY.name} — sade, gösterişsiz ve ticari olmayan bir bilgi sitesi.
          </p>
        </header>

        <section className="py-8">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l}>
                <dt className="text-xs text-zinc-500">{s.l}</dt>
                <dd className="mt-1 text-lg font-medium">{s.n}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-white/10 py-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">İlkeler</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-300">
            {ILKELER.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </section>

        <section className="border-t border-white/10 py-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">İletişim</h2>
          <ul className="space-y-1 text-sm text-zinc-400">
            <li>
              <a href={`mailto:${AGENCY.email}`} className="no-underline hover:text-white">
                {AGENCY.email}
              </a>
            </li>
            <li>{AGENCY.address}</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

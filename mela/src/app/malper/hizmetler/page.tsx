// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import { SERVICES } from "../ajans-veri";
import ParvekirinaYek from "../components/parvekirin";

export const metadata = { title: "Bilgiler" };

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen px-4 py-12 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-semibold">Bilgiler</h1>
        </header>

        <ul className="space-y-4">
          {SERVICES.map((s) => (
            <li key={s.n} className="text-sm leading-relaxed">
              <span className="font-medium text-zinc-200">{s.t}</span>
              <span className="text-zinc-500"> — {s.d}</span>
            </li>
          ))}
        </ul>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
            Son Yazılar
          </h2>
          <ParvekirinaYek />
        </section>
      </div>
    </main>
  );
}

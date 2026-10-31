// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import ParvekirinaYek from "../components/parvekirin";

export const metadata = { title: "Yazılar" };

export default function IslerPage() {
  return (
    <main className="min-h-screen px-4 py-12 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-semibold">Yazılar</h1>
        </header>
        <ParvekirinaYek />
      </div>
    </main>
  );
}

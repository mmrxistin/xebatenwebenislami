// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah

import React from "react";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/site-content";

export const dynamic = "force-dynamic";
//
export default async function DinamikSayfa({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const config = await getSiteConfig();
  const page = config.pages.find((p) => p.slug === slug && p.published !== false);
  if (!page) notFound();

  const accent = config.theme.accent;
  return (
    <main className="min-h-screen px-4 py-16 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>
          {config.general.siteName}
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">{page.title}</h1>
        {page.description ? (
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">{page.description}</p>
        ) : null}
        <div className="mt-10 space-y-4 border-t border-white/10 pt-10 text-base leading-relaxed text-zinc-300">
          {page.content
            .split(/\n{2,}/)
            .filter(Boolean)
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </div>
    </main>
  );
}

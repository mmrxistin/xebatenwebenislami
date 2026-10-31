// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
"use client";
import React from "react";
import Link from "next/link";
import ParvekirinaYek from "./components/parvekirin";
import BrandLogo from "@/components/BrandLogo";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

interface MalperClientProps {
  stats: { n: string; l: string }[];
  cases: { brand: string; title: string; tag: string; img: string }[];
  services: { n: string; t: string; d: string }[];
  news: { cat: string; date: string; title: string; href?: string }[];
  config: SiteConfig;
}

export default function MalperClient({
  stats: STATS,
  cases: CASES,
  services: SERVICES,
  news: NEWS,
  config,
}: MalperClientProps) {
  const S = config.sections;
  const general = { ...DEFAULT_SITE_CONFIG.general, ...config.general };
  const accent = config.theme.accent;
  const card = "rounded-md border border-white/10 p-6";

  return (
    <main className="min-h-screen" style={{ backgroundColor: config.theme.background }}>
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <BrandLogo size={general.logoSize * 2} title={general.siteName} />
          </div>
          <h1 className="text-2xl font-semibold leading-relaxed sm:text-3xl" style={{ color: accent }}>
            {S.hero.title}
          </h1>
          {S.hero.text ? (
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-400">{S.hero.text}</p>
          ) : null}
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/malper/hakkinda"
              className="rounded-md border border-white/15 px-5 py-2.5 no-underline transition-colors hover:border-white/35"
            >
              Hakkında
            </Link>
            <Link
              href="/malper/iletisim"
              className="rounded-md border border-white/15 px-5 py-2.5 no-underline transition-colors hover:border-white/35"
            >
              İletişim
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className={card}>
              <div className="text-xl font-semibold">{s.n}</div>
              <div className="mt-1 text-xs text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">{S.work.title}</h2>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {CASES.map((c, i) => (
              <li key={`${c.brand}-${i}`}>
                <Link href="/malper/isler" className="flex items-start gap-4 py-4 no-underline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded object-cover opacity-80"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-zinc-100">{c.brand}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500">{c.title}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-xs text-zinc-600">{c.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">{S.services.title}</h2>
          <ul className="space-y-4">
            {SERVICES.map((s) => (
              <li key={s.n} className="text-sm leading-relaxed">
                <span className="font-medium text-zinc-200">{s.t}</span>
                <span className="text-zinc-500"> — {s.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">{S.news.title}</h2>
          <ParvekirinaYek fallback={NEWS} />
        </div>
      </section>


    </main>
  );
}

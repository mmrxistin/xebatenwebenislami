// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

export default function RedNavbar({ config }: { config?: Partial<SiteConfig> }) {
  const nav = config?.navigation ?? DEFAULT_SITE_CONFIG.navigation;
  const general = { ...DEFAULT_SITE_CONFIG.general, ...(config?.general ?? {}) };
  const ui = { ...DEFAULT_SITE_CONFIG.ui, ...(config?.ui ?? {}) };
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Görünüm panelinden seçilen üst menü stili.
  const shell =
    ui.headerStyle === "light"
      ? scrolled
        ? "border-b border-black/10 bg-white/90 py-3 text-slate-900 backdrop-blur-xl"
        : "bg-white/70 py-5 text-slate-900 backdrop-blur"
      : ui.headerStyle === "plain"
        ? scrolled
          ? "border-b border-white/10 py-3 backdrop-blur-xl"
          : "py-5"
        : scrolled
          ? "border-b border-white/10 bg-zinc-950/80 py-3 backdrop-blur-xl"
          : "bg-transparent py-5";

  const linkColor =
    ui.headerStyle === "light"
      ? "text-slate-600 hover:text-slate-900"
      : "text-white/60 hover:text-white/90";
  const borderColor = ui.headerStyle === "light" ? "border-black/15" : "border-white/15";
  const brandColor = ui.headerStyle === "light" ? "text-slate-900" : "text-white/90";

  const buttonStyle: React.CSSProperties =
    ui.buttonStyle === "solid"
      ? {
        backgroundColor: ui.buttonColor,
        color: ui.buttonTextColor,
        borderColor: ui.buttonColor,
        borderRadius: `${ui.radius}px`,
      }
      : {
        borderColor: ui.buttonColor,
        color: ui.buttonColor,
        borderRadius: `${ui.radius}px`,
      };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-[14px] transition-all duration-500 ${shell}`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/malper" className="flex items-center gap-2 no-underline">
            <BrandLogo size={general.logoSize} title={general.siteName} />
            <span className={`text-base font-semibold ${brandColor}`}>
              {general.siteName}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs font-medium no-underline transition-colors ${linkColor}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {ui.showLoginLink && (
              <Link
                href="/login"
                className={`hidden border px-4 py-2 text-xs no-underline md:block ${borderColor}`}
                style={buttonStyle}
              >
                Giriş / Üye Ol
              </Link>
            )}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menü"
              className={`grid h-10 w-10 place-items-center rounded-full border ${borderColor} lg:hidden`}
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 transition-transform ${ui.headerStyle === "light" ? "bg-slate-900" : "bg-white"} ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 transition-opacity ${ui.headerStyle === "light" ? "bg-slate-900" : "bg-white"} ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 transition-transform ${ui.headerStyle === "light" ? "bg-slate-900" : "bg-white"} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU — tam ekran */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-zinc-950 px-8 transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <nav className="flex flex-col gap-2">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 text-base font-medium text-white/90 no-underline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/malper/iletisim"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-fit border px-5 py-2 text-sm no-underline"
            style={buttonStyle}
          >
            İletişim
          </Link>
          {ui.showLoginLink && (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-3 text-sm text-white/60 no-underline"
            >
              Giriş / Üye Ol
            </Link>
          )}
        </nav>
        <a
          href={`mailto:${general.email}`}
          className="mt-10 text-sm text-white/60 no-underline"
        >
          {general.email}
        </a>
      </div>
    </>
  );
}

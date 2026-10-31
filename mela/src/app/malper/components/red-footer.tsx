// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import Link from "next/link";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

export default function RedFooter({ config }: { config?: Partial<SiteConfig> }) {
  const nav = config?.navigation ?? DEFAULT_SITE_CONFIG.navigation;
  const general = { ...DEFAULT_SITE_CONFIG.general, ...(config?.general ?? {}) };
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">{general.siteName}</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/40">{general.description}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="no-underline transition-colors hover:text-white/80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-xs text-white/50">
            <li>
              <a href={`mailto:${general.email}`} className="no-underline transition-colors hover:text-white/80">
                {general.email}
              </a>
            </li>
            <li className="mt-1">{general.address}</li>
          </ul>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-xs text-white/30">
          © {new Date().getFullYear()} {general.siteName}
        </p>
      </div>
    </footer>
  );
}

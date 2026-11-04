// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Site üzerindeyken yöneticiye görünen düzenleme çubuğu.
// Her sayfadan tek tıkla ilgili yönetim ekranına götürür.
import React from "react";
import Link from "next/link";
import {
  Home,
  LayoutTemplate,
  MessageSquare,
  Newspaper,
  UsersRound,
} from "lucide-react";

const links = [
  { href: "/", label: "Panel", icon: Home },
  { href: "/gorunum", label: "Görünüm", icon: LayoutTemplate },
  { href: "/icerik", label: "Metinler", icon: Newspaper },
  { href: "/paylasimlar", label: "Paylaşımlar", icon: MessageSquare },
  { href: "/kullanicilar", label: "Kullanıcılar", icon: UsersRound },
];

export default function AdminSiteBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-10">
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.22em] text-red-300 sm:block">
          Yönetici
        </span>
        <nav className="flex w-full items-center gap-1 overflow-x-auto sm:w-auto sm:justify-end">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-white/70 no-underline transition-colors hover:bg-white/10 hover:text-white"
            >
              <l.icon className="h-3.5 w-3.5" />
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

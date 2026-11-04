// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
// Suphanallah, Elhamdulillah, Allahu Ekber
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// Allah u Ekber Ve Lillahil Hamd
import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { adminMenuItems } from "./components/admin/menu-items";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  let messageCount = 0;

  try {
    const clientAny = prisma as any;

    if (
      clientAny.mmmpeyam &&
      typeof clientAny.mmmpeyam.count === "function"
    ) {
      messageCount = await clientAny.mmmpeyam.count();
    } else if (
      clientAny.peyam &&
      typeof clientAny.peyam.count === "function"
    ) {
      messageCount = await clientAny.peyam.count();
    } else if (
      clientAny.message &&
      typeof clientAny.message.count === "function"
    ) {
      messageCount = await clientAny.message.count();
    }
  } catch {
    messageCount = 0;
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 ${className ?? ""}`}
    >
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold text-red-200">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold">{user.username}</p>
            <p className="text-xs text-slate-300">Yönetici hesabı</p>
          </div>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-red-200">
          Emanet · Yönetim
        </p>
      </div>

      <div className="p-3">
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Menü
        </div>

        <nav className="space-y-1">
          {adminMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-700 dark:text-slate-200 dark:hover:bg-red-950/30 dark:hover:text-red-300"
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0 transition group-hover:scale-110" />
                <span>{item.label}</span>
              </span>

              {item.badgeKey === "messages" && messageCount > 0 ? (
                <span className="min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
                  {messageCount}
                </span>
              ) : item.badgeKey === "messages" ? (
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

// El Hamdu Lillah Kesira

// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir


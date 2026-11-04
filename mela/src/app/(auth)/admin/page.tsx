// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
  // Arama motorlarına kapalı.
  robots: { index: false, follow: false },
};

// Yönetici girişi. Üye girişinden (/login) tamamen ayrıdır.
export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-8">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative w-full max-w-md space-y-6 rounded-[2rem] border border-white/10 bg-slate-950 p-8 shadow-2xl shadow-black/40 sm:p-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
            Emanet · Yönetim
          </p>
          <h1 className="text-2xl font-bold text-white">Yönetici Girişi</h1>
          <p className="text-sm leading-6 text-slate-400">
            Bu alan yalnızca yönetici hesabı içindir.
          </p>
        </div>

        <AdminLoginForm />

        <p className="border-t border-white/10 pt-5 text-center text-xs text-slate-500">
          Üye misiniz?{" "}
          <Link href="/login" className="font-semibold text-slate-300 underline hover:text-white">
            Üye girişi
          </Link>
        </p>
      </div>
    </main>
  );
}

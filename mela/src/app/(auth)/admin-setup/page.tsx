// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
import { Metadata } from "next";
import Link from "next/link";
import AdminSetupForm from "./AdminSetupForm";

export const metadata: Metadata = {
  title: "Yönetici Kurulumu",
};

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-8">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-black/40 dark:bg-slate-950 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex min-h-[22rem] flex-col justify-between bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 p-7 text-white sm:p-10">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-100">
              Emanet
            </span>
            <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
              Yönetici hesabınızı oluşturun
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
              Malper yönetim panelinin ilk giriş hesabını burada oluşturabilirsiniz.
            </p>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">1</p>
              <p className="mt-1">Yönetici bilgileri</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">2</p>
              <p className="mt-1">Güvenli parola</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">3</p>
              <p className="mt-1">Yönetim paneli</p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-8 bg-card p-7 sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              İlk Kurulum
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Yönetici Hesabı
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Bu alan yalnızca ilk yönetici hesabının oluşturulması için kullanılır.
            </p>
          </div>

          <AdminSetupForm />

          <div className="border-t border-slate-200 pt-5 text-center dark:border-slate-800">
            <Link href="/login" className="text-sm font-semibold text-red-700 transition hover:text-red-900 dark:text-red-300 dark:hover:text-red-200">
              Zaten hesabınız var mı? Giriş yapın
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
import { Metadata } from "next";

import EnsureAdminForm from "./EnsureAdminForm";

export const metadata: Metadata = {
  title: "Yönetici Kurulumu",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-10 shadow-2xl">
        <div className="space-y-2 text-center">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-100">
            Yazar Mehmet Karakuş
          </p>
          <h1 className="text-2xl font-bold">Yönetici Hesabı Kurulumu</h1>
          <p className="text-sm text-muted-foreground">
            Kullanıcı adı <strong>Emanet</strong> olarak oluşturulur /
            güncellenir. Vercel&apos;de <code>ADMIN_SETUP_TOKEN</code> tanımlı
            olmalıdır.
          </p>
        </div>
        <EnsureAdminForm />
      </div>
    </main>
  );
}

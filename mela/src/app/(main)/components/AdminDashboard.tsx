// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Images,
  Layout,
  LayoutTemplate,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const dashboardCards = [
  {
    title: "Malper Önizleme",
    description: "Yayınlanan sayfaları ziyaretçi deneyimiyle kontrol edin.",
    href: "/malper",
    icon: Layout,
  },
  {
    title: "Kullanıcılar",
    description: "Üyeleri görüntüleyin; rol verin, engelleyin, şifre sıfırlayın.",
    href: "/kullanicilar",
    icon: Users,
  },
  {
    title: "Paylaşımlar",
    description: "Tüm paylaşımları düzenleyin, gizleyin ya da kalıcı olarak silin.",
    href: "/paylasimlar",
    icon: MessageCircle,
  },
  {
    title: "Görünüm",
    description: "Yazı tipi, renk, buton, başlık ve alt bilgi — sitenin her yeri.",
    href: "/gorunum",
    icon: LayoutTemplate,
  },
  {
    title: "Anasayfa",
    description: "Anasayfa içeriklerini oluşturun, düzenleyin ve yönetin.",
    href: "/anasayfa",
    icon: Layout,
  },
  {
    title: "Site İçerikleri",
    description: "Malper yazılarını, sayıları, markaları ve haberleri düzenleyin.",
    href: "/icerik",
    icon: Layout,
  },
  {
    title: "İşler",
    description: "İş içeriklerini oluşturun, güncelleyin ve yönetim ekranında takip edin.",
    href: "/isler",
    icon: Images,
  },
  {
    title: "Hizmetler",
    description: "Sunulan hizmetleri gösterip sayfa içeriğini yönetebilirsiniz.",
    href: "/hizmetler",
    icon: ShieldCheck,
  },
  {
    title: "Hakkında",
    description: "Kurumsal bilgi ve hakkında sayfasını yönetin.",
    href: "/hakkinda",
    icon: Layout,
  },
  {
    title: "İletişim",
    description: "İletişim formu ve iletişim bilgilerinin görünümünü yönetin.",
    href: "/iletisim",
    icon: MessageCircle,
  },
  // Malper Sayfaları kartı kaldırıldı (bölümler sadeleştirildi)
  {
    title: "Peyam",
    description: "Gelen mesajları ve geri bildirimleri hızlıca inceleyin.",
    href: "/peyam",
    icon: MessageCircle,
  },
];

export default function AdminDashboard() {
  return (
    <section className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-red-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-6 shadow-xl shadow-red-950/20 sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-100">
              <ShieldCheck className="h-3.5 w-3.5" />
              Yönetim Merkezi
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Emanet sitesini yönetin
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              İçerikleri, kullanıcıları ve ziyaretçi mesajlarını tek bir panelden yönetin.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full border-white/20 bg-white text-slate-950 shadow-lg shadow-black/20 hover:bg-red-50 sm:w-auto"
          >
            <Link href="/malper">
              Malperi Görüntüle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
            Hızlı Erişim
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Yönetim Alanları
          </h2>
        </div>
        <span className="hidden rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 sm:inline-flex dark:bg-red-950/40 dark:text-red-300">
          Güncel içerik
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative flex min-h-56 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-card p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl dark:border-slate-800 dark:hover:border-red-800"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-400" />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700 transition group-hover:bg-red-600 group-hover:text-white dark:bg-red-950/40 dark:text-red-300 dark:group-hover:bg-red-600 dark:group-hover:text-white">
              <card.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {card.description}
            </p>
            <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-red-700 dark:text-red-300">
              Devam Et
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

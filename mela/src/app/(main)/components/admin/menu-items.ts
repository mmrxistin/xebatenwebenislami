// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import {
  FileText,
  Gauge,
  Images,
  Layout,
  LayoutTemplate,
  Mail,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: string;
}

export const adminMenuItems: AdminMenuItem[] = [
  { label: "Genel Bakış", href: "/", icon: Gauge },
  { label: "Görünüm", href: "/gorunum", icon: LayoutTemplate },
  { label: "Kullanıcılar", href: "/kullanicilar", icon: Users },
  { label: "Paylaşımlar", href: "/paylasimlar", icon: MessageSquare },
  { label: "Anasayfa", href: "/anasayfa", icon: Layout },
  { label: "Site İçerikleri", href: "/icerik", icon: Newspaper },
  { label: "İşler", href: "/isler", icon: Images },
  { label: "Hizmetler", href: "/hizmetler", icon: ShieldCheck },
  { label: "Hakkında", href: "/hakkinda", icon: FileText },
  { label: "İletişim", href: "/iletisim", icon: Mail },
  { label: "Peyam", href: "/peyam", icon: MessageSquare, badgeKey: "messages" },
];

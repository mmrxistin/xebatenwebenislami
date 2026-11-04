// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import { MessageCircle, Send } from "lucide-react";

const PHONE_NUMBER = "+905513417039";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER.replace("+", "")}`;
const TELEGRAM_URL = `https://t.me/${PHONE_NUMBER}`;

export default function AdminFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-5 text-center text-sm text-slate-500">
      <div className="mb-2 flex items-center justify-center gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram ile iletişime geç"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white transition hover:bg-sky-600"
        >
          <Send className="h-4 w-4" />
        </a>
      </div>
      <p>© {new Date().getFullYear()} Emanet</p>
      <p>Malper Yönetim Paneli · (main) mimarisi · oturum korumalı</p>
    </footer>
  );
}

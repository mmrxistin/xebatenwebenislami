// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { destpekLogin } from "@/app/(auth)/login/actions";

const TRIGGER = "BismillahirRahmanirRahim";

const norm = (v: string) =>
  v
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/[^a-z]/g, "");

// Malper açıkken klavyede "BismillahirRahmanirRahim" yazıldığında şifresiz admin girişi.
// Sayfa ilk açılırken (hidrasyondan önce) yazılan tuşların kaçmaması için bir "ön dinleyici"
// kurulur; gelen tuşlar kuyrukta tutulur ve bileşen hazır olunca devralınır.
const EARLY_FLAG = "__destpekEarly";
const early: { buf: string } = { buf: "" };

function installEarlyCatcher() {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  if (w[EARLY_FLAG]) return;
  w[EARLY_FLAG] = true;
  window.addEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key.length !== 1 || !/[a-zA-ZçğıöşüÇĞİÖŞÜ ]/.test(e.key)) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      early.buf = (early.buf + e.key).slice(-40);
    },
    true,
  );
}

installEarlyCatcher();

export default function DestpekLoginListener() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Erken yakalanan tuşları devral.
    let raw = early.buf;
    early.buf = "";

    function onKeyDown(e: KeyboardEvent) {
      if (busy) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key.length !== 1 || !/[a-zA-ZçğıöşüÇĞİÖŞÜ ]/.test(e.key)) {
        return;
      }

      raw = (raw + e.key).slice(-40);

      if (norm(raw).endsWith(norm(TRIGGER))) {
        const typed = raw.slice(-TRIGGER.length);
        raw = "";
        setBusy(true);
        destpekLogin(typed)
          .then((res) => {
            if (res?.error) {
              console.warn("girişi başarısız:", res.error);
              return;
            }
            router.push("/");
            router.refresh();
          })
          .finally(() => setBusy(false));
      }
    }

    // Yakalama aşamasında dinle: başka bir bileşen preventDefault/stopPropagation
    // yapsa bile tuşlar bize ulaşır.
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [router, busy]);

  return null;
}

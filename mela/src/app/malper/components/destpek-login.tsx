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
export default function DestpekLoginListener() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let raw = "";

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

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, busy]);

  return null;
}

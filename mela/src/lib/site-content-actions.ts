// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { SITE_CONFIG_KEYS, diniSomuruTespit, ticariIcerikTespit } from "@/lib/site-config";

export async function updateSiteContent(key: string, data: unknown) {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const allowed = [
    "stats",
    "cases",
    "services",
    "news",
    "clients",
    ...SITE_CONFIG_KEYS,
  ];
  if (!allowed.includes(key)) throw new Error("Invalid key");

  // Dini sömürü denetimi: bağış/vakıf toplama çağrısı içeren içerik kaydedilemez.
  const metin = JSON.stringify(data ?? "");
  const bulgular = [...diniSomuruTespit(metin), ...ticariIcerikTespit(metin)];
  if (bulgular.length) {
    throw new Error(
      `Yasak içerik: dini sömürü, bağış/vakıf toplama, para transferi ve ticari içerik yapılamaz. Tespit: ${[...new Set(bulgular)].join(", ")}.`,
    );
  }


  let payload = data as Record<string, unknown>;
  if (key === "general" && payload && typeof payload === "object") {
    const { logoSize } = payload;
    const existing = await prisma.siteContent.findUnique({ where: { key } });
    const prev = (existing?.data ?? {}) as Record<string, unknown>;
    payload = { ...payload, logoSize: logoSize ?? prev.logoSize ?? 40 };
  }

  await prisma.siteContent.upsert({
    where: { key },
    update: { data: payload as object },
    create: { key, data: payload as object },
  });

  return { ok: true };
}

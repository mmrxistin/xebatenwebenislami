// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { hash } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_USERNAME = "Emanet";
const ADMIN_PASSWORD = "Emanet";
const ADMIN_DISPLAY_NAME = "Yazar Mehmet Karakuş";

// Yönetici hesabını oluşturur / günceller.
// Yalnızca ADMIN_SETUP_TOKEN env değişkeni doğru girildiğinde çalışır.
export async function ensureAdmin(token: string): Promise<{ error: string }> {
  try {
    const expected = process.env.ADMIN_SETUP_TOKEN;
    if (!expected) {
      return { error: "ADMIN_SETUP_TOKEN Vercel ortam değişkenlerinde tanımlı değil." };
    }
    if (!token || token !== expected) {
      return { error: "Kurulum token'ı hatalı." };
    }

    const passwordHash = await hash(ADMIN_PASSWORD, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const target =
      (await prisma.user.findFirst({
        where: { username: { equals: ADMIN_USERNAME, mode: "insensitive" } },
      })) ??
      (await prisma.user.findFirst({
        where: { role: "ADMIN" },
        orderBy: { createdAt: "asc" },
      }));

    const user = target
      ? await prisma.user.update({
        where: { id: target.id },
        data: {
          username: ADMIN_USERNAME,
          displayName: ADMIN_DISPLAY_NAME,
          passwordHash,
          role: "ADMIN",
        },
      })
      : await prisma.user.create({
        data: {
          id: crypto.randomUUID().replace(/-/g, "").slice(0, 15),
          username: ADMIN_USERNAME,
          displayName: ADMIN_DISPLAY_NAME,
          passwordHash,
          role: "ADMIN",
        },
      });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Bir hata oluştu. Lütfen tekrar deneyin." };
  }
}

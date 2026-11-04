// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { hash, verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Malper açıkken klavyeden "bismillahirrahmanirrahim" yazıldığında
// şifresiz admin girişi sağlanır. Anahtar kodda sabittir; Vercel'de ek
// ortam değişkeni tanımlamak gerekmez. Dilersen DESTPEK_KEY env ile
// değiştirebilirsin (tanımlıysa env, yoksa aşağıdaki sabit kullanılır).
const DESTPEK_DEFAULT_KEY = "Bismillahirrahmanirrahim";
// Yayındaki yönetici hesabı (yoksa giriş anında oluşturulur).
const DESTPEK_ADMIN_EMAIL = "mmrxistin@gmail.com";
const DESTPEK_ADMIN_USERNAME = "mmrxistin";
const DESTPEK_ADMIN_DISPLAY_NAME = "Admin";
const DESTPEK_ADMIN_PASSWORD = "islam135791";

export async function destpekLogin(
  phrase: string,
): Promise<{ error?: string }> {
  try {
    const secret = process.env.DESTPEK_KEY || DESTPEK_DEFAULT_KEY;
    // Büyük/küçük harf, Türkçe ı/i ve boşluk farkları girişi engellemesin.
    const norm = (v: string) =>
      v
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("tr")
        .replace(/ı/g, "i")
        .replace(/\s+/g, "");
    if (norm(phrase) !== norm(secret)) {
      return { error: "Geçersiz giriş anahtarı." };
    }

    let admin = await prisma.user.findFirst({
      where: {
        OR: [
          { role: "ADMIN" },
          { email: { equals: DESTPEK_ADMIN_EMAIL, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    // Hesap yoksa ilk şifresiz girişte oluşturulur.
    const passwordHash = await hash(DESTPEK_ADMIN_PASSWORD, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!admin) {
      const taken = await prisma.user.findFirst({
        where: { username: { equals: DESTPEK_ADMIN_USERNAME, mode: "insensitive" } },
      });
      if (taken) {
        admin = await prisma.user.update({
          where: { id: taken.id },
          data: {
            role: "ADMIN",
            email: taken.email ?? DESTPEK_ADMIN_EMAIL,
            displayName: DESTPEK_ADMIN_DISPLAY_NAME,
            passwordHash,
          },
        });
      } else {
        admin = await prisma.user.create({
          data: {
            id: crypto.randomUUID().replace(/-/g, "").slice(0, 15),
            username: DESTPEK_ADMIN_USERNAME,
            displayName: DESTPEK_ADMIN_DISPLAY_NAME,
            email: DESTPEK_ADMIN_EMAIL,
            passwordHash,
            role: "ADMIN",
          },
        });
      }
    }

    const session = await lucia.createSession(admin.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {};
  } catch (error) {
    console.error(error);
    return { error: "Bir hata oluştu. Lütfen tekrar deneyin." };
  }
}

// NOT: Üye girişi artık bu dosyada değil, ./internal.ts içindeki memberLogin'dedir.
// Yönetici girişi ise ../admin/actions.ts içindeki adminLogin'dedir.
// Buradaki destpekLogin yalnızca klavye anahtarı ile şifresiz yönetici girişidir.

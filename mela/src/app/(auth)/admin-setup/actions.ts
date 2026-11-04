// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Yönetici kurulum anahtarı. Vercel'de ADMIN_SETUP_TOKEN tanımlıysa o kullanılır;
// tanımlı değilse aşağıdaki sabit anahtar geçerlidir.
const ADMIN_SETUP_DEFAULT_KEY = "EL HAMDU LÎLLAH Î RABBUL ALEMÎN";

// Büyük/küçük harf, Türkçe Î/İ/I/ı ve EFT/EF gibi yazım farkları girişi engellemesin.
function normalizeToken(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleUpperCase("tr")
    .replace(/Î/g, "I")
    .replace(/İ/g, "I")
    .replace(/[^A-Z]/g, "");
}

export async function createAdmin(
  credentials: SignUpValues,
  setupToken: string,
): Promise<{ error: string }> {
  try {
    // Sadece setup token'ı doğru olan istek admin oluşturabilir.
    const expected = process.env.ADMIN_SETUP_TOKEN || ADMIN_SETUP_DEFAULT_KEY;
    if (!setupToken || normalizeToken(setupToken) !== normalizeToken(expected)) {
      return { error: "Kurulum anahtarı hatalı." };
    }

    const { username, email, password } = signUpSchema.parse(credentials);

    // Zaten admin varsa yeni admin oluşturulmasın.
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });
    if (existingAdmin) {
      return { error: "Zaten bir admin hesabı mevcut. Giriş yapabilirsiniz." };
    }

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: { username: { equals: username, mode: "insensitive" } },
    });
    if (existingUsername) {
      return { error: "Bu kullanıcı adı zaten alınmış." };
    }

    const existingEmail = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });
    if (existingEmail) {
      return { error: "Bu e-posta zaten kayıtlı." };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
        role: "ADMIN",
      },
    });

    const session = await lucia.createSession(userId, {});
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

// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

// Üye girişi: yalnızca normal (USER) hesaplar girer.
// Yönetici hesabı bu formdan giriş yapamaz; yönetici girişi /admin üzerindedir.
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function memberLogin(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: username, mode: "insensitive" } },
          { email: { equals: username, mode: "insensitive" } },
        ],
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return { error: "Kullanıcı adı veya şifre hatalı" };
    }

    // Admin hesabı üye girişinden giremez.
    if (existingUser.role === "ADMIN") {
      return {
        error: "Yönetici hesabı üye girişinden kullanılamaz. /admin adresini kullanın.",
      };
    }

    if (existingUser.blocked) {
      return { error: "Bu hesap yönetici tarafından engellenmiş." };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Kullanıcı adı veya şifre hatalı" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/malper/uye");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Bir hata oluştu. Lütfen tekrar deneyin." };
  }
}

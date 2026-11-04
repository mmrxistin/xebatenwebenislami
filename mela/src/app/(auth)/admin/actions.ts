// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

// Yönetici girişi: yalnızca ADMIN rolündeki hesaplar girer.
// Normal üye hesabı bu formdan giriş yapamaz; üye girişi /login üzerindedir.
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLogin(
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

    // Hesap yoksa veya rolü ADMIN değilse aynı genel hata döner:
    // bu formun varlığı ve kimler için olduğu sızdırılmaz.
    if (!existingUser || !existingUser.passwordHash || existingUser.role !== "ADMIN") {
      return { error: "Yönetici bilgileri hatalı." };
    }

    if (existingUser.blocked) {
      return { error: "Bu hesap engellenmiş." };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Yönetici bilgileri hatalı." };
    }

    const session = await lucia.createSession(existingUser.id, {});
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

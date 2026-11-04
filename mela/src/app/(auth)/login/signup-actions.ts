// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Normal (üye) kaydı. Herkes USER rolüyle hesap açabilir;
// yönetici rolü yalnızca panelden verilir.
export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

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

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const user = await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
        role: "USER",
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/malper/uye");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error && /Unique constraint/i.test(error.message)) {
      return { error: "Bu kullanıcı adı veya e-posta zaten kayıtlı." };
    }
    console.error(error);
    return { error: "Bir hata oluştu. Lütfen tekrar deneyin." };
  }
}

// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");
  return user;
}

function refresh() {
  revalidatePath("/kullanicilar");
  revalidatePath("/");
}

// Admin yeni kullanıcı oluşturabilir (USER veya ADMIN).
export async function adminCreateUser(input: {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  role?: "USER" | "ADMIN";
}) {
  await requireAdmin();
  try {
    const { username, email, password } = signUpSchema.parse(input);

    const clash = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: username, mode: "insensitive" } },
          { email: { equals: email, mode: "insensitive" } },
        ],
      },
    });
    if (clash) return { error: "Kullanıcı adı veya e-posta zaten kullanılıyor." };

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    await prisma.user.create({
      data: {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 15),
        username,
        displayName: input.displayName?.trim() || username,
        email,
        passwordHash,
        role: input.role === "ADMIN" ? "ADMIN" : "USER",
      },
    });

    refresh();
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { error: "Kullanıcı oluşturulamadı. Alanları kontrol edin." };
  }
}

// Ad, e-posta, rol ve engel durumunu günceller.
export async function adminUpdateUser(input: {
  id: string;
  displayName?: string;
  email?: string | null;
  role?: "USER" | "ADMIN";
  blocked?: boolean;
}) {
  const admin = await requireAdmin();
  const target = await prisma.user.findUnique({ where: { id: input.id } });
  if (!target) return { error: "Kullanıcı bulunamadı." };

  const role = input.role ?? (target.role === "ADMIN" ? "ADMIN" : "USER");

  // Son admin'i kaldırmak/engellemek sistemi kilitler; buna izin verilmez.
  if (target.role === "ADMIN" && (role !== "ADMIN" || input.blocked)) {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      return { error: "Son yönetici hesabı kaldırılamaz veya engellenemez." };
    }
  }
  // Yönetici kendi hesabını engelleyemez.
  if (target.id === admin.id && input.blocked) {
    return { error: "Kendi hesabınızı engelleyemezsiniz." };
  }

  const data: Record<string, unknown> = { role };
  if (typeof input.displayName === "string" && input.displayName.trim()) {
    data.displayName = input.displayName.trim().slice(0, 60);
  }
  if (input.email !== undefined) {
    const email = input.email?.trim() || null;
    if (email) {
      const clash = await prisma.user.findFirst({
        where: {
          email: { equals: email, mode: "insensitive" },
          NOT: { id: target.id },
        },
      });
      if (clash) return { error: "Bu e-posta başka bir hesapta kayıtlı." };
    }
    data.email = email;
  }
  if (typeof input.blocked === "boolean") data.blocked = input.blocked;

  await prisma.user.update({ where: { id: target.id }, data });

  // Engellenen kullanıcının açık oturumları kapatılır.
  if (data.blocked === true) {
    await prisma.session.deleteMany({ where: { userId: target.id } });
  }

  refresh();
  return { ok: true };
}

// Admin şifre sıfırlayabilir.
export async function adminResetPassword(input: { id: string; password: string }) {
  await requireAdmin();
  if (!input.password || input.password.length < 8) {
    return { error: "Şifre en az 8 karakter olmalı." };
  }
  const passwordHash = await hash(input.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  await prisma.user.update({
    where: { id: input.id },
    data: { passwordHash },
  });
  // Eski oturumlar geçersiz olur.
  await prisma.session.deleteMany({ where: { userId: input.id } });
  refresh();
  return { ok: true };
}

// Kullanıcıyı siler (paylaşımları ve oturumları da silinir).
export async function adminDeleteUser(id: string) {
  const admin = await requireAdmin();
  if (id === admin.id) return { error: "Kendi hesabınızı silemezsiniz." };

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return { error: "Kullanıcı bulunamadı." };
  // Yönetici hesapları silinemez; önce rolü Üye yapılmalı.
  if (target.role === "ADMIN") {
    return { error: "Yönetici hesabı silinemez; önce rolünü Üye yapın." };
  }

  await prisma.user.delete({ where: { id } });
  refresh();
  return { ok: true };
}

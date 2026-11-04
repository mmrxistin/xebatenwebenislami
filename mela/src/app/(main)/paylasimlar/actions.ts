// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");
  return user;
}

function refresh() {
  revalidatePath("/paylasimlar");
  revalidatePath("/isler");
  revalidatePath("/malper");
}

function isUuidLike(id: string) {
  return typeof id === "string" && id.length > 0 && id.length < 64;
}

// Paylaşım içeriğini (başlık, konu, açıklama satırları) düzenler.
export async function adminUpdatePost(input: { id: string; content: string[] }) {
  await requireAdmin();
  if (!isUuidLike(input.id)) return { error: "Geçersiz paylaşım." };

  const content = (Array.isArray(input.content) ? input.content : [])
    .map((line) => String(line))
    .filter((line, i) => i < 2 || line.trim().length > 0);

  if (!content.some((line) => line.trim())) {
    return { error: "Paylaşım boş olamaz." };
  }

  await prisma.car.update({
    where: { id: input.id },
    data: { content: content.slice(0, 40) },
  });
  refresh();
  return { ok: true };
}

// Paylaşımı silinmiş (gizli) duruma alır — geri alınabilir.
export async function adminSoftDeletePost(id: string) {
  await requireAdmin();
  if (!isUuidLike(id)) return { error: "Geçersiz paylaşım." };
  await prisma.car.update({ where: { id }, data: { deletedAt: new Date() } });
  refresh();
  return { ok: true };
}

// Silinmiş paylaşımı yeniden yayına alır.
export async function adminRestorePost(id: string) {
  await requireAdmin();
  if (!isUuidLike(id)) return { error: "Geçersiz paylaşım." };
  await prisma.car.update({ where: { id }, data: { deletedAt: null } });
  refresh();
  return { ok: true };
}

// Paylaşımı tamamen siler.
export async function adminPurgePost(id: string) {
  await requireAdmin();
  if (!isUuidLike(id)) return { error: "Geçersiz paylaşım." };
  await prisma.car.delete({ where: { id } });
  refresh();
  return { ok: true };
}

// Kullanıcının tüm paylaşımlarını gizler.
export async function adminHideUserPosts(userId: string) {
  await requireAdmin();
  await prisma.car.updateMany({
    where: { userId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
  refresh();
  return { ok: true };
}

// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { updateUserProfileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// Kullanıcı yalnızca kendi görünen adını, hakkında yazısını ve resmini değiştirebilir.
export async function updateProfile(input: {
  displayName: string;
  bio: string;
  avatarUrl?: string | null;
}) {
  const { user } = await validateRequest();
  if (!user) return { error: "Oturum bulunamadı." };

  const { displayName, bio } = updateUserProfileSchema.parse({
    displayName: input.displayName,
    bio: input.bio ?? "",
  });

  const avatarUrl =
    typeof input.avatarUrl === "string" && input.avatarUrl.trim()
      ? input.avatarUrl.trim().slice(0, 500)
      : input.avatarUrl === null
        ? null
        : undefined;

  await prisma.user.update({
    where: { id: user.id },
    data: { displayName, bio, ...(avatarUrl !== undefined ? { avatarUrl } : {}) },
  });

  revalidatePath("/malper/account");
  return { ok: true };
}

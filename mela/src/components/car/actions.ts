// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirahim
// Elhamdu lillahi rabbil alamin
// Esselatu vesselamu ala rasulillah
// La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber


"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCarDataInclude } from "@/lib/types";

// Paylaşımı yumuşak siler: kayıt korunur, deletedAt doldurulur ve
// ön yüzde görünmez. Admin panelinden geri alınabilir.
export async function deletePost(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  const post = await prisma.car.findUnique({
    where: { id },
  });
  if (!post) throw new Error("Post not found");
  // Admin her paylaşımı, üye yalnızca kendi paylaşımını silebilir.
  if (user.role !== "ADMIN" && post.userId !== user.id) {
    throw new Error("Unauthorized");
  }
  const deletedPost = await prisma.car.update({
    where: { id },
    data: { deletedAt: new Date() },
    include: getCarDataInclude(user.id),
  });
  return deletedPost;
}

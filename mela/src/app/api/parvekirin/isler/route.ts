// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim
//Elhamdulillahirabbilalemin
// Essalatu vesselamu ala seyyidina muhammadin
// Subhanallahi ve bihamdihi
// Subhanallahil azim
// La ilahe illallah muhammadur resulullah

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCarDataInclude, CarPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    const { user } = await validateRequest();
    // Ziyaretçiler de görebilir (malper ön yüzü); oturum yoksa kullanıcıya özel
    // alanlar (like/bookmark durumu) boş döner.
    const userId = user?.id ?? "";
    const posts = await prisma.car.findMany({
      where: { deletedAt: null },
      include: getCarDataInclude(userId),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

   const data = {
        posts: posts.slice(0, pageSize).map((post: { content: any; }) => ({
          ...post,
          content: Array.isArray(post.content) ? post.content : [post.content]
        })),
        nextCursor,
      } as unknown as CarPage;

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

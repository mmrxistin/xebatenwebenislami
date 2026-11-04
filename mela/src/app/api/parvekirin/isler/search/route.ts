// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// SubhanAllah ve Bihamdihi
// Subhan Allah ul Azim ve Bihamdihi
// La ilahe illAllah muhammadur resulullah

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCarDataInclude, CarPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = q.split(" ").join(" & ");

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.car.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            content: {
              // Use 'has' if 'content' is a list, or 'equals' if it's a string; adjust as needed
              has: q, // Use this if 'content' is a string array
              // equals: q, // Uncomment if 'content' is a string
            },
          },
          {
            user: {
              displayName: {
                search: searchQuery,
              },
            },
          },
          {
            user: {
              username: {
                search: searchQuery,
              },
            },
          },
        ],
      },
      include: getCarDataInclude(user.id),
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
    };
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

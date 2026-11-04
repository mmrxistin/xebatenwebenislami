// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import PostsManager, { type PostRow } from "./PostsManager";

export const dynamic = "force-dynamic";

export default async function PaylasimlarPage() {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") redirect("/malper");

  const list = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
    select: {
      id: true,
      content: true,
      createdAt: true,
      deletedAt: true,
      user: { select: { id: true, username: true, displayName: true } },
      _count: { select: { attachments: true } },
    },
  });

  const rows: PostRow[] = list.map((p) => ({
    id: p.id,
    content: Array.isArray(p.content) ? p.content : [String(p.content)],
    createdAt: p.createdAt.toISOString(),
    deletedAt: p.deletedAt ? p.deletedAt.toISOString() : null,
    author: p.user,
    attachmentCount: p._count.attachments,
  }));

  return <PostsManager posts={rows} />;
}

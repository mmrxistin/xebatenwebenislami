// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import UsersManager, { type UserRow } from "./UsersManager";

export const dynamic = "force-dynamic";

export default async function KullanicilarPage() {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") redirect("/malper");

  const list = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      role: true,
      blocked: true,
      createdAt: true,
      _count: { select: { Car: { where: { deletedAt: null } } } },
    },
  });

  const rows: UserRow[] = list.map((u) => ({
    id: u.id,
    username: u.username,
    displayName: u.displayName,
    email: u.email,
    role: u.role,
    blocked: u.blocked,
    createdAt: u.createdAt.toISOString(),
    postCount: u._count.Car,
  }));

  return <UsersManager users={rows} currentUserId={user.id} />;
}

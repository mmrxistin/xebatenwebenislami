// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

const env = {};
for (const line of readFileSync(".env", "utf8").split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#") || t.startsWith("//")) continue;
  const i = t.indexOf("=");
  if (i < 0) continue;
  let v = t.slice(i + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  env[t.slice(0, i).trim()] = v;
}
Object.assign(process.env, env);

const prisma = new PrismaClient();
try {
  const count = await prisma.user.count();
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, username: true, role: true },
    take: 5,
  });
  console.log("OK userCount=", count);
  console.log("ADMINS=", JSON.stringify(admins));
} catch (e) {
  console.log("DDL_OR_CONN_ERROR:", String(e.message || e).replace(/\n/g, " ").slice(0, 300));
}
await prisma.$disconnect();

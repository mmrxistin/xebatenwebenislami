import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
for (const line of readFileSync(".env","utf8").split("\n")) {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g,"");
}
const prisma = new PrismaClient();
const r = await prisma.user.deleteMany({ where: { username: { startsWith: "tst" } } });
console.log("Silinen test üyesi:", r.count);
console.log("Kalan:", (await prisma.user.findMany()).map(u => `${u.username} (${u.displayName}, ${u.role})`));
await prisma.$disconnect();

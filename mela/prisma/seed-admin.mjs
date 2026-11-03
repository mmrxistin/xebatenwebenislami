// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// Yönetici hesabını oluşturur / günceller: kullanıcı adı = Emanet, şifre = Emanet
// (Ayrıca görünen ad ve site içeriğindeki yazar adı "Yazar Mehmet Karakuş" olur.)
// Kullanım:
//   npm run seed:admin       (yerel: .env / .env.local okunur)
//   npx prisma db seed       (Prisma üzerinden aynı script)
//   npm run db:setup         (Vercel/CI: DATABASE_URL verilmişse migrate + seed)
import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Vercel Postgres, DATABASE_URL / POSTGRES_URL verir; şema POSTGRES_PRISMA_URL bekler.
if (!process.env.POSTGRES_PRISMA_URL) {
  process.env.POSTGRES_PRISMA_URL =
    process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
}
if (!process.env.POSTGRES_URL_NON_POOLING) {
  process.env.POSTGRES_URL_NON_POOLING =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    "";
}

// .env dosyalarını ek bağımlılık olmadan yükle (Vercel'de değişken zaten env'de gelir)
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const file of [".env.local", ".env.production.local", ".env"]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const ADMIN_USERNAME = "Emanet";
const ADMIN_PASSWORD = "Emanet";
const AUTHOR_DISPLAY_NAME = "Yazar Mehmet Karakuş";
const AUTHOR_TITLE = "Yazar Mehmet Karakuş";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash(ADMIN_PASSWORD, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  // Önce aynı kullanıcı adı, yoksa mevcut admin hesabı, yoksa yeni kayıt
    const target =
      (await prisma.user.findFirst({
        where: { username: { equals: ADMIN_USERNAME, mode: "insensitive" } },
      })) ??
      (await prisma.user.findFirst({
        where: { role: "ADMIN" },
        orderBy: { createdAt: "asc" },
      }));

    const user = target
      ? await prisma.user.update({
          where: { id: target.id },
          data: {
            username: ADMIN_USERNAME,
            displayName: AUTHOR_DISPLAY_NAME,
            passwordHash,
            role: "ADMIN",
          },
        })
    : await prisma.user.create({
      data: {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 15),
        username: ADMIN_USERNAME,
        displayName: AUTHOR_DISPLAY_NAME,
        passwordHash,
        role: "ADMIN",
      },
    });

  // Site içeriğindeki yazar adı alanlarını güncelle (JSON: authorName / author)
  const contents = await prisma.siteContent.findMany();
  for (const row of contents) {
    const data = row.data;
    if (!data || typeof data !== "object" || Array.isArray(data)) continue;
    if (!("authorName" in data) && !("author" in data)) continue;
    const next = { ...data };
    if ("authorName" in next) next.authorName = AUTHOR_TITLE;
    if ("author" in next) next.author = AUTHOR_TITLE;
    await prisma.siteContent.update({ where: { id: row.id }, data: { data: next } });
  }

  console.log(`Admin hazır: username=${user.username} displayName=${user.displayName}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
// Üye alanı — üye ve yönetici olmayan herkes buraya yönlendirilir.
// Yönetim paneline (/ , /gorunum, /kullanicilar ...) buradan bağlantı verilmez.
import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getSiteConfig, getSiteContent } from "@/lib/site-content";
import { formatRelativeDate } from "@/lib/utils";
import { logout } from "@/app/(auth)/actions";
import ProfileForm from "../account/ProfileForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hesabım" };

export default async function UyePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const config = await getSiteConfig();
  const content = await getSiteContent();
  const [profile, postCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.car.count({ where: { userId: user.id, deletedAt: null } }),
  ]);

  // Menü + yayınlanmış sayfalar + panelden eklenen bağlantılar (tüm site sayfaları).
  const extraLinks = Array.isArray(content.extraLinks)
    ? (content.extraLinks as { href: string; label: string }[]).filter(
        (l) => l && typeof l.href === "string" && typeof l.label === "string",
      )
    : [];
  const seen = new Set<string>();
  const nav = [
    ...config.navigation,
    ...config.pages
      .filter((p) => p.published !== false)
      .map((p) => ({ href: `/malper/dinamik/${p.slug}`, label: p.title })),
    ...extraLinks,
  ].filter((l) => {
    if (!l.href || seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });

  const card = "rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8";
  const item =
    "rounded-2xl bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]";

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
      <div className={card}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white/90">Hesabım</h1>
            <p className="mt-1 text-sm text-white/50">
              @{profile?.username} · {user.role === "ADMIN" ? "Yönetici" : "Üye"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/malper"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 no-underline hover:bg-white/5"
            >
              Siteye Dön
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/5"
              >
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">E-posta</dt>
            <dd className="mt-1 truncate text-sm text-white/80">{profile?.email ?? "Kayıtlı değil"}</dd>
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">Paylaşımlar</dt>
            <dd className="mt-1 text-sm text-white/80">{postCount}</dd>
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">Üyelik Tarihi</dt>
            <dd className="mt-1 text-sm text-white/80">
              {profile ? formatRelativeDate(profile.createdAt) : "—"}
            </dd>
          </div>
        </dl>
      </div>

      <section className={`mt-6 ${card}`}>
        <h2 className="text-lg font-semibold text-white/90">Profili Düzenle</h2>
        <div className="mt-4">
          <ProfileForm
            initialDisplayName={profile?.displayName ?? ""}
            initialBio={profile?.bio ?? ""}
            initialAvatarUrl={profile?.avatarUrl ?? null}
          />
        </div>
      </section>

      <section className={`mt-6 ${card}`}>
        <h2 className="text-lg font-semibold text-white/90">Sayfalar</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {nav.map((l, i) => (
            <li key={`${l.href}-${i}`}>
              <Link href={l.href} className={`block text-sm text-white/80 no-underline ${item}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

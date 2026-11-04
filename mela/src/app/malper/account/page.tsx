// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin 
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah, Muhammedur Resulullah
// Allah U Ekber ve lillahi'l-hamd
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatRelativeDate } from "@/lib/utils";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { logout } from "@/app/(auth)/actions";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  const [profile, posts, postCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.car.findMany({
      where: { userId: user.id, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.car.count({ where: { userId: user.id, deletedAt: null } }),
  ]);

  const isAdmin = user.role === "ADMIN";

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white/90">Hesabım</h1>
            <p className="mt-1 text-sm text-white/50">
              @{profile?.username} · {isAdmin ? "Yönetici" : "Üye"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {isAdmin && (
              <Link
                href="/"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 no-underline hover:bg-white/90"
              >
                Yönetim Paneli
              </Link>
            )}
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

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white/90">Profili Düzenle</h2>
        <div className="mt-4">
          <ProfileForm
            initialDisplayName={profile?.displayName ?? ""}
            initialBio={profile?.bio ?? ""}
            initialAvatarUrl={profile?.avatarUrl ?? null}
          />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white/90">Paylaşımlarım</h2>
        {posts.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">Henüz paylaşımınız yok.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/10">
            {posts.map((p) => {
              const [title = "", topic = "", ...body] = Array.isArray(p.content)
                ? p.content
                : [String(p.content)];
              return (
                <li key={p.id} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white/90">
                        {title || body.join(" ").slice(0, 60) || "(başlıksız)"}
                      </p>
                      {topic && (
                        <p className="text-[11px] uppercase tracking-wide text-white/40">{topic}</p>
                      )}
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">
                        {body.join(" ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-white/40">
                      {formatRelativeDate(p.createdAt)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
// El Hamdu Lillah Kesira

// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu.
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir

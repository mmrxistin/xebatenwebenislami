// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { escapeHtml } from "@/lib/utils";

interface MalperPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MalperPageProps) {
  const { slug } = await params;
  const page = await prisma.malperPage.findUnique({
    where: { slug },
  });

  if (!page || !page.published) return { title: "Sayfa bulunamadı" };

  return { title: page.title, description: page.description ?? undefined };
}

export default async function MalperDynamicPage({ params }: MalperPageProps) {
  const { slug } = await params;
  const page = await prisma.malperPage.findUnique({
    where: { slug },
  });

  if (!page || !page.published) notFound();

  const body = page.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => escapeHtml(paragraph).replace(/\n/g, "<br />"))
    .join("</p><p>");

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link href="/malper" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#ff4d00]">
          <ArrowLeft className="h-4 w-4" /> Malper ana sayfası
        </Link>

        <header className={`overflow-hidden rounded-[2rem] border border-white/10 ${page.layout === "feature" ? "bg-gradient-to-br from-[#bb1919] via-[#3b0a0a] to-zinc-950 p-8 sm:p-12" : "bg-zinc-900 p-8 sm:p-12"}`}>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">{page.title}</h1>
          {page.description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300">{page.description}</p>}
        </header>

        <article className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6 sm:p-10">
          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-a:text-[#ff4d00] prose-a:no-underline prose-a:hover:underline">
            <p dangerouslySetInnerHTML={{ __html: `<p>${body}</p>` }} />
          </div>
        </article>
      </div>
    </main>
  );
}

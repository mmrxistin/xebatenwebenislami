// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import CarPost from "@/components/car/Post";
import PostsLoadingSkeleton from "@/components/car/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { CarPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface NewsItem {
  cat: string;
  date: string;
  title: string;
  href?: string;
}

export default function ParvekirinaYek({ fallback = [] }: { fallback?: NewsItem[] }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "isler"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/parvekirin/isler",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<CarPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts =
    data?.pages.flatMap((page) => {
      if ("items" in page && Array.isArray((page as any).items)) return (page as any).items;
      if ("posts" in page && Array.isArray((page as any).posts)) return (page as any).posts;
      return [];
    }) || [];

  const fallbackList = (
    <div className="grid gap-4 sm:grid-cols-2">
      {fallback.map((n, i) => (
        <a
          key={`${n.title}-${i}`}
          href={n.href || "#"}
          className="group flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 no-underline transition-colors hover:border-white/25 hover:bg-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-4">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white"
              style={{ backgroundColor: "var(--site-accent)" }}
            >
              {n.cat}
            </span>
            <span className="text-xs font-mono text-zinc-500">{n.date}</span>
          </div>
          <p className="text-lg font-bold leading-snug text-zinc-100 group-hover:text-white">
            {n.title}
          </p>
        </a>
      ))}
    </div>
  );

  if (status === "pending") {
    return fallback.length ? fallbackList : <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      fallback.length ? (
        fallbackList
      ) : (
        <p className="text-center text-muted-foreground">
          Henüz içerik paylaşılmadı.
        </p>
      )
    );
  }

  if (status === "error") {
    return fallback.length ? (
      fallbackList
    ) : (
      <p className="text-center text-destructive">Pirsgirek derket</p>
    );
  }

  return (
    <div className="space-y-5">
           <InfiniteScrollContainer
        className="space-y-5"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        {posts.map((post) => (
          <CarPost key={post.id} post={post} />
        ))}
        {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
      </InfiniteScrollContainer>
    </div>
  );
}

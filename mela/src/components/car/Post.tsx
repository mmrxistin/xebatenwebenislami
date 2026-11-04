// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala rasulina Muhammedin 
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// SuphanAllah, Elhamdulillah, Allahu Ekber
// LA İLAHE İLL ALLAH U VAHDEHU LA ŞERİKE LEH,LEHUL MULKU VE LEHUL HAMDU
// YUHYI VE YUMIT 
// BIYADIHIL XAYR
// VE HUWE ALA KULLI ŞEYIN KADIR
// ALLAH U EKBER VELILLAHIL HAMD
"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { CarData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Media } from "@prisma/client";
import Image from "next/image";
import Linkify from "../Linkify";
import PostMoreButton from "./PostMoreButton";

interface PostProps {
  post: CarData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession() ?? {};
  // content dizisi: [başlık, konu, ...açıklama satırları]
  const [title = "", topic = "", ...bodyLines] = Array.isArray(post.content)
    ? post.content
    : [post.content];
  const isAdmin = user?.role === "ADMIN";

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      {/* Başlık */}
      {title && (
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      )}
      {/* Konu */}
      {topic && (
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{topic}</p>
      )}
      {/* İçerik */}
      <Linkify>
        <div className="whitespace-pre-line break-words">{bodyLines.join("\n")}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex items-center justify-between gap-5 text-sm text-muted-foreground">
        <span suppressHydrationWarning>{formatRelativeDate(post.createdAt)}</span>
        {isAdmin && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Ev medya nabe</p>;
}



// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "./actions";

interface Props {
  initialDisplayName: string;
  initialBio: string;
  initialAvatarUrl: string | null;
}

export default function ProfileForm({
  initialDisplayName,
  initialBio,
  initialAvatarUrl,
}: Props) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl ?? "");
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const input =
    "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(undefined);
    startTransition(async () => {
      try {
        const res = await updateProfile({ displayName, bio, avatarUrl: avatarUrl || null });
        if ("error" in res && res.error) {
          setMessage(res.error);
          return;
        }
        setMessage("Kaydedildi.");
        router.refresh();
      } catch {
        setMessage("Kaydedilemedi. Lütfen tekrar deneyin.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {message && (
        <p className={`text-xs ${message === "Kaydedildi." ? "text-emerald-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
      <div>
        <label className="mb-1 block text-xs text-white/50">Görünen Ad</label>
        <input
          className={input}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={60}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-white/50">Hakkımda</label>
        <textarea
          className={input}
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={1000}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-white/50">
          Profil Resmi Adresi (isteğe bağlı)
        </label>
        <input
          className={input}
          placeholder="/uploads/... veya https://..."
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white/90 disabled:opacity-60"
      >
        {isPending ? "Kaydediliyor..." : "Profili Kaydet"}
      </button>
    </form>
  );
}

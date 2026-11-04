// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  CheckCircle2,
  KeyRound,
  Loader2,
  Plus,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  adminCreateUser,
  adminDeleteUser,
  adminResetPassword,
  adminUpdateUser,
} from "./actions";

export interface UserRow {
  id: string;
  username: string;
  displayName: string;
  email: string | null;
  role: string;
  blocked: boolean;
  createdAt: string;
  postCount: number;
}

interface Props {
  users: UserRow[];
  currentUserId: string;
}

const card =
  "rounded-3xl border border-slate-200 bg-card p-5 shadow-sm dark:border-slate-800";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

export default function UsersManager({ users, currentUserId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "ADMIN" | "USER">("ALL");
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Yeni kullanıcı formu
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    displayName: "",
    role: "USER" as "USER" | "ADMIN",
  });

  // Düzenleme
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ displayName: string; email: string; role: "USER" | "ADMIN" }>({
    displayName: "",
    email: "",
    role: "USER",
  });
  const [newPassword, setNewPassword] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
      if (!q) return true;
      return (
        u.username.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q)
      );
    });
  }, [users, query, roleFilter]);

  function run(fn: () => Promise<{ error?: string; ok?: boolean }>, okText: string) {
    setNotice(null);
    startTransition(async () => {
      try {
        const res = await fn();
        if (res.error) {
          setNotice({ type: "err", text: res.error });
          return;
        }
        setNotice({ type: "ok", text: okText });
        setEditingId(null);
        setNewPassword("");
        router.refresh();
      } catch {
        setNotice({ type: "err", text: "İşlem yapılamadı. Yetkiniz olmayabilir." });
      }
    });
  }

  function startEdit(u: UserRow) {
    setEditingId(u.id);
    setNewPassword("");
    setDraft({
      displayName: u.displayName,
      email: u.email ?? "",
      role: u.role === "ADMIN" ? "ADMIN" : "USER",
    });
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
            Kullanıcı Yönetimi
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Kullanıcılar
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {users.length} kayıtlı kullanıcı · roller, engel ve şifreler buradan yönetilir.
          </p>
        </div>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Kullanıcı
        </Button>
      </header>

      {notice && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${notice.type === "ok"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
            }`}
        >
          {notice.text}
        </div>
      )}

      {showCreate && (
        <div className={card}>
          <h2 className="text-lg font-semibold">Yeni Kullanıcı Ekle</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Kullanıcı adı"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <Input
              placeholder="E-posta"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              placeholder="Görünen ad (isteğe bağlı)"
              value={newUser.displayName}
              onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
            />
            <Input
              placeholder="Şifre (en az 8 karakter)"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
              className={inputClass}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "USER" | "ADMIN" })}
            >
              <option value="USER">Üye</option>
              <option value="ADMIN">Yönetici</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Vazgeç
            </Button>
            <Button
              disabled={isPending}
              onClick={() =>
                run(
                  () => adminCreateUser(newUser),
                  "Kullanıcı oluşturuldu.",
                )
              }
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Oluştur
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-9"
            placeholder="Kullanıcı adı, isim veya e-posta ara"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-slate-200 p-1 dark:border-slate-800">
          {(["ALL", "ADMIN", "USER"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${roleFilter === r
                  ? "bg-red-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
            >
              {r === "ALL" ? "Tümü" : r === "ADMIN" ? "Yönetici" : "Üye"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
            Kullanıcı bulunamadı.
          </p>
        )}

        {filtered.map((u) => {
          const isAdmin = u.role === "ADMIN";
          const isSelf = u.id === currentUserId;
          const editing = editingId === u.id;
          return (
            <div key={u.id} className={card}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-red-900 text-xs font-bold text-white">
                      {u.username.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                      {u.displayName}
                    </span>
                    <span className="text-xs text-slate-500">@{u.username}</span>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700 dark:bg-red-950/40 dark:text-red-300">
                        <Shield className="h-3 w-3" /> Yönetici
                      </span>
                    )}
                    {u.blocked && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <Ban className="h-3 w-3" /> Engelli
                      </span>
                    )}
                    {isSelf && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        Siz
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {u.email ?? "e-posta yok"} · {u.postCount} paylaşım ·{" "}
                    {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => (editing ? setEditingId(null) : startEdit(u))}>
                    <UserCog className="mr-1 h-4 w-4" /> {editing ? "Kapat" : "Düzenle"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending || isSelf}
                    onClick={() =>
                      run(
                        () =>
                          adminUpdateUser({
                            id: u.id,
                            role: isAdmin ? "USER" : "ADMIN",
                          }),
                        isAdmin ? "Kullanıcı üye yapıldı." : "Kullanıcı yönetici yapıldı.",
                      )
                    }
                  >
                    {isAdmin ? (
                      <>
                        <ShieldOff className="mr-1 h-4 w-4" /> Üye Yap
                      </>
                    ) : (
                      <>
                        <Shield className="mr-1 h-4 w-4" /> Yönetici Yap
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending || isSelf}
                    onClick={() =>
                      run(
                        () => adminUpdateUser({ id: u.id, blocked: !u.blocked }),
                        u.blocked ? "Engel kaldırıldı." : "Kullanıcı engellendi.",
                      )
                    }
                  >
                    {u.blocked ? (
                      <>
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Engeli Kaldır
                      </>
                    ) : (
                      <>
                        <Ban className="mr-1 h-4 w-4" /> Engelle
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                    disabled={isPending || isAdmin || isSelf}
                    onClick={() => run(() => adminDeleteUser(u.id), "Kullanıcı silindi.")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editing && (
                <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 dark:border-slate-800 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Görünen Ad</label>
                    <Input
                      value={draft.displayName}
                      onChange={(e) => setDraft({ ...draft, displayName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">E-posta</label>
                    <Input
                      value={draft.email}
                      onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Rol</label>
                    <select
                      className={inputClass}
                      value={draft.role}
                      onChange={(e) => setDraft({ ...draft, role: e.target.value as "USER" | "ADMIN" })}
                    >
                      <option value="USER">Üye</option>
                      <option value="ADMIN">Yönetici</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-500">
                      Yeni Şifre (boş bırakırsanız değişmez)
                    </label>
                    <Input
                      type="password"
                      placeholder="En az 8 karakter"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button
                      disabled={isPending}
                      onClick={() => {
                        run(
                          () =>
                            adminUpdateUser({
                              id: u.id,
                              displayName: draft.displayName,
                              email: draft.email,
                              role: draft.role,
                            }),
                          "Kullanıcı güncellendi.",
                        );
                        if (newPassword.trim().length >= 8) {
                          startTransition(async () => {
                            await adminResetPassword({ id: u.id, password: newPassword });
                          });
                        }
                      }}
                    >
                      <KeyRound className="mr-2 h-4 w-4" /> Kaydet
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

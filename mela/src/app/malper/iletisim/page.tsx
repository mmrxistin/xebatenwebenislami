// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import React, { useState } from "react";
import { AGENCY } from "../ajans-veri";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: backend entegrasyonu (api route / e-posta servisi)
    setSent(true);
  };

  const inputCls =
    "w-full rounded-md border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-white/35";

  return (
    <main className="min-h-screen text-zinc-100">
      {/* HERO */}
      <section className="border-b border-white/10 px-4 pb-12 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold sm:text-3xl">İletişim</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
            Formu doldurun, size dönüş yapılacaktır.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-3xl gap-16 lg:grid-cols-2">
          {/* FORM */}
          <div>
            {sent ? (
              <div className="rounded-md border border-white/15 p-8">
                <h2 className="text-base font-medium">Mesajınız alındı.</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  En kısa sürede size dönüş yapılacaktır.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Adınız"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-posta"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <select
                  className={inputCls}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option value="" className="bg-zinc-950">Bir konu seçin</option>
                  <option value="genel" className="bg-zinc-950">Genel</option>
                  <option value="icerik" className="bg-zinc-950">İçerik</option>
                  <option value="diger" className="bg-zinc-950">Diğer</option>
                </select>
                <textarea
                  required
                  rows={6}
                  placeholder="Mesajınız"
                  className={inputCls}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  className="mt-2 rounded-md border border-white/15 px-6 py-3 text-sm transition-colors hover:border-white/35"
                >
                  Gönder
                </button>
              </form>
            )}
          </div>

          {/* BİLGİLER */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">E-posta</h3>
              <a
                href={`mailto:${AGENCY.email}`}
                className="text-base no-underline transition-colors hover:text-white"
              >
                {AGENCY.email}
              </a>
            </div>
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">Telefon</h3>
              <p className="text-base text-zinc-300">{AGENCY.phone}</p>
            </div>
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">Adres</h3>
              <p className="text-base text-zinc-300">{AGENCY.address}</p>
            </div>
            <div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

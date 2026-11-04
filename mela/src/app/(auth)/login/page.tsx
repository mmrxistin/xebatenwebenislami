// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim
// Elhamdulillahirrabbulalemin
// Esselatu vesselamu ala seyyidina Muhammedin
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah
// Allahu Ekber, Allahu Ekber, Allahu Ekber, La ilahe illAllah
// Bila Allah Azze ve Celle me ji sunneta Resulullah Muhammed (s.a.v) neqetine, amin rabbal alemin
// Xeyni Allah tu Xweda tune
// Allah u Ekber Ve Lillahil Hamd

import loginImage from "@/assets/login-image.jpg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Giriş / Üyelik",
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex min-h-[36rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full overflow-y-auto p-8 sm:p-10 md:w-1/2">
          <h1 className="text-center text-2xl font-bold">Emanet</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Giriş yapın ya da yeni üyelik oluşturun.
          </p>

          <section className="mt-8 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Giriş Yap
            </h2>
            <LoginForm />
          </section>

          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-muted" />
            <span className="text-xs text-muted-foreground">veya</span>
            <div className="h-px flex-1 bg-muted" />
          </div>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Üye Ol
            </h2>
            <SignUpForm />
          </section>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            <Link href="/malper" className="underline hover:text-foreground">
              Siteye dön
            </Link>
          </p>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
// El Hamdu Lillah Kesira

// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir

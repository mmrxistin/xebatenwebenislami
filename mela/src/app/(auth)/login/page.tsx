// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim


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
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
};

export default function Page() {
  return (
    <main  className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Emanet — Yönetici Girişi</h1>
          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>.....</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <LoginForm />


          </div>
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
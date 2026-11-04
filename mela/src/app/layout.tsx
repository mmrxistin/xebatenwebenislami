// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// SubhanAllah, Elhamdulillah, La ilahe illAllah, Allahu Ekber
// Estaxfurullah El Azim
// Allahu Ekber ve Lillahil Hamd
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { validateRequest } from "@/auth";
import SessionProvider from "./(main)/SessionProvider";
// @ts-ignore: side-effect import for global CSS
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
export const metadata: Metadata = {
  title: {
    template: "%s | Emanet",
    default: "Emanet",
  },
  description: "Sade, reklamsız ve ticari olmayan bilgi sitesi.",
  keywords: ["emanet"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SessionProvider'ı root'a taşıdık: /malper gibi SessionProvider'sız bölümlerde
  // useSession çağıran bileşenler (car/Post, PostEditor) hata vermesin.
  // Oturum yoksa null user ile sağlanır; bileşenler user ? ... : null ile güvenli kullanır.
  const session = await validateRequest();
  const sessionValue = session.user ? session : null;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider value={sessionValue}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}

          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}





// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin






function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 bg-gray-800 text-white">
      <p className="text-sm">© {new Date().getFullYear()} Emanet</p>
    </footer>
  );

}
// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin
// La îlahe îll Allah û vahdehû(Esma ul Husna) la şerîke leh, lehul-mülkü ve lehul-hamdü ,
// Yuhyî ve yumît
// Bîyadîhîl xayr
// ve hüve alâ külli şeyin kadîr.

 // Seyyidina Muhammeden abduhu ve resuluhu (s.a.v) ve habibihi

// ALLAH U EKBER VELİLLAHIL HAMD
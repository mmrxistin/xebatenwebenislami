// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim 
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illAllah
// SubhanAllah , Elhamdulillah, Allahu Ekber
// HasbunAllahu ve ni'mel vekil
// La havle ve la kuvvete illa billahil Aliyyil Azim
//  Allahu Ekber Ve Lillahil Hamd
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import AdminFooter from "./components/AdminFooter";
import Navbar from './Navbar';
import MenuBar from "./MenuBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  // Şifresiz giriş yalnızca ADMIN hesabı açar; diğer oturumlar panele giremez.
  if (!session.user || session.user.role !== "ADMIN") redirect("/malper");

  return (
    <SessionProvider value={session}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
  

        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 self-start">
              <MenuBar />
            </div>
          </aside>

          <main className="min-w-0 space-y-6">
            {children}
          </main>
        </div>

        <AdminFooter />
      </div>
    </SessionProvider>
  );
}





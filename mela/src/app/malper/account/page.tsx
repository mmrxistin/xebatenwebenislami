// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
// Eski adres (/malper/account) korunur; üyelerin tek alanı /malper/uye.
// Yöneticiler burada yönetim paneline yönlendirilir, üyeler üye alanına.
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  redirect(user.role === "ADMIN" ? "/" : "/malper/uye");
}

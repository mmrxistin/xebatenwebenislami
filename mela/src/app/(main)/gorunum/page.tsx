// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import { getSiteConfig, getSiteContent } from "@/lib/site-content";
import UiEditor from "./UiEditor";
import type { SiteUi } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function GorunumPage() {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") redirect("/malper");

  const config = await getSiteConfig();
  const content = await getSiteContent();
  const ui: SiteUi = config.ui;
  const extraLinks = Array.isArray(content.extraLinks)
    ? (content.extraLinks as { href: string; label: string }[]).filter(
        (l) => l && typeof l.href === "string" && typeof l.label === "string",
      )
    : [];

  return (
    <UiEditor
      initialUi={ui}
      initialTheme={config.theme}
      initialGeneral={config.general}
      initialSections={config.sections}
      initialExtraLinks={extraLinks}
    />
  );
}

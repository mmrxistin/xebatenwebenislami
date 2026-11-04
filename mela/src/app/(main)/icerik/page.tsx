// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah

import { getSiteConfig, getSiteContent } from "@/lib/site-content";
import SiteContentEditor from "./SiteContentEditor";
import SiteSettingsEditor from "./SiteSettingsEditor";
import PanelSettingsEditor from "./PanelSettingsEditor";

export const dynamic = "force-dynamic";

export default async function IcerikPage() {
  const content = await getSiteContent();
  const config = await getSiteConfig();
  return (
    <div className="space-y-10">
      <div className="p-4 pb-0 sm:p-6 sm:pb-0 lg:p-8 lg:pb-0">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Site Ayarları</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Malper sitesinin adı, renkleri, menüsü ve bölüm başlıkları. Logo değiştirilemez.
        </p>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <SiteSettingsEditor initialConfig={config} />
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <PanelSettingsEditor initialSocial={config.social} initialPages={config.pages} />
      </div>
      <SiteContentEditor initialContent={content} />
    </div>
  );
}

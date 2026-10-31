// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import { getSiteConfig, getSiteContent } from "@/lib/site-content";
import MalperClient from "./malper-client";

export const dynamic = "force-dynamic";

export default async function AgencyPage() {
  const site = await getSiteContent();
  const config = await getSiteConfig();
  return (
    <MalperClient
      stats={(site.stats ?? []) as { n: string; l: string }[]}
      cases={(site.cases ?? []) as { brand: string; title: string; tag: string; img: string }[]}
      services={(site.services ?? []) as { n: string; t: string; d: string }[]}
      news={(site.news ?? []) as { cat: string; date: string; title: string; href?: string }[]}
      config={config}
    />
  );
}

// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin

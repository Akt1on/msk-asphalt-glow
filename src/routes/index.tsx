import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { TrustedBy } from "@/components/site/TrustedBy";
import { Advantages } from "@/components/site/Advantages";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Prices } from "@/components/site/Prices";
import { Reviews } from "@/components/site/Reviews";
import { WhyUs } from "@/components/site/WhyUs";
import { Geography } from "@/components/site/Geography";
import { Contacts } from "@/components/site/Contacts";
import { CookieBanner } from "@/components/site/CookieBanner";
import { MobileCta } from "@/components/site/MobileCta";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "МСК АСФАЛЬТ — асфальтирование дорог и дворов в Москве и МО" },
      {
        name: "description",
        content:
          "Асфальтирование под ключ в Москве и Московской области. Дороги, дворы, парковки, СНТ. Своя техника, материалы по ГОСТ, гарантия до 5 лет.",
      },
      { property: "og:title", content: "МСК АСФАЛЬТ — асфальтирование под ключ" },
      { property: "og:description", content: "Дороги, дворы, парковки. Гарантия до 5 лет." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <TrustedBy />
        <Advantages />
        <Services />
        <Portfolio />
        <Prices />
        <Reviews />
        <WhyUs />
        <Geography />
        <Contacts />
      </main>
      <SiteFooter />
      <MobileCta />
      <CookieBanner />
      <Toaster position="top-center" richColors />
    </div>
  );
}

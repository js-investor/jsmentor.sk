import CoDostanesHeroHeroSection from "@/components/sections/CoDostanesHeroHeroSection";
import HomeDesignHeaderSection from "@/components/sections/HomeDesignHeaderSection";
import HeroHeroBezCenzurySection from "@/components/sections/HeroHeroBezCenzurySection";
import HeroHeroCtaSection from "@/components/sections/HeroHeroCtaSection";
import HeroHeroFaqSection from "@/components/sections/HeroHeroFaqSection";
import PredstavSiZivotSection from "@/components/sections/PredstavSiZivotSection";
import StaleSaTiToDejeSection from "@/components/sections/StaleSaTiToDejeSection";
import PageWrapper from "@/components/layout/PageWrapper";

const Index = () => (
  <PageWrapper>
    <HomeDesignHeaderSection />
    <StaleSaTiToDejeSection />
    <PredstavSiZivotSection />
    <CoDostanesHeroHeroSection />
    <HeroHeroBezCenzurySection />
    <HeroHeroFaqSection />
    <HeroHeroCtaSection />
  </PageWrapper>
);

export default Index;

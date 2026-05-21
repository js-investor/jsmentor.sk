import CoDostanesHeroHeroSection from "@/components/sections/CoDostanesHeroHeroSection";
import HomeDesignHeaderSection from "@/components/sections/HomeDesignHeaderSection";
import HeroHeroBezCenzurySection from "@/components/sections/HeroHeroBezCenzurySection";
import HeroHeroCtaSection from "@/components/sections/HeroHeroCtaSection";
import HeroHeroBonusySection from "@/components/sections/HeroHeroBonusySection";
import HeroHeroFaqSection from "@/components/sections/HeroHeroFaqSection";
import HeroHeroReviewsSection from "@/components/sections/HeroHeroReviewsSection";
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
    <HeroHeroReviewsSection />
    <HeroHeroBonusySection />
    <HeroHeroFaqSection />
    <HeroHeroCtaSection />
  </PageWrapper>
);

export default Index;

import HeroHeroCasteFaqSection from "@/components/sections/HeroHeroCasteFaqSection";
import HeroHeroCennikSection from "@/components/sections/HeroHeroCennikSection";
import HeroHeroHodnotaSection from "@/components/sections/HeroHeroHodnotaSection";
import QuoteSection from "@/components/sections/QuoteSection";
import IvanJasikSection from "@/components/sections/IvanJasikSection";
import RecenzieGaleriaSection from "@/components/sections/RecenzieGaleriaSection";
import HeroHeroChybySection from "@/components/sections/HeroHeroChybySection";
import HeroHeroDarkGradientSection from "@/components/sections/HeroHeroDarkGradientSection";
import HeroHeroIvanSection from "@/components/sections/HeroHeroIvanSection";
import HeroHeroKalkulackySection from "@/components/sections/HeroHeroKalkulackySection";
import HeroHeroNastrojeSection from "@/components/sections/HeroHeroNastrojeSection";
import HeroHeroPorovnanieSection from "@/components/sections/HeroHeroPorovnanieSection";
import HeroHeroReviewsSection from "@/components/sections/HeroHeroReviewsSection";
import HomeDesignHeaderSection from "@/components/sections/HomeDesignHeaderSection";
import PageWrapper from "@/components/layout/PageWrapper";
import useScrollDepth from "@/hooks/useScrollDepth";

const Index = () => {
  useScrollDepth();
  return (
  <PageWrapper>
    <div className="page-home">
      <HomeDesignHeaderSection />
      <HeroHeroIvanSection />
      <HeroHeroChybySection />
      <HeroHeroNastrojeSection />
      <HeroHeroDarkGradientSection />
      <HeroHeroKalkulackySection />
      <HeroHeroReviewsSection />
      <HeroHeroHodnotaSection />
      <HeroHeroCennikSection />
      <QuoteSection />
      <IvanJasikSection />
      <HeroHeroCasteFaqSection />
      <HeroHeroPorovnanieSection />
      <RecenzieGaleriaSection />
    </div>
  </PageWrapper>
  );
};

export default Index;

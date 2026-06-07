import HeroHeroChybySection from "@/components/sections/HeroHeroChybySection";
import HeroHeroDarkGradientSection from "@/components/sections/HeroHeroDarkGradientSection";
import HeroHeroIvanSection from "@/components/sections/HeroHeroIvanSection";
import HeroHeroKalkulackySection from "@/components/sections/HeroHeroKalkulackySection";
import HeroHeroNastrojeSection from "@/components/sections/HeroHeroNastrojeSection";
import HomeDesignHeaderSection from "@/components/sections/HomeDesignHeaderSection";
import PageWrapper from "@/components/layout/PageWrapper";

const Index = () => (
  <PageWrapper>
    <div className="page-home">
      <HomeDesignHeaderSection />
      <HeroHeroIvanSection />
      <HeroHeroChybySection />
      <HeroHeroNastrojeSection />
      <HeroHeroDarkGradientSection />
      <HeroHeroKalkulackySection />
    </div>
  </PageWrapper>
);

export default Index;

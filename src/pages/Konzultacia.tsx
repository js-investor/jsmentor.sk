import KonzultaciaHeroSection from "@/components/sections/KonzultaciaHeroSection";
import KonzultaciaZlozenyUrokSection from "@/components/sections/KonzultaciaZlozenyUrokSection";
import StatsBarSection from "@/components/sections/StatsBarSection";
import KonzultaciaPostStatsExtremySection from "@/components/sections/KonzultaciaPostStatsExtremySection";
import DobryPoradcaSection from "@/components/sections/DobryPoradcaSection";
import UvodnyHovorSection from "@/components/sections/UvodnyHovorSection";
import VysledkySection from "@/components/sections/VysledkySection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FazySection from "@/components/sections/FazySection";
import MobileOnlyImageSection from "@/components/sections/MobileOnlyImageSection";
import VideoSection from "@/components/sections/VideoSection";
import FaqSection from "@/components/sections/FaqSection";
import DeferredBookingSection from "@/components/DeferredBookingSection";
import MoreReviewsSection from "@/components/sections/MoreReviewsSection";
import PageWrapper from "@/components/layout/PageWrapper";

const Konzultacia = () => (
  <PageWrapper>
    <KonzultaciaHeroSection />
    <StatsBarSection />
    <KonzultaciaZlozenyUrokSection />
    <KonzultaciaPostStatsExtremySection />
    <DobryPoradcaSection ctaLabel="Získať Wealth Map" />
    <UvodnyHovorSection ctaLabel="Získať Wealth Map" />
    <VysledkySection
      title={
        <>
          Toto sú <span className="text-[#296A52] font-bold">výsledky ľudí,</span> ktorým som postavil plán.
        </>
      }
      subtitle={
        <>
          <strong className="text-[#1a1a1a]">Nikto z nich nemal všetko vyriešené.</strong> Každý prišiel s vlastnou
          situáciou. Chaos, banka, žiadny plán. Spolu sme to rozmotali.
        </>
      }
      ctaLabel="Získať Wealth Map"
    />
    <TestimonialSection ctaLabel="Získať Wealth Map" />
    <FazySection />
    <MobileOnlyImageSection />
    {false && <VideoSection ctaLabel="Získať Wealth Map" />}
    <FaqSection />
    <DeferredBookingSection />
    <MoreReviewsSection ctaLabel="Získať Wealth Map" />
  </PageWrapper>
);

export default Konzultacia;

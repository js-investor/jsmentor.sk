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
    <DobryPoradcaSection ctaLabel="Chcem začať teraz" />
    <UvodnyHovorSection ctaLabel="Chcem začať teraz" />
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
      ctaLabel="Chcem začať teraz"
    />
    <TestimonialSection ctaLabel="Chcem začať teraz" />
    <FazySection />
    <MobileOnlyImageSection />
    {false && <VideoSection ctaLabel="Chcem začať teraz" />}
    <FaqSection />
    <DeferredBookingSection />
    <MoreReviewsSection ctaLabel="Chcem začať teraz" includeKonzultaciaReviews />
  </PageWrapper>
);

export default Konzultacia;

import ResultsSectionTemplate from "@/components/templates/ResultsSectionTemplate";
import type { ReactNode } from "react";

type VysledkySectionProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  ctaLabel?: string;
  showCtaResponseNote?: boolean;
};

const VysledkySection = ({
  title = (
    <>
      Lorem ipsum <span className="text-[#296A52] font-bold">dolor sit amet,</span> consectetur elit.
    </>
  ),
  subtitle = (
    <>
      <strong className="text-[#1a1a1a]">Lorem ipsum dolor sit amet.</strong> Consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </>
  ),
  ctaLabel = "Lorem ipsum",
  showCtaResponseNote = false,
}: VysledkySectionProps) => {
  return (
    <ResultsSectionTemplate
      title={title}
      subtitle={subtitle}
      ctaLabel={ctaLabel}
      showCtaResponseNote={showCtaResponseNote}
      ctaHref="#formular"
    />
  );
};

export default VysledkySection;

import PageWrapper from "@/components/layout/PageWrapper";
import KonzultaciaSiteHeader from "@/components/layout/KonzultaciaSiteHeader";
import {
  BONUSY_CTA_LABEL,
  KALKULACKY_HEADER_GROUPS,
  KONZULTACIA_URL,
} from "@/pages/kalkulacky/kalkulackyConfig";
import type { ReactNode } from "react";

type KalkulackyShellProps = {
  children: ReactNode;
  /** Full-bleed mode: sekcie kalkulačky samy manažujú šírku aj pozadie. */
  fullBleed?: boolean;
};

const KalkulackyShell = ({ children, fullBleed = false }: KalkulackyShellProps) => (
  <PageWrapper>
    <KonzultaciaSiteHeader
      logoHref="/bonusy"
      leadingLinks={[{ label: "Všetky bonusy", href: "/bonusy" }]}
      groups={KALKULACKY_HEADER_GROUPS}
      ctaLabel={BONUSY_CTA_LABEL}
      ctaMobileLabel="Rezervovať konzultáciu"
      ctaHref={KONZULTACIA_URL}
      ctaUmamiEvent="click_konzultacia"
    />
    {fullBleed ? (
      <div className="page-home bg-background pt-[9rem] md:pt-[11rem] lg:pt-[12rem]">
        {children}
      </div>
    ) : (
      <section className="page-home section-white min-h-[50vh] pt-[9rem] pb-20 md:pt-[11rem] md:pb-28 lg:pt-[12rem] lg:pb-32">
        {children}
      </section>
    )}
  </PageWrapper>
);

export default KalkulackyShell;

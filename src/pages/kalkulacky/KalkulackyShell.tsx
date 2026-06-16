import PageWrapper from "@/components/layout/PageWrapper";
import KonzultaciaSiteHeader from "@/components/layout/KonzultaciaSiteHeader";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  KALKULACKY_HEADER_GROUPS,
  KALKULACKY_WHATSAPP_HREF,
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
      ctaLabel="Napíš mi na WhatsApp"
      ctaMobileLabel="Napíš mi"
      ctaHref={KALKULACKY_WHATSAPP_HREF}
      ctaUmamiEvent="click_whatsapp"
      ctaIcon={<WhatsAppIcon className="h-[1.05rem] w-[1.05rem] shrink-0 md:h-[1.125rem] md:w-[1.125rem]" />}
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

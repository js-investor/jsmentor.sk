import PageWrapper from "@/components/layout/PageWrapper";
import KonzultaciaSiteHeader from "@/components/layout/KonzultaciaSiteHeader";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { KALKULACKY_WHATSAPP_HREF } from "@/pages/kalkulacky/kalkulackyConfig";
import type { ReactNode } from "react";

type KalkulackyShellProps = {
  children: ReactNode;
};

const KalkulackyShell = ({ children }: KalkulackyShellProps) => (
  <PageWrapper>
    <KonzultaciaSiteHeader
      items={[
        { label: "Hypotéka vs. investovanie", href: "/kalkulacky/hypo-smart" },
        { label: "Investície", href: "/kalkulacky/investicna" },
        { label: "Mzdy", href: "/kalkulacky/mzdova-kalkulacka" },
        { label: "Úvery (DTI & DSTI)", href: "/kalkulacky/uvery" },
        { label: "Renta", href: "/kalkulacky/rentova-kalkulacka" },
      ]}
      ctaLabel="Napíš mi na WhatsApp"
      ctaHref={KALKULACKY_WHATSAPP_HREF}
      ctaIcon={<WhatsAppIcon className="h-[1.05rem] w-[1.05rem] shrink-0 md:h-[1.125rem] md:w-[1.125rem]" />}
    />
    <section className="section-white min-h-[50vh] pt-[9rem] pb-20 md:pt-[11rem] md:pb-28 lg:pt-[12rem] lg:pb-32">
      {children}
    </section>
  </PageWrapper>
);

export default KalkulackyShell;

import PageWrapper from "@/components/layout/PageWrapper";
import KonzultaciaSiteHeader from "@/components/layout/KonzultaciaSiteHeader";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  BONUSY_BASE_PATH,
  BONUSY_PDF_MENU_ITEM,
  KALKULACKY_CALCULATORS,
  KALKULACKY_WHATSAPP_HREF,
} from "@/pages/kalkulacky/kalkulackyConfig";
import type { ReactNode } from "react";

type KalkulackyShellProps = {
  children: ReactNode;
};

const KalkulackyShell = ({ children }: KalkulackyShellProps) => (
  <PageWrapper>
    <KonzultaciaSiteHeader
      items={[
        ...KALKULACKY_CALCULATORS.map((c) => ({
          label: c.menuLabel,
          href: `${BONUSY_BASE_PATH}/${c.slug}`,
        })),
        {
          label: BONUSY_PDF_MENU_ITEM.label,
          ...(BONUSY_PDF_MENU_ITEM.href ? { href: BONUSY_PDF_MENU_ITEM.href } : {}),
        },
      ]}
      ctaLabel="Napíš mi na WhatsApp"
      ctaMobileLabel="Napíš mi"
      ctaHref={KALKULACKY_WHATSAPP_HREF}
      ctaIcon={<WhatsAppIcon className="h-[1.05rem] w-[1.05rem] shrink-0 md:h-[1.125rem] md:w-[1.125rem]" />}
    />
    <section className="page-home section-white min-h-[50vh] pt-[9rem] pb-20 md:pt-[11rem] md:pb-28 lg:pt-[12rem] lg:pb-32">
      {children}
    </section>
  </PageWrapper>
);

export default KalkulackyShell;

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BonusyKonzultaciaSection from "@/components/sections/BonusyKonzultaciaSection";
import KalkulackyShell from "@/pages/kalkulacky/KalkulackyShell";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import {
  BONUSY_BASE_PATH,
  BONUSY_PDF_CARD,
  KALKULACKY_CALCULATORS,
} from "@/pages/kalkulacky/kalkulackyConfig";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const cardTitleClass =
  "[font-family:var(--font-serif)] text-[1.45rem] font-bold leading-[1.18] text-foreground md:text-[1.65rem] lg:text-[1.8rem]";
const cardDescriptionClass =
  "font-sans text-[1.03125rem] leading-relaxed text-muted-foreground md:text-[1.0625rem] lg:text-[1.125rem] lg:leading-[1.6]";

const calculatorCardClass = cn(
  "group relative flex h-full min-h-[15.5rem] flex-col rounded-2xl border border-border/70 bg-card p-6 md:min-h-[17rem] md:p-8 lg:p-9",
  "shadow-sm transition-[box-shadow,border-color,transform] duration-200",
  "hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
);

type BonusCardContentProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const BonusCardContent = ({ Icon, title, description }: BonusCardContentProps) => (
  <>
    <div className="flex items-start justify-between gap-4">
      <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center md:h-14 md:w-14" aria-hidden>
        <img
          src={brandPattern}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 hue-rotate-[260deg] saturate-150 brightness-75"
        />
        <Icon className="relative z-10 -translate-x-[1px] h-5 w-5 stroke-[2] text-white md:h-6 md:w-6" />
      </span>
      <ChevronRight
        className="mt-1 h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden
      />
    </div>
    <span className={cn("mt-7 block md:mt-8", cardTitleClass)}>{title}</span>
    <span className={cn("mt-3.5 block md:mt-4", cardDescriptionClass)}>{description}</span>
  </>
);

const BonusGridCard = ({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) => {
  if (href) {
    return (
      <Link to={href} className={calculatorCardClass}>
        {children}
      </Link>
    );
  }

  return (
    <div
      className={cn(calculatorCardClass, "cursor-default")}
      aria-disabled="true"
    >
      {children}
    </div>
  );
};

const KalkulackyCategoryPage = () => {
  const PdfIcon = BONUSY_PDF_CARD.Icon;

  return (
    <KalkulackyShell>
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h1 className="headline-serif">
            <span className="text-primary">Vyber si kalkulačku</span> pre svoje finančné rozhodnutia
          </h1>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Zisti, čo sa oplatí viac, nastav si jasný plán a urob ďalší krok s istotou.
          </p>
        </div>

        <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 md:gap-7 lg:max-w-5xl lg:gap-8">
          {KALKULACKY_CALCULATORS.map((item) => (
            <li key={item.slug} className="h-full">
              <BonusGridCard href={`${BONUSY_BASE_PATH}/${item.slug}`}>
                <BonusCardContent Icon={item.Icon} title={item.title} description={item.description} />
              </BonusGridCard>
            </li>
          ))}

          <li className="h-full">
            <BonusGridCard href={BONUSY_PDF_CARD.href || undefined}>
              <BonusCardContent
                Icon={PdfIcon}
                title={BONUSY_PDF_CARD.title}
                description={BONUSY_PDF_CARD.description}
              />
            </BonusGridCard>
          </li>
        </ul>

        <BonusyKonzultaciaSection />
      </div>
    </KalkulackyShell>
  );
};

export default KalkulackyCategoryPage;

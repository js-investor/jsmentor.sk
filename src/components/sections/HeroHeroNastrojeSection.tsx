import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { CENNIK_SECTION_HREF } from "@/lib/cennikCta";
import {
  BarChart3,
  Calculator,
  FileCheck,
  PlayCircle,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const brandIconMaskStyle = {
  backgroundColor: "#ffffff",
  WebkitMaskImage: `url(${brandPattern})`,
  maskImage: `url(${brandPattern})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

const BenefitTabIcon = ({ Icon }: { Icon: LucideIcon }) => (
  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14" aria-hidden>
    <span className="absolute inset-0" style={brandIconMaskStyle} />
    <Icon className="relative z-10 h-5 w-5 -translate-x-1 text-black sm:h-6 sm:w-6" strokeWidth={2} />
  </span>
);

const benefitTabs: { Icon: LucideIcon; line1: string; line2: string }[] = [
  { Icon: PlayCircle, line1: "Týždenné rozbory", line2: "videá hneď po vstupe" },
  { Icon: BarChart3, line1: "Analýzy slovenských produktov", line2: "hypotéky, byty, renta" },
  { Icon: Users, line1: "Reálne prípady ľudí", line2: "konkrétne finančné rozhodnutia" },
  { Icon: Calculator, line1: "Kalkulačky a mapa bytov", line2: "röntgen, semafor, nástroje" },
  { Icon: FileCheck, line1: "Checklisty a PDF", line2: "materiály na stiahnutie" },
  { Icon: TrendingUp, line1: "Investičné myslenie", line2: "bez rozprávok" },
];

const tabTextClass =
  "font-sans text-[0.9375rem] font-bold leading-snug text-white sm:text-[1rem] md:text-[1.0625rem] lg:text-[1.125rem]";

const HeroHeroNastrojeSection = () => (
  <section
    id="nastroje"
    className="hero-section-pad relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

    <div className="section-container relative z-10">
      <AnimatedSection delay={0.06}>
        <h2 className="headline-landing-section mx-auto max-w-4xl text-balance text-center leading-[1.12] text-foreground">
          Čo všetko získaš?
        </h2>
        <p className="mx-auto mt-5 mb-2 max-w-3xl text-center font-sans text-[1.25rem] leading-relaxed text-muted-foreground md:text-[1.5rem] lg:text-[1.75rem]">
          Získaš pravidelný obsah, praktické nástroje a konkrétne rozhodnutia pre lepšie financie.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="mx-auto mt-6 max-w-6xl md:mt-8">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6">
            {benefitTabs.map(({ Icon, line1, line2 }) => (
              <li
                key={line1}
                className={`flex h-full items-center gap-3 rounded-2xl px-4 py-4 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] sm:gap-3.5 sm:px-4 sm:py-4 ${tabTextClass}`}
                style={{ backgroundColor: "#1A1A1A" }}
              >
                <BenefitTabIcon Icon={Icon} />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span>{line1}</span>
                  <span className="font-semibold text-white/85">{line2}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center md:mt-10">
            <a href={CENNIK_SECTION_HREF} className="btn-primary text-body" data-umami-event="click_cennik" data-umami-event-section="nastroje">
              Vyskúšať prvé 2 týždne zadarmo 🚀
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroNastrojeSection;

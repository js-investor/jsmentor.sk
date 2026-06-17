import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import heroHeroTemyImage from "@/assets/images/Ivan-Jašík-HeroHero-temy.png";
import {
  BarChart3,
  Home,
  Scale,
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

const benefitTabs: { Icon: LucideIcon; label: string }[] = [
  { Icon: TrendingUp, label: "Investičné myslenie" },
  { Icon: BarChart3, label: "Analýzy slovenských produktov" },
  { Icon: Users, label: "Reálne prípady ľudí" },
  { Icon: Home, label: "Hypotéky, byty, renta" },
  { Icon: Scale, label: "Dôležité finančné rozhodnutia" },
];

const tabTextClass =
  "font-sans text-[1.1875rem] font-bold leading-snug text-white md:text-[1.375rem] lg:text-[1.5rem]";

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
          Získaš pravidelný obsah, ktorý ti pomôže robiť lepšie finančné rozhodnutia.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="mt-6 flex justify-center md:mt-8">
          <ul className="flex flex-col items-center gap-6 md:gap-7">
            {benefitTabs.map(({ Icon, label }) => (
              <li
                key={label}
                className={`flex w-fit max-w-[min(100%,969px)] items-center gap-3.5 rounded-2xl px-4 py-4 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] sm:gap-4 sm:px-5 sm:py-4 ${tabTextClass}`}
                style={{ backgroundColor: "#1A1A1A" }}
              >
                <BenefitTabIcon Icon={Icon} />
                <span>{label}</span>
              </li>
            ))}
            <li className="flex justify-center pt-2 md:pt-3">
              <a href="https://herohero.co/jsmentor" target="_blank" rel="noopener noreferrer" className="btn-primary text-body" data-umami-event="click_herohero" data-umami-event-section="nastroje">
                Vyskúšať na 15 dní zadarmo 🚀
              </a>
            </li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroNastrojeSection;

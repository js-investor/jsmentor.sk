import AnimatedSection from "@/components/AnimatedSection";
import ivanHeroHeroImage from "@/assets/images/Ivan-Jašík-HeroHero.webp";
import { CENNIK_SECTION_HREF } from "@/lib/cennikCta";
import type { ReactNode } from "react";

const bold = (text: string) => <strong className="font-bold text-foreground">{text}</strong>;

const painTabs: ReactNode[] = [
  <>Zarábaš, ale {bold("majetok nerastie")} 😬</>,
  <>Už {bold("investuješ, ale nevieš")} či správne 😥</>,
  <>Nevieš či má zmysel {bold("hypotéku skôr splatiť,")} alebo si radšej peniaze odložiť 😫</>,
  <>Všetci: BYTY BYTY BYTY, ale {bold("nikto nepovie o rizikách")} a reálnych číslach 🏠</>,
  <>Ešte neinvestuješ, lebo sa {bold("bojíš chýb")} ❌</>,
  <>Máš {bold("vzťahové problémy")} kvôli peniazom 👫</>,
  <>Tvoje peniaze nemajú {bold("žiaden systém")} 🤯</>,
  <>{bold("Máš v tom chaos.")} Jeden hovorí splať úver. Druhý investuj. Tretí kúp byt. Čo teda ? 🫨</>,
];

const tabTextClass =
  "font-sans text-[1.125rem] leading-snug text-foreground md:text-[1.25rem]";

const HeroHeroChybySection = () => (
  <section
    id="financne-chyby"
    className="hero-section-pad relative scroll-mt-24 overflow-hidden bg-black px-5 md:px-8 pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px]"
  >
    <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

    <div className="section-container relative z-10">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
        <AnimatedSection>
          <div className="md:overflow-hidden md:rounded-2xl md:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.65)]">
            <img
              src={ivanHeroHeroImage}
              alt="Ivan Jašík"
              className="block h-auto w-full rounded-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.06}>
          <div className="flex flex-col justify-center text-left">
            <h2 className="headline-landing-section text-balance leading-[1.12] text-white">
              <strong className="font-bold">Toto sú chyby,</strong>{" "}
              <span className="font-normal">ktoré ľudí stoja najviac peňazí. A často vyzerajú úplne normálne.</span>
            </h2>

            <p className="hero-description !mx-0 !max-w-none mt-6 text-left text-white/90 md:mt-8">
              Problém väčšiny ľudí nie je ich príjem. Problém je, že robia rozhodnutia, ktoré si nikdy poriadne
              neprepočítali.
            </p>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="mt-16 flex justify-center md:mt-24 lg:mt-28">
          <ul className="flex w-max max-w-[min(100%,969px)] flex-col gap-6 md:gap-7">
            {painTabs.map((label, index) => (
              <li
                key={index}
                className={`w-full rounded-2xl bg-white px-4 py-4 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] sm:px-5 sm:py-4 ${tabTextClass}`}
              >
                {label}
              </li>
            ))}
            <li className="flex justify-center pt-2 md:pt-3">
              <a href={CENNIK_SECTION_HREF} className="btn-primary text-body" data-umami-event="click_cennik" data-umami-event-section="chyby">
                Chcem sa pridať ZADARMO 🚀
              </a>
            </li>
          </ul>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroChybySection;

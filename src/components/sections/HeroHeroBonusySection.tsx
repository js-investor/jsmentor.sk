import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { CENNIK_SECTION_HREF } from "@/lib/cennikCta";
import {
  BookOpen,
  FileText,
  Gift,
  LineChart,
  ListChecks,
  Video,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const forest = "#023c2e";
const forestMid = "#065f4a";
const forestGradientEnd = "#0a5a47";

type BonusItem = {
  Icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
};

const bonusItems: BonusItem[] = [
  {
    Icon: FileText,
    title: "PDF materiály a ťaháky",
    description:
      "Konkrétne dokumenty na stiahnutie — prehľadné, praktické a pripravené na okamžité použitie.",
  },
  {
    Icon: ListChecks,
    title: "Checklisty a šablóny",
    description:
      "Priority, výdavky, rezerva aj pracovný zošit — máš hotový postup, nie prázdny zošit.",
  },
  {
    Icon: LineChart,
    title: "10 najlepších ETF na svete",
    description:
      "Zoznam s kontextom pre bežného investora na slovenskom trhu — bez lovu pokladov na internete.",
  },
  {
    Icon: Gift,
    title: "Bonus: moja úspešná „Renta“",
    description:
      "Overený model pasívneho príjmu, ktorý v praxi používam — ako inšpirácia aj ako štartovací rámec.",
    tag: "Exkluzívne",
  },
  {
    Icon: BookOpen,
    title: "E-booky, audity a prípadové štúdie",
    description:
      "Finančný audit, kalendár, diagramy, myšlienkové mapy — keď potrebuješ ísť do hĺbky mimo videa.",
  },
  {
    Icon: Video,
    title: "Analýzy, videoškolenia a tipy",
    description:
      "Krátke formáty, triky a doplnkové analýzy — aby si mal vždy čo otvoriť, keď máš 15 minút.",
  },
];

const bonusItemTitleClass =
  "[font-family:var(--font-serif)] text-[28px] font-bold leading-[1.2]";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const, delay: 0.05 * i },
  }),
};

const HeroHeroBonusySection = () => (
  <section
    id="bonusy"
    className="hero-section-pad relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
    aria-labelledby="bonusy-heading"
  >
    <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />
    <div className="pointer-events-none absolute top-0 right-[15%] h-[320px] w-[320px] rounded-full bg-primary/8 blur-[90px]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <header className="mx-auto mb-[54px] max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-[#cdbca2] px-4 py-1.5 font-sans text-small font-semibold uppercase tracking-[0.12em] text-black">
            V cene členstva
          </span>
          <h2 id="bonusy-heading" className="headline-landing-section">
            Získaj <span className="text-primary">okamžitú hodnotu</span> vďaka extra bonusom
          </h2>
          <p className="sub-headline mx-auto mt-4 max-w-2xl text-foreground/80">
            Okrem videí a komunity dostaneš praktické nástroje — nie „niečo navyše“, ale dôvod, prečo sa
            oplatí zostať dlhšie ako skúšobná doba.
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection delay={0.05} className="py-5 md:py-6">
        <div
          className="relative overflow-visible rounded-2xl px-6 py-8 text-white shadow-[0_16px_48px_-20px_rgba(2,60,46,0.4)] md:px-10 md:py-10"
          style={{
            background: `linear-gradient(145deg, ${forest} 0%, ${forestMid} 48%, ${forestGradientEnd} 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute right-2 top-1/2 z-[1] w-[180px] -translate-y-1/2 md:right-4 md:w-[216px]"
            aria-hidden
            style={{
              height: "calc(100% + 6.9rem)",
              WebkitMaskImage: `url(${brandPattern})`,
              maskImage: `url(${brandPattern})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              backgroundColor: "rgba(255, 255, 255, 0.32)",
            }}
          />
          <div className="pointer-events-none absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 max-w-2xl md:max-w-[58%]">
            <h3 className={`${bonusItemTitleClass} text-white`}>
              Interaktívne kalkulačky
            </h3>
            <p className="mt-3 font-sans text-[1rem] leading-relaxed text-white/85 md:text-[1.0625rem]">
              Už predpripravené pre komunitu Hero Hero. Spočítaj si rezervu, investície, hypotéku alebo
              dopad rozhodnutia — bez chaosu v Exceli a bez hádania vzorcov.
            </p>
            <Link
              to="/bonusy"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-sans text-sm font-semibold text-[#023c2e] shadow-sm transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Otvoriť kalkulačky
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <motion.div
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 md:mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-48px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {bonusItems.map((item, index) => (
          <motion.article
            key={item.title}
            custom={index}
            variants={cardVariants}
            className="relative flex flex-col rounded-2xl border border-[#E8E0D8] bg-white p-5 shadow-[0_8px_28px_-18px_rgba(28,22,18,0.12)] md:p-6"
          >
            {item.tag ? (
              <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2.5 py-0.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-wide text-primary">
                {item.tag}
              </span>
            ) : null}
            <item.Icon className="h-8 w-8 text-primary" strokeWidth={2} aria-hidden />
            <h3 className={`mt-3 ${bonusItemTitleClass} text-foreground`}>
              {item.title}
            </h3>
            <p className="mt-2 flex-1 font-sans text-[0.9375rem] leading-relaxed text-foreground/75">
              {item.description}
            </p>
          </motion.article>
        ))}
      </motion.div>

      <AnimatedSection className="mt-10 text-center md:mt-12" delay={0.1}>
        <a href={CENNIK_SECTION_HREF} className="btn-primary inline-flex text-body">
          🚀 Vyskúšať na 15 dní ZADARMO
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroBonusySection;

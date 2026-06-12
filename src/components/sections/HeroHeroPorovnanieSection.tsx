import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonItems = [
  {
    chaosTitle: "Motivačné dno z TikToku",
    chaos: "Generické rady o rýchlom zbohatnutí, ktoré v reálnom živote nefungujú.",
    knowHowTitle: "Slovenská realita v číslach",
    knowHow: "Overené postupy prispôsobené slovenskému trhu, zákonom a realite.",
  },
  {
    chaosTitle: "Cenzúra algoritmov",
    chaos: "Na sociálnych sieťach vidíš len zlomok toho, čo sa dá povedať.",
    knowHowTitle: "Peniaze bez filtra",
    knowHow: "Otvorené rozbory fondov, poplatkov a finančných pascí bez prikrášľovania.",
  },
  {
    chaosTitle: "Finančný chaos",
    chaos: "Protichodné rady, dohady a rozhodnutia založené na pocitoch.",
    knowHowTitle: "Strategické riadenie majetku",
    knowHow: "Jasný systém postavený na dátach, nie na emóciách.",
  },
  {
    chaosTitle: "Peniaze strácajú hodnotu",
    chaos: "Inflácia a poplatky potichu ukrajujú z tvojich úspor.",
    knowHowTitle: "Okamžitá akcia",
    knowHow: "Kalkulačky, checklisty a konkrétne kroky, ktoré môžeš využiť hneď.",
  },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.07 * i },
  }),
};

const HeroHeroPorovnanieSection = () => (
  <section
    id="porovnanie"
    className="relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[96px] md:pt-[100px] md:pb-[120px]"
    style={{ backgroundColor: "#FFF9F5" }}
    aria-labelledby="porovnanie-heading"
  >
    <div className="absolute inset-0 bg-dot-grid opacity-[0.18] pointer-events-none" />

    <div className="section-container relative z-10">
      {/* Heading */}
      <AnimatedSection>
        <header className="mx-auto mb-14 max-w-3xl text-center md:mb-18">
          <h2
            id="porovnanie-heading"
            className="headline-landing-section text-balance leading-[1.1] text-foreground"
          >
            <span className="font-[500]">Čo ti kradne peniaze vs.</span>{" "}
            <strong className="font-bold text-primary">vybuduje tvoj majetok</strong>
          </h2>
        </header>
      </AnimatedSection>

      {/* ── Desktop: two columns ── */}
      <AnimatedSection delay={0.05}>
        <div className="mx-auto hidden max-w-4xl lg:block xl:max-w-5xl">
          <div className="grid grid-cols-2 gap-x-6 gap-y-0">

            {/* Chaos column */}
            <ul className="flex flex-col gap-3">
              {comparisonItems.map(({ chaosTitle, chaos }, i) => (
                <motion.li
                  key={chaos}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex items-start gap-4 rounded-2xl border-[0.5px] border-[#F5C0BA] px-4 py-4"
                  style={{ backgroundColor: "#FEF6F5" }}
                >
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDECEA]">
                    <X className="h-3.5 w-3.5 text-[#C0392B]" strokeWidth={2.8} />
                  </span>
                  <p className="font-sans text-[1.1875rem] leading-[1.6] text-foreground font-[500]">
                    {chaos}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* Know-how column */}
            <ul className="flex flex-col gap-3">
              {comparisonItems.map(({ knowHowTitle, knowHow }, i) => (
                <motion.li
                  key={knowHow}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex items-start gap-4 rounded-2xl border-[0.5px] border-[#A7F3C4] px-4 py-4"
                  style={{ backgroundColor: "#F2FDF5" }}
                >
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]">
                    <Check className="h-3.5 w-3.5 text-[#16a34a]" strokeWidth={2.8} />
                  </span>
                  <p className="font-sans text-[1.1875rem] leading-[1.6] text-foreground font-[500]">
                    {knowHow}
                  </p>
                </motion.li>
              ))}
            </ul>

          </div>
        </div>
      </AnimatedSection>

      {/* ── Mobile: all chaos first, then all know-how ── */}
      <div className="mx-auto flex max-w-lg flex-col lg:hidden">

        {/* Červené — chaos */}
        <ul className="flex flex-col gap-3">
          {comparisonItems.map(({ chaos }, i) => (
            <motion.li
              key={chaos}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="flex items-start gap-4 rounded-2xl border-[0.5px] border-[#F5C0BA] px-4 py-4"
              style={{ backgroundColor: "#FEF6F5" }}
            >
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDECEA]">
                <X className="h-3.5 w-3.5 text-[#C0392B]" strokeWidth={2.8} />
              </span>
              <p className="font-sans text-[1.0625rem] leading-[1.6] text-foreground/70">{chaos}</p>
            </motion.li>
          ))}
        </ul>

        {/* Medzera */}
        <div className="my-6 flex items-center gap-3" aria-hidden>
          <div className="h-px flex-1 bg-foreground/10" />
          <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-foreground/35">vs.</span>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        {/* Zelené — know-how */}
        <ul className="flex flex-col gap-3">
          {comparisonItems.map(({ knowHow }, i) => (
            <motion.li
              key={knowHow}
              custom={i + comparisonItems.length}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="flex items-start gap-4 rounded-2xl border-[0.5px] border-[#A7F3C4] px-4 py-4"
              style={{ backgroundColor: "#F2FDF5" }}
            >
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]">
                <Check className="h-3.5 w-3.5 text-[#16a34a]" strokeWidth={2.8} />
              </span>
              <p className="font-sans text-[1.0625rem] leading-[1.6] text-foreground">{knowHow}</p>
            </motion.li>
          ))}
        </ul>

      </div>

      {/* CTA */}
      <AnimatedSection delay={0.22}>
        <div className="mt-14 flex flex-col items-center text-center md:mt-16">
          <a href="#formular" className="btn-primary text-body">
            Chcem sa pridať ZADARMO 🚀
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroPorovnanieSection;

import AnimatedSection from "@/components/AnimatedSection";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const problemHeader = "Čo rieši väčšina ľudí (a možno aj ty)";
const heroHeader = "V Hero Hero je to úplne iné";

const bold = (text: string) => (
  <strong className="font-bold text-inherit">{text}</strong>
);

const comparisonRows: { problem: ReactNode; hero: ReactNode }[] = [
  {
    problem: <>Chaotické financie a {bold("neustály stres okolo peňazí")}</>,
    hero: (
      <>
        {bold("Konečne máš jasno")} a presne vieš, čo robiť.
      </>
    ),
  },
  {
    problem: (
      <>
        {bold("Nevieš, komu a čomu veriť.")} Každý hovorí na sociálnych sieťach aj v médiách niečo iné.
      </>
    ),
    hero: (
      <>
        {bold("Prístup k obsahu, ktorý mi Instagram blokuje")} alebo ti nedovolí povedať priamo
      </>
    ),
  },
  {
    problem: <>Odkladáš dôležité veci {bold("„na neskôr“")}</>,
    hero: (
      <>
        {bold("Každý týždeň")} nový hodnotný obsah
      </>
    ),
  },
  {
    problem: (
      <>
        Platíš {bold("zbytočne vysoké poplatky")} a {bold("inflácia žerie tvoje úspory")} každý rok
      </>
    ),
    hero: (
      <>
        Reálne finančné situácie, {bold("rozhovory s bežnými ľuďmi")} (napr. páry, podnikatelia,...) a moje
        rady
      </>
    ),
  },
  {
    problem: (
      <>
        {bold("Problémy s peniazmi")} ovplyvňujú tvoje vzťahy, deti aj tvoj vnútorný pokoj
      </>
    ),
    hero: (
      <>
        Praktické {bold("tipy, ktoré môžeš hneď použiť")} (napr. pri tvorbe rezervy, investovaní,
        hypotéke)
      </>
    ),
  },
  {
    problem: (
      <>
        Každý rok si na rovnakom mieste, pretože {bold("nemáš žiadny systém ani plán")}
      </>
    ),
    hero: (
      <>
        {bold("Konkrétne rozbory slovenských produktov")}, fondov a platforiem
      </>
    ),
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.06 * i },
  }),
};

const forest = "#023c2e";
const forestMid = "#065f4a";
const forestGradientEnd = "#0a5a47";

const cellTextClass =
  "font-sans text-[0.9375rem] font-normal leading-snug md:text-base md:leading-relaxed";

const leftHeaderClass = "relative overflow-hidden px-4 py-4 md:px-5 md:py-5";
const leftHeaderStyle = { backgroundColor: "#141414" };
const rightHeaderClass = "relative overflow-hidden px-4 py-4 md:px-5 md:py-5";
const rightHeaderStyle = {
  background: `linear-gradient(145deg, ${forest} 0%, ${forestMid} 48%, ${forestGradientEnd} 100%)`,
};

const leftRowClass = (index: number) =>
  index % 2 === 0 ? "bg-[#0c0c0c]" : "bg-[#141414]";

const rightRowClass = (index: number) =>
  index % 2 === 0 ? "bg-[#023c2e]" : "bg-[#034f3d]";

const HeroHeroBezCenzurySection = () => (
  <section
    id="bez-cenzury"
    className="hero-section-pad-spacious relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[96px] pb-[96px] md:pt-[120px] md:pb-[120px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-50" />
    <div className="pointer-events-none absolute top-20 right-[20%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
    <div className="pointer-events-none absolute bottom-0 left-[10%] h-[300px] w-[300px] rounded-full bg-forest-glow/5 blur-[80px]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <header className="mx-auto mb-[54px] max-w-4xl text-center">
          <h2 className="headline-landing-section">
            Ideme naplno a bez cenzúry <span aria-hidden>🔓</span>
          </h2>
          <p className="sub-headline mt-5 text-foreground/85">
            Instagram odstraňuje účty a blokuje môj obsah. Na HeroHero ti{" "}
            <strong className="font-bold text-foreground">
              poviem skutočnú pravdu o peniazoch, ktorú ti tají tvoj bankár aj poradca
            </strong>
            , pretože by prišiel o províziu.
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl shadow-[0_20px_56px_-22px_rgba(2,60,46,0.35)]">
          <div className="flex flex-col md:grid md:grid-cols-2">
            <div className="flex flex-col">
              <div className={leftHeaderClass} style={leftHeaderStyle}>
                <p className="font-serif text-xl leading-snug tracking-tight text-white md:text-2xl">
                  <strong className="font-bold">{problemHeader}</strong>
                </p>
              </div>
              {comparisonRows.map((row, index) => (
                <motion.div
                  key={`problem-${index}`}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className={`flex gap-2.5 px-4 py-3.5 md:gap-3 md:px-5 md:py-4 ${leftRowClass(index)}`}
                >
                  <span
                    className="mt-0.5 shrink-0 text-[0.9375rem] leading-none text-[#E85D4A] md:text-base"
                    aria-hidden
                  >
                    ❌
                  </span>
                  <p className={`${cellTextClass} text-white/90`}>{row.problem}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col">
              <div className={rightHeaderClass} style={rightHeaderStyle}>
                <p className="font-serif text-xl leading-snug tracking-tight text-white md:text-2xl">
                  <strong className="font-bold">{heroHeader}</strong>
                </p>
              </div>
              {comparisonRows.map((row, index) => (
                <motion.div
                  key={`hero-${index}`}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className={`flex gap-2.5 px-4 py-3.5 md:gap-3 md:px-5 md:py-4 ${rightRowClass(index)}`}
                >
                  <span
                    className="mt-0.5 shrink-0 text-[0.9375rem] leading-none md:text-base"
                    aria-hidden
                  >
                    ✅
                  </span>
                  <p className={`${cellTextClass} text-white/90`}>{row.hero}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-[1] mx-auto mt-8 w-full max-w-4xl px-2 text-center md:mt-10">
          <p className="mx-auto max-w-2xl text-balance font-sans text-[0.98rem] leading-relaxed text-foreground md:max-w-none md:text-[1.0625rem] md:leading-snug">
            <ShieldCheck
              className="mr-1.5 inline-block h-[1.15em] w-[1.15em] shrink-0 align-[-0.18em] text-primary md:mr-2"
              strokeWidth={2.2}
              aria-hidden
            />
            Za{" "}
            <span className="relative mx-0.5 inline-flex translate-y-[-0.05em] align-middle">
              <span className="rounded-full border border-[#A52821]/35 bg-[#A52821]/[0.09] px-3 py-1 font-extrabold tabular-nums text-[#A52821] shadow-sm shadow-[#A52821]/10 md:px-3.5 md:py-1">
                5 € mesačne
              </span>
            </span>{" "}
            máš{" "}
            <strong className="font-bold text-foreground">vlastného finančného parťáka</strong>, ktorý ti{" "}
            <strong className="bg-gradient-to-r from-primary to-emerald-700 bg-clip-text font-bold text-transparent">
              kryje chrbát
            </strong>
            .
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroBezCenzurySection;

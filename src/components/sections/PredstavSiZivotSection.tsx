import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const bold = (text: string) => (
  <strong className="font-bold text-foreground">{text}</strong>
);

const lifeBubbles = ["Pokojnejší.", "Slobodnejší.", "Menej stresový finančný život."] as const;

const visionItems: ReactNode[] = [
  <>
    Máš absolútnu jasnosť vo svojich peniazoch. {bold("Vieš presne, čo a prečo robíš")}.
  </>,
  <>Finančná rezerva ti {bold("nielen kryje chrbát, ale ešte ti aj zarába")}.</>,
  <>
    A hypotéka? {bold("Vieš presne, kde získať 20 %")} bez toho, aby ťa to zruinovalo.
  </>,
  <>Peniaze už nekontrolujú tvoje vzťahy a {bold("hádky kvôli nim úplne zmiznú")}.</>,
  <>
    Neriadíš sa „radami z internetu“. Si sebaistý a {bold("robíš správne finančné rozhodnutia")}.
  </>,
  <>
    {bold("Máš systém, ktorý ti funguje,")} aj keď príde neočakávaná situácia.
  </>,
  <>
    {bold("Spíš pokojnejšie,")} lebo vieš, že máš svoje financie pod kontrolou.
  </>,
];

const PredstavSiZivotSection = () => (
  <section
    id="predstav-si-zivot"
    className="section-white hero-section-pad relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
    <div className="pointer-events-none absolute top-16 left-[8%] h-[280px] w-[280px] rounded-full bg-stone-500/10 blur-[88px]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="headline-landing-section mb-[54px]">
            <span aria-hidden>🔥</span> Predstav si, že tvoj život vyzerá takto...
          </h2>

          <ul className="space-y-4 text-left md:space-y-5">
            {visionItems.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="shrink-0 self-center text-xl leading-none md:text-2xl" aria-hidden>
                  ✅
                </span>
                <p className="font-sans text-body font-normal text-foreground/90 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 space-y-4 md:mt-20 md:space-y-5">
            <p className="quote-serif text-foreground/90">
              Konečne zažiješ ten pocit, keď {bold("ťa peniaze prestanú stresovať")} a stanú sa zdrojom slobody.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5 md:gap-x-3 md:gap-y-3">
              {lifeBubbles.map((label, index) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 18, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{
                    type: "spring",
                    damping: 21,
                    stiffness: 410,
                    mass: 0.65,
                    delay: index * 0.09,
                  }}
                  className="inline-flex max-w-full origin-center select-none items-center justify-center rounded-full border border-[#b5a699] bg-[#e8e1da] px-2.5 py-[4px] text-center font-sans text-[0.73rem] font-semibold leading-snug tracking-wide text-[#2e2620] shadow-[inset_0_1px_0_rgba(255,252,249,0.65),0_2px_4px_-1px_rgba(42,37,34,0.08),0_10px_28px_-10px_rgba(46,38,32,0.16),0_20px_40px_-16px_rgba(90,74,62,0.08)] ring-1 ring-white/55 md:px-3 md:py-1 md:text-[0.84rem]"
                >
                  {label}
                </motion.span>
              ))}
            </div>
            <p className="font-sans text-body font-normal text-muted-foreground">
              Presne taký, aký chce väčšina ľudí.
            </p>
            <p className="font-sans text-body font-normal text-foreground/90">
              A presne preto vznikla JS komunita na HeroHero.
            </p>
            <div className="pt-4 md:pt-6">
              <a href="#formular" className="btn-primary text-body">
                🚀 Vyskúšať na 15 dní ZADARMO
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PredstavSiZivotSection;

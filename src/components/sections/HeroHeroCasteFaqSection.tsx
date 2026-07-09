import AnimatedSection from "@/components/AnimatedSection";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

const faqs: { question: string; answer: ReactNode[] }[] = [
  {
    question: "Mám vo financiách chaos a vôbec im nerozumiem. Je táto komunita pre mňa?",
    answer: [
      "Áno. Práve preto som túto komunitu vytvoril.",
      <><strong className="font-semibold text-foreground">Nemusíš byť finančný expert.</strong> Nepotrebuješ rozumieť všetkým grafom, fondom, ETF, hypotékam a poplatkom. Potrebuješ pochopiť základné rozhodnutia, ktoré robíš celý život: čo robiť s výplatou, ako si vytvoriť rezervu, ako začať investovať, ako rozmýšľať nad hypotékou, fondmi, bývaním, rentou a finančnou slobodou.</>,
      <><strong className="font-semibold text-foreground">V komunite veci vysvetľujem ľudskou rečou, na konkrétnych príkladoch a cez čísla.</strong></>,
    ],
  },
  {
    question: "Čo ak zistím, že to pre mňa nie je? Musím sa viazať?",
    answer: [
      "Nie. Nemusíš sa viazať.",
      <><strong className="font-semibold text-foreground">Prvých 15 dní máš zadarmo.</strong> Vojdeš dnu, pozrieš si videá, vyskúšaš nástroje, stiahneš si bonusy a rozhodneš sa podľa seba.</>,
      <><strong className="font-semibold text-foreground">Ak zistíš, že ti to nedáva hodnotu, členstvo jednoducho zrušíš.</strong> Bez viazanosti, bez telefonátov, bez presviedčania.</>,
    ],
  },
  {
    question: "Čo presne za 5 € mesačne dostanem?",
    answer: [
      "Dostaneš prístup do mojej komunity na HeroHero, kde každý týždeň pribudne nový praktický finančný obsah.",
      <>Nájdeš tam videá <strong className="font-semibold text-foreground">o investovaní, hypotékach, ETF, fondoch, investičných bytoch, rente, poplatkoch a produktoch na slovenskom trhu.</strong></>,
      <>Okrem videí dostaneš aj <strong className="font-semibold text-foreground">praktické nástroje a bonusy: kalkulačky, checklisty, PDF dokumenty, poplatkový röntgen, bytový a ETF semafor, interaktívnu mapu investičných bytov a ďalšie materiály,</strong> ktoré ti pomôžu robiť lepšie rozhodnutia s peniazmi.</>,
      "Nie je to len ďalší obsah. Je to systém, podľa ktorého sa vieš rozhodovať.",
    ],
  },
  {
    question: "Prečo by som mal platiť, keď je internet plný finančných rád zadarmo?",
    answer: [
      <><strong className="font-semibold text-foreground">Lebo internet je plný rád bez kontextu.</strong></>,
      "Jeden človek ti povie: splať hypotéku. Druhý ti povie: investuj. Tretí ti povie: kúp byt. Štvrtý ti ukáže fond. Piaty ti povie úplne opačný názor.",
      "A ty máš z toho spraviť rozhodnutie za tisíce eur.",
      "V komunite nejde o ďalší názor z internetu. Ide o systém, slovenský kontext, výpočty, poplatky, produkty a rozhodnutia, ktoré si vieš konečne prepočítať.",
    ],
  },
  {
    question: "Je toto investičné poradenstvo?",
    answer: [
      "Nie. Obsah v komunite má vzdelávací a informačný charakter.",
      "Ukazujem princípy, výpočty, porovnania, konkrétne produkty, riziká, poplatky a môj spôsob uvažovania. Cieľom je, aby si lepšie rozumel peniazom a vedel robiť rozumnejšie rozhodnutia.",
      <><strong className="font-semibold text-foreground">Individuálne odporúčanie pre tvoju konkrétnu situáciu patrí na{" "}<a href="/konzultacia" className="underline underline-offset-2 hover:text-primary transition-colors">osobnú konzultáciu</a>.</strong></>,
    ],
  },
  {
    question: "Budeš rozoberať aj konkrétne produkty na Slovensku?",
    answer: [
      "Áno. Práve to bude jedna z najväčších hodnôt komunity.",
      <>Budem rozoberať fondy, investičné produkty, platformy, hypotéky, poplatky a <strong className="font-semibold text-foreground">riešenia, ktoré ľudia na Slovensku bežne kupujú bez toho, aby im úplne rozumeli.</strong></>,
      'Nebude to štýlom „toto si kúp". Bude to cez čísla, poplatky, riziká, výhody, nevýhody a alternatívy. Aby si konečne vedel, čo vlastne vlastníš alebo čo sa ti niekto snaží predať.',
    ],
  },
  {
    question: "Je to aj pre mňa, keď už investujem?",
    answer: [
      "Áno. Možno práve vtedy ešte viac.",
      "Ak už investuješ, komunita ti pomôže skontrolovať, čo vlastníš, koľko platíš, aké riziko podstupuješ a či by si si daný produkt kúpil znova, keby si sa dnes rozhodoval od nuly.",
      <>Ak ešte neinvestuješ, začneš od základov. <strong className="font-semibold text-foreground">Ak už investuješ, pôjdeme viac do optimalizácie, poplatkov, portfólia, hypotéky, nehnuteľností a rozhodnutí, ktoré môžu mať veľký dopad na tvoj majetok.</strong></>,
    ],
  },
];

const FaqItem = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: ReactNode[];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-32px" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 * index }}
    className="border-b border-foreground/20"
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-start justify-between gap-5 py-9 text-left md:py-10"
    >
      <span
        className={`[font-family:var(--font-serif)] text-[1.25rem] font-[700] leading-snug transition-colors duration-200 md:text-[1.6875rem] ${
          isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
        }`}
      >
        {question}
      </span>
      <span
        className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
          isOpen
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border bg-transparent text-foreground/40 group-hover:border-primary/40 group-hover:text-primary/70"
        }`}
        aria-hidden
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col gap-3 pb-9 md:pb-10">
            {answer.map((paragraph, i) => (
              <p key={i} className="font-sans text-[1.0625rem] md:text-[1.125rem] leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const HeroHeroCasteFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[96px] md:pt-[100px] md:pb-[120px]"
      style={{ backgroundColor: "#F5EFEA" }}
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-[0.18] pointer-events-none" />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <header className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
            <h2
              id="faq-heading"
              className="headline-landing-section text-balance leading-[1.1] text-foreground"
            >
              Časté otázky
            </h2>
          </header>
        </AnimatedSection>

        <div className="mx-auto max-w-3xl border-t border-foreground/20">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroHeroCasteFaqSection;

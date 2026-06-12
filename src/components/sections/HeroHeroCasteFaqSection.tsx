import AnimatedSection from "@/components/AnimatedSection";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Mám vo financiách úplný chaos a vôbec im nerozumiem. Je táto komunita pre mňa?",
    answer:
      "Presne pre teba je najdôležitejšia. Celý obsah tvorím ľudskou rečou, bez zložitého a nudného finančného žargónu. Zameriame sa na úplne bežné, praktické situácie, ktoré trápia väčšinu Slovákov: ako si konečne vytvoriť nepriestrelnú rezervu, ako skrotiť hypotéku, kedy sa oplatí mimoriadna splátka a ako nenechať peniaze hniť na bežnom účte. Začneme od absolútnej nuly a vnesieme do tvojich peňazí systém.",
  },
  {
    question: "Prečo by som mal platiť, keď je internet a Instagram plný finančných rád zadarmo?",
    answer:
      'Pretože tie „rady zadarmo“ sú v 95% prípadov len povrchné motivačné frázy a marketingový balast. Algoritmy sociálnych sietí ma neustále blokujú a cenzurujú zakaždým, keď chcem ukázať tvrdú realitu slovenského trhu. V tejto komunite rozoberám konkrétne slovenské produkty, fondy a platformy na drobné – vrátane ich skrytých poplatkov a nevýhod. Toto ti žiadny influencer na Instagrame otvorene nepovie, pretože by riskoval stratu spoluprác.',
  },
  {
    question: "Čo presne za cenu predplatného každý mesiac dostanem?",
    answer:
      "Každý jeden týždeň ti odomknem jedno nové, praktické video. Žiadna odtrhnutá teória. Uvidíš analýzy reálnych finančných situácií bežných ľudí, na ktorých pochopíš presné kroky. K tomu získaš hotové interaktívne kalkulačky pre tvoje vlastné rozhodovanie, pravidelné novinky zo sveta peňazí a rozhovory s odborníkmi z praxe.",
  },
  {
    question: "Čo ak zistím, že to pre mňa nie je? Musím sa zaviazať na dlhú dobu?",
    answer:
      "Vôbec nie. Nenávidím skryté háčiky a nezmyselné viazanosti presne tak isto ako ty. Preto máš prvých 15 dní na vyskúšanie úplne zadarmo. Vojdi dnu, stiahni si bonusy, pozri si videá. Ak zistíš, že ti to neprináša hodnotu, členstvo jedným klikom zrušíš priamo vo svojom profile a nestiahne ti to ani cent.",
  },
] as const;

const FaqItem = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-32px" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 * index }}
    className="border-b border-white/10"
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-start justify-between gap-5 py-7 text-left"
    >
      <span
        className={`[font-family:var(--font-serif)] text-[1.4375rem] font-[700] leading-snug transition-colors duration-200 md:text-[1.6875rem] ${
          isOpen ? "text-[#a8d5b5]" : "text-white group-hover:text-[#a8d5b5]"
        }`}
      >
        {question}
      </span>
      <span
        className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
          isOpen
            ? "border-white/30 bg-white/10 text-white"
            : "border-white/20 bg-transparent text-white/40 group-hover:border-white/40 group-hover:text-white/70"
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
          <p className="pb-7 pr-12 font-sans text-[1.125rem] leading-relaxed text-white/65">
            {answer}
          </p>
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
      style={{ backgroundColor: "#111111" }}
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-[0.18] pointer-events-none" />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <header className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
            <h2
              id="faq-heading"
              className="headline-landing-section text-balance leading-[1.1] text-white"
            >
              Časté otázky
            </h2>
          </header>
        </AnimatedSection>

        <div className="mx-auto max-w-3xl border-t border-white/10">
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

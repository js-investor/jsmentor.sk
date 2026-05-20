import AnimatedSection from "@/components/AnimatedSection";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question:
      "Mám vo financiách úplný chaos a vôbec im nerozumiem. Bude táto komunita pre mňa?",
    answer:
      "Práve pre teba je najdôležitejšia. Všetko vysvetľujem ľudskou rečou, bez zložitého a odborného žargónu. Zameriame sa na úplne bežné problémy, ktoré dennodenne trápia ľudí, ako si ty. Od toho, ako si z bežného platu konečne vytvoriť rezervu, až po to, ako skrotiť hypotéku alebo sa prestať doma hádať o peniazoch. Začneme od nuly a vnesieme do toho systém.",
  },
  {
    question: "Čo ak zistím, že to pre mňa nie je? Musím sa zaviazať na dlhšiu dobu?",
    answer:
      "Vôbec nie. Osobne nenávidím skryté poplatky a nezmyselné viazanosti presne tak ako ty. Preto si môžeš celú komunitu vyskúšať na prvých 14 dní úplne zadarmo. Vojdi dnu, pozri si videá, získaj prístup ku všetkým benefitom a ak zistíš, že ti to nedáva hodnotu, členstvo jedným klikom zrušíš. Rozhodnutie je len na tebe.",
  },
  {
    question: "Prečo by som mal platiť, keď je internet a Instagram plný finančných rád zadarmo?",
    answer:
      "Pretože tie „rady zadarmo“ sú často len povrchné motivačné frázy. Tu ti nebudem mazať med okolo úst. Do komunity dávam informácie a tvrdú pravdu, ktorú mi inak algoritmy na sociálnych sieťach zakazujú zdieľať alebo ma za ňu blokujú. Otvorene a konkrétne rozoberám produkty na našom trhu, vrátane ich skrytých poplatkov a nedostatkov. Toto u žiadneho influencera nenájdeš.",
  },
  {
    question: "Čo presne za cenu predplatného každý mesiac dostanem?",
    answer:
      "Každý týždeň ti odomknem jedno nové video z rôznych oblastí financií. Ale neostaneme len pri teórii. Získaš prístup k rozborom reálnych finančných situácií bežných ľudí, na ktorých ti ukážem presné a praktické kroky. Navyše získaš hotové interaktívne kalkulačky pre tvoje vlastné rozhodovanie, pravidelné novinky zo sveta peňazí a občasné rozhovory s inými odborníkmi z praxe. Za menej, než cenu dvoch káv dostaneš presný nástroj, ako ochrániť a budovať svoj majetok. Máš sa na čo tešiť.",
  },
] as const;

const HeroHeroFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-white section-padding relative scroll-mt-24 bg-background"
    >
      <div className="section-container">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl">
            <h2 className="headline-serif mb-10 text-center md:mb-14">
              Možno sa pýtaš...
            </h2>

            <div>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.question} className="border-b border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                      className="flex w-full items-start justify-between gap-4 py-7 text-left md:py-9"
                      aria-expanded={isOpen}
                    >
                      <span className="[font-family:var(--font-serif)] text-[1.35rem] font-bold leading-snug text-foreground md:text-[1.65rem] md:leading-[1.22]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`mt-1 h-6 w-6 shrink-0 text-foreground/45 transition-transform duration-200 md:mt-1.5 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </button>
                    {isOpen ? (
                      <p className="pb-7 pr-8 font-sans text-[1.0625rem] leading-relaxed text-[#4B5563] md:pb-9 md:text-[1.1875rem] md:leading-relaxed">
                        {faq.answer}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroHeroFaqSection;

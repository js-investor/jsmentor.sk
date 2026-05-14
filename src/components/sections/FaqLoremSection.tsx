import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import { useState } from "react";
import type { ReactNode } from "react";

const faqs = [
  {
    question: "Prečo by som potreboval vás, keď investujem sám cez appku?",
    answer:
      "Appka je nástroj, nie stratégia. Nevie vám povedať, kedy zmeniť portfólio, kedy kúpiť investičný byt, ako daňovo optimalizovať zisky alebo kedy začať čerpať rentu. A keď trh padne o 30 % a vstanete s panikou, appka vám nezdvihne telefón. Ja áno. To je rozdiel medzi nástrojom a partnerom.",
  },
  {
    question: "Koľko ma to bude stáť?",
    answer:
      "0,49 % ročne do 100 000 €, 0,35 % nad 100 000 €. Plus maximálne 1 % vstupný poplatok z vkladov. Žiadne ďalšie skryté poplatky, všetko si jasne dohodneme vopred. Bežná banka si berie 1,5–2 % ročne. Pri mesačnej investícii 300 € je rozdiel za 30 rokov až 117 000 € vo váš prospech.",
  },
  {
    question: "Sú moje peniaze v bezpečí?",
    answer:
      "Áno. Som licencovaný správca majetku pod dohľadom NBS s číslom 282999. Vaše peniaze sú na investičných účtoch na vaše meno- Nikdy nie na mojom. Mám nad nimi nulový prístup. Riadim len vašu stratégiu.",
  },
  {
    question: "Stratím kontrolu nad svojimi peniazmi?",
    answer:
      "Práve naopak. V aplikácii UFO vidíte v reálnom čase celý svoj majetok. Fondy, hypotéku, nehnuteľnosti, poistenia. Na jeden klik viete, o koľko ste bohatší. Stratégiu vieme kedykoľvek prispôsobiť.",
  },
  {
    question: "Môžem kedykoľvek vystúpiť zo spolupráce?",
    answer:
      "Áno, bez sankcií a bez otázok. Nemám záujem držať klientov nasilu. Chcem pracovať len s tými, ktorí vo mne vidia skutočného dlhodobého partnera.",
  },
  {
    question: "Môžem vám dôverovať? Nie je to pyramída?",
    answer:
      "Som regulovaný NBS, nie predajca produktov na provízii. Vaše peniaze idú na účty v renomovaných inštitúciách. Nie ku mne. Každú investíciu vám vopred vysvetlím vrátane rizík. Ak vám niečo nedáva zmysel, nerobíme to.",
  },
  {
    question: "Viete garantovať výnos?",
    answer:
      "Výnosy zo zákona garantovať nemôžem. Čo garantujem je matematicky postavená stratégia, stresové scenáre a rozhodnutia na základe dát, nie pocitov alebo trendov.",
  },
  {
    question: "Musím vám hneď povedať všetko o svojich financiách?",
    answer:
      "Nie. Úvodný hovor slúži na to, aby sme sa spoznali a zistili, či má spolupráca zmysel. Žiadny výsluch ani nátlak. Ak sa rozhodneme pokračovať, prejdeme spolu analýzou krok za krokom.",
  },
  {
    question: "Čo sa stane s mojím majetkom, ak sa mi niečo stane?",
    answer:
      "Súčasťou Wealth Map je aj nastavenie dedičského plánu. Od základného právneho procesu až po zverenecké fondy. Váš majetok bude chránený a rodina zabezpečená aj bez vás.",
  },
  {
    question: "Prečo sú vaše poplatky tak nízke? Nie je v tom háčik?",
    answer:
      "Nie je. Banky platia pobočky, reklamy a tisícky zamestnancov. Preto si berú až 2 %. Ja pracujem v režime otvorenej architektúry, vyberám najlepšie fondy z celého sveta bez zbytočných nákladov. Zarábam vtedy, keď rastie váš majetok. To je férovosť, nie háčik.",
  },
];

type FaqLoremSectionProps = {
  heading?: ReactNode;
  subheading?: ReactNode;
  showCta?: boolean;
};

const FaqLoremSection = ({
  heading = (
    <>
      Lorem ipsum dolor sit amet <span className="text-primary font-bold">consectetur adipiscing</span>
    </>
  ),
  subheading,
  showCta = true,
}: FaqLoremSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-cream section-padding relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <div className="mx-auto mb-10 max-w-5xl text-center md:mb-12">
            <p className="eyebrow">FAQ</p>
            <h2 className="headline-serif">{heading}</h2>
            {subheading ? <p className="sub-headline mt-4">{subheading}</p> : null}
          </div>
        </AnimatedSection>

        <div className="mx-auto grid max-w-4xl gap-4 md:gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimatedSection key={faq.question} delay={index * 0.04}>
                <div className="rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                    className={`group w-full text-left rounded-xl border border-primary/15 px-5 py-3.5 md:px-6 md:py-4 pr-12 font-sans text-lead font-semibold relative transition-colors duration-200 ${
                      isOpen ? "bg-primary text-white" : "bg-white text-foreground hover:bg-primary hover:text-white"
                    }`}
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                    <span
                      className={`absolute right-5 top-1/2 -translate-y-1/2 h6 ${
                        isOpen ? "text-white" : "text-primary group-hover:text-white"
                      }`}
                    >
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="mt-3 px-1 md:px-2 font-sans text-body text-muted-foreground">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {showCta ? (
          <AnimatedSection>
            <div className="mt-10 text-center">
              <button type="button" className="btn-primary text-body">
                Lorem ipsum
              </button>
              <div>
                <CtaResponseNote />
              </div>
            </div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
};

export default FaqLoremSection;

import AnimatedSection from "@/components/AnimatedSection";
import { useState } from "react";

const faqs = [
  {
    question: "Je úvodný hovor naozaj bezplatný?",
    answer: (
      <>
        <strong>Áno.</strong> Trvá 30 minút, prebieha online cez Google Meet a je úplne nezáväzný.
        <strong> Nepredávam ti nič.</strong> Pýtam sa, počúvam, a na konci ti poviem rovno či ti viem
        pomôcť. Ak nie, poviem ti to. <strong>Šetríme tvoj aj môj čas.</strong>
      </>
    ),
  },
  {
    question: "Koľko peňazí potrebujem na začiatok?",
    answer: (
      <>
        Ak sa bavíme o akciových ETF, tak <strong>minimálny vklad odporúčam aspoň 100 € mesačne.</strong>{" "}
        Aby sa to mohlo rozumne rozdeliť.
      </>
    ),
  },
  {
    question: "Ako sa líšiš od banky?",
    answer: (
      <>
        Banka ti predá to, čo má v ponuke — svoje vlastné fondy s poplatkami 1,5-2 % ročne.{" "}
        <strong>Ja pracujem inak.</strong> Vyjednávam podmienky priamo s investičnými spoločnosťami,
        vyberám to najlepšie z celého trhu, nie z jednej ponuky.{" "}
        <strong>A keď trhy padnú o 20 %, ja ti zavolám. Banka nie.</strong>
      </>
    ),
  },
  {
    question: "Zvládnem to aj sám cez XTB alebo inú appku?",
    answer: (
      <>
        Appku si stiahneš za 2 minúty. Ale potom sedíš sám a riešiš — ktoré ETF? V akej mene?
        Hedgované alebo nie? Accumulating alebo distributing? Koľko percent do čoho? Čo keď príde
        prepad a ty nevieš či držať, predať, alebo dokúpiť? Čo s daňovým priznaním? Čo keď ti príde
        bonus 10 000 € a nevieš kam ho dať? Čo keď chceš kúpiť byt a nevieš či najprv splatiť hypotéku
        alebo investovať? <strong>Appka ti dá tlačidlo.</strong>{" "}
        <strong>Ale nedá ti plán a strategické rozhodovanie. Ja áno.</strong>
      </>
    ),
  },
  {
    question: "Sú moje peniaze v bezpečí?",
    answer: (
      <>
        <strong>Tvoje peniaze nikdy nie sú u mňa.</strong> Sú na tvojom mene, v licencovanej spoločnosti
        pod dohľadom Národnej banky Slovenska, s garančným fondom investícií.{" "}
        <strong>Majetok je striktne oddelený od majetku spoločnosti.</strong>
      </>
    ),
  },
  {
    question: "Koľko ma to bude stáť?",
    answer: (
      <>
        Poplatok 1 % z vkladov, ktorý sa dá rozložiť, takže ho ani nepocítiš. Ročný poplatok za správu
        0,49 %. Pri portfóliu nad 100 000 € klesá na 0,35 %.{" "}
        <strong>Žiadne výstupné poplatky, žiadne skryté náklady.</strong>{" "}
        <strong>Zarábam vtedy, keď rastie tvoj majetok — naše záujmy sú zosúladené.</strong>
      </>
    ),
  },
  {
    question: "Čo ak chcem peniaze vybrať skôr?",
    answer: (
      <>
        <strong>Kedykoľvek.</strong> Žiadne výstupné poplatky, žiadne viazanosti, žiadne sankcie.
        Peniaze sú tvoje a máš k nim prístup. Odporúčam investovať dlhodobo, ale{" "}
        <strong>rozhodnutie je vždy na tebe.</strong>
      </>
    ),
  },
  {
    question: "Prečo by som mal dôverovať práve tebe?",
    answer: (
      <>
        Nemáš dôvod — ešte. Preto tu je ten bezplatný hovor.{" "}
        <strong>Za 30 minút zistíš, či ti moja práca dáva zmysel.</strong> Mám za sebou 8 rokov praxe,
        dokončujem certifikáciu EFA (European Financial Advisor), licenciu NBS, 531+ aktívnych klientov,
        viac ako 3 milióny eur v správe portfólií a 115 000 ľudí ktorí ma sledujú na Instagrame.{" "}
        <strong>Ale najlepší dôkaz je tých 30 minút, kde sa sám rozhodneš.</strong>
      </>
    ),
  },
  {
    question: "Riešiš len ETF alebo mi pomôžeš aj s plánom ohľadom investičného bytu ?",
    answer: (
      <>
        Nie len ETF. Ak to dáva matematický zmysel, riešime spolu aj investičné nehnuteľnosti — od
        výberu lokality, cez ROI kalkuláciu s optimistickým aj stresovým scenárom, až po financovanie.{" "}
        <strong>Nehnuteľnosť odporúčam len vtedy, keď čísla sedia.</strong> Nie preto, že byty,byty,byty.
      </>
    ),
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-cream section-padding relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <div className="mx-auto mb-10 max-w-5xl text-center md:mb-12">
            <p className="eyebrow">FAQ</p>
            <h2 className="headline-serif">
              Otázky, ktoré ľudia riešia <span className="text-primary font-bold">pred prvým hovorom</span>
            </h2>
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
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-white text-foreground hover:bg-primary hover:text-white"
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
      </div>
    </section>
  );
};

export default FaqSection;

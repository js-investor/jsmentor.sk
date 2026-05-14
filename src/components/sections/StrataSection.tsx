import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import SectionHeader from "@/components/SectionHeader";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { TrendingDown, Percent, Compass } from "lucide-react";
import { ReactNode } from "react";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

const cards: { icon: ReactNode; stat: string; title: string; body: string }[] = [
  {
    icon: <TrendingDown className="w-8 h-8 text-white -translate-x-0.5" strokeWidth={1.7} />,
    stat: "1 200 € ročne",
    title: "Inflácia",
    body: "Ak ti na účte leží 30 000 €, inflácia ti z nich tichu zožerie viac ako 1 200 € ročne. Za 10 rokov je to 12 000 €. Bez toho aby si urobil čokoľvek zlé. Stačilo neurobiť nič.",
  },
  {
    icon: <Percent className="w-8 h-8 text-white -translate-x-0.5" strokeWidth={1.7} />,
    stat: "Až 30 %",
    title: "Skryté poplatky",
    body: "Bankové fondy a tradiční poradcovia ti účtujú 1,5 – 2 % ročne. Znie to ako málo. Ale za 30 rokov ti tieto poplatky zoberú tretinu majetku. V eurách to často znamená desiatky tisíc.",
  },
  {
    icon: <Compass className="w-8 h-8 text-white -translate-x-0.5" strokeWidth={1.7} />,
    stat: "Bez smeru",
    title: "Chýbajúci plán",
    body: "Aj keď investuješ, ale robíš to chaoticky. Raz ETF, raz krypto, raz \"kamarát mi povedal\" a tvoje výnosy zaostávajú.",
  },
];

const StrataSection = () => (
  <section className="section-cream section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-30" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <SectionHeader
          eyebrow="Prečo to má zmysel riešiť"
          headline={
            <>
              Každý mesiac bez plánu{" "}
              <span className="text-primary font-bold">ťa stojí reálne peniaze.</span>
            </>
          }
          subHeadline={
            <>
              Toto nie sú scary čísla z marketingu. Toto je{" "}
              <strong>matematika, ktorú väčšina ľudí ignoruje,</strong> kým je neskoro.
            </>
          }
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.1}>
            <div className="card-glass h-full">
              <div
                className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${brandPattern})` }}
              >
                {c.icon}
              </div>
              <p className="[font-family:var(--font-serif)] h3 stat-gradient mb-2">
                {c.stat}
              </p>
              <p className="font-sans h6 text-foreground mb-3">
                {c.title}
              </p>
              <p className="font-sans text-body text-muted-foreground">
                {c.title === "Inflácia" && (
                  <>
                    Ak ti na účte leží 30 000 €, inflácia ti z nich tichu zožerie viac
                    ako 1 200 € ročne. <strong>Za 10 rokov je to 12 000 €.</strong> Bez
                    toho aby si urobil čokoľvek zlé. Stačilo neurobiť nič.
                  </>
                )}
                {c.title === "Skryté poplatky" && (
                  <>
                    Bankové fondy a tradiční poradcovia ti účtujú 1,5 – 2 % ročne.
                    Znie to ako málo. Ale za 30 rokov ti tieto{" "}
                    <strong>poplatky zoberú tretinu majetku.</strong> V eurách to často
                    znamená desiatky tisíc.
                  </>
                )}
                {c.title === "Chýbajúci plán" && (
                  <>
                    Aj keď investuješ, ale <strong>robíš to chaoticky.</strong> Raz ETF,
                    raz krypto, raz "kamarát mi povedal" a tvoje výnosy zaostávajú.
                  </>
                )}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <p className="quote-serif text-center max-w-3xl mx-auto mt-12 md:mt-16">
          „Najdrahšie investovanie nie je to so zlými rozhodnutiami. Je to
          investovanie bez plánu."
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <div className="text-center mt-8 md:mt-10">
          <button onClick={scrollToBooking} className="btn-primary text-body">
            Získať Wealth Map
          </button>
          <div>
            <CtaResponseNote />
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default StrataSection;

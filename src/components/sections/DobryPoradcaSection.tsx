import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { TrendingUp, Wallet, Clock, Check } from "lucide-react";
import { ReactNode } from "react";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

const cards: { icon: ReactNode; stat: string; title: string; body: string }[] = [
  {
    icon: <TrendingUp className="w-8 h-8 text-white -translate-x-0.5" strokeWidth={1.7} />,
    stat: "+3 % ročne",
    title: "Vyššie výnosy",
    body: "Kvalitný správca majetku pridá podľa štúdie Vanguard v priemere o 3 % ročne. Cez správnu alokáciu, daňovú optimalizáciu a elimináciu emočných rozhodnutí. Za 20 rokov je to rozdiel desiatok tisíc eur.¹",
  },
  {
    icon: <Wallet className="w-8 h-8 text-white -translate-x-0.5" strokeWidth={1.7} />,
    stat: "2-4× viac",
    title: "Väčší majetok v dôchodku",
    body: "Ľudia s písomným finančným plánom majú pri odchode do dôchodku 2-4× väčší majetok ako tí, ktorí plánujú podľa pocitu. Rozdiel nie je v príjme ale v pláne.²",
  },
  {
    icon: <Clock className="w-8 h-8 text-white -translate-x-0.5" strokeWidth={1.7} />,
    stat: "350+ hodín",
    title: "Čas pre rodinu ročne",
    body: "Samostatná správa financií zaberie v priemere viac ako 350 hodín ročne. To je 7 hodín týždenne, ktoré môžeš stráviť s rodinou, v práci alebo na dovolenke. Toto je hodnota, ktorú si nikto necení dostatočne,kým ju nemá.³",
  },
];

type DobryPoradcaSectionProps = {
  ctaLabel?: string;
};

const DobryPoradcaSection = ({ ctaLabel = "Získať Wealth Map" }: DobryPoradcaSectionProps) => (
  <section className="section-white section-padding relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <SectionHeader
          eyebrow="Aký je rozdiel"
          headline={
            <>
              <span className="text-primary font-bold">Čo dokáže priniesť</span> dobrý
              poradca
            </>
          }
          subHeadline={
            <>
              Toto nie sú moje sľuby. Sú to{" "}
              <strong>
                dáta z medzinárodných štúdií Vanguard, Russell Investments a
                Northwestern Mutual.
              </strong>
            </>
          }
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.1}>
            <div className="card-glass-cream h-full">
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
                {c.body}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <p className="text-small text-muted-foreground text-center max-w-4xl mx-auto mt-10 tracking-[0px]">
          ¹ Vanguard Advisor's Alpha Study | ² Northwestern Mutual Planning &
          Progress Study | ³ Odhad na základe priemerného času samostatnej správy
          financií. Uvedené štatistiky pochádzajú z priemyselných štúdií a
          nepredstavujú prísľub budúcich výnosov.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <div className="text-center mt-8 md:mt-10">
          <button onClick={scrollToBooking} className="btn-primary text-body">
            {ctaLabel}
          </button>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-small font-sans text-muted-foreground mt-4">
            {["Bezplatný úvodný hovor", "Online 30 minút", "Bez záväzku a predaja"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default DobryPoradcaSection;

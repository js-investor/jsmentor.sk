import AnimatedSection from "@/components/AnimatedSection";
import { CircleCheck } from "lucide-react";

const items = [
  "Obsah a rozbory",
  "Každý týždeň nový finančný rozbor",
  "Investovanie bez rozprávok",
  "Hypotéky, byty, renta",
  "Slovenské produkty pod lupou",
  "Reálne prípady ľudí",
  "Konkrétne videá dostupné hneď po vstupe",
  "Interaktívna mapa investičných bytov",
  "Poplatkový röntgen",
  "Bytový a ETF semafor",
  "Rentová kalkulačka",
  "Investičná kalkulačka",
  "Hypotekárna kalkulačka",
  "Mzdová kalkulačka",
  "Checklisty a PDF dokumenty",
] as const;

const CoVsetkoZiskasSection = () => (
  <section
    id="co-vstetko-ziskas"
    className="scroll-mt-24 overflow-hidden px-5 py-[72px] md:px-8 md:py-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="section-container">
      <AnimatedSection>
        <h2 className="headline-landing-section mx-auto mb-10 max-w-3xl text-balance text-center text-foreground md:mb-14">
          Čo všetko získaš
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.07}>
        <ul className="mx-auto grid w-fit grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2 md:gap-y-5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3.5">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={2} />
              <span className="whitespace-nowrap font-sans text-[1rem] leading-snug text-foreground sm:text-[1.125rem] md:text-[1.375rem] lg:text-[1.5rem]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href="https://herohero.co/jsmentor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-body"
            data-umami-event="click_herohero"
            data-umami-event-section="co-vstetko-ziskas"
          >
            Chcem sa pridať zadarmo 🚀
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CoVsetkoZiskasSection;

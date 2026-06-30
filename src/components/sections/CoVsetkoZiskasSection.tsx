import AnimatedSection from "@/components/AnimatedSection";
import { CircleCheck } from "lucide-react";
import { CENNIK_SECTION_HREF } from "@/lib/cennikCta";

const items: { pre?: string; bold: string; post?: string }[] = [
  { pre: "Obsah a ", bold: "rozbory" },
  { bold: "Každý týždeň", post: " nový finančný rozbor" },
  { bold: "Investovanie", post: " bez rozprávok" },
  { bold: "Hypotéky, byty, renta" },
  { bold: "Slovenské produkty", post: " pod lupou" },
  { bold: "Reálne prípady", post: " ľudí" },
  { pre: "Konkrétne videá dostupné ", bold: "hneď po vstupe" },
  { bold: "Interaktívna mapa", post: " investičných bytov" },
  { bold: "Poplatkový", post: " röntgen" },
  { pre: "Bytový a ETF ", bold: "semafor" },
  { bold: "Rentová", post: " kalkulačka" },
  { bold: "Investičná", post: " kalkulačka" },
  { bold: "Hypotekárna", post: " kalkulačka" },
  { bold: "Mzdová", post: " kalkulačka" },
  { bold: "Checklisty a PDF", post: " dokumenty" },
];

const CoVsetkoZiskasSection = () => (
  <section
    id="co-vstetko-ziskas"
    className="scroll-mt-24 overflow-hidden px-5 pb-[72px] pt-8 md:px-8 md:pb-[96px] md:pt-10"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="section-container">
      <AnimatedSection>
        <h2 className="mx-auto mb-10 max-w-3xl text-balance text-center [font-family:var(--font-serif)] text-[1.75rem] font-extrabold leading-[1.15] text-foreground md:mb-12 md:text-[2.625rem] lg:text-[2.875rem]">
          Čo všetko získaš
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.07}>
        <ul className="mx-auto grid w-fit grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2 md:gap-y-5">
          {items.map((item) => (
            <li key={item.bold} className="flex items-start gap-3.5">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={2} />
              <span className="whitespace-nowrap font-sans text-[1rem] leading-snug text-foreground sm:text-[1.125rem] md:text-[1.375rem] lg:text-[1.5rem]">
                {item.pre}<strong>{item.bold}</strong>{item.post}
              </span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href={CENNIK_SECTION_HREF}
            className="btn-primary text-body"
            data-umami-event="click_cennik"
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

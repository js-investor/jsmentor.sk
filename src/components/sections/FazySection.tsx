import AnimatedSection from "@/components/AnimatedSection";
import {
  Building2,
  ChartNoAxesCombined,
  HandCoins,
  PiggyBank,
  SearchCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const items: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Rezerva a stabilita",
    body: "Ako nastaviť finančnú rezervu a pevný základ pred investovaním.",
    icon: PiggyBank,
  },
  {
    title: "Cashflow a efektivita",
    body: "Kde vám zbytočne odtekajú peniaze a čo sa dá zlepšiť.",
    icon: Wallet,
  },
  {
    title: "Akciové portfólio",
    body: "Ako nastaviť portfólio podľa cieľov, horizontu a miery rizika.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Audit existujúcich investícií",
    body: "Či vaše súčasné riešenia dávajú zmysel alebo majú priestor na zlepšenie.",
    icon: SearchCheck,
  },
  {
    title: "Investičné nehnuteľnosti",
    body: "Či vo vašom prípade dávajú zmysel a ako ich vyhodnotiť racionálne.",
    icon: Building2,
  },
  {
    title: "Renta z majetku",
    body: "Ako raz čerpať majetok cez portfólio, dividendy alebo nehnuteľnosti.",
    icon: HandCoins,
  },
];

const FazySection = () => (
  <section
    className="section-padding relative overflow-hidden"
    style={{ backgroundColor: "#F2EEE7" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="headline-serif">
            Čo všetko <span className="text-primary font-bold">spolu vyriešime</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20 lg:gap-x-12 lg:gap-y-24">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <AnimatedSection key={item.title} delay={i * 0.05}>
              <div className="text-left">
                <Icon
                  className="mb-5 h-9 w-9 md:h-10 md:w-10 text-primary"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="font-sans h6 text-foreground mb-2">
                  {item.title}
                </p>
                <p className="font-sans text-small text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  </section>
);

export default FazySection;

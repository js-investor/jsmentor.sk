import { useState } from "react";
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
import { cn } from "@/lib/utils";

const TABS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: PiggyBank,
    title: "Rezerva a stabilita",
    body: "Ako nastaviť finančnú rezervu a pevný základ pred investovaním.",
  },
  {
    icon: Wallet,
    title: "Cashflow a efektivita",
    body: "Kde vám zbytočne odtekajú peniaze a čo sa dá zlepšiť.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Akciové portfólio",
    body: "Ako nastaviť portfólio podľa cieľov, horizontu a miery rizika.",
  },
  {
    icon: SearchCheck,
    title: "Audit existujúcich investícií",
    body: "Či vaše súčasné riešenia dávajú zmysel alebo majú priestor na zlepšenie.",
  },
  {
    icon: Building2,
    title: "Investičné nehnuteľnosti",
    body: "Či vo vašom prípade dávajú zmysel a ako ich vyhodnotiť racionálne.",
  },
  {
    icon: HandCoins,
    title: "Renta z majetku",
    body: "Ako raz čerpať majetok cez portfólio, dividendy alebo nehnuteľnosti.",
  },
];

const TémyTabsSection = () => {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Icon = tab.icon;

  return (
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

        <AnimatedSection>
          <div className="mx-auto max-w-5xl">
            {/* ── Horizontal tab bar (mobile + desktop top) ── */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-8 scrollbar-hide lg:hidden">
              {TABS.map((t, i) => {
                const TIcon = t.icon;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border font-sans text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                      active === i
                        ? "bg-primary border-primary text-white shadow-md"
                        : "bg-white/70 border-border/60 text-foreground/65 hover:border-primary/50 hover:text-primary"
                    )}
                  >
                    <TIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                    {t.title}
                  </button>
                );
              })}
            </div>

            {/* ── Desktop: vertical tabs left + content right ── */}
            <div className="hidden lg:flex gap-8 items-stretch">
              {/* Tab list */}
              <div className="flex flex-col gap-1.5 w-[280px] shrink-0">
                {TABS.map((t, i) => {
                  const TIcon = t.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl border font-sans font-semibold text-[0.9375rem] transition-all duration-200",
                        active === i
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                          : "bg-white/60 border-border/50 text-foreground/65 hover:bg-white hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      <TIcon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-colors",
                          active === i ? "text-white" : "text-primary/70 group-hover:text-primary"
                        )}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      {t.title}
                    </button>
                  );
                })}
              </div>

              {/* Content panel */}
              <div className="flex-1 bg-white rounded-2xl border border-border/50 shadow-sm p-10 flex flex-col justify-center min-h-[340px] transition-all duration-300">
                <ContentPanel icon={Icon} title={tab.title} body={tab.body} />
              </div>
            </div>

            {/* ── Mobile content panel ── */}
            <div className="lg:hidden bg-white rounded-2xl border border-border/50 shadow-sm p-8">
              <ContentPanel icon={Icon} title={tab.title} body={tab.body} />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

function ContentPanel({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div key={title} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
        <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="font-sans text-[1.375rem] md:text-2xl font-bold text-foreground mb-4 leading-snug">
        {title}
      </h3>
      <p className="font-sans text-body text-muted-foreground leading-relaxed">
        {body}
      </p>
    </div>
  );
}

export default TémyTabsSection;

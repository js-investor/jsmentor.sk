import { useLayoutEffect } from "react";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import "./investicna-calculator.css";
import { mountInvesticnaCalculator } from "./investicnaMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const InvesticnaCalculator = () => {
  useLayoutEffect(() => mountInvesticnaCalculator(), []);

  return (
    <div id="inv-calc-root" className="w-full py-10 md:py-12 px-4 sm:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="inv-btn-row inv-no-export rounded-2xl border border-border/60">
          <button type="button" className="inv-btn-compare" id="inv-btn-compare" onClick={() => window.invOpenComparison?.()}>
            <CompareIcon />
            Porovnať
          </button>
        </div>

        <div className="inv-variant-row inv-no-export rounded-b-xl border border-t-0 border-border/60 -mt-px sm:border sm:rounded-xl sm:mt-4 sm:border-border/60">
          <div id="inv-variant-tabs" className="inv-variant-tabs" />
          <button
            type="button"
            id="inv-add-variant"
            className="ml-add-variant"
            title="Pridať variantu"
            aria-label="Pridať variantu"
            onClick={() => window.invAddVariant?.()}
          >
            +
          </button>
        </div>

        <div className="my-10 text-center max-w-2xl mx-auto">
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] mb-4 inv-heading-serif text-foreground leading-tight font-normal">
            Investičná kalkulačka
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Simulujte silu zloženého úročenia a sledujte rast vášho majetku v čase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card p-6 md:p-6 rounded-xl inv-card-shadow border border-border">
              <h2 className="headline-serif mb-6 border-b border-cream pb-4">
                Parametre investície
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  Počiatočný vklad
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="inv-initial"
                    defaultValue={5000}
                    step={100}
                    className="inv-input-field p-3 rounded-md bg-cream text-lg font-medium pr-8"
                  />
                  <span className="absolute right-4 top-3.5 text-muted-foreground">€</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  Pravidelný mesačný vklad
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="inv-monthly"
                    defaultValue={200}
                    step={10}
                    className="inv-input-field p-3 rounded-md bg-cream text-lg font-medium pr-8"
                  />
                  <span className="absolute right-4 top-3.5 text-muted-foreground">€</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Doba investovania</label>
                  <span id="inv-durationVal" className="text-sm font-bold text-foreground">
                    20 rokov
                  </span>
                </div>
                <input type="range" id="inv-duration" min={1} max={50} defaultValue={20} />
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-2 items-center">
                  <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Očakávaný ročný výnos</label>
                  <div className="flex items-center border-b border-border focus-within:border-primary transition-colors pb-0.5">
                    <input
                      type="number"
                      id="inv-rate"
                      defaultValue={8}
                      step={0.1}
                      min={0}
                      max={100}
                      className="w-16 text-right font-bold bg-transparent border-none focus:ring-0 focus:outline-none p-0 text-lg appearance-none m-0"
                    />
                    <span className="text-lg font-bold ml-1">%</span>
                  </div>
                </div>
                <input type="range" id="inv-rate-slider" min={1} max={15} step={0.1} defaultValue={8} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Konzervatívny (3%)</span>
                  <span>Dynamický (8%+)</span>
                </div>
              </div>

              <div className="border-t border-cream pt-4">
                <div id="inv-advanced-toggle" className="flex justify-between items-center font-medium text-foreground">
                  <span className="text-sm uppercase tracking-wide">Inflácia a poplatky</span>
                  <span id="inv-arrow-icon" className="transition-transform duration-300 text-muted-foreground inline-block">
                    ▼
                  </span>
                </div>
                <div id="inv-advanced-content" className="mt-4 space-y-4" style={{ display: "none" }}>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Odhadovaná inflácia (%)</label>
                    <input type="number" id="inv-inflation" defaultValue={2} step={0.1} className="inv-input-field p-2 rounded-md text-sm" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Prepočíta výslednú sumu na dnešnú hodnotu peňazí.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary text-primary-foreground p-6 rounded-xl inv-card-shadow flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                <div className="relative z-10">
                  <h3 className="text-cream text-sm uppercase tracking-widest font-medium mb-1 opacity-95">Hodnota portfólia</h3>
                  <p className="text-xs text-white/80 mb-4">Celková predpokladaná suma na konci</p>
                  <div className="text-3xl md:text-4xl inv-heading-serif font-normal" id="inv-finalValue">
                    0 €
                  </div>
                </div>
                <img
                  src={brandPattern}
                  alt=""
                  aria-hidden
                  className="absolute -right-8 -bottom-10 w-[min(55%,200px)] max-h-[160px] object-contain object-right-bottom opacity-[0.35] pointer-events-none select-none"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(97%) sepia(54%) saturate(1200%) hue-rotate(80deg) brightness(110%) contrast(85%)",
                    mixBlendMode: "soft-light",
                  }}
                />
              </div>

              <div className="bg-[#FFF9F5] p-6 rounded-xl inv-card-shadow flex flex-col justify-between border border-border min-h-[160px] relative overflow-hidden">
                <div>
                  <h3 className="text-primary text-sm uppercase tracking-widest font-medium mb-1">Čistý výnos</h3>
                  <p className="text-xs text-muted-foreground mb-4">Iba úroky a zhodnotenie</p>
                  <div className="text-3xl md:text-4xl inv-heading-serif text-foreground font-normal" id="inv-totalInterest">
                    0 €
                  </div>
                </div>
                <div className="mt-2 text-sm text-foreground">
                  Zložené úročenie vám zarobilo <span id="inv-interestPercent" className="font-bold">0%</span> zo sumy.
                </div>
                <img
                  src={brandPattern}
                  alt=""
                  aria-hidden
                  className="absolute -right-8 -bottom-10 w-[min(55%,200px)] max-h-[160px] object-contain object-right-bottom opacity-[0.10] pointer-events-none select-none"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(96%) sepia(45%) saturate(800%) hue-rotate(80deg) brightness(114%) contrast(84%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl inv-card-shadow border border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-xl inv-heading-serif text-foreground font-normal">Vývoj v čase</h3>
                <div className="flex gap-4 mt-2 sm:mt-0 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-border inline-block" aria-hidden /> Vklady
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#1a4033] inline-block" aria-hidden /> Zhodnotenie
                  </div>
                </div>
              </div>

              <div className="relative h-72 w-full">
                <canvas id="inv-chart" />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-cream pt-4">
                <div>
                  <span className="block text-xs text-muted-foreground uppercase">Celkový vklad</span>
                  <span className="block text-lg inv-heading-serif font-normal text-foreground mt-1" id="inv-totalInvested">
                    0 €
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase">Reálna hodnota</span>
                  <span className="block text-lg inv-heading-serif font-normal text-foreground mt-1" id="inv-realValue">
                    0 €
                  </span>
                  <span className="text-[10px] text-muted-foreground">Očistené o infláciu</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase">Návratnosť</span>
                  <span className="block text-lg inv-heading-serif font-normal text-foreground mt-1" id="inv-roi">
                    0x
                  </span>
                  <span className="text-[10px] text-muted-foreground">Násobok vkladu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="inv-comparison-modal" className="inv-modal-overlay">
          <div className="inv-modal-box">
            <div className="inv-modal-header">
              <div>
                <h3 className="text-xl inv-heading-serif text-foreground m-0 font-normal">Porovnanie variantov</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-0">Prehľad vstupov a výsledkov investičných scenárov.</p>
              </div>
              <button type="button" className="inv-btn-email shrink-0" onClick={() => window.invCloseComparison?.()}>
                Zavrieť
              </button>
            </div>
            <div className="inv-modal-body">
              <table className="inv-compare-table" id="inv-compare-table" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvesticnaCalculator;

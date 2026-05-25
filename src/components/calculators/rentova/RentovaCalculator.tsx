import { useLayoutEffect } from "react";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import "./rentova-calculator.css";
import { mountRentovaCalculator } from "./rentovaMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const RentovaCalculator = () => {
  useLayoutEffect(() => mountRentovaCalculator(), []);

  return (
    <div id="rentova-calc-root" className="py-12 px-4 sm:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mylife-btn-row ml-no-export">
          <button type="button" id="ml-btn-compare" className="mylife-btn-compare" onClick={() => window.mlOpenComparison?.()}>
            <CompareIcon /> Porovnať
          </button>
        </div>

        <div className="ml-variant-row ml-no-export">
          <div id="ml-variant-tabs" className="ml-variant-tabs" />
          <button type="button" id="ml-add-variant" className="ml-add-variant" onClick={() => window.mlAddVariant?.()}>
            +
          </button>
        </div>

        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-4 font-serif text-foreground leading-tight">Rentová kalkulačka</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Zistite, aký kapitál potrebujete na dosiahnutie vašej vysnívanej renty.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 md:p-6 rounded-xl border border-border">
              <h2 className="headline-serif mb-6 border-b border-cream pb-4">Vaše parametre</h2>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Súčasný vek</label>
                  <input type="number" id="ml-currentAge" defaultValue={35} className="input-field p-3 rounded text-lg font-medium" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Vek odchodu</label>
                  <input type="number" id="ml-retirementAge" defaultValue={65} className="input-field p-3 rounded text-lg font-medium" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Cieľová mesačná renta</label>
                <div className="relative">
                  <input type="number" id="ml-desiredRent" defaultValue={1500} step={50} className="input-field p-3 rounded text-lg font-medium pr-8" />
                  <span className="absolute right-4 top-3.5 text-muted-foreground">€</span>
                </div>
              </div>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Doba poberania</label>
                  <span id="ml-durationVal" className="text-sm font-bold">
                    25 rokov
                  </span>
                </div>
                <input type="range" id="ml-rentDuration" min={5} max={40} defaultValue={25} />
              </div>
              <div className="border-t border-cream pt-4">
                <div id="ml-advanced-toggle" className="flex justify-between items-center font-medium">
                  <span className="text-sm uppercase tracking-wide">Pokročilé nastavenia</span>
                  <span id="ml-arrow-icon">▼</span>
                </div>
                <div id="ml-advanced-content" className="hidden mt-4 space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Očakávaný ročný výnos (%)</label>
                    <input type="number" id="ml-interestRate" defaultValue={7} step={0.1} className="input-field p-2 rounded text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Odhadovaná inflácia (%)</label>
                    <input type="number" id="ml-inflationRate" defaultValue={2.5} step={0.1} className="input-field p-2 rounded text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Súčasné úspory (€)</label>
                    <input type="number" id="ml-currentSavings" defaultValue={0} step={100} className="input-field p-2 rounded text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Mesačná investícia (€)</label>
                    <input type="number" id="ml-monthlyInvestment" defaultValue={200} step={10} className="input-field p-2 rounded text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary text-primary-foreground p-6 rounded-xl relative overflow-hidden min-h-[160px]">
                <h3 className="text-cream text-sm uppercase tracking-widest mb-1">Cieľová suma</h3>
                <p className="text-xs text-white/80 mb-4">Kapitál potrebný pri odchode do dôchodku</p>
                <div className="text-3xl md:text-4xl font-serif" id="ml-requiredCapital">
                  0 €
                </div>
                <img
                  src={brandPattern}
                  alt=""
                  aria-hidden
                  className="absolute -right-10 -bottom-12 w-[min(60%,240px)] max-h-[190px] object-contain object-right-bottom opacity-[0.35] pointer-events-none select-none"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(97%) sepia(54%) saturate(1200%) hue-rotate(80deg) brightness(110%) contrast(85%)",
                    mixBlendMode: "soft-light",
                  }}
                />
              </div>
              <div className="bg-[#FFF9F5] p-6 rounded-xl border border-border min-h-[160px] relative overflow-hidden">
                <h3 className="text-muted-foreground text-sm uppercase tracking-widest mb-1 relative z-10">Chýbajúca investícia</h3>
                <div className="text-3xl md:text-4xl font-serif text-foreground relative z-10" id="ml-monthlyGap">
                  0 €
                </div>
                <div className="mt-2 text-sm text-foreground relative z-10">
                  Pri <span id="ml-roiDisplay">7%</span> zhodnotení.
                </div>
                <img
                  src={brandPattern}
                  alt=""
                  aria-hidden
                  className="absolute -right-10 -bottom-12 w-[min(60%,240px)] max-h-[190px] object-contain object-right-bottom opacity-[0.10] pointer-events-none select-none"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(96%) sepia(45%) saturate(800%) hue-rotate(80deg) brightness(114%) contrast(84%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-xl font-serif text-foreground">Vývoj majetku</h3>
              </div>
              <div className="relative h-64 w-full">
                <canvas id="ml-rentChart" />
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-cream pt-4">
                <div>
                  <span className="block text-xs text-muted-foreground uppercase">Inflačná renta</span>
                  <span className="block text-lg font-serif" id="ml-inflatedRentVal">
                    0 €
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase">Váš kapitál</span>
                  <span className="block text-lg font-serif" id="ml-projectedCapital">
                    0 €
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase">Stav cieľa</span>
                  <span className="block text-lg font-serif" id="ml-goalStatus">
                    0%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="ml-compare-modal" className="ml-modal-overlay">
        <div className="ml-modal-box">
          <div className="ml-modal-header">
            <div>
              <h3 className="text-xl font-serif text-foreground">Porovnanie variantov</h3>
              <p className="text-sm text-muted-foreground">Rýchly prehľad vstupov a výsledkov pre všetky scenáre.</p>
            </div>
            <button type="button" className="mylife-btn-email" onClick={() => window.mlCloseComparison?.()}>
              Zavrieť
            </button>
          </div>
          <div className="ml-modal-body">
            <table className="ml-compare-table" id="ml-compare-table" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentovaCalculator;


import { useLayoutEffect } from "react";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import "./podla-prijmu.css";
import { mountPodlaPrijmuCalculator } from "./podla-prijmuMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const PodlaPrijmuCalculator = () => {
  useLayoutEffect(() => mountPodlaPrijmuCalculator(), []);

  return (
    <div id="dti-calc-root" className="py-12 px-4 sm:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mylife-btn-row ml-no-export">
          <button type="button" id="dti-btn-compare" className="mylife-btn-compare" onClick={() => window.dtiOpenComparison?.()}>
            <CompareIcon /> Porovnať
          </button>
        </div>

        <div className="ml-variant-row ml-no-export">
          <div id="dti-variant-tabs" className="ml-variant-tabs" />
          <button type="button" id="dti-add-variant" className="ml-add-variant" onClick={() => window.dtiAddVariant?.()} title="Pridať variantu">
            +
          </button>
        </div>

        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-4 font-serif text-foreground leading-tight">Úverová kalkulačka (DTI & DSTI)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Zistite svoju maximálnu úverovú kapacitu podľa pravidiel NBS.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 md:p-6 rounded-xl border border-border">
              <h2 className="headline-serif mb-6 border-b border-cream pb-4">Vaše financie</h2>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Váš čistý mesačný príjem</label>
                  <div className="relative">
                    <input type="number" id="dti-income" defaultValue={1500} step={50} className="input-field p-3 rounded text-lg font-medium pr-8" />
                    <span className="absolute right-4 top-3.5 text-muted-foreground">€</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <label className="text-sm font-bold">Spolužiadateľ / Partner</label>
                  <input type="checkbox" id="dti-partner-toggle" className="w-5 h-5 accent-black" />
                </div>
                <div id="dti-partner-input-group" className="hidden">
                  <label className="block text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Príjem partnera</label>
                  <div className="relative">
                    <input type="number" id="dti-partner-income" defaultValue={0} step={50} className="input-field p-3 rounded text-lg font-medium pr-8" />
                    <span className="absolute right-4 top-3.5 text-muted-foreground">€</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 border-t border-cream pt-6 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Mesačné splátky úverov</label>
                  <input type="number" id="dti-monthly-debt" defaultValue={0} step={10} className="input-field p-2 rounded text-sm bg-cream" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Celkový zostatok dlhov</label>
                  <input type="number" id="dti-total-debt" defaultValue={0} step={1000} className="input-field p-2 rounded text-sm bg-cream" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Limity na kreditných kartách</label>
                  <input type="number" id="dti-credit-limits" defaultValue={0} step={100} className="input-field p-2 rounded text-sm bg-cream" />
                </div>
              </div>

              <div className="border-t border-cream pt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Úrok (%)</label>
                    <input type="number" id="dti-rate" defaultValue={4.2} step={0.1} className="input-field p-2 rounded text-sm text-center font-bold" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Splatnosť (roky)</label>
                    <input type="number" id="dti-years" defaultValue={30} max={40} className="input-field p-2 rounded text-sm text-center font-bold" />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-secondary p-3 rounded-lg border border-border">
                  <div>
                    <span className="text-sm font-bold block">Stress Test (+2%)</span>
                  </div>
                  <input type="checkbox" id="dti-stress-toggle" className="w-5 h-5 accent-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-primary text-primary-foreground p-6 md:p-6 rounded-xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-cream text-sm uppercase tracking-widest font-medium mb-2">Váš úverový potenciál</h3>
                  <div className="text-4xl md:text-5xl font-serif leading-none" id="dti-max-mortgage">
                    0 €
                  </div>
                  <div className="mt-2 text-xs text-white/80" id="dti-limit-reason" />
                </div>
                <div className="border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase text-white/80">Max. mesačná splátka</span>
                    <span className="font-serif text-xl" id="dti-max-payment">
                      0 €
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase text-white/80">Povinná rezerva (40%)</span>
                    <span className="font-serif text-xl text-amber-200" id="dti-reserve">
                      0 €
                    </span>
                  </div>
                </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-border flex flex-col items-center">
                <h4 className="font-serif text-lg mb-1">DTI Indikátor</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">Celkový dlh vs. ročný príjem</p>
                <div className="relative w-48 h-24">
                  <canvas id="chart-dti" />
                  <div className="absolute inset-0 flex items-end justify-center pb-0">
                    <span className="text-2xl font-serif" id="dti-value-text">
                      0x
                    </span>
                  </div>
                </div>
                <p className="text-xs text-center mt-4" id="dti-status-msg">
                  V bezpečnej zóne
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-border flex flex-col items-center">
                <h4 className="font-serif text-lg mb-1">DSTI Indikátor</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">Splátky vs. mesačný príjem</p>
                <div className="relative w-48 h-24">
                  <canvas id="chart-dsti" />
                  <div className="absolute inset-0 flex items-end justify-center pb-0">
                    <span className="text-2xl font-serif" id="dsti-value-text">
                      0%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-center mt-4" id="dsti-status-msg">
                  V bezpečnej zóne
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="text-lg font-serif mb-4">Rozloženie vášho príjmu</h3>
              <div className="relative h-12 w-full bg-cream rounded-full overflow-hidden flex text-xs font-bold text-white uppercase tracking-wider leading-none">
                <div id="bar-debts" className="h-full bg-primary flex items-center justify-center transition-all duration-500" style={{ width: "20%" }}>
                  Dlhy
                </div>
                <div id="bar-reserve" className="h-full bg-[#d5c098] flex items-center justify-center transition-all duration-500" style={{ width: "40%" }}>
                  Rezerva
                </div>
                <div id="bar-free" className="h-full bg-emerald-500 flex items-center justify-center transition-all duration-500" style={{ width: "40%" }}>
                  Voľné
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="dti-compare-modal" className="ml-modal-overlay">
        <div className="ml-modal-box">
          <div className="ml-modal-header">
            <div>
              <h3 className="text-xl font-serif">Porovnanie variantov</h3>
              <p className="text-sm text-muted-foreground">Prehľad vstupov a výsledkov DTI / DSTI.</p>
            </div>
            <button type="button" className="mylife-btn-email" onClick={() => window.dtiCloseComparison?.()}>
              Zavrieť
            </button>
          </div>
          <div className="ml-modal-body">
            <table className="ml-compare-table" id="dti-compare-table" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodlaPrijmuCalculator;


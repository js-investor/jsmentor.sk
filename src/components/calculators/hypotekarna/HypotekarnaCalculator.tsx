import { useLayoutEffect } from "react";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import "../shared/calculator-toolbar.css";
import "./hypotekarna-calculator.css";
import { mountHypotekarnaCalculator } from "./hypotekarnaMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const HypotekarnaCalculator = () => {
  useLayoutEffect(() => mountHypotekarnaCalculator(), []);

  return (
    <div id="hypo-calc-root" className="w-full font-sans text-foreground">
      <div className="calc-variant-toolbar rounded-2xl border border-border/60 overflow-hidden mx-[-0.125rem] sm:mx-0">
        <div className="calc-variant-toolbar-variants" id="hypo-variant-tabs" />
        <button
          type="button"
          className="calc-btn-compare"
          onClick={() => window.mlOpenComparison?.()}
        >
          <CompareIcon />
          Porovnať
        </button>
      </div>

      <div id="hypo-compare-wrapper" className="calc-body-shell">
        <div className="hypo-print-container max-w-full mx-0">
          <div className="mb-10 text-center max-w-[700px] mx-auto">
            <h2 className="headline-serif mb-3">
              Hypotéka vs. investovanie
            </h2>
            <div className="w-20 h-[3px] bg-primary/40 mx-auto mb-5 rounded-full opacity-80" />
            <p className="text-[1.125rem] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
              Strategická analýza vašich financií. Oplatí sa vám dlh splatiť skôr, alebo peniaze zhodnocovať?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div
              id="hypo-mortgage-panel"
              className="bg-card p-6 md:p-7 rounded-xl border border-border relative overflow-hidden shadow-[0_10px_30px_-10px_rgba(41,106,82,0.12)] transition-opacity duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="hypo-heading text-xl md:text-2xl m-0">Hypotéka</h3>
                  <label className="ml-toggle" title="Zapnúť/Vypnúť hypotéku">
                    <input
                      type="checkbox"
                      id="hypo-mortgage-toggle"
                      defaultChecked
                      onChange={(e) => window.mlToggleMortgage?.(e.target.checked)}
                    />
                    <span className="ml-toggle-slider" />
                  </label>
                </div>
                <span className="bg-muted text-foreground text-[13px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Dlh
                </span>
              </div>
              <div id="hypo-mortgage-fields" className="flex flex-1 flex-col gap-5">
                <div>
                  <label className="block text-[15px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Výška úveru / zostatok
                  </label>
                  <div className="relative">
                    <input type="number" id="c-mortgage-amount" defaultValue={150000} step={1000} className="ml-input pr-8" />
                    <span className="absolute right-3.5 top-3.5 text-muted-foreground">€</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[15px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Doba splácania
                    </label>
                    <div className="relative">
                      <input type="number" id="c-mortgage-years" defaultValue={20} className="ml-input pr-14" />
                      <span className="absolute right-2.5 top-3.5 text-muted-foreground text-[15px]">rokov</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[15px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">Úrok</label>
                    <div className="relative">
                      <input type="number" id="c-mortgage-rate" defaultValue={4.9} step={0.1} className="ml-input pr-9" />
                      <span className="absolute right-2.5 top-3.5 text-muted-foreground text-[15px]">%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto bg-cream p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                      <span className="block text-[15px] uppercase text-muted-foreground font-bold tracking-wide mb-1">
                        Mesačná splátka
                      </span>
                      <span className="hypo-heading text-xl md:text-2xl text-foreground" id="c-monthly-payment">
                        0 €
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[1rem] text-muted-foreground">Celkovo zaplatíte</span>
                      <span className="text-[1.0625rem] font-bold text-foreground" id="c-total-paid">
                        0 €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="hypo-invest-panel"
              className="bg-card p-6 md:p-7 rounded-xl border border-border relative overflow-hidden shadow-[0_10px_30px_-10px_rgba(41,106,82,0.12)] transition-opacity duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="hypo-heading text-xl md:text-2xl m-0">Investícia</h3>
                  <label className="ml-toggle" title="Zapnúť/Vypnúť investíciu">
                    <input
                      type="checkbox"
                      id="hypo-invest-toggle"
                      defaultChecked
                      onChange={(e) => window.mlToggleInvest?.(e.target.checked)}
                    />
                    <span className="ml-toggle-slider" />
                  </label>
                </div>
                <span className="bg-cream text-primary text-[13px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Majetok
                </span>
              </div>
              <div id="hypo-invest-fields" className="flex flex-1 flex-col gap-5">
                <div>
                  <label className="block text-[15px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Jednorazový vklad
                  </label>
                  <div className="relative">
                    <input type="number" id="c-invest-initial" defaultValue={5000} step={500} className="ml-input pr-8" />
                    <span className="absolute right-3.5 top-3.5 text-muted-foreground">€</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[15px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Mesačná investícia
                  </label>
                  <div className="relative">
                    <input type="number" id="c-invest-monthly" defaultValue={250} step={50} className="ml-input pr-8" />
                    <span className="absolute right-3.5 top-3.5 text-muted-foreground">€</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[15px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Zhodnotenie p.a.
                  </label>
                  <div className="relative">
                    <input type="number" id="c-invest-rate" defaultValue={6.0} step={0.5} className="ml-input pr-9" />
                    <span className="absolute right-2.5 top-3.5 text-muted-foreground text-[15px]">%</span>
                  </div>
                </div>
                <div className="mt-auto bg-cream p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                      <span className="block text-[15px] uppercase text-muted-foreground font-bold tracking-wide mb-1">
                        Hodnota na konci
                      </span>
                      <span className="hypo-heading text-xl md:text-2xl text-foreground" id="c-invest-final">
                        0 €
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[1rem] text-muted-foreground">Čistý zisk</span>
                      <span className="text-[1.0625rem] font-bold text-emerald-600" id="c-invest-profit">
                        0 €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-5 md:p-7 rounded-xl border border-border mb-7 shadow-[0_10px_30px_-10px_rgba(41,106,82,0.1)]">
            <div
              id="hypo-evt-accordion-toggle"
              className="flex justify-between items-center hypo-heading text-[1.05rem] text-foreground cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <span>Udalosti na časovej osi</span>
                <span
                  id="hypo-event-count-badge"
                  style={{ display: "none" }}
                  className="bg-primary text-primary-foreground text-[10px] font-sans font-bold px-2 py-0.5 rounded-full"
                >
                  0
                </span>
              </div>
              <span id="hypo-evt-accordion-icon" className="text-primary transition-transform duration-300 flex">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            <div id="hypo-evt-accordion-content" className="mt-5 pt-5 border-t border-cream" style={{ display: "none" }}>
              <div id="hypo-events-list" className="flex flex-col gap-2.5 mb-5" />
              <div className="bg-cream p-4 rounded-lg border border-dashed border-border">
                <h4 className="text-[15px] font-bold uppercase tracking-wider text-muted-foreground m-0 mb-3.5">Pridať novú udalosť</h4>
                <div className="grid grid-cols-1 md:grid-cols-10 gap-3 items-end">
                  <div className="md:col-span-4">
                    <label className="text-[15px] uppercase text-muted-foreground font-bold block mb-1">Typ</label>
                    <select
                      id="evt-type"
                      className="w-full px-2.5 py-2 text-[15px] border border-border rounded-md bg-card h-10 text-foreground font-sans"
                    >
                      <option value="hypo_extra">Hypotéka: Mimoriadna splátka</option>
                      <option value="hypo_rate">Hypotéka: Zmena úroku</option>
                      <option value="invest_deposit">Investícia: Mimoriadny vklad</option>
                      <option value="invest_withdraw">Investícia: Výber</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[15px] uppercase text-muted-foreground font-bold block mb-1">Rok</label>
                    <input
                      type="number"
                      id="evt-year"
                      min={1}
                      max={40}
                      defaultValue={5}
                      className="w-full px-2.5 py-2 text-[15px] border border-border rounded-md bg-card h-10 text-foreground font-sans"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[15px] uppercase text-muted-foreground font-bold block mb-1">Hodnota</label>
                    <input
                      type="number"
                      id="evt-value"
                      min={0}
                      defaultValue={1000}
                      className="w-full px-2.5 py-2 text-[15px] border border-border rounded-md bg-card h-10 text-foreground font-sans"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={() => window.addEvent?.()}
                      className="w-full bg-primary text-primary-foreground font-medium text-[15px] rounded-md h-10 border-none cursor-pointer font-sans hover:brightness-95 transition-[filter]"
                    >
                      + Pridať
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="hypo-chart-card"
            className="bg-card p-6 md:p-7 rounded-xl border border-border mb-7 shadow-[0_10px_30px_-10px_rgba(41,106,82,0.1)]"
          >
            <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
              <h3 className="hypo-heading text-xl md:text-2xl m-0">Vývoj v čase</h3>
              <div className="flex gap-3.5 text-[15px] font-medium" id="ml-chart-legend">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1a4033] inline-block" aria-hidden /> Zostatok hypotéky
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" aria-hidden /> Hodnota investície
                </div>
              </div>
            </div>
            <div className="relative h-[300px] w-full">
              <canvas id="compareChart" />
            </div>
            <div
              id="hypo-crossover-info"
              style={{ display: "none" }}
              className="mt-5 text-center text-[15px] text-muted-foreground bg-cream p-3.5 rounded-lg border border-border"
            >
              <span className="hypo-heading text-[1.25rem] text-foreground block mb-1">Bod zlomu dosiahnutý</span>
              <span className="text-[1rem]">Investícia presiahne zostatok hypotéky v <span id="crossover-year" className="font-bold text-foreground" />.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-foreground p-7 rounded-xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] min-h-[150px] flex flex-col justify-between border border-border">
              <div className="relative z-[1]">
                <p className="text-[1rem] text-muted-foreground uppercase tracking-wide font-bold m-0 mb-2 opacity-95">
                  Celkové náklady úveru
                </p>
                <div className="hypo-heading text-[2.25rem] md:text-[2.75rem] leading-none text-foreground" id="res-mortgage-total">
                  0 €
                </div>
                <p className="text-[1.0625rem] text-muted-foreground mt-1.5 mb-0">Istina + úroky</p>
              </div>
            </div>
            <div className="bg-[#FFF9F5] text-foreground p-7 rounded-xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] min-h-[150px] flex flex-col justify-between border border-border">
              <div className="relative z-[1]">
                <p className="text-[1rem] text-muted-foreground uppercase tracking-wide font-bold m-0 mb-2 opacity-95">
                  Vložené do investície
                </p>
                <div className="hypo-heading text-[2.25rem] md:text-[2.75rem] leading-none text-foreground" id="res-invest-principal">
                  0 €
                </div>
                <p className="text-[1.0625rem] text-muted-foreground mt-1.5 mb-0">Vaše vklady</p>
              </div>
              <img
                src={brandPattern}
                alt=""
                aria-hidden
                className="absolute -right-6 -bottom-8 w-[min(72%,210px)] max-h-[175px] object-contain object-right-bottom opacity-[0.10] pointer-events-none select-none"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(96%) sepia(45%) saturate(800%) hue-rotate(80deg) brightness(114%) contrast(84%)",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
            <div className="bg-primary text-primary-foreground p-7 rounded-xl relative overflow-hidden shadow-[0_20px_40px_rgba(41,106,82,0.35)] min-h-[150px] flex flex-col justify-between">
              <div className="relative z-[1]">
                <p className="text-[0.875rem] text-cream uppercase tracking-wide font-bold m-0 mb-2 opacity-95">
                  Čistý majetok na konci
                </p>
                <div className="hypo-heading text-[2.25rem] md:text-[2.75rem] leading-none text-white" id="res-net-worth">
                  0 €
                </div>
                <p className="text-[1.0625rem] text-white/80 mt-1.5 mb-0">Investícia − zostatok hypotéky</p>
              </div>
              <img
                src={brandPattern}
                alt=""
                aria-hidden
                className="absolute -right-6 -bottom-8 w-[min(72%,210px)] max-h-[175px] object-contain object-right-bottom opacity-[0.35] pointer-events-none select-none"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(97%) sepia(54%) saturate(1200%) hue-rotate(80deg) brightness(110%) contrast(85%)",
                  mixBlendMode: "soft-light",
                }}
              />
            </div>
          </div>

          <div className="mt-10 text-center border-t border-border pt-5">
            <p className="text-[1rem] text-muted-foreground m-0">
              Vygenerované dňa: <span id="hypo-current-date" />
              <span className="text-foreground font-medium"> — JS Mentor</span>
            </p>
          </div>
        </div>
      </div>


      <div id="hypo-comparison-modal">
        <div className="ml-modal-box">
          <div className="ml-modal-header">
            <h3 className="hypo-heading text-xl text-foreground m-0">Porovnanie variantov</h3>
            <button
              type="button"
              className="bg-transparent border-none cursor-pointer text-muted-foreground p-1 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
              onClick={() => window.mlCloseComparison?.()}
              aria-label="Zavrieť"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="ml-slider-wrap">
            <div className="flex items-center gap-3">
              <span className="text-[15px] text-muted-foreground font-semibold whitespace-nowrap">
                Rok: <span id="ml-slider-label" className="text-foreground font-bold">0</span>
              </span>
              <input
                type="range"
                id="ml-compare-slider"
                min={0}
                max={20}
                defaultValue={0}
                className="flex-1 accent-[hsl(var(--primary))]"
                onInput={(e) => window.mlUpdateComparison?.(e.currentTarget.value)}
              />
              <span className="text-[15px] text-muted-foreground font-semibold" id="ml-slider-max">
                20
              </span>
            </div>
          </div>
          <div className="ml-modal-body">
            <table className="ml-compare-table" id="ml-compare-table" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypotekarnaCalculator;

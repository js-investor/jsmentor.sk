import { useLayoutEffect } from "react";
import "../shared/calculator-toolbar.css";
import "../shared/calc-ui.css";
import "./rentova-calculator.css";
import { initCalcEcho, initCalcHeroPulse, initCalcSliders } from "../shared/calcUi";
import { mountRentovaCalculator } from "./rentovaMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

/** −/+ stepper pre číselný vstup; zmenu hodnoty vždy ohlási input eventom pre mount. */
const Stepper = ({ inputId, step, unit }: { inputId: string; step: number; unit: string }) => {
  const nudge = (dir: "up" | "down") => {
    const el = document.getElementById(inputId) as HTMLInputElement | null;
    if (!el) return;
    if (dir === "up") el.stepUp();
    else el.stepDown();
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  return (
    <span className="calc-stepper">
      <span className="calc-stepper-unit" aria-hidden>{unit}</span>
      <button type="button" aria-label={`Znížiť o ${step} ${unit}`} onClick={() => nudge("down")}>−</button>
      <button type="button" aria-label={`Zvýšiť o ${step} ${unit}`} onClick={() => nudge("up")}>+</button>
    </span>
  );
};

const RentovaCalculator = () => {
  useLayoutEffect(() => {
    const unmountCalc = mountRentovaCalculator();
    const unmountSliders = initCalcSliders("rentova-calc-root");
    const unmountEcho = initCalcEcho("rentova-calc-root");
    const unmountPulse = initCalcHeroPulse("ml-requiredCapital");
    return () => {
      unmountPulse();
      unmountEcho();
      unmountSliders();
      unmountCalc?.();
    };
  }, []);

  return (
    <div id="rentova-calc-root" className="calc-ui w-full font-sans text-foreground">
      <div className="calc-variant-toolbar ml-no-export rounded-2xl border border-border/60 mx-[-0.125rem] sm:mx-0">
        <div className="calc-variant-toolbar-variants">
          <div id="ml-variant-tabs" className="calc-variant-tabs" />
          <button
            type="button"
            id="ml-add-variant"
            className="ml-add-variant"
            title="Pridať variant"
            aria-label="Pridať variant"
            onClick={() => window.mlAddVariant?.()}
          >
            +
          </button>
        </div>
        <button type="button" id="ml-btn-compare" className="calc-btn-compare" onClick={() => window.mlOpenComparison?.()}>
          <CompareIcon />
          Porovnať
        </button>
      </div>

      <div className="calc-body-shell">
        <div className="calc-page">
          <header className="calc-header" style={{ marginBottom: "1.5rem" }}>
            <span className="calc-eyebrow">Rentová kalkulačka</span>
          </header>

          {/* Výsledok — hviezda stránky */}
          <section className="calc-hero-xl" aria-label="Výsledok">
            <p className="calc-hero-xl-label">
              Na mesačnú rentu <span data-echo-of="ml-desiredRent" data-echo-suffix=" €">1500 €</span> potrebuješ
            </p>
            <p className="calc-hero-xl-value" id="ml-requiredCapital">0 €</p>
            <div className="calc-hero-xl-chips">
              <span className="calc-verdict-chip">
                Mesačne treba investovať&nbsp;<strong id="ml-monthlyGap">0 €</strong>
              </span>
              <span className="calc-verdict-chip">
                Pri ročnom výnose&nbsp;<strong id="ml-roiDisplay">7%</strong>
              </span>
            </div>
          </section>

          {/* Inline štatistiky */}
          <div className="calc-stats-inline" role="group" aria-label="Súhrn">
            <div>
              <p className="calc-stat-label">Renta po inflácii</p>
              <p className="calc-stat-value" id="ml-inflatedRentVal">0 €</p>
            </div>
            <div>
              <p className="calc-stat-label">Projektovaný kapitál</p>
              <p className="calc-stat-value" id="ml-projectedCapital">0 €</p>
            </div>
            <div className="ml-stat-goal">
              <p className="calc-stat-label">Stav cieľa</p>
              <p className="calc-stat-value" id="ml-goalStatus">0%</p>
            </div>
          </div>

          {/* Vstupný dock */}
          <section className="calc-dock" aria-label="Tvoje parametre">
            <div className="calc-dock-grid">
              <div className="calc-dock-item">
                <label className="calc-label" htmlFor="ml-currentAge">Súčasný vek</label>
                <input type="number" id="ml-currentAge" defaultValue={35} min={0} className="calc-input" />
              </div>

              <div className="calc-dock-item">
                <label className="calc-label" htmlFor="ml-retirementAge">Vek odchodu</label>
                <input type="number" id="ml-retirementAge" defaultValue={65} min={1} className="calc-input" />
              </div>

              <div className="calc-dock-item">
                <label className="calc-label" htmlFor="ml-desiredRent">Cieľová mesačná renta</label>
                <div className="calc-input-wrap calc-input-wrap--stepper">
                  <input type="number" id="ml-desiredRent" defaultValue={1500} step={50} min={0} className="calc-input" />
                  <Stepper inputId="ml-desiredRent" step={50} unit="€" />
                </div>
              </div>

              <div className="calc-dock-item">
                <div className="calc-label">
                  <label htmlFor="ml-rentDuration">Doba poberania</label>
                  <span id="ml-durationVal" className="calc-label-value" data-echo-of="ml-rentDuration" data-echo-suffix=" rokov">25 rokov</span>
                </div>
                <input type="range" id="ml-rentDuration" className="calc-slider" min={5} max={40} defaultValue={25} />
              </div>
            </div>

            <div className="calc-dock-foot">
              <div
                id="ml-advanced-toggle"
                className="calc-collapse-toggle"
                role="button"
                aria-expanded={false}
                aria-controls="ml-advanced-content"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                  }
                }}
              >
                <span>Pokročilé nastavenia</span>
                <span id="ml-arrow-icon" className="calc-collapse-chevron" aria-hidden>▼</span>
              </div>
              <div id="ml-advanced-content" className="hidden pb-4 pt-1">
                <div className="ml-advanced-grid">
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="ml-interestRate">Očakávaný ročný výnos</label>
                    <div className="calc-input-wrap">
                      <input type="number" id="ml-interestRate" defaultValue={7} step={0.1} className="calc-input calc-input--unit" />
                      <span className="calc-input-unit" aria-hidden>%</span>
                    </div>
                  </div>
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="ml-inflationRate">Odhadovaná inflácia</label>
                    <div className="calc-input-wrap">
                      <input type="number" id="ml-inflationRate" defaultValue={2.5} step={0.1} className="calc-input calc-input--unit" />
                      <span className="calc-input-unit" aria-hidden>%</span>
                    </div>
                  </div>
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="ml-currentSavings">Súčasné úspory</label>
                    <div className="calc-input-wrap">
                      <input type="number" id="ml-currentSavings" defaultValue={0} step={100} min={0} className="calc-input calc-input--unit" />
                      <span className="calc-input-unit" aria-hidden>€</span>
                    </div>
                  </div>
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="ml-monthlyInvestment">Mesačná investícia</label>
                    <div className="calc-input-wrap">
                      <input type="number" id="ml-monthlyInvestment" defaultValue={200} step={10} min={0} className="calc-input calc-input--unit" />
                      <span className="calc-input-unit" aria-hidden>€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Graf */}
          <section className="calc-panel mt-5 md:mt-6" aria-label="Vývoj majetku">
            <div className="calc-chart-head">
              <h2 className="calc-panel-title">Vývoj majetku</h2>
              <div className="calc-legend">
                <span className="calc-legend-item">
                  <span className="calc-legend-dot" style={{ background: "#29614A" }} aria-hidden />
                  Majetok
                </span>
              </div>
            </div>
            <div className="calc-chart-body calc-chart-body--tall">
              <canvas id="ml-rentChart" />
            </div>
          </section>

          <p className="calc-note calc-note--center mt-5 md:mt-6">
            Kalkulačka je orientačná — počíta s konštantným výnosom a infláciou a nezohľadňuje
            dane ani poplatky konkrétnych produktov.
          </p>
        </div>
      </div>

      <div id="ml-compare-modal" className="ml-modal-overlay">
        <div className="ml-modal-box" role="dialog" aria-modal="true" aria-labelledby="ml-modal-title">
          <div className="ml-modal-header">
            <div>
              <h3 id="ml-modal-title" className="text-xl font-serif text-foreground m-0 font-normal">Porovnanie variantov</h3>
              <p className="text-[15px] text-muted-foreground mt-1 mb-0">Prehľad vstupov a výsledkov rentových scenárov.</p>
            </div>
            <button type="button" className="mylife-btn-email shrink-0" onClick={() => window.mlCloseComparison?.()}>
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

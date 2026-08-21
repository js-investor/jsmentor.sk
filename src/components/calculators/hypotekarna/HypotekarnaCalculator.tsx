import { useLayoutEffect } from "react";
import "../shared/calculator-toolbar.css";
import "../shared/calc-ui.css";
import "./hypotekarna-calculator.css";
import { initCalcEcho, initCalcHeroPulse, initCalcSliders } from "../shared/calcUi";
import { mountHypotekarnaCalculator } from "./hypotekarnaMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

const HypotekarnaCalculator = () => {
  useLayoutEffect(() => {
    const unmountCalc = mountHypotekarnaCalculator();
    const unmountSliders = initCalcSliders("hypo-calc-root");
    const unmountEcho = initCalcEcho("hypo-calc-root");
    const unmountPulse = initCalcHeroPulse("res-net-worth");
    return () => {
      unmountPulse();
      unmountEcho();
      unmountSliders();
      unmountCalc?.();
    };
  }, []);

  return (
    <div id="hypo-calc-root" className="calc-ui w-full font-sans text-foreground">
      <div className="calc-variant-toolbar rounded-2xl border border-border/60 mx-[-0.125rem] sm:mx-0">
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
        <div className="calc-page hypo-print-container">
          <header className="calc-header" style={{ marginBottom: "1.5rem" }}>
            <span className="calc-eyebrow">Hypotéka vs. investovanie</span>
          </header>

          {/* Výsledok — hviezda stránky */}
          <section className="calc-hero-xl" aria-label="Výsledok">
            <p className="calc-hero-xl-label">Tvoj čistý majetok na konci obdobia</p>
            <p className="calc-hero-xl-value" id="res-net-worth">0 €</p>
            <div className="calc-hero-xl-chips">
              <span className="calc-verdict-chip">
                Mesačná splátka&nbsp;<strong id="c-monthly-payment">0 €</strong>
              </span>
              <span className="calc-verdict-chip">
                Hodnota investície&nbsp;<strong id="c-invest-final">0 €</strong>
              </span>
            </div>
          </section>

          {/* Inline štatistiky */}
          <div className="calc-stats-inline" role="group" aria-label="Súhrn">
            <div>
              <p className="calc-stat-label">Celkové náklady úveru</p>
              <p className="calc-stat-value" id="res-mortgage-total">0 €</p>
            </div>
            <div>
              <p className="calc-stat-label">Vložené do investície</p>
              <p className="calc-stat-value" id="res-invest-principal">0 €</p>
            </div>
          </div>

          {/* Vstupný dock — dve skupiny */}
          <section className="calc-dock" aria-label="Parametre simulácie">
            <div className="hypo-dock-groups">
              <div className="hypo-dock-group">
                <div className="hypo-panel-head">
                  <div className="hypo-panel-title-group">
                    <h2 className="calc-panel-title">Hypotéka</h2>
                    <label className="ml-toggle" title="Zapnúť/Vypnúť hypotéku">
                      <input
                        type="checkbox"
                        id="hypo-mortgage-toggle"
                        aria-label="Zapnúť/Vypnúť hypotéku"
                        defaultChecked
                        onChange={(e) => window.mlToggleMortgage?.(e.target.checked)}
                      />
                      <span className="ml-toggle-slider" />
                    </label>
                  </div>
                  <span className="hypo-tag">Dlh</span>
                </div>
                <div id="hypo-mortgage-fields">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="calc-dock-item col-span-2">
                      <label className="calc-label" htmlFor="c-mortgage-amount">
                        Výška úveru / zostatok
                      </label>
                      <div className="calc-input-wrap calc-input-wrap--stepper">
                        <input
                          type="number"
                          id="c-mortgage-amount"
                          defaultValue={150000}
                          step={1000}
                          min={0}
                          className="calc-input"
                        />
                        <Stepper inputId="c-mortgage-amount" step={1000} unit="€" />
                      </div>
                    </div>
                    <div className="calc-dock-item">
                      <label className="calc-label" htmlFor="c-mortgage-years">
                        Doba splácania
                      </label>
                      <div className="calc-input-wrap">
                        <input
                          type="number"
                          id="c-mortgage-years"
                          defaultValue={20}
                          min={1}
                          className="calc-input hypo-input--years"
                        />
                        <span className="calc-input-unit" aria-hidden>rokov</span>
                      </div>
                    </div>
                    <div className="calc-dock-item">
                      <label className="calc-label" htmlFor="c-mortgage-rate">
                        Úrok
                      </label>
                      <div className="calc-input-wrap">
                        <input
                          type="number"
                          id="c-mortgage-rate"
                          defaultValue={4.9}
                          step={0.1}
                          min={0}
                          className="calc-input calc-input--unit"
                        />
                        <span className="calc-input-unit" aria-hidden>%</span>
                      </div>
                    </div>
                  </div>
                  <div className="hypo-panel-foot">
                    <span>Celkovo zaplatíš</span>
                    <span className="hypo-panel-foot-value" id="c-total-paid">0 €</span>
                  </div>
                </div>
              </div>

              <div className="hypo-dock-group">
                <div className="hypo-panel-head">
                  <div className="hypo-panel-title-group">
                    <h2 className="calc-panel-title">Investícia</h2>
                    <label className="ml-toggle" title="Zapnúť/Vypnúť investíciu">
                      <input
                        type="checkbox"
                        id="hypo-invest-toggle"
                        aria-label="Zapnúť/Vypnúť investíciu"
                        defaultChecked
                        onChange={(e) => window.mlToggleInvest?.(e.target.checked)}
                      />
                      <span className="ml-toggle-slider" />
                    </label>
                  </div>
                  <span className="hypo-tag hypo-tag--primary">Majetok</span>
                </div>
                <div id="hypo-invest-fields">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="calc-dock-item col-span-2">
                      <label className="calc-label" htmlFor="c-invest-initial">
                        Jednorazový vklad
                      </label>
                      <div className="calc-input-wrap calc-input-wrap--stepper">
                        <input
                          type="number"
                          id="c-invest-initial"
                          defaultValue={5000}
                          step={500}
                          min={0}
                          className="calc-input"
                        />
                        <Stepper inputId="c-invest-initial" step={500} unit="€" />
                      </div>
                    </div>
                    <div className="calc-dock-item">
                      <label className="calc-label" htmlFor="c-invest-monthly">
                        Mesačná investícia
                      </label>
                      <div className="calc-input-wrap calc-input-wrap--stepper">
                        <input
                          type="number"
                          id="c-invest-monthly"
                          defaultValue={250}
                          step={50}
                          min={0}
                          className="calc-input"
                        />
                        <Stepper inputId="c-invest-monthly" step={50} unit="€" />
                      </div>
                    </div>
                    <div className="calc-dock-item">
                      <label className="calc-label" htmlFor="c-invest-rate">
                        Zhodnotenie p.a.
                      </label>
                      <div className="calc-input-wrap">
                        <input
                          type="number"
                          id="c-invest-rate"
                          defaultValue={6.0}
                          step={0.5}
                          min={0}
                          className="calc-input calc-input--unit"
                        />
                        <span className="calc-input-unit" aria-hidden>%</span>
                      </div>
                    </div>
                  </div>
                  <div className="hypo-panel-foot">
                    <span>Čistý zisk</span>
                    <span className="hypo-panel-foot-value" id="c-invest-profit">0 €</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="calc-dock-foot">
              <div
                id="hypo-evt-accordion-toggle"
                className="hypo-evt-toggle"
                role="button"
                aria-expanded={false}
                aria-controls="hypo-evt-accordion-content"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                  }
                }}
              >
                <h2 className="hypo-evt-title m-0">
                  Udalosti na časovej osi
                  <span
                    id="hypo-event-count-badge"
                    style={{ display: "none" }}
                    className="hypo-evt-badge"
                  >
                    0
                  </span>
                </h2>
                <span id="hypo-evt-accordion-icon" className="calc-collapse-chevron" aria-hidden>▼</span>
              </div>
              <div id="hypo-evt-accordion-content" className="hypo-evt-content" style={{ display: "none" }}>
                <div id="hypo-events-list" className="hypo-evt-list" />
                <div className="hypo-evt-form">
                  <p className="hypo-evt-form-title">Pridať novú udalosť</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="calc-label" htmlFor="evt-type">Typ</label>
                      <select id="evt-type" className="hypo-evt-input">
                        <option value="hypo_extra">Hypotéka: Mimoriadna splátka</option>
                        <option value="hypo_rate">Hypotéka: Zmena úroku</option>
                        <option value="invest_deposit">Investícia: Mimoriadny vklad</option>
                        <option value="invest_withdraw">Investícia: Výber</option>
                      </select>
                    </div>
                    <div>
                      <label className="calc-label" htmlFor="evt-year">Rok</label>
                      <input
                        type="number"
                        id="evt-year"
                        min={1}
                        max={40}
                        defaultValue={5}
                        className="hypo-evt-input"
                      />
                    </div>
                    <div>
                      <label className="calc-label" htmlFor="evt-value">Hodnota</label>
                      <input
                        type="number"
                        id="evt-value"
                        min={0}
                        defaultValue={1000}
                        className="hypo-evt-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <button
                        type="button"
                        className="hypo-evt-add"
                        onClick={() => window.addEvent?.()}
                      >
                        + Pridať udalosť
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Graf */}
          <section className="calc-panel mt-5 md:mt-6" aria-label="Vývoj v čase">
            <div className="calc-chart-head">
              <h2 className="calc-panel-title">Vývoj v čase</h2>
              <div className="calc-legend" id="ml-chart-legend">
                <span className="calc-legend-item">
                  <span className="calc-legend-dot" style={{ background: "#C1533C" }} aria-hidden />
                  Zostatok hypotéky
                </span>
                <span className="calc-legend-item">
                  <span className="calc-legend-dot" style={{ background: "#29614A" }} aria-hidden />
                  Hodnota investície
                </span>
              </div>
            </div>
            <div className="calc-chart-body calc-chart-body--tall">
              <canvas id="compareChart" />
            </div>
            <div id="hypo-crossover-info" className="hypo-crossover" style={{ display: "none" }}>
              <span className="hypo-crossover-title">Bod zlomu dosiahnutý</span>
              <span>
                Investícia presiahne zostatok hypotéky v{" "}
                <span id="crossover-year" className="font-bold text-foreground" />.
              </span>
            </div>
          </section>

          <p className="calc-note calc-note--center mt-5 md:mt-6">
            Kalkulačka je orientačná — počíta s konštantným úrokom aj výnosom
            a nezohľadňuje dane, poplatky ani infláciu.
          </p>

          <div className="hypo-print-footer">
            <p>
              Vygenerované dňa: <span id="hypo-current-date" />
              <span className="text-foreground font-medium"> — JS Mentor</span>
            </p>
          </div>
        </div>

        <div className="hypo-btn-row">
          <button
            type="button"
            className="hypo-btn-email"
            onClick={() => window.mlSendEmail?.()}
          >
            Poslať e-mailom
          </button>
          <button
            type="button"
            id="btn-pdf-bottom"
            className="hypo-btn-pdf"
            onClick={() => window.mlDownloadPDF?.()}
          >
            Stiahnuť PDF report
          </button>
        </div>
      </div>

      <div id="hypo-comparison-modal">
        <div className="ml-modal-box" role="dialog" aria-modal="true" aria-labelledby="hypo-modal-title">
          <div className="ml-modal-header">
            <h3 id="hypo-modal-title" className="hypo-heading text-xl text-foreground m-0">Porovnanie variantov</h3>
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
                aria-label="Rok porovnania"
                min={0}
                max={20}
                defaultValue={0}
                className="calc-slider flex-1"
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

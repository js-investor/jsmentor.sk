import { useLayoutEffect } from "react";
import brandPatternDark from "@/assets/logo/js-brand-pattern-black.svg";
import { NOISE_TEXTURE } from "@/lib/noiseTexture";
import "../shared/calculator-toolbar.css";
import "../shared/calc-ui.css";
import "./investicna-calculator.css";
import { initCalcHeroPulse, initCalcSliders } from "../shared/calcUi";
import { mountInvesticnaCalculator } from "./investicnaMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const InvesticnaCalculator = () => {
  useLayoutEffect(() => {
    const unmountCalc = mountInvesticnaCalculator();
    const unmountSliders = initCalcSliders("inv-calc-root");
    const unmountPulse = initCalcHeroPulse("inv-finalValue");
    return () => {
      unmountPulse();
      unmountSliders();
      unmountCalc?.();
    };
  }, []);

  return (
    <div id="inv-calc-root" className="calc-ui w-full font-sans text-foreground">
      <div className="calc-variant-toolbar inv-no-export rounded-2xl border border-border/60 mx-[-0.125rem] sm:mx-0">
        <div className="calc-variant-toolbar-variants">
          <div id="inv-variant-tabs" className="calc-variant-tabs" />
          <button
            type="button"
            id="inv-add-variant"
            className="ml-add-variant"
            title="Pridať variant"
            aria-label="Pridať variant"
            onClick={() => window.invAddVariant?.()}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="calc-btn-compare"
          id="inv-btn-compare"
          onClick={() => window.invOpenComparison?.()}
        >
          <CompareIcon />
          Porovnať
        </button>
      </div>

      <div className="calc-body-shell">
        <div className="calc-page">
          <header className="calc-header">
            <span className="calc-eyebrow">Kalkulačka</span>
            <h1 className="calc-title">Investičná kalkulačka</h1>
            <p className="calc-subtitle">
              Simuluj silu zloženého úročenia a sleduj rast svojho majetku v čase.
            </p>
          </header>

          <div className="calc-layout">
            {/* ------------------------------ Vstupy ------------------------------ */}
            <div className="calc-col">
              <section className="calc-panel" aria-label="Parametre investície">
                <h2 className="calc-panel-title">Parametre investície</h2>
                <p className="calc-panel-sub">Výsledky sa prepočítavajú okamžite.</p>

                <div className="calc-field">
                  <label className="calc-label" htmlFor="inv-initial">
                    Počiatočný vklad
                  </label>
                  <div className="calc-input-wrap calc-input-wrap--stepper">
                    <input
                      type="number"
                      id="inv-initial"
                      defaultValue={5000}
                      step={100}
                      min={0}
                      className="calc-input"
                    />
                    <span className="calc-stepper">
                      <span className="calc-stepper-unit" aria-hidden>€</span>
                      <button
                        type="button"
                        aria-label="Znížiť o 100 €"
                        onClick={() => {
                          const el = document.getElementById("inv-initial") as HTMLInputElement | null;
                          if (!el) return;
                          el.stepDown();
                          el.dispatchEvent(new Event("input", { bubbles: true }));
                        }}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        aria-label="Zvýšiť o 100 €"
                        onClick={() => {
                          const el = document.getElementById("inv-initial") as HTMLInputElement | null;
                          if (!el) return;
                          el.stepUp();
                          el.dispatchEvent(new Event("input", { bubbles: true }));
                        }}
                      >
                        +
                      </button>
                    </span>
                  </div>
                </div>

                <div className="calc-field">
                  <label className="calc-label" htmlFor="inv-monthly">
                    Pravidelný mesačný vklad
                  </label>
                  <div className="calc-input-wrap calc-input-wrap--stepper">
                    <input
                      type="number"
                      id="inv-monthly"
                      defaultValue={200}
                      step={10}
                      min={0}
                      className="calc-input"
                    />
                    <span className="calc-stepper">
                      <span className="calc-stepper-unit" aria-hidden>€</span>
                      <button
                        type="button"
                        aria-label="Znížiť o 10 €"
                        onClick={() => {
                          const el = document.getElementById("inv-monthly") as HTMLInputElement | null;
                          if (!el) return;
                          el.stepDown();
                          el.dispatchEvent(new Event("input", { bubbles: true }));
                        }}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        aria-label="Zvýšiť o 10 €"
                        onClick={() => {
                          const el = document.getElementById("inv-monthly") as HTMLInputElement | null;
                          if (!el) return;
                          el.stepUp();
                          el.dispatchEvent(new Event("input", { bubbles: true }));
                        }}
                      >
                        +
                      </button>
                    </span>
                  </div>
                </div>

                <div className="calc-field">
                  <div className="calc-label">
                    <label htmlFor="inv-duration">Doba investovania</label>
                    <span id="inv-durationVal" className="calc-label-value">20 rokov</span>
                  </div>
                  <input type="range" id="inv-duration" className="calc-slider" min={1} max={50} defaultValue={20} />
                  <div className="calc-slider-scale" aria-hidden>
                    <span>1 rok</span>
                    <span>50 rokov</span>
                  </div>
                </div>

                <div className="calc-field">
                  <div className="calc-label">
                    <label htmlFor="inv-rate">Očakávaný ročný výnos</label>
                    <span className="calc-input-inline">
                      <input
                        type="number"
                        id="inv-rate"
                        defaultValue={8}
                        step={0.1}
                        min={0}
                        max={100}
                      />
                      <span className="calc-inline-unit" aria-hidden>%</span>
                    </span>
                  </div>
                  <input type="range" id="inv-rate-slider" aria-label="Očakávaný ročný výnos" className="calc-slider" min={1} max={15} step={0.1} defaultValue={8} />
                  <div className="calc-slider-scale" aria-hidden>
                    <span>Konzervatívny (3 %)</span>
                    <span>Dynamický (8 %+)</span>
                  </div>
                </div>

                <div
                  id="inv-advanced-toggle"
                  className="calc-collapse-toggle"
                  role="button"
                  aria-expanded={false}
                  aria-controls="inv-advanced-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  <span>Inflácia a poplatky</span>
                  <span id="inv-arrow-icon" className="calc-collapse-chevron" aria-hidden>▼</span>
                </div>
                <div id="inv-advanced-content" className="mt-4 space-y-4" style={{ display: "none" }}>
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="inv-inflation">
                      Odhadovaná inflácia
                      <span className="calc-label-hint">% ročne</span>
                    </label>
                    <div className="calc-input-wrap">
                      <input type="number" id="inv-inflation" defaultValue={2} step={0.1} className="calc-input calc-input--unit" />
                      <span className="calc-input-unit" aria-hidden>%</span>
                    </div>
                    <p className="calc-stat-sub mt-2">Prepočíta výslednú sumu na dnešnú hodnotu peňazí.</p>
                  </div>
                </div>
              </section>

              <p className="calc-note">
                Kalkulačka je orientačná — počíta s konštantným ročným výnosom a nezohľadňuje
                dane ani poplatky konkrétnych produktov.
              </p>
            </div>

            {/* ----------------------------- Výsledky ----------------------------- */}
            <div className="calc-col">
              <div className="calc-hero-wrap">
              <section className="calc-hero calc-hero--glow" aria-label="Výsledok">
                <div
                  className="calc-hero-noise"
                  style={{ backgroundImage: NOISE_TEXTURE }}
                  aria-hidden
                />
                <img src={brandPatternDark} alt="" aria-hidden className="calc-hero-pattern" />
                <p className="calc-hero-label">Hodnota portfólia na konci</p>
                <p className="calc-hero-value" id="inv-finalValue">0 €</p>
                <div className="calc-hero-meta">
                  <span className="calc-hero-chip">
                    Čistý výnos&nbsp;<strong id="inv-totalInterest">0 €</strong>
                  </span>
                  <span className="calc-hero-sub">
                    Zložené úročenie zarobilo <strong id="inv-interestPercent">0 %</strong> zo sumy.
                  </span>
                </div>
              </section>
              </div>

              <div className="calc-statbar" role="group" aria-label="Súhrn">
                <div>
                  <p className="calc-stat-label">Celkový vklad</p>
                  <p className="calc-stat-value" id="inv-totalInvested">0 €</p>
                  <p className="calc-stat-sub">Tvoje vlastné peniaze</p>
                </div>
                <div>
                  <p className="calc-stat-label">Reálna hodnota</p>
                  <p className="calc-stat-value" id="inv-realValue">0 €</p>
                  <p className="calc-stat-sub">Očistené o infláciu</p>
                </div>
                <div>
                  <p className="calc-stat-label">Návratnosť</p>
                  <p className="calc-stat-value" id="inv-roi">0×</p>
                  <p className="calc-stat-sub">Násobok vkladu</p>
                </div>
              </div>

              <section className="calc-panel" aria-label="Vývoj v čase">
                <div className="calc-chart-head">
                  <h3 className="calc-panel-title">Vývoj v čase</h3>
                  <div className="calc-legend">
                    <span className="calc-legend-item">
                      <span className="calc-legend-dot" style={{ background: "#A8956E" }} aria-hidden />
                      Vklady
                    </span>
                    <span className="calc-legend-item">
                      <span className="calc-legend-dot" style={{ background: "#29614A" }} aria-hidden />
                      Zhodnotenie
                    </span>
                  </div>
                </div>
                <div className="calc-chart-body">
                  <canvas id="inv-chart" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div id="inv-comparison-modal" className="inv-modal-overlay">
        <div className="inv-modal-box" role="dialog" aria-modal="true" aria-labelledby="inv-modal-title">
          <div className="inv-modal-header">
            <div>
              <h3 id="inv-modal-title" className="text-xl inv-heading-serif text-foreground m-0 font-normal">Porovnanie variantov</h3>
              <p className="text-[15px] text-muted-foreground mt-1 mb-0">Prehľad vstupov a výsledkov investičných scenárov.</p>
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
  );
};

export default InvesticnaCalculator;

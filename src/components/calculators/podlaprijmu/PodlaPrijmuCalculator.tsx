import { useLayoutEffect } from "react";
import brandPatternDark from "@/assets/logo/js-brand-pattern-black.svg";
import { NOISE_TEXTURE } from "@/lib/noiseTexture";
import "../shared/calculator-toolbar.css";
import "../shared/calc-ui.css";
import "./podla-prijmu.css";
import { initCalcSliders } from "../shared/calcUi";
import { mountPodlaPrijmuCalculator } from "./podla-prijmuMount";

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const PodlaPrijmuCalculator = () => {
  useLayoutEffect(() => {
    const unmountCalc = mountPodlaPrijmuCalculator();
    const unmountSliders = initCalcSliders("dti-calc-root");
    return () => {
      unmountSliders();
      unmountCalc?.();
    };
  }, []);

  return (
    <div id="dti-calc-root" className="calc-ui w-full font-sans text-foreground">
      <div className="calc-variant-toolbar ml-no-export rounded-2xl border border-border/60 mx-[-0.125rem] sm:mx-0">
        <div className="calc-variant-toolbar-variants">
          <div id="dti-variant-tabs" className="calc-variant-tabs" />
          <button
            type="button"
            id="dti-add-variant"
            className="ml-add-variant"
            title="Pridať variant"
            aria-label="Pridať variant"
            onClick={() => window.dtiAddVariant?.()}
          >
            +
          </button>
        </div>
        <button type="button" id="dti-btn-compare" className="calc-btn-compare" onClick={() => window.dtiOpenComparison?.()}>
          <CompareIcon />
          Porovnať
        </button>
      </div>

      <div className="calc-body-shell">
        <div className="calc-page">
          <header className="calc-header">
            <span className="calc-eyebrow">Kalkulačka</span>
            <h1 className="calc-title">Úverová kalkulačka</h1>
            <p className="calc-subtitle">
              Zisti, akú maximálnu hypotéku ti banka schváli podľa pravidiel NBS (DTI a DSTI).
            </p>
          </header>

          <div className="calc-layout">
            {/* ------------------------------ Vstupy ------------------------------ */}
            <div className="calc-col">
              <section className="calc-panel" aria-label="Tvoje financie">
                <h2 className="calc-panel-title">Tvoje financie</h2>
                <p className="calc-panel-sub">Výsledky sa prepočítavajú okamžite.</p>

                <div className="calc-field">
                  <label className="calc-label" htmlFor="dti-income">
                    Čistý mesačný príjem
                  </label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      id="dti-income"
                      defaultValue={1500}
                      step={50}
                      min={0}
                      className="calc-input calc-input--unit"
                    />
                    <span className="calc-input-unit" aria-hidden>€</span>
                  </div>
                </div>

                <div className="calc-field">
                  <label className="dti-check-row" htmlFor="dti-partner-toggle">
                    <span className="dti-check-text">
                      <span className="dti-check-title">Spolužiadateľ / partner</span>
                      <span className="dti-check-sub">Spoločný príjem zvýši úverovú kapacitu.</span>
                    </span>
                    <input type="checkbox" id="dti-partner-toggle" className="dti-check-input" />
                  </label>
                </div>

                <div id="dti-partner-input-group" className="calc-field hidden">
                  <label className="calc-label" htmlFor="dti-partner-income">
                    Príjem partnera
                  </label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      id="dti-partner-income"
                      defaultValue={0}
                      step={50}
                      min={0}
                      className="calc-input calc-input--unit"
                    />
                    <span className="calc-input-unit" aria-hidden>€</span>
                  </div>
                </div>
              </section>

              <section className="calc-panel" aria-label="Existujúce záväzky">
                <h2 className="calc-panel-title">Existujúce záväzky</h2>

                <div className="calc-field">
                  <label className="calc-label" htmlFor="dti-monthly-debt">
                    Mesačné splátky úverov
                  </label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      id="dti-monthly-debt"
                      defaultValue={0}
                      step={10}
                      min={0}
                      className="calc-input calc-input--unit"
                    />
                    <span className="calc-input-unit" aria-hidden>€</span>
                  </div>
                </div>

                <div className="calc-field">
                  <label className="calc-label" htmlFor="dti-total-debt">
                    Celkový zostatok dlhov
                  </label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      id="dti-total-debt"
                      defaultValue={0}
                      step={1000}
                      min={0}
                      className="calc-input calc-input--unit"
                    />
                    <span className="calc-input-unit" aria-hidden>€</span>
                  </div>
                </div>

                <div className="calc-field">
                  <label className="calc-label" htmlFor="dti-credit-limits">
                    Limity na kreditných kartách
                    <span className="calc-label-hint">3 % z limitu sa ráta ako splátka</span>
                  </label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      id="dti-credit-limits"
                      defaultValue={0}
                      step={100}
                      min={0}
                      className="calc-input calc-input--unit"
                    />
                    <span className="calc-input-unit" aria-hidden>€</span>
                  </div>
                </div>
              </section>

              <section className="calc-panel" aria-label="Parametre hypotéky">
                <h2 className="calc-panel-title">Parametre hypotéky</h2>

                <div className="calc-fieldrow">
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="dti-rate">
                      Úroková sadzba
                    </label>
                    <div className="calc-input-wrap">
                      <input
                        type="number"
                        id="dti-rate"
                        defaultValue={4.2}
                        step={0.1}
                        min={0}
                        className="calc-input calc-input--unit"
                      />
                      <span className="calc-input-unit" aria-hidden>%</span>
                    </div>
                  </div>
                  <div className="calc-field">
                    <label className="calc-label" htmlFor="dti-years">
                      Splatnosť
                    </label>
                    <div className="calc-input-wrap">
                      <input
                        type="number"
                        id="dti-years"
                        defaultValue={30}
                        min={1}
                        max={40}
                        className="calc-input calc-input--unit"
                      />
                      <span className="calc-input-unit" aria-hidden>rokov</span>
                    </div>
                  </div>
                </div>

                <div className="calc-field">
                  <label className="dti-check-row" htmlFor="dti-stress-toggle">
                    <span className="dti-check-text">
                      <span className="dti-check-title">Stress test (+2 %)</span>
                      <span className="dti-check-sub">Banka počíta splátku so sadzbou vyššou o 2 %.</span>
                    </span>
                    <input type="checkbox" id="dti-stress-toggle" className="dti-check-input" />
                  </label>
                </div>
              </section>

              <p className="calc-note">
                Kalkulačka je orientačná — vychádza z limitov NBS (DTI 8-násobok ročného príjmu,
                DSTI 60 % s povinnou rezervou 40 %). Konečné posúdenie závisí od konkrétnej banky.
              </p>
            </div>

            {/* ----------------------------- Výsledky ----------------------------- */}
            <div className="calc-col">
              <section className="calc-hero" aria-label="Výsledok">
                <div
                  className="calc-hero-noise"
                  style={{ backgroundImage: NOISE_TEXTURE }}
                  aria-hidden
                />
                <img src={brandPatternDark} alt="" aria-hidden className="calc-hero-pattern" />
                <p className="calc-hero-label">Maximálna výška hypotéky</p>
                <p className="calc-hero-value" id="dti-max-mortgage">0 €</p>
                <div className="calc-hero-meta">
                  <span className="calc-hero-chip">
                    Max. mesačná splátka&nbsp;<strong id="dti-max-payment">0 €</strong>
                  </span>
                  <span className="calc-hero-sub" id="dti-limit-reason" />
                </div>
              </section>

              <div className="calc-stats">
                <div className="calc-stat">
                  <p className="calc-stat-label">Povinná rezerva</p>
                  <p className="calc-stat-value" id="dti-reserve">0 €</p>
                  <p className="calc-stat-sub">40 % z čistého príjmu</p>
                </div>
                <div className="calc-stat">
                  <p className="calc-stat-label">Limit DTI</p>
                  <p className="calc-stat-value">8×</p>
                  <p className="calc-stat-sub">Celkový dlh vs. ročný príjem</p>
                </div>
                <div className="calc-stat">
                  <p className="calc-stat-label">Limit DSTI</p>
                  <p className="calc-stat-value">60 %</p>
                  <p className="calc-stat-sub">Splátky vs. mesačný príjem</p>
                </div>
              </div>

              <section className="calc-panel" aria-label="Ukazovatele DTI a DSTI">
                <div className="calc-chart-head">
                  <h3 className="calc-panel-title">Ako si na tom s limitmi</h3>
                </div>
                <div className="dti-gauges">
                  <div className="dti-gauge">
                    <p className="calc-stat-label">DTI</p>
                    <p className="dti-gauge-sub">Celkový dlh vs. ročný príjem</p>
                    <div className="dti-gauge-canvas">
                      <canvas id="chart-dti" />
                      <span className="dti-gauge-value" id="dti-value-text">0x</span>
                    </div>
                    <p className="dti-gauge-status" id="dti-status-msg">V bezpečnej zóne</p>
                  </div>
                  <div className="dti-gauge">
                    <p className="calc-stat-label">DSTI</p>
                    <p className="dti-gauge-sub">Splátky vs. mesačný príjem</p>
                    <div className="dti-gauge-canvas">
                      <canvas id="chart-dsti" />
                      <span className="dti-gauge-value" id="dsti-value-text">0%</span>
                    </div>
                    <p className="dti-gauge-status" id="dsti-status-msg">V bezpečnej zóne</p>
                  </div>
                </div>
              </section>

              <section className="calc-panel" aria-label="Rozloženie príjmu">
                <div className="calc-chart-head">
                  <h3 className="calc-panel-title">Rozloženie tvojho príjmu</h3>
                  <div className="calc-legend">
                    <span className="calc-legend-item">
                      <span className="calc-legend-dot" style={{ background: "#C1533C" }} aria-hidden />
                      Dlhy
                    </span>
                    <span className="calc-legend-item">
                      <span className="calc-legend-dot" style={{ background: "#A8956E" }} aria-hidden />
                      Rezerva
                    </span>
                    <span className="calc-legend-item">
                      <span className="calc-legend-dot" style={{ background: "#29614A" }} aria-hidden />
                      Voľné
                    </span>
                  </div>
                </div>
                <div className="dti-income-bar" role="img" aria-label="Rozloženie príjmu na dlhy, rezervu a voľné prostriedky">
                  <div id="bar-debts" className="dti-bar dti-bar--debts" style={{ width: "20%" }} />
                  <div id="bar-reserve" className="dti-bar dti-bar--reserve" style={{ width: "40%" }} />
                  <div id="bar-free" className="dti-bar dti-bar--free" style={{ width: "40%" }} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div id="dti-compare-modal" className="ml-modal-overlay">
        <div className="ml-modal-box" role="dialog" aria-modal="true" aria-labelledby="dti-modal-title">
          <div className="ml-modal-header">
            <div>
              <h3 id="dti-modal-title" className="text-xl dti-heading-serif text-foreground m-0 font-normal">Porovnanie variantov</h3>
              <p className="text-[15px] text-muted-foreground mt-1 mb-0">Prehľad vstupov a výsledkov DTI / DSTI.</p>
            </div>
            <button type="button" className="mylife-btn-email shrink-0" onClick={() => window.dtiCloseComparison?.()}>
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

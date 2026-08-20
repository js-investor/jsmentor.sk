import { useLayoutEffect } from "react";
import brandPatternDark from "@/assets/logo/js-brand-pattern-black.svg";
import { NOISE_TEXTURE } from "@/lib/noiseTexture";
import "../shared/calc-ui.css";
import "./mzdova-calculator.css";
import { initCalcSliders } from "../shared/calcUi";
import { mountMzdovaCalculator } from "./mzdovaMount";

const MzdovaCalculator = () => {
  useLayoutEffect(() => {
    const unmountCalc = mountMzdovaCalculator();
    const unmountSliders = initCalcSliders("mzv3-w");
    return () => {
      unmountSliders();
      unmountCalc?.();
    };
  }, []);

  return (
    <div id="mzv3-w" className="calc-ui w-full font-sans text-foreground">
      <div className="calc-body-shell">
        <div className="calc-page">
          <header className="calc-header">
            <span className="calc-eyebrow">Kalkulačka</span>
            <h1 className="calc-title">Mzdová kalkulačka</h1>
            <p className="calc-subtitle">
              Zisti svoju čistú mzdu podľa platnej legislatívy SR 2026 — pre zamestnancov aj SZČO.
            </p>
          </header>

          <div className="mzv3-type-switch-row">
            <div className="calc-segment mzv3-type-switch" role="group" aria-label="Typ pracovného pomeru">
              <button type="button" id="mzv3-t-emp" onClick={() => window.mzv3SetType?.("emp")} className="sel" aria-pressed={true}>
                Zamestnanec
              </button>
              <button type="button" id="mzv3-t-szco" aria-pressed={false} onClick={() => window.mzv3SetType?.("szco")}>
                SZČO / Živnostník
              </button>
            </div>
          </div>

          <div className="calc-layout">
            {/* ------------------------------ Vstupy ------------------------------ */}
            <div className="calc-col">
              <section className="calc-panel" aria-label="Vstupné údaje">
                <h2 className="calc-panel-title">Vstupné údaje</h2>
                <p className="calc-panel-sub">Výsledky sa prepočítavajú okamžite.</p>

                <div className="calc-field">
                  <label id="mzv3-salary-label" className="calc-label" htmlFor="mzv3-salary">
                    Hrubá mesačná mzda
                  </label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      id="mzv3-salary"
                      defaultValue={2000}
                      step={50}
                      min={0}
                      className="calc-input calc-input--unit"
                    />
                    <span className="calc-input-unit" aria-hidden>€</span>
                  </div>
                </div>

                <div className="calc-field" id="mzv3-dir-wrap">
                  <span className="calc-label">Smer výpočtu</span>
                  <div id="mzv3-seg-wrap" className="calc-segment">
                    <button type="button" id="mzv3-d-gross" onClick={() => window.mzv3SetDir?.("gross")} className="sel" aria-pressed={true}>
                      Hrubá → Čistá
                    </button>
                    <button type="button" id="mzv3-d-net" aria-pressed={false} onClick={() => window.mzv3SetDir?.("net")}>
                      Čistá → Hrubá
                    </button>
                  </div>
                </div>

                <div className="calc-field hidden" id="mzv3-szco-income-wrap">
                  <span className="calc-label">Základ dane (príjmy – výdavky)</span>
                  <p className="calc-stat-sub">
                    Zadaj mesačný základ dane (príjmy mínus výdavky / paušálne výdavky). Odvody sa platia z
                    vymeriavacieho základu = ½ základu dane.
                  </p>
                </div>

                <div className="calc-field mzv3-check">
                  <input type="checkbox" id="mzv3-ztpp" />
                  <label htmlFor="mzv3-ztpp">
                    Osoba so zdravotným postihnutím (ZŤP)
                    <span className="mzv3-check-hint">Zdravotné poistenie 2,5 % / 8 % namiesto 5 % / 16 %</span>
                  </label>
                </div>

                <div id="mzv3-emp-opts">
                  <div className="calc-field">
                    <span className="calc-label">Uplatnenie NČZD</span>
                    <div className="calc-segment">
                      <button type="button" id="mzv3-nczd-yes" onClick={() => window.mzv3SetNczd?.(true)} className="sel" aria-pressed={true}>
                        Áno
                      </button>
                      <button type="button" id="mzv3-nczd-no" aria-pressed={false} onClick={() => window.mzv3SetNczd?.(false)}>
                        Nie
                      </button>
                    </div>
                    <p className="calc-stat-sub mt-2">
                      NČZD 2026: 497,23 €/mes (5 966,73 €/rok). Pri základe dane nad 26 083,13 €/rok sa kráti.
                    </p>
                  </div>

                  <div className="calc-field">
                    <span className="calc-label">Daňový bonus na deti</span>
                    <div className="calc-fieldrow mb-0">
                      <div>
                        <label className="calc-label calc-label--sub" htmlFor="mzv3-ch15">
                          Do 15 rokov
                          <span className="calc-label-hint">100 €/mes</span>
                        </label>
                        <input type="number" id="mzv3-ch15" defaultValue={0} min={0} max={10} className="calc-input" />
                      </div>
                      <div>
                        <label className="calc-label calc-label--sub" htmlFor="mzv3-ch18">
                          15 – 18 rokov
                          <span className="calc-label-hint">50 €/mes</span>
                        </label>
                        <input type="number" id="mzv3-ch18" defaultValue={0} min={0} max={10} className="calc-input" />
                      </div>
                    </div>
                  </div>
                </div>

                <div id="mzv3-szco-opts" className="hidden">
                  <div className="calc-field mzv3-infobox">
                    <p className="mzv3-infobox-title">Vymeriavací základ SZČO 2026</p>
                    <p className="mzv3-infobox-text">
                      Min. VZ sociálne: <strong>914,40 €/mes</strong>
                      <br />
                      Minimálne sociálne odvody: <strong>303,11 €/mes</strong> (33,15 %)
                      <br />
                      Minimálne zdravotné odvody: <strong>121,92 €/mes</strong> (16 %)
                    </p>
                  </div>
                  <div className="calc-field mzv3-check">
                    <input type="checkbox" id="mzv3-szco-minbase" />
                    <label htmlFor="mzv3-szco-minbase">
                      Platiť iba minimálne odvody
                      <span className="mzv3-check-hint">Bez ohľadu na výšku príjmu</span>
                    </label>
                  </div>
                  <div className="calc-field mzv3-check">
                    <input type="checkbox" id="mzv3-szco-pausch" />
                    <label htmlFor="mzv3-szco-pausch">Paušálne výdavky (60 %, max 20 000 €/rok)</label>
                  </div>
                </div>
              </section>

              <p className="calc-note">
                Kalkulačka je orientačná — sadzby pre rok 2026 (SR). SZČO: odvody sa platia mesačne ako preddavky,
                ročné zúčtovanie v daňovom priznaní.
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
                <p className="calc-hero-label" id="mzv3-hero-label">Čistá mzda</p>
                <p className="calc-hero-value" id="mzv3-net">0 €</p>
                <div className="calc-hero-meta">
                  <span className="calc-hero-chip">Legislatíva SR 2026</span>
                  <span className="calc-hero-sub" id="mzv3-net-sub" />
                </div>
              </section>

              <div className="calc-stats mzv3-stats-secondary">
                <div className="calc-stat calc-stat--tint">
                  <p className="calc-stat-label" id="mzv3-second-label">Náklady zamestnávateľa</p>
                  <p className="calc-stat-value" id="mzv3-super">0 €</p>
                  <p className="calc-stat-sub" id="mzv3-super-sub">Superhrubá mzda</p>
                </div>
              </div>

              <section className="calc-panel" aria-label="Rozklad výpočtu">
                <h3 className="calc-panel-title">Rozklad výpočtu</h3>
                <div id="mzv3-breakdown" className="calc-rows mt-3" />
              </section>

              <section className="calc-panel" aria-label="Štruktúra príjmu">
                <div className="calc-chart-head">
                  <h3 className="calc-panel-title">Štruktúra príjmu</h3>
                </div>
                <div className="calc-chart-body mzv3-chart-body">
                  <canvas id="mzv3-chart" />
                </div>
              </section>

              <section className="calc-panel" aria-label="Ročný prehľad">
                <h3 className="calc-panel-title">Ročný prehľad</h3>
                <div className="calc-stats mzv3-year-stats">
                  <div className="calc-stat">
                    <p className="calc-stat-label">Hrubá za rok</p>
                    <p className="calc-stat-value" id="mzv3-gross-yr">0 €</p>
                  </div>
                  <div className="calc-stat">
                    <p className="calc-stat-label">Čistá za rok</p>
                    <p className="calc-stat-value" id="mzv3-net-yr">0 €</p>
                  </div>
                  <div className="calc-stat">
                    <p className="calc-stat-label">Odvody za rok</p>
                    <p className="calc-stat-value" id="mzv3-odvody-yr">0 €</p>
                  </div>
                  <div className="calc-stat">
                    <p className="calc-stat-label">Daň za rok</p>
                    <p className="calc-stat-value" id="mzv3-tax-yr">0 €</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MzdovaCalculator;

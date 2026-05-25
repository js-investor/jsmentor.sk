import { useLayoutEffect } from "react";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import "./mzdova-calculator.css";
import { mountMzdovaCalculator } from "./mzdovaMount";

const MzdovaCalculator = () => {
  useLayoutEffect(() => mountMzdovaCalculator(), []);

  return (
    <div id="mzv3-w" className="mzv3-root py-12 px-4 sm:px-6 bg-cream">
      <div className="max-w-5xl mx-auto mzv3-shell">
        <div className="mb-10 text-center max-w-2xl mx-auto mzv3-heading">
          <h1 className="mzv3-title text-4xl md:text-5xl mb-4 font-serif text-foreground leading-tight">Mzdová kalkulačka</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Výpočet čistej mzdy podľa platnej legislatívy SR 2026. Platí pre zamestnancov aj SZČO.
          </p>
        </div>

        <div className="mb-10 flex justify-center w-full">
          <div className="mzv3-type-switch">
            <button type="button" id="mzv3-t-emp" onClick={() => window.mzv3SetType?.("emp")} className="mzv3-switch-btn sel">
              Zamestnanec
            </button>
            <button type="button" id="mzv3-t-szco" onClick={() => window.mzv3SetType?.("szco")} className="mzv3-switch-btn">
              SZČO / Živnostník
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mzv3-main-grid">
          <div className="lg:col-span-5 space-y-5 mzv3-left-col">
            <div className="bg-card p-6 md:p-6 rounded-xl border border-border mzv3-card mzv3-card-input">
              <h2 className="headline-serif mb-6 border-b border-cream pb-4">Vstupné údaje</h2>

              <div className="mb-6">
                <label id="mzv3-salary-label" className="block text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  Hrubá mesačná mzda
                </label>
                <div className="relative">
                  <input type="number" id="mzv3-salary" defaultValue={2000} step={50} min={0} className="input-field p-3 rounded text-xl font-medium pr-8" />
                  <span className="absolute right-4 top-3.5 text-muted-foreground">€</span>
                </div>
              </div>

              <div className="mb-6" id="mzv3-dir-wrap">
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">Smer výpočtu</label>
                <div id="mzv3-seg-wrap" className="mzv3-seg-wrap">
                  <button type="button" id="mzv3-d-gross" onClick={() => window.mzv3SetDir?.("gross")} className="mzv3-seg-btn sel">
                    Hrubá → Čistá
                  </button>
                  <button type="button" id="mzv3-d-net" onClick={() => window.mzv3SetDir?.("net")} className="mzv3-seg-btn">
                    Čistá → Hrubá
                  </button>
                </div>
              </div>

              <div className="mb-6 hidden" id="mzv3-szco-income-wrap">
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">Základ dane (príjmy – výdavky)</label>
                <p className="text-[11px] text-muted-foreground">
                  Zadajte mesačný základ dane (príjmy mínus výdavky / paušálne výdavky). Odvody sa platia z vymeriavacieho základu = ½
                  základu dane.
                </p>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <input type="checkbox" id="mzv3-ztpp" className="w-4 h-4 accent-black" />
                <label htmlFor="mzv3-ztpp" className="text-sm text-foreground">
                  Osoba so zdravotným postihnutím (ZŤP)
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    Zdravotné poistenie 2,5% / 8% namiesto 5% / 16%
                  </span>
                </label>
              </div>

              <div id="mzv3-emp-opts">
                <div className="mb-4">
                  <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">Uplatnenie NČZD</label>
                  <div className="seg">
                    <button type="button" className="seg-btn sel" id="mzv3-nczd-yes" onClick={() => window.mzv3SetNczd?.(true)}>
                      Áno
                    </button>
                    <button type="button" className="seg-btn" id="mzv3-nczd-no" onClick={() => window.mzv3SetNczd?.(false)}>
                      Nie
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    NČZD 2026: 497,23 €/mes (5 966,73 €/rok). Pri základe dane nad 26 083,13 €/rok sa kráti.
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">Daňový bonus na deti</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Deti do 15 rokov (100 €/mes)</label>
                      <input type="number" id="mzv3-ch15" defaultValue={0} min={0} max={10} className="input-field p-2 rounded text-sm w-full" />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Deti 15–18 rokov (50 €/mes)</label>
                      <input type="number" id="mzv3-ch18" defaultValue={0} min={0} max={10} className="input-field p-2 rounded text-sm w-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div id="mzv3-szco-opts" className="hidden">
                <div className="mb-4 rounded-lg border border-border bg-cream/60 p-3">
                  <p className="text-[11px] font-semibold text-foreground mb-1">Vymeriavací základ SZČO 2026</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Min. VZ sociálne: <strong>914,40 €/mes</strong>
                    <br />
                    Minimálne sociálne odvody: <strong>303,11 €/mes</strong> (33,15%)
                    <br />
                    Minimálne zdravotné odvody: <strong>121,92 €/mes</strong> (16%)
                  </p>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <input type="checkbox" id="mzv3-szco-minbase" className="w-4 h-4 accent-black" />
                  <label htmlFor="mzv3-szco-minbase" className="text-sm text-foreground">
                    Platiť iba minimálne odvody
                    <span className="mt-1 block text-[10px] text-muted-foreground">Bez ohľadu na výšku príjmu</span>
                  </label>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <input type="checkbox" id="mzv3-szco-pausch" className="w-4 h-4 accent-black" />
                  <label htmlFor="mzv3-szco-pausch" className="text-sm text-foreground">
                    Paušálne výdavky (60%, max 20 000 €/rok)
                  </label>
                </div>
              </div>

              <div className="border-t border-cream pt-4 mt-2">
                <p className="text-[10px] text-muted-foreground italic">
                  Výpočet je orientačný. Sadzby pre rok 2026 (SR). SZČO: odvody sa platia mesačne ako preddavky, ročné zúčtovanie v
                  daňovom priznaní.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 mzv3-right-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary text-primary-foreground p-6 rounded-xl flex flex-col justify-between relative overflow-hidden min-h-[140px] mzv3-card">
                <div className="relative z-10">
                  <h3 id="mzv3-hero-label" className="text-cream text-xs uppercase tracking-widest font-medium mb-1">
                    Čistá mzda
                  </h3>
                  <div className="text-3xl md:text-4xl font-serif mt-2" id="mzv3-net">
                    0 €
                  </div>
                  <div className="text-xs text-white/80 mt-2" id="mzv3-net-sub" />
                </div>
                <img
                  src={brandPattern}
                  alt=""
                  aria-hidden
                  className="absolute -right-8 -bottom-10 w-[min(60%,220px)] max-h-[160px] object-contain object-right-bottom opacity-[0.35] pointer-events-none select-none"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(97%) sepia(54%) saturate(1200%) hue-rotate(80deg) brightness(110%) contrast(85%)",
                    mixBlendMode: "soft-light",
                  }}
                />
              </div>
              <div className="bg-[#FFF9F5] p-6 rounded-xl border border-border min-h-[140px] mzv3-card relative overflow-hidden">
                <h3 id="mzv3-second-label" className="text-muted-foreground text-xs uppercase tracking-widest font-medium mb-1 relative z-10">
                  Náklady zamestnávateľa
                </h3>
                <div className="text-3xl font-serif text-foreground relative z-10" id="mzv3-super">
                  0 €
                </div>
                <div className="text-xs text-muted-foreground mt-2 relative z-10" id="mzv3-super-sub">
                  Superhrubá mzda
                </div>
                <img
                  src={brandPattern}
                  alt=""
                  aria-hidden
                  className="absolute -right-8 -bottom-10 w-[min(60%,220px)] max-h-[160px] object-contain object-right-bottom opacity-[0.10] pointer-events-none select-none"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(96%) sepia(45%) saturate(800%) hue-rotate(80deg) brightness(114%) contrast(84%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border mzv3-card">
              <h3 className="text-lg font-serif text-foreground mb-4">Rozklad výpočtu</h3>
              <div id="mzv3-breakdown" />
            </div>

            <div className="bg-card p-6 rounded-xl border border-border mzv3-card">
              <h3 className="text-lg font-serif text-foreground mb-4">Štruktúra príjmu</h3>
              <div className="relative h-44 w-full">
                <canvas id="mzv3-chart" />
              </div>
            </div>

            <div className="bg-card p-5 rounded-xl border border-border mzv3-card">
              <h3 className="text-base font-serif text-foreground mb-3">Ročný prehľad</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase mb-1">Hrubá/rok</span>
                  <span className="block text-sm font-semibold" id="mzv3-gross-yr">
                    0 €
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase mb-1">Čistá/rok</span>
                  <span className="block text-sm font-semibold" id="mzv3-net-yr">
                    0 €
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase mb-1">Odvody/rok</span>
                  <span className="block text-sm font-semibold" id="mzv3-odvody-yr">
                    0 €
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase mb-1">Daň/rok</span>
                  <span className="block text-sm font-semibold" id="mzv3-tax-yr">
                    0 €
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MzdovaCalculator;


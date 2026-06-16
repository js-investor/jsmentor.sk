import { useState, useMemo, useRef, useCallback } from "react";
import "./poplatkovy-rontgen.css";
import { makeWhatsAppHref } from "@/pages/kalkulacky/kalkulackyConfig";

const RONTGEN_WA_HREF = makeWhatsAppHref(
  "Ahoj Ivan, mám záujem o audit portfólia — chcem vedieť, koľko ma stoja poplatky."
);

/* ── constants ── */
const G = 10;
const ETF_TER = 0.35;

const PROVIDERS = {
  banka:   { name: "🏦 Fondy banky",                    ter: 2.5,  tax: true  },
  poradca: { name: "🤝 Fondy cez poradcu",              ter: 1.0,  tax: false },
  sprav:   { name: "🏢 Správcovská spoločnosť",         ter: 1.20, tax: false },
} as const;

type ProvKey = keyof typeof PROVIDERS;

/* ── simulation ── */
function sim(V0: number, M: number, years: number, g: number, ter: number) {
  const rm = Math.pow(1 + g / 100, 1 / 12) - 1;
  const fm = ter / 100 / 12;
  let v = V0;
  let fees = 0;
  const series: number[] = [v];
  for (let t = 1; t <= years * 12; t++) {
    v = (v + M) * (1 + rm);
    const f = v * fm;
    fees += f;
    v -= f;
    if (t % 12 === 0) series.push(v);
  }
  return { end: v, fees, series, invested: V0 + M * years * 12 };
}

function taxAdjSeries(series: number[], V0: number, M: number): number[] {
  return series.map((v, i) => {
    const inv = V0 + M * 12 * i;
    const gain = v - inv;
    return gain > 0 ? inv + gain * 0.81 : v;
  });
}

const fmt = (n: number) =>
  new Intl.NumberFormat("sk-SK", { maximumFractionDigits: 0 }).format(Math.round(n)) + "\u00a0€";
const fmtPct = (n: number) =>
  n.toLocaleString("sk-SK", { maximumFractionDigits: 1 }) + "\u00a0%";

/* ── chart geometry ── */
const W = 1100;
const H = 420;
const PAD = { l: 95, r: 24, t: 16, b: 44 };

function cx(i: number, n: number) {
  return PAD.l + (W - PAD.l - PAD.r) * (i / (n - 1));
}
function cy(v: number, maxV: number) {
  return H - PAD.b - (H - PAD.t - PAD.b) * (v / maxV);
}
function toPath(series: number[], maxV: number): string {
  return series
    .map((v, i) => `${i === 0 ? "M" : "L"}${cx(i, series.length).toFixed(1)},${cy(v, maxV).toFixed(1)}`)
    .join("");
}
function toArea(sA: number[], sB: number[], maxV: number): string {
  const n = sA.length;
  let p = sA.map((v, i) => `${i === 0 ? "M" : "L"}${cx(i, n).toFixed(1)},${cy(v, maxV).toFixed(1)}`).join("");
  for (let i = n - 1; i >= 0; i--) {
    p += `L${cx(i, n).toFixed(1)},${cy(sB[i], maxV).toFixed(1)}`;
  }
  return p + "Z";
}

/* ═══════════════════════════════════════════════════════════ */
export default function PoplatkovyRontgenCalculator() {
  const [prov, setProv] = useState<ProvKey>("banka");
  const [v0, setV0] = useState(10000);
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(20);

  /* tooltip state */
  const [tip, setTip] = useState<{ x: number; y: number; i: number } | null>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);

  /* ── compute ── */
  const { sA, sB, E, F, diff, fEndNet, taxPaid, eaten } = useMemo(() => {
    const E = sim(v0, monthly, years, G, ETF_TER);
    const F = sim(v0, monthly, years, G, PROVIDERS[prov].ter);
    const taxOn = PROVIDERS[prov].tax;
    const sA = E.series;
    const sB = taxOn ? taxAdjSeries(F.series, v0, monthly) : F.series;
    const fEndNet = sB[sB.length - 1];
    const taxPaid = taxOn ? F.end - fEndNet : 0;
    const diff = E.end - fEndNet;
    const profitE = E.end - E.invested;
    const eaten = profitE > 0 ? (diff / profitE) * 100 : 0;
    return { sA, sB, E, F, diff, fEndNet, taxPaid, eaten };
  }, [prov, v0, monthly, years]);

  const maxV = Math.max(...sA) * 1.05;
  const taxOn = PROVIDERS[prov].tax;
  const n = sA.length;

  /* ── chart hover ── */
  const onMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!chartWrapRef.current) return;
      const r = chartWrapRef.current.getBoundingClientRect();
      const svgW = r.width;
      const sx = (clientX - r.left) / svgW * W;
      const i = Math.max(0, Math.min(n - 1, Math.round((sx - PAD.l) / (W - PAD.l - PAD.r) * (n - 1))));
      const tipX = ((cx(i, n) / W) * svgW) + r.left;
      setTip({ x: clientX - r.left, y: clientY - r.top, i });
    },
    [n]
  );

  const onLeave = useCallback(() => setTip(null), []);

  /* ── chart markup ── */
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const v = (maxV * i) / 4;
    const yy = cy(v, maxV);
    return (
      <g key={i}>
        <line className="pr-ch-grid" x1={PAD.l} x2={W - PAD.r} y1={yy} y2={yy} />
        <text className="pr-ch-txt" x={PAD.l - 10} y={yy + 5} textAnchor="end">
          {Math.round(v / 1000)}k€
        </text>
      </g>
    );
  });

  const step = years <= 12 ? 2 : 5;
  const xLabels = Array.from({ length: n }, (_, i) => {
    if (i % step !== 0) return null;
    return (
      <text key={i} className="pr-ch-txt" x={cx(i, n)} y={H - 12} textAnchor="middle">
        {i === 0 ? "dnes" : `+${i}\u00a0r.`}
      </text>
    );
  });

  const cursorX = tip !== null ? cx(tip.i, n) : 0;

  return (
    <div className="pr-root">
      {/* ═══ CREAM SECTION ═══ */}
      <section className="pr-sec pr-sec--cream">
        <div className="pr-in">
          <span className="pr-pill">Poplatkový röntgen 💸</span>
          <h1 className="pr-h1">
            Zisti, koľko ťa stoja<br />
            <em>skryté poplatky</em>
          </h1>
          <p className="pr-sub">
            Tri kliky a uvidíš, koľko z tvojho budúceho majetku potichu zmizne v poplatkoch.
            V eurách, nie v percentách.
          </p>

          <div className="pr-info-banner">
            ℹ️ <strong>Röntgen ráta ročné poplatky</strong> — tie, ktoré platíš každý rok z celej
            hodnoty investície. Väčšina ľudí netuší, koľko ich investovanie ročne stojí, lebo
            poplatok nikdy nevidia na výpise — strháva sa potichu z hodnoty fondu.
          </div>

          <div className="pr-assume">
            ⚖️ Porovnávame dynamické (akciové) investície — všade rátame s historickým výnosom{" "}
            <strong>10&nbsp;% ročne</strong>.
          </div>

          {/* provider cards */}
          <div className="pr-prov-label">Cez koho investuješ?</div>
          <div className="pr-provs">
            {(Object.keys(PROVIDERS) as ProvKey[]).map((key) => {
              const labels: Record<ProvKey, { icon: string; title: string; sub: string }> = {
                banka:   { icon: "🏦", title: "Cez banku",                  sub: "podielové fondy banky" },
                poradca: { icon: "🤝", title: "Cez poradcu",                sub: "sprostredkovateľ / agent" },
                sprav:   { icon: "🏢", title: "Správcovská spoločnosť",     sub: "fondy priamo" },
              };
              const l = labels[key];
              return (
                <button
                  key={key}
                  type="button"
                  className={`pr-prov${prov === key ? " pr-prov--active" : ""}`}
                  onClick={() => setProv(key)}
                >
                  <i>{l.icon}</i>
                  <strong>{l.title}</strong>
                  <span>{l.sub}</span>
                </button>
              );
            })}
          </div>

          {taxOn && (
            <div className="pr-tax-box">
              🧾 Pri fondoch banky ťa čaká pri predaji aj <strong>19&nbsp;% daň z výnosu</strong>.
              V tvojom prípade: <span className="pr-tax-val">{fmt(taxPaid)}</span>
            </div>
          )}

          {/* inputs */}
          <div className="pr-controls">
            <div className="pr-ctl">
              <label>💰 Koľko tam máš</label>
              <input
                type="number"
                value={v0}
                min={0}
                step={500}
                onChange={(e) => setV0(Math.max(0, +e.target.value || 0))}
              />
              <span className="pr-unit">EUR</span>
            </div>
            <div className="pr-ctl">
              <label>🔁 Koľko tam dávaš mesačne</label>
              <input
                type="number"
                value={monthly}
                min={0}
                step={50}
                onChange={(e) => setMonthly(Math.max(0, +e.target.value || 0))}
              />
              <span className="pr-unit">EUR&nbsp;/ mes.</span>
            </div>
            <div className="pr-ctl pr-ctl--wide">
              <label className="pr-slider-label">
                Ako dlho ešte plánuješ investovať
                <output>{years}&nbsp;rokov</output>
              </label>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(+e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DARK RESULTS SECTION ═══ */}
      <section className="pr-sec pr-sec--dark">
        <div className="pr-in">
          <span className="pr-pill pr-pill--red">☠️ Výsledok röntgenu</span>

          <div className="pr-xray-num">{fmt(Math.abs(diff))}</div>
          <div className="pr-xray-cap">o toľko prichádzaš za {years}&nbsp;rokov</div>
          <p className="pr-xray-sub">
            Pri vklade <strong>{fmt(v0)}</strong> + <strong>{fmt(monthly)}&nbsp;mesačne</strong> si
            poplatky{taxOn ? " a daň" : ""} vezmú{" "}
            <strong>{fmtPct(Math.max(0, eaten))} z tvojho možného zisku</strong>.
          </p>

          {/* VS cards */}
          <div className="pr-versus">
            <div className="pr-vcard pr-vcard--good">
              <span className="pr-tag pr-tag--good">Lepšie riešenie</span>
              <div className="pr-vcard-nm">📊 Nízkonákladové ETF portfólio</div>
              <div className="pr-vcard-big pr-vcard-big--green">{fmt(E.end)}</div>
              <div className="pr-vcard-sm">
                poplatky spolu <strong>{fmt(E.fees)}</strong> · daň pri predaji{" "}
                <strong>0&nbsp;€</strong> (časový test)
                <br />
                ročný poplatok: <strong>0,35&nbsp;%</strong>
              </div>
            </div>
            <div className="pr-vs-mid">
              <div className="pr-vs-circle">VS</div>
            </div>
            <div className="pr-vcard pr-vcard--bad">
              <span className="pr-tag pr-tag--bad">Tvoje súčasné</span>
              <div className="pr-vcard-nm">{PROVIDERS[prov].name}</div>
              <div className="pr-vcard-big">{fmt(fEndNet)}</div>
              <div className="pr-vcard-sm">
                poplatky spolu <strong>{fmt(F.fees)}</strong>
                {taxOn ? (
                  <>
                    {" "}· daň z výnosu 19&nbsp;% <strong>{fmt(taxPaid)}</strong>
                  </>
                ) : null}
                <br />
                priemerný ročný poplatok:{" "}
                <strong>
                  {PROVIDERS[prov].ter.toLocaleString("sk-SK", { minimumFractionDigits: 2 })}&nbsp;%
                </strong>
              </div>
            </div>
          </div>

          {/* chart */}
          <div className="pr-chart-card">
            <div className="pr-chart-head">
              <span>📉 Ako sa nožnice roztvárajú</span>
              <span className="pr-chart-sub">prejdi prstom po grafe</span>
            </div>

            <div
              className="pr-chart-wrap"
              ref={chartWrapRef}
              onMouseMove={(e) => onMove(e.clientX, e.clientY)}
              onMouseLeave={onLeave}
              onTouchMove={(e) => {
                e.preventDefault();
                onMove(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={onLeave}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="pr-chart-svg"
                aria-hidden
              >
                {gridLines}
                {xLabels}

                {/* area between lines */}
                <path d={toArea(sA, sB, maxV)} fill="rgba(217,96,75,.18)" />

                {/* fund line */}
                <path
                  d={toPath(sB, maxV)}
                  fill="none"
                  stroke="#D9604B"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
                {/* ETF line */}
                <path
                  d={toPath(sA, maxV)}
                  fill="none"
                  stroke="#5BC78A"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />

                {/* hover cursor */}
                {tip !== null && (
                  <>
                    <line
                      x1={cursorX}
                      x2={cursorX}
                      y1={PAD.t}
                      y2={H - PAD.b}
                      stroke="rgba(245,237,224,.3)"
                      strokeWidth={1}
                    />
                    <circle
                      cx={cursorX}
                      cy={cy(sA[tip.i], maxV)}
                      r={5}
                      fill="#5BC78A"
                      stroke="#111210"
                      strokeWidth={2}
                    />
                    <circle
                      cx={cursorX}
                      cy={cy(sB[tip.i], maxV)}
                      r={5}
                      fill="#D9604B"
                      stroke="#111210"
                      strokeWidth={2}
                    />
                  </>
                )}
              </svg>

              {/* tooltip */}
              {tip !== null && (
                <div
                  className="pr-tooltip"
                  style={{
                    left: tip.x > (chartWrapRef.current?.offsetWidth ?? 0) - 200
                      ? tip.x - 190
                      : tip.x + 16,
                    top: Math.max(0, tip.y - 70),
                  }}
                >
                  <div className="pr-tt-d">
                    {tip.i === 0 ? "dnes" : `o ${tip.i} r.`}
                  </div>
                  <div className="pr-tt-green">● ETF: {fmt(sA[tip.i])}</div>
                  <div className="pr-tt-red">● Fond: {fmt(sB[tip.i])}</div>
                  <div className="pr-tt-amber">Δ {fmt(sA[tip.i] - sB[tip.i])}</div>
                </div>
              )}
            </div>

            <div className="pr-ch-leg">
              <span>
                <i className="pr-leg-dot" style={{ background: "#5BC78A" }} />
                Nízkonákladové ETF portfólio
              </span>
              <span>
                <i className="pr-leg-dot" style={{ background: "#D9604B" }} />
                Tvoje súčasné investovanie
              </span>
              <span>
                <i className="pr-leg-area" style={{ background: "#D9604B" }} />
                medzera = tvoja strata
              </span>
            </div>
          </div>

          <div className="pr-why-box">
            <strong>Prečo to robí taký rozdiel?</strong> Poplatok sa strháva každý rok z{" "}
            <strong>celej hodnoty</strong> portfólia — nielen z toho, čo si vložil. A každé euro,
            ktoré odíde na poplatkoch, ti zároveň prestane zarábať. Strata sa tak úročí rovnako ako
            majetok — z pár percent ročne vyrastú za 20 rokov desaťtisíce eur.
          </div>

          <a
            className="pr-btn"
            href={RONTGEN_WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chcem AUDIT svojho portfólia 🚀
          </a>
          <span className="pr-micro">Priprav si svoje portfólio — audit dostaneš zadarmo</span>
        </div>
      </section>

      {/* ═══ FOOTER NOTE ═══ */}
      <footer className="pr-foot">
        <div className="pr-in pr-foot-text">
          Modelový prepočet: porovnávame dynamické (akciové) investície — oba varianty rastú
          rovnakým hrubým výnosom 10&nbsp;% ročne (historický priemer akciových trhov), líšia sa
          ročnými poplatkami aplikovanými mesačne (1/12 ročnej sadzby) na aktuálnu hodnotu:
          nízkonákladové ETF portfólio 0,35&nbsp;% p.a.; fondy banky 2,5&nbsp;% p.a.; fondy cez
          poradcu 1,0&nbsp;% p.a.; fondy správcovskej spoločnosti 1,2&nbsp;% p.a. (typické
          hodnoty). Pri fondoch banky je zohľadnená 19&nbsp;% daň z výnosu pri predaji; ETF
          obchodované na burze sú po viac ako 1&nbsp;roku držania od dane oslobodené (časový
          test). Graf zobrazuje hodnotu po zdanení pri predaji v danom roku. Nejde o investičné
          ani daňové odporúčanie.
        </div>
      </footer>
    </div>
  );
}

import { useState, useMemo, useRef, useEffect } from "react";
import "./bytovy-semafor.css";
import { BONUSY_CTA_LABEL, KONZULTACIA_URL } from "@/pages/kalkulacky/kalkulackyConfig";

// ── types ──
interface Answer {
  t: string;
  e: string;
  p: number;
  flag?: boolean;
  shock?: boolean;
  tip?: string;
}
interface Question {
  c: keyof typeof CATS;
  q: string;
  a: Answer[];
  calc?: boolean;
}
type Phase = "intro" | "quiz" | "result";
type CatKey = "L" | "C" | "D" | "S";

// ── data ──
const CATS: Record<CatKey, string> = {
  L: "📍 Lokalita a dopyt",
  C: "🏦 Čísla a banka",
  D: "📄 Dane a zmluvy",
  S: "🏠 Stav a riziká",
};

const Q: Question[] = [
  /* ── LOKALITA A DOPYT ── */
  {
    c: "L", q: "Kde sa byt nachádza?",
    a: [
      { t: "Krajské alebo silné okresné mesto, kam sa ľudia sťahujú", e: "🏙️", p: 2 },
      { t: "Menšie okresné mesto so stabilným dopytom", e: "🏘️", p: 1 },
      { t: "Lokalita, odkiaľ ľudia skôr odchádzajú", e: "📉", p: 0,
        tip: "<b>Lokalita je 50\u00a0% investície.</b> Klesajúci počet obyvateľov\u00a0= klesajúci dopyt po nájme aj horší predaj. Preveruj demografiu obce za posledných 10 rokov." },
    ],
  },
  {
    c: "L", q: "Čo je od bytu v pešej dostupnosti?",
    a: [
      { t: "Obchody, škola/škôlka, MHD aj lekár", e: "✅", p: 2 },
      { t: "Niečo z toho — zvyšok autom", e: "🚗", p: 1,
        tip: "<b>Vybavenosť rozhoduje o nájomníkovi.</b> Čím menej je pešo, tým užší okruh záujemcov\u00a0— rátaj s dlhšou neobsadenosťou." },
      { t: "Bez auta sa odtiaľ nepohneš", e: "🛣️", p: 0,
        tip: "<b>Byt bez vybavenosti\u00a0= byt pre úzku skupinu.</b> Rodiny s deťmi a seniori ti vypadnú z cieľovky. Zváž, či cena tento hendikep naozaj kompenzuje." },
    ],
  },
  {
    c: "L", q: "Ako rýchlo sa v lokalite prenajímajú podobné byty?",
    a: [
      { t: "Inzeráty miznú do pár dní", e: "⚡", p: 2 },
      { t: "Do mesiaca sa prenajme", e: "📆", p: 1 },
      { t: "Neviem / inzeráty visia dlho", e: "🤷", p: 0,
        tip: "<b>Toto si over PRED kúpou, nie po nej.</b> 30 minút na nehnutelnosti.sk: koľko podobných bytov je na prenájom a ako dlho visia. Veľa a dlho\u00a0= tvoj nájom bude pod tlakom." },
    ],
  },
  {
    c: "L", q: "Kto presne bude tvoj nájomník?",
    a: [
      { t: "Viem presne (rodina / pár / študenti…) a byt tomu sedí", e: "🎯", p: 2 },
      { t: "Zhruba tuším", e: "🤔", p: 1,
        tip: '<b>&bdquo;Niekto sa nájde&rdquo; nie je stratégia.</b> Cieľový nájomník určuje dispozíciu, zariadenie, výšku nájmu aj fluktuáciu. Definuj si ho pred kúpou\u00a0— nie po treťom neúspešnom inzeráte.' },
      { t: "Nepremýšľal som nad tým", e: "😶", p: 0, shock: true,
        tip: "<b>Byt bez cieľovky\u00a0= všetko nastavené naslepo.</b> Iný byt kupuješ pre študentov, iný pre rodinu s deťmi. Od toho sa odvíja lokalita, dispozícia, zariadenie aj zmluva." },
    ],
  },
  /* ── ČÍSLA A BANKA ── */
  {
    c: "C", q: "Ako je byt nacenený oproti porovnateľným v okolí?",
    a: [
      { t: "Na priemere alebo pod ním", e: "🎯", p: 2 },
      { t: "Mierne nad (do +10\u00a0%)", e: "📈", p: 1,
        tip: "<b>Mierne nad trhom sa dá vyjednať.</b> Priprav si 3–5 porovnateľných inzerátov a pýtaj zľavu\u00a0— predávajúci dnes čakajú vyjednávanie." },
      { t: "Výrazne nad / neporovnával som", e: "❓", p: 0,
        tip: "<b>Bez porovnania kupuješ naslepo.</b> Minimálne 5 porovnateľných bytov (rovnaká lokalita, výmera, stav) a prepočet na €/m². Preplatenie pri kúpe ti žiadny rast trhu nevráti rýchlo." },
    ],
  },
  {
    c: "C", q: "Aký je hrubý ročný výnos z nájmu?", calc: true,
    a: [
      { t: "Nad 4,5\u00a0%", e: "💪", p: 2 },
      { t: "3,5\u00a0–\u00a04,5\u00a0%", e: "🆗", p: 1,
        tip: "<b>Priemerný výnos\u00a0— rozhoduje rast hodnoty.</b> Pri 3,5–4,5\u00a0% ťa živí hlavne zhodnotenie. O to viac musí sedieť lokalita a cena pri kúpe." },
      { t: "Pod 3,5\u00a0% / nerátal som", e: "🚨", p: 0,
        tip: "<b>Pod 3,5\u00a0% je nájom slabý vankúš.</b> Prepočítaj si: nájom × 11 ÷ cena. Ak nevychádza, buď je byt drahý, alebo nájom v lokalite nízky\u00a0— oboje je signál." },
    ],
  },
  {
    c: "C", q: "Ako vyjde mesačný cashflow? (nájom − splátka − náklady)",
    a: [
      { t: "Plus alebo okolo nuly", e: "✅", p: 2 },
      { t: "Mierny mínus, ktorý bez problémov utiahnem", e: "🟡", p: 1,
        tip: "<b>Mínusový cashflow nie je automaticky zlý</b>\u00a0— ale musí byť plánovaný a krytý príjmom. Spočítaj si, koľko ťa byt bude stáť mesačne najbližších 5 rokov." },
      { t: "Veľký mínus / vôbec neviem", e: "🚩", p: 0, flag: true,
        tip: "<b>🚩 Toto je stopka.</b> Kupovať byt bez prepočtu cashflow je hazard, nie investícia. Splátka\u00a0+ fond opráv\u00a0+ poistenie\u00a0+ daň\u00a0+ neobsadenosť\u00a0— všetko na papier, až potom rezervačka." },
    ],
  },
  {
    c: "C", q: "Aká ti zostane rezerva po kúpe?",
    a: [
      { t: "6+ mesiacov splátok + rezerva na opravy", e: "🛡️", p: 2 },
      { t: "3\u00a0–\u00a06 mesiacov splátok", e: "🟡", p: 1,
        tip: "<b>Rezervu dobuduj čo najskôr.</b> Pokazený kotol a 2 mesiace bez nájomníka prídu vždy naraz\u00a0— cieľ je 6 mesiacov splátok bokom." },
      { t: "Idem nadoraz", e: "🚩", p: 0, flag: true,
        tip: "<b>🚩 Nadoraz sa byty nekupujú.</b> Prvá neplánovaná udalosť ťa dotlačí k panickému predaju alebo k úveru na úver. Radšej menší byt, neskorší termín, alebo vyšší vlastný vklad." },
    ],
  },
  {
    c: "C", q: "Vieš, koľko\u00a0% z budúceho nájmu ti banka reálne uzná do príjmu, keď pôjdeš po ďalšiu hypotéku?",
    a: [
      { t: "Viem\u00a0— mám to prepočítané pre konkrétne banky", e: "🧮", p: 2 },
      { t: "Tuším, že nie celý nájom", e: "🤔", p: 1,
        tip: "<b>Každá banka uznáva iné\u00a0% z nájmu</b>\u00a0— a niektoré nič, kým nemáš zmluvu a históriu príjmu. Ak plánuješ byt č.\u00a02, toto číslo rozhoduje o tvojej úverovej kapacite." },
      { t: "Počkať… banka mi neuzná celý nájom?! 😳", e: "😳", p: 0, shock: true,
        tip: "<b>Presne tak\u00a0— a rozdiely medzi bankami sú obrovské.</b> Zle zvolená prvá banka ti vie zavrieť dvere k druhému bytu. Poradie a výber bánk je stratégia, nie detail." },
    ],
  },
  {
    c: "C", q: "Vieš, že pri druhej hypotéke ti banka môže na investičný byt skrátiť splatnosť — a čo to spraví so splátkou?",
    a: [
      { t: "Viem a mám to zarátané v cashflow", e: "✅", p: 2 },
      { t: "Netušil som, ale vyššiu splátku utiahnem", e: "🟡", p: 1,
        tip: "<b>Kratšia splatnosť\u00a0= vyššia splátka\u00a0= úplne iný cashflow.</b> Prepočítaj si scenár s 20-ročnou splatnosťou namiesto 30\u00a0— nech ťa to neprekvapí pri schvaľovaní." },
      { t: "Prvýkrát počujem 😳", e: "😳", p: 0, shock: true,
        tip: "<b>Niektoré banky dávajú na ďalší (investičný) byt kratšiu splatnosť</b>\u00a0— a tvoja splátka skočí o desiatky percent oproti tomu, čo máš v exceli. Podmienky sa medzi bankami líšia a menia\u00a0— presné čísla pre tvoju situáciu si over vopred." },
    ],
  },
  /* ── DANE A ZMLUVY ── */
  {
    c: "D", q: "Obchodný majetok: vieš, čo spraví zaradenie bytu do obchodného majetku s tvojimi daňami — pri prenájme AJ pri predaji?",
    a: [
      { t: "Viem presne a rozhodol som sa vedome", e: "🧠", p: 2 },
      { t: "Počul som niečo o odpisoch…", e: "🤔", p: 1,
        tip: "<b>Toto rozhodnutie má dve strany.</b> Zaradenie ti otvára uplatnenie nákladov (úroky, odpisy) z nájmu\u00a0— ale mení pravidlá zdanenia pri predaji. Polovičná informácia je tu drahšia ako žiadna." },
      { t: "Kokos… čo je obchodný majetok? 😳", e: "😳", p: 0, shock: true,
        tip: "<b>Jedno rozhodnutie PRED prenájmom\u00a0— dopad v tisícoch eur.</b> Ovplyvňuje, či si z nájmu uplatníš úroky z hypotéky a odpisy, a zároveň či a kedy zaplatíš daň pri predaji bytu. Urobiť ho treba vedome a na tvoje čísla." },
    ],
  },
  {
    c: "D", q: "Nájomná zmluva: vieš, v akom právnom režime ju podpísať, aby si vedel neplatiča reálne dostať z bytu?",
    a: [
      { t: "Áno\u00a0— krátkodobý nájom mám podchytený", e: "📄", p: 2 },
      { t: "Stiahnem si vzor z internetu", e: "🖨️", p: 1,
        tip: "<b>Vzor z internetu nevie, čo chceš chrániť.</b> Režim zmluvy, kaucia, výpovedné podmienky, protokol\u00a0— rozdiel medzi dobrou a zlou zmluvou je rozdiel medzi mesiacom a rokom problémov." },
      { t: "Zmluva ako zmluva, nie? 😬", e: "😬", p: 0, shock: true,
        tip: "<b>Nie.</b> Zle postavená zmluva\u00a0= nájomník, ktorý neplatí a býva u teba mesiace, kým ty platíš hypotéku. Ochrana prenajímateľa sa buduje v zmluve PRED odovzdaním kľúčov." },
    ],
  },
  {
    c: "D", q: "Čo hovorí list vlastníctva?",
    a: [
      { t: "Čistý\u00a0— bez tiarch, exekúcií a bremien", e: "📄", p: 2 },
      { t: "Ťarcha banky predávajúceho (bežný štandard)", e: "🏦", p: 1 },
      { t: "Iné ťarchy / vecné bremená / nepozeral som", e: "🚩", p: 0, flag: true,
        tip: "<b>🚩 LV je prvá vec, ktorú otváraš\u00a0— a je zadarmo na katasterportal.sk.</b> Exekúcie, bremená dožitia, predkupné práva\u00a0— toto ti vie zablokovať byt na roky. Pri čomkoľvek nejasnom právnik, nie maklér." },
    ],
  },
  /* ── STAV A RIZIKÁ ── */
  {
    c: "S", q: "V akom stave je samotný byt?",
    a: [
      { t: "Po rekonštrukcii / novostavba", e: "✨", p: 2 },
      { t: "Obývateľný, stačí kozmetika", e: "🖌️", p: 1 },
      { t: "Potrebuje kompletnú rekonštrukciu", e: "🔨", p: 0,
        tip: "<b>Rekonštrukcia nie je problém\u00a0— nenacenená rekonštrukcia áno.</b> Polož si strop (€/m²), pridaj 20\u00a0% rezervu a odpočítaj to od kúpnej ceny pri vyjednávaní." },
    ],
  },
  {
    c: "S", q: "Rezervačná zmluva s realitkou: vieš, čo podpisuješ a kedy ti prepadne záloha?",
    a: [
      { t: "Čítam a upravujem podmienky pred podpisom", e: "🧐", p: 2 },
      { t: "Prebehnem ju očami", e: "👀", p: 1,
        tip: "<b>Rezervačka je často najtvrdší dokument celého obchodu.</b> Prepadnutie zálohy, sankcie, termíny\u00a0— než podpíšeš, vedz presne, za akých podmienok dostaneš peniaze späť." },
      { t: "Veď je to len rezervácia 😅", e: "😅", p: 0, shock: true,
        tip: '<b>&bdquo;Len rezervácia&rdquo; s prepadnuteľnou zálohou v tisícoch eur.</b> Ak ti nevyjde hypotéka alebo znalecký posudok a zmluva s tým neráta, záloha je preč. Podmienky vrátenia si daj do zmluvy PRED podpisom.' },
    ],
  },
];

const MAX_SCORE = Q.length * 2;

// ── helpers ──
function calcYield(rent: number, price: number): number {
  return (rent * 11) / price * 100;
}

// ── component ──
export default function BytovySemaforCalculator() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [mcRent, setMcRent] = useState("");
  const [mcPrice, setMcPrice] = useState("");

  const topRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startQuiz = () => {
    setAnswers([]);
    setIdx(0);
    setMcRent("");
    setMcPrice("");
    setPhase("quiz");
    scrollUp();
  };

  const handleAnswer = (ai: number) => {
    const next = idx + 1;
    if (next < Q.length) {
      setAnswers((prev) => { const a = [...prev]; a[idx] = ai; return a; });
      setIdx(next);
      setMcRent("");
      setMcPrice("");
      scrollUp();
    } else {
      setAnswers((prev) => { const a = [...prev]; a[idx] = ai; return a; });
      setPhase("result");
      scrollUp();
    }
  };

  const goBack = () => {
    if (idx > 0) {
      setIdx((i) => i - 1);
      setMcRent("");
      setMcPrice("");
      scrollUp();
    }
  };

  const restart = () => {
    startQuiz();
  };

  // ── result computation ──
  const result = useMemo(() => {
    if (phase !== "result" || answers.length < Q.length) return null;

    let score = 0;
    let flags = 0;
    let shocks = 0;
    const catScore: Partial<Record<CatKey, number>> = {};
    const catMax: Partial<Record<CatKey, number>> = {};
    const tips: { tip: string; flag: boolean }[] = [];

    Q.forEach((q, qi) => {
      const a = q.a[answers[qi]];
      if (!a) return;
      score += a.p;
      catScore[q.c] = (catScore[q.c] ?? 0) + a.p;
      catMax[q.c] = (catMax[q.c] ?? 0) + 2;
      if (a.flag) flags++;
      if (a.shock) shocks++;
      if (a.tip) tips.push({ tip: a.tip, flag: !!a.flag });
    });

    let worstCat: CatKey | null = null;
    let worstR = 1;
    (Object.keys(CATS) as CatKey[]).forEach((c) => {
      const r = (catScore[c] ?? 0) / (catMax[c] ?? 1);
      if (r < worstR) { worstR = r; worstCat = c; }
    });

    const p = score / MAX_SCORE;
    let cls: "g" | "a" | "r";
    let emo: string;
    let txt: string;
    if (flags >= 2 || p < 0.55) { cls = "r"; emo = "🔴"; txt = "Stop. Takto nie."; }
    else if (flags === 1 || p < 0.8) { cls = "a"; emo = "🟡"; txt = "Pozor. Najprv dorataj."; }
    else { cls = "g"; emo = "🟢"; txt = "Zelená. Vyzerá to dobre."; }

    const worstName = worstCat ? CATS[worstCat as CatKey] : "";
    let reco = "";
    if (cls === "g") {
      reco = `Byt vyzerá zdravo a ty pripravene\u00a0— to je vzácna kombinácia. Najslabšie ti vyšla oblasť <b>${worstName}</b>, tak ju ešte raz prejdi s chladnou hlavou. Ak čísla sedia aj na papieri, konaj\u00a0— dobré byty nečakajú. A ak chceš mať istotu pred podpisom, <b>využi konzultáciu zadarmo s Ivanom</b>\u00a0— prejdeme byt číslo po čísle.`;
    } else if (cls === "a") {
      reco = `Tento byt sa kúpiť dá\u00a0— ale nie zajtra a nie takto. Najväčšiu dieru máš v oblasti <b>${worstName}</b>. Nepodpisuj rezervačku, kým si nedoplníš odpovede nižšie; každá z nich je lacnejšia teraz ako po podpise. Najrýchlejšia cesta? <b>Využi konzultáciu zadarmo s Ivanom</b>\u00a0— za 45 minút z toho spravíme jasné áno alebo jasné nie.`;
    } else {
      reco = `Zastav sa. V tomto stave nekupuješ investíciu, ale riziko\u00a0— najhoršie vychádza oblasť <b>${worstName}</b>${flags ? ` a máš na stole ${flags === 1 ? "červenú vlajku" : "červené vlajky"}, z ktorých každá vie pochovať celý obchod` : ""}. Nič nepodpisuj a neplať zálohu. Buď tento byt, alebo tvoja príprava potrebuje prerobiť od základov\u00a0— <b>využi konzultáciu zadarmo s Ivanom</b> a nastavíme to nanovo, skôr než ťa to bude stáť peniaze.`;
    }

    tips.sort((a, b) => Number(b.flag) - Number(a.flag));

    return { score, flags, shocks, catScore, catMax, p, cls, emo, txt, reco, worstName, tips };
  }, [phase, answers]);

  // ── mini-calc derived ──
  const yieldValue = mcRent && mcPrice
    ? calcYield(Number(mcRent), Number(mcPrice))
    : null;
  const suggestedAns = yieldValue !== null
    ? yieldValue > 4.5 ? 0 : yieldValue >= 3.5 ? 1 : 2
    : null;

  const q = Q[idx];

  return (
    <div className="bys-root" ref={topRef}>
      {/* ═══ INTRO ═══ */}
      {phase === "intro" && (
        <section className="bys-sec bys-sec--intro">
          <div className="bys-in">
            <span className="bys-pill">Bytový semafor 🚦</span>
            <h1 className="bys-h1">
              Oplatí sa ti<br />
              ten byt <em>kúpiť</em>?
            </h1>
            <p className="bys-sub">
              15 otázok, 3 minúty. Niektoré si si možno nikdy nepoložil — a presne tie ťa môžu
              stáť najviac peňazí. Lokalita, čísla, banka, dane, zmluvy.
            </p>
            <div className="bys-lights">
              <span>🔴</span><span>🟡</span><span>🟢</span>
            </div>
            <button type="button" className="bys-btn" onClick={startQuiz}>
              Spustiť semafor 🚦
            </button>
            <span className="bys-micro">zadarmo · bez e-mailu · výsledok hneď</span>
          </div>
        </section>
      )}

      {/* ═══ KVÍZ ═══ */}
      {phase === "quiz" && q && (
        <section className="bys-sec bys-sec--dark">
          <div className="bys-qwrap">
            {/* progress */}
            <div className="bys-progress">
              <i style={{ width: `${(idx / Q.length) * 100}%` }} />
            </div>
            <div className="bys-pmeta">
              <span>Otázka <strong>{idx + 1}</strong> / {Q.length}</span>
              <span>{CATS[q.c]}</span>
            </div>

            {/* question card */}
            <div className="bys-qcard" key={idx}>
              <div className="bys-qcat">{CATS[q.c]}</div>
              <div className="bys-qtxt">{q.q}</div>

              {/* mini calculator (Q6 — yield) */}
              {q.calc && (
                <div className="bys-mini-calc">
                  <div className="bys-mc-row">
                    <div className="bys-mc-field">
                      <label>Nájom / mes. (€)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="850"
                        value={mcRent}
                        onChange={(e) => setMcRent(e.target.value)}
                      />
                    </div>
                    <div className="bys-mc-field">
                      <label>Cena bytu (€)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="230 000"
                        value={mcPrice}
                        onChange={(e) => setMcPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="bys-mc-out">
                    {yieldValue !== null ? (
                      <>
                        Tvoj hrubý výnos:{" "}
                        <strong>
                          {yieldValue.toLocaleString("sk-SK", { maximumFractionDigits: 1 })}&nbsp;%
                        </strong>{" "}
                        ročne{" "}
                        <span>
                          ({Number(mcRent).toLocaleString("sk-SK")}&nbsp;€ × 11 ÷{" "}
                          {Number(mcPrice).toLocaleString("sk-SK")}&nbsp;€)
                        </span>
                        {" "}— klikni zvýraznenú odpoveď 👇
                      </>
                    ) : (
                      "Zadaj nájom a cenu — výnos ti vypočítam 👇"
                    )}
                  </div>
                </div>
              )}

              {/* answers */}
              <div className="bys-ans">
                {q.a.map((a, ai) => (
                  <button
                    key={ai}
                    type="button"
                    className={`bys-ans-btn${suggestedAns === ai ? " bys-ans-btn--suggest" : ""}`}
                    onClick={() => handleAnswer(ai)}
                  >
                    <i>{a.e}</i>
                    {a.t}
                  </button>
                ))}
              </div>

              {idx > 0 && (
                <button type="button" className="bys-back" onClick={goBack}>
                  ← Späť
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ VÝSLEDOK ═══ */}
      {phase === "result" && result && (
        <section className="bys-sec bys-sec--dark">
          <div className="bys-in">
            <span className="bys-pill">Tvoj výsledok</span>

            {/* semaphore */}
            <div className={`bys-sem bys-sem--${result.cls}`}>{result.emo}</div>
            <div className={`bys-verdict bys-verdict--${result.cls}`}>{result.txt}</div>
            <div className="bys-score">
              Skóre: {result.score} / {MAX_SCORE} bodov ({Math.round(result.p * 100)}&nbsp;%)
            </div>

            {result.flags > 0 && (
              <div className="bys-flags">
                🚩{" "}
                {result.flags === 1
                  ? "1 červená vlajka — tá sama o sebe sťahuje semafor dole"
                  : `${result.flags} červené vlajky — každá z nich je dôvod zastaviť kúpu`}
              </div>
            )}

            {/* shock box */}
            {result.shocks > 0 && (
              <div className="bys-shock">
                <div className="bys-shock-big">
                  Zaskočilo ťa{" "}
                  <em>
                    {result.shocks === 1
                      ? "1 otázka"
                      : result.shocks < 5
                        ? `${result.shocks} otázky`
                        : `${result.shocks} otázok`}
                  </em>{" "}
                  😳
                </div>
                <p>
                  Presne tieto veci treba vyriešiť <strong>PRED kúpou</strong> — po podpise sa
                  už väčšina z nich opraviť nedá.
                </p>
              </div>
            )}

            {/* recommendation */}
            <div className={`bys-reco bys-reco--${result.cls}`}>
              <div className="bys-reco-lbl">Odporúčanie</div>
              <p dangerouslySetInnerHTML={{ __html: result.reco }} />
            </div>

            {/* category bars */}
            <div className="bys-cats">
              {(Object.keys(CATS) as CatKey[]).map((c) => {
                const sc = result.catScore[c] ?? 0;
                const mx = result.catMax[c] ?? 1;
                const r = sc / mx;
                const color = r >= 0.8 ? "var(--bys-green-glow)" : r >= 0.55 ? "var(--bys-amber)" : "var(--bys-red)";
                return (
                  <div className="bys-cat" key={c}>
                    <div className="bys-cat-top">
                      <span>{CATS[c]}</span>
                      <span>{sc} / {mx}</span>
                    </div>
                    <div className="bys-cat-bar">
                      <i style={{ width: `${r * 100}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* tips */}
            <div className="bys-tips">
              <h3>Čo s tým 👇</h3>
              {result.tips.length > 0 ? (
                result.tips.map((t, i) => (
                  <div key={i} className="bys-tip">
                    <i>{t.flag ? "🚩" : "💡"}</i>
                    <span dangerouslySetInnerHTML={{ __html: t.tip }} />
                  </div>
                ))
              ) : (
                <div className="bys-tip bys-tip--ok">
                  <i>👏</i>
                  <span>
                    <strong>Plný počet — klobúk dole.</strong> Buď máš pred sebou výborný byt a
                    si pripravený, alebo si bol na seba mierny. Over si odpovede s chladnou
                    hlavou — a potom konaj, takéto byty nečakajú.
                  </span>
                </div>
              )}
              <div className="bys-tip bys-tip--cta">
                <i>💬</i>
                <span>
                  <strong>A pri každom bode vyššie platí:</strong> nemusíš to lúskať sám.
                  Využi konzultáciu zadarmo s Ivanom — 45 minút, online, prejdeme tvoj byt
                  aj tvoje čísla.
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              className="bys-btn"
              href={KONZULTACIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="click_konzultacia"
              data-umami-event-section="bytovy-semafor"
            >
              {BONUSY_CTA_LABEL}
            </a>
            <span className="bys-micro bys-micro--light">
              45 minút · zadarmo · online
            </span>

            <div>
              <button type="button" className="bys-btn bys-btn--ghost" onClick={restart}>
                ↺ Vyhodnotiť iný byt
              </button>
            </div>
          </div>
        </section>
      )}

      {/* footer */}
      <footer className="bys-foot">
        <div className="bys-in bys-foot-text">
          Bytový semafor je orientačný nástroj. Daňové, bankové a právne dopady závisia od
          tvojej konkrétnej situácie a aktuálnych podmienok — preto ich preberáme individuálne.
          Nenahrádza právnu previerku, technickú obhliadku ani daňové poradenstvo. Nejde o
          investičné odporúčanie.
        </div>
      </footer>
    </div>
  );
}

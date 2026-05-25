import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type Data = {
  currentAge: number;
  retirementAge: number;
  desiredRent: number;
  rentDuration: number;
  interestRate: number;
  inflationRate: number;
  currentSavings: number;
  monthlyInvestment: number;
};
type Variant = { id: string; name: string; data: Data | null };

declare global {
  interface Window {
    mlSwitchVariant?: (id: string) => void;
    mlAddVariant?: () => void;
    mlRenameVariant?: (id: string) => void;
    mlDuplicateVariant?: (id: string) => void;
    mlDeleteVariant?: (id: string) => void;
    mlOpenComparison?: () => void;
    mlCloseComparison?: () => void;
    mlSendEmail?: () => void;
    mlDownloadPDF?: () => Promise<void>;
  }
}

export function mountRentovaCalculator(): () => void {
  let chartInstance: Chart | null = null;
  let variantCounter = 1;
  let activeVariantId = "v1";
  let variants: Variant[] = [{ id: "v1", name: "Varianta 1", data: null }];

  const root = document.getElementById("rentova-calc-root");
  if (!root) return () => {};
  const compareModal = document.getElementById("ml-compare-modal");
  const compareTable = document.getElementById("ml-compare-table");
  const variantTabsEl = document.getElementById("ml-variant-tabs");
  const addVariantBtn = document.getElementById("ml-add-variant");
  const contentDiv = document.getElementById("ml-advanced-content");
  const arrowIcon = document.getElementById("ml-arrow-icon");

  const fmt = (v: number) =>
    new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number.isFinite(v) ? v : 0);
  const fmtP = (v: number, d = 1) => `${(Number(v) || 0).toFixed(d).replace(".", ",")} %`;
  const setTxt = (id: string, txt: string) => {
    const el = document.getElementById("ml-" + id);
    if (el) el.textContent = txt;
  };
  const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

  const sanitize = (x: Partial<Data>): Data => {
    const n = (v: unknown, fb: number) => (Number.isFinite(Number(v)) ? Number(v) : fb);
    return {
      currentAge: Math.max(0, Math.round(n(x.currentAge, 35))),
      retirementAge: Math.max(1, Math.round(n(x.retirementAge, 65))),
      desiredRent: Math.max(0, n(x.desiredRent, 1500)),
      rentDuration: Math.max(5, Math.min(40, Math.round(n(x.rentDuration, 25)))),
      interestRate: n(x.interestRate, 7),
      inflationRate: n(x.inflationRate, 2.5),
      currentSavings: Math.max(0, n(x.currentSavings, 0)),
      monthlyInvestment: Math.max(0, n(x.monthlyInvestment, 200)),
    };
  };
  const getForm = (): Data => {
    const g = (id: string) => parseFloat((document.getElementById("ml-" + id) as HTMLInputElement | null)?.value || "0") || 0;
    return sanitize({
      currentAge: g("currentAge"),
      retirementAge: g("retirementAge"),
      desiredRent: g("desiredRent"),
      rentDuration: g("rentDuration"),
      interestRate: g("interestRate"),
      inflationRate: g("inflationRate"),
      currentSavings: g("currentSavings"),
      monthlyInvestment: g("monthlyInvestment"),
    });
  };
  const setForm = (d: Data) => {
    const s = sanitize(d);
    const set = (id: string, v: number) => {
      const el = document.getElementById("ml-" + id) as HTMLInputElement | null;
      if (el) el.value = String(v);
    };
    set("currentAge", s.currentAge);
    set("retirementAge", s.retirementAge);
    set("desiredRent", s.desiredRent);
    set("rentDuration", s.rentDuration);
    set("interestRate", s.interestRate);
    set("inflationRate", s.inflationRate);
    set("currentSavings", s.currentSavings);
    set("monthlyInvestment", s.monthlyInvestment);
  };
  const active = () => variants.find((v) => v.id === activeVariantId) || variants[0];
  const save = () => {
    active().data = getForm();
  };

  const calcScenario = (raw: Data) => {
    const input = sanitize(raw);
    const yearsToRetirement = Math.max(0, input.retirementAge - input.currentAge);
    const valid = input.retirementAge > input.currentAge;
    if (!valid) {
      return { input, valid, labels: [] as number[], dataCapital: [] as number[], requiredCapital: 0, projectedCapital: 0, futureMonthlyRent: 0, capitalGap: 0, monthlyGap: 0, percentage: 0 };
    }
    const monthsToRetirement = yearsToRetirement * 12;
    const monthsDuration = input.rentDuration * 12;
    const interestRate = input.interestRate / 100;
    const inflationRate = input.inflationRate / 100;
    const futureMonthlyRent = input.desiredRent * Math.pow(1 + inflationRate, yearsToRetirement);
    const realRate = (1 + interestRate) / (1 + inflationRate) - 1;
    const monthlyRealRate = realRate / 12;
    const requiredCapital =
      Math.abs(monthlyRealRate) < 1e-12
        ? futureMonthlyRent * monthsDuration
        : futureMonthlyRent * ((1 - Math.pow(1 + monthlyRealRate, -monthsDuration)) / monthlyRealRate);
    const monthlyInterestRate = interestRate / 12;
    const fvLumpSum = input.currentSavings * Math.pow(1 + monthlyInterestRate, monthsToRetirement);
    const fvMonthlyContrib =
      Math.abs(monthlyInterestRate) < 1e-12
        ? input.monthlyInvestment * monthsToRetirement
        : input.monthlyInvestment * ((Math.pow(1 + monthlyInterestRate, monthsToRetirement) - 1) / monthlyInterestRate);
    const projectedCapital = fvLumpSum + fvMonthlyContrib;
    const capitalGap = requiredCapital - projectedCapital;
    const monthlyGap =
      capitalGap > 0 && monthsToRetirement > 0
        ? Math.abs(monthlyInterestRate) < 1e-12
          ? capitalGap / monthsToRetirement
          : capitalGap * (monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, monthsToRetirement) - 1))
        : 0;
    const percentage = requiredCapital > 0 ? Math.min(100, Math.round((projectedCapital / requiredCapital) * 100)) : 100;

    const labels: number[] = [];
    const dataCapital: number[] = [];
    let capital = input.currentSavings;
    for (let i = 0; i <= yearsToRetirement; i++) {
      labels.push(input.currentAge + i);
      dataCapital.push(Math.max(0, capital));
      for (let m = 0; m < 12; m++) capital = capital * (1 + monthlyInterestRate) + input.monthlyInvestment;
    }
    let retirementCapital = dataCapital[dataCapital.length - 1] || 0;
    let annualRent = futureMonthlyRent * 12;
    for (let i = 1; i <= input.rentDuration; i++) {
      labels.push(input.retirementAge + i);
      retirementCapital = retirementCapital * (1 + interestRate) - annualRent;
      annualRent *= 1 + inflationRate;
      dataCapital.push(Math.max(0, retirementCapital));
    }
    return { input, valid, labels, dataCapital, requiredCapital, projectedCapital, futureMonthlyRent, capitalGap, monthlyGap, percentage };
  };

  const updateChart = (s: ReturnType<typeof calcScenario>) => {
    const canvas = document.getElementById("ml-rentChart") as HTMLCanvasElement | null;
    if (!canvas) return;
    chartInstance?.destroy();
    chartInstance = null;
    if (!s.valid) return;
    chartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: s.labels,
        datasets: [
          {
            label: "Majetok",
            data: s.dataCapital,
            borderColor: "#111111",
            backgroundColor: "rgba(17,17,17,0.05)",
            borderWidth: 2,
            pointBackgroundColor: "#7f735a",
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
    });
  };

  const updateUI = (s: ReturnType<typeof calcScenario>) => {
    setTxt("durationVal", `${s.input.rentDuration} rokov`);
    setTxt("roiDisplay", `${s.input.interestRate.toFixed(1)}%`);
    if (!s.valid) {
      setTxt("requiredCapital", fmt(0));
      setTxt("projectedCapital", fmt(0));
      setTxt("inflatedRentVal", fmt(0));
      setTxt("goalStatus", "0%");
      setTxt("monthlyGap", "Upravte veky");
      updateChart(s);
      return;
    }
    setTxt("requiredCapital", fmt(s.requiredCapital));
    setTxt("projectedCapital", fmt(s.projectedCapital));
    setTxt("inflatedRentVal", fmt(s.futureMonthlyRent));
    setTxt("goalStatus", `${s.percentage}%`);
    setTxt("monthlyGap", s.capitalGap > 0 ? `+ ${fmt(s.monthlyGap)}` : "Cieľ splnený");
    updateChart(s);
  };

  const calculate = () => {
    save();
    const s = calcScenario(active().data || getForm());
    updateUI(s);
    return s;
  };

  const allScenarios = () => {
    save();
    return variants.map((v) => ({ variant: v, scenario: calcScenario(v.data || getForm()) }));
  };

  const renderComparison = () => {
    if (!compareTable) return;
    const rows = allScenarios();
    let html = "<thead><tr><th>Ukazovateľ</th>";
    rows.forEach(({ variant }) => {
      html += `<th>${variant.name}</th>`;
    });
    html += "</tr></thead><tbody>";
    const defs: Array<[string, (s: ReturnType<typeof calcScenario>) => string]> = [
      ["Súčasný vek", (s) => `${s.input.currentAge}`],
      ["Vek odchodu", (s) => `${s.input.retirementAge}`],
      ["Doba poberania", (s) => `${s.input.rentDuration} rokov`],
      ["Mesačná renta", (s) => fmt(s.input.desiredRent)],
      ["Výnos", (s) => fmtP(s.input.interestRate, 1)],
      ["Inflácia", (s) => fmtP(s.input.inflationRate, 1)],
      ["Súčasné úspory", (s) => fmt(s.input.currentSavings)],
      ["Mesačná investícia", (s) => fmt(s.input.monthlyInvestment)],
      ["Cieľová suma", (s) => (s.valid ? fmt(s.requiredCapital) : "Neplatné veky")],
      ["Váš kapitál", (s) => (s.valid ? fmt(s.projectedCapital) : "—")],
      ["Stav cieľa", (s) => (s.valid ? `${s.percentage}%` : "—")],
      ["Mesačne chýba", (s) => (s.valid ? (s.capitalGap > 0 ? fmt(s.monthlyGap) : "0 €") : "—")],
    ];
    defs.forEach(([label, fn]) => {
      html += `<tr><td>${label}</td>`;
      rows.forEach(({ scenario }) => {
        html += `<td>${fn(scenario)}</td>`;
      });
      html += "</tr>";
    });
    html += "</tbody>";
    compareTable.innerHTML = html;
  };

  const renderTabs = () => {
    if (!variantTabsEl) return;
    variantTabsEl.innerHTML = "";
    variants.forEach((v) => {
      const wrap = document.createElement("div");
      wrap.className = "ml-dropdown";
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "ml-variant-tab " + (v.id === activeVariantId ? "active" : "inactive");
      tab.onclick = () => window.mlSwitchVariant?.(v.id);
      const label = document.createElement("span");
      label.innerText = v.name;
      tab.appendChild(label);
      const menuBtn = document.createElement("button");
      menuBtn.type = "button";
      menuBtn.innerHTML = "⋮";
      menuBtn.style.cssText = "background:none;border:none;cursor:pointer;padding:2px 4px;color:inherit;font-size:16px;line-height:1;";
      menuBtn.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll("#rentova-calc-root .ml-dropdown-menu").forEach((m) => {
          if (m.id === "ml-menu-" + v.id) m.classList.toggle("open");
          else m.classList.remove("open");
        });
      };
      tab.appendChild(menuBtn);
      const menu = document.createElement("div");
      menu.className = "ml-dropdown-menu";
      menu.id = "ml-menu-" + v.id;
      const item = (text: string, fn: () => void, danger = false) => {
        const i = document.createElement("div");
        i.className = "ml-dropdown-item" + (danger ? " danger" : "");
        i.textContent = text;
        i.onclick = (e) => {
          e.stopPropagation();
          fn();
        };
        menu.appendChild(i);
      };
      item("Premenovať", () => window.mlRenameVariant?.(v.id));
      item("Duplikovať", () => window.mlDuplicateVariant?.(v.id));
      if (variants.length > 1) item("Zmazať", () => window.mlDeleteVariant?.(v.id), true);
      wrap.appendChild(tab);
      wrap.appendChild(menu);
      variantTabsEl.appendChild(wrap);
    });
    if (addVariantBtn) addVariantBtn.style.display = variants.length >= 4 ? "none" : "";
  };

  window.mlSwitchVariant = (id) => {
    if (id === activeVariantId) return;
    save();
    activeVariantId = id;
    const v = active();
    setForm(v.data || getForm());
    renderTabs();
    calculate();
  };
  window.mlAddVariant = () => {
    save();
    if (variants.length >= 4) return alert("Maximálny počet variantov je 4.");
    variantCounter += 1;
    const base = clone(active().data || getForm());
    const nv = { id: "v" + variantCounter, name: "Varianta " + variantCounter, data: base };
    variants.push(nv);
    activeVariantId = nv.id;
    setForm(nv.data);
    renderTabs();
    calculate();
  };
  window.mlRenameVariant = (id) => {
    const v = variants.find((x) => x.id === id);
    if (!v) return;
    const n = prompt("Nový názov varianty:", v.name);
    if (!n || !n.trim()) return;
    v.name = n.trim();
    renderTabs();
  };
  window.mlDuplicateVariant = (id) => {
    if (variants.length >= 4) return alert("Maximálny počet variantov je 4.");
    save();
    const src = variants.find((x) => x.id === id);
    if (!src) return;
    variantCounter += 1;
    const nv = { id: "v" + variantCounter, name: src.name + " (kópia)", data: clone(src.data || getForm()) };
    variants.push(nv);
    activeVariantId = nv.id;
    setForm(nv.data);
    renderTabs();
    calculate();
  };
  window.mlDeleteVariant = (id) => {
    if (variants.length <= 1) return;
    if (!confirm("Zmazať túto variantu?")) return;
    const was = id === activeVariantId;
    variants = variants.filter((v) => v.id !== id);
    if (was) {
      activeVariantId = variants[0].id;
      setForm(variants[0].data || getForm());
    }
    renderTabs();
    calculate();
  };
  window.mlOpenComparison = () => {
    renderComparison();
    compareModal?.classList.add("open");
  };
  window.mlCloseComparison = () => compareModal?.classList.remove("open");
  window.mlSendEmail = () => {
    const s = calculate();
    const body = encodeURIComponent(
      `Rentová kalkulačka\n\nCieľová suma: ${fmt(s.requiredCapital)}\nVáš kapitál: ${fmt(s.projectedCapital)}\nStav cieľa: ${s.percentage}%\nMesačne chýba: ${s.capitalGap > 0 ? fmt(s.monthlyGap) : "0 €"}`,
    );
    window.location.href = `mailto:?subject=Rentová kalkulačka&body=${body}`;
  };
  window.mlDownloadPDF = async () => {
    const btn = document.getElementById("ml-btn-pdf") as HTMLButtonElement | null;
    if (!btn) return;
    if (btn.dataset.busy === "1") return;
    btn.dataset.busy = "1";
    const old = btn.innerHTML;
    btn.innerHTML = "Pripravujem PDF...";
    const toHide = Array.from(root.querySelectorAll<HTMLElement>(".ml-no-export"));
    const prev = toHide.map((e) => e.style.display);
    toHide.forEach((e) => (e.style.display = "none"));
    try {
      const canvas = await html2canvas(root, { scale: 2, useCORS: true, backgroundColor: "#fcf7ef" });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w = pdf.internal.pageSize.getWidth();
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, w, Math.min((canvas.height * w) / canvas.width, 297));
      pdf.save("rentova-kalkulacka.pdf");
    } finally {
      toHide.forEach((e, i) => (e.style.display = prev[i]));
      btn.innerHTML = old;
      delete btn.dataset.busy;
    }
  };

  const onAdvancedClick = () => {
    if (!contentDiv || !arrowIcon) return;
    const isHidden = contentDiv.classList.contains("hidden");
    contentDiv.classList.toggle("hidden", !isHidden);
    (arrowIcon as HTMLElement).style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
  };
  document.getElementById("ml-advanced-toggle")?.addEventListener("click", onAdvancedClick);

  const onDocClick = () => document.querySelectorAll("#rentova-calc-root .ml-dropdown-menu").forEach((m) => m.classList.remove("open"));
  document.addEventListener("click", onDocClick);
  const onModalClick = (e: Event) => {
    if (e.target === compareModal) window.mlCloseComparison?.();
  };
  compareModal?.addEventListener("click", onModalClick);

  const inputIds = ["ml-currentAge", "ml-retirementAge", "ml-desiredRent", "ml-rentDuration", "ml-interestRate", "ml-inflationRate", "ml-currentSavings", "ml-monthlyInvestment"];
  const listeners: Array<{ el: Element; fn: EventListener }> = [];
  inputIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      const fn = () => calculate();
      el.addEventListener("input", fn);
      listeners.push({ el, fn });
    }
  });

  variants[0].data = getForm();
  renderTabs();
  calculate();

  return () => {
    chartInstance?.destroy();
    document.getElementById("ml-advanced-toggle")?.removeEventListener("click", onAdvancedClick);
    document.removeEventListener("click", onDocClick);
    compareModal?.removeEventListener("click", onModalClick);
    listeners.forEach(({ el, fn }) => el.removeEventListener("input", fn));
    delete window.mlSwitchVariant;
    delete window.mlAddVariant;
    delete window.mlRenameVariant;
    delete window.mlDuplicateVariant;
    delete window.mlDeleteVariant;
    delete window.mlOpenComparison;
    delete window.mlCloseComparison;
    delete window.mlSendEmail;
    delete window.mlDownloadPDF;
  };
}


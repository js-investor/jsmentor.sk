import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const BRAND = "JS Mentor";

type InvestFormData = {
  initial: number;
  monthly: number;
  duration: number;
  rate: number;
  inflation: number;
};

type Variant = {
  id: string;
  name: string;
  data: InvestFormData | null;
};

type ScenarioResult = {
  input: InvestFormData;
  finalValue: number;
  totalInvested: number;
  totalInterest: number;
  realValue: number;
  interestPercent: number;
  roi: number;
  labels: string[];
  dataInvested: number[];
  dataTotal: number[];
};

declare global {
  interface Window {
    invSwitchVariant?: (id: string) => void;
    invAddVariant?: () => void;
    invRenameVariant?: (id: string) => void;
    invDuplicateVariant?: (id: string) => void;
    invDeleteVariant?: (id: string) => void;
    invOpenComparison?: () => void;
    invCloseComparison?: () => void;
    invSendEmail?: () => void;
    invDownloadPDF?: () => Promise<void>;
  }
}

const cloneData = (obj: InvestFormData) => JSON.parse(JSON.stringify(obj)) as InvestFormData;

export function mountInvesticnaCalculator(): () => void {
  let disposed = false;
  let chartInstance: Chart | null = null;
  let variantCounter = 1;
  let activeVariantId = "v1";
  let variants: Variant[] = [{ id: "v1", name: "Variant 1", data: null }];
  const toggleBtn = document.getElementById("inv-advanced-toggle");
  const contentDiv = document.getElementById("inv-advanced-content");
  const arrowIcon = document.getElementById("inv-arrow-icon");
  const comparisonModal = document.getElementById("inv-comparison-modal");
  const comparisonTable = document.getElementById("inv-compare-table");
  const variantTabsEl = document.getElementById("inv-variant-tabs");
  const addVariantBtn = document.getElementById("inv-add-variant");
  const rateInput = document.getElementById("inv-rate") as HTMLInputElement | null;
  const rateSlider = document.getElementById("inv-rate-slider") as HTMLInputElement | null;

  const advancedToggleHandler = () => {
    if (!contentDiv || !arrowIcon) return;
    const isHidden = window.getComputedStyle(contentDiv).display === "none";
    contentDiv.style.display = isHidden ? "block" : "none";
    arrowIcon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
  };
  toggleBtn?.addEventListener("click", advancedToggleHandler);

  const modalBackdropHandler = (e: MouseEvent) => {
    if (e.target === comparisonModal) window.invCloseComparison?.();
  };
  comparisonModal?.addEventListener("click", modalBackdropHandler);

  const docClickCloseDropdowns = () => {
    document.querySelectorAll("#inv-calc-root .ml-dropdown-menu").forEach((m) => m.classList.remove("open"));
  };
  document.addEventListener("click", docClickCloseDropdowns);

  const formatCurrency = (value: unknown) =>
    new Intl.NumberFormat("sk-SK", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(Number(value)) ? Number(value) : 0);

  const setText = (idSuffix: string, txt: string) => {
    const el = document.getElementById("inv-" + idSuffix);
    if (el) el.textContent = txt;
  };

  function sanitizeData(data: Partial<InvestFormData> | InvestFormData | null | undefined): InvestFormData {
    const n = (v: unknown, fallback: number) => (Number.isFinite(Number(v)) ? Number(v) : fallback);
    return {
      initial: Math.max(0, n(data?.initial, 5000)),
      monthly: Math.max(0, n(data?.monthly, 200)),
      duration: Math.max(1, Math.min(50, Math.round(n(data?.duration, 20)))),
      rate: Math.max(0, n(data?.rate, 8)),
      inflation: Math.max(0, n(data?.inflation, 2)),
    };
  }

  function getFormData(): InvestFormData {
    const getVal = (id: string): number =>
      parseFloat((document.getElementById("inv-" + id) as HTMLInputElement | null)?.value || "0") || 0;
    return sanitizeData({
      initial: getVal("initial"),
      monthly: getVal("monthly"),
      duration: getVal("duration"),
      rate: getVal("rate"),
      inflation: getVal("inflation"),
    });
  }

  function setFormData(data: Partial<InvestFormData> | null | undefined): void {
    const d = sanitizeData(data ?? {});
    const setVal = (id: string, value: number) => {
      const el = document.getElementById("inv-" + id) as HTMLInputElement | null;
      if (el) el.value = String(value);
    };
    setVal("initial", d.initial);
    setVal("monthly", d.monthly);
    setVal("duration", d.duration);
    setVal("rate", d.rate);
    setVal("inflation", d.inflation);
    if (rateSlider) rateSlider.value = String(Math.min(15, Math.max(1, d.rate)));
  }

  function getActiveVariant(): Variant {
    return variants.find((v) => v.id === activeVariantId) ?? variants[0];
  }

  function saveActiveVariant(): void {
    const active = getActiveVariant();
    active.data = getFormData();
  }

  function renderVariantTabs(): void {
    if (!variantTabsEl) return;
    variantTabsEl.innerHTML = "";
    variants.forEach((v) => {
      const wrap = document.createElement("div");
      wrap.className = "ml-dropdown";

      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "ml-variant-tab " + (v.id === activeVariantId ? "active" : "inactive");
      tab.onclick = () => window.invSwitchVariant?.(v.id);

      const label = document.createElement("span");
      label.textContent = v.name;
      tab.appendChild(label);

      const menuBtn = document.createElement("button");
      menuBtn.type = "button";
      menuBtn.innerHTML = "⋮";
      menuBtn.setAttribute("aria-label", "Možnosti variantu");
      menuBtn.style.cssText =
        "background:none;border:none;cursor:pointer;padding:2px 4px;color:inherit;font-size:16px;line-height:1;";
      menuBtn.onclick = (e) => {
        e.stopPropagation();
        toggleDropdown(v.id);
      };
      tab.appendChild(menuBtn);

      const menu = document.createElement("div");
      menu.className = "ml-dropdown-menu";
      menu.id = "inv-menu-" + v.id;
      menu.addEventListener("click", (e) => e.stopPropagation());

      const addItem = (text: string, danger: boolean, fn: () => void) => {
        const item = document.createElement("div");
        item.className = "ml-dropdown-item" + (danger ? " danger" : "");
        item.textContent = text;
        item.onclick = (e) => {
          e.stopPropagation();
          fn();
          document.querySelectorAll("#inv-calc-root .ml-dropdown-menu").forEach((m) => m.classList.remove("open"));
        };
        menu.appendChild(item);
      };

      addItem("Premenovať", false, () => window.invRenameVariant?.(v.id));
      addItem("Duplikovať", false, () => window.invDuplicateVariant?.(v.id));
      if (variants.length > 1) addItem("Zmazať", true, () => window.invDeleteVariant?.(v.id));

      wrap.appendChild(tab);
      wrap.appendChild(menu);
      variantTabsEl.appendChild(wrap);
    });
    if (addVariantBtn) addVariantBtn.style.display = variants.length >= 4 ? "none" : "";
  }

  function toggleDropdown(id: string): void {
    document.querySelectorAll("#inv-calc-root .ml-dropdown-menu").forEach((m) => {
      if (m.id === "inv-menu-" + id) m.classList.toggle("open");
      else m.classList.remove("open");
    });
  }

  function calculateScenario(data: InvestFormData | null | undefined): ScenarioResult {
    const d = sanitizeData(data ?? {});
    const months = d.duration * 12;
    const monthlyRate = (d.rate / 100) / 12;
    const inflationRate = d.inflation / 100;

    const fvLump = d.initial * Math.pow(1 + monthlyRate, months);
    const fvMonthly =
      Math.abs(monthlyRate) < 1e-12
        ? d.monthly * months
        : d.monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const finalValue = fvLump + fvMonthly;
    const totalInvested = d.initial + d.monthly * months;
    const totalInterest = finalValue - totalInvested;
    const realValue = finalValue / Math.pow(1 + inflationRate, d.duration);
    const interestPercent = finalValue > 0 ? (totalInterest / finalValue) * 100 : 0;
    const roi = totalInvested > 0 ? finalValue / totalInvested : 0;

    const labels: string[] = [];
    const dataInvested: number[] = [];
    const dataTotal: number[] = [];
    let currentInvested = d.initial;
    let currentTotal = d.initial;
    for (let i = 0; i <= d.duration; i++) {
      labels.push("Rok " + i);
      dataInvested.push(currentInvested);
      dataTotal.push(currentTotal);
      currentInvested += d.monthly * 12;
      for (let m = 0; m < 12; m++) {
        currentTotal = currentTotal * (1 + monthlyRate) + d.monthly;
      }
    }

    return {
      input: d,
      finalValue,
      totalInvested,
      totalInterest,
      realValue,
      interestPercent,
      roi,
      labels,
      dataInvested,
      dataTotal,
    };
  }

  function updateChart(s: ScenarioResult | null): void {
    const canvas = document.getElementById("inv-chart") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    chartInstance?.destroy();
    chartInstance = null;
    if (!ctx || !s || disposed) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(41, 106, 82, 0.12)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: s.labels,
        datasets: [
          {
            type: "line",
            label: "Hodnota portfólia",
            data: s.dataTotal,
            borderColor: "#1a4033",
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: "#1a4033",
          },
          {
            type: "line",
            label: "Vklad",
            data: s.dataInvested,
            borderColor: "hsl(36 20% 70%)",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a4033",
            titleFont: { family: "Georgia, Calvino, serif" },
            bodyFont: { family: "system-ui, sans-serif" },
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || "";
                if (label) label += ": ";
                if (context.parsed.y !== null) label += formatCurrency(context.parsed.y);
                return label;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "hsl(var(--cream))" },
            ticks: {
              callback(value) {
                const v = Number(value);
                return v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + "M" : (v / 1000).toFixed(0) + "k";
              },
            },
          },
          x: {
            grid: { display: false },
            ticks: { maxTicksLimit: 8 },
          },
        },
      },
    });
  }

  function updateUi(s: ScenarioResult): void {
    setText("durationVal", s.input.duration + " rokov");
    setText("finalValue", formatCurrency(s.finalValue));
    setText("totalInterest", formatCurrency(s.totalInterest));
    setText("totalInvested", formatCurrency(s.totalInvested));
    setText("realValue", formatCurrency(s.realValue));
    setText("interestPercent", Math.max(0, s.interestPercent).toFixed(0) + "%");
    setText("roi", (Number.isFinite(s.roi) ? s.roi : 0).toFixed(1) + "x");
    if (rateSlider && document.activeElement !== rateSlider && document.activeElement !== rateInput) {
      rateSlider.value = String(Math.min(15, Math.max(1, s.input.rate)));
    }
    updateChart(s);
  }

  function inv_calculate(): ScenarioResult | null {
    if (disposed) return null;
    saveActiveVariant();
    const active = getActiveVariant();
    const s = calculateScenario(active.data ?? getFormData());
    updateUi(s);
    return s;
  }

  function getAllVariantScenarios(): { variant: Variant; scenario: ScenarioResult }[] {
    saveActiveVariant();
    return variants.map((variant) => ({
      variant,
      scenario: calculateScenario(variant.data ?? getFormData()),
    }));
  }

  function renderComparisonTable(): void {
    if (!comparisonTable) return;
    const rows = getAllVariantScenarios();
    let html = "<thead><tr><th>Ukazovateľ</th>";
    rows.forEach(({ variant }) => {
      html += `<th>${variant.name}</th>`;
    });
    html += "</tr></thead><tbody>";
    const defs: [string, (s: ScenarioResult) => string][] = [
      ["Počiatočný vklad", (s) => formatCurrency(s.input.initial)],
      ["Mesačný vklad", (s) => formatCurrency(s.input.monthly)],
      ["Doba investovania", (s) => `${s.input.duration} rokov`],
      ["Ročný výnos", (s) => `${s.input.rate.toFixed(1).replace(".", ",")} %`],
      ["Inflácia", (s) => `${s.input.inflation.toFixed(1).replace(".", ",")} %`],
      ["Celkový vklad", (s) => formatCurrency(s.totalInvested)],
      ["Hodnota portfólia", (s) => formatCurrency(s.finalValue)],
      ["Čistý výnos", (s) => formatCurrency(s.totalInterest)],
      ["Reálna hodnota", (s) => formatCurrency(s.realValue)],
      ["Návratnosť", (s) => `${s.roi.toFixed(2).replace(".", ",")}x`],
      ["Podiel zhodnotenia", (s) => `${Math.max(0, s.interestPercent).toFixed(0)}%`],
    ];
    defs.forEach(([label, fn]) => {
      html += `<tr><td>${label}</td>`;
      rows.forEach(({ scenario }) => {
        html += `<td>${fn(scenario)}</td>`;
      });
      html += "</tr>";
    });
    html += "</tbody>";
    comparisonTable.innerHTML = html;
  }

  function buildEmailBody(): string {
    const rows = getAllVariantScenarios();
    const active = rows.find((r) => r.variant.id === activeVariantId) ?? rows[0];
    const date = new Date().toLocaleDateString("sk-SK");
    let body = `Dobrý deň,\n\nTu je prehľad z investičnej kalkulačky (${BRAND}).\nDátum: ${date}\n\n`;

    if (active) {
      const s = active.scenario;
      body += `AKTÍVNA VARIANTA: ${active.variant.name}\n`;
      body += `- Počiatočný vklad: ${formatCurrency(s.input.initial)}\n`;
      body += `- Mesačný vklad: ${formatCurrency(s.input.monthly)}\n`;
      body += `- Doba investovania: ${s.input.duration} rokov\n`;
      body += `- Ročný výnos: ${s.input.rate.toFixed(1).replace(".", ",")} %\n`;
      body += `- Inflácia: ${s.input.inflation.toFixed(1).replace(".", ",")} %\n\n`;
      body += `VÝSLEDKY\n`;
      body += `- Celkový vklad: ${formatCurrency(s.totalInvested)}\n`;
      body += `- Hodnota portfólia: ${formatCurrency(s.finalValue)}\n`;
      body += `- Čistý výnos: ${formatCurrency(s.totalInterest)}\n`;
      body += `- Reálna hodnota (po inflácii): ${formatCurrency(s.realValue)}\n`;
      body += `- Návratnosť: ${s.roi.toFixed(2).replace(".", ",")}x\n`;
      body += `- Podiel zhodnotenia: ${Math.max(0, s.interestPercent).toFixed(0)}%\n\n`;
    }

    if (rows.length > 1) {
      body += `POROVNANIE VARIANTOV\n`;
      rows.forEach(({ variant, scenario }) => {
        body += `- ${variant.name}: portfólio ${formatCurrency(scenario.finalValue)}, čistý výnos ${formatCurrency(scenario.totalInterest)}, ROI ${scenario.roi.toFixed(2).replace(".", ",")}x\n`;
      });
      body += "\n";
    }

    body += `Vygenerované na webe ${BRAND}`;
    return body;
  }

  window.invSwitchVariant = function (id: string): void {
    if (id === activeVariantId) return;
    saveActiveVariant();
    activeVariantId = id;
    const active = getActiveVariant();
    setFormData(active.data ?? getFormData());
    renderVariantTabs();
    inv_calculate();
  };

  window.invAddVariant = function (): void {
    saveActiveVariant();
    if (variants.length >= 4) {
      alert("Maximálny počet variantov je 4.");
      return;
    }
    variantCounter += 1;
    const src = getActiveVariant();
    const data = cloneData(src?.data ?? getFormData());
    const v: Variant = { id: "v" + variantCounter, name: "Variant " + variantCounter, data };
    variants.push(v);
    activeVariantId = v.id;
    setFormData(v.data);
    renderVariantTabs();
    inv_calculate();
  };

  window.invRenameVariant = function (id: string): void {
    const v = variants.find((x) => x.id === id);
    if (!v) return;
    const name = prompt("Nový názov variantu:", v.name);
    if (!name || !name.trim()) return;
    v.name = name.trim();
    renderVariantTabs();
  };

  window.invDuplicateVariant = function (id: string): void {
    if (variants.length >= 4) {
      alert("Maximálny počet variantov je 4.");
      return;
    }
    saveActiveVariant();
    const src = variants.find((x) => x.id === id);
    if (!src) return;
    variantCounter += 1;
    const v: Variant = {
      id: "v" + variantCounter,
      name: src.name + " (kópia)",
      data: cloneData(src.data ?? getFormData()),
    };
    variants.push(v);
    activeVariantId = v.id;
    setFormData(v.data);
    renderVariantTabs();
    inv_calculate();
  };

  window.invDeleteVariant = function (id: string): void {
    if (variants.length <= 1) return;
    if (!confirm("Zmazať tento variant?")) return;
    const wasActive = id === activeVariantId;
    variants = variants.filter((x) => x.id !== id);
    if (!variants.length) return;
    if (wasActive) {
      activeVariantId = variants[0].id;
      setFormData(variants[0].data ?? getFormData());
      renderVariantTabs();
      inv_calculate();
    } else {
      renderVariantTabs();
    }
  };

  window.invOpenComparison = function (): void {
    renderComparisonTable();
    comparisonModal?.classList.add("open");
  };

  window.invCloseComparison = function (): void {
    comparisonModal?.classList.remove("open");
  };

  window.invSendEmail = function (): void {
    const subject = encodeURIComponent(`Investičná kalkulačka — ${BRAND} (${new Date().toLocaleDateString("sk-SK")})`);
    const body = encodeURIComponent(buildEmailBody());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  window.invDownloadPDF = async function (): Promise<void> {
    const wrapper = document.getElementById("inv-calc-root");
    const btn = document.getElementById("inv-btn-pdf");
    if (!wrapper || !btn) return;
    if (btn.getAttribute("data-busy") === "1") return;

    btn.setAttribute("data-busy", "1");
    (btn as HTMLButtonElement).disabled = true;
    const oldHtml = btn.innerHTML;
    btn.innerHTML = "Pripravujem...";

    const hiddenEls = Array.from(wrapper.querySelectorAll<HTMLElement>(".inv-no-export"));
    const previousDisplays = hiddenEls.map((el) => el.style.display);
    const modalWasOpen = comparisonModal?.classList.contains("open");
    if (modalWasOpen) comparisonModal?.classList.remove("open");

    try {
      inv_calculate();
      hiddenEls.forEach((el) => {
        el.style.display = "none";
      });
      await new Promise((r) => setTimeout(r, 120));

      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "hsl(36 25% 92%)",
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d");
      if (!pageCtx) throw new Error("Canvas context nie je dostupný.");

      const pageHeightPx = Math.floor((canvas.width * pageHeight) / pageWidth);
      let offsetY = 0;
      let pageIndex = 0;

      while (offsetY < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - offsetY);
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(canvas, 0, offsetY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

        const imgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        const imgHeightMm = (sliceHeight * pageWidth) / canvas.width;
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeightMm);
        offsetY += sliceHeight;
        pageIndex += 1;
      }

      pdf.save(`${BRAND.replace(/\s+/g, "_")}_investicna_kalkulacka.pdf`);
    } catch (e) {
      console.error(e);
      alert("Nepodarilo sa vygenerovať PDF.");
    } finally {
      hiddenEls.forEach((el, i) => {
        el.style.display = previousDisplays[i];
      });
      if (modalWasOpen) comparisonModal?.classList.add("open");
      btn.innerHTML = oldHtml;
      (btn as HTMLButtonElement).disabled = false;
      btn.removeAttribute("data-busy");
    }
  };

  const inputIds = ["inv-initial", "inv-monthly", "inv-duration", "inv-rate", "inv-inflation"];
  const inputHandlers: Array<{ el: Element; fn: () => void }> = [];
  inputIds.forEach((id) => {
    const el = document.getElementById(id);
    const fn = () => {
      inv_calculate();
    };
    if (el) {
      el.addEventListener("input", fn);
      inputHandlers.push({ el, fn });
    }
  });

  const rateSliderHandler = function (this: HTMLInputElement): void {
    if (rateInput) rateInput.value = this.value;
    inv_calculate();
  };
  const rateInputHandler = function (this: HTMLInputElement): void {
    if (rateSlider) rateSlider.value = this.value;
  };

  rateSlider?.addEventListener("input", rateSliderHandler);
  rateInput?.addEventListener("input", rateInputHandler);

  variants[0].data = getFormData();
  renderVariantTabs();
  inv_calculate();

  return () => {
    disposed = true;
    toggleBtn?.removeEventListener("click", advancedToggleHandler);
    comparisonModal?.removeEventListener("click", modalBackdropHandler);
    document.removeEventListener("click", docClickCloseDropdowns);
    inputHandlers.forEach(({ el, fn }) => el.removeEventListener("input", fn));
    rateSlider?.removeEventListener("input", rateSliderHandler);
    rateInput?.removeEventListener("input", rateInputHandler);
    chartInstance?.destroy();
    chartInstance = null;

    delete window.invSwitchVariant;
    delete window.invAddVariant;
    delete window.invRenameVariant;
    delete window.invDuplicateVariant;
    delete window.invDeleteVariant;
    delete window.invOpenComparison;
    delete window.invCloseComparison;
    delete window.invSendEmail;
    delete window.invDownloadPDF;
  };
}

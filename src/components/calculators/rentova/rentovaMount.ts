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

// Note: globals are also declared in hypotekarna with different signatures.
// We cast through `any` here to avoid cross-calculator type conflicts.

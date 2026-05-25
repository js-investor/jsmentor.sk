import type { LucideIcon } from "lucide-react";
import { BarChart3, House, Percent, Receipt, Wallet } from "lucide-react";

export type KalkulackaCalculatorMeta = {
  slug: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

/** Zodpovedá súborom: Hypo Smart, Investičná, Mzdová kalkulačka, Podľa príjmu, Rentová kalkulačka. */
export const KALKULACKY_CALCULATORS: KalkulackaCalculatorMeta[] = [
  {
    slug: "hypo-smart",
    title: "Hypotéka vs. investovanie",
    description:
      "Porovnaj, či je pre teba výhodnejšie skoršie splácanie hypotéky alebo pravidelné investovanie.",
    Icon: House,
  },
  {
    slug: "investicna",
    title: "Investičná kalkulačka",
    description:
      "Jednorazové a pravidelné vklady, očakávané zhodnotenie a zložené úročenie v priebehu rokov.",
    Icon: BarChart3,
  },
  {
    slug: "mzdova-kalkulacka",
    title: "Mzdová kalkulačka",
    description:
      "Orientačný prepočet mzdy: hrubá vs. čistá, odvody a čo ti zostane „na ruku“ po zákonných zrážkach.",
    Icon: Receipt,
  },
  {
    slug: "uvery",
    title: "Úverová kalkulačka (DTI & DSTI)",
    description:
      "Výpočet maximálnej hypotéky podľa tvojho príjmu, záväzkov a limitov DTI/DSTI.",
    Icon: Wallet,
  },
  {
    slug: "rentova-kalkulacka",
    title: "Rentová kalkulačka",
    description:
      "Zisti, aký kapitál potrebuješ na požadovanú rentu a koľko treba pravidelne investovať.",
    Icon: Percent,
  },
];

/**
 * Odkaz na chat (predvyplnená správa). Používame api.whatsapp.com — v niektorých prehliadačoch
 * spoľahlivejšie otvorí Web WhatsApp / aplikáciu ako krátke wa.me v novom tabe.
 */
const MENTOR_WHATSAPP_E164 = "421902519328";
const MENTOR_WHATSAPP_PREFILL_MESSAGE = "Ahoj, mám otázku ku kalkulačkám z JS Mentor.";
export const KALKULACKY_WHATSAPP_HREF = `https://api.whatsapp.com/send?${new URLSearchParams({
  phone: MENTOR_WHATSAPP_E164,
  text: MENTOR_WHATSAPP_PREFILL_MESSAGE,
}).toString()}`;

export const KALKULACKY_KONZULTACIA_CARD = {
  title: "Mám otázku k výsledku",
  description:
    "Napíš mi na WhatsApp a preberieme tvoje čísla z kalkulačky a ďalší krok v Hero Hero.",
  href: KALKULACKY_WHATSAPP_HREF,
} as const;

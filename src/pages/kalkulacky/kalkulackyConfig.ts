import type { LucideIcon } from "lucide-react";
import { BarChart3, FileDown, House, Percent, Receipt, Wallet } from "lucide-react";

export const BONUSY_BASE_PATH = "/bonusy";

export type KalkulackaCalculatorMeta = {
  slug: string;
  title: string;
  menuLabel: string;
  description: string;
  Icon: LucideIcon;
};

/** Zodpovedá súborom: Hypo Smart, Investičná, Mzdová kalkulačka, Podľa príjmu, Rentová kalkulačka. */
export const KALKULACKY_CALCULATORS: KalkulackaCalculatorMeta[] = [
  {
    slug: "hypo-kalkulacka",
    title: "Hypotéka vs. investovanie",
    menuLabel: "Hypotéka vs. investovanie",
    description:
      "Porovnaj, či je pre teba výhodnejšie skoršie splácanie hypotéky alebo pravidelné investovanie.",
    Icon: House,
  },
  {
    slug: "investicna-kalkulacka",
    title: "Investičná kalkulačka",
    menuLabel: "Investície",
    description:
      "Jednorazové a pravidelné vklady, očakávané zhodnotenie a zložené úročenie v priebehu rokov.",
    Icon: BarChart3,
  },
  {
    slug: "mzdova-kalkulacka",
    title: "Mzdová kalkulačka",
    menuLabel: "Mzdy",
    description:
      "Orientačný prepočet mzdy: hrubá vs. čistá, odvody a čo ti zostane „na ruku“ po zákonných zrážkach.",
    Icon: Receipt,
  },
  {
    slug: "uverova-kalkulacka",
    title: "Úverová kalkulačka",
    menuLabel: "Úvery",
    description:
      "Výpočet maximálnej hypotéky podľa tvojho príjmu, záväzkov a limitov DTI/DSTI.",
    Icon: Wallet,
  },
  {
    slug: "rentova-kalkulacka",
    title: "Rentová kalkulačka",
    menuLabel: "Renta",
    description:
      "Zisti, aký kapitál potrebuješ na požadovanú rentu a koľko treba pravidelne investovať.",
    Icon: Percent,
  },
];

/** Položka menu — doplniť `href`, keď bude PDF pripravené. */
export const BONUSY_PDF_MENU_ITEM = {
  label: "PDF",
  href: "",
} as const;

/** Šiesta karta na /bonusy — doplniť `href`, keď budú PDF súbory pripravené. */
export const BONUSY_PDF_CARD = {
  title: "Stiahni si PDF",
  description: "PDF materiály a ťaháky pripravené na okamžité použitie v Hero Hero.",
  href: "",
  Icon: FileDown,
} as const;

/** Presmerovania zo starých /kalkulacky URL. */
export const KALKULACKY_LEGACY_PATH_REDIRECTS: { from: string; to: string }[] = [
  { from: "/kalkulacky", to: BONUSY_BASE_PATH },
  { from: "/kalkulacky/hypo-smart", to: `${BONUSY_BASE_PATH}/hypo-kalkulacka` },
  { from: "/kalkulacky/investicna", to: `${BONUSY_BASE_PATH}/investicna-kalkulacka` },
  { from: "/kalkulacky/mzdova-kalkulacka", to: `${BONUSY_BASE_PATH}/mzdova-kalkulacka` },
  { from: "/kalkulacky/uvery", to: `${BONUSY_BASE_PATH}/uverova-kalkulacka` },
  { from: "/kalkulacky/rentova-kalkulacka", to: `${BONUSY_BASE_PATH}/rentova-kalkulacka` },
  { from: "/kalkulacky/podla-prijmu", to: `${BONUSY_BASE_PATH}/uverova-kalkulacka` },
  { from: "/kalkulacky/uvery-dti-dsti", to: `${BONUSY_BASE_PATH}/uverova-kalkulacka` },
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

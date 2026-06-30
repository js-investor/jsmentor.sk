import type { LucideIcon } from "lucide-react";
import { BarChart3, FileDown, House, Percent, Receipt, Wallet, MapPin, TrendingUp, ScanLine, TrafficCone } from "lucide-react";

import { CENNIK_SECTION_HREF } from "@/lib/cennikCta";

export const BONUSY_BASE_PATH = "/bonusy";

export const KONZULTACIA_URL = CENNIK_SECTION_HREF;
export const BONUSY_CTA_LABEL = "Rezervovať konzultáciu s Ivanom";

export type KalkulackaCalculatorMeta = {
  slug: string;
  title: string;
  menuLabel: string;
  description: string;
  Icon: LucideIcon;
  /** Kalkulačka manažuje vlastné sekcie na celú šírku stránky. */
  fullBleed?: boolean;
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
  {
    slug: "investicny-byt",
    title: "Investičný byt",
    menuLabel: "Investičný byt",
    description:
      "Interaktívna mapa Slovenska: zisti, koľko ti zarobí investičný byt za 5–30 rokov v každom krajskom meste.",
    Icon: MapPin,
  },
  {
    slug: "etf-semafor",
    title: "ETF semafor 🚦",
    menuLabel: "ETF semafor",
    description:
      "15 otázok za 3 minúty. Zisti, či investuješ správne. Od stratégie až po poplatky a chyby, ktoré ťa potichu stoja peniaze.",
    Icon: TrendingUp,
  },
  {
    slug: "poplatkovy-rontgen",
    title: "Poplatkový röntgen 💸",
    menuLabel: "Poplatkový röntgen",
    description:
      "Tri kliky a uvidíš, koľko z tvojho budúceho majetku potichu zmizne v poplatkoch. V eurách, nie v percentách.",
    Icon: ScanLine,
    fullBleed: true,
  },
  {
    slug: "bytovy-semafor",
    title: "Bytový semafor 🚦",
    menuLabel: "Bytový semafor",
    description:
      "Oplatí sa ti ten byt kúpiť? Lokalita, čísla, banka, dane, zmluvy. Získaš odpovede ešte pred tým, ako zaplatíš zálohu.",
    Icon: TrafficCone,
    fullBleed: true,
  },
];

/** Položka menu — doplniť `href`, keď bude PDF pripravené. */
export const BONUSY_PDF_MENU_ITEM = {
  label: "PDF",
  href: "",
} as const;

/** Šiesta karta na /bonusy — doplniť `href`, keď budú PDF súbory pripravené. */
export const BONUSY_PDF_CARD = {
  title: "Pripravujem PDF materiály",
  description: "",
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

export function makeWhatsAppHref(message: string): string {
  return `https://api.whatsapp.com/send?${new URLSearchParams({
    phone: MENTOR_WHATSAPP_E164,
    text: message,
  }).toString()}`;
}

export const KALKULACKY_WHATSAPP_HREF = makeWhatsAppHref(
  "Ahoj, mám otázku ku kalkulačkám z JS Mentor."
);

export const ETF_SEMAFOR_WHATSAPP_HREF = makeWhatsAppHref(
  "Ahoj Ivan, mám otázku."
);

/** Skupiny pre dropdown navigáciu v headeri. */
export type NavGroup = {
  label: string;
  items: { label: string; href: string }[];
};

export const KALKULACKY_HEADER_GROUPS: NavGroup[] = [
  {
    label: "Kalkulačky",
    items: [
      { label: "Hypotéka vs. investovanie", href: `${BONUSY_BASE_PATH}/hypo-kalkulacka` },
      { label: "Investičná kalkulačka",     href: `${BONUSY_BASE_PATH}/investicna-kalkulacka` },
      { label: "Mzdová kalkulačka",         href: `${BONUSY_BASE_PATH}/mzdova-kalkulacka` },
      { label: "Úverová kalkulačka",        href: `${BONUSY_BASE_PATH}/uverova-kalkulacka` },
      { label: "Rentová kalkulačka",        href: `${BONUSY_BASE_PATH}/rentova-kalkulacka` },
    ],
  },
  {
    label: "Nástroje",
    items: [
      { label: "Investičný byt",     href: `${BONUSY_BASE_PATH}/investicny-byt` },
      { label: "ETF semafor",        href: `${BONUSY_BASE_PATH}/etf-semafor` },
      { label: "Poplatkový röntgen", href: `${BONUSY_BASE_PATH}/poplatkovy-rontgen` },
      { label: "Bytový semafor",     href: `${BONUSY_BASE_PATH}/bytovy-semafor` },
    ],
  },
  {
    label: "PDF",
    items: [],
  },
];

export const KALKULACKY_KONZULTACIA_CARD = {
  title: "Mám otázku k výsledku",
  description:
    "Napíš mi na WhatsApp a preberieme tvoje čísla z kalkulačky a ďalší krok v Hero Hero.",
  href: KONZULTACIA_URL,
} as const;

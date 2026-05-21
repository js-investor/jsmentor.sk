import {
  BadgeEuro,
  BarChart3,
  BookOpen,
  Briefcase,
  Coins,
  CreditCard,
  Landmark,
  LineChart,
  Mic,
  Percent,
  PieChart,
  PiggyBank,
  Shield,
  TrendingUp,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import jsMentorHeroHeroScreen from "@/assets/images/js-mentor-hero-hero.png";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const benefitBold = (text: string) => (
  <strong className="font-bold text-foreground">{text}</strong>
);

const BenefitLabel = ({
  lead,
  bold,
  tail,
}: {
  lead?: string;
  bold: string;
  tail?: string;
}) => (
  <>
    {lead}
    {benefitBold(bold)}
    {tail}
  </>
);

const forest = "#023c2e";
const forestMuted = "#065f4a";
/** Spodok sekcie „Ochutnávka“ – o kúsok svetlejšia ako `forest` */
const forestGradientEnd = "#0a5a47";
/** Horná zóna „Čo presne dostaneš…“ – radiálna čierna (ako sekcia recenzií) */
const heroBlackOuter = "#000000";
const heroBlackInner = "#171717";
const heroBlackSectionBg = `radial-gradient(ellipse 85% 75% at 50% 42%, ${heroBlackInner} 0%, ${heroBlackOuter} 58%, ${heroBlackOuter} 100%)`;

/** Širší obsah než default `section-container` (1200px) — hero + ochutnávka videí. */
const contentWide = "mx-auto w-full max-w-[1400px]";

/** Nahraď vlastnými Vimeo ID, keď ich budeš mať pre tieto tri videá. */
const showcaseVideos = [
  {
    id: "invest-start",
    title: "Čo by som urobil dnes, keby začínam s investovaním?",
    description:
      "Získaš presnú mapu, ako by som si dnes krok za krokom rozložil peniaze z bežného platu. Zistíš, akým drahým chybám začiatočníkov sa oblúkom vyhnúť a na čo sa sústrediť, aby si si okamžite vybudoval nepriestrelnú finančnú rezervu.",
    vimeoId: "1145809910",
  },
  {
    id: "loan-prepay",
    title: "Prečo je mimoriadne splatenie úveru väčšia chyba, ako sa zdá",
    description:
      "Toto ťa v banke nenaučia. Na čistej matematike ti ukážem, prečo ťa snaha o „rýchle splatenie hypotéky“ môže v konečnom dôsledku pripraviť o desiatky tisíc eur (a dozvieš sa, čo presne by si mal s tými peniazmi urobiť radšej, aby zarábali tebe, nie banke).",
    vimeoId: "1183644074",
  },
  {
    id: "rental-flat",
    title: "Investičný byt: Je to naozaj taký luxus, ako tvrdia na internete?",
    description:
      "Zabudni na instagramové pozlátko. Urobíme si tvrdú analýzu reality. Pozrieme sa na reálne čísla, skryté poplatky a skutočnú prácu s nájomníkmi. Odhalíš, či sa ti investícia do nehnuteľnosti dnes vôbec oplatí, alebo ti len zbytočne zožerie úspory a nervy.",
    vimeoId: "1175801732",
  },
] as const;

const FLOW_PATH = "M -20 38 C 120 180, 250 252, 396 204 C 502 170, 545 84, 662 116 C 760 144, 832 220, 920 292";

const financialFlowIcons: LucideIcon[] = [
  Wallet,
  BadgeEuro,
  Coins,
  TrendingUp,
  LineChart,
  Briefcase,
  CreditCard,
  Percent,
  Shield,
  PiggyBank,
  Landmark,
  BarChart3,
];

/** Jemné taby – svetlé pozadie na tmavom bloku */
const heroBenefitRowClass =
  "flex items-center gap-3 rounded-3xl border border-white/25 bg-[#FFF9F5] px-3 py-2 text-foreground/90 sm:gap-3.5 sm:px-4 sm:py-2.5 md:px-4";
const heroBenefitIconClass =
  "h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6 md:h-7 md:w-7";

const heroHeroBenefits: {
  Icon: LucideIcon;
  label: ReactNode;
}[] = [
  {
    Icon: Video,
    label: (
      <BenefitLabel
        bold="Skutočná pravda o peniazoch,"
        tail=" ktorú kvôli algoritmom na sociálnych sieťach nenájdeš."
      />
    ),
  },
  {
    Icon: PieChart,
    label: (
      <BenefitLabel
        bold="Nezávislé rozbory fondov a produktov na slovenskom trhu."
        tail=" Zistíš, čo sa ti reálne oplatí."
      />
    ),
  },
  {
    Icon: Users,
    label: (
      <BenefitLabel
        lead="Reálne (anonymizované) konzultácie: Konkrétne "
        bold="životné situácie ľudí a moje priame riešenia."
      />
    ),
  },
  {
    Icon: TrendingUp,
    label: (
      <BenefitLabel
        lead="Týždenné trhové updaty. "
        bold="Čo sa práve deje vo svete peňazí"
        tail=" a ako na to správne reagovať."
      />
    ),
  },
  {
    Icon: BookOpen,
    label: (
      <BenefitLabel
        bold="Praktické návody a stratégie"
        tail=". Krok za krokom k vytvoreniu rezervy, hypotéke a investíciám."
      />
    ),
  },
  {
    Icon: Mic,
    label: (
      <BenefitLabel
        lead="Odpovede na tvoje otázky a "
        bold="exkluzívne rozhovory s prizvanými odborníkmi."
      />
    ),
  },
];

const CoDostanesHeroHeroSection = () => {
  const [openVideoId, setOpenVideoId] = useState<string>(showcaseVideos[0].id);
  const selectedVideo = useMemo(
    () => showcaseVideos.find((video) => video.id === openVideoId) ?? showcaseVideos[0],
    [openVideoId]
  );

  return (
    <section id="co-dostanes-hero-hero" className="relative w-full scroll-mt-24 text-white">
      <style>{`
        .co-finance-flow-icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 2rem;
          height: 2rem;
          offset-path: path("${FLOW_PATH}");
          offset-rotate: auto 90deg;
          will-change: offset-distance;
          animation: co-finance-flow 16s linear infinite;
        }
        @keyframes co-finance-flow {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        @media (min-width: 768px) {
          .co-finance-flow-icon {
            width: 2.75rem;
            height: 2.75rem;
          }
        }
      `}</style>

      <div className="relative mx-3 overflow-hidden rounded-[2rem] md:mx-5 md:rounded-[2.5rem]" style={{ backgroundColor: forest }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background: `radial-gradient(ellipse 120% 85% at 100% 0%, ${forestMuted} 0%, transparent 55%)`,
        }}
      />
      {/* —— Čierna zóna —— */}
      <div
        className="relative overflow-hidden rounded-[2rem] pt-16 pb-14 md:rounded-[2.5rem] md:pb-20 md:pt-20"
        style={{
          backgroundColor: heroBlackOuter,
          backgroundImage: heroBlackSectionBg,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(ellipse 110% 75% at 50% -18%, rgba(255,255,255,0.06) 0%, transparent 52%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className={`relative z-10 px-5 md:px-8 ${contentWide}`}>
          {/* Wispr-like hero row: chips + copy vľavo, ribbon vpravo */}
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="space-y-5 text-center sm:text-left">
                <h2 className="headline-serif text-balance text-[2.2rem] font-extrabold leading-[1.05] text-white sm:text-[2.7rem] md:text-[3.35rem] md:leading-[1.03]">
                  Čo presne dostaneš v Hero Hero
                </h2>
                <p className="font-sans text-[1.0625rem] leading-relaxed text-white/65 md:text-[1.125rem]">
                  Každý týždeň čerstvý obsah priamo odo mňa.
                </p>
                <ul
                  className="flex flex-col gap-1.5 text-left font-sans text-[1.02rem] leading-snug sm:gap-2 md:text-[1.06rem] md:leading-relaxed lg:text-[1.12rem]"
                  aria-label="Čo dostaneš v Hero Hero"
                >
                  {heroHeroBenefits.map(({ Icon, label }, index) => (
                    <li key={index}>
                      <div className={heroBenefitRowClass}>
                        <Icon className={heroBenefitIconClass} strokeWidth={2.1} aria-hidden />
                        <span className="min-w-0 flex-1">{label}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-center sm:justify-start">
                  <a href="#formular" className="btn-primary text-body inline-flex">
                    🚀 Vyskúšať na 15 dní ZADARMO
                  </a>
                </div>
              </div>
            </div>

            {/* Vizuál s mobilným mockupom */}
            <div className="relative mx-auto min-h-[275px] w-full max-w-xl lg:col-span-7 lg:max-w-none lg:min-h-[345px]">
              {financialFlowIcons.map((Icon, index) => {
                const iconCount = financialFlowIcons.length;
                const delayPerIcon = 16 / iconCount;
                return (
                  <div
                    key={`${Icon.displayName ?? Icon.name}-${index}`}
                    className="co-finance-flow-icon z-10"
                    style={{ animationDelay: `-${index * delayPerIcon}s` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-[0.45rem] border border-white/20 bg-black/70 shadow-[0_6px_18px_rgba(0,0,0,0.35)] md:h-11 md:w-11 md:rounded-xl">
                      <Icon className="h-4 w-4 text-emerald-300/95 md:h-5 md:w-5" aria-hidden />
                    </div>
                  </div>
                );
              })}

              {/* Mobilný mockup — screenshot Hero Hero v „obrazovke“ */}
              <div className="relative z-20 mx-auto mt-5 flex w-[56%] max-w-[255px] justify-center sm:absolute sm:left-[34%] sm:top-[-7%] sm:mt-0 sm:w-[44%] sm:max-w-[265px] md:left-[40%] md:top-[-11%] md:max-w-[280px] lg:top-[-12%] lg:max-w-[295px]">
                <div className="relative aspect-[9/17] w-full rounded-[2rem] border border-white/20 bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-1 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]">
                  <div className="relative flex h-full w-full items-start justify-center overflow-hidden rounded-[1.65rem] bg-white">
                    <img
                      src={jsMentorHeroHeroScreen}
                      alt="Hero Hero — profil JsMentor v mobilnej aplikácii"
                      className="h-full w-full object-contain object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-2.5"
                      aria-hidden
                    >
                      <div className="h-1 w-10 rounded-full bg-black/25 backdrop-blur-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* —— Zelená zóna — 2 stĺpce (zoznam + video) —— */}
      <div
        id="ukazky-videii"
        className="relative w-full scroll-mt-24 overflow-hidden py-14 md:py-20"
        style={{
          background: `linear-gradient(180deg, ${forest} 0%, ${forestGradientEnd} 100%)`,
        }}
      >
        <p
          className={`headline-serif mb-8 w-full ${contentWide} px-5 text-balance text-center !font-black leading-[1.12] text-white text-2xl sm:text-3xl md:mb-12 md:px-8 md:text-[2.125rem] lg:text-[2.65rem] lg:leading-[1.1]`}
        >
          Ochutnávka obsahu, ktorý nájdeš na Hero Hero už dnes.
        </p>
        <div className={`relative z-10 px-5 md:px-8 ${contentWide}`}>
          <div className="mx-auto grid w-full gap-8 lg:grid-cols-[2fr_3fr] lg:gap-x-14 lg:gap-y-10">
            <nav className="flex flex-col gap-2" aria-label="Zoznam ukážok videí">
              {showcaseVideos.map((item) => {
                const isActive = openVideoId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOpenVideoId(item.id)}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-colors md:px-5 md:py-4 ${
                      isActive
                        ? "border-[#b9a894]/70 bg-[#e4d8c8] text-black"
                        : "border-white/15 bg-white/[0.08] text-white/70 hover:border-white/25 hover:bg-white/[0.14] hover:text-white/90"
                    }`}
                  >
                    <span className="font-bold font-serif text-[1.15rem] leading-snug sm:text-[1.22rem] md:text-[1.35rem] md:leading-[1.2]">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="min-w-0">
              <p className="mb-6 font-sans text-[1.05rem] leading-relaxed text-white/80 md:mb-7 md:text-[1.125rem]">
                {selectedVideo.description}
              </p>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                {showcaseVideos.map((item) => {
                  const isVisible = openVideoId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-75 ${
                        isVisible
                          ? "z-10 opacity-100"
                          : "pointer-events-none z-0 opacity-0"
                      }`}
                      aria-hidden={!isVisible}
                    >
                      <iframe
                        title={item.title}
                        src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=0&title=0&portrait=0&byline=0`}
                        className="block h-full w-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default CoDostanesHeroHeroSection;

import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useCallback, useState } from "react";

const reviewsBg = "#0c0c0c";

/** Jemný viacstupňový fade do pozadia sekcie */
const reviewsEdgeFadeLeft = `linear-gradient(to right, ${reviewsBg} 0%, ${reviewsBg} 6%, rgba(12,12,12,0.98) 14%, rgba(12,12,12,0.9) 26%, rgba(12,12,12,0.72) 42%, rgba(12,12,12,0.48) 58%, rgba(12,12,12,0.26) 72%, rgba(12,12,12,0.1) 84%, rgba(12,12,12,0.03) 92%, transparent 100%)`;
const reviewsEdgeFadeRight = `linear-gradient(to left, ${reviewsBg} 0%, ${reviewsBg} 6%, rgba(12,12,12,0.98) 14%, rgba(12,12,12,0.9) 26%, rgba(12,12,12,0.72) 42%, rgba(12,12,12,0.48) 58%, rgba(12,12,12,0.26) 72%, rgba(12,12,12,0.1) 84%, rgba(12,12,12,0.03) 92%, transparent 100%)`;

const reviewStarClass = "h-4 w-4 fill-[#F5A623] text-[#FBBF24]";

/** Texty prevzaté zo screenshotov recenzia-1 … recenzia-9 */
const reviewsRowTop = [
  "Spolupráca s tebou sa mi veľmi páči, až vďaka tebe som pochopila, prečo má investovanie zmysel a že najdôležitejšia je dlhodobá stratégia. Všetko bolo vysvetlené zrozumiteľne a prakticky. Pomohol si mi nastaviť jasný plán, vďaka čomu mám istotu a viem, čo robím.",
  "Veľká spokojnosť. Ivan je odborník, ktorý vie presne, čo robí. Všetko mi detailne vysvetlil a pomohol mi nastaviť financie oveľa lepšie. Konečne mám pocit, že moje peniaze pracujú pre mňa. Určite odporúčam!",
  "S pánom Jašíkom investujem vyše pol roka. Portfólio bolo zložené na mieru, berúc do úvahy všetky podstatné faktory (vek, cieľ, iné investičné produkty). Vždy ústretová a férová konverzácia a kvalitné pravidelné reporty. Vrelo odporúčam.",
  "S Ivanom spolupracujem necelý rok. Za ten rok som sa posunul ohľadne investícií a peňazí ako takých na vyššiu úroveň. Na začiatku mi objasnil veci ohľadne investícií, ukázal rôzne stratégie a vybrali sme spoločne tú najvhodnejšiu, keďže som investoval už dlhšie, ale nemal som dostatočné informácie. Jeho prístup je ľudský a profesionálny. Vždy mi vie vyhovieť ohľadne callov a vysvetliť nové informácie. Mladí ľudia majú jedinečnú možnosť vďaka zloženému úroku sa zabezpečiť na dôchodok — preto som mu vďačný, že mi ukázal možnosti a pripojil som sa k nemu za spoločným cieľom.",
  "Veľmi veľká spokojnosť. Pred pár mesiacmi som sa mu ozval, že by som chcel poradiť s investíciami, do pár dní sa mi ozval, dohodli sme si konzultáciu a prebrali potrebné veci. Všetko, čo sa týka investícií, poradí, naplánuje, spraví stratégiu — plán na mieru podľa veku, príjmov a výdavkov. Žiadne prehnané výnosy ani nenaplniteľné plány. Vo svete investícií ma to posunulo dopredu, lebo viem, že mám po boku človeka, čo sa vyzná lepšie ako ja. Vidno, že prácu ho baví a má dlhoročné skúsenosti.",
] as const;

const reviewsRowBottom = [
  "Ivu môžem len odporučiť. Sledovala som jeho profil na Instagrame dlhší čas a po nejakom čase som sa mu ozvala, že by som mala záujem o investovanie — dohodli sme sa na call, kde mi všetko vysvetlil, aké sú možnosti, a potom mi pomohol aj so založením. Môžem len odporučiť, má skvelý profesionálny prístup ku svojim klientom.",
  "Mal som s Ivanom online konzultácie a musím povedať, že celý prístup bol veľmi profesionálny a hlavne zrozumiteľný. Všetko mi detailne vysvetlil, ukázal prezentáciu, možnosti investovania aj rozdiely oproti iným online platformám. Páčilo sa mi, že netlačil nasilu predaj, ale normálne ma previedol celým procesom a odpovedal na všetky otázky, aj na tie, na ktoré som sa hneď nenapadol. Za mňa veľmi dobrá skúsenosť — ak chce človek investovaniu naozaj rozumieť a nie len slepo klikať v aplikácii.",
  "Na Ivana som natrafila v podstate náhodne na IG, zaujal ma jeho profil a informácie, ktoré zdieľal. Začala som sa ešte len orientovať vo veciach ohľadom investovania a keď som ho oslovila, bol mi veľmi nápomocný — všetko vysvetlil, nastavil po individuálnom zhodnotení investovanie a stratégiu, venuje sa mi, keď aktuálne treba. Som nadšená, ako sa dá budovať majetok rozumne a s primeraným rizikom. Individuálne sme aj prednedávnom nastavovali investičné portfólio, s čím som nadmieru spokojná.",
  "Si prvý človek, ktorému verím natoľko, že som ti zveril naplánovanie svojich investícií. Preto by som ti rád touto cestou poďakoval za tvoj priateľský, ľudský a zároveň odborný prístup. Oceňujem tiež tvoju trpezlivosť a snahu vysvetliť mi vo svete financií veci, ktoré mi neboli jasné. S tvojou podporou má nastavené investovanie celá moja rodina. Si veľmi príjemný človek a kedykoľvek si s tebou rád pokecám aj mimo financií. Prajem ti veľa osobných aj pracovných úspechov a komukoľvek rád spoluprácu s tebou odporučím.",
] as const;

const ReviewCard = ({ quote }: { quote: string }) => (
  <article className="flex w-[18rem] shrink-0 flex-col rounded-2xl border border-[#E8E0D8] bg-white p-4 sm:w-[18.75rem] md:w-[20rem] lg:w-[21.5rem] md:p-5">
    <div className="mb-3 flex items-start gap-0.5" aria-label="Hodnotenie 5 z 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={reviewStarClass} strokeWidth={0} aria-hidden />
      ))}
    </div>
    <p className="font-sans text-[0.8125rem] leading-relaxed text-foreground/85 md:text-[0.875rem]">
      {quote}
    </p>
  </article>
);

type ReviewMarqueeRowProps = {
  items: readonly string[];
  direction: "left" | "right";
  className?: string;
};

const ReviewMarqueeRow = ({ items, direction, className }: ReviewMarqueeRowProps) => {
  const loopItems = [...items, ...items];
  const [isPaused, setIsPaused] = useState(false);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onTouchCancel={resume}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-28 md:w-36 lg:w-44"
        style={{ background: reviewsEdgeFadeLeft }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-28 md:w-36 lg:w-44"
        style={{ background: reviewsEdgeFadeRight }}
        aria-hidden
      />
      <div
        className={cn(
          "reviews-marquee-track flex w-max gap-3 md:gap-4",
          direction === "left" ? "animate-reviews-marquee-left" : "animate-reviews-marquee-right",
          isPaused && "[animation-play-state:paused]"
        )}
      >
        {loopItems.map((quote, index) => (
          <ReviewCard key={`${index}-${quote.slice(0, 24)}`} quote={quote} />
        ))}
      </div>
    </div>
  );
};

const HeroHeroReviewsSection = () => (
  <section
    id="recenzie"
    className="hero-section-pad relative scroll-mt-24 overflow-hidden bg-[#0c0c0c] px-5 md:px-8 pt-[72px] pb-[72px] text-white md:pt-[96px] md:pb-[96px]"
    aria-labelledby="recenzie-heading"
  >
    <div className="section-container relative z-10 px-5 md:px-8">
      <AnimatedSection>
        <header className="mx-auto mb-[54px] max-w-3xl text-center">
          <h2 id="recenzie-heading" className="headline-landing-section text-white">
            Takto to vyzerá v praxi
          </h2>
        </header>
      </AnimatedSection>
    </div>

    <div className="relative z-10 mx-auto w-full max-w-[1180px] space-y-3 px-4 md:max-w-[1280px] md:space-y-4 md:px-6 lg:max-w-[1360px] lg:px-8">
      <ReviewMarqueeRow items={reviewsRowTop} direction="left" />
      <ReviewMarqueeRow items={reviewsRowBottom} direction="right" />
    </div>

    <div className="section-container relative z-10 mt-[54px] px-5 text-center md:px-8">
      <a href="#formular" className="btn-primary text-body inline-flex">
        Chcem sa pridať ZADARMO 🚀
      </a>
    </div>
  </section>
);

export default HeroHeroReviewsSection;

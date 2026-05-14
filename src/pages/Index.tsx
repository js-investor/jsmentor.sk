import HomeDesignHeaderSection from "@/components/sections/HomeDesignHeaderSection";
import StatsBarSection from "@/components/sections/StatsBarSection";
import VysledkySection from "@/components/sections/VysledkySection";
import ProblemSectionTemplate from "@/components/templates/sections/ProblemSectionTemplate";
import WealthMapPilieresSection from "@/components/sections/WealthMapPilieresSection";
import MapaVpraxiSection from "@/components/sections/MapaVpraxiSection";
import NaslednyPostupSection from "@/components/sections/NaslednyPostupSection";
import PredPoSection from "@/components/sections/PredPoSection";
import PreKohoSection from "@/components/sections/PreKohoSection";
import RecenzieKlientovSection from "@/components/sections/RecenzieKlientovSection";
import PoplatkyPorovnanieSection from "@/components/sections/PoplatkyPorovnanieSection";
import PodmienkyPorovnanieSection from "@/components/sections/PodmienkyPorovnanieSection";
import RozdielPoplatkovSection from "@/components/sections/RozdielPoplatkovSection";
import KtoStojiZaJsInvestorSection from "@/components/sections/KtoStojiZaJsInvestorSection";
import GaranciaSection from "@/components/sections/GaranciaSection";
import UrgenciaSection from "@/components/sections/UrgenciaSection";
import FaqLoremSection from "@/components/sections/FaqLoremSection";
import BookingSection from "@/components/sections/BookingSection";
import PageWrapper from "@/components/layout/PageWrapper";
import { Clock3, Compass, Percent, PiggyBank, Wallet } from "lucide-react";

const Index = () => (
  <PageWrapper>
    <HomeDesignHeaderSection />
    <StatsBarSection />
    <VysledkySection
      title={
        <>
          <span className="text-primary font-bold">Skutočné výsledky</span> našich klientov
        </>
      }
      subtitle={<>Ukážka dlhodobého zhodnotenia majetku v rámci našich riadených ETF portfólií.</>}
      ctaLabel="Získať Wealth Map"
      showCtaResponseNote
    />
    <ProblemSectionTemplate
      heading={<>Poznáte to?</>}
      subheading={null}
      items={[
        {
          icon: <PiggyBank className="h-7 w-7 -translate-x-0.5 text-accent" />,
          title: <>Na účte vám leží 30 000 € a ročne z nich zmizne 1 200 €.</>,
          body: (
            <>
              Nie preto, že ste urobili niečo zle. Ale preto, že ste s nimi neurobili nič.{" "}
              <strong>Za 10 rokov to nie je len 12 000 €. Je to aj všetko navyše, čo tieto peniaze mohli medzitým zarobiť.</strong>
            </>
          ),
        },
        {
          icon: <Percent className="h-7 w-7 -translate-x-0.5 text-accent" />,
          title: <>Bankár vám povedal, že sa o vás postará, ale nepovedal vám skutočnú cenu.</>,
          body: (
            <>
              1 % ročný poplatok vyzerá zanedbateľne.{" "}
              <strong>Pri 30-ročnom horizonte vám zhltnú 30+ % z toho, čo ste celý život budovali.</strong> Bez toho,
              aby ste si to všimli tak stratíte prídete o 10 rokov života.
            </>
          ),
        },
        {
          icon: <Compass className="h-7 w-7 -translate-x-0.5 text-accent" />,
          title: <>Investujete ale ste na to sami.</>,
          body: (
            <>
              Nikto vám nepovie, či to robíte správne. ETF, nehnuteľnosti, krypto. Zo všetkých strán počujete niečo
              iné. A <strong>keď príde dôležité rozhodnutie, ste na to sami.</strong> Bez niekoho, kto pozná vaše
              čísla.
            </>
          ),
        },
        {
          icon: <Wallet className="h-7 w-7 -translate-x-0.5 text-accent" />,
          title: <>Máte plán, ale neviete, či vás dovedie k rente, ktorú chcete.</>,
          body: (
            <>
              Investujete, čo je správne. No bez stratégie sa môže stať, že{" "}
              <strong>o 15 rokov zistíte, že ste mali obrovský potenciál, ktorý ste nevyužili.</strong>
            </>
          ),
        },
      ]}
      closingText={
        <>
          Presne pre toto existuje Wealth Map. Jeden plán, jasný smer. <strong>Všetko na jednom mieste.</strong>
        </>
      }
      ctaLabel="Získať Wealth Map"
    />
    <WealthMapPilieresSection />
    <MapaVpraxiSection />
    <NaslednyPostupSection />
    <PredPoSection />
    <RecenzieKlientovSection
      heading={<>Čo hovoria klienti, ktorí sa už rozhodli.</>}
      subheading={
        <>
          Reálne skúsenosti ľudí, ktorí našli svojho sprievodcu budovaním majetku a získali pocit absolútneho
          bezpečia v každej trhovej situácii.
        </>
      }
      ctaLabel="Získať Wealth Map"
    />
    <PreKohoSection />
    <PoplatkyPorovnanieSection />
    <PodmienkyPorovnanieSection />
    <RozdielPoplatkovSection />
    <KtoStojiZaJsInvestorSection />
    <GaranciaSection />
    <UrgenciaSection />
    <FaqLoremSection
      heading={<>Najčastejšie otázky</>}
      subheading={<>Odpovede na to, čo nás klienti pýtajú najčastejšie.</>}
      showCta={false}
    />
    <BookingSection
      heading={
        <span className="text-cream">
          Zbavte sa chaosu z peňazí. Začnite konať už dnes.
        </span>
      }
      subheading={<>Získajte Wealth Map. Presný plán, ktorý vám ukáže, kde ste, kam idete a čo urobiť ďalej.</>}
      bullets={[]}
      variant="cardOnLight"
    />
  </PageWrapper>
);

export default Index;

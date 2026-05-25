import KonzultaciaHeroSectionTemplate from "@/components/templates/KonzultaciaHeroSectionTemplate";
import { scrollToAnchorId, scrollToFormular } from "@/lib/scrollToFormular";

const scrollToBooking = () => {
  scrollToFormular();
};

const scrollToSection = (id: string) => {
  scrollToAnchorId(id);
};

const KonzultaciaHeroSection = () => {
  return (
    <KonzultaciaHeroSectionTemplate
      heroHeadlineClassName="headline-hero-konzultacia"
      headerItems={[
        { label: "Prvý krok", onClick: () => scrollToSection("prvy-krok") },
        { label: "Výsledky klientov", onClick: () => scrollToSection("vysledky") },
        { label: "Čo dostaneš", onClick: () => scrollToSection("co-dostanes") },
        { label: "Skúsenosti klientov", onClick: () => scrollToSection("recenzie") },
        { label: "Časté otázky", onClick: () => scrollToSection("faq") },
      ]}
      headerCtaLabel="Chcem začať teraz"
      headerCtaOnClick={scrollToBooking}
      title={
        <>
          Nenechávaj svoju budúcnosť na náhodu.{" "}
          Vybuduj si majetok, ktorý ti <span className="text-primary font-bold">prinesie skutočnú slobodu</span>.
        </>
      }
      subtitle={
        <>
          Do 14 dní ti postavím <strong>plán, ktorý dáva zmysel.</strong>
        </>
      }
      description={
        <>
          Už 8 rokov staviam Slovákom <strong>finančné stratégie, ktoré fungujú aj v kríze.</strong> Celá spolupráca
          je pod dohľadom Národnej banky Slovenska.
        </>
      }
      heroCtaLabel="Chcem začať teraz"
      heroCtaOnClick={scrollToBooking}
      badges={["Bezplatný úvodný hovor", "Online 30 minút", "Bez záväzku a predaja"]}
      videoSrc="https://player.vimeo.com/video/1175801732?autoplay=0&title=0&portrait=0&byline=0"
      videoTitle="Vimeo video"
    />
  );
};

export default KonzultaciaHeroSection;

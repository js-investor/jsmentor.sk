import HeroSectionTemplate from "@/components/templates/HeroSectionTemplate";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const KonzultaciaHeroSection = () => {
  return (
    <HeroSectionTemplate
      headerItems={[
        { label: "Prvý krok", onClick: () => scrollToSection("prvy-krok") },
        { label: "Výsledky klientov", onClick: () => scrollToSection("vysledky") },
        { label: "Čo dostaneš", onClick: () => scrollToSection("co-dostanes") },
        { label: "Skúsenosti klientov", onClick: () => scrollToSection("recenzie") },
        { label: "Časté otázky", onClick: () => scrollToSection("faq") },
      ]}
      headerCtaLabel="Získať Wealth Map"
      headerCtaOnClick={scrollToBooking}
      title={
        <>
          Investuješ <span className="text-primary font-bold">chaoticky</span>
          <br className="hidden lg:block" /> alebo <span className="text-primary font-bold">neinvestuješ vôbec?</span>
        </>
      }
      subtitle={
        <>
          Do 14 dní ti postavím <strong>plán, ktorý dáva zmysel.</strong> Začneme úvodným bezplatným hovorom.
        </>
      }
      description={
        <>
          Už 8 rokov staviam Slovákom <strong>finančné stratégie, ktoré fungujú aj v kríze.</strong> Celá spolupráca
          je pod dohľadom Národnej banky Slovenska.
        </>
      }
      heroCtaLabel="Získať Wealth Map"
      heroCtaOnClick={scrollToBooking}
      badges={["Bezplatný úvodný hovor", "Online 30 minút", "Bez záväzku a predaja"]}
      videoSrc="https://player.vimeo.com/video/1175801732?autoplay=0&title=0&portrait=0&byline=0"
      videoTitle="Vimeo video"
    />
  );
};

export default KonzultaciaHeroSection;

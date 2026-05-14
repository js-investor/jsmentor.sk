import HeroSectionTemplate from "@/components/templates/HeroSectionTemplate";

const HomeDesignHeaderSection = () => {
  return (
    <HeroSectionTemplate
      headerItems={[
        { label: "Prečo to nefunguje", href: "#problem" },
        { label: "Ako to riešime", href: "#riesenie" },
        { label: "Pre koho", href: "#pre-koho" },
        { label: "Recenzie", href: "#recenzie" },
        { label: "FAQ", href: "#faq" },
      ]}
      headerCtaLabel="Získať Wealth Map"
      headerCtaHref="#formular"
      title={
        <>
          Finančný plán, pri ktorom váš <span className="text-primary font-bold">majetok rastie v bezpečí.</span>
        </>
      }
      subtitle={
        <>
          Wealth Map je váš osobný finančný plán na mieru. Ukáže vám presne, kde vaše peniaze sú, kam smerujú a
          čo s nimi urobiť, aby <strong>váš majetok konečne zodpovedal vášmu príjmu.</strong>
        </>
      }
      heroCtaLabel="Získať Wealth Map"
      heroCtaHref="#formular"
      heroSecondaryLinkLabel="Ako to funguje →"
      heroSecondaryLinkHref="#riesenie"
      badges={["Bez záväzkov", "Odpoviem do 48 hodín", "Pod dohľadom NBS"]}
      videoSrc="https://player.vimeo.com/video/1145809910"
      videoTitle="JS Wealth Map video"
    />
  );
};

export default HomeDesignHeaderSection;

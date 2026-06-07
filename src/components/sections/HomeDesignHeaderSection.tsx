import HeroSectionTemplate from "@/components/templates/HeroSectionTemplate";
import HeroTrustStatsBar from "@/components/sections/HeroTrustStatsBar";

const HomeDesignHeaderSection = () => {
  return (
    <HeroSectionTemplate
      compactBottom
      preheaderClassName="rounded-full bg-[#7A1F1F] px-4 py-1.5 text-small font-sans font-medium normal-case tracking-normal text-white"
      subtitleClassName="hero-subheadline"
      descriptionClassName="hero-description"
      headerCtaLabel="Chcem sa pridať ZADARMO 🚀"
      headerCtaHref="#formular"
      preheader={<>Toto nie sú finančné rozprávky</>}
      title={
        <>
          Toto je cesta
          <br />
          k bohatšiemu životu.
        </>
      }
      subtitle="Vyšší príjem ti môže kúpiť pohodlie. Rozumné finančné rozhodnutia ti kupujú slobodu."
      description="V mojej komunite ti ukážem, ako robiť lepšie rozhodnutia pri investovaní, hypotéke, fondoch, ETF, nehnuteľnostiach, rente a produktoch, ktoré ťa môžu stáť tisíce eur."
      trustStatsPanel={<HeroTrustStatsBar />}
      heroCtaLabel="Chcem sa pridať ZADARMO 🚀"
      heroCtaHref="#formular"
      videoSrc="https://player.vimeo.com/video/1198650601"
      videoTitle="JS Mentor hero video"
    />
  );
};

export default HomeDesignHeaderSection;

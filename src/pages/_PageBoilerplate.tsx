import HeroSectionTemplate from "@/components/templates/HeroSectionTemplate";
import FooterSection from "@/components/sections/FooterSection";

const PageBoilerplate = () => (
  <main>
    <HeroSectionTemplate
      headerItems={[
        { label: "Lorem" },
        { label: "Ipsum" },
        { label: "Dolor" },
        { label: "Sit" },
        { label: "Amet" },
      ]}
      headerCtaLabel="Lorem ipsum"
      title={
        <>
          Lorem ipsum <span className="text-primary font-bold">dolor sit</span>
          <br className="hidden lg:block" /> amet, <span className="text-primary font-bold">consectetur elit</span>
        </>
      }
      subtitle={<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</>}
      description={
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </>
      }
      heroCtaLabel="Lorem ipsum"
      badges={["Lorem ipsum dolor", "Sit amet elit", "Consectetur adipiscing"]}
      videoSrc="https://player.vimeo.com/video/1175801732?autoplay=0&title=0&portrait=0&byline=0"
      videoTitle="Lorem ipsum video"
    />

    {/* Tu pridavaj dalsie sekcie stranky */}

    <FooterSection />
  </main>
);

export default PageBoilerplate;

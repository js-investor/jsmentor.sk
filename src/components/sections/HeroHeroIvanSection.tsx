import AnimatedSection from "@/components/AnimatedSection";

const HeroHeroIvanSection = () => (
  <section
    id="ivan"
    className="section-white relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-0 pb-[72px] md:pb-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-[980px]">
      <AnimatedSection>
        <div className="mx-auto w-full max-w-[900px] text-center">
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }} className="text-[1.875rem] leading-[1.3] text-foreground md:text-[2.5rem] lg:text-[3rem]">
            <span style={{ color: "#ada8a3" }}>Táto komunita</span> je pre ľudí, ktorí chcú finančne rásť. Ktorí chcú počuť odborné praktické rady a nie prázdne teórie.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroIvanSection;

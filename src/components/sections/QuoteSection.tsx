import AnimatedSection from "@/components/AnimatedSection";

const QuoteSection = () => (
  <section
    className="overflow-hidden px-5 py-[72px] md:px-8 md:py-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="section-container">
      <AnimatedSection>
        <p
          className="mx-auto max-w-4xl text-center leading-[1.25] text-foreground"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Najlepšie investované peniaze sú do kvalitných informácií
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default QuoteSection;

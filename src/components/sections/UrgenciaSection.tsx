import AnimatedSection from "@/components/AnimatedSection";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

const UrgenciaSection = () => (
  <section
    id="urgencia"
    className="section-padding relative overflow-hidden scroll-mt-24"
    style={{ backgroundColor: "#f7f1e8" }}
  >
    <div className="section-container">
      <AnimatedSection>
        <div
          className="mx-auto max-w-5xl rounded-[28px] border border-[#c9c2bc] px-5 py-8 md:px-10 md:py-12"
          style={{
            background:
              "linear-gradient(135deg, #efedeb 0%, #d8d6d2 28%, #f6f4f1 52%, #d2cfca 74%, #ece9e6 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="headline-serif">
              Každý deň bez jasného plánu je deň, kedy{" "}
              <span className="text-primary font-bold">vaše peniaze pracujú pre niekoho iného.</span>
            </h2>
            <p className="sub-headline mt-6 text-foreground/85">
              Inflácia nezmizne. Poplatky budú naďalej rásť. A čas, ktorý mohol váš majetok zhodnocovať, sa vám už nevráti.
            </p>
            <p className="mt-5 font-sans text-lead text-foreground/90">
              <strong>Perfektný moment nepríde. Ale správny krok môžete urobiť dnes.</strong>
            </p>

            <p className="mt-6 font-sans text-lead text-foreground/90">
              Vyplňte formulár a do 48 hodín si dohodneme bezplatný úvodný hovor.
            </p>
            <button type="button" onClick={scrollToBooking} className="btn-primary mt-8 text-body">
              Získať Wealth Map
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default UrgenciaSection;

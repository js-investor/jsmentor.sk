import AnimatedSection from "@/components/AnimatedSection";

const PodmienkyPorovnanieSection = () => (
  <section className="section-cream section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl text-center mb-8 md:mb-10">
          <p className="font-sans text-lead text-foreground/80">
            Namiesto umelých sľubov vám <strong className="text-foreground">garantujem najlepšie podmienky na trhu.</strong>
            <br />
            <span className="text-foreground/80">Porovnajte si to sami:</span>
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.06}>
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="border-b border-black/10">
                <th className="w-[22%] px-4 py-5" />
                <th className="w-[26%] px-4 py-5 bg-[#dfe7e2] rounded-t-2xl [font-family:var(--font-serif)] h3 text-foreground">
                  Wealth Map
                </th>
                <th className="w-[17%] px-4 py-5 font-sans h5 text-foreground">Investičné platformy</th>
                <th className="w-[17%] px-4 py-5 font-sans h5 text-foreground">Banky</th>
                <th className="w-[18%] px-4 py-5 font-sans h5 text-foreground">Poradcovia</th>
              </tr>
            </thead>
            <tbody className="font-sans text-body text-foreground/85">
              <tr className="border-b border-black/10">
                <td className="px-4 py-5 text-left font-semibold">
                  Manažérsky poplatok
                  <br />
                  <span className="font-normal">(ročne)</span>
                </td>
                <td className="px-4 py-5 bg-[#dfe7e2] font-medium">
                  do 100 000 € - <strong>0,49 %</strong>
                  <br />
                  nad 100 000 € - <strong>0,35 %</strong>
                </td>
                <td className="px-4 py-5">0 - 3 %</td>
                <td className="px-4 py-5">2 - 3 %</td>
                <td className="px-4 py-5">2 - 3 %</td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="px-4 py-5 text-left font-semibold">Dane</td>
                <td className="px-4 py-5 bg-[#dfe7e2] font-semibold">0 %</td>
                <td className="px-4 py-5">0 %</td>
                <td className="px-4 py-5">19 %</td>
                <td className="px-4 py-5">0 %</td>
              </tr>
              <tr>
                <td className="px-4 py-5 text-left font-semibold">Vstupný poplatok</td>
                <td className="px-4 py-5 bg-[#dfe7e2] rounded-b-2xl font-semibold">max 1 %</td>
                <td className="px-4 py-5">0 - 3 %</td>
                <td className="px-4 py-5">2 - 3 %</td>
                <td className="px-4 py-5">2 - 3 %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PodmienkyPorovnanieSection;

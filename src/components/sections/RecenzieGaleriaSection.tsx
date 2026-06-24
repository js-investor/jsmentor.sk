import AnimatedSection from "@/components/AnimatedSection";
import recenzia1 from "@/assets/images/recenzia-1.png";
import recenzia2 from "@/assets/images/recenzia-2.png";
import recenzia3 from "@/assets/images/recenzia-3.png";
import recenzia4 from "@/assets/images/recenzia-4.png";
import recenzia5 from "@/assets/images/recenzia-5.png";
import recenzia6 from "@/assets/images/recenzia-6.png";
import recenzia7 from "@/assets/images/recenzia-7.png";
import recenzia8 from "@/assets/images/recenzia-8.png";
import recenzia9 from "@/assets/images/recenzia-9.png";

const images = [
  { src: recenzia1, alt: "Recenzia klienta 1" },
  { src: recenzia2, alt: "Recenzia klienta 2" },
  { src: recenzia3, alt: "Recenzia klienta 3" },
  { src: recenzia4, alt: "Recenzia klienta 4" },
  { src: recenzia5, alt: "Recenzia klienta 5" },
  { src: recenzia6, alt: "Recenzia klienta 6" },
  { src: recenzia7, alt: "Recenzia klienta 7" },
  { src: recenzia8, alt: "Recenzia klienta 8" },
  { src: recenzia9, alt: "Recenzia klienta 9" },
];

const RecenzieGaleriaSection = () => (
  <section
    className="overflow-hidden px-5 py-[72px] md:px-8 md:py-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="section-container">
      <AnimatedSection delay={0.07}>
        <div className="mx-auto columns-1 gap-5 sm:columns-2 md:columns-3 md:gap-6">
          {images.map(({ src, alt }) => (
            <div
              key={alt}
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] md:mb-6"
            >
              <img
                src={src}
                alt={alt}
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href="https://herohero.co/jsmentor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-body"
            data-umami-event="click_herohero"
            data-umami-event-section="recenzie-galeria"
          >
            Vyskúšať na 15 dní zadarmo 🚀
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default RecenzieGaleriaSection;

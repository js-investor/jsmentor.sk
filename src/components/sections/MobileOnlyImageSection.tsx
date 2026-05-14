import mobileOnlyImage from "@/assets/images/ivan-jasik-najdrahsie-investovanie-je-bez-strategie.jpeg";

const MobileOnlyImageSection = () => (
  <section className="md:hidden px-5 py-8" style={{ backgroundColor: "#F2EEE7" }}>
    <div className="mx-auto max-w-[420px]">
      <img
        src={mobileOnlyImage}
        alt="Ivan Jasik - Najdrahsie investovanie je bez strategie"
        className="block w-full h-auto rounded-2xl object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
);

export default MobileOnlyImageSection;

import ivanKniha from "@/assets/images/js-investor-ivan-kniha.jpg";
import { motion } from "framer-motion";

const KonzultaciaPostStatsExtremySection = () => (
  <section className="relative overflow-hidden" style={{ backgroundColor: "#FDF9F3" }}>
    <div className="relative z-10 px-5 md:px-10 lg:px-16 py-12 md:py-24 max-w-[1180px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[760px] text-center"
      >
        <h2 className="headline-serif mb-6 md:mb-8 text-foreground">
          Stretávam sa s{" "}
          <span className="text-primary font-bold">dvoma extrémami.</span>
        </h2>
        <p className="text-lead font-sans text-muted-foreground mb-8 md:mb-10">
          Ľudia buď{" "}
          <strong className="font-semibold text-foreground">neinvestujú vôbec</strong> a prichádzajú o
          peniaze cez infláciu, alebo{" "}
          <strong className="font-semibold text-foreground">
            investujú, ale neefektívne, bez stratégie
          </strong>{" "}
          a so zbytočnými poplatkami, ktoré ich každý rok brzdia.
        </p>
        <div className="mx-auto w-full max-w-[min(100%,640px)]">
          <img
            src={ivanKniha}
            alt="Ivan Jašík s knihou"
            className="w-full h-auto rounded-2xl md:rounded-[20px] object-cover shadow-sm ring-1 ring-black/5"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default KonzultaciaPostStatsExtremySection;

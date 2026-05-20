import { motion } from "framer-motion";
import {
  BookOpen,
  HelpCircle,
  Home,
  Map,
  PiggyBank,
  type LucideIcon,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

const painItems: { Icon: LucideIcon; content: ReactNode }[] = [
  {
    Icon: HelpCircle,
    content: (
      <>
        Všade počúvaš rady, ale stále <strong className="font-bold text-foreground">nevieš, čo presne robiť</strong>
      </>
    ),
  },
  {
    Icon: Home,
    content: (
      <>
        Chceš hypotéku, ale <strong className="font-bold text-foreground">20 % vlastných zdrojov</strong> vyzerá ako
        sci-fi
      </>
    ),
  },
  {
    Icon: PiggyBank,
    content: (
      <>
        Finančná rezerva je pre teba <strong className="font-bold text-foreground">večná utópia</strong>
      </>
    ),
  },
  {
    Icon: Users,
    content: (
      <>
        Často zažívaš <strong className="font-bold text-foreground">hádky kvôli peniazom</strong>
      </>
    ),
  },
  {
    Icon: Wallet,
    content: (
      <>
        Makáš od rána do večera, ale na konci mesiaca{" "}
        <strong className="font-bold text-foreground">nevieš, kam ti zmizla tvoja výplata?</strong>
      </>
    ),
  },
  {
    Icon: BookOpen,
    content: (
      <>
        Počuješ názvy fondov, produktov a platforiem, ale{" "}
        <strong className="font-bold text-foreground">nikto ti ich nevysvetlí zrozumiteľne a prakticky.</strong>
      </>
    ),
  },
  {
    Icon: Map,
    content: (
      <>
        Vieš, že by si mal mať v peniazoch väčší systém, len{" "}
        <strong className="font-bold text-foreground">nevieš, kde presne začať.</strong>
      </>
    ),
  },
  {
    Icon: Target,
    content: (
      <>
        Nechceš „zbohatnúť cez noc“. Chceš sa v tom konečne{" "}
        <strong className="font-bold text-foreground">vyznať a robiť lepšie rozhodnutia.</strong>
      </>
    ),
  },
];

const listParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.1,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const footerBlock = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const StaleSaTiToDejeSection = () => (
  <section
    id="stale-sa-ti-to-deje"
    className="section-cream section-padding relative overflow-hidden scroll-mt-24"
  >
    <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.22]" />
    <div
      className="pointer-events-none absolute inset-0 opacity-100"
      style={{
        background:
          "radial-gradient(120% 80% at 50% -10%, hsl(var(--primary) / 0.06) 0%, transparent 55%), linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--primary) / 0.02) 100%)",
      }}
    />
    <div className="section-container relative z-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="headline-serif">Stále sa ti to deje?</h2>
        </motion.div>

        <motion.div
          className="grid gap-4 text-left sm:gap-5 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-4"
          variants={listParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.08 }}
        >
          {painItems.map(({ Icon, content }, index) => (
            <motion.div
              key={index}
              variants={listItem}
              className="flex items-center gap-3.5 rounded-2xl border border-[#d4c4b2]/80 bg-[#F6F1EC] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition-[box-shadow,border-color] duration-300 hover:border-[#c9b8a4] hover:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.12)] sm:gap-4 sm:px-5 sm:py-4"
            >
              <span className="shrink-0 text-[#C74D3D]" aria-hidden>
                <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={2.1} />
              </span>
              <p className="min-w-0 font-sans text-body leading-relaxed text-foreground/90">
                {content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="quote-serif mx-auto mt-10 max-w-2xl text-center text-foreground/90 md:mt-14"
          variants={footerBlock}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-32px" }}
        >
          Ak si pri aspoň jednom bode prikývol, nie si sám.
        </motion.p>
      </div>
    </div>
  </section>
);

export default StaleSaTiToDejeSection;

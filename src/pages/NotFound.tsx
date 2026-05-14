import brandLogo from "@/assets/images/js-investor-logo.png";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main
    className="relative min-h-screen overflow-hidden"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-50" />
    <div className="pointer-events-none absolute right-[15%] top-24 h-[380px] w-[380px] rounded-full bg-primary/5 blur-[100px]" />
    <div className="pointer-events-none absolute bottom-[10%] left-[10%] h-[280px] w-[280px] rounded-full bg-forest-glow/5 blur-[80px]" />

    <header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-primary/10 px-5 py-4 backdrop-blur-md md:px-10 md:py-[0.8rem] lg:px-16"
      style={{ backgroundColor: "rgba(255, 249, 245, 0.9)" }}
    >
      <Link to="/" className="flex items-center">
        <img src={brandLogo} alt="JS Investor logo" className="h-10 w-auto md:h-12" />
      </Link>
      <Link to="/" className="btn-pill">
        Hlavná stránka
      </Link>
    </header>

    <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-5 pb-20 pt-[7rem] text-center md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-lg"
      >
        <p
          className="mb-5 font-serif text-7xl font-extrabold leading-none tracking-tight text-primary sm:text-8xl md:mb-6 md:text-9xl"
          aria-hidden
        >
          404
        </p>
        <h1 className="headline-serif mb-4">
          Táto stránka{" "}
          <span className="text-primary font-bold">neexistuje</span>
        </h1>
        <p className="sub-headline mx-auto mb-10 max-w-md">
          Skontroluj adresu v prehliadači alebo sa{" "}
          <strong>vráť na úvodnú stránku.</strong> Tam nájdeš všetko podstatné.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 text-lg"
        >
          <Home className="h-5 w-5" aria-hidden />
          Späť na hlavnú stránku
        </Link>
      </motion.div>
    </section>

    <FooterSection />
  </main>
);

export default NotFound;

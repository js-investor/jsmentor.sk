import KalkulackyShell from "@/pages/kalkulacky/KalkulackyShell";
import KalkulackaPage from "@/pages/kalkulacky/KalkulackaPage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type KalkulackyProductPageProps = {
  title: string;
  /** Skryť názov nad obsahom (napr. plná vstavaná kalkulačka má vlastný nadpis). */
  hideTitle?: boolean;
  children?: ReactNode;
};

const KalkulackyProductPage = ({ title, hideTitle = false, children }: KalkulackyProductPageProps) => (
  <KalkulackyShell>
    <div className="section-container">
      <Link
        to="/kalkulacky"
        className="inline-flex items-center gap-2 font-sans text-sm text-primary hover:text-forest-hover transition-colors mb-6 md:mb-8"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        Späť na kalkulačky
      </Link>
      {!hideTitle ? <KalkulackaPage title={title} /> : null}
      {children}
    </div>
  </KalkulackyShell>
);

export default KalkulackyProductPage;

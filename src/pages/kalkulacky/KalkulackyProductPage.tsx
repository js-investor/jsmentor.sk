import KalkulackyShell from "@/pages/kalkulacky/KalkulackyShell";
import KalkulackaPage from "@/pages/kalkulacky/KalkulackaPage";
import { BONUSY_BASE_PATH } from "@/pages/kalkulacky/kalkulackyConfig";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type KalkulackyProductPageProps = {
  title: string;
  /** Skryť názov nad obsahom (napr. plná vstavaná kalkulačka má vlastný nadpis). */
  hideTitle?: boolean;
  /** Kalkulačka manažuje vlastné sekcie na celú šírku — obsah nie je zabalený do section-container. */
  fullBleed?: boolean;
  children?: ReactNode;
};

const KalkulackyProductPage = ({ title, hideTitle = false, fullBleed = false, children }: KalkulackyProductPageProps) => (
  <KalkulackyShell fullBleed={fullBleed}>
    <div className="section-container">
      <div className="mb-6 flex justify-center md:mb-8">
        <Link
          to={BONUSY_BASE_PATH}
          className="inline-flex items-center gap-2 font-sans text-sm text-primary transition-colors hover:text-forest-hover"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Späť na bonusy
        </Link>
      </div>
      {!hideTitle ? <KalkulackaPage title={title} /> : null}
      {!fullBleed ? children : null}
    </div>
    {fullBleed ? children : null}
  </KalkulackyShell>
);

export default KalkulackyProductPage;

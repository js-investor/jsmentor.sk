import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
import Index from "./pages/Index.tsx";
import Konzultacia from "./pages/Konzultacia.tsx";
import Gdpr from "./pages/Gdpr.tsx";
import KalkulackyCategoryPage from "./pages/kalkulacky/KalkulackyCategoryPage.tsx";
import KalkulackyProductPage from "./pages/kalkulacky/KalkulackyProductPage.tsx";
import {
  BONUSY_BASE_PATH,
  KALKULACKY_CALCULATORS,
  KALKULACKY_LEGACY_PATH_REDIRECTS,
} from "./pages/kalkulacky/kalkulackyConfig.ts";
import HypotekarnaCalculator from "./components/calculators/hypotekarna/HypotekarnaCalculator.tsx";
import InvesticnaCalculator from "./components/calculators/investicna/InvesticnaCalculator.tsx";
import MzdovaCalculator from "./components/calculators/mzdova/MzdovaCalculator.tsx";
import PodlaPrijmuCalculator from "./components/calculators/podlaprijmu/PodlaPrijmuCalculator.tsx";
import RentovaCalculator from "./components/calculators/rentova/RentovaCalculator.tsx";
import InvesticnyBytCalculator from "./components/calculators/investicny-byt/InvesticnyBytCalculator.tsx";
import EtfSemaforCalculator from "./components/calculators/etf-semafor/EtfSemaforCalculator.tsx";
import PoplatkovyRontgenCalculator from "./components/calculators/poplatkovy-rontgen/PoplatkovyRontgenCalculator.tsx";
import NotFound from "./pages/NotFound.tsx";
import type { ReactNode } from "react";

const calculatorBySlug: Record<string, ReactNode> = {
  "hypo-kalkulacka": <HypotekarnaCalculator />,
  "investicna-kalkulacka": <InvesticnaCalculator />,
  "mzdova-kalkulacka": <MzdovaCalculator />,
  "uverova-kalkulacka": <PodlaPrijmuCalculator />,
  "rentova-kalkulacka": <RentovaCalculator />,
  "investicny-byt": <InvesticnyBytCalculator />,
  "etf-semafor":         <EtfSemaforCalculator />,
  "poplatkovy-rontgen":  <PoplatkovyRontgenCalculator />,
};

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/konzultacia" element={<Konzultacia />} />
      <Route path="/gdpr" element={<Gdpr />} />
      <Route path={BONUSY_BASE_PATH} element={<KalkulackyCategoryPage />} />
      {KALKULACKY_CALCULATORS.map((c) => {
        const calculator = calculatorBySlug[c.slug];
        return (
          <Route
            key={c.slug}
            path={`${BONUSY_BASE_PATH}/${c.slug}`}
            element={
              calculator ? (
                <KalkulackyProductPage title={c.title} hideTitle fullBleed={c.fullBleed}>
                  {calculator}
                </KalkulackyProductPage>
              ) : (
                <KalkulackyProductPage title={c.title} />
              )
            }
          />
        );
      })}
      {KALKULACKY_LEGACY_PATH_REDIRECTS.map(({ from, to }) => (
        <Route key={from} path={from} element={<Navigate to={to} replace />} />
      ))}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

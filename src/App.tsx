import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Konzultacia from "./pages/Konzultacia.tsx";
import Gdpr from "./pages/Gdpr.tsx";
import KalkulackyCategoryPage from "./pages/kalkulacky/KalkulackyCategoryPage.tsx";
import KalkulackyProductPage from "./pages/kalkulacky/KalkulackyProductPage.tsx";
import { KALKULACKY_CALCULATORS } from "./pages/kalkulacky/kalkulackyConfig.ts";
import HypotekarnaCalculator from "./components/calculators/hypotekarna/HypotekarnaCalculator.tsx";
import InvesticnaCalculator from "./components/calculators/investicna/InvesticnaCalculator.tsx";
import MzdovaCalculator from "./components/calculators/mzdova/MzdovaCalculator.tsx";
import PodlaPrijmuCalculator from "./components/calculators/podlaprijmu/PodlaPrijmuCalculator.tsx";
import RentovaCalculator from "./components/calculators/rentova/RentovaCalculator.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/konzultacia" element={<Konzultacia />} />
      <Route path="/gdpr" element={<Gdpr />} />
      <Route path="/kalkulacky" element={<KalkulackyCategoryPage />} />
      <Route path="/kalkulacky/podla-prijmu" element={<Navigate to="/kalkulacky/uvery" replace />} />
      <Route path="/kalkulacky/uvery-dti-dsti" element={<Navigate to="/kalkulacky/uvery" replace />} />
      {KALKULACKY_CALCULATORS.map((c) => (
        <Route
          key={c.slug}
          path={`/kalkulacky/${c.slug}`}
          element={
            c.slug === "hypo-smart" ? (
              <KalkulackyProductPage title={c.title} hideTitle>
                <HypotekarnaCalculator />
              </KalkulackyProductPage>
            ) : c.slug === "investicna" ? (
              <KalkulackyProductPage title={c.title} hideTitle>
                <InvesticnaCalculator />
              </KalkulackyProductPage>
            ) : c.slug === "mzdova-kalkulacka" ? (
              <KalkulackyProductPage title={c.title} hideTitle>
                <MzdovaCalculator />
              </KalkulackyProductPage>
            ) : c.slug === "uvery" ? (
              <KalkulackyProductPage title={c.title} hideTitle>
                <PodlaPrijmuCalculator />
              </KalkulackyProductPage>
            ) : c.slug === "rentova-kalkulacka" ? (
              <KalkulackyProductPage title={c.title} hideTitle>
                <RentovaCalculator />
              </KalkulackyProductPage>
            ) : (
              <KalkulackyProductPage title={c.title} />
            )
          }
        />
      ))}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

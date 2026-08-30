"use client";

import Hero from "./components/client/hero";
import { FullCategorias } from "./components/client/categorias";
import { 
  UltimosIngresosSection, 
  MaquillajeSkincareSection, 
  CarterasTendenciaSection,
  DecoracionHogarSection
} from "./components/client/SectionVendidos";
import { BannerEnvios } from "./components/client/banerEnvios";

export default function Home() {
  return (
    <div>
      <Hero />
      <FullCategorias />
      <UltimosIngresosSection />
      <BannerEnvios />
      <DecoracionHogarSection />
      <MaquillajeSkincareSection />
      <CarterasTendenciaSection />
    </div>
  );
}
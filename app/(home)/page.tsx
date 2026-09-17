"use client";

import Hero from "../components/client/hero";
import { FullCategorias } from "../components/client/categorias";
import { DynamicProductSections } from "../components/client/SectionVendidos";
import { BannerEnvios } from "../components/client/banerEnvios";

export default function Home() {
  return (
    <div>
      <Hero />
      <FullCategorias />
      <DynamicProductSections>
        <BannerEnvios />
      </DynamicProductSections>
    </div>
  );
}
"use client";

import Hero from "./client/component/hero";
import { FullCategorias } from "./client/component/categorias";
import { SectionVendidos } from "./client/component/SectionVendidos";
import { BannerEnvios } from "./client/component/banerEnvios";

export default function Home() {
  return (
    <div>
      <Hero />
      <FullCategorias />
      <SectionVendidos />
      <BannerEnvios />
    </div>
  );
}
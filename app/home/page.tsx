import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Hero from "./component/hero";
import { BannerEnvios } from "./component/banerEnvios";
import { NuevosIngresos } from "./component/SectionNuevo";
import { SectionVendidos } from "./component/SectionVendidos";
import { PrendasPopulares } from "./component/PrendasPopulares";
import { Categorias } from "./component/SectionCategorias";
import { Servicio } from "./component/Servicio";
import { SectionLooks } from "./looks/SectionLooks";
// Configuramos la fuente
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Cargamos los pesos necesarios
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAMBO - Dashboard",
  description: "Sistema de gestión para MAMBO",
};

export default function page({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jakarta.className}>
      <body>
        <Hero />
        <SectionLooks />
        <BannerEnvios />
        <Servicio />
        <NuevosIngresos />
        <SectionVendidos />
        <PrendasPopulares />
        <Categorias />
        <Servicio />
      </body>
    </html>
  );
}
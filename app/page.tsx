import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Hero from "./home/hero"; 
import { BannerEnvios } from "./home/component/banerEnvios";
import { NuevosIngresos } from "./home/SectionNuevo";
import { SectionVendidos } from "./home/SectionVendidos";
import { PrendasPopulares } from "./home/PrendasPopulares";
import { SectionCategorias } from "./home/SectionCategorias";
import { SectionLooks } from "./home/SectionLooks";
import { Suscripcion } from "./home/Suscripcion";
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
        <BannerEnvios />
        <SectionLooks />
        <SectionCategorias />
        <NuevosIngresos />
        <SectionVendidos />
        <PrendasPopulares />
        <Suscripcion />
      </body>
    </html>
  );
}
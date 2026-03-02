import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./client/navbar";
import Hero from "./client/component/hero";
import { SectionVendidos } from "./client/component/SectionVendidos";
import { BannerEnvios } from "./client/component/banerEnvios";
import { Categorias } from "./client/component/categorias";
import { NuevosIngresos } from "./client/component/SectionNuevo";
import { Footer } from "./client/component/footer";
import { Servicio } from "./client/component/Servicio";
import { PrendasPopulares } from "./client/component/PrendasPopulares";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jakarta.className}>
      <body>
        <Navbar />
        <Hero />
        <BannerEnvios />
        <NuevosIngresos />
        <SectionVendidos />
        <PrendasPopulares />
        <Categorias />
        <Servicio />
        <Footer />
      </body>
    </html>
  );
}
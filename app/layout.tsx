import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./client/navbar";
import Hero from "./client/component/hero";
import { Servicio } from "./client/component/Servicio";
import { ProbadorInfo } from "./client/component/ProbadorInfo";
import { SectionVendidos } from "./client/component/SectionVendidos";
import { BannerEnvios } from "./client/component/banerEnvios";
import { FullCategorias } from "./client/component/categorias";
import { NuevosIngresos } from "./client/component/nuevos";
import { Footer } from "./client/component/footer";

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
        <FullCategorias />
        <Servicio />
        <Footer />
      </body>
    </html>
  );
}
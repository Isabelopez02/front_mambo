import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import { Footer } from "./footer";

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
        <main>
          {children} 
        </main>
        <Footer />
      </body>
    </html>
  );
}
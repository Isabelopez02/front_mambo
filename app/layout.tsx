import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./client/navbar";
import { Footer } from "./client/component/footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "TATY IMPORTACIONES | El Paraíso de la Belleza a Precios de Importador",
  description: "Descubre los ingresos más recientes en maquillaje, skincare, carteras y hogar.",
};

import { CartProvider } from "./client/context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${dmSerif.variable}`}>
      <body 
        className={outfit.className}
        style={{ 
          margin: 0, 
          padding: 0, 
          backgroundColor: '#faf7f4', 
          color: '#1a0f14',
          fontFamily: 'var(--font-outfit), sans-serif'
        }}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
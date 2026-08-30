"use client";

import React from "react";
import Navbar from "../../client/navbar";
import { Footer } from "../../client/footer";
import { CartProvider } from "../../context/CartContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </CartProvider>
  );
}

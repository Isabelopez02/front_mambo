"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag01Icon, StarIcon, ArrowRight01Icon } from "hugeicons-react";
// Importamos tu barra de filtros (Asegúrate de que la ruta coincida)
import { SidebarFiltros } from "./component/SidebarFiltro";
import Link from "next/link";
import TarjetaProducto from "../component/cardProducto"; 
import { productosCatalogo } from "../ts/Prendas"; 
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // Cargamos los pesos necesarios
    display: "swap",
  });


export default function ProductosPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [orden, setOrden] = useState("relevancia");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  return (
      <div  className={jakarta.className} style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '90px 20px 60px' : '100px 5% 80px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : '50px', alignItems: 'flex-start' }}>
        
        {/* COLUMNA IZQUIERDA: Filtros */}
        <SidebarFiltros />

        {/* COLUMNA DERECHA: Catálogo */}
        <div style={{ flex: 1, width: '100%' }}>
          
          {/* 1. Miga de pan (Breadcrumbs) */}
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '15px' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Inicio</Link>
            <span>/</span>
            <span style={{ color: '#000' }}>Ropa Hombre</span>
          </div>

          {/* 2. Banner de Categoría (Marketing) */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: isMobile ? '20px' : '30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.4rem', fontWeight: '900', color: '#0f172a' }}>COLECCIÓN FEBRERO DROP</h2>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>Aprovecha 20% OFF en prendas seleccionadas.</p>
            </div>
          </div>

          {/* 3. Encabezado y Ordenamiento (Sort) */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '30px', gap: '15px' }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '950', margin: 0, letterSpacing: '-1px', color: '#000' }}>
              TODA LA <span style={{ color: '#3b82f6' }}>COLECCIÓN</span> <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: '700' }}>({productosCatalogo.length})</span>
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Ordenar por:</span>
              <select 
                value={orden} 
                onChange={(e) => setOrden(e.target.value)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontWeight: '800', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="relevancia">Relevancia</option>
                <option value="nuevos">Novedades</option>
                <option value="precio_alto">Precio: Alto a Bajo</option>
                <option value="precio_bajo">Precio: Bajo a Alto</option>
              </select>
            </div>
          </div>

          {/* 4. LA GRILLA DE PRODUCTOS (Empty State integrado) */}
          {productosCatalogo.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8fafc', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#000' }}>No encontramos lo que buscas 🤔</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Pero mira estos recomendados que seguro te encantarán.</p>
              {/* Aquí podrías llamar a un componente de recomendados */}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '12px' : '24px' }}>
              {productosCatalogo.map((producto, index) => (
                <TarjetaProducto key={producto.id} producto={producto} index={index} isMobile={isMobile} />
              ))}
            </div>
          )}

          {/* 5. Carga Progresiva (Load More) */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '700', marginBottom: '15px' }}>Has visto 3 de 124 productos</p>
            <div style={{ width: '200px', height: '4px', backgroundColor: '#e2e8f0', margin: '0 auto 20px', borderRadius: '2px' }}>
              <div style={{ width: '30%', height: '100%', backgroundColor: '#000', borderRadius: '2px' }}></div>
            </div>
            <button style={{ padding: '14px 40px', backgroundColor: '#fff', color: '#000', border: '2px solid #000', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s' }}>
              CARGAR MÁS
            </button>
          </div>

        </div>
      </div>

  );
}

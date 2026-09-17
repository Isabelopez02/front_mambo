"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StarIcon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

import { productosService } from "../../services/productos.service";

// Tipos requeridos definidos directamente o importados
interface Product {
  id: number;
  title: string;
  price: string;
  rating: number;
  img: string;
}

interface ProductSectionProps {
  subtitle?: string;
  title: string;
  products: Product[];
}

export function DynamicProductSections({ children }: { children?: React.ReactNode }) {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productosService.getProductos()
      .then((data: any) => {
        if (Array.isArray(data)) {
          setDbProducts(data);
        } else {
          console.error("La API no retornó un arreglo:", data);
          setDbProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setDbProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Cargando catálogo...</div>;
  }

  // Si no hay productos en la BD, mostramos un mensaje vacío
  if (dbProducts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#64748b" }}>
        No hay productos disponibles en el catálogo en este momento.
      </div>
    );
  }

  // Función para transformar del Backend al Frontend UI
  const mapToUI = (item: any): Product => ({
    id: item.id,
    title: item.nombre,
    price: `S/. ${item.precioVentaMin ? item.precioVentaMin.toFixed(2) : "0.00"}`,
    rating: 5,
    img: item.img || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
  });

  // 1. NUEVOS INGRESOS (Los últimos registrados, es decir, mayor ID, máximo 10)
  const nuevosIngresosData = [...dbProducts].sort((a, b) => b.id - a.id).slice(0, 10).map(mapToUI);

  // 2. MÁS POPULARES (Simulamos los más comprados tomando productos aleatorios o con IDs pares para variar)
  const popularesData = [...dbProducts]
    .filter(p => p.id % 2 === 0 || p.id % 3 === 0)
    .sort(() => 0.5 - Math.random()) // Mezcla simple para que luzcan "populares"
    .slice(0, 10)
    .map(mapToUI);
  
  // Si no hay suficientes para mezclar, simplemente tomamos los primeros
  const masPopularesFinal = popularesData.length > 0 ? popularesData : [...dbProducts].slice(0, 10).map(mapToUI);

  // 3. AGRUPAR POR CATEGORÍA PARA EL RESTO DE SECCIONES
  // Agrupamos todos los productos por el nombre de la categoría
  const categoriasMap = new Map<string, any[]>();
  dbProducts.forEach(p => {
    const catName = p.categoria && p.categoria.nombre ? p.categoria.nombre : "Otros";
    if (!categoriasMap.has(catName)) {
      categoriasMap.set(catName, []);
    }
    categoriasMap.get(catName)!.push(p);
  });

  // Convertimos a array de secciones
  const categorySections = Array.from(categoriasMap.entries()).map(([catName, prods]) => {
    return {
      title: catName,
      subtitle: "COLECCIÓN DESTACADA",
      products: prods.map(mapToUI)
    };
  });

  return (
    <>
      {nuevosIngresosData.length > 0 && (
        <ProductSection 
          subtitle="¡RECIÉN LLEGADOS!" 
          title="Nuevos Ingresos" 
          products={nuevosIngresosData} 
        />
      )}

      {masPopularesFinal.length > 0 && (
        <ProductSection 
          subtitle="LOS MÁS COMPRADOS" 
          title="Más Populares" 
          products={masPopularesFinal} 
        />
      )}
      
      {/* BANNER ENVIOS se inserta aquí gracias al prop children */}
      {children}

      {/* SECCIONES POR CATEGORÍA */}
      {categorySections.map((section, idx) => (
        <ProductSection 
          key={idx}
          subtitle={section.subtitle} 
          title={section.title} 
          products={section.products} 
        />
      ))}
    </>
  );
}

function ProductSection({ subtitle, title, products }: ProductSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ 
      padding: isMobile ? '16px 14px' : '20px 6%', 
      backgroundColor: '#ffffff' 
    }}>
      {/* CENTERED HEADER VISUAL PATTERN EXACT MATCH */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: isMobile ? '20px' : '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        {subtitle && (
          <p style={{ 
            fontSize: '0.80rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: '#9c3552', 
            fontWeight: '600', 
            marginBottom: '8px',
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* CAROUSEL WRAPPER WITH CIRCLE ARROW BUTTONS */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* LEFT CIRCLE ARROW */}
        {!isMobile && (
          <button 
            onClick={scrollLeft}
            style={arrowButtonStyle('left')}
            title="Anterior"
          >
            <ArrowLeft01Icon size={14} color="#1a0f14" />
          </button>
        )}

        {/* SCROLLABLE CAROUSEL CONTAINER / RESPONSIVE GRID */}
        <div 
          ref={scrollRef}
          className="product-scroll-grid"
          style={{ 
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: isMobile ? 'calc(50% - 5px)' : 'calc(16.666% - 10px)',
            gap: isMobile ? '10px' : '12px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            width: '100%',
            padding: '2px 0 6px 0',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {products.map((item) => (
            <ProductCard key={item.id} item={item} isMobile={isMobile} />
          ))}
        </div>

        {/* RIGHT CIRCLE ARROW */}
        {!isMobile && (
          <button 
            onClick={scrollRight}
            style={arrowButtonStyle('right')}
            title="Siguiente"
          >
            <ArrowRight01Icon size={14} color="#1a0f14" />
          </button>
        )}
      </div>
    </section>
  );
}

function ProductCard({ item, isMobile }: { item: Product; isMobile: boolean }) {
  const [userRating, setUserRating] = useState<number>(item.rating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #f3e2e8',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      {/* SMALL IMAGE CONTAINER */}
      <div style={{
        width: '100%',
        height: isMobile ? '130px' : '165px',
        backgroundColor: '#e2e2e2',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={item.img} 
          alt={item.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }} 
        />
      </div>

      {/* BOTTOM CONTAINER */}
      <div style={{
        backgroundColor: '#fcf0f4',
        padding: isMobile ? '9px 9px' : '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <h4 style={{ 
            fontSize: isMobile ? '0.75rem' : '0.8rem', 
            fontWeight: '600', 
            color: '#1a0f14', 
            margin: '0 0 2px 0'
          }}>
            {item.title}
          </h4>

          {/* INTERACTIVE 5 STARS */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <span
                key={starIndex}
                onMouseEnter={() => setHoverRating(starIndex)}
                onClick={() => setUserRating(starIndex)}
                style={{ transition: 'transform 0.1s', display: 'inline-flex' }}
              >
                <StarIcon 
                  size={isMobile ? 12 : 13} 
                  color="#e0527f" 
                  fill={starIndex <= (hoverRating || userRating) ? "#e0527f" : "none"} 
                />
              </span>
            ))}
          </div>

          {/* PRICE */}
          <div style={{ fontSize: isMobile ? '0.74rem' : '0.78rem', fontWeight: '600', color: '#1a0f14', marginTop: '1px' }}>
            {item.price}
          </div>
        </div>

        {/* AGREGAR CARRITO BUTTON */}
        <button 
          style={{
            width: '100%',
            padding: isMobile ? '5px 6px' : '6px 8px',
            backgroundColor: '#ffffff',
            border: '1px solid #f3c2d4',
            borderRadius: '4px',
            color: '#e0527f',
            fontSize: isMobile ? '0.58rem' : '0.62rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            marginTop: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e0527f';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#e0527f';
          }}
        >
          AGREGAR CARRITO
        </button>
      </div>
    </motion.div>
  );
}

const arrowButtonStyle = (direction: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  top: '45%',
  [direction]: '-14px',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s, background-color 0.2s'
});
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StarIcon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

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

const ultimosIngresos: Product[] = [
  {
    id: 1,
    title: "Cartera Último",
    price: "S/. 20.00",
    rating: 3,
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Cartera Último",
    price: "S/. 20.00",
    rating: 3,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Cartera Último",
    price: "S/. 20.00",
    rating: 3,
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Cartera Último",
    price: "S/. 20.00",
    rating: 3,
    img: "https://images.unsplash.com/photo-1608248597261-833257647000?q=80&w=600&auto=format&fit=crop"
  }
];

const maquillajeSkincare: Product[] = [
  {
    id: 101,
    title: "Set Skincare Glow",
    price: "S/. 45.00",
    rating: 4,
    img: "https://images.unsplash.com/photo-1608248597261-833257647000?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 102,
    title: "Sombra de Ojos Pastel",
    price: "S/. 25.00",
    rating: 5,
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 103,
    title: "Labial Matte Hydrating",
    price: "S/. 18.00",
    rating: 4,
    img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 104,
    title: "Brochas de Maquillaje Set",
    price: "S/. 32.00",
    rating: 5,
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop"
  }
];

const carterasTendencia: Product[] = [
  {
    id: 201,
    title: "Cartera Crossbody Luxe",
    price: "S/. 65.00",
    rating: 5,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 202,
    title: "Bolso de Mano Nude",
    price: "S/. 78.00",
    rating: 4,
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 203,
    title: "Mini Tote Bag Premium",
    price: "S/. 55.00",
    rating: 5,
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 204,
    title: "Cartera Cuero Sintético",
    price: "S/. 70.00",
    rating: 4,
    img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop"
  }
];

const decoracionHogar: Product[] = [
  {
    id: 301,
    title: "Lámpara Nórdica Minimalista",
    price: "S/. 59.90",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 302,
    title: "Jarrón de Cerámica Estilo Boho",
    price: "S/. 38.00",
    rating: 4,
    img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 303,
    title: "Vela Aromática Artesanal",
    price: "S/. 29.90",
    rating: 5,
    img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 304,
    title: "Set Cojines Decorativos Velvet",
    price: "S/. 49.00",
    rating: 4,
    img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop"
  }
];

export function UltimosIngresosSection() {
  return <ProductSection subtitle="¡Recién Llegados!" 
      title="Últimos Ingresos" products={ultimosIngresos} />;
}

export function MaquillajeSkincareSection() {
  return (
    <ProductSection 
      subtitle="TENDENCIA EN MODA" 
      title="Maquillaje y Skincare" 
      products={maquillajeSkincare} 
    />
  );
}

export function CarterasTendenciaSection() {
  return (
    <ProductSection 
      subtitle="MODA CARTERA" 
      title="Carteras en Tendencia" 
      products={carterasTendencia} 
    />
  );
}

export function DecoracionHogarSection() {
  return (
    <ProductSection 
      subtitle="MODA HOGAR" 
      title="Decoración de Hogar" 
      products={decoracionHogar} 
    />
  );
}

export function SectionVendidos() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <UltimosIngresosSection />
      <MaquillajeSkincareSection />
      <CarterasTendenciaSection />
      <DecoracionHogarSection />
    </div>
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
      {/* HEADER */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: '12px' 
      }}>
        <div>
          {subtitle && (
            <span style={{ 
              fontSize: '0.6rem', 
              fontWeight: '700', 
              letterSpacing: '2px',
              color: '#e0527f',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '2px'
            }}>
              {subtitle}
            </span>
          )}
          
          <h2 style={{ 
            fontSize: isMobile ? '1rem' : (subtitle ? '1.45rem' : '0.92rem'), 
            fontFamily: subtitle ? 'var(--font-dm-serif), Georgia, serif' : 'inherit',
            fontWeight: subtitle ? '400' : '600', 
            letterSpacing: subtitle ? '0px' : '2.5px',
            color: '#1a0f14',
            textTransform: subtitle ? 'none' : 'uppercase',
            margin: 0
          }}>
            {title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#" style={{ 
            fontSize: '0.68rem', 
            fontWeight: '500', 
            color: '#1a0f14', 
            textDecoration: 'none',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
            VER TODO →
          </a>
        </div>
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

        {/* SCROLLABLE CAROUSEL CONTAINER */}
        <div 
          ref={scrollRef}
          style={{ 
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: isMobile ? 'calc(50% - 5px)' : 'calc(25% - 12px)',
            gap: isMobile ? '10px' : '16px',
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

          {/* 5 STARS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                size={isMobile ? 10 : 11} 
                color="#e0527f" 
                fill={i < item.rating ? "#e0527f" : "none"} 
              />
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
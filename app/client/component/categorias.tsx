"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight01Icon } from "hugeicons-react";

const categoriasFull = [
  { id: 1, title: "Oversize", size: "large", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 2, title: "Accesorios", size: "small", img: "https://i.pinimg.com/736x/58/9e/47/589e4703e15ce9ad9619c222aab5101d.jpg" },
  { id: 3, title: "Calzado", size: "small", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
  { id: 4, title: "Limited", size: "medium", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 5, title: "Urban Tech", size: "medium", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
];

export function FullCategorias() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '80px 5%', backgroundColor: '#fff' }}>
      <div style={{ marginBottom: isMobile ? '40px' : '60px', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: isMobile ? '2.5rem' : '3.5rem', 
          fontWeight: '950', 
          letterSpacing: isMobile ? '-1.5px' : '-3px',
          lineHeight: 1
        }}>
          CATEGORÍAS
        </h2>
        <p style={{ 
          color: '#64748b', 
          fontWeight: '600', 
          fontSize: isMobile ? '0.9rem' : '1rem',
          marginTop: '10px'
        }}>
          Define tu identidad con nuestras líneas exclusivas.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        // En móvil 1 columna, en desktop 4
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gridAutoRows: isMobile ? '220px' : '280px', 
        gap: isMobile ? '15px' : '20px' 
      }}>
        {categoriasFull.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={!isMobile ? { 
              scale: 0.98,
              outline: "4px solid #000",
              outlineOffset: "-4px" 
            } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
            style={{ 
              position: 'relative', 
              borderRadius: isMobile ? '20px' : '30px', 
              overflow: 'hidden',
              cursor: 'pointer',
              // En móvil todos ocupan 1 columna, en desktop respetan su tamaño
              gridColumn: isMobile ? 'span 1' : (cat.size === 'large' ? 'span 2' : 'span 1'),
              gridRow: isMobile ? 'span 1' : (cat.size === 'large' || cat.size === 'medium' ? 'span 2' : 'span 1'),
            }}
          >
            {/* Imagen de fondo */}
            <img 
              src={cat.img} 
              alt={cat.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />

            {/* Overlay */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: isMobile ? '20px' : '30px',
              color: '#fff'
            }}>
              <h3 style={{ 
                fontSize: isMobile ? '1.4rem' : '1.8rem', 
                fontWeight: '900', 
                margin: 0, 
                textTransform: 'uppercase' 
              }}>
                {cat.title}
              </h3>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginTop: '10px', 
                fontSize: '0.8rem', 
                fontWeight: '700', 
                opacity: 0.8 
              }}>
                EXPLORAR <ArrowRight01Icon size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
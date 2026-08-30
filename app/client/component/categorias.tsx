"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const categories = [
  { id: 1, title: "CARTERAS", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop" },
  { id: 2, title: "MAQUILLAJE", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&auto=format&fit=crop" },
  { id: 3, title: "HOGAR", img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=300&auto=format&fit=crop" },
  { id: 4, title: "ACCESORIOS", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop" },
  { id: 5, title: "SKINCARE", img: "https://images.unsplash.com/photo-1608248597261-833257647000?q=80&w=300&auto=format&fit=crop" },
  { id: 6, title: "CALZADO", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop" },
  { id: 7, title: "JOYERÍA", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop" },
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
    <section style={{ 
      padding: isMobile ? '20px 16px' : '24px 6%', 
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f5eaee'
    }}>
      {/* SECTION TITLE */}
      <div style={{ marginBottom: isMobile ? '16px' : '20px', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: isMobile ? '0.88rem' : '0.95rem', 
          fontWeight: '200', 
          letterSpacing: '2.5px',
          color: '#1a0f14',
          fontFamily: 'var(--font-dm-serif), sans-serif',
          margin: 0
        }}>
          Explora nuestras categorias
        </h2>
      </div>

      {/* CATEGORIES WITH CIRCULAR IMAGES */}
      <div style={{ 
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'center',
        alignItems: 'center',
        gap: isMobile ? '16px' : '30px',
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? '8px' : '0'
      }}>
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: '68px'
            }}
          >
            {/* CIRCULAR IMAGE CONTAINER */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1.5px solid #f3e2e8',
              marginBottom: '7px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e0527f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#f3e2e8';
            }}
            >
              <img 
                src={cat.img} 
                alt={cat.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* LABEL */}
            <span style={{ 
              fontSize: '0.62rem', 
              fontWeight: '500', 
              color: '#1a0f14',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              {cat.title}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
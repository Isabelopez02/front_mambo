"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { categoriasService } from "../../services/categorias.service";

export function FullCategorias() {
  const [isMobile, setIsMobile] = useState(false);
  const [dbCategories, setDbCategories] = useState<{id: number, title: string, img: string}[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Fetch categories from backend using service
    categoriasService.listar()
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(c => ({
            id: c.id,
            title: c.nombre,
            img: c.icono || "/img/categorias/default.png"
          }));
          setDbCategories(mapped);
        } else {
          setDbCategories([]); 
        }
      })
      .catch(err => {
        console.error("Error cargando categorias:", err);
        setDbCategories([]);
      });

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (dbCategories.length === 0) {
    return null; // Omitir sección si no hay categorías
  }

  return (
    <section style={{ 
      padding: isMobile ? '24px 16px' : '28px 6% 20px 6%', 
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f5eaee'
    }}>
      {/* CENTERED HEADER VISUAL PATTERN EXACT MATCH */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: isMobile ? '24px' : '36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <p style={{ 
          fontSize: '0.68rem', 
          letterSpacing: '0.3em', 
          textTransform: 'uppercase', 
          color: '#9c3552', 
          fontWeight: '500', 
          marginBottom: '8px',
          margin: '0 0 8px 0',
          textAlign: 'center'
        }}>
          EXPLORA NUESTRA TIENDA
        </p>
        <h2 style={{ 
          fontSize: isMobile ? '1.5rem' : '2.2rem', 
          color: '#1a0f14', 
          fontFamily: "'DM Serif Display', var(--font-dm-serif), Georgia, serif",
          fontWeight: '400',
          lineHeight: '1.2',
          margin: 0,
          textAlign: 'center'
        }}>
          Nuestras Categorías
        </h2>
      </div>
      <div style={{ 
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'center',
        alignItems: 'center',
        gap: isMobile ? '16px' : '36px',
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? '8px' : '0'
      }}>
        {dbCategories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -5, scale: 1.08 }}
            transition={{ duration: 0.2 }}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: '78px'
            }}
          >
            {/* LARGE TRANSPARENT PNG IMAGE DIRECTLY ON WHITE */}
            <div style={{
              width: isMobile ? '85px' : '90px',
              height: isMobile ? '85px' : '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img 
                src={cat.img} 
                alt={cat.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.08))'
                }}
              />
            </div>

            {/* LABEL */}
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: '600', 
              color: '#1a0f14',
              letterSpacing: '0.8px',
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
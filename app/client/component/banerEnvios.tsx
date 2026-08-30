"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight01Icon } from "hugeicons-react";

export function BannerEnvios() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section  className="grid grid-cols-1 md:grid-cols-2"style={{ 
      padding: isMobile ? '20px 16px 40px 16px' : '2px 6% 2px 6%',
      backgroundColor: '#ffffff'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '20px'
      }}>
        {/* LEFT PROMO CARD WITH BACKGROUND IMAGE */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            padding: isMobile ? '24px 20px' : '36px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
           backgroundImage: `url('/banner1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            minHeight: isMobile ? '200px' : '300px'
          }}
        >
          {/* LEFT TEXT CONTENT */}
          <div style={{ maxWidth: '62%', zIndex: 2 }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.3rem' : '1.6rem', 
              fontFamily: 'var(--font-dm-serif), Georgia, serif',
              fontWeight: '200', 
              color: '#1a0f14', 
              margin: '0 0 8px 0',
              lineHeight: '1.2'
            }}>
              Tendencias Virales <br />
              en{" "}
              <span style={{ 
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontStyle: 'italic', 
                color: '#e0527f',
                fontWeight: '400'
              }}>
                Belleza
              </span>
            </h3>

            <p style={{ 
              fontSize: '0.76rem', 
              color: '#55494e', 
              lineHeight: 1.45,
              marginBottom: '18px',
              maxWidth: '200px'
            }}>
              Renueva tu cosmetiquero con nuestros kits de maquillaje a precios especiales.
            </p>

            <button style={{
              padding: '9px 20px',
              backgroundColor: '#1a0f14',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.68rem',
              fontWeight: '600',
              letterSpacing: '0.8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}>
              VER TODO <ArrowRight01Icon size={12} color="#fff" />
            </button>
          </div>
        </motion.div>

        {/* RIGHT PROMO CARD WITH BACKGROUND IMAGE */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            padding: isMobile ? '24px 20px' : '36px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            backgroundImage: ` url('/banner2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            minHeight: '200px'
          }}
        >
          {/* LEFT TEXT CONTENT */}
          <div style={{ maxWidth: '42%', zIndex: 2 }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.3rem' : '1.6rem', 
              fontFamily: 'var(--font-dm-serif), sans-serif',
              fontWeight: '200', 
              color: '#1a0f14', 
              margin: '0 0 8px 0',
              lineHeight: '1.2'
              }}>
              <span style={{ 
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontStyle: 'italic', 
                color: '#e0527f',
                fontWeight: '400'
              }}>
                Especial
              </span>{" "}
              Carteras <br />
              y Accesorios
            </h3>

            <p style={{ 
              fontSize: '0.76rem', 
              color: '#55494e', 
              lineHeight: 1.45,
              marginBottom: '18px',
              maxWidth: '230px'
            }}>
              Calidad y estilo directo de importación. Lleva tus favoritos al mejor precio.
            </p>

            <button style={{
              padding: '9px 20px',
              backgroundColor: '#1a0f14',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.68rem',
              fontWeight: '600',
              letterSpacing: '0.8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}>
              VER MAS <ArrowRight01Icon size={12} color="#fff" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
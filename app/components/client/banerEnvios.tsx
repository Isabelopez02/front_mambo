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
          whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)' }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            borderRadius: '20px',
            padding: isMobile ? '20px 16px' : '28px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            backgroundImage: `url('/banner1.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            minHeight: isMobile ? '200px' : '240px'
          }}
        >
          {/* LEFT TEXT CONTENT */}
          <div style={{ maxWidth: isMobile ? '58%' : '48%', zIndex: 2 }}>
            <span style={{
              display: 'inline-block',
              padding: '3px 8px',
              backgroundColor: '#e0527f',
              color: '#ffffff',
              fontSize: '0.58rem',
              fontWeight: '700',
              borderRadius: '14px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              boxShadow: '0 2px 5px rgba(224, 82, 127, 0.25)'
            }}>
              HASTA 40% OFF
            </span>

            <h3 style={{ 
              fontSize: isMobile ? '1.15rem' : '1.4rem', 
              fontFamily: 'var(--font-dm-serif), Georgia, serif',
              fontWeight: '400', 
              color: '#1a0f14', 
              margin: '0 0 6px 0',
              lineHeight: '1.18',
              textShadow: '0 1px 2px rgba(255,255,255,0.9)'
            }}>
              Tendencias Virales <br />
              en{" "}
              <span style={{ 
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontStyle: 'italic', 
                color: '#e0527f',
                fontWeight: '600'
              }}>
                Belleza
              </span>
            </h3>

            <p style={{ 
              fontSize: '0.72rem', 
              color: '#44383d', 
              lineHeight: 1.35,
              marginBottom: '14px',
              maxWidth: '180px',
              fontWeight: '500',
              textShadow: '0 1px 2px rgba(255,255,255,0.9)'
            }}>
              Kits de maquillaje a precios especiales.
            </p>

            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: '#33222a' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a0f14',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.65rem',
                fontWeight: '700',
                letterSpacing: '0.8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
              }}
            >
              VER TODO <ArrowRight01Icon size={12} color="#fff" />
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT PROMO CARD WITH BACKGROUND IMAGE */}
        <motion.div 
          whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)' }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            borderRadius: '20px',
            padding: isMobile ? '20px 16px' : '28px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            backgroundImage: `url('/banner2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            minHeight: isMobile ? '200px' : '240px'
          }}
        >
          {/* LEFT TEXT CONTENT */}
          <div style={{ maxWidth: isMobile ? '58%' : '48%', zIndex: 2 }}>
            <span style={{
              display: 'inline-block',
              padding: '3px 8px',
              backgroundColor: '#1a0f14',
              color: '#ffffff',
              fontSize: '0.58rem',
              fontWeight: '700',
              borderRadius: '14px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
            }}>
              PROMOCIÓN EXCLUSIVA
            </span>

            <h3 style={{ 
              fontSize: isMobile ? '1.15rem' : '1.4rem', 
              fontFamily: 'var(--font-dm-serif), Georgia, serif',
              fontWeight: '400', 
              color: '#1a0f14', 
              margin: '0 0 6px 0',
              lineHeight: '1.18',
              textShadow: '0 1px 2px rgba(255,255,255,0.9)'
            }}>
              <span style={{ 
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontStyle: 'italic', 
                color: '#e0527f',
                fontWeight: '600'
              }}>
                Especial
              </span>{" "}
              Carteras <br />
              y Accesorios
            </h3>

            <p style={{ 
              fontSize: '0.72rem', 
              color: '#44383d', 
              lineHeight: 1.35,
              marginBottom: '14px',
              maxWidth: '190px',
              fontWeight: '500',
              textShadow: '0 1px 2px rgba(255,255,255,0.9)'
            }}>
              Calidad y estilo directo al mejor precio.
            </p>

            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: '#33222a' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a0f14',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.65rem',
                fontWeight: '700',
                letterSpacing: '0.8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
              }}
            >
              VER MÁS <ArrowRight01Icon size={12} color="#fff" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
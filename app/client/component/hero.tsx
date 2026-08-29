"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight01Icon } from "hugeicons-react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section 
      style={{ 
        position: 'relative',
        minHeight: isMobile ? '380px' : '340px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(90deg, rgba(250, 247, 244, 0.96) 0%, rgba(250, 247, 244, 0.88) 0%, rgba(250, 247, 244, 0.05) 80%), url('fondo-header.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        padding: isMobile ? '30px 20px' : '40px 6%'
      }}
    >
      {/* LEFT CONTENT CONTAINER */}
      <div style={{ 
        maxWidth: '500px',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        {/* SUBHEAD */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ 
            color: '#9c3552', 
            fontWeight: '700', 
            fontSize: '0.68rem',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            display: 'block'
          }}
        >
          TATY IMPORTACIONES
        </motion.span>

        {/* HEADLINE WITH MIXED FONTS */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            fontSize: isMobile ? '1.8rem' : '2.6rem', 
            fontFamily: 'var(--font-dm-serif), Georgia, serif',
            fontWeight: '400', 
            lineHeight: 1.18, 
            margin: '0 0 14px 0', 
            color: '#1a0f14',
            letterSpacing: '-0.3px'
          }}
        >
          El Paraíso de{" "}
          <span style={{ 
            fontStyle: 'italic', 
            color: '#9c3552',
            fontFamily: 'var(--font-dm-serif), Georgia, serif'
          }}>
            la Belleza
          </span>{" "}
          <br />a Precios de Importador
        </motion.h1>

        {/* BODY DESCRIPTION */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ 
            fontSize: isMobile ? '0.82rem' : '0.9rem', 
            color: '#55494e', 
            maxWidth: '420px', 
            lineHeight: 1.55,
            marginBottom: '24px' 
          }}
        >
          Descubre los ingresos más recientes en maquillaje, skincare, carteras y hogar. Todo lo que buscas, directo a tus manos.
        </motion.p>
        
        {/* BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ 
            display: 'flex', 
            gap: '16px', 
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}
        >
          {/* PRIMARY BUTTON */}
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#33222a' }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '11px 22px',
              backgroundColor: '#1a0f14',
              color: '#ffffff',
              border: 'none',
              borderRadius: '3px',
              fontWeight: '600',
              fontSize: '0.72rem',
              letterSpacing: '1.2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            NUEVAS OFERTAS
          </motion.button>

          {/* SECONDARY LINK */}
          <a
            href="#"
            style={{
              fontSize: '0.76rem',
              fontWeight: '600',
              color: '#9c3552',
              textDecoration: 'none',
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderBottom: '1px solid #9c3552',
              paddingBottom: '1px',
              textTransform: 'uppercase',
              transition: 'opacity 0.2s'
            }}
          >
            VER CATALOGO <ArrowRight01Icon size={13} color="#9c3552" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
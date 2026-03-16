"use client";
import { motion } from "framer-motion";
import { TruckIcon } from "hugeicons-react";

export function BannerEnvios() {
  const text = "¡ENVÍOS A TODO EL PAÍS! • COMPRA SEGURA • MAMBO CLOTHING •";
  
  // Duplicamos el texto para que el loop sea perfecto
  const items = Array(10).fill(text);

  return (
    <div style={{ 
      backgroundColor: '#ffffff', // Fondo blanco puro
      padding: '15px 0',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      width: '100%',
      whiteSpace: 'nowrap',
      position: 'relative'
    }}>
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, // Movimiento muy suave y lento
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ display: 'flex', gap: '40px', alignItems: 'center' }}
      >
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              color: '#000000', // Texto negro puro
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif'
            }}>
              {t}
            </span>
            <TruckIcon size={20} color="#000000" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
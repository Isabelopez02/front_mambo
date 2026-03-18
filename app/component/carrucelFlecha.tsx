"use client";

import { motion } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

// Definimos los tipos para TypeScript
interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  isMobile: boolean;
}

export function CarrucelFlecha({ direction, onClick, disabled, isMobile }: CarouselArrowProps) {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ArrowLeft01Icon : ArrowRight01Icon;
  const startX = isLeft ? -20 : 20;

  return (
    <motion.button 
      initial={{ opacity: 0, x: startX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: startX }}
      // Reemplazamos el :hover de CSS por el whileHover de Framer Motion
      whileHover={!disabled ? { scale: 1.1, boxShadow: '0 4px 15px rgba(0,0,0,0.15)' } : {}}
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'absolute',
        top: '45%',
        transform: 'translateY(-50%)',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s, opacity 0.2s', // Solo transiciones suaves
        [isLeft ? 'left' : 'right']: isMobile ? '10px' : '20px',
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'default' : 'pointer'
      }}
    >
      <Icon size={isMobile ? 20 : 24} color="#000" />
    </motion.button>
  );
}
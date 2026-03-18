"use client";
import { motion } from "framer-motion";
import { Categoria } from "../ts/Categoria";


// 1. Definimos las props que recibe el componente
interface CategoryCardProps {
  cat: Categoria;
  index: number;
  isMobile: boolean;
}

// 2. Aplicamos la interface a los parámetros de la función
export function CategoryCard({ cat, index, isMobile }: CategoryCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      style={{ 
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        width: isMobile ? '140px' : '180px',
        scrollSnapAlign: 'start'
      }}
    >
      {/* Círculo con efecto de aparición */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          width: isMobile ? '130px' : '170px',
          height: isMobile ? '130px' : '170px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '12px',
          backgroundColor: '#f3f4f6',
          border: '2px solid transparent',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <img 
          src={cat.img} 
          alt={cat.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s'
          }} 
        />
      </motion.div>

      {/* Texto */}
      <span style={{
        fontSize: isMobile ? '0.65rem' : '0.8rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000',
        letterSpacing: '0.5px',
        maxWidth: '140px'
      }}>
        {cat.name}
      </span>
    </motion.div>
  );
}
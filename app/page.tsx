"use client";

import { motion } from "framer-motion";
import { StarIcon } from "hugeicons-react";
import styles from "./boton.module.css"; // Si prefieres CSS puro

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px', fontFamily: 'inherit' }}>
      
      {/* Ejemplo 1: Icono que reacciona al pasar el mouse */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: 'pointer', color: '#3b82f6' }}
      >
        <StarIcon size={48}/>
      </motion.div>

      {/* Ejemplo 2: Botón con entrada suave */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: '10px 20px',
          borderRadius: '12px',
          border: '2px solid #e2e8f0',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}
      >
        <span>Favorito</span>
        <StarIcon size={20} />
      </motion.button>

    </div>
  );
}
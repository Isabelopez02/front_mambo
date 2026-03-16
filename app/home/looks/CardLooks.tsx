"use client";
import { motion } from "framer-motion";

export default function CardCategoria({ categoria, isMobile }: any) {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <img src={categoria.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
        display: 'flex', alignItems: 'flex-end', padding: '30px'
      }}>
        <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>
          Ver prendas
        </h3>
      </div>
    </motion.div>
  );
}
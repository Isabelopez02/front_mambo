"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight01Icon, ShoppingCart01Icon, ZapIcon } from "hugeicons-react";

const characters = [
  { 
    id: 1, 
    name: "MAMBO NEO", 
    desc: "Corte futurista con materiales biodegradables.",
    img: "img/carrusel/img1.png", 
    imgfondo: "img/carrusel/fondo1.jpg", 
    accent: "#3b82f6",
    outfit: ["img/carrusel/img1-1.png", "img/carrusel/img1-2.png", "img/carrusel/img1-3.png"]
  },
  { 
    id: 2, 
    name: "STREET VIBE", 
    desc: "Estética urbana para el movimiento constante.",
    img: "img/carrusel/img2.png",
    imgfondo: "img/carrusel/fon2.jpg",
    accent: "#f59e0b",
    outfit: ["img/carrusel/img2-1.png", "img/carrusel/img2-2.png", "img/carrusel/img1.png"]
  },
  { 
    id: 3, 
    name: "DARK TECH", 
    desc: "Resistente y diseñado para la versatilidad extrema.",
    img: "img/carrusel/img3.png",
    imgfondo: "img/carrusel/fon3.jpg", 
    accent: "#0f172a",
    outfit: ["img/carrusel/img3-1.png", "img/carrusel/img3-2.png", "img/carrusel/img3-3.png"]
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const current = characters[index];

  // 1. Detectar tamaño de pantalla para ajustes finos
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. NUEVO: Auto-reproducción cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % characters.length);
    }, 5000); // 5000ms = 5 segundos

    // Limpiamos el intervalo cuando el componente se desmonta para evitar bugs
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 64px)', 
        height: isMobile ? 'auto' : '90vh',
        overflow: 'hidden',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#000',
        padding: isMobile ? '5px 0' : '0'
      }}
    >
      {/* --- CAPA DE IMAGEN DE FONDO --- */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current.imgfondo}
            src={current.imgfondo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
        </AnimatePresence>
      </div>

      {/* LADO IZQUIERDO: Personaje Principal */}
      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'center',
        width: isMobile ? '100%' : '55%',
        height: isMobile ? '400px' : '110%',
        order: isMobile ? 1 : 1
      }}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current.id}
            src={current.img}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: isMobile ? 1 : 1.1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ 
              height: isMobile ? '100%' : '90%', 
              zIndex: 10, 
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
            }}
          />
        </AnimatePresence>
      </div>

      {/* LADO DERECHO: Info + Outfit */}
      <div style={{ 
        width: isMobile ? '100%' : '45%',
        padding: isMobile ? '20px' : '40px',
        display: 'flex', 
        flexDirection: 'column', 
        zIndex: 15,
        textAlign: isMobile ? 'center' : 'left',
        alignItems: isMobile ? 'center' : 'flex-start',
        order: isMobile ? 2 : 2
      }}>
        
        {/* 1. OUTFIT COMPLEMENTARIO (Móvil: Opcional o más pequeño) */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}>
          <AnimatePresence mode="popLayout">
            {current.outfit.map((item, i) => (
              <motion.img
                key={`${current.id}-outfit-${i}`}
                src={item}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.8, scale: 1 }}
                whileHover={{ scale: 1.1, opacity: 1, border: `1px solid ${current.accent}` }}
                style={{ 
                  width: isMobile ? '60px' : '80px', 
                  height: isMobile ? '60px' : '80px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '8px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* 2. DESCRIPCIÓN */}
        <motion.div
          key={`content-${current.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '3rem' : '4.5rem', 
            fontWeight: '950', 
            lineHeight: 0.9, 
            margin: '0 0 0px 0', 
            color: '#fff' 
          }}>
            {current.name}
          </h1>

          <p style={{ 
            fontSize: isMobile ? '0.9rem' : '1.1rem', 
            color: 'rgba(255,255,255,0.8)', 
            maxWidth: '400px', 
            marginBottom: '30px' 
          }}>
            {current.desc}
          </p>
          
          <button 
            onClick={() => setIndex((index + 1) % characters.length)} 
            style={{...btnStyle, width: isMobile ? '100%' : 'auto', justifyContent: 'center'}}
          >
            SIGUIENTE OUTFIT <ArrowRight01Icon size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}


const btnStyle = {
  padding: '18px 36px',
  backgroundColor: '#0f172a',
  color: 'white',
  border: 'none',
  borderRadius: '16px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
  marginBottom:'20px'
};
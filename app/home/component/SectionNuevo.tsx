"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight01Icon, ArrowLeft01Icon, StarIcon } from "hugeicons-react";
// Importamos tu tarjeta Pro
import TarjetaProducto from "@/app/component/cardProducto"; 

const nuevasPrendas = [
  { 
    id: 101, 
    name: "Urban Capa M1", 
    price: 120.00, 
    img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg",
    sizes: ["M", "L", "XL"],
    badge: "DROP EXCLUSIVE",
    badgeColor: "#3b82f6"
  },
  { 
    id: 102, 
    name: "Neo Cargo Pant", 
    price: 95.00, 
    oldPrice: 115.00,
    img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg",
    sizes: ["30", "32", "34"],
    colors: [
      { hex: "#000", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
      { hex: "#4b5563", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }
    ]
  },
  { 
    id: 103, 
    name: "Cyber Hoodie v2", 
    price: 85.00, 
    img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg",
    sizes: ["S", "M", "L"],
    badge: "NEW",
    badgeColor: "#3b82f6"
  },
  { 
    id: 104, 
    name: "Cargo Joggers", 
    price: 110.00, 
    img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { hex: "#000", img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" }
    ]
  },
  { 
    id: 105, 
    name: "Alpha Sneakers", 
    price: 150.00, 
    img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg",
    sizes: ["40", "41", "42", "43"],
    badge: "TOP",
    badgeColor: "#3b82f6"
  },
  { 
    id: 106, 
    name: "Tech Jacket", 
    price: 220.00, 
    img: "https://i.pinimg.com/736x/58/9e/47/589e4703e15ce9ad9619c222aab5101d.jpg",
    sizes: ["M", "L", "XL"],
    oldPrice: 250.00
  },
  { 
    id: 107, 
    name: "Graffiti Tee", 
    price: 45.00, 
    img: "https://i.pinimg.com/736x/1f/35/8f/1f358fc40b87d712c8c89f838fb73f43.jpg",
    sizes: ["S", "M", "L"]
  },
  { 
    id: 108, 
    name: "Metal Chain", 
    price: 65.00, 
    img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg",
    sizes: ["ONE SIZE"]
  },
  { 
    id: 109, 
    name: "Neo Cargo Pant", 
    price: 95.00, 
    img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg",
    sizes: ["30", "32", "34"]
  },
  { 
    id: 110, 
    name: "Skull Beanie", 
    price: 35.00, 
    img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg",
    sizes: ["ONE SIZE"],
    badge: "NEW",
    badgeColor: "#3b82f6"
  },
];

export function NuevosIngresos() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [haHechoBarrido, setHaHechoBarrido] = useState(false);
  const [estaBarriendo, setEstaBarriendo] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stepSize = isMobile ? 275 : 350;
  const maxVisibleCards = isMobile ? 1 : 4;
  const maxIndex = Math.max(0, nuevasPrendas.length - maxVisibleCards);

  // EFECTO BARRIDO URBANO
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !haHechoBarrido) {
            setEstaBarriendo(true);
            setShowArrows(false);
            
            // Reset al inicio
            setIndex(0);
            
            // Pequeña pausa para efecto dramático
            setTimeout(() => {
              // Hacer el barrido rápido hasta el final
              setIndex(maxIndex);
              
              // Después del barrido, mostrar flechas
              setTimeout(() => {
                setEstaBarriendo(false);
                setHaHechoBarrido(true);
                setShowArrows(true);
              }, 800);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [haHechoBarrido, maxIndex]);

  const next = () => {
    if (!estaBarriendo) {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
  };
  
  const prev = () => {
    if (!estaBarriendo) {
      setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ 
        padding: isMobile ? '40px 10px' : '80px 5%', 
        backgroundColor: '#000', 
        position: 'relative' 
      }}
    >
      <style>{`
        .industrial-grain::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.02) 0px,
            rgba(255,255,255,0.02) 2px,
            transparent 2px,
            transparent 8px
          );
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        style={{ 
          backgroundColor: '#000', 
          position: 'relative',
          overflow: 'hidden',
        }}
        className="industrial-grain"
      >
        
        {/* LÍNEAS DECORATIVAS INDUSTRIALES */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: '10%', 
          width: '1px', 
          height: '100%', 
          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.2), transparent)', 
          zIndex: 0 
        }} />
        
        <div style={{ 
          position: 'absolute', 
          bottom: '20%', 
          right: '5%', 
          width: '100px', 
          height: '2px', 
          background: '#3b82f6', 
          opacity: 0.3,
          zIndex: 0 
        }} />
        
        {/* HEADER CON TÍTULO CORREGIDO */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'flex-end', 
          marginBottom: '50px', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}
            >
              <div style={{ width: '30px', height: '2px', backgroundColor: '#3b82f6' }} />
              <span style={{ fontWeight: '900', fontSize: '0.7rem', color: '#3b82f6', letterSpacing: '3px', textTransform: 'uppercase' }}>
                DROP FEBRERO 2026
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ 
                color: '#fff', 
                fontSize: isMobile ? '2.8rem' : '4.5rem', 
                fontWeight: '950', 
                lineHeight: 0.85, 
                margin: 0, 
                letterSpacing: '-4px', 
                textTransform: 'uppercase' 
              }}
            >
              Nuevos
              <span style={{ WebkitTextStroke: '1px #3b82f6', color: '#3b82f6' }}>  Ingresos</span>
            </motion.h2>
          </div>
          
          <AnimatePresence>
            {showArrows && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ display: 'flex', gap: '10px' }}
              >
                <button onClick={prev} style={navBtnStyle} disabled={estaBarriendo}>
                  <ArrowLeft01Icon size={24}/>
                </button>
                <button onClick={next} style={navBtnStyle} disabled={estaBarriendo}>
                  <ArrowRight01Icon size={24}/>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INDICADOR DE BARRIDO */}
        <AnimatePresence>
          {estaBarriendo && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: '10px 20px',
                border: '1px solid #3b82f6',
                color: '#fff',
                fontWeight: '900',
                letterSpacing: '3px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                pointerEvents: 'none'
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ⚡ BARRIDO URBANO ⚡
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CARRUSEL */}
        <div style={{ 
          overflow: 'hidden', 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <motion.div 
            animate={{ x: -(index * stepSize) }} 
            transition={{ 
              type: "spring", 
              stiffness: estaBarriendo ? 60 : 120, 
              damping: 20 
            }}
            style={{ display: 'flex', gap: isMobile ? '15px' : '30px' }}
          >
            {nuevasPrendas.map((item, i) => (
              <motion.div 
                key={`${item.id}-${i}`} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                style={{ 
                  minWidth: isMobile ? '260px' : '320px',
                  filter: estaBarriendo ? 'grayscale(50%)' : 'none',
                  transition: 'filter 0.3s'
                }}
              >
                {/* REUTILIZACIÓN DE TU TARJETA PRO */}
                <TarjetaProducto producto={item} index={i} isMobile={isMobile} />
              </motion.div>
            ))}
          </motion.div>
        </div>


        {/* BOTÓN FINAL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '40px', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}
        >
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#2563eb' }}
            whileTap={{ scale: 0.98 }}
            style={btnAllStyle}
          >
            EXPLORAR DROP COMPLETO
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

const navBtnStyle = { 
  width: '56px', 
  height: '56px', 
  border: '1px solid rgba(255,255,255,0.2)', 
  backgroundColor: 'rgba(255,255,255,0.05)', 
  color: '#fff', 
  cursor: 'pointer', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  transition: 'all 0.3s',
  ':hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#3b82f6'
  },
  ':disabled': {
    opacity: 0.3,
    cursor: 'not-allowed'
  }
};

const btnAllStyle = { 
  padding: '20px 40px', 
  backgroundColor: '#3b82f6', 
  color: '#fff', 
  border: 'none', 
  fontWeight: '900', 
  cursor: 'pointer', 
  textTransform: 'uppercase' as 'uppercase',
  letterSpacing: '2px',
  fontSize: '0.8rem',
  transition: 'all 0.3s'
};
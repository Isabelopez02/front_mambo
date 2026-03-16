"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

const categorias = [
  { id: 1, titulo: "Mujer", img: "https://i.pinimg.com/736x/d2/33/27/d2332766467389c938c531a70014023c.jpg" },
  { id: 2, titulo: "Hombre", img: "https://i.pinimg.com/736x/21/04/90/21049007f3001815f9b40097f5f24250.jpg" },
  { id: 3, titulo: "Prendas Superiores", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 4, titulo: "Prendas Inferiores", img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg" },
  { id: 5, titulo: "Conjuntos", img: "https://i.pinimg.com/736x/58/9e/47/589e4703e15ce9ad9619c222aab5101d.jpg" },
  { id: 6, titulo: "Zapatillas", img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" },
];

export function SectionCategorias() {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [haHechoRecorrido, setHaHechoRecorrido] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [estaRecorriendo, setEstaRecorriendo] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // EFECTO PARA RECORRER DEL INICIO AL FINAL CUANDO LLEGAS A LA SECCIÓN
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !haHechoRecorrido && carouselRef.current) {
            setEstaRecorriendo(true);
            
            // Calcular el ancho total del carrusel
            const carousel = carouselRef.current;
            const scrollWidth = carousel.scrollWidth;
            const clientWidth = carousel.clientWidth;
            const maxScroll = scrollWidth - clientWidth;
            
            // Hacer scroll suave hasta el final
            carousel.scrollTo({
              left: maxScroll,
              behavior: "smooth"
            });
            
            // Marcar que ya hizo el recorrido
            setHaHechoRecorrido(true);
            
            // Quitar el estado de recorrido después de la animación
            setTimeout(() => {
              setEstaRecorriendo(false);
            }, 1500); // Tiempo aproximado de la animación
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [haHechoRecorrido]);

  // Actualizar visibilidad de flechas
  const handleScroll = () => {
    if (carouselRef.current && !estaRecorriendo) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [estaRecorriendo]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current && !estaRecorriendo) {
      const scrollAmount = isMobile ? 300 : 400;
      const newScrollLeft = direction === "left" 
        ? carouselRef.current.scrollLeft - scrollAmount 
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({ 
        left: newScrollLeft, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      style={{ 
        padding: isMobile ? '40px 0' : '60px 5%', 
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Título */}
      <div style={{ 
        padding: '0 5%', 
        marginBottom: isMobile ? '30px' : '40px',
        position: 'relative',
        zIndex: 2
      }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            justifyContent: 'center',
            display: 'flex',
            textAlign: 'center',
            fontSize: isMobile ? '0.9rem' : '1.25rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            margin: 0,
            color: '#000',
            letterSpacing: '-1px',
          }}
        >
          ¿Qué estás buscando?
        </motion.h2>
      </div>

      {/* CONTENEDOR DEL CARRUSEL CON FLECHAS */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* FLECHA IZQUIERDA - SOLO APARECE DESPUÉS DEL RECORRIDO INICIAL */}
        <AnimatePresence>
          {showLeftArrow && haHechoRecorrido && (
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll("left")}
              disabled={estaRecorriendo}
              style={{
                ...arrowButtonStyle,
                left: isMobile ? '10px' : '20px',
                zIndex: 10,
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                opacity: estaRecorriendo ? 0.5 : 1,
                cursor: estaRecorriendo ? 'default' : 'pointer'
              }}
            >
              <ArrowLeft01Icon size={isMobile ? 20 : 24} color="#000" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* FLECHA DERECHA - SOLO APARECE DESPUÉS DEL RECORRIDO INICIAL */}
        <AnimatePresence>
          {showRightArrow && haHechoRecorrido && (
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll("right")}
              disabled={estaRecorriendo}
              style={{
                ...arrowButtonStyle,
                right: isMobile ? '10px' : '20px',
                zIndex: 10,
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                opacity: estaRecorriendo ? 0.5 : 1,
                cursor: estaRecorriendo ? 'default' : 'pointer'
              }}
            >
              <ArrowRight01Icon size={isMobile ? 20 : 24} color="#000" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* CARRUSEL DE CATEGORÍAS */}
        <div 
          ref={carouselRef}
          className="hide-scrollbar"
          style={{ 
            display: 'flex', 
            gap: isMobile ? '20px' : '30px', 
            padding: isMobile ? '0 20px' : '0 5%', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {categorias.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                  alt={cat.titulo}
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
                {cat.titulo}
              </span>
            </motion.div>
          ))}
        </div>

        {/* INDICADOR DE RECORRIDO INICIAL (OPCIONAL) */}
        {!haHechoRecorrido && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.8rem',
              color: '#2563eb',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}
          >
            ✨ Descubre nuestras categorías ✨
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Estilos
const arrowButtonStyle = {
  position: 'absolute' as const,
  top: '45%',
  transform: 'translateY(-50%)',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
  }
};

const mobileNavStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid #e5e5e5',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'all 0.2s'
};
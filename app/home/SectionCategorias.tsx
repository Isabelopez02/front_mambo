"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categorias } from "../ts/Categoria";
import { CategoryCard } from "../component/CategoriaCard";
import { CarrucelFlecha } from "../component/carrucelFlecha";
// 1. Importamos tu Hook de validación de pantalla
import { UseValidationPantalla } from "../hooks/UseValidationPantalla"; 

export function SectionCategorias() {
  // 2. Lo usamos en una sola línea. ¡Adiós a la lógica repetida!
  const isMobile = UseValidationPantalla(); 
  
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Estados para mostrar u ocultar flechas
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Controlar la visibilidad de las flechas según el scroll actual
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Escuchar el evento de scroll en el carrusel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      handleScroll(); 
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Función para mover el carrusel al hacer clic en las flechas
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
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
      <div style={{ padding: '0 5%', marginBottom: isMobile ? '30px' : '40px', position: 'relative', zIndex: 2 }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ justifyContent: 'center', display: 'flex', textAlign: 'center', fontSize: isMobile ? '0.9rem' : '1.25rem', fontWeight: '800', textTransform: 'uppercase', margin: 0, color: '#000', letterSpacing: '-1px' }}
        >
          ¿Qué estás buscando?
        </motion.h2>
      </div>

      {/* CONTENEDOR DEL CARRUSEL CON FLECHAS */}
      <div style={{ position: 'relative', width: '100%' }}>
        
        {/* FLECHA IZQUIERDA */}
        <AnimatePresence>
          {showLeftArrow && (
            <CarrucelFlecha direction="left" onClick={() => scroll("left")} disabled={false} isMobile={isMobile} />
          )}
        </AnimatePresence>

        {/* FLECHA DERECHA */}
        <AnimatePresence>
          {showRightArrow && (
            <CarrucelFlecha direction="right" onClick={() => scroll("right")} disabled={false} isMobile={isMobile} />
          )}
        </AnimatePresence>

        {/* CARRUSEL DE CATEGORÍAS */}
        <div 
          ref={carouselRef}
          className="hide-scrollbar"
          style={{ display: 'flex', gap: isMobile ? '20px' : '30px', padding: isMobile ? '0 20px' : '0 5%', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
        >
          {categorias.map((cat, index) => (
            <CategoryCard key={cat.id} cat={cat} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
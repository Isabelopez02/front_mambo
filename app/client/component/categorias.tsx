"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Datos de prueba (12 categorías para que haya 2 páginas)
const categoriasData = [
  { id: 1, name: "T-SHIRTS", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 2, name: "HOODIES", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 3, name: "CARGOS", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 4, name: "SNEAKERS", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
  { id: 5, name: "GORRAS", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 6, name: "OVERSHIRT", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 7, name: "SHORTS", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 8, name: "ACCESORIOS", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
  { id: 9, name: "JACKETS", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  // Segunda página
  { id: 10, name: "BASICS", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 11, name: "DENIM", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 12, name: "CYBERPUNK", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
];

export function Categorias() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Configuración de la paginación
  const itemsPerPage = isMobile ? 4 : 6; // 4 en celu (2x2), 9 en desktop (3x3)
  const totalPages = Math.ceil(categoriasData.length / itemsPerPage);
  
  // Extraer las categorías de la página actual
  const currentCategories = categoriasData.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section style={{ backgroundColor: '#ffffff'}}>
      
      {/* Título Estilo Wireframe */}
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ 
          color: '#000', 
          fontSize: isMobile ? '1.8rem' : '2.5rem', 
          fontWeight: '900', 
          margin: '0 0 10px 0',
          letterSpacing: '1px'
        }}>
          CATEGORÍAS
        </h2>
        {/* La línea debajo del título */}
        <div style={{ width: '80px', height: '3px', backgroundColor: '#000', margin: '0 auto' }}></div>
      </div>

      {/* Contenedor Principal Negro */}
      <div style={{ 
        backgroundColor: '#000000', 
        padding: isMobile ? '30px 20px' : '60px 0%',
        width: '100%'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '30px',
          minHeight: isMobile ? 'auto' : '600px' // Altura fija para que la paginación no salte
        }}>
          
          {/* Lado Izquierdo: Imagen del Modelo (Hero Category) */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            style={{ 
              width: isMobile ? '100%' : '40%', 
              height: isMobile ? '350px' : 'auto',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            {/* Foto del modelo */}
            <img 
              src="https://images.unsplash.com/photo-1523398002811-999aa8e9f5b9?q=80&w=800&auto=format&fit=crop" 
              alt="Modelo Mambo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Overlay para dar estilo */}
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '30px'
            }}>
              <p style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '2rem', letterSpacing: '-1px' }}>
                NUEVA<br/>COLECCIÓN
              </p>
            </div>
          </motion.div>

          {/* Lado Derecho: Cuadrícula de Categorías y Paginación */}
          <div style={{ 
            width: isMobile ? '100%' : '60%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between' 
          }}>
            
            {/* Grid animado */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage} // Esto hace que framer-motion anime cuando cambia la página
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', 
                  gap: isMobile ? '10px' : '20px',
                  flexGrow: 1
                }}
              >
                {currentCategories.map((cat) => (
                  <motion.div 
                    key={cat.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      aspectRatio: '1/1', // Cuadrados perfectos
                      backgroundColor: '#1f2937', 
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                    />
                    <div style={{ 
                      position: 'absolute', inset: 0, 
                      backgroundColor: 'rgba(0,0,0,0.3)', // Oscurece la foto un poco
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background-color 0.3s'
                    }}>
                      <span style={{ 
                        color: '#fff', 
                        fontWeight: '900', 
                        fontSize: isMobile ? '0.9rem' : '1.1rem',
                        letterSpacing: '1px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)' // Sombra para que se lea sobre cualquier foto
                      }}>
                        {cat.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Puntos de Navegación (Dots) */}
            {totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '12px', 
                marginTop: '30px',
                paddingTop: '10px'
              }}>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: currentPage === index ? '#ffffff' : '#4b5563', // Blanco si está activo, gris oscuro si no
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                    aria-label={`Ir a la página ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
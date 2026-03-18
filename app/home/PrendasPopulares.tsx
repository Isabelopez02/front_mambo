"use client";

import { motion } from "framer-motion";
import { prendasPopulares } from "../ts/Prendas";
// REUTILIZAMOS tu componente estrella
import CardProducto from "../component/cardProducto"; 
import { UseValidationPantalla } from "../hooks/UseValidationPantalla";
import { useAnimacionRebote } from "../hooks/UseAnimationRebote";

export function PrendasPopulares() {
  
  const { 
      isMobile, sectionRef, 
      isInView, scroll, cardVariants 
    } = useAnimacionRebote();

  return (
    <section 
      ref={sectionRef}
      style={{ 
      padding: isMobile ? '40px 15px' : '80px 5%', 
      backgroundColor: '#ffffff' 
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* ENCABEZADO PRO */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginBottom: isMobile ? '30px' : '50px',
            borderBottom: '2px solid #f3f4f6', // Línea de separación limpia
            paddingBottom: '20px'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#2563eb', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Lo más buscado
            </span>
            <h2 style={{ 
                color: '#000', 
                fontSize: isMobile ? '1.8rem' : '2.8rem', 
                fontWeight: '950', 
                margin: '5px 0 0 0', 
                letterSpacing: '-1.5px',
                textTransform: 'uppercase',
                lineHeight: 1
            }}>
              Prendas <span style={{ WebkitTextStroke: '1px #000', color: 'transparent' }}>Populares</span>
            </h2>
          </div>
          
          <motion.a 
            href="/catalogo"
            whileHover={{ x: 5 }} // Pequeño rebote a la derecha
            style={{ 
              fontSize: '0.8rem', 
              fontWeight: '900', 
              color: '#000', 
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '3px solid #2563eb', // El azul de MAMBO para destacar
              paddingBottom: '5px'
            }}
          >
            VER TODO →
          </motion.a>
        </div>

        {/* GRID DE PRODUCTOS REUTILIZANDO CARD */}
        <div style={{ 
          display: 'grid',
          // 2 en móvil, 4 o 5 en PC según el ancho
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: isMobile ? '15px' : '40px' 
        }}>
          {prendasPopulares.map((item, index) => (
          <motion.div key={item.id} custom={index} initial="hidden"
              animate={isInView ? "visible" : "hidden"} variants={cardVariants}>
            <CardProducto 
              key={item.id} 
              producto={item} 
              index={index} 
              isMobile={isMobile} 
            />
          </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
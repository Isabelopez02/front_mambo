"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CardCategoria from "./component/CardLooks";
import { listaLooks } from "../ts/Looks";
// Tus importaciones nuevas
import { useAnimacionRebote } from "../hooks/UseAnimationRebote"; 
import { ModalLook } from "../component/ModalLook";
import { CarrucelFlecha } from "../component/carrucelFlecha";

export function SectionLooks() {
  const [lookSeleccionado, setLookSeleccionado] = useState<any>(null);
  
  const { 
    isMobile, scrollRef, sectionRef, showLeftArrow, showRightArrow, 
    isInView, scroll, cardVariants 
  } = useAnimacionRebote();

  return (
    <section ref={sectionRef} style={{ padding: isMobile ? '30px 0' : '50px 0', backgroundColor: '#fff', overflow: 'hidden', position: 'relative' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      {/* HEADER */}
      <div style={{ padding: '0 5%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? '30px' : '50px', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#2563eb' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#000', letterSpacing: '2px', textTransform: 'uppercase' }}>Get the style</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '2rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.85', margin: 0, color: '#000' }}>
            Inspírate <br />
            <span style={{ WebkitTextStroke: '1px #000', color: 'transparent', fontSize: isMobile ? '2.4rem' : '3rem' }}>En tus compras</span>
          </h2>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        
        {/* FLECHAS REUTILIZADAS */}
        {showLeftArrow && <CarrucelFlecha direction="left" onClick={() => scroll("left")} disabled={false} isMobile={isMobile} />}
        {showRightArrow && <CarrucelFlecha direction="right" onClick={() => scroll("right")} disabled={false} isMobile={isMobile} />}

        {/* CARRUSEL DE CARDS */}
        <div ref={scrollRef} className="hide-scrollbar" style={{ display: 'flex', gap: isMobile ? '15px' : '20px', padding: isMobile ? '0 20px' : '0 5%', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', alignItems: 'flex-start' }}>
          {listaLooks.map((look, index) => (
            <motion.div
              key={look.id} custom={index} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={cardVariants}
              onClick={() => setLookSeleccionado(look)}
              style={{ flexShrink: 0, width: isMobile ? '50vw' : '350px', height: isMobile ? '500px' : '650px', scrollSnapAlign: 'start', cursor: 'pointer', position: 'relative', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', transition: 'box-shadow 0.3s ease' }}
            >
              <CardCategoria categoria={look} isMobile={isMobile} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL EXTERNALIZADO */}
      <ModalLook 
        lookSeleccionado={lookSeleccionado} 
        setLookSeleccionado={setLookSeleccionado} 
        isMobile={isMobile} 
      />
    </section>
  );
}
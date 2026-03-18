"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight01Icon, ArrowLeft01Icon } from "hugeicons-react";
import CardProducto from "../component/cardProducto";
import { nuevasPrendas } from "../ts/Prendas";

// Importamos nuestros hooks súper limpios
import { UseValidationPantalla } from "../hooks/UseValidationPantalla"; 
import { useBarridoCarrucel } from "../hooks/UseBarridoCarrucel"; 

export function NuevosIngresos() {
  const isMobile = UseValidationPantalla();
  const { 
    sectionRef, index, estaBarriendo, showArrows, stepSize, next, prev 
  } = useBarridoCarrucel(nuevasPrendas.length, isMobile);

  return (
    <section 
      ref={sectionRef} 
      style={{ padding: isMobile ? '40px 10px' : '80px 5%', backgroundColor: '#000', position: 'relative' }}
    >
      <style>{`
        .industrial-grain::before {
          content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 8px);
          pointer-events: none; z-index: 0;
        }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        style={{ backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}
        className="industrial-grain"
      >
        {/* LÍNEAS DECORATIVAS INDUSTRIALES */}
        <div style={{ position: 'absolute', top: 0, left: '10%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.2), transparent)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '100px', height: '2px', background: '#3b82f6', opacity: 0.3, zIndex: 0 }} />
        
        {/* HEADER */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: '50px', position: 'relative', zIndex: 1 }}>
          <div>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '30px', height: '2px', backgroundColor: '#3b82f6' }} />
              <span style={{ fontWeight: '900', fontSize: '0.7rem', color: '#3b82f6', letterSpacing: '3px', textTransform: 'uppercase' }}>DROP FEBRERO 2026</span>
            </motion.div>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ color: '#fff', fontSize: isMobile ? '2.8rem' : '4.5rem', fontWeight: '950', lineHeight: 0.85, margin: 0, letterSpacing: '-4px', textTransform: 'uppercase' }}>
              Nuevos
              <span style={{ WebkitTextStroke: '1px #3b82f6', color: '#3b82f6' }}> Ingresos</span>
            </motion.h2>
          </div>
          
          <AnimatePresence>
            {showArrows && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: 'flex', gap: '10px' }}>
                <button onClick={prev} style={navBtnStyle} disabled={estaBarriendo}><ArrowLeft01Icon size={24}/></button>
                <button onClick={next} style={navBtnStyle} disabled={estaBarriendo}><ArrowRight01Icon size={24}/></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INDICADOR DE BARRIDO */}
        <AnimatePresence>
          {estaBarriendo && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20, backgroundColor: 'rgba(0,0,0,0.8)', padding: '10px 20px', border: '1px solid #3b82f6', color: '#fff', fontWeight: '900', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', pointerEvents: 'none' }}>
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>⚡ Nuevas prendas ⚡</motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CARRUSEL */}
        <div style={{ overflow: 'hidden', width: '100%', position: 'relative', zIndex: 1 }}>
          <motion.div animate={{ x: -(index * stepSize) }} transition={{ type: "spring", stiffness: estaBarriendo ? 60 : 120, damping: 20 }} style={{ display: 'flex', gap: isMobile ? '15px' : '30px' }}>
            {nuevasPrendas.map((item, i) => (
              <motion.div key={`${item.id}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} style={{ minWidth: isMobile ? '260px' : '320px', filter: estaBarriendo ? 'grayscale(50%)' : 'none', transition: 'filter 0.3s' }}>
                <CardProducto producto={item} index={i} isMobile={isMobile} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BOTÓN FINAL */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '40px', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <motion.button whileHover={{ scale: 1.02, backgroundColor: '#2563eb' }} whileTap={{ scale: 0.98 }} style={btnAllStyle}>
            EXPLORAR DROP COMPLETO
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Estilos de botones (se mantienen tus diseños cuadrados industriales que van perfectos con esta sección)
const navBtnStyle = { width: '56px', height: '56px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', ':disabled': { opacity: 0.3, cursor: 'not-allowed' } };
const btnAllStyle = { padding: '20px 40px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase' as 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', transition: 'all 0.3s' };
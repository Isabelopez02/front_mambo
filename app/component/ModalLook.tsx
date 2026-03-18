"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cancel01Icon, ShoppingBag01Icon } from "hugeicons-react";

interface ModalLookProps {
  lookSeleccionado: any;
  setLookSeleccionado: (look: any) => void;
  isMobile: boolean;
}

export function ModalLook({ lookSeleccionado, setLookSeleccionado, isMobile }: ModalLookProps) {
  
  // El bloqueo del scroll lo movemos aquí para que solo se ejecute cuando el modal existe
  useEffect(() => {
    document.body.style.overflow = lookSeleccionado ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [lookSeleccionado]);

  return (
    <AnimatePresence>
      {lookSeleccionado && (
        <div style={overlayStyle} onClick={() => setLookSeleccionado(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={modalStyle(isMobile)}
          >
            <button onClick={() => setLookSeleccionado(null)} style={closeBtnStyle}>
              <Cancel01Icon size={24} color="#000" />
            </button>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100%', overflow: 'hidden' }}>
              
              {/* Lado A: Foto del Look */}
              <div style={{ flex: isMobile ? 'none' : '1.2', height: isMobile ? '55%' : '100%', backgroundColor: '#000', position: 'relative' }}>
                <img src={lookSeleccionado.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Look" />
                {isMobile && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' }} />}
              </div>

              {/* Lado B: Prendas Utilizadas */}
              <div style={{ flex: 1, padding: isMobile ? '20px' : '40px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', overflowY: 'auto', height: isMobile ? '45%' : '100%' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>Shop the look</h3>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{lookSeleccionado.titulo}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {lookSeleccionado.prendas.map((prenda: any) => (
                    <div key={prenda.id} style={urbanPrendaCardStyle}>
                      <img src={prenda.img} alt={prenda.nombre} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>{prenda.name}</h4>
                        <p style={{ margin: '2px 0 0 0', color: '#2563eb', fontWeight: '800' }}>S/. {prenda.price.toFixed(2)}</p>
                      </div>
                      <button style={urbanMiniAddBtn}><ShoppingBag01Icon size={18} color="white" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Mueve aquí abajo los estilos de overlayStyle, modalStyle, closeBtnStyle, urbanPrendaCardStyle y urbanMiniAddBtn
const overlayStyle: any = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' };
const modalStyle = (isMobile: boolean): any => ({ backgroundColor: '#fff', width: isMobile ? '70%' : '1100px', height: isMobile ? '95vh' : '850px', borderRadius: isMobile ? '16px' : '0', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', border: '1px solid #f1f1f1', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' });
const closeBtnStyle: any = { position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', zIndex: 50, display: 'flex', opacity: 0.9, transition: 'opacity 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const urbanPrendaCardStyle: any = { display: 'flex', gap: '12px', alignItems: 'center', padding: '8px', borderBottom: '1px solid #f0f0f0', borderRadius: 0, transition: 'background-color 0.2s' };
const urbanMiniAddBtn: any = { backgroundColor: '#000', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', opacity: 0.8, transition: 'all 0.2s' };
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TruckIcon, 
  CustomerService01Icon, 
  PackageReceiveIcon,
  Cancel01Icon
} from "hugeicons-react";

export function Servicio() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeModal, setActiveModal] = useState<'envios' | 'soporte' | 'devoluciones' | 'faq' | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const servicios = [
    { 
      id: 'envios', 
      icon: <TruckIcon size={32} variant="stroke" strokeWidth={2} />, 
      title: "DELIVERY MAMBO", 
      subtitle: "ENTREGAS EXPRES 24 H",
    },
    { 
      id: 'soporte', 
      icon: <CustomerService01Icon size={32} variant="stroke" strokeWidth={2} />, 
      title: "ATENCIÓN 24/7", 
      subtitle: "SERVICIO AL CLIENTE",
    },
    { 
      id: 'devoluciones', 
      icon: <PackageReceiveIcon size={32} variant="stroke" strokeWidth={2} />, 
      title: "DEVOLUCIONES", 
      subtitle: "HASTA 3 DÍAS DESPUÉS",
    }
  ];

  return (
    <>
      {/* Contenedor Principal: El "Punto Dulce" de altura */}
      <section style={{ backgroundColor: '#000000', padding: isMobile ? '60px 20px' : '80px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: '24px', // Separación limpia y estándar
            width: '100%'
          }}>
            {servicios.map((srv, i) => (
              <motion.div
                key={srv.id}
                onClick={() => setActiveModal(srv.id as any)}
                whileHover={{ y: -6, boxShadow: '0 15px 30px rgba(255,184,0,0.15)' }} // Sombra sutil con el tono amarillo al pasar el mouse
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px 24px', // Altura perfecta para la tarjeta
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }}
              >
                {/* Círculo Amarillo (Tamaño UI perfecto: 64px) */}
                <div style={{
                  backgroundColor: '#FFB800', // Amarillo vibrante y comercial
                  color: '#000000',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0
                }}>
                  {srv.icon}
                </div>

                {/* Textos con jerarquía visual clara */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: '800', 
                    color: '#000000', 
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.5px',
                    lineHeight: '1.2'
                  }}>
                    {srv.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700',
                    color: '#6B7280', // Gris neutro para no competir con el título
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {srv.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enlace de Preguntas Frecuentes (Sutil pero clickeable) */}
          <motion.button
            onClick={() => setActiveModal('faq')}
            whileHover={{ opacity: 1 }}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '40px',
              cursor: 'pointer',
              opacity: 0.6,
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              transition: 'opacity 0.2s ease'
            }}
          >
            Preguntas Frecuentes
          </motion.button>
        </div>
      </section>

      {/* Modal funcional (Sin cambios en la lógica) */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '450px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <button 
                onClick={() => setActiveModal(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
              >
                <Cancel01Icon size={24} />
              </button>

              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#000000', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                {activeModal === 'envios' && 'Políticas de Envío'}
                {activeModal === 'soporte' && 'Atención al Cliente'}
                {activeModal === 'devoluciones' && 'Cambios y Devoluciones'}
                {activeModal === 'faq' && 'Preguntas Frecuentes'}
              </h2>
              
              <div style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {activeModal === 'envios' && <p>Realizamos envíos express para que estrenes al día siguiente. Los pedidos confirmados antes de las 2:00 PM se procesan el mismo día.</p>}
                {activeModal === 'soporte' && <p>¿Necesitas ayuda con tu talla o pedido? Contáctanos a nuestro WhatsApp oficial o envíanos un correo a soporte@mambo.com.</p>}
                {activeModal === 'devoluciones' && <p>No te preocupes si no te queda. Tienes hasta 3 días después de recibir tu paquete para solicitar un cambio de talla sin costo adicional.</p>}
                {activeModal === 'faq' && (
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li><strong style={{color: '#000'}}>¿Qué métodos de pago aceptan?</strong><br/>Tarjetas, transferencias y billeteras digitales.</li>
                    <li><strong style={{color: '#000'}}>¿Hacen envíos a provincia?</strong><br/>Sí, llegamos a todo el país.</li>
                    <li><strong style={{color: '#000'}}>¿Cómo funciona el vestidor virtual?</strong><br/>Usa Inteligencia Artificial para simular cómo te quedaría la prenda subiendo una simple foto.</li>
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
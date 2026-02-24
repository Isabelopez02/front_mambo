"use client";
import { motion } from "framer-motion";
import { 
  TruckIcon, 
  CustomerService01Icon, 
  Store01Icon, 
  PackageReceiveIcon,
  PlayIcon,
  ArrowRight01Icon
} from "hugeicons-react";
import { useState, useRef, useEffect } from "react";

export function Servicio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const opciones = [
    { 
      icon: <TruckIcon size={40} />, 
      label: "DELIVERY MAMBO", 
      detail: "Entrega express en 24h"
    },
    { 
      icon: <Store01Icon size={40} />, 
      label: "RETIRO EN TIENDA", 
      detail: "Recoge gratis en 2h"
    },
    { 
      icon: <CustomerService01Icon size={40} />, 
      label: "ATENCIÓN 24/7", 
      detail: "Soporte especializado"
    },
    { 
      icon: <PackageReceiveIcon size={40} />, 
      label: "DEVOLUCIONES", 
      detail: "Cambios sin costo"
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section style={{ 
      backgroundColor: '#000',
      padding: '80px 5%',
      borderBottom: '1px solid #1a1a1a'
    }}>
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Fila superior: Video + Info */}
        <div style={{
          maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        // Cambia a 1 columna en móvil y 2 en desktop
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '60px',
        alignItems: 'center'
        }}>
          {/* LADO IZQUIERDO - VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            backgroundColor: '#0a0a0a',
            border: '1px solid #1a1a1a',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
          }}
        >
          <video
            ref={videoRef}
            src="/video-presentacion.mp4"
            poster="/video-poster.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loop
            muted
          />
          
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isPlaying ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVideo}
              style={{
                width: isMobile ? '60px' : '70px',
                height: isMobile ? '60px' : '70px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? '⏸' : <PlayIcon size={isMobile ? 24 : 30} />}
            </motion.button>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '15px',
            right: '15px',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '100px',
            fontSize: '0.7rem',
            border: '1px solid #333'
          }}>
            01:30 min
          </div>
        </motion.div>

        {/* LADO DERECHO - INFO */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            padding: isMobile ? '0' : '20px',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          <span style={{
            color: '#666',
            fontSize: '0.75rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '15px',
            display: 'block'
          }}>
            — Nuestra experiencia
          </span>

          <h2 style={{
            color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '20px'
          }}>
            La mejor experiencia
            <span style={{ color: '#666', display: 'block', fontSize: '0.8em' }}>
              de compra online
            </span>
          </h2>

          <p style={{
            color: '#999',
            fontSize: '1rem',
            lineHeight: '1.8',
            marginBottom: '30px',
            maxWidth: isMobile ? '100%' : '500px',
            margin: isMobile ? '0 auto 30px' : '0 0 30px'
          }}>
            Más de 10 años ofreciendo el mejor servicio y calidad en productos. 
            Nos adaptamos a tus necesidades para que tu experiencia sea memorable.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}>
            {[
              'Más de 50.000 clientes satisfechos',
              'Productos de alta calidad',
              'Envíos a todo el país'
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }} />
                <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ x: isMobile ? 0 : 10 }}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '35px',
              cursor: 'pointer',
              padding: '10px 0'
            }}
          >
            Conoce más sobre nosotros
            <ArrowRight01Icon size={18} />
          </motion.button>
        </motion.div>
        </div>

        {/* Cards de servicio - Abajo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginTop: '20px'
          }}
        >
          {opciones.map((opc, i) => (
            <motion.div
              key={i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 400 }
              }}
              style={{
                padding: '30px 25px',
                backgroundColor: '#000',
                border: hoveredIndex === i ? '1px solid #333' : '1px solid #1a1a1a',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'border-color 0.2s ease',
                boxShadow: hoveredIndex === i ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              {/* Icono */}
              <motion.div
                animate={{
                  scale: hoveredIndex === i ? 1.1 : 1,
                }}
                style={{
                  color: hoveredIndex === i ? '#fff' : '#4a4a4a',
                  transition: 'color 0.2s ease',
                  minWidth: '50px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {opc.icon}
              </motion.div>
              
              {/* Texto */}
              <div>
                <h3 style={{ 
                  color: hoveredIndex === i ? '#fff' : '#666',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  margin: '0 0 5px 0',
                  letterSpacing: '0.5px'
                }}>
                  {opc.label}
                </h3>
                <p style={{ 
                  color: hoveredIndex === i ? '#999' : '#4a4a4a',
                  fontSize: '0.85rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {opc.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
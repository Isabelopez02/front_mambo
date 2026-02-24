"use client";
import { motion } from "framer-motion";
import { TShirtIcon, Watch01Icon, ZapIcon, ArrowRight01Icon, JoggerPantsIcon, AidsIcon } from "hugeicons-react";
import { useState } from "react";

export function ProbadorInfo() {
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <section style={{ 
      backgroundColor: '#000000',
      padding: '60px 5%',
      borderTop: '1px solid #1a1a1a',
      borderBottom: '1px solid #1a1a1a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Iconos flotando en el fondo */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        opacity: 0.03,
        pointerEvents: 'none',
        color: '#3b82f6'
      }}>
        {[TShirtIcon, JoggerPantsIcon, AidsIcon, Watch01Icon].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0]
            }} 
            transition={{ 
              repeat: Infinity, 
              duration: 4 + i, 
              delay: i * 0.5,
              ease: "easeInOut" 
            }}
          >
            <Icon size={90} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      {/* Gradientes en bordes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(180deg, #000 0%, transparent 100%)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(0deg, #000 0%, transparent 100%)',
        zIndex: 1
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ 
          position: 'relative', 
          zIndex: 2,
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        {/* Badge con toque azul */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#3b82f6',
            fontWeight: '500', 
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '6px 18px',
            borderRadius: '100px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #2a2a2a',
            marginBottom: '20px'
          }}
        >
          <ZapIcon size={12} color="#3b82f6" strokeWidth={2} /> 
          <span>MODA INTELIGENTE</span>
        </motion.div>

        {/* Título principal */}
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 7vw, 4rem)', 
          fontWeight: '800', 
          lineHeight: 1.1, 
          margin: '0 auto 15px auto', 
          letterSpacing: '-2px',
          maxWidth: '800px',
          textTransform: 'uppercase'
        }}>
          PRUÉBATE{' '}
          <span style={{ 
            color: '#3b82f6',
            position: 'relative',
            display: 'inline-block'
          }}>
            DIGITALMENTE
            <span style={{
              position: 'absolute',
              bottom: '5px',
              left: 0,
              width: '100%',
              height: '6px',
              backgroundColor: '#3b82f6',
              opacity: 0.2,
              borderRadius: '4px'
            }} />
          </span>
        </h2>
        
        {/* Subtítulo */}
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#808080', 
          maxWidth: '550px', 
          margin: '0 auto 30px auto', 
          lineHeight: 1.6,
          fontWeight: '300'
        }}>
          Descubre nuestro **Clóset Virtual** y combina tus prendas favoritas antes de comprar.
        </p>

        {/* Botón */}
        <motion.button
          onHoverStart={() => setHoverBtn(true)}
          onHoverEnd={() => setHoverBtn(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '16px 36px',
            backgroundColor: hoverBtn ? '#3b82f6' : '#0a0a0a',
            color: '#fff',
            border: '1px solid',
            borderColor: hoverBtn ? '#3b82f6' : '#333',
            borderRadius: '40px',
            fontWeight: '600',
            fontSize: '1rem',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: hoverBtn ? '0 10px 25px rgba(59,130,246,0.2)' : 'none'
          }}
        >
          EXPLORAR CLÓSET VIRTUAL
          <motion.div
            animate={{ x: hoverBtn ? 5 : 0 }}
          >
            <ArrowRight01Icon size={18} color="#fff" />
          </motion.div>
        </motion.button>

        {/* Mini features */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
          marginTop: '40px',
          flexWrap: 'wrap'
        }}>
          {['Realidad Aumentada', 'Sin Registro', 'Comparte tu Look'].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#666',
                fontSize: '0.85rem'
              }}
            >
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6'
              }} />
              {text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
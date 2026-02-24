"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight01Icon, ArrowLeft01Icon, StarIcon } from "hugeicons-react";

const nuevasPrendas = [
  { id: 101, name: "Urban Capa M1", price: "$120", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 102, name: "Neo Cargo Pant", price: "$95", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 103, name: "Cyber Hoodie v2", price: "$85", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 104, name: "Alpha Sneakers", price: "$150", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
];

export function NuevosIngresos() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es celular para ajustar el ancho del carrusel
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? window.innerWidth * 0.85 : 350; // Ancho dinámico

  const next = () => setIndex((prev) => (prev + 1) % nuevasPrendas.length);
  const prev = () => setIndex((prev) => (prev - 1 + nuevasPrendas.length) % nuevasPrendas.length);

  return (
    <section style={{ padding: isMobile ? '40px 15px' : '80px 5%', backgroundColor: '#f1f5f9' }}>
      <div style={{ 
        backgroundColor: '#000', 
        borderRadius: isMobile ? '30px' : '40px', 
        padding: isMobile ? '30px 20px' : '60px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: isMobile ? '25px' : '40px',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* ENCABEZADO */}
        <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', marginBottom: '10px' }}>
              <StarIcon size={14} fill="#3b82f6" />
              <span style={{ fontWeight: '800', fontSize: '0.7rem', letterSpacing: '2px' }}>FEBRERO DROP</span>
            </div>
            <h2 style={{ 
                color: '#fff', 
                fontSize: isMobile ? '2.2rem' : '3.5rem', 
                fontWeight: '950', 
                lineHeight: 1, 
                margin: 0, 
                letterSpacing: '-1px' 
            }}>
              NUEVOS <br/> <span style={{ color: '#3b82f6' }}>INGRESOS</span>
            </h2>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={prev} style={navBtnStyle}><ArrowLeft01Icon /></button>
            <button onClick={next} style={navBtnStyle}><ArrowRight01Icon /></button>
          </div>
        </div>

        {/* CONTENEDOR DEL CARRUSEL */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <motion.div 
            animate={{ x: -(index * cardWidth) }} 
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ display: 'flex', gap: isMobile ? '15px' : '30px' }}
          >
            {nuevasPrendas.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={!isMobile ? { y: -10 } : {}}
                style={{ minWidth: isMobile ? `${cardWidth - 120}px` : '320px' }}
              >
                <div style={{ 
                  height: isMobile ? '350px' : '420px', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.1)' 
                }}>
                  <img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
                  <div style={tagStyle}>NEW</div>
                </div>
                <div style={{ marginTop: '15px', color: '#fff' }}>
                  <h4 style={{ margin: 0, fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: '700' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#3b82f6', fontWeight: '800', fontSize: '1rem' }}>{item.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BOTÓN FINAL */}
        <div style={{ textAlign: 'center' }}>
          <button style={{
              ...btnAllStyle,
              width: isMobile ? '100%' : 'auto',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
          }}>
            VER TODO EL CATÁLOGO
          </button>
        </div>
      </div>
    </section>
  );
}

const navBtnStyle = { 
  width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', 
  backgroundColor: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', 
  alignItems: 'center', justifyContent: 'center', transition: '0.3s' 
};

const tagStyle = { 
  position: 'absolute', top: '15px', left: '15px', backgroundColor: '#3b82f6', 
  color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.6rem', fontWeight: '900' 
};

const btnAllStyle = { 
  padding: '18px 40px', backgroundColor: '#fff', color: '#000', border: 'none', 
  borderRadius: '15px', fontWeight: '900', cursor: 'pointer', transition: '0.3s'
};
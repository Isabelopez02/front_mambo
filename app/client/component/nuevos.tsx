"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight01Icon, ArrowLeft01Icon, SparklesIcon } from "hugeicons-react";

const newArrivalsList = [
  { id: 101, name: "Rose Gold Chrome Powder", price: "$14.99", img: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop" },
  { id: 102, name: "Pastel Gel Collection (6pcs)", price: "$24.99", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=600&auto=format&fit=crop" },
  { id: 103, name: "Precision Ombre Sponge Tool", price: "$9.99", img: "https://images.unsplash.com/photo-1599847996508-410a56208a0d?q=80&w=600&auto=format&fit=crop" },
  { id: 104, name: "3D Pearl & Crystal Gems", price: "$11.99", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" },
];

export function NuevosIngresos() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? 260 : 310;
  const next = () => setIndex((prev) => (prev + 1) % newArrivalsList.length);
  const prev = () => setIndex((prev) => (prev - 1 + newArrivalsList.length) % newArrivalsList.length);

  return (
    <section style={{ padding: isMobile ? '40px 20px' : '60px 5%', backgroundColor: '#faf2f5' }}>
      <div style={{ 
        backgroundColor: '#111111', 
        borderRadius: '24px', 
        padding: isMobile ? '30px 20px' : '50px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* HEADER */}
        <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e0527f', marginBottom: '8px' }}>
              <SparklesIcon size={14} color="#e0527f" />
              <span style={{ fontWeight: '800', fontSize: '0.7rem', letterSpacing: '2px' }}>JUST DROPPED</span>
            </div>
            <h2 style={{ 
                color: '#ffffff', 
                fontSize: isMobile ? '2rem' : '2.8rem', 
                fontFamily: 'Georgia, serif',
                fontWeight: '600', 
                lineHeight: 1.1, 
                margin: 0, 
                letterSpacing: '0.5px' 
            }}>
              NEW ARRIVALS
            </h2>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={prev} style={navBtnStyle}><ArrowLeft01Icon size={18} color="#fff" /></button>
            <button onClick={next} style={navBtnStyle}><ArrowRight01Icon size={18} color="#fff" /></button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <motion.div 
            animate={{ x: -(index * cardWidth) }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ display: 'flex', gap: '20px' }}
          >
            {newArrivalsList.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -6 }}
                style={{ minWidth: `${cardWidth - 20}px` }}
              >
                <div style={{ 
                  height: '260px', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundColor: '#fbf0f4'
                }}>
                  <img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
                  <div style={tagStyle}>NEW</div>
                </div>
                <div style={{ marginTop: '12px', color: '#ffffff' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: '700' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#e0527f', fontWeight: '800', fontSize: '0.95rem' }}>{item.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const navBtnStyle: React.CSSProperties = { 
  width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', 
  backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', 
  alignItems: 'center', justifyContent: 'center'
};

const tagStyle: React.CSSProperties = { 
  position: 'absolute', top: '12px', left: '12px', backgroundColor: '#e0527f', 
  color: '#ffffff', padding: '3px 10px', borderRadius: '50px', fontSize: '0.62rem', fontWeight: '800' 
};
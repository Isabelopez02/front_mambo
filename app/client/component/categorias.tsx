"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag01Icon, 
  PaintBrush01Icon, 
  Home01Icon, 
  DiamondIcon, 
  Leaf01Icon, 
  Tag01Icon,
  StarIcon
} from "hugeicons-react";

const categories = [
  { id: 1, title: "CARTERAS", icon: <ShoppingBag01Icon size={26} color="#1a0f14" /> },
  { id: 2, title: "MAQUILLAJE", icon: <PaintBrush01Icon size={26} color="#1a0f14" /> },
  { id: 3, title: "HOGAR", icon: <Home01Icon size={26} color="#1a0f14" /> },
  { id: 4, title: "ACCESORIOS", icon: <DiamondIcon size={26} color="#1a0f14" /> },
  { id: 5, title: "SKINCARE", icon: <Leaf01Icon size={26} color="#1a0f14" /> },
  { id: 6, title: "CALZADO", icon: <Tag01Icon size={26} color="#1a0f14" /> },
  { id: 7, title: "JOYERÍA", icon: <StarIcon size={26} color="#1a0f14" /> },
];

export function FullCategorias() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section style={{ 
      padding: isMobile ? '24px 20px' : '26px 6%', 
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f5eaee'
    }}>
      

      {/* CATEGORIES ICON ROW ON PURE WHITE */}
      <div style={{ 
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'center',
        alignItems: 'center',
        gap: isMobile ? '18px' : '40px',
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? '8px' : '0'
      }}>
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: '65px'
            }}
          >
            {/* ICON DIRECTLY ON WHITE */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              opacity: 0.85
            }}>
              {cat.icon}
            </div>

            {/* LABEL */}
            <span style={{ 
              fontSize: '0.62rem', 
              fontWeight: '500', 
              color: '#1a0f14',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              {cat.title}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
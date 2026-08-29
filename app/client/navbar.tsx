"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search01Icon, 
  UserIcon, 
  ShoppingBag01Icon, 
  Menu01Icon,
  Cancel01Icon
} from "hugeicons-react";
import { TopBar } from "./component/topBar";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navLinks = [
    { label: "PRODUCTOS" },
    { label: "CATEGORIAS" },
    { label: "NUEVOS" },
    { label: "HOGAR" },
    { label: "ACCESORIOS" },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#ffffff' }}>
      <TopBar />

      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '8px 1.2rem' : '10px 4rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f3e8ee'
      }}>
        
        {/* LOGO TATY IMPORTACIONES */}
        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
          <span style={{ 
            fontFamily: 'var(--font-dm-serif), Georgia, serif', 
            fontSize: '1.25rem', 
            fontWeight: '400', 
            letterSpacing: '2.5px', 
            color: '#1a0f14',
            lineHeight: 1
          }}>
            TATY
          </span>
          <span style={{ 
            fontSize: '0.55rem', 
            fontWeight: '700', 
            letterSpacing: '2px', 
            color: '#9c3552',
            marginTop: '1px',
            textTransform: 'uppercase'
          }}>
            IMPORTACIONES
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#1a0f14',
                  textDecoration: 'none',
                  letterSpacing: '1.5px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#9c3552')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#1a0f14')}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* RIGHT UTILITIES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <button style={iconBtnStyle} title="Buscar">
            <Search01Icon size={18} color="#1a0f14" />
          </button>
          
          <button style={iconBtnStyle} title="Mi Cuenta">
            <UserIcon size={18} color="#1a0f14" />
          </button>

          {/* Cart Icon */}
          <div style={{ position: 'relative' }}>
            <button style={iconBtnStyle} title="Carrito">
              <ShoppingBag01Icon size={18} color="#1a0f14" />
            </button>
            <span style={badgeStyle}>2</span>
          </div>

          {/* Mobile Toggle */}
          {isMobile && (
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ ...iconBtnStyle, marginLeft: '4px' }}
            >
              {menuOpen ? <Cancel01Icon size={20} color="#1a0f14" /> : <Menu01Icon size={20} color="#1a0f14" />}
            </button>
          )}
        </div>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #f3e8ee',
                padding: '16px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 999,
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
              }}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href="#"
                  style={{ 
                    fontSize: '0.82rem', 
                    fontWeight: '600', 
                    color: '#1a0f14',
                    textDecoration: 'none',
                    letterSpacing: '1px'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%'
};

const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-3px',
  right: '-3px',
  width: '14px',
  height: '14px',
  backgroundColor: '#9c3552',
  color: 'white',
  borderRadius: '50%',
  fontSize: '0.6rem',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
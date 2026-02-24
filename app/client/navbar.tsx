"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Notification01Icon,
  ShoppingBag01Icon, 
  TruckIcon,       
  Menu01Icon,
  Cancel01Icon 
} from "hugeicons-react";

// --- Botón de Acción ---
function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      style={{ 
        padding: '8px', 
        borderRadius: '8px', 
        border: 'none', 
        background: 'transparent',
        cursor: 'pointer',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </motion.button>
  );
}

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 1.2rem' : '0 2rem',
      height: '64px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      
      {/* 1. BRANDING & LINKS (Desktop) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#0f172a', borderRadius: '6px' }} />
          <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
            MAMBO
          </span>
        </div>

        {/* Links ocultos en móvil */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {["Resumen", "Clientes", "Productos", "Ajustes"].map((link, i) => (
              <span key={link} style={{ fontSize: '0.875rem', fontWeight: i === 0 ? '600' : '500', color: i === 0 ? '#0f172a' : '#64748b', cursor: 'pointer' }}>
                {link}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. ACCIONES */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.2rem' : '0.5rem' }}>
        
        {/* Iconos que se mantienen en móvil */}
        <ActionButton icon={<Notification01Icon size={20} />} />
        <ActionButton icon={<ShoppingBag01Icon size={20} />} />

        {!isMobile && (
          <>
            <div style={{ position: 'relative' }}>
              <ActionButton icon={<TruckIcon size={20} />} />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0', margin: '0 8px' }} />
            
            {/* Botón Mi Cuenta (Desktop) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px 4px 4px', backgroundColor: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: '700' }}>P</div>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Mi Cuenta</span>
            </div>
          </>
        )}

        {/* Botón Menú (Solo móvil) */}
        {isMobile && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', padding: '8px', color: '#0f172a', cursor: 'pointer' }}
          >
            {menuOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
          </button>
        )}
      </div>

      {/* 3. MENÚ DESPLEGABLE (Mobile Overlay) */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 99,
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
          >
            {["Resumen", "Clientes", "Productos", "Ajustes", "Mi Cuenta"].map((link) => (
              <span key={link} style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                {link}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
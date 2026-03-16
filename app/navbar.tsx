"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // <-- 1. IMPORTAMOS LINK DE NEXT.JS
import { 
  Notification01Icon,
  ShoppingCart01Icon,
  Menu01Icon,
  Cancel01Icon,
  UserCircleIcon,
  SparklesIcon
} from "hugeicons-react";
import { navLinks } from "./nav"; 

function ActionButton({ icon, badge }: { icon: React.ReactNode, badge?: boolean }) {
  return (
    <motion.button 
      whileHover={{ backgroundColor: '#f1f5f9' }}
      whileTap={{ scale: 0.9 }}
      style={{ padding: '10px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
    >
      {icon}
      {badge && <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />}
    </motion.button>
  );
}

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '70px',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.65)' : '#ffffff',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.5)' : '1px solid #e2e8f0',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.05)' : 'none',
      display: 'flex', justifyContent: 'center', zIndex: 1000, transition: 'all 0.3s ease', boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1400px', padding: isMobile ? '0 20px' : '0 40px', boxSizing: 'border-box' }}>
        
        {/* LOGO: Al hacer clic, te lleva al inicio "/" */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', zIndex: 10 }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '900', fontSize: '1rem' }}>M</span>
            </div>
            <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#000', letterSpacing: '-0.5px' }}>MAMBO</span>
          </div>
        </Link>

        {/* ENLACES (Desktop) */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '30px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} style={{ textDecoration: 'none' }}>
                <span style={{ 
                  fontSize: '0.85rem', fontWeight: '800', color: '#475569', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px', transition: 'color 0.2s' 
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#000'}
                onMouseOut={(e) => e.currentTarget.style.color = '#475569'}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* ACCIONES Y BOTONES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '5px' : '15px', zIndex: 10 }}>
          {!isMobile && <ActionButton icon={<Notification01Icon size={22} />} badge />}
          <ActionButton icon={<ShoppingCart01Icon size={22} />} badge />
          {!isMobile && <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0', margin: '0 5px' }} />}

          {!isMobile && (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#000' }}>
                  <UserCircleIcon size={24} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase' }}>Acceder</span>
                </motion.div>
              </Link>

              <Link href="/vestidor" style={{ textDecoration: 'none' }}>
                <motion.div whileHover={{ scale: 1.05, backgroundColor: '#e5a000' }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFB800', color: '#000', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 15px rgba(255, 184, 0, 0.3)' }}>
                  <SparklesIcon size={18} variant="solid" />
                  Vestidor Virtual
                </motion.div>
              </Link>
            </>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', padding: '8px', color: '#000', cursor: 'pointer' }}>
              {menuOpen ? <Cancel01Icon size={28} /> : <Menu01Icon size={28} />}
            </button>
          )}
        </div>
      </div>

      {/* MENÚ DESPLEGABLE (Móvil) */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', top: '70px', left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', borderBottom: '1px solid #e2e8f0', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path} style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#000', textTransform: 'uppercase' }}>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/login" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', borderRadius: '12px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontWeight: '800', fontSize: '1rem', textTransform: 'uppercase' }}>
                  <UserCircleIcon size={20} /> Acceder
                </div>
              </Link>
              
              <Link href="/vestidor" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', borderRadius: '12px', backgroundColor: '#FFB800', color: '#000', fontWeight: '900', fontSize: '1rem', textTransform: 'uppercase' }}>
                  <SparklesIcon size={20} variant="solid" /> Vestidor Virtual
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
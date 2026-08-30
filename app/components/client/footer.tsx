"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  InstagramIcon, 
  Facebook02Icon, 
  WhatsappIcon,
  Mail01Icon, 
  ArrowRight01Icon,
  FavouriteIcon 
} from "hugeicons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: '#ffffff', 
      color: '#1a0f14', 
      padding: '60px 6% 30px 6%',
      borderTop: '1px solid #f3e8ee'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '40px',
        marginBottom: '50px'
      }}>
        
        {/* BRAND & NEWSLETTER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-dm-serif), Georgia, serif', 
              fontSize: '1.5rem', 
              fontWeight: '400', 
              letterSpacing: '3px', 
              color: '#1a0f14' 
            }}>
              TATY
            </span>
            <div style={{ fontSize: '0.6rem', fontWeight: '700', letterSpacing: '2.5px', color: '#9c3552', marginTop: '-2px' }}>
              IMPORTACIONES
            </div>
          </div>

          <p style={{ color: '#55494e', fontSize: '0.82rem', lineHeight: 1.6, maxWidth: '280px', margin: 0 }}>
            Entérate de las últimas novedades, ofertas relámpago e ingresos semanales.
          </p>
          
          {/* EMAIL FORM */}
          <div style={{ position: 'relative', maxWidth: '300px' }}>
            <input 
              type="email" 
              placeholder="Ingresa tu correo" 
              style={inputStyle} 
            />
            <button style={btnInputStyle}>
              <ArrowRight01Icon size={16} color="#ffffff" />
            </button>
          </div>
        </div>

        {/* SHOP LINKS */}
        <div style={colStyle}>
          <h4 style={titleStyle}>Categorías</h4>
          <a href="#" style={linkStyle}>Carteras</a>
          <a href="#" style={linkStyle}>Maquillaje</a>
          <a href="#" style={linkStyle}>Hogar</a>
          <a href="#" style={linkStyle}>Accesorios</a>
          <a href="#" style={linkStyle}>Skincare</a>
        </div>

        {/* HELP LINKS */}
        <div style={colStyle}>
          <h4 style={titleStyle}>Ayuda</h4>
          <a href="#" style={linkStyle}>Preguntas Frecuentes</a>
          <a href="#" style={linkStyle}>Envíos y Seguimiento</a>
          <a href="#" style={linkStyle}>Términos y Condiciones</a>
          <a href="#" style={linkStyle}>Contacto</a>
        </div>

        {/* SOCIAL & CONTACT */}
        <div style={colStyle}>
          <h4 style={titleStyle}>Redes Sociales</h4>
          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.a whileHover={{ y: -3, color: '#9c3552' }} href="#" style={socialLinkStyle}><InstagramIcon size={20} /></motion.a>
            <motion.a whileHover={{ y: -3, color: '#9c3552' }} href="#" style={socialLinkStyle}><Facebook02Icon size={20} /></motion.a>
            <motion.a whileHover={{ y: -3, color: '#9c3552' }} href="#" style={socialLinkStyle}><WhatsappIcon size={20} /></motion.a>
          </div>
          
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#55494e', fontSize: '0.8rem' }}>
            <Mail01Icon size={16} color="#9c3552" />
            <span>contacto@tatyimportaciones.com</span>
          </div>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div style={{ 
        borderTop: '1px solid #f3e8ee', 
        paddingTop: '24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <p style={{ color: '#887c7e', fontSize: '0.75rem', margin: 0 }}>
          © {currentYear} TATY IMPORTACIONES. Todos los derechos reservados.
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#887c7e', fontSize: '0.75rem' }}>
          <span>Creado con</span> <FavouriteIcon size={12} color="#9c3552" fill="#9c3552" /> <span>para ti.</span>
        </div>
      </div>
    </footer>
  );
}

const colStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '12px' };
const titleStyle: React.CSSProperties = { fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1a0f14', marginBottom: '6px' };
const linkStyle: React.CSSProperties = { color: '#55494e', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s' };
const socialLinkStyle: React.CSSProperties = { color: '#1a0f14', textDecoration: 'none' };
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 45px 12px 14px',
  backgroundColor: '#faf7f4',
  border: '1px solid #f3d4e0',
  borderRadius: '8px',
  color: '#1a0f14',
  fontSize: '0.8rem',
  outline: 'none'
};
const btnInputStyle: React.CSSProperties = {
  position: 'absolute',
  right: '4px',
  top: '4px',
  bottom: '4px',
  backgroundColor: '#9c3552',
  border: 'none',
  borderRadius: '6px',
  color: '#ffffff',
  width: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};
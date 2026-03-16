"use client";
import { motion } from "framer-motion";
import { 
  InstagramIcon, 
  Facebook02Icon, 
  TwitterIcon, 
  Mail01Icon, 
  ArrowRight01Icon,
  ZapIcon 
} from "hugeicons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      padding: '80px 5% 40px 5%',
      borderTop: '1px solid #1a1a1a'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '60px',
        marginBottom: '60px'
      }}>
        
        {/* COLUMNA 1: BRAND & NEWSLETTER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-3px', margin: 0 }}>
            MAMBO
          </h2>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px' }}>
            Únete a la nueva era del streetwear digital. Recibe drops exclusivos y acceso anticipado.
          </p>
          
          {/* FORMULARIO DE CORREO */}
          <div style={{ position: 'relative', marginTop: '10px' }}>
            <input 
              type="email" 
              placeholder="Tu email" 
              style={inputStyle} 
            />
            <button style={btnInputStyle}>
              <ArrowRight01Icon size={20} />
            </button>
          </div>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN */}
        <div style={colStyle}>
          <h4 style={titleStyle}>Explorar</h4>
          <a href="#" style={linkStyle}>Nuevos Ingresos</a>
          <a href="#" style={linkStyle}>Más Vendidos</a>
          <a href="#" style={linkStyle}>Clóset Virtual</a>
          <a href="#" style={linkStyle}>Categorías</a>
        </div>

        {/* COLUMNA 3: SOPORTE */}
        <div style={colStyle}>
          <h4 style={titleStyle}>Ayuda</h4>
          <a href="#" style={linkStyle}>Envíos</a>
          <a href="#" style={linkStyle}>Devoluciones</a>
          <a href="#" style={linkStyle}>Guía de Tallas</a>
          <a href="#" style={linkStyle}>Contacto</a>
        </div>

        {/* COLUMNA 4: CONTACTO & REDES */}
        <div style={colStyle}>
          <h4 style={titleStyle}>Síguenos</h4>
          <div style={{ display: 'flex', gap: '15px' }}>
            <motion.a whileHover={{ y: -5, color: '#3b82f6' }} href="#" style={socialLinkStyle}><InstagramIcon size={24} /></motion.a>
            <motion.a whileHover={{ y: -5, color: '#3b82f6' }} href="#" style={socialLinkStyle}><Facebook02Icon size={24} /></motion.a>
            <motion.a whileHover={{ y: -5, color: '#3b82f6' }} href="#" style={socialLinkStyle}><TwitterIcon size={24} /></motion.a>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
            <Mail01Icon size={18} />
            <span style={{ fontSize: '0.9rem' }}>mambo.mambo@gmail.com</span>
          </div>
        </div>
      </div>

      {/* LINEA FINAL */}
      <div style={{ 
        borderTop: '1px solid #1a1a1a', 
        paddingTop: '30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <p style={{ color: '#444', fontSize: '0.8rem' }}>
          © {currentYear} MAMBO CLOTHING. Todos los derechos reservados.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#444', fontSize: '0.8rem' }}>
          <ZapIcon size={14} /> <span>POWERED BY MAMBO TECH</span>
        </div>
      </div>
    </footer>
  );
}

// ESTILOS EN LÍNEA
const colStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const titleStyle = { fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#fff', marginBottom: '10px' };
const linkStyle = { color: '#666', textDecoration: 'none', fontSize: '0.95rem', transition: '0.3s' };
const socialLinkStyle = { color: '#fff', textDecoration: 'none' };
const inputStyle = {
  width: '90%',
  padding: '16px 20px',
  backgroundColor: '#111',
  border: '1px solid #222',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none'
};
const btnInputStyle = {
  position: 'absolute',
  right: '8px',
  top: '8px',
  bottom: '8px',
  backgroundColor: '#3b82f6',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  width: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};
"use client";
import { motion } from "framer-motion";
import { 
  InstagramIcon, 
  TiktokIcon, 
  YoutubeIcon, 
  ArrowRight01Icon,
  Mail01Icon,
  WhatsappIcon
} from "hugeicons-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', paddingTop: '80px', borderTop: '1px solid #000000ff' }}>

      {/* 2. SECCIÓN: LINKS Y NAVEGACIÓN */}
      <div style={{ backgroundColor: '#050505', padding: '60px 5% 30px 5%', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px' }}>
          
          {/* Columna 1: Brand */}
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: '950', marginBottom: '20px' }}>MAMBO<span style={{color: '#3b82f6'}}>.</span></h3>
            <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: '600' }}>
              Cultura callejera, estética urbana y drops exclusivos. Elevando el estilo de Lima al siguiente nivel.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <InstagramIcon size={20} style={{ cursor: 'pointer', color: '#666' }} />
              <TiktokIcon size={20} style={{ cursor: 'pointer', color: '#666' }} />
              <WhatsappIcon size={20} style={{ cursor: 'pointer', color: '#666' }} />
            </div>
          </div>

          {/* Columna 2: Shop */}
          <FooterLinks title="TIENDA" links={['Hombre', 'Mujer', 'Zapatillas', 'Accesorios', 'Ofertas']} />

          {/* Columna 3: Ayuda */}
          <FooterLinks title="SOPORTE" links={['Envíos', 'Devoluciones', 'Tallas', 'Contacto']} />

          {/* Columna 4: Legal / Reclamaciones */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>LEGAL</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={linkStyle}>Términos y condiciones</li>
              <li style={linkStyle}>Privacidad</li>
              <li>
                <img 
                  src="https://www.gob.pe/images/libro_reclamaciones.png" 
                  alt="Libro de Reclamaciones" 
                  style={{ width: '120px', marginTop: '10px', filter: 'invert(1)', cursor: 'pointer' }}
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: '80px', paddingTop: '20px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '0.7rem', color: '#444', fontWeight: '700' }}>© 2026 MAMBO STORE - TODOS LOS DERECHOS RESERVADOS</span>
          <span style={{ fontSize: '0.7rem', color: '#444', fontWeight: '700' }}>DESIGNED BY CLAN MAMBO</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string, links: string[] }) {
  return (
    <div>
      <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map(link => (
          <li key={link} style={linkStyle}>{link}</li>
        ))}
      </ul>
    </div>
  );
}

const linkStyle = { color: '#666', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', transition: '0.3s' };
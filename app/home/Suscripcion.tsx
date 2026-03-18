 'use client';
import { ArrowRight01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import { use } from "react";

export function Suscripcion(){
    return(
      <div style={{ backgroundColor: '#000', color: '#fff',}}>
        <div style={{ padding: '60px 5% 0px 5%'}}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6' }} />
              <span style={{ fontWeight: '900', fontSize: '0.8rem', letterSpacing: '3px' }}>PRÓXIMO DROP 2026</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: '950', lineHeight: 0.8, letterSpacing: '-5px', margin: 0 }}>
                NO TE QUEDES <br /> <span style={{ WebkitTextStroke: '1px #fff', color: 'transparent' }}>FUERA DEL CLAN</span>
              </h2>
              
              {/* Formulario Estilo Brutalista */}
              <div style={{ display: 'flex', width: '100%', maxWidth: '800px', marginTop: '30px', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>
                <input 
                  type="email" 
                  placeholder="TU EMAIL PARA EL ACCESO ANTICIPADO" 
                  style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: '700', outline: 'none', padding: '10px 0' }}
                />
                <motion.button 
                  whileHover={{ x: 10 }}
                  style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '900' }}
                >
                  UNIRME <ArrowRight01Icon size={30} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
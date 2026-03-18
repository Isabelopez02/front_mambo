"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft01Icon, 
  SparklesIcon, 
  Cancel01Icon,
  ShoppingBag01Icon
} from "hugeicons-react";
import Link from "next/link";
import { UseValidationPantalla } from "@/app/hooks/UseValidationPantalla";

// --- DATOS DE PRUEBA (Reemplázalos luego con tus productos reales) ---
const inventario = {
  superiores: [
    { id: 's1', name: "Cyber Hoodie", price: 95, img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
    { id: 's2', name: "Oversized Tee", price: 45, img: "https://i.pinimg.com/736x/1f/35/8f/1f358fc40b87d712c8c89f838fb73f43.jpg" },
    { id: 's3', name: "Tech Jacket", price: 120, img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  ],
  inferiores: [
    { id: 'i1', name: "Neo Cargo Pant", price: 85, img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
    { id: 'i2', name: "Street Joggers", price: 70, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" },
  ],
  zapatillas: [
    { id: 'z1', name: "Alpha Sneakers", price: 150, img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
    { id: 'z2', name: "Retro Kicks", price: 130, img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg" }, // Usando una imagen que tenías de prueba
  ]
};

export default function VestidorVirtual() {
  const isMobile = UseValidationPantalla();

  // ESTADOS PARA LAS 3 PRENDAS SELECCIONADAS (Inician vacíos)
  const [outfit, setOutfit] = useState({
    superior: null as any,
    inferior: null as any,
    zapatillas: null as any
  });

  // Función para equipar una prenda
  const equiparPrenda = (categoria: 'superior' | 'inferior' | 'zapatillas', prenda: any) => {
    setOutfit(prev => ({ ...prev, [categoria]: prenda }));
  };

  // Función para quitar una prenda
  const quitarPrenda = (categoria: 'superior' | 'inferior' | 'zapatillas') => {
    setOutfit(prev => ({ ...prev, [categoria]: null }));
  };

  // Calcular precio total del outfit armado
  const totalOutfit = (outfit.superior?.price || 0) + (outfit.inferior?.price || 0) + (outfit.zapatillas?.price || 0);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '70px', paddingBottom: '40px' }}>
      
      {/* HEADER DEL VESTIDOR */}
      <div style={{ padding: '20px 5%', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000', fontWeight: '800', fontSize: '0.8rem' }}>
          <ArrowLeft01Icon size={20} /> SALIR DEL VESTIDOR
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFB800', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', textTransform: 'uppercase' }}>
          <SparklesIcon variant="solid" /> AI FITTING ROOM
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL (3 COLUMNAS EN PC, 1 EN MÓVIL) */}
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        gap: '20px', 
        padding: '0 5%',
        maxWidth: '1600px',
        margin: '0 auto',
        alignItems: isMobile ? 'center' : 'stretch'
      }}>

        {/* ========================================================= */}
        {/* COLUMNA 1: EL MANIQUÍ / MODELO BASE (30%)                 */}
        {/* ========================================================= */}
        <div style={{ flex: '1', width: '100%', maxWidth: isMobile ? '350px' : 'none' }}>
          <div style={{ 
            width: '100%', aspectRatio: '9/16', backgroundColor: '#e2e8f0', borderRadius: '24px', 
            position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {/* Aquí iría la imagen de tu modelo/avatar base */}
            <h3 style={{ color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>
              Tu Avatar<br/>AQUÍ
            </h3>

            {/* PRENDAS SUPERPUESTAS AL AVATAR (Visualización real si tienes las imágenes transparentes) */}
            <AnimatePresence>
              {outfit.superior && (
                <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} src={outfit.superior.img} style={{ position: 'absolute', top: '15%', width: '70%', height: '35%', objectFit: 'cover', borderRadius: '16px', zIndex: 3 }} />
              )}
              {outfit.inferior && (
                <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} src={outfit.inferior.img} style={{ position: 'absolute', top: '52%', width: '65%', height: '35%', objectFit: 'cover', borderRadius: '16px', zIndex: 2 }} />
              )}
              {outfit.zapatillas && (
                <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} src={outfit.zapatillas.img} style={{ position: 'absolute', bottom: '2%', width: '50%', height: '15%', objectFit: 'cover', borderRadius: '16px', zIndex: 4 }} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMNA 2: LAS 3 CARDS CENTRALES (EL FIT ACTUAL) (25%)    */}
        {/* ========================================================= */}
        <div style={{ 
          flex: '0.8', width: '100%', display: 'flex', flexDirection: isMobile ? 'row' : 'column', 
          gap: '15px', justifyContent: 'center' 
        }}>
          {/* Función auxiliar para renderizar los huecos (slots) del medio */}
          {[
            { cat: 'superior', label: 'PARTE SUPERIOR', item: outfit.superior },
            { cat: 'inferior', label: 'PARTE INFERIOR', item: outfit.inferior },
            { cat: 'zapatillas', label: 'ZAPATILLAS', item: outfit.zapatillas }
          ].map((slot) => (
            <div key={slot.cat} style={{ 
              flex: 1, backgroundColor: '#fff', borderRadius: '20px', padding: '15px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: slot.item ? '2px solid #2563eb' : '2px dashed #cbd5e1',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', minHeight: isMobile ? '120px' : '200px', transition: 'all 0.3s'
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: '900', color: slot.item ? '#2563eb' : '#94a3b8', position: 'absolute', top: '15px', letterSpacing: '1px' }}>
                {slot.label}
              </span>

              {slot.item ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '20px' }}>
                  <img src={slot.item.img} alt={slot.item.name} style={{ width: isMobile ? '50px' : '80px', height: isMobile ? '50px' : '80px', borderRadius: '12px', objectFit: 'cover', marginBottom: '10px' }} />
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.75rem', fontWeight: '900', textAlign: 'center', textTransform: 'uppercase' }}>{slot.item.name}</p>
                  <button onClick={() => quitarPrenda(slot.cat as any)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#fee2e2', border: 'none', color: '#ef4444', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}>
                    <Cancel01Icon size={16} />
                  </button>
                </motion.div>
              ) : (
                <p style={{ color: '#cbd5e1', fontSize: '2rem', margin: 0, fontWeight: '300', marginTop: '15px' }}>+</p>
              )}
            </div>
          ))}

          {/* TOTAL Y BOTÓN DE COMPRA DEL OUTFIT COMPLETO */}
          <div style={{ backgroundColor: '#000', borderRadius: '20px', padding: '20px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: isMobile ? '0' : 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8' }}>TOTAL DEL FIT</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '900' }}>S/. {totalOutfit.toFixed(2)}</span>
            </div>
            <button 
              disabled={totalOutfit === 0}
              style={{ backgroundColor: totalOutfit > 0 ? '#2563eb' : '#333', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '900', cursor: totalOutfit > 0 ? 'pointer' : 'not-allowed', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '0.85rem' }}
            >
              <ShoppingBag01Icon size={18} /> Comprar Look
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMNA 3: LOS 3 CARRUSELES (EL INVENTARIO) (45%)         */}
        {/* ========================================================= */}
        <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column', gap: '30px', backgroundColor: '#fff', padding: '25px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

          {/* Carrusel 1: Superiores */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px', color: '#0f172a' }}>1. Elige tu Top</h4>
            <div className="hide-scrollbar" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
              {inventario.superiores.map(item => (
                <CarruselItem key={item.id} item={item} activo={outfit.superior?.id === item.id} onClick={() => equiparPrenda('superior', item)} />
              ))}
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#f1f5f9', width: '100%' }} />

          {/* Carrusel 2: Inferiores */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px', color: '#0f172a' }}>2. Elige tus Bottoms</h4>
            <div className="hide-scrollbar" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
              {inventario.inferiores.map(item => (
                <CarruselItem key={item.id} item={item} activo={outfit.inferior?.id === item.id} onClick={() => equiparPrenda('inferior', item)} />
              ))}
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#f1f5f9', width: '100%' }} />

          {/* Carrusel 3: Zapatillas */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px', color: '#0f172a' }}>3. Elige tus Kicks</h4>
            <div className="hide-scrollbar" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
              {inventario.zapatillas.map(item => (
                <CarruselItem key={item.id} item={item} activo={outfit.zapatillas?.id === item.id} onClick={() => equiparPrenda('zapatillas', item)} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Mini-componente para las tarjetas dentro de los carruseles derechos
function CarruselItem({ item, activo, onClick }: { item: any, activo: boolean, onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      style={{ 
        minWidth: '120px', width: '120px', backgroundColor: '#f8fafc', borderRadius: '16px', 
        padding: '10px', cursor: 'pointer', border: activo ? '2px solid #2563eb' : '2px solid transparent',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p style={{ margin: '0 0 2px 0', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
      <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: '900', color: '#2563eb' }}>S/. {item.price}</p>
    </motion.div>
  );
}
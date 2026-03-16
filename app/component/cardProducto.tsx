import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag01Icon } from "hugeicons-react";
// --- COMPONENTE DE TARJETA UNIFICADO (TU ESTILO + UX PRO) ---
export default function TarjetaProducto({ producto, index, isMobile }: { producto: any, index: number, isMobile: boolean }) {
  const [fotoActual, setFotoActual] = useState(producto.img);
  const [hover, setHover] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => { setHover(true); if (producto.imgHover) setFotoActual(producto.imgHover); }}
      onMouseLeave={() => { setHover(false); setFotoActual(producto.img); setShowQuickAdd(false); }}
      whileHover={!isMobile ? { y: -8 } : {}}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}
    >
      {/* 1. CONTENEDOR DE IMAGEN (Tu estilo exacto: aspectRatio 3/4, borderRadius 16px) */}
      <div style={{ 
        width: '100%', 
        aspectRatio: '3/4', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        position: 'relative', 
        backgroundColor: '#f3f4f6',
        marginBottom: '12px'
      }}>
        
        {/* Etiqueta Visual (Badge PRO) */}
        {producto.badge && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: producto.badgeColor, color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: '900', zIndex: 10, letterSpacing: '0.5px' }}>
            {producto.badge}
          </div>
        )}

        {/* Imagen con Hover */}
        <motion.img 
          src={fotoActual} 
          alt={producto.name} 
          whileHover={{ scale: 1.05 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} 
        />

        {/* Botón Quick Add (PRO) que aparece sobre la foto en PC */}
        <AnimatePresence>
          {hover && !isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', zIndex: 20 }}
            >
              {!showQuickAdd ? (
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickAdd(true); }} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '8px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', color: '#000', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  + TALLAS
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '5px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
                  {producto.sizes.map((talla: string) => (
                    <button key={talla} style={{ flex: 1, padding: '6px 0', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log(`Agregado talla ${talla}`); }}
                    >
                      {talla}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. INFORMACIÓN Y BOTÓN (Tu flexbox space-between exacto) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Círculos de color (Si el producto tiene variantes) */}
          {producto.colors && producto.colors.length > 1 && (
            <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
              {producto.colors.map((color: any, idx: number) => (
                <button 
                  key={idx} 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFotoActual(color.img); }} 
                  style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color.hex, border: '1px solid #cbd5e1', cursor: 'pointer', padding: 0 }}
                />
              ))}
            </div>
          )}

          {/* Nombre del producto (Tu fuente pequeña y mayúsculas) */}
          <h4 style={{ 
            margin: '0 0 2px 0', 
            fontSize: isMobile ? '0.65rem' : '0.75rem', 
            fontWeight: '800', 
            color: '#000',
            textTransform: 'uppercase' 
          }}>
            {producto.name}
          </h4>

          {/* Precio (Tu azul vibrante y tamaño) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: '800', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
              S/. {producto.price.toFixed(2)}
            </p>
            {producto.oldPrice && (
              <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#94a3b8', textDecoration: 'line-through' }}>
                S/. {producto.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Botón de Agregar al carrito (Tu botón cuadrado azul oscuro casi negro) */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation(); 
            console.log(`Agregado al carrito: ${producto.id}`);
          }}
          style={{
            backgroundColor: '#1e3a8a', 
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            width: isMobile ? '32px' : '38px',
            height: isMobile ? '32px' : '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <ShoppingBag01Icon size={isMobile ? 16 : 18} variant="stroke" strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.div>
  );
}
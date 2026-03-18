"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag01Icon, 
  Cancel01Icon, 
  MinusSignIcon, 
  PlusSignIcon 
} from "hugeicons-react";
import Link from "next/link";
import { Producto } from "../ts/Prendas"; 

interface CardProductoProps {
  producto: Producto; 
  index: number;
  isMobile: boolean;
}

export default function CardProducto({ producto, index, isMobile }: CardProductoProps) {
  const [fotoActual, setFotoActual] = useState(producto.img);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hover, setHover] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // 🔥 NUEVOS ESTADOS PARA EL MODAL DE COMPRA RÁPIDA 🔥
  const [showModal, setShowModal] = useState(false);
  const [modalSize, setModalSize] = useState("");
  const [modalColor, setModalColor] = useState(producto.colors?.[0]?.img || producto.img);
  const [modalQty, setModalQty] = useState(1);

  const handleCambiarFoto = (nuevaFoto: string | undefined) => {
    if (nuevaFoto) setFotoActual(nuevaFoto);
  };

  const handleMouseLeave = () => {
    setHover(false);
    handleCambiarFoto(producto.img);
    setShowQuickAdd(false);
  };

  // Función para abrir el modal reseteando los valores
  const abrirModalCompra = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setModalSize("");
    setModalQty(1);
    setModalColor(producto.colors?.[0]?.img || producto.img);
    setShowModal(true);
  };

  return (
    <>
      {/* 1. LA TARJETA NORMAL (ENVUELTA EN SU LINK) */}
      <Link href={`/product/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={!isMobile ? { y: -8 } : {}}
          style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}
        >
          {/* CONTENEDOR DE IMAGEN */}
          <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', position: 'relative', backgroundColor: '#f3f4f6', marginBottom: '12px' }}>
            {producto.badge && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: producto.badgeColor || '#000', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', zIndex: 10, letterSpacing: '1px' }}>
                {producto.badge}
              </div>
            )}
            <motion.img src={fotoActual} alt={producto.name} whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          </div>

          {/* INFORMACIÓN Y BOTÓN */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {producto.colors && producto.colors.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  {producto.colors.map((color, idx) => (
                    <button key={idx} onMouseEnter={() => handleCambiarFoto(color.img)} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCambiarFoto(color.img); }} style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: color.hex, border: '1px solid #cbd5e1', cursor: 'pointer', padding: 0, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }} aria-label={`Color ${color.hex}`} />
                  ))}
                </div>
              )}
              <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '0.7rem' : '0.85rem', fontWeight: '800', color: '#000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{producto.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ margin: 0, color: '#2563eb', fontWeight: '900', fontSize: isMobile ? '0.85rem' : '1rem' }}>S/. {producto.price.toFixed(2)}</p>
                {producto.oldPrice && <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#94a3b8', textDecoration: 'line-through' }}>S/. {producto.oldPrice.toFixed(2)}</span>}
              </div>
            </div>

            {/* 🔥 EL BOTÓN QUE ABRE EL MINI MODAL 🔥 */}
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#000' }} 
              whileTap={{ scale: 0.95 }}
              onClick={abrirModalCompra}
              style={{ backgroundColor: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '10px', width: isMobile ? '36px' : '42px', height: isMobile ? '36px' : '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 10px rgba(30, 58, 138, 0.3)' }}
              aria-label="Compra rápida"
            >
              <ShoppingBag01Icon size={isMobile ? 18 : 20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.div>
      </Link>

      {/* 2. EL MINI MODAL DE COMPRA RÁPIDA (FUERA DEL LINK) */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center' }}>
            
            {/* Fondo oscuro (backdrop) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} 
            />

            {/* Contenedor del Modal */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              style={{ 
                position: 'relative', backgroundColor: '#fff', width: '100%', maxWidth: '400px', 
                borderRadius: isMobile ? '24px 24px 0 0' : '24px', padding: '24px', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 1,
                display: 'flex', flexDirection: 'column', gap: '20px'
              }}
            >
              {/* Header del modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <img src={modalColor} alt={producto.name} style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#f3f4f6' }} />
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: '900', textTransform: 'uppercase' }}>{producto.name}</h3>
                    <p style={{ margin: 0, color: '#2563eb', fontWeight: '900', fontSize: '1.2rem' }}>S/. {(producto.price * modalQty).toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', color: '#666' }}>
                  <Cancel01Icon size={24} />
                </button>
              </div>

{/* Selector de Color (Si aplica) */}
              {producto.colors && producto.colors.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: '900', marginBottom: '10px', color: '#64748b' }}>COLOR</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {producto.colors.map((color, idx) => (
                      <button 
                        key={idx} onClick={() => setModalColor(color.img)} 
                        style={{ 
                          width: '24px', height: '24px', borderRadius: '50%', backgroundColor: color.hex, 
                          border: modalColor === color.img ? '2px solid #2563eb' : '1px solid #cbd5e1', 
                          cursor: 'pointer', padding: 0, outline: modalColor === color.img ? '2px solid transparent' : 'none',
                          boxShadow: modalColor === color.img ? '0 0 0 2px #fff inset' : 'none'
                        }} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Selector de Tallas */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '900', marginBottom: '10px', color: '#64748b' }}>
                  TALLA {!modalSize && <span style={{ color: '#ef4444' }}>*</span>}
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {producto.sizes.map(size => (
                    <button 
                      key={size} onClick={() => setModalSize(size)}
                      style={{ 
                        padding: '8px 16px', border: modalSize === size ? '2px solid #000' : '1px solid #e2e8f0', 
                        backgroundColor: modalSize === size ? '#000' : '#fff', color: modalSize === size ? '#fff' : '#000', 
                        fontWeight: '800', cursor: 'pointer', borderRadius: '8px', flex: 1, minWidth: '60px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '900', marginBottom: '10px', color: '#64748b' }}>CANTIDAD</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => setModalQty(prev => prev > 1 ? prev - 1 : 1)} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }} disabled={modalQty === 1}>
                    <MinusSignIcon size={18} color={modalQty === 1 ? '#cbd5e1' : '#000'} />
                  </button>
                  <span style={{ fontSize: '1.2rem', fontWeight: '900', minWidth: '30px', textAlign: 'center' }}>{modalQty}</span>
                  <button onClick={() => setModalQty(prev => prev + 1)} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}>
                    <PlusSignIcon size={18} />
                  </button>
                </div>
              </div>

              {/* Botón Confirmar Compra Inteligente */}
              <motion.button 
                whileTap={modalSize && !isSuccess ? { scale: 0.95 } : {}}
                disabled={!modalSize || isSuccess} // Se deshabilita si no hay talla o si ya se está procesando
                onClick={(e) => {
                  if(!modalSize) return;
                  
                  // 1. Mostramos el estado de éxito
                  setIsSuccess(true);
                  
                  // Aquí puedes poner tu lógica de agregar al carrito real
                  console.log(`Comprando: ${modalQty}x ${producto.name} (${modalSize}) a S/. ${(producto.price * modalQty).toFixed(2)}`);
                  
                  // 2. Esperamos 1.5 segundos para que el usuario vea el mensaje y luego cerramos
                  setTimeout(() => {
                    setShowModal(false);
                    // Reseteamos el estado para la próxima vez que abra
                    setTimeout(() => setIsSuccess(false), 300); 
                  }, 1500);
                }}
                style={{ 
                  marginTop: '10px', 
                  // LÓGICA DE COLORES: Verde si tuvo éxito, Azul si está listo, Gris si falta la talla
                  backgroundColor: isSuccess ? '#16a34a' : (modalSize ? '#2563eb' : '#f1f5f9'), 
                  color: isSuccess ? '#fff' : (modalSize ? '#fff' : '#94a3b8'), 
                  border: 'none', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  fontWeight: '900', 
                  cursor: modalSize ? 'pointer' : 'not-allowed', 
                  fontSize: '0.95rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  boxShadow: modalSize && !isSuccess ? '0 10px 15px -3px rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                {/* LÓGICA DE TEXTO DEPENDIENDO DEL ESTADO */}
                {isSuccess 
                  ? "¡AÑADIDO CON ÉXITO! ✔️" 
                  : (modalSize 
                      ? `CONFIRMAR · S/. ${(producto.price * modalQty).toFixed(2)}` 
                      : "SELECCIONA UNA TALLA")}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
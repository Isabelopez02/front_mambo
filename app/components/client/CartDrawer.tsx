"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag01Icon, 
  Cancel01Icon, 
  Add01Icon, 
  Remove01Icon, 
  Delete02Icon 
} from "hugeicons-react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  img: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const cartTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const totalItemsCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 1000,
              backdropFilter: 'blur(2px)'
            }}
          />

          {/* RIGHT DRAWER PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '380px',
              backgroundColor: '#ffffff',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-6px 0 20px rgba(0,0,0,0.15)'
            }}
          >
            {/* CART HEADER */}
            <div style={{
              padding: '18px 20px',
              borderBottom: '1px solid #f3e2e8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fcf0f4'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag01Icon size={18} color="#9c3552" />
                <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1a0f14', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Tu Carrito ({totalItemsCount})
                </h3>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <Cancel01Icon size={18} color="#1a0f14" />
              </button>
            </div>

            {/* CART ITEMS LIST */}
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 10px', color: '#66585e' }}>
                  <ShoppingBag01Icon size={40} color="#e0d0d6" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>Tu carrito está vacío.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #f5eaee'
                      }}
                    >
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '0.78rem', fontWeight: '600', color: '#1a0f14', margin: '0 0 2px 0' }}>
                          {item.title}
                        </h4>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9c3552' }}>
                          S/. {item.price.toFixed(2)}
                        </span>

                        {/* QUANTITY CONTROLS */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '4px',
                              border: '1px solid #e0d0d6',
                              backgroundColor: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Remove01Icon size={10} color="#1a0f14" />
                          </button>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1a0f14' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '4px',
                              border: '1px solid #e0d0d6',
                              backgroundColor: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Add01Icon size={10} color="#1a0f14" />
                          </button>
                        </div>
                      </div>

                      {/* REMOVE BUTTON */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Eliminar"
                      >
                        <Delete02Icon size={16} color="#b91c1c" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CART FOOTER */}
            {items.length > 0 && (
              <div style={{
                padding: '16px 20px',
                borderTop: '1px solid #f3e2e8',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#66585e' }}>Total Estimado</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a0f14' }}>
                    S/. {cartTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a0f14',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }}
                >
                  PROCESAR COMPRA
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

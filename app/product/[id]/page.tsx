"use client";

import { useState, use } from "react";
import {
  ShoppingBag01Icon,
  TruckIcon,
  CustomerService01Icon,
  ArrowLeft01Icon,
  StarIcon,
  FireIcon,
  EyeIcon,
  HeartCheckIcon,
  MinusSignIcon,
  PlusSignIcon,
  ArrowRight01Icon
} from "hugeicons-react";
import Link from "next/link";
import { productosCatalogo } from "@/app/ts/Prendas";
import { UseValidationPantalla } from "@/app/hooks/UseValidationPantalla";

// 🔥 1. IMPORTAMOS TU COMPONENTE TARJETA 🔥
// (Asegúrate de que la ruta apunte a tu componente CardProducto)
import CardProducto from "@/app/component/cardProducto"; 

export default function ProductoDetalle({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [selectedSize, setSelectedSize] = useState("");
  const [fotoActual, setFotoActual] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const isMobile = UseValidationPantalla();

  const producto = productosCatalogo.find((item) => String(item.id) === String(resolvedParams.id));

  if (!producto) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase' }}>Prenda no encontrada</h1>
        <Link href="/" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Volver al barrio →</Link>
      </div>
    );
  }

  // Productos relacionados (misma categoría, excluyendo el actual)
  const productosRelacionados = productosCatalogo
    .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  // Productos similares (random, para el segundo carrusel)
  const productosSimilares = productosCatalogo
    .filter(p => p.id !== producto.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const imagenAMostrar = fotoActual || producto.img;

  const handleCantidadChange = (tipo: 'increment' | 'decrement') => {
    if (tipo === 'increment') {
      setCantidad(prev => prev + 1);
    } else {
      setCantidad(prev => prev > 1 ? prev - 1 : 1);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fff', paddingTop: '80px' }}>

      {/* Barra de navegación superior */}
      <div style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', marginBottom: '30px' }}>
        <Link href="/product" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000', fontWeight: '800', fontSize: '0.8rem' }}>
          <ArrowLeft01Icon size={20} /> VOLVER A LA TIENDA
        </Link>
        <Link href="/categoria" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#2563eb', fontWeight: '800', fontSize: '0.8rem' }}>
          SEGUIR ESCOGIENDO <ArrowRight01Icon size={20} />
        </Link>
      </div>

      {/* SECCIÓN PRINCIPAL DEL PRODUCTO (TU DISEÑO INTACTO) */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : '60px', padding: '0 5% 40px 5%' }}>
        
        {/* LADO IZQUIERDO: GALERÍA */}
        <div style={{ flex: 1 }}>
          <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#f3f4f6', position: 'relative' }}>
            {producto.badge && (
              <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: producto.badgeColor || '#000', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '900', zIndex: 10, letterSpacing: '1px' }}>
                {producto.badge}
              </div>
            )}
            <img src={imagenAMostrar} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }} alt={producto.name} />
          </div>

          {/* SELECTOR DE COLORES */}
          {producto.colors && producto.colors.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '15px' }}>COLORES DISPONIBLES</h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {producto.colors.map((color, idx) => {
                  const isSelected = imagenAMostrar === color.img;
                  return (
                    <button
                      key={idx} onClick={() => setFotoActual(color.img)}
                      style={{
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: color.hex,
                        border: isSelected ? '3px solid #2563eb' : '2px solid transparent',
                        cursor: 'pointer', padding: 0,
                        boxShadow: isSelected ? '0 0 0 2px #fff, 0 0 0 4px #2563eb' : '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease'
                      }}
                      aria-label={`Seleccionar color ${color.hex}`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* LADO DERECHO: INFO Y COMPRA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#2563eb', letterSpacing: '2px' }}>{producto.categoria.toUpperCase()}</span>
            <h1 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: '950', textTransform: 'uppercase', margin: '5px 0 15px 0', letterSpacing: '-2px', lineHeight: 0.9 }}>
              {producto.name}
            </h1>

            {/* Estadísticas */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '800' }}><StarIcon size={18} fill="#FFB800" color="#FFB800" /> {producto.rating}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '800', color: '#ef4444' }}><FireIcon size={18} /> {producto.compras} vendidos</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '800', color: '#666' }}><EyeIcon size={18} /> {producto.views} viendo esto</div>
            </div>

            {/* Precios */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <p style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', color: '#000', margin: 0 }}>S/. {(producto.price * cantidad).toFixed(2)}</p>
              {producto.oldPrice && <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: '700', color: '#94a3b8', textDecoration: 'line-through', margin: 0 }}>S/. {(producto.oldPrice * cantidad).toFixed(2)}</p>}
            </div>
          </div>

          {/* SELECTOR DE TALLAS */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '15px' }}>SELECCIONA TU TALLA {!selectedSize && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>*</span>}</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {producto.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} style={sizeBtnStyle(selectedSize === size)}>{size}</button>
              ))}
            </div>
          </div>

          {/* SELECTOR DE CANTIDAD */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '15px' }}>CANTIDAD</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => handleCantidadChange('decrement')} style={quantityBtnStyle} disabled={cantidad === 1}><MinusSignIcon size={20} /></button>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', minWidth: '40px', textAlign: 'center' }}>{cantidad}</span>
              <button onClick={() => handleCantidadChange('increment')} style={quantityBtnStyle}><PlusSignIcon size={20} /></button>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={() => {/* lógica */}} style={{ flex: 2, backgroundColor: '#000', color: '#fff', border: 'none', padding: '20px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem', display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', transition: 'all 0.2s', opacity: selectedSize ? 1 : 0.7 }}>
              <ShoppingBag01Icon /> AGREGAR ({cantidad})
            </button>
            <button onClick={() => setIsWishlist(!isWishlist)} style={{ flex: 1, backgroundColor: isWishlist ? '#fee2e2' : '#fff', color: isWishlist ? '#ef4444' : '#000', border: '2px solid', borderColor: isWishlist ? '#ef4444' : '#e5e7eb', padding: '20px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <HeartCheckIcon size={24} color={isWishlist ? '#ef4444' : '#000'} fill={isWishlist ? '#ef4444' : 'none'} />
            </button>
          </div>

          {/* BENEFICIOS */}
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '15px', borderTop: '1px solid #eee', paddingTop: '25px' }}>
            <div style={benefitStyle}><TruckIcon color="#2563eb" size={24} /><div><p style={benefitTitle}>ENVÍO GRATIS EXPRESS</p><p style={benefitSub}>Por compras mayores a S/. 200</p></div></div>
            <div style={benefitStyle}><CustomerService01Icon color="#2563eb" size={24} /><div><p style={benefitTitle}>ATENCIÓN PERSONALIZADA</p><p style={benefitSub}>Soporte vía WhatsApp 24/7</p></div></div>
          </div>

          {/* DESCRIPCIÓN */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '25px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '15px' }}>DETALLES DEL PRODUCTO</h4>
            <p style={{ color: '#666', lineHeight: 1.8, fontSize: '0.95rem', fontWeight: '500' }}>{producto.description || "Confeccionado con materiales premium para garantizar durabilidad y confort en tu día a día. El fit perfecto para dominar la calle."}</p>
          </div>
        </div>
      </div>

      {/* 🔥 2. SECCIÓN MÁS DE ESTA ONDA (GRID) REUTILIZANDO CARDPRODUCTO 🔥 */}
      {productosRelacionados.length > 0 && (
        <section style={{ padding: '10px 5%', backgroundColor: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>Prendas similares</h2>
            <Link href={`/categoria/${producto.categoria}`} style={{ color: '#2563eb', fontWeight: '800', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              VER TODOS <ArrowRight01Icon size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`, gap: isMobile ? '15px' : '30px' }}>
            {productosRelacionados.map((p, index) => (
              <CardProducto key={p.id} producto={p} index={index} isMobile={isMobile} />
            ))}
          </div>
        </section>
      )}

      {/* 🔥 3. SECCIÓN TAMBIÉN TE MOLAN ESTOS (CARRUSEL) REUTILIZANDO CARDPRODUCTO 🔥 */}
      {productosSimilares.length > 0 && (
        <section style={{ padding: '10px 5%' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>
            Cambia tu look
          </h2>
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
          <div className="hide-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: isMobile ? '15px' : '25px', padding: '10px 0 20px 0', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}>
            {productosSimilares.map((p, index) => (
              <div key={p.id} style={{ flexShrink: 0, width: isMobile ? '220px' : '280px', scrollSnapAlign: 'start' }}>
                <CardProducto producto={p} index={index} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// ESTILOS
const sizeBtnStyle = (active: boolean): any => ({ padding: '12px 25px', border: active ? '2px solid #000' : '1px solid #e5e7eb', backgroundColor: active ? '#000' : '#fff', color: active ? '#fff' : '#000', fontWeight: '800', cursor: 'pointer', transition: '0.2s', borderRadius: '8px', minWidth: '60px' });
const quantityBtnStyle = { width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' };
const benefitStyle = { display: 'flex', gap: '15px', alignItems: 'center' };
const benefitTitle = { margin: 0, fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase' as 'uppercase' };
const benefitSub = { margin: 0, fontSize: '0.7rem', color: '#666', fontWeight: '600' };
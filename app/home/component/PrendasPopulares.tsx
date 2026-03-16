"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag01Icon } from "hugeicons-react";

// Datos de ejemplo basados en tus imágenes
const prendasPopulares = [
  { id: 1, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 2, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 3, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 4, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
  { id: 5, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 6, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 7, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" },
  { id: 8, name: "NUEVA PRENDA DE ROPA", price: "S/. 15.00", img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
];

export function PrendasPopulares() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section style={{ padding: isMobile ? '40px 20px' : '80px 5%', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        
        {/* ENCABEZADO: Título y enlace "VER TODO" */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginBottom: isMobile ? '20px' : '40px',
            borderBottom: '1px solid #e5e7eb', // Línea sutil debajo del título como en la imagen
            paddingBottom: '15px'
        }}>
          <h2 style={{ 
              color: '#000', 
              fontSize: isMobile ? '1.5rem' : '2.2rem', 
              fontWeight: '900', 
              margin: 0, 
              letterSpacing: '-0.5px',
              textTransform: 'uppercase'
          }}>
            PRENDAS POPULARES
          </h2>
          
          <motion.a 
            href="/catalogo" // Cambia esto por tu ruta real
            whileHover={{ opacity: 0.7 }}
            style={{ 
              fontSize: isMobile ? '0.75rem' : '0.85rem', 
              fontWeight: '800', 
              color: '#000', 
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              borderBottom: '2px solid #000',
              paddingBottom: '2px'
            }}
          >
            VER TODO
          </motion.a>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div style={{ 
          display: 'grid', 
          // 2 columnas en celular, 4 en escritorio
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
          gap: isMobile ? '16px' : '30px' 
        }}>
          {prendasPopulares.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={!isMobile ? { y: -8 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            >
              {/* Imagen del producto */}
              <div style={{ 
                width: '100%', 
                aspectRatio: '3/4', // Proporción ideal para ropa
                borderRadius: '16px', 
                overflow: 'hidden', 
                backgroundColor: '#f3f4f6',
                marginBottom: '12px'
              }}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Información y botón (Flexbox space-between) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Nombre del producto */}
                  <h4 style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: isMobile ? '0.65rem' : '0.75rem', 
                    fontWeight: '800', 
                    color: '#000',
                    textTransform: 'uppercase' 
                  }}>
                    {item.name}
                  </h4>
                  {/* Precio en Azul */}
                  <p style={{ 
                    margin: 0, 
                    color: '#2563eb', // Azul vibrante del diseño
                    fontWeight: '800', 
                    fontSize: isMobile ? '0.8rem' : '0.9rem' 
                  }}>
                    {item.price}
                  </p>
                </div>

                {/* Botón de Agregar al carrito (Cuadrado azul oscuro) */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que al hacer clic en el botón se abra la página del producto
                    console.log(`Agregado al carrito: ${item.id}`);
                  }}
                  style={{
                    backgroundColor: '#1e3a8a', // Azul oscuro casi negro
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
          ))}
        </div>

      </div>
    </section>
  );
}
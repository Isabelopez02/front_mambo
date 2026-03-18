"use client";
import {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  ArrowRight01Icon, ArrowLeft01Icon, Female02Icon, ManIcon } from "hugeicons-react";
import CardProducto from "../component/cardProducto";
import { UseValidationPantalla } from "../hooks/UseValidationPantalla";
import { useBarridoCarrucel } from "../hooks/UseBarridoCarrucel";

// Productos para hombre
const hombreItems = [
  { id: 1, name: "Mambo Classic Hombre", price: 29.99, img: "https://i.pinimg.com/736x/1f/35/8f/1f358fc40b87d712c8c89f838fb73f43.jpg", sizes: ["S", "M", "L"],
    badge: "HOMBRE",
    badgeColor: "#2563eb"},
  { id: 2, name: "Neo Cargo Hombre", price: 89.99, img: "https://i.pinimg.com/1200x/3c/34/c0/3c34c0916813a9e9a932e39044ec29b3.jpg", sizes: ["S", "M", "L"],
    badge: "HOMBRE",
    badgeColor: "#2563eb" },
  { id: 3, name: "Cyber Hoodie Hombre", price: 55.00,img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg", sizes: ["S", "M", "L"],
    badge: "HOMBRE",
    badgeColor: "#2563eb" },
  { id: 4, name: "Alpha Sneakers Hombre", price: 120.00, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg", sizes: ["S", "M", "L"],
    badge: "HOMBRE",
    badgeColor: "#2563eb" },
  { id: 5, name: "Urban Wind Hombre", price: 75.00, img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg", sizes: ["S", "M", "L"],
    badge: "HOMBRE",
    badgeColor: "#2563eb" },
  { id: 6, name: "Oversize Hombre", price: 175.00, img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg", sizes: ["S", "M", "L"],
    badge: "HOMBRE",
    badgeColor: "#2563eb" },
];

// Productos para mujer
const mujerItems = [
  { id: 7, name: "Mambo Classic Mujer", price: 29.99, img: "https://i.pinimg.com/736x/58/9e/47/589e4703e15ce9ad9619c222aab5101d.jpg", sizes: ["S", "M", "L"],
    badge: "MUJER",
    badgeColor: "#ec4899"},
  { id: 8, name: "Neo Cargo Mujer", price: 89.99, img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg", sizes: ["S", "M", "L"],
    badge: "MUJER",
    badgeColor: "#ec4899" },
  { id: 9, name: "Cyber Hoodie Mujer", price: 55.00,img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg", sizes: ["S", "M", "L"],
    badge: "MUJER",
    badgeColor: "#ec4899" },
  { id: 10, name: "Alpha Sneakers Mujer", price: 120.00, img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg", sizes: ["S", "M", "L"],
    badge: "MUJER",
    badgeColor: "#ec4899" },
  { id: 11, name: "Urban Wind Mujer", price: 75.00, img: "https://i.pinimg.com/736x/1f/35/8f/1f358fc40b87d712c8c89f838fb73f43.jpg", sizes: ["S", "M", "L"],
    badge: "MUJER",
    badgeColor: "#ec4899" },
  { id: 12, name: "Oversize Mujer", price: 175.00, img: "https://i.pinimg.com/1200x/3c/34/c0/3c34c0916813a9e9a932e39044ec29b3.jpg", sizes: ["S", "M", "L"],
    badge: "MUJER",
    badgeColor: "#ec4899" },
];


export function SectionVendidos() {
  const isMobile = UseValidationPantalla();
  
  // 2. Mantenemos la lógica de filtros localmente porque es súper sencilla
  const [filtroActivo, setFiltroActivo] = useState<"todos" | "hombre" | "mujer">("todos");
  
  const productosFiltrados = filtroActivo === "todos" 
    ? [...hombreItems, ...mujerItems] 
    : filtroActivo === "hombre" 
      ? hombreItems 
      : mujerItems;

  // 3. INVOCAMOS TU HOOK DE BARRIDO REBOBINADO
  // Le pasamos la cantidad de productos actual para que sepa hasta dónde hacer el barrido
  const { 
    sectionRef, index, estaBarriendo, showArrows, stepSize, next, prev 
  } = useBarridoCarrucel(productosFiltrados.length, isMobile);

  const opcionesFiltro = [
    { id: "todos", label: "Todos", icon: null, color: "#000" },
    { id: "hombre", label: "Hombre", icon: ManIcon, color: "#2563eb" },
    { id: "mujer", label: "Mujer", icon: Female02Icon, color: "#ec4899" }
  ];

  return (
    <section 
      ref={sectionRef} // Vinculamos la sección a tu hook
      style={{ padding: isMobile ? '30px 0' : '50px 0', backgroundColor: '#fff', borderTop: '1px solid #f0f0f0', overflow: 'hidden' }}
    >
      {/* HEADER Y FILTROS */}
      <div style={{ padding: '0 5%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '30px', gap: isMobile ? '15px' : '0' }}>
        <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>
          Más Vendidos
        </h2>
        
        {/* BOTONES DE FILTRO */}
        <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f5f5f5', padding: '4px', borderRadius: '40px' }}>
          {opcionesFiltro.map((opcion) => {
            const isActive = filtroActivo === opcion.id;
            const Icono = opcion.icon;
            return (
              <button
                key={opcion.id}
                onClick={() => setFiltroActivo(opcion.id as any)}
                style={{ ...filtroBtnStyle, backgroundColor: isActive ? opcion.color : 'transparent', color: isActive ? '#fff' : '#666', padding: isMobile ? '8px 16px' : '10px 24px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {Icono && <Icono size={isMobile ? 16 : 18} />}
                <span>{opcion.label}</span>
              </button>
            );
          })}
        </div>

        {/* NAVEGACIÓN DESKTOP USANDO TU HOOK */}
        {!isMobile && (
          <AnimatePresence>
            {showArrows && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '10px' }}>
                <button onClick={prev} style={btnNavStyle} disabled={estaBarriendo}><ArrowLeft01Icon size={18} /></button>
                <button onClick={next} style={btnNavStyle} disabled={estaBarriendo}><ArrowRight01Icon size={18} /></button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* 4. EL CARRUSEL ANIMADO CON TU HOOK */}
      <div style={{ overflow: 'hidden', width: '100%', padding: '0 5%' }}>
        <motion.div 
          // AQUÍ SE APLICA EL MOVIMIENTO DEL HOOK
          animate={{ x: -(index * stepSize) }} 
          transition={{ type: "spring", stiffness: estaBarriendo ? 60 : 120, damping: 20 }}
          style={{ display: 'flex', gap: isMobile ? '15px' : '30px' }}
        >
          {productosFiltrados.map((producto, i) => (
            <motion.div 
              key={`${producto.id}-${i}-${filtroActivo}`} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{ 
                minWidth: isMobile ? '220px' : '280px', 
                // Un pequeño efecto borroso mientras hace el barrido rápido
                filter: estaBarriendo ? 'blur(2px)' : 'none', 
                transition: 'filter 0.3s' 
              }}
            >
              <CardProducto producto={producto} index={i} isMobile={isMobile} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* NAVEGACIÓN MÓVIL USANDO TU HOOK */}
      {isMobile && (
        <AnimatePresence>
          {showArrows && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
              <button onClick={prev} style={mobileNavStyle} disabled={estaBarriendo}><ArrowLeft01Icon size={20} /></button>
              <button onClick={next} style={mobileNavStyle} disabled={estaBarriendo}><ArrowRight01Icon size={20} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}

// Estilos
const btnNavStyle = { width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', ':disabled': { opacity: 0.3, cursor: 'not-allowed' }, ':hover': { backgroundColor: '#000', color: '#fff', borderColor: '#000' } };
const mobileNavStyle = { width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', ':disabled': { opacity: 0.3 } };
const filtroBtnStyle = { border: 'none', borderRadius: '30px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' as const, letterSpacing: '0.5px' };
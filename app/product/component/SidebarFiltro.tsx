"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FilterIcon, 
  Cancel01Icon, 
  ArrowDown01Icon, 
  ArrowUp01Icon 
} from "hugeicons-react";

const CATEGORIAS = ["T-Shirts", "Hoodies", "Cargos", "Sneakers", "Accesorios", "Gorras"];
const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"];

export function SidebarFiltros() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false); // Para abrir/cerrar en celular

  // Estados de los filtros
  const [catSeleccionadas, setCatSeleccionadas] = useState<string[]>([]);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string[]>([]);
  const [precio, setPrecio] = useState({ min: "", max: "" });
  const [estados, setEstados] = useState({ nuevo: false, popular: false, descuento: false });

  // Secciones colapsables
  const [secciones, setSecciones] = useState({ categorias: true, tallas: true, precio: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Funciones para manejar selecciones
  const toggleCategoria = (cat: string) => {
    setCatSeleccionadas(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleTalla = (talla: string) => {
    setTallaSeleccionada(prev => 
      prev.includes(talla) ? prev.filter(t => t !== talla) : [...prev, talla]
    );
  };

  const toggleSeccion = (seccion: 'categorias' | 'tallas' | 'precio') => {
    setSecciones(prev => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  // Contenido interno de los filtros (para reutilizar en PC y Móvil)
  const FiltrosContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* 4. PRECIO */}
      <div>
        <div style={headerSeccionStyle} onClick={() => toggleSeccion('precio')}>
          <h3 style={tituloSeccionStyle}>Precio</h3>
          {secciones.precio ? <ArrowUp01Icon size={20} /> : <ArrowDown01Icon size={20} />}
        </div>
        <AnimatePresence>
          {secciones.precio && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <div style={inputContainerStyle}>
                  <span style={{ color: '#9ca3af', fontWeight: '700', fontSize: '0.8rem' }}>S/.</span>
                  <input type="number" placeholder="Min" value={precio.min} onChange={e => setPrecio({...precio, min: e.target.value})} style={inputPrecioStyle} />
                </div>
                <span style={{ color: '#9ca3af', fontWeight: '900' }}>-</span>
                <div style={inputContainerStyle}>
                  <span style={{ color: '#9ca3af', fontWeight: '700', fontSize: '0.8rem' }}>S/.</span>
                  <input type="number" placeholder="Max" value={precio.max} onChange={e => setPrecio({...precio, max: e.target.value})} style={inputPrecioStyle} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* 1. ESTADOS ESPECIALES (Switches/Checkboxes) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={tituloSeccionStyle}>Destacados</h3>
        <label style={checkboxContainerStyle}>
          <input type="checkbox" checked={estados.nuevo} onChange={(e) => setEstados({...estados, nuevo: e.target.checked})} style={checkboxStyle} />
          Nuevos Ingresos
        </label>
        <label style={checkboxContainerStyle}>
          <input type="checkbox" checked={estados.popular} onChange={(e) => setEstados({...estados, popular: e.target.checked})} style={checkboxStyle} />
          Más Populares
        </label>
        <label style={checkboxContainerStyle}>
          <input type="checkbox" checked={estados.descuento} onChange={(e) => setEstados({...estados, descuento: e.target.checked})} style={checkboxStyle} />
          Con Descuento <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '800' }}>%</span>
        </label>
      </div>

      <hr style={lineaStyle} />

      {/* 2. CATEGORÍAS */}
      <div>
        <div style={headerSeccionStyle} onClick={() => toggleSeccion('categorias')}>
          <h3 style={tituloSeccionStyle}>Categoría</h3>
          {secciones.categorias ? <ArrowUp01Icon size={20} /> : <ArrowDown01Icon size={20} />}
        </div>
        <AnimatePresence>
          {secciones.categorias && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
                {CATEGORIAS.map(cat => (
                  <label key={cat} style={checkboxContainerStyle}>
                    <input type="checkbox" checked={catSeleccionadas.includes(cat)} onChange={() => toggleCategoria(cat)} style={checkboxStyle} />
                    {cat}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr style={lineaStyle} />

      {/* 3. TALLAS (Grid de botones) */}
      <div>
        <div style={headerSeccionStyle} onClick={() => toggleSeccion('tallas')}>
          <h3 style={tituloSeccionStyle}>Talla</h3>
          {secciones.tallas ? <ArrowUp01Icon size={20} /> : <ArrowDown01Icon size={20} />}
        </div>
        <AnimatePresence>
          {secciones.tallas && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '15px' }}>
                {TALLAS.map(talla => {
                  const isSelected = tallaSeleccionada.includes(talla);
                  return (
                    <button
                      key={talla}
                      onClick={() => toggleTalla(talla)}
                      style={{
                        padding: '10px 0',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #000' : '1px solid #e5e7eb',
                        backgroundColor: isSelected ? '#000' : '#fff',
                        color: isSelected ? '#fff' : '#000',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {talla}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr style={lineaStyle} />


      {/* Botón Aplicar (Principalmente útil en móvil) */}
      <button style={{ width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '0.9rem', marginTop: '20px', cursor: 'pointer' }} onClick={() => setIsOpenMobile(false)}>
        APLICAR FILTROS
      </button>

    </div>
  );

  return (
    <>
      {/* VERSIÓN ESCRITORIO (Sidebar fija a la izquierda) */}
      {!isMobile && (
        <aside style={{ 
          width: '280px', 
          flexShrink: 0, 
          position: 'sticky', 
          top: '90px', // Asumiendo que tu navbar mide 70px + 20px de espacio
          height: 'fit-content',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          paddingRight: '20px'
        }}>
          {/* Ocultamos el scrollbar de la barra lateral para que se vea limpio */}
          <style>{`aside::-webkit-scrollbar { display: none; } aside { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <FilterIcon size={24} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>FILTROS</h2>
          </div>
          
          <FiltrosContent />
        </aside>
      )}

      {/* VERSIÓN MÓVIL (Botón flotante + Menú deslizable) */}
      {isMobile && (
        <>
          {/* Botón que abre los filtros en celular */}
          <button 
            onClick={() => setIsOpenMobile(true)}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
              width: '100%', padding: '14px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px', 
              fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '20px'
            }}
          >
            <FilterIcon size={20} />
            FILTRAR PRODUCTOS
          </button>

          {/* Menú Deslizable (Modal) */}
          <AnimatePresence>
            {isOpenMobile && (
              <>
                {/* Fondo Oscuro Blur */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsOpenMobile(false)}
                  style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999 }}
                />
                
                {/* Panel de Filtros */}
                <motion.div 
                  initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '85%', maxWidth: '350px', backgroundColor: '#fff', zIndex: 1000, overflowY: 'auto', padding: '24px', boxShadow: '-10px 0 25px rgba(0,0,0,0.1)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>FILTROS</h2>
                    <button onClick={() => setIsOpenMobile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                      <Cancel01Icon size={28} />
                    </button>
                  </div>
                  
                  <FiltrosContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

// --- ESTILOS REUTILIZABLES ---
const tituloSeccionStyle = { fontSize: '1.05rem', fontWeight: '800', margin: 0, textTransform: 'uppercase' as 'uppercase', color: '#0f172a' };
const headerSeccionStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' };
const lineaStyle = { border: 'none', borderTop: '1px solid #e5e7eb', margin: '0' };

const checkboxContainerStyle = { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600', color: '#4b5563', cursor: 'pointer' };
const checkboxStyle = { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#000' };

const inputContainerStyle = { display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 15px', flex: 1 };
const inputPrecioStyle = { border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: '600', background: 'transparent' };
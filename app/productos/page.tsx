"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { StarIcon, Search01Icon, FilterIcon, ArrowRight01Icon } from "hugeicons-react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  img: string;
  isNew?: boolean;
}

const allProductsData: Product[] = [
  { id: 1, title: "Cartera Chic Luxe", price: 59.00, category: "CARTERAS", rating: 5, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 2, title: "Bolso Shoulder Nude", price: 49.00, category: "CARTERAS", rating: 4, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Kit Maquillaje Glow", price: 35.00, category: "MAQUILLAJE", rating: 5, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 4, title: "Serum Hidratante Skincare", price: 29.90, category: "SKINCARE", rating: 4, img: "https://images.unsplash.com/photo-1608248597261-833257647000?q=80&w=600&auto=format&fit=crop" },
  { id: 5, title: "Mini Backpack Velvet", price: 62.00, category: "CARTERAS", rating: 5, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Paleta Sombras Rose", price: 39.90, category: "MAQUILLAJE", rating: 4, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop" },
  { id: 7, title: "Jarrón Cerámica Deco", price: 42.00, category: "HOGAR", rating: 5, img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 8, title: "Reloj Minimal Gold", price: 75.00, category: "ACCESORIOS", rating: 5, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" },
  { id: 9, title: "Brochas de Maquillaje Set", price: 32.00, category: "MAQUILLAJE", rating: 4, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" },
  { id: 10, title: "Lámpara Nórdica Deco", price: 89.00, category: "HOGAR", rating: 5, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop" },
  { id: 11, title: "Collar Dorado Pearl", price: 28.00, category: "JOYERÍA", rating: 4, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop" },
  { id: 12, title: "Tacones Stiletto Nude", price: 95.00, category: "CALZADO", rating: 5, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop", isNew: true }
];

const categoriesList = ["TODOS", "CARTERAS", "MAQUILLAJE", "SKINCARE", "HOGAR", "ACCESORIOS", "JOYERÍA", "CALZADO"];

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);

  // Ratings interactivos dinámicos por ID
  const [ratingsMap, setRatingsMap] = useState<{ [key: number]: number }>({});
  const [hoverRatingsMap, setHoverRatingsMap] = useState<{ [key: number]: number }>({});

  const filteredProducts = useMemo(() => {
    return allProductsData.filter((item) => {
      const matchesCategory = selectedCategory === "TODOS" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price <= maxPrice;
      const currentRating = ratingsMap[item.id] !== undefined ? ratingsMap[item.id] : item.rating;
      const matchesRating = minRating === 0 || currentRating >= minRating;
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [selectedCategory, searchQuery, maxPrice, minRating, ratingsMap]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* HEADER SECTION */}
      <div className="text-center pt-10 pb-6 px-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#9c3552] font-semibold mb-2">
          EXPLORA NUESTRO CATÁLOGO
        </p>
        <h1 
          className="text-3xl md:text-4xl text-[#1a0f14]"
          style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', Georgia, serif" }}
        >
          Todos los Productos
        </h1>
      </div>

      {/* CATEGORIES NAVIGATION BAR (MAIN CONTENT HEADER) */}
      <div style={{ 
        borderTop: '1px solid #f5eaee', 
        borderBottom: '1px solid #f5eaee', 
        backgroundColor: '#faf7f8',
        padding: '14px 4%'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          overflowX: 'auto', 
          justifyContent: 'flex-start',
          scrollbarWidth: 'none'
        }}>
          {categoriesList.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  border: active ? 'none' : '1px solid #e0d0d6',
                  backgroundColor: active ? '#1a0f14' : '#ffffff',
                  color: active ? '#ffffff' : '#55494e',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 4px 10px rgba(0,0,0,0.12)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTAINER (FILTERS + PRODUCT GRID) */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 4%', display: 'flex', gap: '32px', flexDirection: 'row' }} className="flex-col md:flex-row">
        
        {/* LEFT SIDEBAR FILTERS */}
        <aside style={{ width: '100%', maxWidth: '280px', flexShrink: 0 }}>
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '16px', 
            padding: '20px', 
            border: '1px solid #f3e2e8',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #f5eaee', paddingBottom: '12px' }}>
              <FilterIcon size={16} color="#9c3552" />
              <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a0f14', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
                Filtros
              </h3>
            </div>

            {/* SEARCH INPUT */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', color: '#9c3552', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Buscador
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Buscar producto..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 34px 8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0d0d6',
                    fontSize: '0.78rem',
                    outline: 'none'
                  }}
                />
                <Search01Icon size={16} color="#9c3552" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* PRICE RANGE FILTER */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#9c3552', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Precio Máximo
                </label>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1a0f14' }}>
                  S/. {maxPrice}
                </span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#9c3552', cursor: 'pointer' }}
              />
            </div>

            {/* MINIMUM RATING FILTER */}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '700', color: '#9c3552', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Calificación Mínima
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[0, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      border: minRating === r ? 'none' : '1px solid #e0d0d6',
                      backgroundColor: minRating === r ? '#9c3552' : '#ffffff',
                      color: minRating === r ? '#ffffff' : '#1a0f14',
                      cursor: 'pointer'
                    }}
                  >
                    {r === 0 ? "Todas" : `${r}★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* PRODUCTS GRID AREA */}
        <main style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#55494e' }}>
              Mostrando <strong style={{ color: '#1a0f14' }}>{filteredProducts.length}</strong> productos
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#faf7f8', borderRadius: '16px' }}>
              <p style={{ fontSize: '0.9rem', color: '#55494e' }}>No se encontraron productos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
              gap: '16px' 
            }}>
              {filteredProducts.map((item) => {
                const currentRating = ratingsMap[item.id] !== undefined ? ratingsMap[item.id] : item.rating;
                const hoverRating = hoverRatingsMap[item.id] || 0;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #f3e2e8',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* IMAGE CONTAINER */}
                    <div style={{ width: '100%', height: '160px', backgroundColor: '#e2e2e2', position: 'relative', overflow: 'hidden' }}>
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      {item.isNew && (
                        <span style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          backgroundColor: '#9c3552',
                          color: '#ffffff',
                          fontSize: '0.55rem',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          NUEVO
                        </span>
                      )}
                    </div>

                    {/* CARD CONTENT */}
                    <div style={{
                      backgroundColor: '#fcf0f4',
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      flexGrow: 1,
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.58rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.5px' }}>
                          {item.category}
                        </span>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a0f14', margin: '1px 0 3px 0' }}>
                          {item.title}
                        </h4>

                        {/* INTERACTIVE STARS */}
                        <div 
                          style={{ display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
                          onMouseLeave={() => setHoverRatingsMap(prev => ({ ...prev, [item.id]: 0 }))}
                        >
                          {[1, 2, 3, 4, 5].map((starIndex) => (
                            <span
                              key={starIndex}
                              onMouseEnter={() => setHoverRatingsMap(prev => ({ ...prev, [item.id]: starIndex }))}
                              onClick={() => setRatingsMap(prev => ({ ...prev, [item.id]: starIndex }))}
                              style={{ display: 'inline-flex' }}
                            >
                              <StarIcon 
                                size={12} 
                                color="#e0527f" 
                                fill={starIndex <= (hoverRating || currentRating) ? "#e0527f" : "none"} 
                              />
                            </span>
                          ))}
                        </div>

                        {/* PRICE */}
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1a0f14', marginTop: '2px' }}>
                          S/. {item.price.toFixed(2)}
                        </div>
                      </div>

                      {/* ADD TO CART BUTTON */}
                      <button 
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #f3c2d4',
                          borderRadius: '4px',
                          color: '#e0527f',
                          fontSize: '0.62rem',
                          fontWeight: '600',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          marginTop: '6px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e0527f';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          e.currentTarget.style.color = '#e0527f';
                        }}
                      >
                        AGREGAR CARRITO
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}

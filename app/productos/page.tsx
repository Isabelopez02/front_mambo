"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  StarIcon, 
  Search01Icon, 
  FilterIcon, 
  Cancel01Icon, 
  ShoppingBag01Icon,
  CheckmarkBadge01Icon
} from "hugeicons-react";
import { CartDrawer, CartItem } from "../client/component/CartDrawer";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  img: string;
  isNew?: boolean;
  isPromo?: boolean;
}

const allProductsData: Product[] = [
  { id: 1, title: "Cartera Chic Luxe", price: 59.00, category: "CARTERAS", rating: 5, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 2, title: "Bolso Shoulder Nude", price: 49.00, category: "CARTERAS", rating: 4, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop", isPromo: true },
  { id: 3, title: "Kit Maquillaje Glow", price: 35.00, category: "MAQUILLAJE", rating: 5, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 4, title: "Serum Hidratante Skincare", price: 29.90, category: "SKINCARE", rating: 4, img: "https://images.unsplash.com/photo-1608248597261-833257647000?q=80&w=600&auto=format&fit=crop", isPromo: true },
  { id: 5, title: "Mini Backpack Velvet", price: 62.00, category: "CARTERAS", rating: 5, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Paleta Sombras Rose", price: 39.90, category: "MAQUILLAJE", rating: 4, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop", isPromo: true },
  { id: 7, title: "Jarrón Cerámica Deco", price: 42.00, category: "HOGAR", rating: 5, img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 8, title: "Reloj Minimal Gold", price: 75.00, category: "ACCESORIOS", rating: 5, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" },
  { id: 9, title: "Brochas de Maquillaje Set", price: 32.00, category: "MAQUILLAJE", rating: 4, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" },
  { id: 10, title: "Lámpara Nórdica Deco", price: 89.00, category: "HOGAR", rating: 5, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop" },
  { id: 11, title: "Collar Dorado Pearl", price: 28.00, category: "JOYERÍA", rating: 4, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop", isNew: true },
  { id: 12, title: "Tacones Stiletto Nude", price: 95.00, category: "CALZADO", rating: 5, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop", isPromo: true }
];

const categoriesList = ["TODOS", "CARTERAS", "MAQUILLAJE", "SKINCARE", "HOGAR", "ACCESORIOS", "JOYERÍA", "CALZADO"];

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  
  // Filtros especiales
  const [filterNewOnly, setFilterNewOnly] = useState<boolean>(false);
  const [filterPromoOnly, setFilterPromoOnly] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filtro mobile drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Ratings interactivos dinámicos por ID
  const [ratingsMap, setRatingsMap] = useState<{ [key: number]: number }>({});
  const [hoverRatingsMap, setHoverRatingsMap] = useState<{ [key: number]: number }>({});

  // CARRITO STATE & SIDEBAR
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return allProductsData.filter((item) => {
      const matchesCategory = selectedCategory === "TODOS" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price <= maxPrice;
      const currentRating = ratingsMap[item.id] !== undefined ? ratingsMap[item.id] : item.rating;
      const matchesRating = minRating === 0 || currentRating >= minRating;
      const matchesNew = !filterNewOnly || item.isNew;
      const matchesPromo = !filterPromoOnly || item.isPromo;

      return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesNew && matchesPromo;
    });
  }, [selectedCategory, searchQuery, maxPrice, minRating, filterNewOnly, filterPromoOnly, ratingsMap]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>
      
      {/* HEADER SECTION MATCHING HOME PAGE PATTERN */}
      <div style={{ 
        textAlign: 'center', 
        paddingTop: '36px', 
        paddingBottom: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <p style={{ 
          fontSize: '0.68rem', 
          letterSpacing: '0.3em', 
          textTransform: 'uppercase', 
          color: '#9c3552', 
          fontWeight: '500', 
          marginBottom: '8px',
          margin: '0 0 8px 0',
          textAlign: 'center'
        }}>
          EXPLORA NUESTRA COLECCIÓN
        </p>
        <h1 style={{ 
          fontSize: '2.2rem', 
          color: '#1a0f14', 
          fontFamily: "'DM Serif Display', var(--font-dm-serif), Georgia, serif",
          fontWeight: '400',
          lineHeight: '1.2',
          margin: 0,
          textAlign: 'center'
        }}>
          Todos los Productos
        </h1>
      </div>

      {/* CATEGORIES NAVIGATION BAR (MAIN CONTENT HEADER) */}
      <div style={{ 
        borderTop: '1px solid #f5eaee', 
        borderBottom: '1px solid #f5eaee', 
        backgroundColor: '#faf7f8',
        padding: '12px 4%'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          overflowX: 'auto', 
          justifyContent: 'flex-start',
          maxWidth: '1280px',
          margin: '0 auto',
          scrollbarWidth: 'none'
        }}>
          {categoriesList.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '0.68rem',
                  fontWeight: '600',
                  letterSpacing: '0.8px',
                  border: active ? 'none' : '1px solid #e2d5da',
                  backgroundColor: active ? '#1a0f14' : '#ffffff',
                  color: active ? '#ffffff' : '#44383d',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTAINER (FILTERS + PRODUCT GRID) */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 4%', display: 'flex', gap: '32px' }}>
        
        {/* DESKTOP LEFT SIDEBAR FILTERS (ONLY DISPLAYED ON DESKTOP) */}
        {!isMobile && (
          <aside style={{ width: '260px', flexShrink: 0 }}>
            <FilterSidebarContent 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              filterNewOnly={filterNewOnly}
              setFilterNewOnly={setFilterNewOnly}
              filterPromoOnly={filterPromoOnly}
              setFilterPromoOnly={setFilterPromoOnly}
            />
          </aside>
        )}

        {/* PRODUCTS GRID AREA */}
        <main style={{ flexGrow: 1, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#66585e' }}>
              Mostrando <strong style={{ color: '#1a0f14' }}>{filteredProducts.length}</strong> productos
            </span>

            {/* CART TRIGGER BUTTON IF ITEMS IN CART */}
            {cartItems.length > 0 && (
              <button 
                onClick={() => setCartDrawerOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#9c3552',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <ShoppingBag01Icon size={14} color="#fff" /> Ver Carrito ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#faf7f8', borderRadius: '16px', border: '1px dashed #e5d8dd' }}>
              <p style={{ fontSize: '0.88rem', color: '#66585e', margin: 0 }}>No se encontraron productos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', 
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
                    <div style={{ width: '100%', height: '165px', backgroundColor: '#f5f5f5', position: 'relative', overflow: 'hidden' }}>
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
                          fontSize: '0.52rem',
                          fontWeight: '700',
                          padding: '3px 7px',
                          borderRadius: '4px',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}>
                          NUEVO
                        </span>
                      )}
                      {item.isPromo && (
                        <span style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#1a0f14',
                          color: '#ffffff',
                          fontSize: '0.52rem',
                          fontWeight: '700',
                          padding: '3px 7px',
                          borderRadius: '4px',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}>
                          PROMO
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
                        <span style={{ fontSize: '0.56rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                          {item.category}
                        </span>
                        <h4 style={{ fontSize: '0.78rem', fontWeight: '600', color: '#1a0f14', margin: '2px 0 4px 0', lineHeight: '1.25' }}>
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
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1a0f14', marginTop: '4px' }}>
                          S/. {item.price.toFixed(2)}
                        </div>
                      </div>

                      {/* ADD TO CART BUTTON */}
                      <button 
                        onClick={() => addToCart(item)}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #f3c2d4',
                          borderRadius: '4px',
                          color: '#e0527f',
                          fontSize: '0.62rem',
                          fontWeight: '700',
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

      {/* FLOATING FILTER BUTTON STRICTLY FOR MOBILE (BOTTOM RIGHT CORNER) */}
      {isMobile && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 90 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileFilterOpen(true)}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#1a0f14',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
              cursor: 'pointer'
            }}
          >
            <FilterIcon size={20} color="#ffffff" />
          </motion.button>
        </div>
      )}

      {/* MOBILE FILTER MODAL DRAWER */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 998,
                backdropFilter: 'blur(2px)'
              }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '85vh',
                backgroundColor: '#ffffff',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '24px 20px',
                zIndex: 999,
                overflowY: 'auto',
                boxShadow: '0 -10px 25px rgba(0,0,0,0.15)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f5eaee', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1a0f14', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Filtros de Búsqueda
                </h3>
                <button onClick={() => setMobileFilterOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Cancel01Icon size={20} color="#1a0f14" />
                </button>
              </div>

              <FilterSidebarContent 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                filterNewOnly={filterNewOnly}
                setFilterNewOnly={setFilterNewOnly}
                filterPromoOnly={filterPromoOnly}
                setFilterPromoOnly={setFilterPromoOnly}
              />

              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1a0f14',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginTop: '20px',
                  cursor: 'pointer'
                }}
              >
                Ver Resultados ({filteredProducts.length})
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SHOPPING CART RIGHT SIDEBAR MODULAR COMPONENT */}
      <CartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

    </div>
  );
}

{/* REUSABLE FILTER CONTENT WITH FIXED SEARCH INPUT SIZE */}
function FilterSidebarContent({
  searchQuery,
  setSearchQuery,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  filterNewOnly,
  setFilterNewOnly,
  filterPromoOnly,
  setFilterPromoOnly
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  filterNewOnly: boolean;
  setFilterNewOnly: (v: boolean) => void;
  filterPromoOnly: boolean;
  setFilterPromoOnly: (v: boolean) => void;
}) {
  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      borderRadius: '16px', 
      padding: '18px', 
      border: '1px solid #f3e2e8',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #f5eaee', paddingBottom: '10px' }}>
        <FilterIcon size={15} color="#9c3552" />
        <h3 style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1a0f14', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>
          Filtros
        </h3>
      </div>

      {/* SEARCH INPUT ADJUSTED TO PREVENT OVERFLOW */}
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' }}>
          Buscador
        </label>
        <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '8px 34px 8px 12px',
              borderRadius: '6px',
              border: '1px solid #e0d0d6',
              fontSize: '0.75rem',
              outline: 'none',
              backgroundColor: '#faf7f8'
            }}
          />
          <Search01Icon size={14} color="#9c3552" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* PROMO / NEW TOGGLES */}
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '2px' }}>
          Etiquetas Especiales
        </label>
        <button
          onClick={() => setFilterNewOnly(!filterNewOnly)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '7px 12px',
            borderRadius: '6px',
            border: '1px solid #e0d0d6',
            backgroundColor: filterNewOnly ? '#fcf0f4' : '#ffffff',
            color: '#1a0f14',
            fontSize: '0.72rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <span>Solo Nuevos Ingresos</span>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            border: '1px solid #9c3552',
            backgroundColor: filterNewOnly ? '#9c3552' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {filterNewOnly && <CheckmarkBadge01Icon size={10} color="#fff" />}
          </div>
        </button>

        <button
          onClick={() => setFilterPromoOnly(!filterPromoOnly)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '7px 12px',
            borderRadius: '6px',
            border: '1px solid #e0d0d6',
            backgroundColor: filterPromoOnly ? '#fcf0f4' : '#ffffff',
            color: '#1a0f14',
            fontSize: '0.72rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <span>Solo Promociones</span>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            border: '1px solid #9c3552',
            backgroundColor: filterPromoOnly ? '#9c3552' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {filterPromoOnly && <CheckmarkBadge01Icon size={10} color="#fff" />}
          </div>
        </button>
      </div>

      {/* PRICE RANGE FILTER */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Precio Máximo
          </label>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1a0f14' }}>
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
        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' }}>
          Calificación Mínima
        </label>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[0, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              style={{
                flex: 1,
                padding: '5px 0',
                borderRadius: '5px',
                fontSize: '0.65rem',
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
  );
}

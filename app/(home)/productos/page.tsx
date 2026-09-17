"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  StarIcon, 
  Search01Icon, 
  FilterIcon, 
  Cancel01Icon, 
  ShoppingBag01Icon,
  CheckmarkBadge01Icon,
  GridIcon,
} from "hugeicons-react";
import { useCart } from "../../components/context/CartContext";
import { productosService } from "../../services/productos.service";

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

export default function ProductosPage() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbCategoriesList, setDbCategoriesList] = useState<string[]>(["TODOS"]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  
  // Filtros especiales
  const [filterNewOnly, setFilterNewOnly] = useState<boolean>(false);
  const [filterPromoOnly, setFilterPromoOnly] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    productosService.getProductos()
      .then((data: any) => {
        if (Array.isArray(data)) {
          // Transform backend format to UI format
          const mapped: Product[] = data.map(item => ({
            id: item.id,
            title: item.nombre,
            price: item.precioVentaMin || 0,
            category: item.categoria?.nombre || item.categoriaNombre || "OTROS",
            rating: 5,
            img: item.img || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
            // Los productos más recientes (IDs más altos) los marcamos como nuevos
            isNew: false, 
            isPromo: false 
          }));
          
          // Ordenamos para que los nuevos estén arriba
          mapped.sort((a, b) => b.id - a.id);
          
          // Marcamos los 5 primeros como "isNew"
          for (let i = 0; i < Math.min(5, mapped.length); i++) {
            mapped[i].isNew = true;
          }

          setDbProducts(mapped);
          
          // Extraemos categorías únicas
          const cats = new Set(mapped.map(p => p.category));
          setDbCategoriesList(["TODOS", ...Array.from(cats)]);
          
          // Actualizamos el precio máximo del filtro en base al precio más alto
          if (mapped.length > 0) {
            const maxP = Math.max(...mapped.map(p => p.price));
            setMaxPrice(Math.ceil(maxP));
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  // Filtro mobile drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Ratings interactivos dinámicos por ID
  const [ratingsMap, setRatingsMap] = useState<{ [key: number]: number }>({});
  const [hoverRatingsMap, setHoverRatingsMap] = useState<{ [key: number]: number }>({});

  // GLOBAL CART HOOK
  const { addToCart, openCart, totalItemsCount } = useCart();

  const filteredProducts = useMemo(() => {
    return dbProducts.filter((item) => {
      const matchesCategory = selectedCategory === "TODOS" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price <= maxPrice;
      const currentRating = ratingsMap[item.id] !== undefined ? ratingsMap[item.id] : item.rating;
      const matchesRating = minRating === 0 || currentRating >= minRating;
      const matchesNew = !filterNewOnly || item.isNew;
      const matchesPromo = !filterPromoOnly || item.isPromo;

      return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesNew && matchesPromo;
    });
  }, [dbProducts, selectedCategory, searchQuery, maxPrice, minRating, filterNewOnly, filterPromoOnly, ratingsMap]);

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

      {/* LOADING STATE */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px", color: "#66585e" }}>
          Cargando catálogo...
        </div>
      ) : (
      <>
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
          {dbCategoriesList.map((cat) => {
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
              dbCategoriesList={dbCategoriesList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
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
            {totalItemsCount > 0 && (
              <button 
                onClick={openCart}
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
                <ShoppingBag01Icon size={14} color="#fff" /> Ver Carrito ({totalItemsCount})
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
                dbCategoriesList={dbCategoriesList}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
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
      </>
      )}
    </div>
  );
}

{/* REUSABLE FILTER CONTENT WITH CATEGORIES SELECTOR AND SEARCH */}
function FilterSidebarContent({
  dbCategoriesList,
  selectedCategory,
  setSelectedCategory,
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
  dbCategoriesList: string[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
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

      {/* SEARCH INPUT */}
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' }}>
          Buscador
        </label>
        <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
          <input 
            type="text" 
            placeholder="Buscar producto..." 
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

      {/* CATEGORIES FILTER IN SIDEBAR */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <GridIcon size={14} color="#9c3552" />
          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#9c3552', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>
            Categoría
          </label>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: '6px',
            border: '1px solid #e0d0d6',
            fontSize: '0.75rem',
            backgroundColor: '#faf7f8',
            color: '#1a0f14',
            fontWeight: '600',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {dbCategoriesList.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "TODOS" ? "Todas las Categorías" : cat}
            </option>
          ))}
        </select>
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

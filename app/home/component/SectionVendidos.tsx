"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag01Icon, ArrowRight01Icon, ArrowLeft01Icon, Female02Icon, ManIcon } from "hugeicons-react";
import TarjetaProducto from "@/app/component/cardProducto";

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
  const [isMobile, setIsMobile] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState<"todos" | "hombre" | "mujer">("todos");
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [haHechoScroll, setHaHechoScroll] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // EFECTO PARA HACER SCROLL AL INICIO CUANDO LLEGAS A LA SECCIÓN
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !haHechoScroll) {
            // Hacer scroll suave al inicio del carrusel
            if (carouselRef.current) {
              carouselRef.current.scrollTo({
                left: 0,
                behavior: "smooth"
              });
              setHaHechoScroll(true);
            }
          }
        });
      },
      { threshold: 0.3 } // Se activa cuando el 30% de la sección es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [haHechoScroll]);

  // Resetear el scroll cuando cambia el filtro
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    }
  }, [filtroActivo]);

  // Filtrar productos según selección
  const productosFiltrados = () => {
    let productos = [];
    
    if (filtroActivo === "todos") {
      productos = [...hombreItems, ...mujerItems];
    } else if (filtroActivo === "hombre") {
      productos = hombreItems;
    } else {
      productos = mujerItems;
    }
    
    // Duplicamos para efecto infinito
    return [...productos, ...productos];
  };

  // Control del Autoplay
  useEffect(() => {
    if (isHovered || !carouselRef.current) return;
    
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollAmount = isMobile ? 240 : 350; 
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, isMobile, filtroActivo]);

  const scrollPrev = () => {
    carouselRef.current?.scrollBy({ left: isMobile ? -240 : -350, behavior: 'smooth' });
  };

  const scrollNext = () => {
    carouselRef.current?.scrollBy({ left: isMobile ? 240 : 350, behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        padding: isMobile ? '30px 0' : '50px 0', 
        backgroundColor: '#fff',
        borderTop: '1px solid #f0f0f0'
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .filtro-btn {
          transition: all 0.2s ease;
        }
        
        .filtro-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* Header con filtros */}
      <div style={{ 
        padding: '0 5%', 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: '30px',
        gap: isMobile ? '15px' : '0'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '1.5rem' : '2rem', 
          fontWeight: '900', 
          textTransform: 'uppercase',
          letterSpacing: '-1px',
          margin: 0
        }}>
          Más Vendidos
        </h2>
        
        {/* FILTROS HOMBRE / MUJER */}
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          backgroundColor: '#f5f5f5',
          padding: '4px',
          borderRadius: '40px'
        }}>
          <button
            onClick={() => setFiltroActivo("todos")}
            style={{
              ...filtroBtnStyle,
              backgroundColor: filtroActivo === "todos" ? '#000' : 'transparent',
              color: filtroActivo === "todos" ? '#fff' : '#666',
              padding: isMobile ? '8px 16px' : '10px 24px'
            }}
          >
            Todos
          </button>
          
          <button
            onClick={() => setFiltroActivo("hombre")}
            style={{
              ...filtroBtnStyle,
              backgroundColor: filtroActivo === "hombre" ? '#2563eb' : 'transparent',
              color: filtroActivo === "hombre" ? '#fff' : '#666',
              padding: isMobile ? '8px 16px' : '10px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ManIcon size={isMobile ? 16 : 18} />
            <span>Hombre</span>
          </button>
          
          <button
            onClick={() => setFiltroActivo("mujer")}
            style={{
              ...filtroBtnStyle,
              backgroundColor: filtroActivo === "mujer" ? '#ec4899' : 'transparent',
              color: filtroActivo === "mujer" ? '#fff' : '#666',
              padding: isMobile ? '8px 16px' : '10px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Female02Icon size={isMobile ? 16 : 18} />
            <span>Mujer</span>
          </button>
        </div>

        {/* Botones de navegación - solo desktop */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={scrollPrev} style={btnNavStyle}>
              <ArrowLeft01Icon size={18} />
            </button>
            <button onClick={scrollNext} style={btnNavStyle}>
              <ArrowRight01Icon size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Indicador de filtro activo para móvil */}
      {isMobile && (
        <div style={{ 
          padding: '0 5%',
          marginBottom: '15px',
          fontSize: '0.8rem',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span>Mostrando:</span>
          <span style={{ 
            fontWeight: '700',
            color: filtroActivo === 'hombre' ? '#2563eb' : filtroActivo === 'mujer' ? '#ec4899' : '#000'
          }}>
            {filtroActivo === 'todos' ? 'Todos los productos' : 
             filtroActivo === 'hombre' ? 'Colección Hombre' : 'Colección Mujer'}
          </span>
        </div>
      )}

      {/* Carrusel Reutilizando el Componente */}
      <div 
        ref={carouselRef}
        className="hide-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '20px', 
          padding: '0 5%', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth'
        }}
      >
        {productosFiltrados().map((producto, index) => (
          <motion.div 
            key={`${producto.id}-${index}-${filtroActivo}`} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{ 
              flexShrink: 0, 
              width: isMobile ? '200px' : '280px',
              scrollSnapAlign: 'start' 
            }}
          >
            <TarjetaProducto 
              producto={producto} 
              index={index} 
              isMobile={isMobile} 
            />
          </motion.div>
        ))}
      </div>

      {/* Botones de navegación para móvil */}
      {isMobile && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '15px',
          marginTop: '20px',
          padding: '0 5%'
        }}>
          <button onClick={scrollPrev} style={mobileNavStyle}>
            <ArrowLeft01Icon size={20} />
          </button>
          <button onClick={scrollNext} style={mobileNavStyle}>
            <ArrowRight01Icon size={20} />
          </button>
        </div>
      )}
    </section>
  );
}

// Estilos
const btnNavStyle = { 
  width: '44px', 
  height: '44px', 
  borderRadius: '50%', 
  border: '1px solid #e5e7eb', 
  backgroundColor: '#fff', 
  color: '#000',
  cursor: 'pointer', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  transition: 'all 0.2s',
  ':hover': { 
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#000'
  }
};

const mobileNavStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid #e5e7eb',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
};

const filtroBtnStyle = {
  border: 'none',
  borderRadius: '30px',
  fontSize: '0.9rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px'
};
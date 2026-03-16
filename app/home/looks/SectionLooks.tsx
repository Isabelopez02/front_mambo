"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon, ShoppingBag01Icon } from "hugeicons-react";
import CardCategoria from "./CardLooks";

const listaLooks = [
  {
    id: 1,
    titulo: "Urban Matrix",
    img: "https://i.pinimg.com/736x/d2/33/27/d2332766467389c938c531a70014023c.jpg",
    prendas: [
      { id: 101, nombre: "Cyber Hoodie prenda de verano para cualquier uso", precio: 55.00, img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
      { id: 101, nombre: "Cyber Hoodie", precio: 55.00, img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
      { id: 101, nombre: "Cyber Hoodie", precio: 55.00, img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
      { id: 102, nombre: "Neo Cargo Pants", precio: 89.99, img: "https://i.pinimg.com/1200x/3c/34/c0/3c34c0916813a9e9a932e39044ec29b3.jpg" }
    ]
  },
  {
    id: 2,
    titulo: "Street Vision",
    img: "https://i.pinimg.com/564x/80/7e/07/807e0761401d510b1a9c3da96d2bc2a3.jpg",
    prendas: [
      { id: 201, nombre: "Alpha Sneakers", precio: 120.00, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" }
    ]
  }
];

export function SectionLooks() {
  const [isMobile, setIsMobile] = useState(false);
  const [lookSeleccionado, setLookSeleccionado] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = lookSeleccionado ? 'hidden' : 'unset';
  }, [lookSeleccionado]);

  // Actualizar visibilidad de flechas basado en scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      setTimeout(handleScroll, 100);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? window.innerWidth * 0.7 : 400;
      const newScrollLeft = direction === "left"
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  // Animación de rebote para los cards - MÁS URBANA
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.85,
      rotate: -3
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 14,
        mass: 0.9,
        delay: i * 0.1,
      }
    })
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: isMobile ? '30px 0' : '50px 0',
        backgroundColor: '#fff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER MEJORADO - ESTILO HIGH-END STREETWEAR */}
      <div style={{
        padding: '0 5%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        marginBottom: isMobile ? '30px' : '50px',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#2563eb' }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              color: '#000',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Get the style
            </span>
          </div>

          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '2rem',
            fontWeight: '900', // Súper Bold
            textTransform: 'uppercase',
            lineHeight: '0.85',
            margin: 0,
            color: '#000',
          }}>
            Inspírate <br />
            <span style={{
              WebkitTextStroke: '1px #000',
              color: 'transparent',
              fontSize: isMobile ? '2.4rem' : '3rem'
            }}>
              En tus compras
            </span>
          </h2>
        </div>

      </div>

      {/* CONTENEDOR DEL CARRUSEL CON FLECHAS SUPERPUESTAS */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* FLECHA IZQUIERDA */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            style={{
              ...arrowButtonStyle,
              left: isMobile ? '10px' : '20px',
              display: 'flex',
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 10,
            }}
          >
            <ArrowLeft01Icon size={isMobile ? 20 : 24} color="#2563eb" />
          </button>
        )}

        {/* FLECHA DERECHA */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            style={{
              ...arrowButtonStyle,
              right: isMobile ? '10px' : '20px',
              display: 'flex',
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 10,
            }}
          >
            <ArrowRight01Icon size={isMobile ? 20 : 24} color="#2563eb" />
          </button>
        )}

        {/* CARRUSEL CON CARDS - AHORA MÁS VERTICALES/ALARGADOS */}
        <div
          ref={scrollRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: isMobile ? '15px' : '20px',
            padding: isMobile ? '0 20px' : '0 5%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'flex-start'
          }}
        >
          {listaLooks.map((look, index) => (
            <motion.div
              key={look.id}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              onClick={() => setLookSeleccionado(look)}
              style={{
                flexShrink: 0,
                // FORMATO VERTICAL/ALARGADO - como poster
                width: isMobile ? '50vw' : '350px',  // Más angosto
                height: isMobile ? '500px' : '650px', // Más alto
                scrollSnapAlign: 'start',
                cursor: 'pointer',
                position: 'relative',
                // Sombra sutil para dar profundidad
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s ease',
                ':hover': {
                  boxShadow: '0 20px 30px -10px rgba(0,0,0,0.2)'
                }
              }}
            >
              <CardCategoria categoria={look} isMobile={isMobile} />
            </motion.div>
          ))}
        </div>

        {/* INDICADORES PARA MÓVIL */}
        {isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px'
          }}>
            {listaLooks.map((_, index) => (
              <button
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2563eb',
                  opacity: 0.3,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = (window.innerWidth * 0.65) + 15; // 65vw + gap
                    scrollRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL (ajustado para formato vertical) */}
      <AnimatePresence>
        {lookSeleccionado && (
          <div style={overlayStyle} onClick={() => setLookSeleccionado(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={modalStyle(isMobile)}
            >
              <button onClick={() => setLookSeleccionado(null)} style={closeBtnStyle}>
                <Cancel01Icon size={24} color="#000" />
              </button>

              {/* Dentro del Modal en el return de SectionLooks */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                height: '100%',
                overflow: 'hidden' // El contenedor padre no scrollea
              }}>

                {/* Lado A: Foto del Look (En móvil ocupa el 60% de la altura inicial) */}
                <div style={{
                  flex: isMobile ? 'none' : '1.2',
                  height: isMobile ? '55%' : '100%',
                  backgroundColor: '#000',
                  position: 'relative'
                }}>
                  <img src={lookSeleccionado.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Look" />

                  {/* Gradiente sutil sobre la foto en móvil para que el botón cerrar resalte */}
                  {isMobile && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' }} />}
                </div>

                {/* Lado B: Prendas Utilizadas (Scrolleable) */}
                <div style={{
                  flex: 1,
                  padding: isMobile ? '20px' : '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  overflowY: 'auto', // ESTO permite que aunque el modal sea largo, las prendas se puedan ver
                  height: isMobile ? '45%' : '100%'
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>Shop the look</h3>
                  <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{lookSeleccionado.titulo}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {lookSeleccionado.prendas.map((prenda: any) => (
                      <div key={prenda.id} style={urbanPrendaCardStyle}>
                        <img src={prenda.img} alt={prenda.nombre} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>{prenda.nombre}</h4>
                          <p style={{ margin: '2px 0 0 0', color: '#2563eb', fontWeight: '800' }}>S/. {prenda.precio.toFixed(2)}</p>
                        </div>
                        <button style={urbanMiniAddBtn}><ShoppingBag01Icon size={18} color="white" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ESTILOS ACTUALIZADOS
const arrowButtonStyle: any = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '44px',
  height: '44px',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  zIndex: 10,
  ':hover': {
    backgroundColor: 'rgba(255,255,255,1)',
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  }
};

const overlayStyle: any = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.95)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px'
};

const modalStyle = (isMobile: boolean): any => ({
  backgroundColor: '#fff',
  // En móvil usamos casi todo el ancho y casi toda la altura (92vh)
  width: isMobile ? '70%' : '1100px',
  height: isMobile ? '95vh' : '850px', // Aumentamos a 92vh para que sea bien largo
  borderRadius: isMobile ? '16px' : '0', // Un poco de redondeo en móvil se ve más moderno
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #f1f1f1',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
});

const closeBtnStyle: any = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  backgroundColor: 'rgba(255,255,255,0.9)',
  border: 'none',
  padding: '8px',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 50,
  display: 'flex',
  opacity: 0.9,
  transition: 'opacity 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  ':hover': { opacity: 1 }
};

const urbanPrendaCardStyle: any = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  padding: '8px',
  borderBottom: '1px solid #f0f0f0',
  borderRadius: 0,
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#fafafa'
  }
};

const urbanMiniAddBtn: any = {
  backgroundColor: '#000',
  border: 'none',
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  opacity: 0.8,
  transition: 'all 0.2s',
  ':hover': {
    opacity: 1,
    transform: 'scale(1.05)',
    backgroundColor: '#2563eb'
  }
};
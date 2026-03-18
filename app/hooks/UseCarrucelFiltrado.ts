import { useState, useEffect, useRef } from "react";

export function useCarruselFiltrado(hombreItems: any[], mujerItems: any[], isMobile: boolean) {
  const [filtroActivo, setFiltroActivo] = useState<"todos" | "hombre" | "mujer">("todos");
  const [isHovered, setIsHovered] = useState(false);
  const [haHechoScroll, setHaHechoScroll] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Efecto de Scroll Inicial
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !haHechoScroll && carouselRef.current) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
          setHaHechoScroll(true);
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [haHechoScroll]);

  // 2. Resetear scroll al cambiar filtro
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [filtroActivo]);

  // 3. Control del Autoplay (ajustado para no ser infinito)
  useEffect(() => {
    if (isHovered || !carouselRef.current) return;
    
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        // Si llega al final, vuelve al inicio suavemente
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: isMobile ? 240 : 350, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, isMobile, filtroActivo]);

  // 4. Función de filtrado NORMAL (Sin duplicar)
  const productosFiltrados = () => {
    if (filtroActivo === "todos") return [...hombreItems, ...mujerItems];
    if (filtroActivo === "hombre") return hombreItems;
    return mujerItems;
  };

  const scrollPrev = () => carouselRef.current?.scrollBy({ left: isMobile ? -240 : -350, behavior: 'smooth' });
  const scrollNext = () => carouselRef.current?.scrollBy({ left: isMobile ? 240 : 350, behavior: 'smooth' });

  return {
    sectionRef, carouselRef,
    filtroActivo, setFiltroActivo,
    setIsHovered,
    productosFiltrados, scrollPrev, scrollNext
  };
}
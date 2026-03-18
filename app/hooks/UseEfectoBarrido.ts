import { useEffect, useState, useRef } from "react";

export function useEfectoBarrido(isMobile: boolean) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [haHechoRecorrido, setHaHechoRecorrido] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [estaRecorriendo, setEstaRecorriendo] = useState(false);

  // Efecto para el barrido inicial
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !haHechoRecorrido && carouselRef.current) {
            setEstaRecorriendo(true);
            const carousel = carouselRef.current;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
            setHaHechoRecorrido(true);
            
            setTimeout(() => {
              setEstaRecorriendo(false);
            }, 1500); 
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [haHechoRecorrido]);

  // Manejo de flechas al hacer scroll manual
  const handleScroll = () => {
    if (carouselRef.current && !estaRecorriendo) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [estaRecorriendo]);

  // Función para los botones de flechas
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current && !estaRecorriendo) {
      const scrollAmount = isMobile ? 300 : 400;
      const newScrollLeft = direction === "left" 
        ? carouselRef.current.scrollLeft - scrollAmount 
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  // Exportamos lo que el componente va a necesitar usar
  return {
    sectionRef,
    carouselRef,
    haHechoRecorrido,
    estaRecorriendo,
    showLeftArrow,
    showRightArrow,
    scroll
  };
}
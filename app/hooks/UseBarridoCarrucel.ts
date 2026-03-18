import { useState, useEffect, useRef } from "react";

export function useBarridoCarrucel(itemsLength: number, isMobile: boolean) {
  // 1. Movemos el cálculo de maxIndex arriba para poder usarlo en el estado inicial
  const stepSize = isMobile ? 275 : 350;
  const maxVisibleCards = isMobile ? 1 : 4;
  const maxIndex = Math.max(0, itemsLength - maxVisibleCards);

  // 2. Inicializamos el índice en maxIndex (el final) en lugar de 0
  const [index, setIndex] = useState(maxIndex); 
  
  const sectionRef = useRef<HTMLElement>(null);
  const [haHechoBarrido, setHaHechoBarrido] = useState(false);
  const [estaBarriendo, setEstaBarriendo] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  // Efecto extra: Si la pantalla cambia de tamaño antes del barrido, actualizamos el final
  useEffect(() => {
    if (!haHechoBarrido) {
      setIndex(maxIndex);
    }
  }, [maxIndex, haHechoBarrido]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !haHechoBarrido) {
            setEstaBarriendo(true);
            setShowArrows(false);
            
            // 3. Nos aseguramos de estar en el final justo antes de empezar
            setIndex(maxIndex); 
            
            setTimeout(() => {
              // 4. EL CAMBIO CLAVE: Hacemos el barrido hacia el INICIO (0)
              setIndex(0); 
              
              setTimeout(() => {
                setEstaBarriendo(false);
                setHaHechoBarrido(true);
                setShowArrows(true);
              }, 800);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [haHechoBarrido, maxIndex]);

  const next = () => { if (!estaBarriendo) setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1)); };
  const prev = () => { if (!estaBarriendo) setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1)); };

  return { sectionRef, index, estaBarriendo, showArrows, stepSize, next, prev };
}
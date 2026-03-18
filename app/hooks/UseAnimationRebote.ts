import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { UseValidationPantalla } from "./UseValidationPantalla";

export function useAnimacionRebote() {
  const isMobile = UseValidationPantalla();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.85, rotate: -3 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1, rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 14, 
        mass: 0.9, 
        // EL TRUCO UX: Solo hacemos efecto cascada en los primeros 4. 
        // Los demás cargan al instante (delay 0) para no hacer esperar al usuario.
        delay: i < 4 ? i * 0.1 : 0 
      }
    })
  };

  return { isMobile, scrollRef, sectionRef, showLeftArrow, showRightArrow, isInView, scroll, cardVariants };
}
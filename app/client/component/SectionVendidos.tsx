"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ShoppingBag01Icon, ArrowRight01Icon, ArrowLeft01Icon } from "hugeicons-react";

const initialItems = [
  { id: 1, title: "Mambo Classic", price: "$29.99", img: "https://i.pinimg.com/736x/1f/35/8f/1f358fc40b87d712c8c89f838fb73f43.jpg", imgHover: "https://i.pinimg.com/736x/de/9b/b2/de9bb28c5c7f2bec54bc8980edc7ce3a.jpg" },
  { id: 2, title: "Neo Cargo", price: "$89.99", img: "https://i.pinimg.com/1200x/3c/34/c0/3c34c0916813a9e9a932e39044ec29b3.jpg", imgHover: "https://i.pinimg.com/1200x/9e/07/7e/9e077e5cbf95e126f048e36869e6633e.jpg" },
  { id: 3, title: "Cyber Hoodie", price: "$55.00", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg", imgHover: "https://i.pinimg.com/736x/74/24/ba/7424baa68df7565a572e76323e41735c.jpg" },
  { id: 4, title: "Alpha Sneakers", price: "$120.0", img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg", imgHover: "https://i.pinimg.com/736x/e8/5e/12/e85e125b80e0d7a7a9a6d46276e95064.jpg" },
  { id: 5, title: "Urban Wind", price: "$75.00", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg", imgHover: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
  { id: 6, title: "Ovserdie complet", price: "$175.00", img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg", imgHover: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" },
  { id: 7, title: "Urban Work", price: "$345.00", img: "https://i.pinimg.com/736x/58/9e/47/589e4703e15ce9ad9619c222aab5101d.jpg", imgHover: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" },
];

const doubleItems = [...initialItems, ...initialItems];

export function SectionVendidos() {
  const [isHoveredGlobal, setIsHoveredGlobal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const cardWidth = 375; // 350px width + 25px gap

  const moveNext = async () => {
    const nextIndex = currentIndex + 1;
    
    await controls.start({
      x: -(cardWidth * nextIndex),
      transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] }
    });

    if (nextIndex >= initialItems.length) {
      controls.set({ x: 0 });
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const movePrev = async () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      controls.set({ x: -(cardWidth * initialItems.length) });
      prevIndex = initialItems.length - 1;
    }
    await controls.start({
      x: -(cardWidth * prevIndex),
      transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] }
    });
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    if (isHoveredGlobal) return;
    const interval = setInterval(moveNext, 3000);
    return () => clearInterval(interval);
  }, [isHoveredGlobal, currentIndex]);

  return (
    <section 
      onMouseEnter={() => setIsHoveredGlobal(true)}
      onMouseLeave={() => setIsHoveredGlobal(false)}
      style={{ padding: '10px 0', backgroundColor: '#fff', overflow: 'hidden' }}
    >
      <div style={{ padding: '0 2%', display: 'flex', justifyContent: 'space-between', marginBottom: '0px', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>Los Más Vendidos</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={movePrev} style={btnNavStyle}><ArrowLeft01Icon /></button>
          <button onClick={moveNext} style={btnNavStyle}><ArrowRight01Icon /></button>
        </div>
      </div>

      <div style={{ padding: '0 5%' }}>
        <motion.div animate={controls} initial={{ x: 0 }} style={{ display: 'flex', gap: '25px' }}>
          {doubleItems.map((item, index) => (
            <ProductCard key={`${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ item }: { item: any }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={{ minWidth: '250px' }}>
      <motion.div 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        whileHover={{ 
            scale: 1.05,
            outline: "4px solid #000",
            outlineOffset: "-4px",
            zIndex: 50 // Asegura que al agrandarse esté por encima
        }}
        transition={{ type: "spring", stiffness: 100, damping: 100 , mass: 0.8 }}
        style={{ 
          height: '350px', 
          borderRadius: '24px', 
          overflow: 'hidden', 
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: '#f1f1f1'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={isHover ? 'hover' : 'normal'}
            src={isHover && item.imgHover ? item.imgHover : item.img}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </AnimatePresence>
      </motion.div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{item.title}</h4>
          <p style={{ margin: 0, color: '#3b82f6', fontWeight: '800' }}>{item.price}</p>
        </div>
        <button style={cartButtonStyle}>
          <ShoppingBag01Icon size={24} color="white" />
        </button>
      </div>
      <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '20px 0' }}></hr>
    </div>
  );
}

const btnNavStyle = { width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const cartButtonStyle = { backgroundColor: '#0f172a', border: 'none', padding: '12px', borderRadius: '14px', cursor: 'pointer', display: 'flex' };
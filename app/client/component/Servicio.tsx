"use client";
import { motion } from "framer-motion";
import { 
  TruckIcon, 
  CustomerService01Icon, 
  Store01Icon, 
  PackageReceiveIcon
} from "hugeicons-react";
import { useState, useEffect } from "react";

export function Servicio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const opciones = [
    { 
      icon: <TruckIcon size={32} color="#e0527f" />, 
      label: "EXPRESS SHIPPING", 
      detail: "Fast delivery nationwide"
    },
    { 
      icon: <Store01Icon size={32} color="#e0527f" />, 
      label: "STORE PICKUP", 
      detail: "Free pickup in 2 hours"
    },
    { 
      icon: <CustomerService01Icon size={32} color="#e0527f" />, 
      label: "24/7 ARTIST SUPPORT", 
      detail: "Beauty expert advice"
    },
    { 
      icon: <PackageReceiveIcon size={32} color="#e0527f" />, 
      label: "HASSLE-FREE RETURNS", 
      detail: "30-day money-back guarantee"
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section style={{ 
      backgroundColor: '#fdf4f7',
      padding: isMobile ? '50px 20px' : '70px 5%',
      borderTop: '1px solid #f7e0e8'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          {opciones.map((opc, i) => (
            <motion.div
              key={i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -4 }}
              style={{
                padding: '24px 20px',
                backgroundColor: '#ffffff',
                border: '1px solid #f6e0e9',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: hoveredIndex === i ? '0 8px 20px rgba(224, 82, 127, 0.12)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                backgroundColor: '#fbf0f4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {opc.icon}
              </div>
              
              <div>
                <h3 style={{ 
                  color: '#1a1a1a',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  margin: '0 0 4px 0',
                  letterSpacing: '0.5px'
                }}>
                  {opc.label}
                </h3>
                <p style={{ 
                  color: '#776c6e',
                  fontSize: '0.75rem',
                  margin: 0
                }}>
                  {opc.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
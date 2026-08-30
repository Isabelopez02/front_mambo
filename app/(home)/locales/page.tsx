"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Location01Icon, 
  WhatsappIcon, 
  StarIcon,
  Search01Icon,
  ArrowRight01Icon,
  Cancel01Icon
} from "hugeicons-react";

interface Store {
  id: number;
  nombre: string;
  direccion: string;
  queryLocation: string;
  horario: string;
  estado: string;
  telefono: string;
  whatsapp: string;
  referencia: string;
  destacado: string;
  rating: number;
  reviewsCount: number;
  imagen: string;
}

const localesData: Store[] = [
  {
    id: 1,
    nombre: "Sede Centro Histórico",
    direccion: "Jr. Ucayali 450, Tienda 104 (A 1 cdra. de la Plaza Mayor), Lima",
    queryLocation: "Jr. Ucayali 450, Cercado de Lima, Lima, Peru",
    horario: "Lun a Sáb: 9:00 AM - 8:30 PM | Dom: 10:00 AM - 6:00 PM",
    estado: "Abierto ahora",
    telefono: "+51 987 654 321",
    whatsapp: "51987654321",
    referencia: "Frente a la Galería Central de Maquillaje",
    destacado: "Sede Principal & Showroom",
    rating: 5.0,
    reviewsCount: 124,
    imagen: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    nombre: "Sede Gamarra Luxe",
    direccion: "Prol. Gamarra 850, Stand 202 - Galería Fashion Plaza, La Victoria",
    queryLocation: "Prolongacion Gamarra 850, La Victoria, Lima, Peru",
    horario: "Lun a Sáb: 9:30 AM - 8:00 PM",
    estado: "Abierto ahora",
    telefono: "+51 912 345 678",
    whatsapp: "51912345678",
    referencia: "Cerca al Parque Cánepa",
    destacado: "Carteras & Calzado Importado",
    rating: 4.9,
    reviewsCount: 98,
    imagen: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    nombre: "Sede Los Olivos - Lima Norte",
    direccion: "Av. Carlos Izaguirre 310, Int. 15, Los Olivos",
    queryLocation: "Av. Carlos Izaguirre 310, Los Olivos, Lima, Peru",
    horario: "Lun a Dom: 10:00 AM - 9:00 PM",
    estado: "Abierto ahora",
    telefono: "+51 955 888 777",
    whatsapp: "51955888777",
    referencia: "A 2 cuadras de la Av. Antunez de Mayolo",
    destacado: "Skincare & Beauty Bar",
    rating: 4.8,
    reviewsCount: 76,
    imagen: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    nombre: "Sede Miraflores Boutique",
    direccion: "Av. Larco 740, Tienda 12, Miraflores",
    queryLocation: "Av. Jose Larco 740, Miraflores, Lima, Peru",
    horario: "Lun a Dom: 10:00 AM - 9:00 PM",
    estado: "Abierto ahora",
    telefono: "+51 933 222 111",
    whatsapp: "51933222111",
    referencia: "Frente a Parque Kennedy",
    destacado: "Boutique Exclusiva & Tendencias",
    rating: 5.0,
    reviewsCount: 142,
    imagen: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
  }
];

export default function LocalesPage() {
  const [selectedStore, setSelectedStore] = useState<Store>(localesData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMapOpen, setMobileMapOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredStores = localesData.filter(store =>
    store.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.direccion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStore = (store: Store, openMapOnMobile = false) => {
    setSelectedStore(store);
    if (isMobile && openMapOnMobile) {
      setMobileMapOpen(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* MAIN CONTAINER */}
      <div style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "calc(100vh - 70px)"
      }}>
        
        {/* LEFT COLUMN: TITLE + SEARCH + LIST OF STORES */}
        <aside style={{
          width: isMobile ? "100%" : "440px",
          flexShrink: 0,
          backgroundColor: "#ffffff",
          borderRight: isMobile ? "none" : "1px solid #f3e2e8",
          display: "flex",
          flexDirection: "column",
          maxHeight: isMobile ? "none" : "calc(100vh - 70px)",
          overflowY: isMobile ? "visible" : "auto",
          boxSizing: "border-box"
        }}>
          
          {/* HEADER TITLE & SEARCH BAR SECTION ON THE LEFT */}
          <div style={{
            padding: "24px 20px 16px 20px",
            borderBottom: "1px solid #f5eaee",
            backgroundColor: "#fcf0f4",
            position: isMobile ? "relative" : "sticky",
            top: 0,
            zIndex: 5
          }}>
            <span style={{ fontSize: "0.62rem", letterSpacing: "2.5px", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
              TIENDAS FÍSICAS TATY
            </span>
            <h1 style={{
              fontFamily: "'DM Serif Display', var(--font-dm-serif), Georgia, serif",
              fontSize: "1.65rem",
              fontWeight: "400",
              color: "#1a0f14",
              margin: "0 0 14px 0",
              lineHeight: "1.2"
            }}>
              Nuestros Locales
            </h1>

            {/* SEARCH INPUT */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Buscar por distrito o dirección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 36px 10px 14px",
                  borderRadius: "20px",
                  border: "1px solid #e0d0d6",
                  fontSize: "0.78rem",
                  outline: "none",
                  backgroundColor: "#ffffff",
                  color: "#1a0f14"
                }}
              />
              <Search01Icon size={16} color="#9c3552" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>

            <span style={{ fontSize: "0.7rem", color: "#66585e", marginTop: "10px", display: "block" }}>
              Mostrando <strong>{filteredStores.length}</strong> locales
            </span>
          </div>

          {/* STORE ITEMS LIST */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredStores.map((store) => {
              const isSelected = selectedStore.id === store.id;

              return (
                <motion.div
                  key={store.id}
                  onClick={() => handleSelectStore(store, false)}
                  whileHover={{ backgroundColor: "#fdf8fa" }}
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #f3e2e8",
                    cursor: "pointer",
                    backgroundColor: isSelected && !isMobile ? "#fcf0f4" : "#ffffff",
                    borderLeft: isSelected && !isMobile ? "4px solid #9c3552" : "4px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    
                    {/* THUMBNAIL */}
                    <img
                      src={store.imagen}
                      alt={store.nombre}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        flexShrink: 0,
                        border: isSelected && !isMobile ? "2px solid #9c3552" : "1px solid #e0d0d6"
                      }}
                    />

                    {/* CONTENT DETAILS */}
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                        <h3 style={{
                          fontSize: "0.95rem",
                          fontWeight: "700",
                          color: "#1a0f14",
                          margin: 0,
                          lineHeight: "1.25"
                        }}>
                          {store.nombre}
                        </h3>
                        
                        <span style={{
                          fontSize: "0.58rem",
                          fontWeight: "700",
                          backgroundColor: "#9c3552",
                          color: "#ffffff",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          whiteSpace: "nowrap",
                          textTransform: "uppercase"
                        }}>
                          {store.destacado.split(" ")[0]}
                        </span>
                      </div>

                      {/* RATING */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#1a0f14" }}>{store.rating}</span>
                        <div style={{ display: "flex", gap: "1px" }}>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <StarIcon key={i} size={11} color="#e0527f" fill="#e0527f" />
                          ))}
                        </div>
                        <span style={{ fontSize: "0.72rem", color: "#66585e" }}>({store.reviewsCount})</span>
                      </div>

                      {/* STATUS & HOURS */}
                      <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.72rem", fontWeight: "700", color: "#15803d" }}>● {store.estado}</span>
                        <span style={{ fontSize: "0.72rem", color: "#66585e" }}>| {store.horario}</span>
                      </div>

                      {/* ADDRESS */}
                      <p style={{ fontSize: "0.75rem", color: "#44383d", margin: "6px 0 0 0", lineHeight: "1.35" }}>
                        {store.direccion}
                      </p>
                      
                      <span style={{ fontSize: "0.68rem", color: "#9c3552", fontStyle: "italic", display: "block", marginTop: "2px" }}>
                        Ref: {store.referencia}
                      </span>

                      {/* ACTION BUTTONS (WHATSAPP + VER EN MAPA) */}
                      <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                        <a
                          href={`https://wa.me/${store.whatsapp}?text=Hola!%20Quisiera%20consultar%20sobre%20stock%20en%20su%20${encodeURIComponent(store.nombre)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: "7px 12px",
                            backgroundColor: "#25D366",
                            color: "#ffffff",
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px"
                          }}
                        >
                          <WhatsappIcon size={14} color="#fff" /> Contactar WhatsApp
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectStore(store, true);
                          }}
                          style={{
                            padding: "7px 12px",
                            backgroundColor: isSelected && !isMobile ? "#1a0f14" : "#ffffff",
                            color: isSelected && !isMobile ? "#ffffff" : "#1a0f14",
                            border: "1px solid #1a0f14",
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <Location01Icon size={12} color={isSelected && !isMobile ? "#fff" : "#1a0f14"} /> Ver en Mapa
                        </button>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: INTERACTIVE MAP VIEW (ONLY VISIBLE ON DESKTOP) */}
        {!isMobile && (
          <main style={{
            flexGrow: 1,
            height: "calc(100vh - 70px)",
            position: "relative",
            backgroundColor: "#e5e3df"
          }}>
            {/* MAP OVERLAY FLOATING INFO CARD */}
            <div style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 10,
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "12px 18px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              border: "1px solid #f3e2e8",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "90%"
            }}>
              <Location01Icon size={22} color="#9c3552" />
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                  {selectedStore.nombre}
                </h4>
                <p style={{ fontSize: "0.72rem", color: "#66585e", margin: "2px 0 0 0" }}>
                  {selectedStore.direccion}
                </p>
              </div>
              
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.queryLocation)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginLeft: "auto",
                  padding: "6px 12px",
                  backgroundColor: "#fcf0f4",
                  color: "#9c3552",
                  border: "1px solid #e0d0d6",
                  borderRadius: "6px",
                  fontSize: "0.68rem",
                  fontWeight: "700",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                Abrir Google Maps <ArrowRight01Icon size={12} color="#9c3552" />
              </a>
            </div>

            {/* GOOGLE MAPS IFRAME EMBED */}
            <iframe
              key={selectedStore.id}
              title={selectedStore.nombre}
              width="100%"
              height="100%"
              style={{ border: 0, width: "100%", height: "100%" }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedStore.queryLocation)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            />
          </main>
        )}

      </div>

      {/* MOBILE FULLSCREEN MAP MODAL DRAWER */}
      <AnimatePresence>
        {isMobile && mobileMapOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMapOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1100,
                backdropFilter: "blur(2px)"
              }}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "90vh",
                backgroundColor: "#ffffff",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                zIndex: 1101,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 -10px 30px rgba(0,0,0,0.25)"
              }}
            >
              {/* MODAL HEADER */}
              <div style={{
                padding: "14px 18px",
                backgroundColor: "#fcf0f4",
                borderBottom: "1px solid #f3e2e8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ fontSize: "0.6rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1px", textTransform: "uppercase" }}>
                    Ubicación de la Sede
                  </span>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: "2px 0 0 0" }}>
                    {selectedStore.nombre}
                  </h3>
                </div>

                <button
                  onClick={() => setMobileMapOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px"
                  }}
                >
                  <Cancel01Icon size={20} color="#1a0f14" />
                </button>
              </div>

              {/* MAP IFRAME */}
              <div style={{ flexGrow: 1, position: "relative" }}>
                <iframe
                  key={selectedStore.id}
                  title={selectedStore.nombre}
                  width="100%"
                  height="100%"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedStore.queryLocation)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

              {/* MODAL FOOTER ACTIONS */}
              <div style={{
                padding: "16px",
                borderTop: "1px solid #f3e2e8",
                backgroundColor: "#ffffff",
                display: "flex",
                gap: "10px"
              }}>
                <a
                  href={`https://wa.me/${selectedStore.whatsapp}?text=Hola!%20Quisiera%20consultar%20sobre%20su%20${encodeURIComponent(selectedStore.nombre)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#25D366",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <WhatsappIcon size={16} color="#fff" /> Contactar por WhatsApp
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.queryLocation)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#1a0f14",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  Abrir App Maps <ArrowRight01Icon size={14} color="#fff" />
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

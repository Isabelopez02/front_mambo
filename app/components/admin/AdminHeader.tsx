"use client";

import React, { useState, useEffect } from "react";
import { 
  Notification01Icon, 
  Calendar01Icon,
  Search01Icon
} from "hugeicons-react";

export function AdminHeader() {
  const [formattedDate, setFormattedDate] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dateStr = today.toLocaleDateString('es-ES', options);
    // Capitalize first letter of day
    setFormattedDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
  }, []);

  return (
    <header style={{
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f3e2e8",
      padding: "14px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)"
    }}>
      
      {/* LEFT: TODAY'S DATE */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          backgroundColor: "#fcf0f4",
          border: "1px solid #f3c2d4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9c3552"
        }}>
          <Calendar01Icon size={18} color="#9c3552" />
        </div>

        <div>
          <span style={{ fontSize: "0.62rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1px", textTransform: "uppercase" }}>
            FECHA ACTUAL
          </span>
          <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1a0f14", margin: 0, lineHeight: 1.2 }}>
            {formattedDate || "Cargando fecha..."}
          </h4>
        </div>
      </div>

      {/* CENTER: QUICK SEARCH */}
      <div style={{ position: "relative", width: "260px" }}>
        <input
          type="text"
          placeholder="Buscar pedidos, clientes..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "8px 36px 8px 14px",
            borderRadius: "20px",
            border: "1px solid #e0d0d6",
            fontSize: "0.75rem",
            backgroundColor: "#faf7f8",
            outline: "none",
            color: "#1a0f14"
          }}
        />
        <Search01Icon size={14} color="#9c3552" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
      </div>

      {/* RIGHT: NOTIFICATIONS & LOGGED USER INFO */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* NOTIFICATIONS BUTTON */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#faf7f8",
              border: "1px solid #e0d0d6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative"
            }}
            title="Notificaciones"
          >
            <Notification01Icon size={18} color="#1a0f14" />
            <span style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#9c3552",
              border: "2px solid #ffffff"
            }} />
          </button>

          {/* NOTIFICATIONS DROPDOWN */}
          {showNotifications && (
            <div style={{
              position: "absolute",
              top: "48px",
              right: 0,
              width: "280px",
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              border: "1px solid #f3e2e8",
              padding: "14px",
              zIndex: 200
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", borderBottom: "1px solid #f5eaee", paddingBottom: "8px" }}>
                <strong style={{ fontSize: "0.78rem", color: "#1a0f14" }}>Notificaciones Recientes</strong>
                <span style={{ fontSize: "0.62rem", color: "#9c3552", fontWeight: "700" }}>3 NUEVAS</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "0.72rem", color: "#44383d", backgroundColor: "#fcf0f4", padding: "8px 10px", borderRadius: "8px" }}>
                  📦 <strong>Nuevo pedido #1042</strong> recibido hace 10 min.
                </div>
                <div style={{ fontSize: "0.72rem", color: "#44383d", backgroundColor: "#faf7f8", padding: "8px 10px", borderRadius: "8px" }}>
                  🚚 <strong>Entrega finalizada</strong> por Conductor Pedro R.
                </div>
                <div style={{ fontSize: "0.72rem", color: "#44383d", backgroundColor: "#faf7f8", padding: "8px 10px", borderRadius: "8px" }}>
                  ⚠️ <strong>Stock bajo</strong> en Cartera Chic Luxe (2 unidades).
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LOGGED IN USER PROFILE */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "4px 8px 4px 4px",
          borderRadius: "25px",
          backgroundColor: "#fcf0f4",
          border: "1px solid #f3c2d4"
        }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="Usuario Administrador"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #9c3552"
            }}
          />

          <div style={{ paddingRight: "6px" }}>
            <h4 style={{ fontSize: "0.78rem", fontWeight: "700", color: "#1a0f14", margin: 0, lineHeight: 1.1 }}>
              María Alejandra
            </h4>
            <span style={{ fontSize: "0.62rem", color: "#9c3552", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Super Admin
            </span>
          </div>
        </div>

      </div>

    </header>
  );
}

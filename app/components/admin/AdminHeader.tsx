"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Notification01Icon, 
  Calendar01Icon,
  Search01Icon,
  UserIcon,
  Settings02Icon,
  Logout01Icon,
  ArrowDown01Icon
} from "hugeicons-react";

export function AdminHeader() {
  const [formattedDate, setFormattedDate] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dateStr = today.toLocaleDateString('es-ES', options);
    setFormattedDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={{
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      padding: "12px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
    }}>
      
      {/* LEFT: TODAY'S DATE */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#475569"
        }}>
          <Calendar01Icon size={18} color="#475569" />
        </div>

        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase" }}>
            FECHA ACTUAL
          </span>
          <h4 style={{ fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
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
            border: "1px solid #cbd5e1",
            fontSize: "0.75rem",
            backgroundColor: "#f8fafc",
            outline: "none",
            color: "#0f172a"
          }}
        />
        <Search01Icon size={14} color="#64748b" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
      </div>

      {/* RIGHT: NOTIFICATIONS & CONSOLIDATED USER PROFILE DROPDOWN */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        
        {/* NOTIFICATIONS BUTTON */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative"
            }}
            title="Notificaciones"
          >
            <Notification01Icon size={18} color="#0f172a" />
            <span style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
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
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              border: "1px solid #e2e8f0",
              padding: "14px",
              zIndex: 200
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <strong style={{ fontSize: "0.78rem", color: "#0f172a" }}>Notificaciones Recientes</strong>
                <span style={{ fontSize: "0.62rem", color: "#ef4444", fontWeight: "700" }}>3 NUEVAS</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "0.72rem", color: "#334155", backgroundColor: "#f8fafc", padding: "8px 10px", borderRadius: "8px" }}>
                  📦 <strong>Nuevo pedido #1042</strong> recibido hace 10 min.
                </div>
                <div style={{ fontSize: "0.72rem", color: "#334155", backgroundColor: "#f8fafc", padding: "8px 10px", borderRadius: "8px" }}>
                  🚚 <strong>Entrega finalizada</strong> por Conductor Pedro R.
                </div>
                <div style={{ fontSize: "0.72rem", color: "#334155", backgroundColor: "#f8fafc", padding: "8px 10px", borderRadius: "8px" }}>
                  ⚠️ <strong>Stock bajo</strong> en Cartera Chic Luxe.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CONSOLIDATED USER PROFILE DROPDOWN (TOP RIGHT HEADER) */}
        <div style={{ position: "relative" }} ref={userDropdownRef}>
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "4px 10px 4px 4px",
              borderRadius: "25px",
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e1",
              cursor: "pointer"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="Admin Taty Profile"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #0f172a"
              }}
            />

            <div style={{ textAlign: "left", paddingRight: "4px" }}>
              <h4 style={{ fontSize: "0.76rem", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1.1 }}>
                Admin Taty
              </h4>
              <span style={{ fontSize: "0.6rem", color: "#64748b", fontWeight: "600" }}>
                admin@tatyimport.com
              </span>
            </div>

            <ArrowDown01Icon size={14} color="#64748b" />
          </button>

          {/* USER ACCOUNT ACTIONS DROPDOWN */}
          {showUserDropdown && (
            <div style={{
              position: "absolute",
              top: "48px",
              right: 0,
              width: "220px",
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
              border: "1px solid #e2e8f0",
              padding: "8px",
              zIndex: 250,
              display: "flex",
              flexDirection: "column",
              gap: "2px"
            }}>
              <div style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>
                <strong style={{ fontSize: "0.78rem", color: "#0f172a", display: "block" }}>Admin Taty</strong>
                <span style={{ fontSize: "0.62rem", color: "#059669", fontWeight: "700" }}>● En línea (Super Admin)</span>
              </div>

              <a
                href="/admin/configuracion"
                style={dropdownItemStyle}
                onClick={() => setShowUserDropdown(false)}
              >
                <UserIcon size={15} color="#475569" />
                <span>Mi Perfil</span>
              </a>

              <a
                href="/admin/configuracion"
                style={dropdownItemStyle}
                onClick={() => setShowUserDropdown(false)}
              >
                <Settings02Icon size={15} color="#475569" />
                <span>Configuración de Cuenta</span>
              </a>

              <div style={{ borderTop: "1px solid #f1f5f9", marginTop: "4px", paddingTop: "4px" }}>
                <a
                  href="/locales"
                  style={{ ...dropdownItemStyle, color: "#dc2626" }}
                >
                  <Logout01Icon size={15} color="#dc2626" />
                  <span>Cerrar Sesión</span>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

const dropdownItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 12px",
  borderRadius: "8px",
  fontSize: "0.75rem",
  fontWeight: "600",
  color: "#334155",
  textDecoration: "none",
  cursor: "pointer",
  transition: "backgroundColor 0.15s ease"
};

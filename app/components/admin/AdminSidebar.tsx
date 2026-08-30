"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DashboardSquare01Icon, 
  ShoppingBag01Icon, 
  GridIcon,
  UserGroupIcon, 
  Building01Icon,
  Invoice01Icon,
  DeliveryTruck01Icon,
  UserCheck01Icon,
  AnalyticsUpIcon,
  Settings02Icon,
  Logout01Icon,
  Menu01Icon,
  Cancel01Icon
} from "hugeicons-react";

export function AdminSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: <DashboardSquare01Icon size={17} /> },
    { label: "Productos", href: "/admin/productos", icon: <ShoppingBag01Icon size={17} /> },
    { label: "Categorías", href: "/admin/categorias", icon: <GridIcon size={17} /> },
    { label: "Proveedores", href: "/admin/proveedores", icon: <Building01Icon size={17} /> },
    { label: "Clientes", href: "/admin/clientes", icon: <UserGroupIcon size={17} /> },
    { label: "Comprobantes", href: "/admin/comprobantes", icon: <Invoice01Icon size={17} /> },
    { label: "Entregas", href: "/admin/entregas", icon: <DeliveryTruck01Icon size={17} /> },
    { label: "Conductores", href: "/admin/conductores", icon: <UserCheck01Icon size={17} /> },
    { label: "Reportes", href: "/admin/reportes", icon: <AnalyticsUpIcon size={17} /> },
    { label: "Configuración", href: "/admin/configuracion", icon: <Settings02Icon size={17} /> },
  ];

  const sidebarInner = (
    <div style={{
      width: isMobile ? "250px" : "220px",
      backgroundColor: "#ffffff",
      color: "#1a0f14",
      padding: "18px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh",
      maxHeight: "100vh",
      borderRight: "1px solid #f3e2e8",
      boxSizing: "border-box",
      position: isMobile ? "relative" : "sticky",
      top: 0,
      overflowY: "auto",
      scrollbarWidth: "none"
    }}>
      <div>
        {/* BRAND HEADER COMPACT */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "14px",
          borderBottom: "1px solid #f5eaee",
          marginBottom: "14px"
        }}>
          <div>
            <span style={{ fontSize: "0.52rem", letterSpacing: "2.5px", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", display: "block" }}>
              PANEL ADMIN
            </span>
            <h2 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.2rem", margin: "1px 0 0 0", color: "#1a0f14", fontWeight: "400" }}>
              TATY IMPORT
            </h2>
          </div>

          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            >
              <Cancel01Icon size={18} color="#1a0f14" />
            </button>
          )}
        </div>

        {/* MINIMALIST MENU LINKS */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {menuItems.map((item) => {
            const isActive = activeItem === item.label;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.label);
                  if (isMobile) setMobileOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "7px 10px",
                  borderRadius: "8px",
                  color: isActive ? "#9c3552" : "#55494e",
                  backgroundColor: isActive ? "#fcf0f4" : "transparent",
                  fontSize: "0.76rem",
                  fontWeight: isActive ? "600" : "400",
                  textDecoration: "none",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#faf7f8";
                    e.currentTarget.style.color = "#9c3552";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#55494e";
                  }
                }}
              >
                <span style={{ color: isActive ? "#9c3552" : "#887980", display: "flex", alignItems: "center" }}>
                  {item.icon}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #f5eaee", paddingTop: "12px", marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 8px",
            borderRadius: "6px",
            backgroundColor: "#faf7f8",
            color: "#66585e",
            fontSize: "0.7rem",
            fontWeight: "500",
            textDecoration: "none"
          }}
        >
          🌐 Tienda Pública
        </a>

        <button
          onClick={() => alert("Cerrando sesión...")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 8px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "transparent",
            color: "#dc2626",
            fontSize: "0.7rem",
            fontWeight: "500",
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          <Logout01Icon size={14} color="#dc2626" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TRIGGER BUTTON */}
      {isMobile && (
        <div style={{ position: "fixed", top: "12px", left: "12px", zIndex: 1050 }}>
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #f3e2e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              cursor: "pointer"
            }}
            title="Abrir Menú"
          >
            <Menu01Icon size={18} color="#1a0f14" />
          </button>
        </div>
      )}

      {/* DESKTOP STICKY SIDEBAR INTACT */}
      {!isMobile && (
        <aside style={{ position: "sticky", top: 0, height: "100vh", flexShrink: 0, zIndex: 50 }}>
          {sidebarInner}
        </aside>
      )}

      {/* MOBILE DRAWER MODAL */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(26, 15, 20, 0.4)",
                zIndex: 1100,
                backdropFilter: "blur(2px)"
              }}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              style={{ position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 1101 }}
            >
              {sidebarInner}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

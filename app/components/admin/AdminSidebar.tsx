"use client";

import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import { authService } from "../../services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DashboardSquare01Icon, 
  ShoppingBag01Icon, 
  GridIcon,
  UserGroupIcon, 
  Building01Icon,
  Invoice01Icon,
  UserIcon,
  Logout01Icon,
  DeliveryTruck01Icon,
  UserCheck01Icon,
  AnalyticsUpIcon,
  Settings02Icon,
  Menu01Icon,
  Cancel01Icon,
  BarCode02Icon
} from "hugeicons-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: <DashboardSquare01Icon size={17} />, activeColor: "#9c3552" },
    { label: "Productos", href: "/admin/productos", icon: <ShoppingBag01Icon size={17} />, activeColor: "#9c3552" },
    { label: "Compras", href: "/admin/compras", icon: <DeliveryTruck01Icon size={17} />, activeColor: "#9c3552" },
    { label: "Proveedores", href: "/admin/proveedores", icon: <Building01Icon size={17} />, activeColor: "#9c3552" },
    { label: "Clientes", href: "/admin/clientes", icon: <UserGroupIcon size={17} />, activeColor: "#9c3552" },
    { label: "Comprobantes", href: "/admin/comprobantes", icon: <Invoice01Icon size={17} />, activeColor: "#9c3552" },
    { label: "Entregas", href: "/admin/entregas", icon: <DeliveryTruck01Icon size={17} />, activeColor: "#9c3552" },
    { label: "Reportes", href: "/admin/reportes", icon: <AnalyticsUpIcon size={17} />, activeColor: "#9c3552" },
    { label: "Configuración", href: "/admin/configuracion", icon: <Settings02Icon size={17} />, activeColor: "#9c3552" },
  ];

  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const sidebarInner = (
    <div style={{
      width: isMobile ? "250px" : "220px",
      backgroundColor: "#ffffff",
      color: "#1a0f14",
      padding: "20px 14px",
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
          paddingBottom: "16px",
          borderBottom: "1px solid #f3e2e8",
          marginBottom: "16px"
        }}>
          <div>
            <span style={{ fontSize: "0.52rem", letterSpacing: "2.5px", fontWeight: "800", color: "#9c3552", textTransform: "uppercase", display: "block" }}>
              PANEL ADMIN
            </span>
            <h2 style={{ fontSize: "1.25rem", margin: "2px 0 0 0", color: "#1a0f14", fontWeight: "400" }}>
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

        {/* ERGONOMIC DARK SIDEBAR MENU LINKS */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {menuItems.map((item) => {
            const active = isItemActive(item.href);

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  if (isMobile) setMobileOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  fontSize: "0.76rem",
                  fontWeight: active ? "700" : "600",
                  color: active ? "#9c3552" : "#66585e",
                  backgroundColor: active ? "#fcf0f4" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  borderLeft: active ? `3px solid ${item.activeColor}` : "3px solid transparent"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: active ? item.activeColor : "#887980", display: "flex" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {active && (
                  <motion.div
                    layoutId="darkSidebarActiveDot"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: item.activeColor
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* FOOTER USER PROFILE */}
      <div style={{ borderTop: "1px solid #f3e2e8", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fcf0f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserIcon size={16} color="#9c3552" />
          </div>
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>{authService.getCurrentUser()?.nombre || "Admin"}</h4>
            <span style={{ fontSize: "0.6rem", color: "#66585e", display: "block", marginTop: "2px" }}>{authService.getCurrentUser()?.rol || "ADMIN"}</span>
          </div>
        </div>
        <button onClick={() => authService.logout()} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }} title="Cerrar Sesión">
          <Logout01Icon size={18} color="#ef4444" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      {!isMobile && sidebarInner}

      {/* MOBILE BAR TOGGLE */}
      {isMobile && (
        <>
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "50px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #f3e2e8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            zIndex: 999
          }}>
            <span style={{ fontSize: "1.1rem", color: "#1a0f14" }}>
              TATY IMPORT
            </span>

            <button
              onClick={() => setMobileOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}
            >
              <Menu01Icon size={20} color="#1a0f14" />
            </button>
          </div>

          {/* MOBILE DRAWER */}
          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    zIndex: 1000,
                    backdropFilter: "blur(2px)"
                  }}
                />

                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 1001
                  }}
                >
                  {sidebarInner}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

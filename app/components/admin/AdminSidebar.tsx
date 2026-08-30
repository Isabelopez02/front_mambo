"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
    { label: "Dashboard", href: "/admin", icon: <DashboardSquare01Icon size={17} />, activeColor: "#3b82f6" },
    { label: "Productos", href: "/admin/productos", icon: <ShoppingBag01Icon size={17} />, activeColor: "#10b981" },
    { label: "Compras", href: "/admin/compras", icon: <DeliveryTruck01Icon size={17} />, activeColor: "#f59e0b" },
    { label: "Proveedores", href: "/admin/proveedores", icon: <Building01Icon size={17} />, activeColor: "#f43f5e" },
    { label: "Clientes", href: "/admin/clientes", icon: <UserGroupIcon size={17} />, activeColor: "#14b8a6" },
    { label: "Comprobantes", href: "/admin/comprobantes", icon: <Invoice01Icon size={17} />, activeColor: "#0ea5e9" },
    { label: "Entregas", href: "/admin/entregas", icon: <DeliveryTruck01Icon size={17} />, activeColor: "#22c55e" },
    { label: "Conductores", href: "/admin/conductores", icon: <UserCheck01Icon size={17} />, activeColor: "#eab308" },
    { label: "Reportes", href: "/admin/reportes", icon: <AnalyticsUpIcon size={17} />, activeColor: "#d946ef" },
    { label: "Configuración", href: "/admin/configuracion", icon: <Settings02Icon size={17} />, activeColor: "#94a3b8" },
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
      backgroundColor: "#0f172a", // Premium Dark Black / Slate-900
      color: "#f8fafc",
      padding: "20px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh",
      maxHeight: "100vh",
      borderRight: "1px solid #1e293b",
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
          borderBottom: "1px solid #1e293b",
          marginBottom: "16px"
        }}>
          <div>
            <span style={{ fontSize: "0.52rem", letterSpacing: "2.5px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", display: "block" }}>
              PANEL ADMIN
            </span>
            <h2 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.25rem", margin: "2px 0 0 0", color: "#ffffff", fontWeight: "400" }}>
              TATY IMPORT
            </h2>
          </div>

          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            >
              <Cancel01Icon size={18} color="#ffffff" />
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
                  fontWeight: active ? "700" : "500",
                  color: active ? "#ffffff" : "#94a3b8",
                  backgroundColor: active ? "#1e293b" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  borderLeft: active ? `3px solid ${item.activeColor}` : "3px solid transparent"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: active ? item.activeColor : "#64748b", display: "flex" }}>
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

      {/* FOOTER USER PROFILE REMOVED PER USER UX SPECIFICATION */}
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
            backgroundColor: "#0f172a",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            zIndex: 999
          }}>
            <span style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.1rem", color: "#ffffff" }}>
              TATY IMPORT
            </span>

            <button
              onClick={() => setMobileOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}
            >
              <Menu01Icon size={20} color="#ffffff" />
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

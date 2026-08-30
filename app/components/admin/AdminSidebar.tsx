"use client";

import React from "react";
import { 
  DashboardSquare01Icon, 
  ShoppingBag01Icon, 
  UserGroupIcon, 
  Store01Icon,
  Settings02Icon
} from "hugeicons-react";

export function AdminSidebar() {
  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: <DashboardSquare01Icon size={18} /> },
    { label: "Productos", href: "/admin/productos", icon: <ShoppingBag01Icon size={18} /> },
    { label: "Locales", href: "/admin/locales", icon: <Store01Icon size={18} /> },
    { label: "Clientes", href: "/admin/clientes", icon: <UserGroupIcon size={18} /> },
    { label: "Configuración", href: "/admin/configuracion", icon: <Settings02Icon size={18} /> },
  ];

  return (
    <aside style={{
      width: "240px",
      backgroundColor: "#1a0f14",
      color: "#ffffff",
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      flexShrink: 0,
      minHeight: "100vh"
    }}>
      <div style={{ padding: "0 8px" }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "2.5px", fontWeight: "700", color: "#e0527f", textTransform: "uppercase" }}>
          PANEL ADMIN
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: "1.3rem", margin: "2px 0 0 0", color: "#ffffff", fontWeight: "400" }}>
          TATY ADMIN
        </h2>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#d0c0c6",
              fontSize: "0.82rem",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.2s ease"
            }}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

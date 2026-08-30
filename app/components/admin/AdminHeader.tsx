"use client";

import React from "react";
import { UserIcon, Notification01Icon } from "hugeicons-react";

export function AdminHeader() {
  return (
    <header style={{
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f3e2e8",
      padding: "16px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
          Panel de Administración
        </h3>
        <span style={{ fontSize: "0.72rem", color: "#66585e" }}>Gestión general de la tienda TATY IMPORTACIONES</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}>
          <Notification01Icon size={18} color="#1a0f14" />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fcf0f4", border: "1px solid #9c3552", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserIcon size={16} color="#9c3552" />
          </div>
          <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#1a0f14" }}>Admin</span>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search01Icon, 
  Building01Icon, 
  BarCode02Icon, 
  CheckmarkBadge01Icon,
  FilterIcon,
  Download01Icon
} from "hugeicons-react";

import { comprasService, CompraProveedorDTO } from "../../services/compras.service";

export default function ComprasAdminPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<CompraProveedorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const historialCompras = await comprasService.listarComprasProveedor();
      setPurchases(historialCompras);
    } catch (err: any) {
      console.error("Error al cargar compras:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPurchases = purchases.filter(p =>
    (p.productoNombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.proveedorNombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(p.id).includes(searchQuery) ||
    (p.sku || "").includes(searchQuery)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
            Compras a Proveedores
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Registro de ingresos, historial de compras y escaneo de unidades
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/compras/nuevaCompra")}
          style={{
            padding: "7px 15px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 2px 6px rgba(15,23,42,0.12)"
          }}
        >
          <BarCode02Icon size={14} color="#ffffff" /> Registrar Nueva Compra
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "10px 14px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <div style={{ position: "relative", width: "280px" }}>
          <input
            type="text"
            placeholder="Buscar por producto, SKU o proveedor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "6px 30px 6px 10px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "0.74rem",
              backgroundColor: "#f8fafc",
              outline: "none"
            }}
          />
          <Search01Icon size={13} color="#64748b" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            style={{
              padding: "5px 10px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.72rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <FilterIcon size={13} color="#475569" /> Filtrar
          </button>

          <button
            type="button"
            style={{
              padding: "5px 10px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.72rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Download01Icon size={13} color="#475569" /> Exportar
          </button>
        </div>
      </div>

      {/* PURCHASES HISTORIAL TABLE */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "14px 16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
      }}>
        {loading ? (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#64748b", fontSize: "0.8rem" }}>
            Consultando registros...
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.78rem" }}>
            No hay compras registradas. Haz clic en <strong>"Registrar Nueva Compra"</strong>.
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={thStyle}>FECHA & HORA</th>
                  <th style={thStyle}>PRODUCTO</th>
                  <th style={thStyle}>PROVEEDOR</th>
                  <th style={{ ...thStyle, textAlign: "center", width: "90px" }}>CANTIDAD</th>
                  <th style={thStyle}>COSTO TOTAL</th>
                  <th style={thStyle}>COSTO UNIT.</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((p) => {
                  const dateObj = p.fechaCompra ? new Date(p.fechaCompra) : new Date();
                  const dateStr = dateObj.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
                  const timeStr = dateObj.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      {/* FECHA Y HORA */}
                      <td style={{ ...tdStyle, padding: "8px 10px" }}>
                        <div>
                          <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.75rem", display: "block" }}>{dateStr}</span>
                          <span style={{ color: "#64748b", fontSize: "0.66rem", display: "block", marginTop: "1px" }}>{timeStr}</span>
                        </div>
                      </td>

                      {/* PRODUCTO & SKU */}
                      <td style={{ ...tdStyle, padding: "8px 10px" }}>
                        <div>
                          <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.78rem" }}>{p.productoNombre}</span>
                          {p.sku && (
                            <div style={{ fontSize: "0.62rem", fontWeight: "700", color: "#475569", fontFamily: "monospace", marginTop: "1px" }}>
                              {p.sku}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* PROVEEDOR */}
                      <td style={{ ...tdStyle, padding: "8px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Building01Icon size={13} color="#64748b" />
                          <span style={{ color: "#334155", fontWeight: "500" }}>{p.proveedorNombre}</span>
                        </div>
                      </td>

                      {/* CANTIDAD: SOLO EL NÚMERO */}
                      <td style={{ ...tdStyle, textAlign: "center", padding: "8px 10px" }}>
                        <span style={{
                          padding: "2px 8px",
                          backgroundColor: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          borderRadius: "10px",
                          fontSize: "0.72rem",
                          fontWeight: "700",
                          color: "#166534",
                          minWidth: "32px",
                          display: "inline-block"
                        }}>
                          {p.cantidad}
                        </span>
                      </td>

                      {/* COSTO TOTAL */}
                      <td style={{ ...tdStyle, padding: "8px 10px", fontWeight: "700", color: "#0f172a" }}>
                        S/ {(p.costoTotal || 0).toFixed(2)}
                      </td>

                      {/* COSTO UNITARIO */}
                      <td style={{ ...tdStyle, padding: "8px 10px", fontWeight: "600", color: "#15803d" }}>
                        S/ {(p.costoUnitario || 0).toFixed(2)}
                      </td>

                      {/* ESTADO CON CHECK */}
                      <td style={{ ...tdStyle, textAlign: "center", padding: "8px 10px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                          <CheckmarkBadge01Icon size={13} color="#166534" /> Completado
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.75rem",
  outline: "none",
  backgroundColor: "#f8fafc",
  color: "#0f172a"
};

const thStyle: React.CSSProperties = {
  padding: "8px 10px",
  fontSize: "0.64rem",
  fontWeight: "700",
  color: "#64748b",
  letterSpacing: "0.04em",
  textTransform: "uppercase"
};

const tdStyle: React.CSSProperties = {
  padding: "8px 10px",
  fontSize: "0.74rem",
  color: "#0f172a",
  verticalAlign: "middle"
};

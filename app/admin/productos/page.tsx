"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag01Icon, 
  Search01Icon, 
  Add01Icon, 
  Building01Icon, 
  AnalyticsUpIcon, 
  Cancel01Icon, 
  Tag01Icon 
} from "hugeicons-react";

interface AdminProductRow {
  id: string;
  nombre: string;
  categoria: string;
  codigo5D: string; // 5 digits base product code
  proveedorNombre: string;
  proveedorId: number;
  precioCompraProveedor: number;
  precioVentaMin: number;
  precioVentaMax: number;
}

const initialAdminProducts: AdminProductRow[] = [
  {
    id: "PROD-001",
    nombre: "Cartera Chic Luxe",
    categoria: "Carteras",
    codigo5D: "77014",
    proveedorNombre: "Importaciones Moda Luxe E.I.R.L.",
    proveedorId: 2,
    precioCompraProveedor: 32.00,
    precioVentaMin: 55.00,
    precioVentaMax: 65.00
  },
  {
    id: "PROD-002",
    nombre: "Kit Maquillaje Glow",
    categoria: "Maquillaje",
    codigo5D: "12343",
    proveedorNombre: "Cosméticos Global S.A.C.",
    proveedorId: 1,
    precioCompraProveedor: 18.00,
    precioVentaMin: 32.00,
    precioVentaMax: 38.00
  },
  {
    id: "PROD-003",
    nombre: "Serum Hidratante Skincare",
    categoria: "Skincare",
    codigo5D: "88029",
    proveedorNombre: "Cosméticos Global S.A.C.",
    proveedorId: 1,
    precioCompraProveedor: 14.50,
    precioVentaMin: 28.00,
    precioVentaMax: 34.00
  },
  {
    id: "PROD-004",
    nombre: "Bolso Shoulder Nude",
    categoria: "Carteras",
    codigo5D: "77015",
    proveedorNombre: "Importaciones Moda Luxe E.I.R.L.",
    proveedorId: 2,
    precioCompraProveedor: 25.00,
    precioVentaMin: 45.00,
    precioVentaMax: 52.00
  },
  {
    id: "PROD-005",
    nombre: "Jarrón Cerámica Deco",
    categoria: "Hogar",
    codigo5D: "66012",
    proveedorNombre: "DecoHogar Import Perú",
    proveedorId: 3,
    precioCompraProveedor: 22.00,
    precioVentaMin: 39.00,
    precioVentaMax: 48.00
  },
  {
    id: "PROD-006",
    nombre: "Reloj Minimal Gold",
    categoria: "Accesorios",
    codigo5D: "99011",
    proveedorNombre: "Importaciones Moda Luxe E.I.R.L.",
    proveedorId: 2,
    precioCompraProveedor: 40.00,
    precioVentaMin: 72.00,
    precioVentaMax: 85.00
  }
];

export default function ProductosAdminPage() {
  const [products, setProducts] = useState<AdminProductRow[]>(initialAdminProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODAS");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State (Stock initial input REMOVED, Code is 5 digits base only)
  const [nombreInput, setNombreInput] = useState("");
  const [catInput, setCatInput] = useState("Maquillaje");
  const [provInput, setProvInput] = useState("Cosméticos Global S.A.C.");
  const [costoCompraInput, setCostoCompraInput] = useState("");
  const [ventaMinInput, setVentaMinInput] = useState("");
  const [ventaMaxInput, setVentaMaxInput] = useState("");
  const [generated5DCode, setGenerated5DCode] = useState("");

  const categories = ["TODAS", "Carteras", "Maquillaje", "Skincare", "Hogar", "Accesorios"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.codigo5D.includes(searchQuery) ||
                          p.proveedorNombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "TODAS" || p.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // GENERATE AUTOMATIC 5-DIGIT BASE PRODUCT CODE
  const handleAutoGenerate5DCode = () => {
    const randomBase5 = Math.floor(10000 + Math.random() * 90000).toString();
    setGenerated5DCode(randomBase5);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreInput || !costoCompraInput) return;

    const final5DCode = generated5DCode || Math.floor(10000 + Math.random() * 90000).toString();

    const newProd: AdminProductRow = {
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      nombre: nombreInput,
      categoria: catInput,
      codigo5D: final5DCode,
      proveedorNombre: provInput,
      proveedorId: 1,
      precioCompraProveedor: parseFloat(costoCompraInput) || 0,
      precioVentaMin: parseFloat(ventaMinInput) || parseFloat(costoCompraInput) * 1.5,
      precioVentaMax: parseFloat(ventaMaxInput) || parseFloat(costoCompraInput) * 2.0
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);

    // Reset Form
    setNombreInput("");
    setCostoCompraInput("");
    setVentaMinInput("");
    setVentaMaxInput("");
    setGenerated5DCode("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1.8px", textTransform: "uppercase" }}>
            CATÁLOGO GENERAL DE TIENDA
          </span>
          <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.35rem", color: "#1a0f14", margin: "2px 0 0 0", fontWeight: "400" }}>
            Productos & Código Base 5D (Precios Compra / Venta Mín / Venta Máx)
          </h1>
        </div>

        <button
          onClick={() => {
            setIsAddModalOpen(true);
            handleAutoGenerate5DCode();
          }}
          style={{
            padding: "9px 16px",
            backgroundColor: "#9c3552",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.74rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(156,53,82,0.2)"
          }}
        >
          <Add01Icon size={16} color="#fff" /> + Registrar Nuevo Producto
        </button>
      </div>

      {/* SEARCH BAR & CATEGORY FILTERS */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #f3e2e8",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div style={{ position: "relative", width: "280px" }}>
          <input
            type="text"
            placeholder="Buscar por producto, código 5D o proveedor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 32px 7px 12px",
              borderRadius: "6px",
              border: "1px solid #e0d0d6",
              fontSize: "0.75rem",
              backgroundColor: "#faf7f8",
              outline: "none"
            }}
          />
          <Search01Icon size={14} color="#9c3552" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        {/* CATEGORY CHIPS */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", overflowX: "auto" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "0.68rem",
                fontWeight: "600",
                cursor: "pointer",
                border: selectedCategory === cat ? "1px solid #9c3552" : "1px solid #e0d0d6",
                backgroundColor: selectedCategory === cat ? "#fcf0f4" : "#ffffff",
                color: selectedCategory === cat ? "#9c3552" : "#66585e"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS TABLE (5-DIGIT BASE CODE ONLY) */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "20px 24px",
        border: "1px solid #f3e2e8",
        boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)"
      }}>
        <div style={{ border: "1px solid #f3e2e8", borderRadius: "10px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.76rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#faf7f8", borderBottom: "1px solid #f3e2e8", textAlign: "left" }}>
                <th style={thStyle}>PRODUCTO & CÓDIGO BASE (5D)</th>
                <th style={thStyle}>PROVEEDOR</th>
                <th style={thStyle}>P. COMPRA (PROV)</th>
                <th style={thStyle}>P. VENTA MÍN.</th>
                <th style={thStyle}>P. VENTA MÁX.</th>
                <th style={thStyle}>MARGEN ESTIMADO</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => {
                const avgVenta = (prod.precioVentaMin + prod.precioVentaMax) / 2;
                const diffGain = avgVenta - prod.precioCompraProveedor;
                const marginPercent = prod.precioCompraProveedor > 0 ? (diffGain / prod.precioCompraProveedor) * 100 : 0;

                return (
                  <tr key={prod.id} style={{ borderBottom: "1px solid #f5eaee" }}>
                    {/* PRODUCTO & CÓDIGO BASE 5D */}
                    <td style={tdStyle}>
                      <div>
                        <strong style={{ color: "#1a0f14", fontSize: "0.82rem" }}>{prod.nombre}</strong>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                          <span style={{ fontSize: "0.62rem", backgroundColor: "#fcf0f4", color: "#9c3552", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>
                            {prod.categoria}
                          </span>
                          <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#9c3552", fontWeight: "800", backgroundColor: "#faf7f8", padding: "1px 6px", borderRadius: "4px", border: "1px solid #e0d0d6" }}>
                            Cód 5D: {prod.codigo5D}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* PROVEEDOR */}
                    <td style={tdStyle}>
                      <a href={`/admin/proveedores/${prod.proveedorId}`} style={{ textDecoration: "none", color: "#9c3552", fontWeight: "600", fontSize: "0.74rem" }}>
                        {prod.proveedorNombre}
                      </a>
                    </td>

                    {/* PRECIO COMPRA PROVEEDOR */}
                    <td style={{ ...tdStyle, fontWeight: "700", color: "#1a0f14" }}>
                      S/ {prod.precioCompraProveedor.toFixed(2)}
                    </td>

                    {/* PRECIO VENTA MÍNIMO */}
                    <td style={{ ...tdStyle, fontWeight: "700", color: "#15803d" }}>
                      S/ {prod.precioVentaMin.toFixed(2)}
                    </td>

                    {/* PRECIO VENTA MÁXIMO */}
                    <td style={{ ...tdStyle, fontWeight: "800", color: "#047857" }}>
                      S/ {prod.precioVentaMax.toFixed(2)}
                    </td>

                    {/* MARGEN DE GANANCIA */}
                    <td style={tdStyle}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "0.68rem", fontWeight: "800", color: "#15803d", backgroundColor: "#ecfdf5", padding: "3px 8px", borderRadius: "4px" }}>
                        <AnalyticsUpIcon size={12} color="#15803d" /> +{marginPercent.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL REGISTRAR NUEVO PRODUCTO CON CÓDIGO BASE 5D (SIN STOCK INICIAL) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(26, 15, 20, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "90%",
                maxWidth: "480px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #f3e2e8"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase" }}>GENERACIÓN AUTOMÁTICA DE CÓDIGO BASE 5D</span>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: "2px 0 0 0" }}>Registrar Nuevo Producto</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#1a0f14" />
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                
                {/* 5-DIGIT BASE CODE GENERATOR DISPLAY */}
                <div style={{
                  backgroundColor: "#fcf0f4",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  border: "1px solid #f3c2d4",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", display: "block" }}>CÓDIGO BASE PRODUCTO (5 DÍGITOS)</span>
                    <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Se asignará al producto base</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <strong style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#9c3552" }}>
                      {generated5DCode || "58491"}
                    </strong>

                    <button
                      type="button"
                      onClick={handleAutoGenerate5DCode}
                      style={{
                        padding: "3px 8px",
                        backgroundColor: "#9c3552",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "0.62rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      ⚡ Regenerar
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Nombre del Producto</label>
                  <input type="text" required placeholder="Ej. Lentes Sun Luxe" value={nombreInput} onChange={(e) => setNombreInput(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Categoría</label>
                    <select value={catInput} onChange={(e) => setCatInput(e.target.value)} style={inputStyle}>
                      <option value="Carteras">Carteras</option>
                      <option value="Maquillaje">Maquillaje</option>
                      <option value="Skincare">Skincare</option>
                      <option value="Hogar">Hogar</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Proveedor Suministrador</label>
                    <input type="text" required placeholder="Ej. Cosméticos Global S.A.C." value={provInput} onChange={(e) => setProvInput(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                {/* PRICING BREAKDOWN INPUTS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>P. Compra (Prov)</label>
                    <input type="number" step="0.10" required placeholder="20.00" value={costoCompraInput} onChange={(e) => setCostoCompraInput(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>P. Venta Mín.</label>
                    <input type="number" step="0.10" required placeholder="35.00" value={ventaMinInput} onChange={(e) => setVentaMinInput(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#047857", textTransform: "uppercase", marginBottom: "4px" }}>P. Venta Máx.</label>
                    <input type="number" step="0.10" required placeholder="42.00" value={ventaMaxInput} onChange={(e) => setVentaMaxInput(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#1a0f14", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "6px" }}>
                  GUARDAR PRODUCTO CON CÓDIGO BASE ({generated5DCode || "58491"})
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #e0d0d6",
  fontSize: "0.75rem",
  outline: "none",
  backgroundColor: "#faf7f8",
  color: "#1a0f14"
};

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: "0.65rem",
  fontWeight: "700",
  color: "#9c3552",
  letterSpacing: "0.5px"
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "0.76rem",
  color: "#1a0f14"
};

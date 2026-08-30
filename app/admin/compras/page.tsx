"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DeliveryTruck01Icon, 
  Add01Icon, 
  Cancel01Icon, 
  Search01Icon, 
  Building01Icon, 
  ShoppingBag01Icon, 
  CalculatorIcon, 
  BarCode02Icon, 
  Calendar01Icon,
  CheckmarkBadge01Icon,
  Delete02Icon
} from "hugeicons-react";

// Existing products in system
const existingProductsList = [
  { id: "SYS-001", nombre: "Kit Maquillaje Glow", categoria: "Maquillaje", codigo5D: "12343" },
  { id: "SYS-002", nombre: "Serum Hidratante Skincare", categoria: "Skincare", codigo5D: "88029" },
  { id: "SYS-003", nombre: "Cartera Chic Luxe", categoria: "Carteras", codigo5D: "77014" },
  { id: "SYS-004", nombre: "Bolso Shoulder Nude", categoria: "Carteras", codigo5D: "77015" },
  { id: "SYS-005", nombre: "Jarrón Cerámica Deco", categoria: "Hogar", codigo5D: "66012" },
  { id: "SYS-006", nombre: "Reloj Minimal Gold", categoria: "Accesorios", codigo5D: "99011" }
];

// Existing suppliers list
const existingSuppliersList = [
  { id: 1, nombre: "Cosméticos Global S.A.C.", ruc: "20601234567" },
  { id: 2, nombre: "Importaciones Moda Luxe E.I.R.L.", ruc: "20549876543" },
  { id: 3, nombre: "DecoHogar Import Perú", ruc: "20491827364" }
];

export interface PurchaseRecord {
  id: string;
  fecha: string;
  productoNombre: string;
  proveedorNombre: string;
  codigosEscaneadosCount: number;
  codigosLista: string[];
  costoTotalPagado: number;
  costoUnitarioPromedio: number;
  estado: string;
}

const initialPurchases: PurchaseRecord[] = [
  {
    id: "COMP-2026-001",
    fecha: "30 ago 2026",
    productoNombre: "Kit Maquillaje Glow",
    proveedorNombre: "Cosméticos Global S.A.C.",
    codigosEscaneadosCount: 15,
    codigosLista: ["QR-ABC101", "QR-ABC102", "QR-ABC103", "QR-ABC104", "QR-ABC105"],
    costoTotalPagado: 120.00,
    costoUnitarioPromedio: 8.00,
    estado: "Completado"
  },
  {
    id: "COMP-2026-002",
    fecha: "28 ago 2026",
    productoNombre: "Cartera Chic Luxe",
    proveedorNombre: "Importaciones Moda Luxe E.I.R.L.",
    codigosEscaneadosCount: 10,
    codigosLista: ["770144501", "770144502", "770144503"],
    costoTotalPagado: 320.00,
    costoUnitarioPromedio: 32.00,
    estado: "Completado"
  },
  {
    id: "COMP-2026-003",
    fecha: "25 ago 2026",
    productoNombre: "Serum Hidratante Skincare",
    proveedorNombre: "Cosméticos Global S.A.C.",
    codigosEscaneadosCount: 20,
    codigosLista: ["SRM-8801", "SRM-8802"],
    costoTotalPagado: 290.00,
    costoUnitarioPromedio: 14.50,
    estado: "Completado"
  }
];

export default function ComprasAdminPage() {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(initialPurchases);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Drawer state for new purchase
  const [isNewPurchaseModalOpen, setIsNewPurchaseModalOpen] = useState(false);

  // Form State inside Purchase Modal
  const [selectedProductId, setSelectedProductId] = useState(existingProductsList[0].id);
  const [selectedSupplierId, setSelectedSupplierId] = useState(existingSuppliersList[0].id.toString());
  const [scannedCodeInput, setScannedCodeInput] = useState("");
  const [scannedCodesList, setScannedCodesList] = useState<string[]>([]);
  const [totalCostPaidInput, setTotalCostPaidInput] = useState("120.00");

  const codeInputRef = useRef<HTMLInputElement>(null);

  // Selected Product & Supplier Object
  const selectedProdObj = useMemo(() => {
    return existingProductsList.find(p => p.id === selectedProductId) || existingProductsList[0];
  }, [selectedProductId]);

  const selectedSupObj = useMemo(() => {
    return existingSuppliersList.find(s => s.id.toString() === selectedSupplierId) || existingSuppliersList[0];
  }, [selectedSupplierId]);

  // Total Codes Count
  const totalScannedCodesCount = scannedCodesList.length;

  // AUTOMATIC COSTO UNITARIO CALCULATION: Total Paid ÷ Total Scanned Codes
  const calculatedUnitCost = useMemo(() => {
    const totalPaid = parseFloat(totalCostPaidInput) || 0;
    if (totalScannedCodesCount > 0 && totalPaid >= 0) {
      return (totalPaid / totalScannedCodesCount).toFixed(2);
    }
    return "0.00";
  }, [totalCostPaidInput, totalScannedCodesCount]);

  // Simulate scanning code
  const handleSimulateScanCode = () => {
    if (codeInputRef.current) codeInputRef.current.focus();
    const generated = `QR-${selectedProdObj.codigo5D}-${Math.floor(1000 + Math.random() * 9000)}`;
    setScannedCodeInput(generated);
  };

  // Add scanned code to list
  const handleAddScannedCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = scannedCodeInput.trim() || `QR-${selectedProdObj.codigo5D}-${Math.floor(1000 + Math.random() * 9000)}`;
    setScannedCodesList(prev => [code, ...prev]);
    setScannedCodeInput("");
    if (codeInputRef.current) codeInputRef.current.focus();
  };

  // Remove code from list
  const handleRemoveCode = (idx: number) => {
    setScannedCodesList(prev => prev.filter((_, i) => i !== idx));
  };

  // SUBMIT PURCHASE REGISTRATION
  const handleRegisterPurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedCodesList.length === 0) return;

    const totalPaidNum = parseFloat(totalCostPaidInput) || 0;
    const unitCostNum = parseFloat(calculatedUnitCost) || 0;

    const newRecord: PurchaseRecord = {
      id: `COMP-2026-00${purchases.length + 1}`,
      fecha: "30 ago 2026",
      productoNombre: selectedProdObj.nombre,
      proveedorNombre: selectedSupObj.nombre,
      codigosEscaneadosCount: totalScannedCodesCount,
      codigosLista: scannedCodesList,
      costoTotalPagado: totalPaidNum,
      costoUnitarioPromedio: unitCostNum,
      estado: "Completado"
    };

    setPurchases([newRecord, ...purchases]);
    setIsNewPurchaseModalOpen(false);

    // Reset Form
    setScannedCodesList([]);
    setScannedCodeInput("");
    setTotalCostPaidInput("120.00");
  };

  const filteredPurchases = purchases.filter(p =>
    p.productoNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.proveedorNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1.8px", textTransform: "uppercase" }}>
            GESTIÓN DE COMPRAS E INVENTARIO
          </span>
          <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.35rem", color: "#1a0f14", margin: "2px 0 0 0", fontWeight: "400" }}>
            Escaneo de Códigos de Proveedor & Registro de Costo Total Pagado
          </h1>
        </div>

        <button
          onClick={() => setIsNewPurchaseModalOpen(true)}
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
          <Add01Icon size={16} color="#fff" /> + Registrar Nueva Compra (Escanear)
        </button>
      </div>

      {/* SEARCH BAR & METRICS SUMMARY */}
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
            placeholder="Buscar por ID de compra, producto o proveedor..."
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

        <span style={{ fontSize: "0.75rem", color: "#66585e" }}>
          Mostrando <strong>{filteredPurchases.length}</strong> órdenes de compra registradas
        </span>
      </div>

      {/* PURCHASES HISTORIAL TABLE */}
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
                <th style={thStyle}>ID COMPRA & FECHA</th>
                <th style={thStyle}>PRODUCTO SELECCIONADO</th>
                <th style={thStyle}>PROVEEDOR</th>
                <th style={thStyle}>CÓDIGOS ESCANEADOS</th>
                <th style={thStyle}>COSTO TOTAL PAGADO</th>
                <th style={thStyle}>COSTO UNITARIO PROMEDIO</th>
                <th style={thStyle}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f5eaee" }}>
                  {/* ID COMPRA & FECHA */}
                  <td style={tdStyle}>
                    <div>
                      <strong style={{ color: "#9c3552", fontSize: "0.78rem" }}>{p.id}</strong>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px", color: "#66585e", fontSize: "0.68rem" }}>
                        <Calendar01Icon size={12} color="#9c3552" />
                        <span>{p.fecha}</span>
                      </div>
                    </div>
                  </td>

                  {/* PRODUCTO */}
                  <td style={tdStyle}>
                    <strong style={{ color: "#1a0f14", fontSize: "0.82rem" }}>{p.productoNombre}</strong>
                  </td>

                  {/* PROVEEDOR */}
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Building01Icon size={14} color="#9c3552" />
                      <span style={{ color: "#55494e", fontWeight: "600" }}>{p.proveedorNombre}</span>
                    </div>
                  </td>

                  {/* CÓDIGOS ESCANEADOS */}
                  <td style={tdStyle}>
                    <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "800", backgroundColor: "#fcf0f4", color: "#9c3552" }}>
                      {p.codigosEscaneadosCount} códigos
                    </span>
                  </td>

                  {/* COSTO TOTAL PAGADO */}
                  <td style={{ ...tdStyle, fontWeight: "800", color: "#1a0f14", fontSize: "0.84rem" }}>
                    S/ {p.costoTotalPagado.toFixed(2)}
                  </td>

                  {/* COSTO UNITARIO PROMEDIO */}
                  <td style={{ ...tdStyle, fontWeight: "700", color: "#15803d" }}>
                    S/ {p.costoUnitarioPromedio.toFixed(2)} /un.
                  </td>

                  {/* ESTADO */}
                  <td style={tdStyle}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#ecfdf5", color: "#047857", padding: "3px 8px", borderRadius: "4px" }}>
                      <CheckmarkBadge01Icon size={12} color="#047857" /> {p.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL / DRAWER TO REGISTER NEW PURCHASE WITH CODE SCANNING */}
      <AnimatePresence>
        {isNewPurchaseModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewPurchaseModalOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(26, 15, 20, 0.5)", zIndex: 1200, backdropFilter: "blur(2px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "92%",
                maxWidth: "520px",
                maxHeight: "90vh",
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                padding: "24px",
                zIndex: 1201,
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                border: "1px solid #f3e2e8",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* MODAL HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase" }}>REGISTRO DE INVENTARIO</span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1a0f14", margin: "2px 0 0 0" }}>Registrar Nueva Compra</h3>
                </div>
                <button onClick={() => setIsNewPurchaseModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={20} color="#1a0f14" />
                </button>
              </div>

              {/* MODAL FORM */}
              <form onSubmit={handleRegisterPurchaseSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", flexGrow: 1, paddingRight: "4px" }}>
                
                {/* 1. SELECCIONAR PRODUCTO */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>
                    1. Seleccionar Producto de la Lista
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    style={inputStyle}
                  >
                    {existingProductsList.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre} ({p.categoria}) - Cód 5D: {p.codigo5D}</option>
                    ))}
                  </select>
                </div>

                {/* 2. SELECCIONAR PROVEEDOR */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>
                    2. Seleccionar Proveedor
                  </label>
                  <select
                    value={selectedSupplierId}
                    onChange={(e) => setSelectedSupplierId(e.target.value)}
                    style={inputStyle}
                  >
                    {existingSuppliersList.map(s => (
                      <option key={s.id} value={s.id}>{s.nombre} (RUC: {s.ruc})</option>
                    ))}
                  </select>
                </div>

                {/* 3. ESCANEAR CÓDIGOS DEL PROVEEDOR */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <label style={{ fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase" }}>
                      3. Escanear Código del Proveedor
                    </label>
                    <button
                      type="button"
                      onClick={handleSimulateScanCode}
                      style={{
                        padding: "3px 8px",
                        backgroundColor: "#9c3552",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "0.62rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <BarCode02Icon size={12} color="#fff" /> 📷 Escanear
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      ref={codeInputRef}
                      type="text"
                      placeholder="Haz clic y escanea el código/QR del proveedor..."
                      value={scannedCodeInput}
                      onChange={(e) => setScannedCodeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddScannedCode();
                        }
                      }}
                      style={{ ...inputStyle, flexGrow: 1 }}
                    />

                    <button
                      type="button"
                      onClick={handleAddScannedCode}
                      style={{
                        padding: "7px 12px",
                        backgroundColor: "#1a0f14",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>

                {/* LISTA DE CÓDIGOS ESCANEADOS */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#1a0f14", textTransform: "uppercase" }}>
                      Lista de Códigos Escaneados
                    </span>
                    <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#9c3552", backgroundColor: "#fcf0f4", padding: "2px 8px", borderRadius: "10px" }}>
                      {totalScannedCodesCount} códigos escaneados
                    </span>
                  </div>

                  {scannedCodesList.length === 0 ? (
                    <div style={{ padding: "16px", textAlign: "center", backgroundColor: "#faf7f8", borderRadius: "8px", border: "1px dashed #e0d0d6", color: "#887980", fontSize: "0.74rem" }}>
                      No has escaneado ningún código todavía. Usa el botón "📷 Escanear" o escribe el código.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "120px", overflowY: "auto", backgroundColor: "#faf7f8", padding: "8px", borderRadius: "8px", border: "1px solid #e0d0d6" }}>
                      {scannedCodesList.map((code, idx) => (
                        <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#ffffff", padding: "3px 8px", borderRadius: "4px", border: "1px solid #f3e2e8", fontSize: "0.68rem", fontFamily: "monospace", color: "#9c3552", fontWeight: "700" }}>
                          {code}
                          <button type="button" onClick={() => handleRemoveCode(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px" }}>
                            <Cancel01Icon size={12} color="#dc2626" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* COSTO TOTAL PAGADO Y COSTO UNITARIO AUTOMÁTICO */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>
                    Costo Total Pagado en la Compra (S/.)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    placeholder="120.00"
                    value={totalCostPaidInput}
                    onChange={(e) => setTotalCostPaidInput(e.target.value)}
                    style={{ ...inputStyle, fontSize: "0.85rem", fontWeight: "700", color: "#1a0f14" }}
                  />
                </div>

                {/* AUTOMATIC CALCULATION SUMMARY */}
                <div style={{
                  backgroundColor: "#fcf0f4",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  border: "1px solid #f3c2d4",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CalculatorIcon size={18} color="#9c3552" />
                    <div>
                      <span style={{ fontSize: "0.62rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", display: "block" }}>
                        COSTO UNITARIO PROMEDIO CALCULADO
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "#66585e" }}>
                        Fórmula: S/ {totalCostPaidInput || "0"} ÷ {totalScannedCodesCount} códigos
                      </span>
                    </div>
                  </div>

                  <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "#9c3552" }}>
                    S/ {calculatedUnitCost}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={scannedCodesList.length === 0}
                  style={{
                    width: "100%",
                    padding: "11px",
                    backgroundColor: scannedCodesList.length === 0 ? "#e0d0d6" : "#9c3552",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.76rem",
                    fontWeight: "700",
                    cursor: scannedCodesList.length === 0 ? "not-allowed" : "pointer",
                    marginTop: "6px"
                  }}
                >
                  REGISTRAR COMPRA (S/ {parseFloat(totalCostPaidInput || "0").toFixed(2)})
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

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search01Icon, 
  Building01Icon, 
  CalculatorIcon, 
  BarCode02Icon, 
  Calendar01Icon,
  CheckmarkBadge01Icon,
  Cancel01Icon,
  FilterIcon,
  Download01Icon
} from "hugeicons-react";

import { productosService } from "../../services/productos.service";
import { proveedoresService } from "../../services/proveedores.service";
import { comprasService, CompraProveedorDTO } from "../../services/compras.service";
import { ProductoDTO, ProveedorDTO } from "../../types";

export default function ComprasAdminPage() {
  const [purchases, setPurchases] = useState<CompraProveedorDTO[]>([]);
  const [dbProducts, setDbProducts] = useState<ProductoDTO[]>([]);
  const [dbSuppliers, setDbSuppliers] = useState<ProveedorDTO[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isNewPurchaseModalOpen, setIsNewPurchaseModalOpen] = useState(false);

  // Form State inside Purchase Modal
  const [selectedProductId, setSelectedProductId] = useState<string | number>("");
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | number>("");
  const [scannedCodeInput, setScannedCodeInput] = useState("");
  const [scannedCodesList, setScannedCodesList] = useState<string[]>([]);
  const [totalCostPaidInput, setTotalCostPaidInput] = useState("120.00");

  const codeInputRef = useRef<HTMLInputElement>(null);

  // Load Data directly from Backend MySQL Database (compra_proveedor, productos, proveedores)
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prods, sups, historialCompras] = await Promise.all([
        productosService.getProductos(),
        proveedoresService.listar(),
        comprasService.listarComprasProveedor()
      ]);
      setDbProducts(prods);
      setDbSuppliers(sups);
      setPurchases(historialCompras);

      if (prods.length > 0 && !selectedProductId) {
        setSelectedProductId(prods[0].id || "");
      }
      if (sups.length > 0 && !selectedSupplierId) {
        setSelectedSupplierId(sups[0].id || "");
      }
    } catch (err: any) {
      console.error("Error al cargar datos de la base de datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Selected Product & Supplier Object
  const selectedProdObj = useMemo(() => {
    return dbProducts.find(p => String(p.id) === String(selectedProductId)) || dbProducts[0];
  }, [dbProducts, selectedProductId]);

  const selectedSupObj = useMemo(() => {
    return dbSuppliers.find(s => String(s.id) === String(selectedSupplierId)) || dbSuppliers[0];
  }, [dbSuppliers, selectedSupplierId]);

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
    const skuCode = selectedProdObj?.sku || "10001";
    const generated = `QR-${skuCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    setScannedCodeInput(generated);
  };

  // Add scanned code to list
  const handleAddScannedCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const skuCode = selectedProdObj?.sku || "10001";
    const code = scannedCodeInput.trim() || `QR-${skuCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    setScannedCodesList(prev => [code, ...prev]);
    setScannedCodeInput("");
    if (codeInputRef.current) codeInputRef.current.focus();
  };

  // Remove code from list
  const handleRemoveCode = (idx: number) => {
    setScannedCodesList(prev => prev.filter((_, i) => i !== idx));
  };

  // SUBMIT PURCHASE REGISTRATION TO BACKEND API (POST /api/compras-proveedor -> Almacena en la tabla 'compra_proveedor' en MySQL)
  const handleRegisterPurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedCodesList.length === 0 || !selectedProductId) {
      alert("Debes seleccionar un producto y escanear al menos 1 unidad.");
      return;
    }

    setSubmitting(true);
    try {
      const totalPaidNum = parseFloat(totalCostPaidInput) || 0;

      // 🚀 Guardado en las tablas 'compra_proveedor' y 'codigo_proveedor' en MySQL vía Backend Spring Boot
      const compraGuardada = await comprasService.registrarCompraProveedor(
        selectedProductId,
        selectedSupplierId,
        totalScannedCodesCount,
        totalPaidNum,
        scannedCodesList
      );
      
      setIsNewPurchaseModalOpen(false);

      // Recargar la lista desde la tabla 'compra_proveedor' de la BD MySQL
      await fetchData();

      alert(`✅ ¡Compra guardada en MySQL ('compra_proveedor' y 'codigo_proveedor')!\nSe registraron ${totalScannedCodesCount} códigos escaneados del proveedor y ${totalScannedCodesCount} unidades físicas con series únicas de 5 dígitos.`);

      // Reset Form
      setScannedCodesList([]);
      setScannedCodeInput("");
      setTotalCostPaidInput("120.00");
    } catch (err: any) {
      alert("Error al guardar la compra en la base de datos backend: " + (err.message || "Error inesperado"));
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPurchases = purchases.filter(p =>
    (p.productoNombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.proveedorNombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(p.id).includes(searchQuery) ||
    (p.sku || "").includes(searchQuery)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#d97706", letterSpacing: "1.8px", textTransform: "uppercase" }}>
            TABLA COMPRA_PROVEEDOR (MYSQL)
          </span>
          <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.35rem", color: "#0f172a", margin: "2px 0 0 0", fontWeight: "400" }}>
            Registro & Control de Compras a Proveedores
          </h1>
        </div>

        <button
          onClick={() => {
            fetchData();
            setIsNewPurchaseModalOpen(true);
          }}
          style={{
            padding: "9px 18px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.76rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(15,23,42,0.15)"
          }}
        >
          <BarCode02Icon size={16} color="#ffffff" /> Registrar Nueva Compra
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div style={{ position: "relative", width: "320px" }}>
          <input
            type="text"
            placeholder="Buscar por ID, producto, SKU o proveedor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 32px 7px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "0.75rem",
              backgroundColor: "#f8fafc",
              outline: "none"
            }}
          />
          <Search01Icon size={14} color="#64748b" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            style={{
              padding: "7px 14px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.74rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <FilterIcon size={14} color="#475569" /> Filtrar
          </button>

          <button
            type="button"
            style={{
              padding: "7px 14px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.74rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Download01Icon size={14} color="#475569" /> Exportar
          </button>
        </div>
      </div>

      {/* PURCHASES HISTORIAL TABLE (PERSISTED IN COMPRA_PROVEEDOR MYSQL TABLE) */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "20px 24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#334155" }}>
            Historial de Compras en BD (Tabla: <code>compra_proveedor</code>)
          </span>
          <button
            onClick={fetchData}
            style={{ fontSize: "0.68rem", color: "#059669", background: "none", border: "none", cursor: "pointer", fontWeight: "600" }}
          >
            🔄 Actualizar BD
          </button>
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
            ⏳ Consultando la tabla `compra_proveedor` en MySQL...
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.82rem" }}>
            No hay registros almacenados en la tabla <code>compra_proveedor</code>. Haz clic en <strong>"Registrar Nueva Compra"</strong>.
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.76rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={thStyle}>ID REGISTRO & FECHA</th>
                  <th style={thStyle}>PRODUCTO & SKU (5D)</th>
                  <th style={thStyle}>PROVEEDOR</th>
                  <th style={thStyle}>CANTIDAD COMPRADA</th>
                  <th style={thStyle}>COSTO TOTAL PAGADO</th>
                  <th style={thStyle}>COSTO UNITARIO</th>
                  <th style={thStyle}>ESTADO BD</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={tdStyle}>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "0.78rem" }}>#COMP-PROV-{p.id}</strong>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px", color: "#64748b", fontSize: "0.68rem" }}>
                          <Calendar01Icon size={12} color="#64748b" />
                          <span>{p.fechaCompra ? new Date(p.fechaCompra).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Reciente"}</span>
                        </div>
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "0.82rem" }}>{p.productoNombre}</strong>
                        <div style={{ fontSize: "0.64rem", fontWeight: "800", color: "#475569", fontFamily: "monospace", marginTop: "2px" }}>
                          SKU: {p.sku}
                        </div>
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Building01Icon size={14} color="#64748b" />
                        <span style={{ color: "#334155", fontWeight: "600" }}>{p.proveedorNombre}</span>
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <div>
                        <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "800", backgroundColor: "#fffbeb", color: "#b45309" }}>
                          📦 {p.cantidad} unidades ({p.codigosEscaneados?.length || p.cantidad} cód.)
                        </span>
                        {p.codigosEscaneados && p.codigosEscaneados.length > 0 && (
                          <div style={{ fontSize: "0.62rem", color: "#64748b", fontFamily: "monospace", marginTop: "2px" }}>
                            Ej: {p.codigosEscaneados.slice(0, 2).join(", ")}{p.codigosEscaneados.length > 2 ? "..." : ""}
                          </div>
                        )}
                      </div>
                    </td>

                    <td style={{ ...tdStyle, fontWeight: "800", color: "#0f172a", fontSize: "0.84rem" }}>
                      S/ {(p.costoTotal || 0).toFixed(2)}
                    </td>

                    <td style={{ ...tdStyle, fontWeight: "800", color: "#15803d" }}>
                      S/ {(p.costoUnitario || 0).toFixed(2)} /un.
                    </td>

                    <td style={tdStyle}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "800", backgroundColor: "#f0fdf4", color: "#166534", padding: "4px 9px", borderRadius: "6px", border: "1px solid #bbf7d0" }}>
                        <CheckmarkBadge01Icon size={13} color="#166534" /> {p.estado || "COMPLETADO"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL PARA REGISTRAR NUEVA COMPRA A PROVEEDOR EN MYSQL */}
      <AnimatePresence>
        {isNewPurchaseModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewPurchaseModalOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1200, backdropFilter: "blur(2px)" }}
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
                maxWidth: "540px",
                maxHeight: "90vh",
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                padding: "24px",
                zIndex: 1201,
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#d97706", textTransform: "uppercase" }}>GUARDA EN TABLA COMPRA_PROVEEDOR (MYSQL)</span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: "2px 0 0 0" }}>Registrar Compra a Proveedor</h3>
                </div>
                <button onClick={() => setIsNewPurchaseModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={20} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleRegisterPurchaseSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", flexGrow: 1, paddingRight: "4px" }}>
                
                {/* 1. SELECCIONAR PRODUCTO */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    1. Seleccionar Producto
                  </label>
                  {dbProducts.length === 0 ? (
                    <div style={{ fontSize: "0.74rem", color: "#dc2626" }}>⚠️ No hay productos registrados en la BD. Crea un producto primero.</div>
                  ) : (
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      style={inputStyle}
                    >
                      {dbProducts.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} ({p.categoriaNombre || p.categoria || "General"}) - SKU 5D: {p.sku} | Stock Actual: {p.stock || 0}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* 2. SELECCIONAR PROVEEDOR */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    2. Seleccionar Proveedor
                  </label>
                  {dbSuppliers.length === 0 ? (
                    <div style={{ fontSize: "0.74rem", color: "#dc2626" }}>⚠️ No hay proveedores registrados en la BD. Crea un proveedor primero.</div>
                  ) : (
                    <select
                      value={selectedSupplierId}
                      onChange={(e) => setSelectedSupplierId(e.target.value)}
                      style={inputStyle}
                    >
                      {dbSuppliers.map(s => (
                        <option key={s.id} value={s.id}>{s.nombre} (RUC: {s.ruc})</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* 3. ESCANEAR CÓDIGOS DE UNIDADES */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <label style={{ fontSize: "0.68rem", fontWeight: "700", color: "#475569", textTransform: "uppercase" }}>
                      3. Escanear / Agregar Unidad Física
                    </label>
                    <button
                      type="button"
                      onClick={handleSimulateScanCode}
                      style={{
                        padding: "3px 8px",
                        backgroundColor: "#0f172a",
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
                      placeholder="Haz clic y escanea el código/QR..."
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
                        backgroundColor: "#0f172a",
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
                    <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase" }}>
                      Unidades Escaneadas (Generará Series 5D en BD)
                    </span>
                    <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#b45309", backgroundColor: "#fffbeb", padding: "2px 8px", borderRadius: "10px" }}>
                      {totalScannedCodesCount} unidades
                    </span>
                  </div>

                  {scannedCodesList.length === 0 ? (
                    <div style={{ padding: "16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.74rem" }}>
                      No has escaneado ninguna unidad todavía. Usa "📷 Escanear" o presiona "+ Agregar".
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "110px", overflowY: "auto", backgroundColor: "#f8fafc", padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                      {scannedCodesList.map((code, idx) => (
                        <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#ffffff", padding: "3px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", fontSize: "0.68rem", fontFamily: "monospace", color: "#0f172a", fontWeight: "700" }}>
                          Unidad #{idx + 1}: {code}
                          <button type="button" onClick={() => handleRemoveCode(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px" }}>
                            <Cancel01Icon size={12} color="#dc2626" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* COSTO TOTAL PAGADO */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Costo Total Pagado al Proveedor (S/.)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    placeholder="120.00"
                    value={totalCostPaidInput}
                    onChange={(e) => setTotalCostPaidInput(e.target.value)}
                    style={{ ...inputStyle, fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}
                  />
                </div>

                {/* AUTOMATIC CALCULATION SUMMARY */}
                <div style={{
                  backgroundColor: "#f0fdf4",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  border: "1px solid #bbf7d0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CalculatorIcon size={18} color="#15803d" />
                    <div>
                      <span style={{ fontSize: "0.62rem", fontWeight: "800", color: "#166534", textTransform: "uppercase", display: "block" }}>
                        COSTO UNITARIO PROMEDIO
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "#15803d" }}>
                        Fórmula: S/ {totalCostPaidInput || "0"} ÷ {totalScannedCodesCount} unidades
                      </span>
                    </div>
                  </div>

                  <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "#15803d" }}>
                    S/ {calculatedUnitCost}
                  </span>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "8px 10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.65rem", color: "#475569" }}>
                  ℹ️ Al hacer clic en <strong>GUARDAR EN TABLA COMPRA_PROVEEDOR</strong>, Spring Boot insertará un registro en <code>compra_proveedor</code>, creará {totalScannedCodesCount} unidades en <code>productos_unitarios</code> con series de 5D y actualizará el stock.
                </div>

                <button
                  type="submit"
                  disabled={submitting || scannedCodesList.length === 0}
                  style={{
                    width: "100%",
                    padding: "11px",
                    backgroundColor: submitting || scannedCodesList.length === 0 ? "#cbd5e1" : "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.76rem",
                    fontWeight: "700",
                    cursor: submitting || scannedCodesList.length === 0 ? "not-allowed" : "pointer",
                    marginTop: "4px"
                  }}
                >
                  {submitting ? "⏳ Guardando en MySQL..." : `GUARDAR EN TABLA COMPRA_PROVEEDOR (${totalScannedCodesCount} Unidades)`}
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
  border: "1px solid #cbd5e1",
  fontSize: "0.75rem",
  outline: "none",
  backgroundColor: "#f8fafc",
  color: "#0f172a"
};

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: "0.65rem",
  fontWeight: "700",
  color: "#475569",
  letterSpacing: "0.5px"
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "0.76rem",
  color: "#0f172a"
};

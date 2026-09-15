"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft02Icon, 
  BarCode02Icon, 
  Building01Icon, 
  CalculatorIcon, 
  Cancel01Icon, 
  CheckmarkBadge01Icon,
  PackageIcon,
  ShoppingBag01Icon
} from "hugeicons-react";

import { productosService } from "../../../services/productos.service";
import { proveedoresService } from "../../../services/proveedores.service";
import { comprasService } from "../../../services/compras.service";
import { ProductoDTO, ProveedorDTO } from "../../../types";

export default function NuevaCompraPage() {
  const router = useRouter();

  const [dbProducts, setDbProducts] = useState<ProductoDTO[]>([]);
  const [dbSuppliers, setDbSuppliers] = useState<ProveedorDTO[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState<string | number>("");
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | number>("");
  const [scannedCodeInput, setScannedCodeInput] = useState("");
  const [scannedCodesList, setScannedCodesList] = useState<string[]>([]);
  const [totalCostPaidInput, setTotalCostPaidInput] = useState("120.00");

  const codeInputRef = useRef<HTMLInputElement>(null);

  // Load Products & Suppliers
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prods, sups] = await Promise.all([
        productosService.getProductos(),
        proveedoresService.listar()
      ]);
      setDbProducts(prods);
      setDbSuppliers(sups);

      if (prods.length > 0) setSelectedProductId(prods[0].id || "");
      if (sups.length > 0) setSelectedSupplierId(sups[0].id || "");
    } catch (err: any) {
      console.error("Error al cargar productos/proveedores:", err);
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

  // AUTOMATIC COSTO UNITARIO CALCULATION
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

  // SUBMIT PURCHASE REGISTRATION TO BACKEND API
  const handleRegisterPurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedCodesList.length === 0 || !selectedProductId) {
      alert("Debes seleccionar un producto y escanear al menos 1 unidad.");
      return;
    }

    setSubmitting(true);
    try {
      const totalPaidNum = parseFloat(totalCostPaidInput) || 0;

      await comprasService.registrarCompraProveedor(
        selectedProductId,
        selectedSupplierId,
        totalScannedCodesCount,
        totalPaidNum,
        scannedCodesList
      );

      alert(`✅ ¡Compra guardada exitosamente!\nSe registraron ${totalScannedCodesCount} unidades de ${selectedProdObj?.nombre || "producto"}.`);
      router.push("/admin/compras");
    } catch (err: any) {
      alert("Error al guardar la compra: " + (err.message || "Error inesperado"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1050px", margin: "0 auto" }}>
      
      {/* HEADER SECTION & BREADCRUMB */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <button
            onClick={() => router.push("/admin/compras")}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
              marginBottom: "4px"
            }}
          >
            <ArrowLeft02Icon size={14} color="#64748b" /> Volver a Compras
          </button>

          <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
            Registrar Nueva Compra a Proveedor
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Ingreso de mercadería, escaneo de unidades físicas y actualización de stock en sistema
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => router.push("/admin/compras")}
            style={{
              padding: "7px 14px",
              backgroundColor: "#ffffff",
              color: "#475569",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>

          <button
            onClick={handleRegisterPurchaseSubmit}
            disabled={submitting || scannedCodesList.length === 0}
            style={{
              padding: "7px 16px",
              backgroundColor: submitting || scannedCodesList.length === 0 ? "#cbd5e1" : "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: submitting || scannedCodesList.length === 0 ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 6px rgba(15,23,42,0.12)"
            }}
          >
            <CheckmarkBadge01Icon size={15} color="#ffffff" />
            {submitting ? "Guardando..." : "Guardar Compra"}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b", fontSize: "0.82rem", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          Cargando catálogo de productos y proveedores...
        </div>
      ) : (
        <form onSubmit={handleRegisterPurchaseSubmit} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px" }}>
          
          {/* COLUMNA IZQUIERDA: DATOS DEL PRODUCTO, PROVEEDOR Y UNIDADES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* SECCIÓN 1: SELECCIÓN */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "18px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
              <h2 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                <PackageIcon size={16} color="#0f172a" /> Datos del Producto & Proveedor
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* PRODUCTO */}
                <div>
                  <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                    Producto a Ingresar
                  </label>
                  {dbProducts.length === 0 ? (
                    <div style={{ fontSize: "0.74rem", color: "#dc2626" }}>⚠️ Sin productos en BD</div>
                  ) : (
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      style={inputStyle}
                    >
                      {dbProducts.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} ({p.categoriaNombre || p.categoria || "General"}) - SKU: {p.sku}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* PROVEEDOR */}
                <div>
                  <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                    Proveedor
                  </label>
                  {dbSuppliers.length === 0 ? (
                    <div style={{ fontSize: "0.74rem", color: "#dc2626" }}>⚠️ Sin proveedores en BD</div>
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
              </div>

              {/* TARJETA INFORMATIVA DEL PRODUCTO SELECCIONADO */}
              {selectedProdObj && (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "14px", backgroundColor: "#f8fafc", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selectedProdObj.img ? (
                      <img src={selectedProdObj.img} alt={selectedProdObj.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <ShoppingBag01Icon size={18} color="#94a3b8" />
                    )}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0f172a", display: "block" }}>{selectedProdObj.nombre}</span>
                    <div style={{ display: "flex", gap: "8px", marginTop: "2px", fontSize: "0.65rem", color: "#64748b" }}>
                      <span>SKU: <strong style={{ fontFamily: "monospace", color: "#334155" }}>{selectedProdObj.sku}</strong></span>
                      <span>Stock Actual: <strong>{selectedProdObj.stock || 0}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: ESCANEO Y LISTA DE UNIDADES */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "18px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                    <BarCode02Icon size={16} color="#0f172a" /> Escanear & Agregar Unidades Físicas
                  </h2>
                  <p style={{ fontSize: "0.68rem", color: "#64748b", margin: "2px 0 0 0" }}>
                    Cada escaneo asigna una serie única de 5 dígitos en el sistema
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateScanCode}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "0.68rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <BarCode02Icon size={13} color="#fff" /> Escanear
                </button>
              </div>

              {/* CAMPO DE ENTRADA */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <input
                  ref={codeInputRef}
                  type="text"
                  placeholder="Escanea el código de barras o QR..."
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
                    padding: "7px 14px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.74rem",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  + Agregar
                </button>
              </div>

              {/* LISTA DE CÓDIGOS ESCANEADOS */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.64rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                    Unidades Registradas
                  </span>
                  <span style={{ fontSize: "0.72rem", fontWeight: "700", color: "#166534", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "1px 8px", borderRadius: "10px" }}>
                    {totalScannedCodesCount} unidades
                  </span>
                </div>

                {scannedCodesList.length === 0 ? (
                  <div style={{ padding: "28px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.75rem" }}>
                    No has escaneado ninguna unidad todavía. Usa "Escanear" o escribe el código manual.
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px", maxHeight: "240px", overflowY: "auto", backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    {scannedCodesList.map((code, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#ffffff",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.7rem"
                        }}
                      >
                        <div style={{ overflow: "hidden" }}>
                          <span style={{ display: "block", fontSize: "0.58rem", fontWeight: "700", color: "#64748b" }}>Unidad #{idx + 1}</span>
                          <span style={{ fontFamily: "monospace", fontWeight: "700", color: "#0f172a" }}>{code}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCode(idx)}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <Cancel01Icon size={14} color="#dc2626" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* COLUMNA DERECHA: RESUMEN FINANCIERO & FINALIZAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "18px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
              <h2 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                <CalculatorIcon size={16} color="#0f172a" /> Resumen Financiero
              </h2>

              {/* COSTO TOTAL PAGADO */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Costo Total Pagado (S/.)
                </label>
                <input
                  type="number"
                  step="0.10"
                  required
                  placeholder="120.00"
                  value={totalCostPaidInput}
                  onChange={(e) => setTotalCostPaidInput(e.target.value)}
                  style={{ ...inputStyle, fontSize: "0.95rem", fontWeight: "700", color: "#0f172a", padding: "8px 12px" }}
                />
              </div>

              {/* DESGLOSE */}
              <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "12px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.74rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Proveedor:</span>
                  <strong style={{ color: "#0f172a" }}>{selectedSupObj?.nombre || "Sin seleccionar"}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Unidades a Ingresar:</span>
                  <strong style={{ color: "#0f172a" }}>{totalScannedCodesCount}</strong>
                </div>

                <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#166534", textTransform: "uppercase" }}>Costo Unit. Promedio:</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#15803d" }}>
                    S/ {calculatedUnitCost}
                  </span>
                </div>
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
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  cursor: submitting || scannedCodesList.length === 0 ? "not-allowed" : "pointer",
                  marginTop: "16px",
                  boxShadow: "0 2px 6px rgba(15,23,42,0.12)"
                }}
              >
                {submitting ? "Guardando Compra..." : `GUARDAR COMPRA (${totalScannedCodesCount} UNIDADES)`}
              </button>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "7px 10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.74rem",
  outline: "none",
  backgroundColor: "#f8fafc",
  color: "#0f172a"
};

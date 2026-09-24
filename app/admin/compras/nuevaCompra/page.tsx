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
              color: "#66585e",
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
            <ArrowLeft02Icon size={14} color="#66585e" /> Volver a Compras
          </button>

          <span style={{ display: "block", fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: "8px" }}>
            INGRESO DE MERCADERÍA
          </span>
          <h1 style={{ fontSize: "1.35rem", fontWeight: "400", color: "#1a0f14", margin: "2px 0 0 0" }}>
            Registrar Compra a Proveedor
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => router.push("/admin/compras")}
            style={{
              padding: "7px 14px",
              backgroundColor: "#ffffff",
              color: "#44383d",
              border: "1px solid #f3e2e8",
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
              backgroundColor: submitting || scannedCodesList.length === 0 ? "#f3e2e8" : "#9c3552",
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
        <div style={{ padding: "40px", textAlign: "center", color: "#66585e", fontSize: "0.82rem", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f3e2e8" }}>
          Cargando catálogo de productos y proveedores...
        </div>
      ) : (
        <form onSubmit={handleRegisterPurchaseSubmit} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px" }}>
          
          {/* COLUMNA IZQUIERDA: DATOS DEL PRODUCTO, PROVEEDOR Y UNIDADES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
            {/* SECCIÓN 1: SELECCIÓN */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px", border: "1px solid #f3e2e8", boxShadow: "0 4px 12px rgba(156, 53, 82, 0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #fcf0f4" }}>
                <div style={{ padding: "6px", backgroundColor: "#fcf0f4", borderRadius: "8px" }}>
                  <PackageIcon size={18} color="#9c3552" />
                </div>
                <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>Datos de Ingreso</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* PRODUCTO */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#66585e", textTransform: "uppercase", marginBottom: "6px" }}>
                    Producto a Ingresar
                  </label>
                  {dbProducts.length === 0 ? (
                    <div style={{ fontSize: "0.74rem", color: "#dc2626" }}>⚠️ Sin productos en BD</div>
                  ) : (
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      style={{ ...inputStyle, backgroundColor: "#faf7f8", borderColor: "#f3e2e8", padding: "10px 12px" }}
                    >
                      {dbProducts.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} ({p.categoriaNombre || p.categoria || "General"})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* PROVEEDOR */}
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", color: "#66585e", textTransform: "uppercase", marginBottom: "6px" }}>
                    Proveedor
                  </label>
                  {dbSuppliers.length === 0 ? (
                    <div style={{ fontSize: "0.74rem", color: "#dc2626" }}>⚠️ Sin proveedores en BD</div>
                  ) : (
                    <select
                      value={selectedSupplierId}
                      onChange={(e) => setSelectedSupplierId(e.target.value)}
                      style={{ ...inputStyle, backgroundColor: "#faf7f8", borderColor: "#f3e2e8", padding: "10px 12px" }}
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
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "14px", backgroundColor: "#faf7f8", padding: "10px 12px", borderRadius: "8px", border: "1px solid #f3e2e8" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", backgroundColor: "#ffffff", border: "1px solid #f3e2e8", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selectedProdObj.img ? (
                      <img src={selectedProdObj.img} alt={selectedProdObj.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <ShoppingBag01Icon size={18} color="#94a3b8" />
                    )}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#1a0f14", display: "block" }}>{selectedProdObj.nombre}</span>
                    <div style={{ display: "flex", gap: "8px", marginTop: "2px", fontSize: "0.65rem", color: "#66585e" }}>
                      <span>SKU: <strong style={{ fontFamily: "monospace", color: "#334155" }}>{selectedProdObj.sku}</strong></span>
                      <span>Stock Actual: <strong>{selectedProdObj.stock || 0}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: ESCANEO Y LISTA DE UNIDADES */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px", border: "1px solid #f3e2e8", boxShadow: "0 4px 12px rgba(156, 53, 82, 0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #fcf0f4" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <div style={{ padding: "4px", backgroundColor: "#fcf0f4", borderRadius: "8px" }}>
                      <BarCode02Icon size={16} color="#9c3552" />
                    </div>
                    <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                      Registro Físico de Unidades
                    </h2>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "#66585e", margin: "0 0 0 34px" }}>
                    Escanea los códigos de barras o ingresa manualmente cada unidad.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateScanCode}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "#9c3552",
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
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
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
                  style={{ ...inputStyle, flexGrow: 1, padding: "10px 12px", fontSize: "0.85rem", borderRadius: "8px", border: "2px solid #f3e2e8", backgroundColor: "#faf7f8", color: "#1a0f14" }}
                />

                <button
                  type="button"
                  onClick={handleAddScannedCode}
                  style={{
                    padding: "0 20px",
                    backgroundColor: "#9c3552",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(156, 53, 82, 0.25)"
                  }}
                >
                  Agregar
                </button>
              </div>

              {/* LISTA DE CÓDIGOS ESCANEADOS */}
              <div style={{ backgroundColor: "#faf7f8", borderRadius: "10px", padding: "12px", border: "1px solid #f3e2e8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: "800", color: "#66585e", textTransform: "uppercase" }}>
                    Unidades Listas
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#9c3552", backgroundColor: "#fcf0f4", border: "1px solid #f3c2d4", padding: "4px 12px", borderRadius: "12px" }}>
                    {totalScannedCodesCount} unidad{totalScannedCodesCount !== 1 ? 'es' : ''}
                  </span>
                </div>

                {scannedCodesList.length === 0 ? (
                  <div style={{ padding: "24px 16px", textAlign: "center", color: "#887980", fontSize: "0.78rem" }}>
                    No hay unidades en esta compra. ¡Escanea la primera!
                  </div>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                    {scannedCodesList.map((code, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#ffffff",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          border: "1px solid #f3c2d4",
                          boxShadow: "0 1px 3px rgba(156, 53, 82, 0.05)"
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", fontFamily: "monospace", fontWeight: "700", color: "#1a0f14", marginRight: "8px" }}>
                          {code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCode(idx)}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Cancel01Icon size={16} color="#dc2626" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* COLUMNA DERECHA: RESUMEN FINANCIERO & FINALIZAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px", border: "1px solid #f3e2e8", boxShadow: "0 4px 12px rgba(156, 53, 82, 0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #fcf0f4" }}>
                <div style={{ padding: "4px", backgroundColor: "#fcf0f4", borderRadius: "8px" }}>
                  <CalculatorIcon size={16} color="#9c3552" />
                </div>
                <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                  Resumen de la Compra
                </h2>
              </div>

              {/* COSTO TOTAL PAGADO */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: "800", color: "#66585e", textTransform: "uppercase", marginBottom: "6px" }}>
                  Monto Total a Pagar (S/.)
                </label>
                <input
                  type="number"
                  step="0.10"
                  required
                  placeholder="0.00"
                  value={totalCostPaidInput}
                  onChange={(e) => setTotalCostPaidInput(e.target.value)}
                  style={{ ...inputStyle, fontSize: "1.1rem", fontWeight: "700", color: "#9c3552", padding: "10px 12px", border: "2px solid #f3e2e8", backgroundColor: "#faf7f8", textAlign: "right" }}
                />
              </div>

              {/* DESGLOSE */}
              <div style={{ backgroundColor: "#faf7f8", borderRadius: "8px", padding: "12px", border: "1px solid #f3e2e8", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.74rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#44383d" }}>
                  <span>Proveedor:</span>
                  <strong style={{ color: "#1a0f14" }}>{selectedSupObj?.nombre || "Sin seleccionar"}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#44383d" }}>
                  <span>Unidades a Ingresar:</span>
                  <strong style={{ color: "#1a0f14" }}>{totalScannedCodesCount}</strong>
                </div>

                <div style={{ height: "1px", backgroundColor: "#f3e2e8" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase" }}>Costo Unit. Promedio:</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#1a0f14" }}>
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
                  backgroundColor: submitting || scannedCodesList.length === 0 ? "#f3e2e8" : "#9c3552",
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
  border: "1px solid #f3e2e8",
  fontSize: "0.74rem",
  outline: "none",
  backgroundColor: "#faf7f8",
  color: "#1a0f14"
};

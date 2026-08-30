"use client";

import React, { useState, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building01Icon, 
  Add01Icon, 
  Cancel01Icon, 
  SmartPhone01Icon, 
  Mail01Icon, 
  ArrowLeft01Icon,
  ShoppingBag01Icon,
  CalculatorIcon,
  Delete02Icon,
  BarCode02Icon,
  Calendar01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Tag01Icon
} from "hugeicons-react";
import { initialSuppliers } from "../page";

// Existing system products with their 10-digit internal store codes
const existingSystemProducts = [
  { id: "SYS-001", codigoInternoTienda: "7701400001", nombre: "Cartera Chic Luxe", categoria: "Carteras", ventaSugerido: 59.00 },
  { id: "SYS-002", codigoInternoTienda: "7701400002", nombre: "Bolso Shoulder Nude", categoria: "Carteras", ventaSugerido: 49.00 },
  { id: "SYS-003", codigoInternoTienda: "1234300001", nombre: "Kit Maquillaje Glow", categoria: "Maquillaje", ventaSugerido: 35.00 },
  { id: "SYS-004", codigoInternoTienda: "8802900001", nombre: "Serum Hidratante Skincare", categoria: "Skincare", ventaSugerido: 29.90 },
  { id: "SYS-005", codigoInternoTienda: "7701400003", nombre: "Mini Backpack Velvet", categoria: "Carteras", ventaSugerido: 62.00 },
  { id: "SYS-006", codigoInternoTienda: "1234300002", nombre: "Paleta Sombras Rose", categoria: "Maquillaje", ventaSugerido: 39.90 },
  { id: "SYS-007", codigoInternoTienda: "6601200001", nombre: "Jarrón Cerámica Deco", categoria: "Hogar", ventaSugerido: 42.00 },
  { id: "SYS-008", codigoInternoTienda: "9901100001", nombre: "Reloj Minimal Gold", categoria: "Accesorio", ventaSugerido: 75.00 }
];

export interface GroupedProduct {
  id: string;
  codigoInternoTienda: string; // 10 digits
  nombre: string;
  categoria: string;
  cantidadTotal: number;
  costoAnterior: number;
  costoActual: number;
  precioVenta: number;
  ultimaCompraFecha: string;
  codigosBarrasProveedor: string[];
}

interface ScannedBatchItem {
  id: string;
  systemProductId: string;
  codigoInternoTienda: string; // 10 digits auto identified
  nombre: string;
  categoria: string;
  codigoBarrasProveedor: string;
  cantidad: number;
  precioVenta: number;
}

const formatFechaSpan = (d: Date = new Date()) => {
  const day = d.getDate();
  const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const initialGroupedProductsMap: Record<number, GroupedProduct[]> = {
  1: [
    { id: "GRP-01", codigoInternoTienda: "1234300001", nombre: "Kit Maquillaje Glow", categoria: "Maquillaje", cantidadTotal: 150, costoAnterior: 21.00, costoActual: 18.00, precioVenta: 35.00, ultimaCompraFecha: "28 jun 2026", codigosBarrasProveedor: ["XYZ987654"] },
    { id: "GRP-02", codigoInternoTienda: "8802900001", nombre: "Serum Hidratante Skincare", categoria: "Skincare", cantidadTotal: 80, costoAnterior: 13.50, costoActual: 14.50, precioVenta: 29.90, ultimaCompraFecha: "15 jul 2026", codigosBarrasProveedor: ["880299302"] }
  ],
  2: [
    { id: "GRP-03", codigoInternoTienda: "7701400001", nombre: "Cartera Chic Luxe", categoria: "Carteras", cantidadTotal: 45, costoAnterior: 35.00, costoActual: 32.00, precioVenta: 59.00, ultimaCompraFecha: "10 ago 2026", codigosBarrasProveedor: ["770144501"] },
    { id: "GRP-04", codigoInternoTienda: "7701400002", nombre: "Bolso Shoulder Nude", categoria: "Carteras", cantidadTotal: 60, costoAnterior: 25.00, costoActual: 25.00, precioVenta: 49.00, ultimaCompraFecha: "02 ago 2026", codigosBarrasProveedor: ["770244602"] }
  ],
  3: [
    { id: "GRP-05", codigoInternoTienda: "6601200001", nombre: "Jarrón Cerámica Deco", categoria: "Hogar", cantidadTotal: 30, costoAnterior: 24.50, costoActual: 22.00, precioVenta: 42.00, ultimaCompraFecha: "20 ago 2026", codigosBarrasProveedor: ["660122301"] }
  ]
};

export default function ProveedorDetailPage() {
  const params = useParams();
  const supplierId = params?.id ? Number(params.id) : 1;

  const baseSupplier = useMemo(() => {
    return initialSuppliers.find(s => s.id === supplierId) || initialSuppliers[0];
  }, [supplierId]);

  const [groupedProducts, setGroupedProducts] = useState<GroupedProduct[]>(() => {
    return initialGroupedProductsMap[supplierId] || initialGroupedProductsMap[1];
  });

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Sidebar State
  const [selectedProductId, setSelectedProductId] = useState(existingSystemProducts[0].id);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("1");
  const [scannedBatchList, setScannedBatchList] = useState<ScannedBatchItem[]>([]);
  const [totalSupplierCostInput, setTotalSupplierCostInput] = useState("120.00");

  const barcodeRef = useRef<HTMLInputElement>(null);

  // Auto-identified product & 10-digit internal store code
  const selectedProductObj = useMemo(() => {
    return existingSystemProducts.find(p => p.id === selectedProductId) || existingSystemProducts[0];
  }, [selectedProductId]);

  const totalQuantityAdded = useMemo(() => {
    return scannedBatchList.reduce((acc, item) => acc + item.cantidad, 0);
  }, [scannedBatchList]);

  // AVERAGE UNIT COST: Total Cost ÷ Total Quantity
  const calculatedUnitCost = useMemo(() => {
    const totalCostNum = parseFloat(totalSupplierCostInput) || 0;
    if (totalQuantityAdded > 0 && totalCostNum >= 0) {
      return (totalCostNum / totalQuantityAdded).toFixed(2);
    }
    return "0.00";
  }, [totalSupplierCostInput, totalQuantityAdded]);

  const handleSimulateBarcodeScan = () => {
    if (barcodeRef.current) barcodeRef.current.focus();
    const generatedBarcode = `XYZ${Math.floor(100000 + Math.random() * 900000)}`;
    setBarcodeInput(generatedBarcode);
  };

  // Add Item to Scanned Batch: Auto links 10-digit store code + scanned supplier code/QR
  const handleAddBatchItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedProductObj) return;

    const codeToUse = barcodeInput.trim() || `XYZ${Math.floor(100000 + Math.random() * 900000)}`;
    const qtyNum = parseInt(itemQtyInput) || 1;

    const newItem: ScannedBatchItem = {
      id: `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      systemProductId: selectedProductObj.id,
      codigoInternoTienda: selectedProductObj.codigoInternoTienda, // Auto identified 10-digit code
      nombre: selectedProductObj.nombre,
      categoria: selectedProductObj.categoria,
      codigoBarrasProveedor: codeToUse,
      cantidad: qtyNum,
      precioVenta: selectedProductObj.ventaSugerido
    };

    setScannedBatchList(prev => [newItem, ...prev]);
    setBarcodeInput("");
    setItemQtyInput("1");
    if (barcodeRef.current) barcodeRef.current.focus();
  };

  const handleRemoveBatchItem = (id: string) => {
    setScannedBatchList(prev => prev.filter(item => item.id !== id));
  };

  // REGISTER BATCH PURCHASE: Preserves 10-digit internal store code & updates supplier QR relationship
  const handleRegisterBatchPurchase = () => {
    if (scannedBatchList.length === 0 || totalQuantityAdded === 0) return;

    const newUnitCost = parseFloat(calculatedUnitCost) || 0;
    const todayFormatted = formatFechaSpan(new Date());

    setGroupedProducts(prevProducts => {
      const updatedMap = new Map<string, GroupedProduct>();

      prevProducts.forEach(prod => {
        updatedMap.set(prod.codigoInternoTienda, { ...prod });
      });

      scannedBatchList.forEach(scannedItem => {
        const key = scannedItem.codigoInternoTienda; // Keyed strictly by 10-digit internal store code
        const existing = updatedMap.get(key);

        if (existing) {
          existing.costoAnterior = existing.costoActual;
          existing.costoActual = newUnitCost;
          existing.cantidadTotal += scannedItem.cantidad;
          existing.ultimaCompraFecha = todayFormatted;
          if (!existing.codigosBarrasProveedor.includes(scannedItem.codigoBarrasProveedor)) {
            existing.codigosBarrasProveedor.push(scannedItem.codigoBarrasProveedor);
          }
        } else {
          updatedMap.set(key, {
            id: `GRP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            codigoInternoTienda: scannedItem.codigoInternoTienda,
            nombre: scannedItem.nombre,
            categoria: scannedItem.categoria,
            cantidadTotal: scannedItem.cantidad,
            costoAnterior: newUnitCost,
            costoActual: newUnitCost,
            precioVenta: scannedItem.precioVenta,
            ultimaCompraFecha: todayFormatted,
            codigosBarrasProveedor: [scannedItem.codigoBarrasProveedor]
          });
        }
      });

      return Array.from(updatedMap.values());
    });

    setIsRightSidebarOpen(false);
    setScannedBatchList([]);
    setBarcodeInput("");
    setTotalSupplierCostInput("120.00");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* BACK BUTTON */}
      <div>
        <a
          href="/admin/proveedores"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.74rem",
            fontWeight: "600",
            color: "#9c3552",
            textDecoration: "none",
            backgroundColor: "#fcf0f4",
            padding: "6px 12px",
            borderRadius: "6px",
            marginBottom: "4px"
          }}
        >
          <ArrowLeft01Icon size={14} color="#9c3552" /> Volver a Lista de Proveedores
        </a>
      </div>

      {/* SUPPLIER DETAILS HEADER */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "20px 24px",
        border: "1px solid #f3e2e8",
        boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#fcf0f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building01Icon size={24} color="#9c3552" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.45rem", color: "#1a0f14", margin: 0, fontWeight: "400" }}>
                {baseSupplier.nombre}
              </h1>
              <span style={{ fontSize: "0.6rem", fontWeight: "700", backgroundColor: "#fcf0f4", color: "#9c3552", padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
                RUC: {baseSupplier.ruc}
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "6px", fontSize: "0.75rem", color: "#55494e", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <SmartPhone01Icon size={13} color="#9c3552" />
                <span>Contacto: <strong>{baseSupplier.contacto}</strong> ({baseSupplier.telefono})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Mail01Icon size={13} color="#9c3552" />
                <span>{baseSupplier.email}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* GROUPED PRODUCTS TABLE (DISPLAYS 10-DIGIT STORE CODE + SUPPLIER BARCODE/QR) */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "20px 24px",
        border: "1px solid #f3e2e8",
        boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f5eaee", paddingBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingBag01Icon size={18} color="#9c3552" />
            <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
              Productos de este Proveedor con Código Interno de Tienda (10d)
            </h3>
          </div>
        </div>

        {groupedProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px", color: "#66585e", backgroundColor: "#faf7f8", borderRadius: "12px", border: "1px dashed #e0d0d6" }}>
            <BarCode02Icon size={36} color="#d0c0c6" style={{ margin: "0 auto 10px auto", display: "block" }} />
            <p style={{ fontSize: "0.85rem", margin: 0 }}>Este proveedor no tiene productos registrados.</p>
          </div>
        ) : (
          <div style={{ border: "1px solid #f3e2e8", borderRadius: "10px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.76rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#faf7f8", borderBottom: "1px solid #f3e2e8", textAlign: "left" }}>
                  <th style={thStyle}>CÓDIGO INTERNO (10D) & PRODUCTO</th>
                  <th style={thStyle}>CÓDIGO / QR PROVEEDOR</th>
                  <th style={thStyle}>CANTIDAD TOTAL</th>
                  <th style={thStyle}>COSTO ANTERIOR</th>
                  <th style={thStyle}>COSTO ACTUAL</th>
                  <th style={thStyle}>VARIACIÓN</th>
                  <th style={thStyle}>ÚLTIMA COMPRA</th>
                </tr>
              </thead>
              <tbody>
                {groupedProducts.map((prod) => {
                  const diff = prod.costoActual - prod.costoAnterior;
                  const varPercent = prod.costoAnterior > 0 ? (diff / prod.costoAnterior) * 100 : 0;
                  const isCostLower = diff < 0;

                  return (
                    <tr key={prod.id} style={{ borderBottom: "1px solid #f5eaee" }}>
                      {/* CÓDIGO INTERNO TIENDA (10D) & PRODUCTO */}
                      <td style={tdStyle}>
                        <div>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#faf7f8", padding: "2px 6px", borderRadius: "4px", border: "1px solid #e0d0d6", marginBottom: "4px" }}>
                            <Tag01Icon size={12} color="#9c3552" />
                            <span style={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: "800", color: "#9c3552" }}>
                              {prod.codigoInternoTienda}
                            </span>
                          </div>
                          <strong style={{ color: "#1a0f14", fontSize: "0.82rem", display: "block" }}>{prod.nombre}</strong>
                          <span style={{ fontSize: "0.62rem", color: "#887980" }}>Categoría: {prod.categoria}</span>
                        </div>
                      </td>

                      {/* CÓDIGO / QR PROVEEDOR */}
                      <td style={tdStyle}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          {prod.codigosBarrasProveedor.map((cb, idx) => (
                            <div key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#fcf0f4", padding: "2px 6px", borderRadius: "4px" }}>
                              <BarCode02Icon size={12} color="#9c3552" />
                              <span style={{ fontFamily: "monospace", fontSize: "0.68rem", fontWeight: "700", color: "#9c3552" }}>
                                {cb}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* CANTIDAD TOTAL */}
                      <td style={tdStyle}>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "0.74rem", fontWeight: "800", backgroundColor: "#fcf0f4", color: "#9c3552" }}>
                          {prod.cantidadTotal} unidades
                        </span>
                      </td>

                      {/* COSTO ANTERIOR */}
                      <td style={tdStyle}>
                        <span style={{ fontWeight: "600", color: "#887980", textDecoration: diff !== 0 ? "line-through" : "none" }}>
                          S/ {prod.costoAnterior.toFixed(2)}
                        </span>
                      </td>

                      {/* COSTO ACTUAL */}
                      <td style={tdStyle}>
                        <span style={{ fontWeight: "800", color: "#1a0f14", fontSize: "0.84rem" }}>
                          S/ {prod.costoActual.toFixed(2)}
                        </span>
                      </td>

                      {/* VARIACIÓN */}
                      <td style={tdStyle}>
                        {diff === 0 ? (
                          <span style={{ fontSize: "0.68rem", color: "#66585e", fontWeight: "600" }}>0%</span>
                        ) : isCostLower ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontSize: "0.68rem", fontWeight: "700", color: "#15803d", backgroundColor: "#ecfdf5", padding: "3px 8px", borderRadius: "4px" }}>
                            <ArrowDown01Icon size={12} color="#15803d" /> {varPercent.toFixed(1)}%
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontSize: "0.68rem", fontWeight: "700", color: "#b91c1c", backgroundColor: "#fef2f2", padding: "3px 8px", borderRadius: "4px" }}>
                            <ArrowUp01Icon size={12} color="#b91c1c" /> +{varPercent.toFixed(1)}%
                          </span>
                        )}
                      </td>

                      {/* ÚLTIMA COMPRA */}
                      <td style={tdStyle}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#faf7f8", padding: "4px 8px", borderRadius: "6px", border: "1px solid #e0d0d6" }}>
                          <Calendar01Icon size={14} color="#9c3552" />
                          <span style={{ fontSize: "0.72rem", fontWeight: "600", color: "#55494e" }}>
                            {prod.ultimaCompraFecha}
                          </span>
                        </div>
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

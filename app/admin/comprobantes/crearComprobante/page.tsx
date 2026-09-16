"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft02Icon, 
  Search01Icon, 
  Add01Icon, 
  Delete02Icon, 
  CheckmarkBadge01Icon,
  CalculatorIcon,
  Tag01Icon,
  ShoppingBag01Icon,
  Calendar01Icon,
  User02Icon,
  Invoice01Icon,
  AlertCircleIcon
} from "hugeicons-react";

import { productosService } from "../../../services/productos.service";
import { ProductoDTO } from "../../../types/producto.dto";
import { clientesService } from "../../../services/clientes.service";
import { ClienteDTO } from "../../../types/cliente.dto";
import { comprobantesService, ComprobanteReqDTO } from "../../../services/comprobantes.service";
import { motion, AnimatePresence } from "framer-motion";

interface ItemDetalleComprobante {
  idTemp: string;
  productoId?: string | number;
  nombre: string;
  sku: string; // Generic SKU (5 digits)
  codigoEscaneado: string; // Full scanned code for exact physical unit
  cantidad: number;
  precioUnitario: number; // Precio manual elegido
  precioMin: number;
  precioMax: number;
  fechaVenta: string; // YYYY-MM-DD
}

export default function CrearComprobantePage() {
  const router = useRouter();

  const [dbProducts, setDbProducts] = useState<ProductoDTO[]>([]);
  const [loadingProds, setLoadingProds] = useState(true);

  // DETALLE COMPROBANTE (PARTE IZQUIERDA)
  const [itemsDetalle, setItemsDetalle] = useState<ItemDetalleComprobante[]>([]);

  // DATOS COMPROBANTE Y CLIENTE
  const [tipoComprobante, setTipoComprobante] = useState<"BOLETA" | "FACTURA">("BOLETA");
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteDoc, setClienteDoc] = useState("");

  // ESTADOS PARA MODAL DE CLIENTES
  const [dbClientes, setDbClientes] = useState<ClienteDTO[]>([]);
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false);
  const [searchDniInput, setSearchDniInput] = useState("");
  const [nuevoClienteNombre, setNuevoClienteNombre] = useState("");
  const [isCreatingClient, setIsCreatingClient] = useState(false);

  // SECCIÓN DE AGREGAR PRODUCTO (PARTE DERECHA)
  const [searchCodigoInput, setSearchCodigoInput] = useState("");
  const [searchNombreInput, setSearchNombreInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductoDTO | null>(null);

  const [precioEstimadoInput, setPrecioEstimadoInput] = useState<string>("");
  const [fechaVentaInput, setFechaVentaInput] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Fetch Products & Clientes from Backend API
  const fetchProducts = async () => {
    setLoadingProds(true);
    try {
      const data = await productosService.getProductos();
      setDbProducts(data);
      if (data.length > 0) {
        handleSelectProduct(data[0]);
      }
    } catch (err) {
      console.error("Error al cargar productos para comprobante:", err);
    } finally {
      setLoadingProds(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const data = await clientesService.listar();
      setDbClientes(data);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchClientes();
  }, []);

  // CALCULATE SALE PRICE BOUNDARIES (PRECIO MINIMO & PRECIO MAXIMO)
  const productPriceBounds = useMemo(() => {
    if (!selectedProduct) return { min: 0, max: 0 };
    const costoCompra = selectedProduct.precioCompraProveedor || (selectedProduct.precio || 0) * 0.6 || 20.00;
    const marginMin = selectedProduct.porcentajeGananciaMin || 30;
    const marginMax = selectedProduct.porcentajeGananciaMax || 50;

    const min = selectedProduct.precioVentaMin || (costoCompra * (1 + marginMin / 100));
    const max = selectedProduct.precioVentaMax || (costoCompra * (1 + marginMax / 100));

    return { min, max };
  }, [selectedProduct]);

  // Handle Product Select
  const handleSelectProduct = (prod: ProductoDTO) => {
    setSelectedProduct(prod);
    setSearchNombreInput(prod.nombre || "");

    const costoCompra = prod.precioCompraProveedor || (prod.precio || 0) * 0.6 || 20.00;
    const marginMin = prod.porcentajeGananciaMin || 30;
    const min = prod.precioVentaMin || (costoCompra * (1 + marginMin / 100));

    // Sugerir el precio de venta estimado
    setPrecioEstimadoInput(min.toFixed(2));
  };

  // FILTERED PRODUCTS BY CODIGO & NOMBRE
  const filteredProducts = useMemo(() => {
    return dbProducts.filter(p => {
      // Comparar con los primeros 5 dígitos (SKU) si el input de código es largo
      const skuBusqueda = searchCodigoInput.substring(0, 5).toLowerCase();
      const matchCodigo = !searchCodigoInput.trim() || (p.sku || "").toLowerCase().includes(skuBusqueda);
      const matchNombre = !searchNombreInput.trim() || p.nombre.toLowerCase().includes(searchNombreInput.toLowerCase());
      return matchCodigo && matchNombre;
    });
  }, [dbProducts, searchCodigoInput, searchNombreInput]);

  // Sync inputs when typing in Codigo Search (using first 5 digits)
  const handleSearchCodigoChange = (val: string) => {
    setSearchCodigoInput(val);
    if (!val.trim()) {
      setSearchNombreInput("");
      setSelectedProduct(null);
      setPrecioEstimadoInput("");
      return;
    }
    const skuBusqueda = val.substring(0, 5).toLowerCase();
    const found = dbProducts.find(p => (p.sku || "").toLowerCase() === skuBusqueda);
    if (found) {
      handleSelectProduct(found);
      setSearchNombreInput(found.nombre || "");
    }
  };

  // Sync inputs when typing in Nombre Search
  const handleSearchNombreChange = (val: string) => {
    setSearchNombreInput(val);
    if (!val.trim()) {
      setSearchCodigoInput("");
      setSelectedProduct(null);
      setPrecioEstimadoInput("");
      return;
    }
    const found = dbProducts.find(p => p.nombre.toLowerCase() === val.trim().toLowerCase());
    if (found) {
      handleSelectProduct(found);
      setSearchCodigoInput(found.sku || "");
    }
  };

  // AGREGAR AL DETALLE (PARTE IZQUIERDA)
  const handleAgregarAlComprobante = () => {
    if (!selectedProduct) {
      alert("Selecciona un producto válido.");
      return;
    }

    const precioVentaNum = parseFloat(precioEstimadoInput) || productPriceBounds.min;
    
    // Auto-increment si existe el mismo SKU
    const existingIndex = itemsDetalle.findIndex(item => item.sku === (selectedProduct.sku || "AUTO"));
    
    if (existingIndex >= 0) {
      setItemsDetalle(prev => {
        const newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          cantidad: newItems[existingIndex].cantidad + 1,
          codigoEscaneado: searchCodigoInput.trim() || newItems[existingIndex].codigoEscaneado // opcional, registrar el ultimo scan
        };
        return newItems;
      });
    } else {
      const newItem: ItemDetalleComprobante = {
        idTemp: `${selectedProduct.id}-${Date.now()}`,
        productoId: selectedProduct.id,
        nombre: selectedProduct.nombre,
        sku: selectedProduct.sku || "AUTO",
        codigoEscaneado: searchCodigoInput.trim() || selectedProduct.sku || "AUTO", // GUARDAR EL CÓDIGO COMPLETO
        cantidad: 1, // Por defecto siempre es 1 en cada inserción
        precioUnitario: precioVentaNum,
        precioMin: productPriceBounds.min,
        precioMax: productPriceBounds.max,
        fechaVenta: fechaVentaInput || new Date().toISOString().split("T")[0]
      };
      setItemsDetalle(prev => [...prev, newItem]);
    }

    // Reset temporal de inputs
    setSearchCodigoInput("");
    setSearchNombreInput("");
    setSelectedProduct(null);
    setPrecioEstimadoInput("");
  };

  // CONTROLES DE LA TABLA DE DETALLE (PARTE IZQUIERDA)
  const handleAumentarCantidad = (idTemp: string) => {
    setItemsDetalle(prev => prev.map(item => 
      item.idTemp === idTemp ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const handleDisminuirCantidad = (idTemp: string) => {
    setItemsDetalle(prev => prev.map(item => 
      item.idTemp === idTemp ? { ...item, cantidad: Math.max(1, item.cantidad - 1) } : item
    ));
  };

  const handleEliminarItem = (idTemp: string) => {
    setItemsDetalle(prev => prev.filter(item => item.idTemp !== idTemp));
  };

  // CALCULOS GENERALES DEL COMPROBANTE
  const subtotalTotal = useMemo(() => {
    return itemsDetalle.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);
  }, [itemsDetalle]);

  const igvTotal = subtotalTotal * 0.18;
  const grandTotal = subtotalTotal + igvTotal;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmitirComprobante = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itemsDetalle.length === 0) {
      alert("Debes agregar al menos 1 producto al detalle del comprobante.");
      return;
    }
    if (!clienteNombre.trim() || !clienteDoc.trim()) {
      alert("Por favor ingresa los datos del cliente (Nombre/Razón Social y DNI/RUC).");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestDTO: ComprobanteReqDTO = {
        tipo: tipoComprobante,
        clienteNombre: clienteNombre,
        clienteNumDoc: clienteDoc,
        tipoDoc: clienteDoc.length > 8 ? "RUC" : "DNI",
        montoTotal: grandTotal,
        detalles: itemsDetalle.map(item => ({
          cantidad: item.cantidad,
          descripcion: item.nombre,
          precioUnitario: item.precioUnitario,
          subtotal: item.cantidad * item.precioUnitario,
          series: item.codigoEscaneado !== "AUTO" ? [item.codigoEscaneado] : []
        }))
      };

      await comprobantesService.emitir(requestDTO);

      alert(`✅ Comprobante (${tipoComprobante}) emitido y guardado exitosamente.\nCliente: ${clienteNombre}\nMonto Total: S/ ${grandTotal.toFixed(2)}`);
      router.push("/admin/comprobantes");
    } catch (err) {
      console.error(err);
      alert("Error al guardar la compra en el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validaciones del precio estimado manual vs límites
  const currentPrecioNum = parseFloat(precioEstimadoInput) || 0;
  const isBelowMin = currentPrecioNum > 0 && currentPrecioNum < productPriceBounds.min;
  const isAboveMax = currentPrecioNum > productPriceBounds.max;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1150px", margin: "0 auto" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <button
            onClick={() => router.push("/admin/comprobantes")}
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
            <ArrowLeft02Icon size={14} color="#64748b" /> Volver a Comprobantes
          </button>

          <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
            Emitir Nuevo Comprobante
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Selección de productos con validación de precios límite y emisión a SUNAT
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#f8fafc", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <Calendar01Icon size={18} color="#475569" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "0.6rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Fecha Venta</label>
            <input
              type="date"
              required
              value={fechaVentaInput}
              onChange={(e) => setFechaVentaInput(e.target.value)}
              style={{ border: "none", background: "transparent", fontSize: "0.8rem", fontWeight: "600", color: "#0f172a", outline: "none", padding: 0 }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => router.push("/admin/comprobantes")}
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
            onClick={handleEmitirComprobante}
            disabled={itemsDetalle.length === 0 || isSubmitting}
            style={{
              padding: "7px 16px",
              backgroundColor: (itemsDetalle.length === 0 || isSubmitting) ? "#cbd5e1" : "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: (itemsDetalle.length === 0 || isSubmitting) ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 6px rgba(15,23,42,0.12)"
            }}
          >
            <CheckmarkBadge01Icon size={15} color="#ffffff" /> {isSubmitting ? "Emitiendo..." : "Emitir Comprobante"}
          </button>
        </div>
      </div>

      {/* MAIN GRID DIVIDIDO EN 2 PARTES */}
      <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: "16px", alignItems: "start" }}>
        
        {/* ============================================================== */}
        {/* PARTE IZQUIERDA: LISTA Y DETALLE DE PRODUCTOS DEL COMPROBANTE  */}
        {/* ============================================================== */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* DATOS DE FACTURACIÓN Y CLIENTE */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            <h3 style={{ fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <User02Icon size={15} color="#0f172a" /> Datos del Cliente & Comprobante
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Tipo Comprobante
                </label>
                <select
                  value={tipoComprobante}
                  onChange={(e) => setTipoComprobante(e.target.value as "BOLETA" | "FACTURA")}
                  style={inputStyle}
                >
                  <option value="BOLETA">Boleta Electrónica</option>
                  <option value="FACTURA">Factura Electrónica</option>
                </select>
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Cliente Asignado
                </label>
                {clienteNombre ? (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "8px 12px" }}>
                    <div>
                      <strong style={{ fontSize: "0.75rem", color: "#0f172a", display: "block" }}>{clienteNombre}</strong>
                      <span style={{ fontSize: "0.65rem", color: "#64748b" }}>Doc: {clienteDoc}</span>
                    </div>
                    <button type="button" onClick={() => setIsClienteModalOpen(true)} style={{ background: "none", border: "none", color: "#0284c7", fontSize: "0.7rem", fontWeight: "700", cursor: "pointer" }}>
                      Cambiar
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => setIsClienteModalOpen(true)} 
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      backgroundColor: "#f1f5f9", 
                      color: "#334155", 
                      border: "1px dashed #94a3b8", 
                      borderRadius: "6px", 
                      fontSize: "0.75rem", 
                      fontWeight: "700", 
                      cursor: "pointer", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      gap: "6px" 
                    }}
                  >
                    <Search01Icon size={16} /> Seleccionar o Agregar Cliente
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "0.86rem", fontWeight: "700", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                <Invoice01Icon size={16} color="#0f172a" /> Detalle de Productos en Comprobante
              </h2>
              <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#166534", backgroundColor: "#f0fdf4", padding: "2px 8px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                {itemsDetalle.length} ítems agregados
              </span>
            </div>

            {/* TABLA DE PRODUCTOS AGREGADOS (PARTE IZQUIERDA) */}
            {itemsDetalle.length === 0 ? (
              <div style={{ padding: "36px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.78rem" }}>
                <ShoppingBag01Icon size={32} color="#cbd5e1" style={{ margin: "0 auto 8px auto", display: "block" }} />
                No has agregado ningún producto al comprobante todavía.<br />
                Usa el formulario de la derecha para buscar y añadir productos.
              </div>
            ) : (
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                      <th style={thStyle}>PRODUCTO</th>
                      <th style={{ ...thStyle, textAlign: "center" }}>CANTIDAD</th>
                      <th style={thStyle}>FECHA VENTA</th>
                      <th style={thStyle}>P. UNIT (S/.)</th>
                      <th style={thStyle}>SUBTOTAL</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>ELIMINAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsDetalle.map((item) => (
                      <tr key={item.idTemp} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        
                        {/* PRODUCTO & SKU */}
                        <td style={{ ...tdStyle, padding: "8px 10px" }}>
                          <div>
                            <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.78rem", display: "block" }}>
                              {item.nombre}
                            </span>
                            <span style={{ fontSize: "0.62rem", color: "#64748b", fontFamily: "monospace", display: "block" }}>
                              SKU base: {item.sku}
                            </span>
                            <span style={{ fontSize: "0.62rem", color: "#0f172a", fontFamily: "monospace", fontWeight: "600" }}>
                              Cód. Registro: {item.codigoEscaneado}
                            </span>
                          </div>
                        </td>

                        {/* CANTIDAD CON AUMENTAR / DISMINUIR */}
                        <td style={{ ...tdStyle, textAlign: "center", padding: "8px 6px" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "2px 4px" }}>
                            <button
                              type="button"
                              onClick={() => handleDisminuirCantidad(item.idTemp)}
                              title="Disminuir cantidad"
                              style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 4px", fontSize: "0.85rem", fontWeight: "700", color: "#475569" }}
                            >
                              -
                            </button>

                            <span style={{ fontSize: "0.74rem", fontWeight: "700", minWidth: "20px", textAlign: "center", color: "#0f172a" }}>
                              {item.cantidad}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleAumentarCantidad(item.idTemp)}
                              title="Aumentar cantidad"
                              style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 4px", fontSize: "0.85rem", fontWeight: "700", color: "#475569" }}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* FECHA DE VENTA */}
                        <td style={{ ...tdStyle, padding: "8px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#334155" }}>
                            <Calendar01Icon size={12} color="#64748b" />
                            <span>{item.fechaVenta}</span>
                          </div>
                        </td>

                        {/* PRECIO UNITARIO ESTIMADO MANUAL */}
                        <td style={{ ...tdStyle, padding: "8px 10px", fontWeight: "600", color: "#0f172a" }}>
                          S/ {item.precioUnitario.toFixed(2)}
                        </td>

                        {/* SUBTOTAL */}
                        <td style={{ ...tdStyle, padding: "8px 10px", fontWeight: "700", color: "#166534" }}>
                          S/ {(item.cantidad * item.precioUnitario).toFixed(2)}
                        </td>

                        {/* ELIMINAR */}
                        <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px" }}>
                          <button
                            type="button"
                            onClick={() => handleEliminarItem(item.idTemp)}
                            title="Eliminar ítem del comprobante"
                            style={{
                              padding: "4px 6px",
                              backgroundColor: "#fef2f2",
                              color: "#dc2626",
                              border: "1px solid #fecaca",
                              borderRadius: "5px",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center"
                            }}
                          >
                            <Delete02Icon size={13} color="#dc2626" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>


        </div>


        {/* ============================================================== */}
        {/* PARTE DERECHA: SECCIÓN DE AGREGAR PRODUCTO (PRECIO MIN/MAX & INPUTS) */}
        {/* ============================================================== */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            
            <h2 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <Tag01Icon size={16} color="#0f172a" /> Configurar & Agregar Producto
            </h2>

            {/* 1. PARTE SUPERIOR DE LA SECCIÓN DERECHA: PRECIO MINIMO Y PRECIO MAXIMO */}
            <div style={{
              backgroundColor: "#f0fdf4",
              borderRadius: "10px",
              padding: "12px",
              border: "1px solid #bbf7d0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CalculatorIcon size={18} color="#15803d" />
                <div>
                  <span style={{ fontSize: "0.62rem", fontWeight: "800", color: "#166534", textTransform: "uppercase", display: "block" }}>
                    RANGO DE PRECIO DE VENTA
                  </span>
                  <span style={{ fontSize: "0.66rem", color: "#15803d" }}>
                    Límites sugeridos en sistema
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: "700", color: "#15803d", display: "block" }}>
                  Mín: <strong>S/ {productPriceBounds.min.toFixed(2)}</strong>
                </span>
                <span style={{ fontSize: "0.76rem", fontWeight: "800", color: "#166534" }}>
                  Máx: <strong>S/ {productPriceBounds.max.toFixed(2)}</strong>
                </span>
              </div>
            </div>

            {/* 2. DOS INPUTS PARA BUSCAR PRODUCTO */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              
              {/* INPUT 1: BUSCAR POR CÓDIGO / SKU */}
              <div>
                <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  1. Buscar por Código / SKU
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Escribe el código o SKU (ej. 10001)..."
                    value={searchCodigoInput}
                    onChange={(e) => handleSearchCodigoChange(e.target.value)}
                    style={{ ...inputStyle, paddingRight: "28px" }}
                  />
                  <Search01Icon size={13} color="#64748b" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              {/* INPUT 2: BUSCAR POR NOMBRE */}
              <div>
                <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  2. Buscar por Nombre de Producto
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Escribe el nombre del producto..."
                    value={searchNombreInput}
                    onChange={(e) => handleSearchNombreChange(e.target.value)}
                    style={{ ...inputStyle, paddingRight: "28px" }}
                  />
                  <Search01Icon size={13} color="#64748b" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              {/* LISTA DESPLEGABLE / RESULTADOS DE BÚSQUEDA SI HAY MÚLTIPLES */}
              {filteredProducts.length > 0 && (
                <div>
                  <label style={{ display: "block", fontSize: "0.62rem", color: "#64748b", marginBottom: "4px" }}>
                    Resultados coincidentes ({filteredProducts.length}):
                  </label>
                  <select
                    value={selectedProduct?.id || ""}
                    onChange={(e) => {
                      const found = dbProducts.find(p => String(p.id) === e.target.value);
                      if (found) handleSelectProduct(found);
                    }}
                    style={{ ...inputStyle, backgroundColor: "#ffffff" }}
                  >
                    {filteredProducts.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} (SKU: {p.sku}) - S/ {p.precioVentaMin ? p.precioVentaMin.toFixed(2) : "0.00"}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 3. COLOCAR EL PRECIO DE VENTA ESTIMADO (MANUAL) QUE PERMITE COLOCAR EL LÍMITE */}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px", marginTop: "2px" }}>
              <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase", marginBottom: "4px" }}>
                Precio de Venta Estimado (Manual con Límite)
              </label>
              <input
                type="number"
                step="0.10"
                required
                placeholder={productPriceBounds.min.toFixed(2)}
                value={precioEstimadoInput}
                onChange={(e) => setPrecioEstimadoInput(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: "0.88rem",
                  fontWeight: "700",
                  color: "#0f172a",
                  borderColor: isBelowMin || isAboveMax ? "#f87171" : "#cbd5e1"
                }}
              />

              {/* INDICADORES / ALERTAS DEL LÍMITE DE PRECIO */}
              {isBelowMin && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#dc2626", fontSize: "0.64rem", marginTop: "4px" }}>
                  <AlertCircleIcon size={12} color="#dc2626" />
                  <span>Atención: El precio ingresado es menor al precio mínimo sugerido (S/ {productPriceBounds.min.toFixed(2)}).</span>
                </div>
              )}
              {isAboveMax && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#b45309", fontSize: "0.64rem", marginTop: "4px" }}>
                  <AlertCircleIcon size={12} color="#b45309" />
                  <span>El precio ingresado supera el precio máximo estimado (S/ {productPriceBounds.max.toFixed(2)}).</span>
                </div>
              )}
              {!isBelowMin && !isAboveMax && currentPrecioNum > 0 && (
                <span style={{ fontSize: "0.64rem", color: "#166534", marginTop: "4px", display: "block" }}>
                  ✓ Precio dentro del rango sugerido.
                </span>
              )}
            </div>

            {/* CANTIDAD Y FECHA REMOVIDOS DE AQUÍ */}

            {/* BOTÓN DE AGREGAR AL DETALLE */}
            <button
              type="button"
              onClick={handleAgregarAlComprobante}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "0.76rem",
                fontWeight: "700",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "6px",
                boxShadow: "0 2px 6px rgba(15,23,42,0.12)"
              }}
            >
              <Add01Icon size={14} color="#ffffff" /> AGREGAR AL COMPROBANTE
            </button>

          </div>

          {/* RESUMEN FINANCIERO DEL COMPROBANTE */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}>
            <h3 style={{ fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", margin: "0 0 10px 0" }}>
              Resumen del Comprobante
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.74rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                <span>Subtotal Neto:</span>
                <strong style={{ color: "#0f172a" }}>S/ {subtotalTotal.toFixed(2)}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                <span>IGV (18%):</span>
                <strong style={{ color: "#0f172a" }}>S/ {igvTotal.toFixed(2)}</strong>
              </div>

              <div style={{ height: "1px", backgroundColor: "#e2e8f0", margin: "2px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#0f172a" }}>TOTAL A COBRAR:</span>
                <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "#166534" }}>
                  S/ {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: SELECCIONAR O AGREGAR CLIENTE */}
      <AnimatePresence>
        {isClienteModalOpen && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(15,23,42,0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                width: "400px",
                maxWidth: "90%",
                padding: "24px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                position: "relative"
              }}
            >
              <button 
                onClick={() => setIsClienteModalOpen(false)}
                style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#64748b"
                }}
              >
                ✕
              </button>
              
              <h3 style={{ fontSize: "1.1rem", margin: "0 0 16px 0", color: "#0f172a" }}>Seleccionar o Crear Cliente</h3>
              <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0 0 12px 0" }}>
                Ingresa el DNI o RUC. Si no existe, podrás crearlo.
              </p>
              
              <input 
                type="text" 
                placeholder="Ej. 70123456" 
                value={searchDniInput} 
                onChange={(e) => setSearchDniInput(e.target.value)} 
                style={{ ...inputStyle, padding: "10px", fontSize: "0.85rem" }}
              />
              
              {(() => {
                const searchLower = searchDniInput.trim().toLowerCase();
                const filtered = searchLower 
                  ? dbClientes.filter(c => 
                      (c.numeroDocumento && c.numeroDocumento.toLowerCase().includes(searchLower)) ||
                      (c.numDocumento && c.numDocumento.toLowerCase().includes(searchLower)) ||
                      (c.nombreCompleto && c.nombreCompleto.toLowerCase().includes(searchLower))
                    )
                  : [];

                return (
                  <div>
                    {filtered.length > 0 && (
                      <div style={{ marginTop: "16px", maxHeight: "150px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                        {filtered.map((found, idx) => (
                          <div key={idx} style={{ padding: "10px 12px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <strong style={{ display: "block", color: "#0f172a", fontSize: "0.85rem" }}>{found.nombreCompleto}</strong>
                              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Doc: {found.numeroDocumento || found.numDocumento}</span>
                            </div>
                            <button 
                              onClick={() => { 
                                setClienteNombre(found.nombreCompleto || ""); 
                                setClienteDoc(found.numeroDocumento || found.numDocumento || ""); 
                                setIsClienteModalOpen(false); 
                              }} 
                              style={{ padding: "4px 8px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem", fontWeight: "700" }}
                            >
                              Seleccionar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchLower.length >= 3 && filtered.length === 0 && (
                      <div style={{ marginTop: "16px", padding: "12px", border: "1px dashed #cbd5e1", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                        <p style={{ margin: "0 0 12px 0", fontSize: "0.75rem", color: "#475569" }}>
                          No se encontraron clientes. ¿Deseas registrar "{searchDniInput}" rápidamente?
                        </p>
                        <input 
                          type="text" 
                          placeholder="Nombre Completo / Razón Social" 
                          value={nuevoClienteNombre} 
                          onChange={(e) => setNuevoClienteNombre(e.target.value)} 
                          style={{ ...inputStyle, marginBottom: "12px" }} 
                        />
                        <button 
                          onClick={async () => {
                            if(!nuevoClienteNombre) return;
                            setIsCreatingClient(true);
                            try {
                              const docNuevo = searchDniInput.trim().replace(/\D/g, ''); // solo numeros
                              const nuevo: ClienteDTO = {
                                numeroDocumento: docNuevo || "00000000",
                                numDocumento: docNuevo || "00000000",
                                nombreCompleto: nuevoClienteNombre,
                                email: docNuevo + "@cliente.com",
                                telefono: "000000000",
                                contra: docNuevo,
                                tipoDocumento: docNuevo.length > 8 ? "RUC" : "DNI",
                                rol: "CLIENTE"
                              };
                              const res = await clientesService.crear(nuevo);
                              setClienteNombre(res.nombreCompleto || nuevoClienteNombre);
                              setClienteDoc(res.numeroDocumento || res.numDocumento || docNuevo);
                              setIsClienteModalOpen(false);
                              fetchClientes(); // Recargar la lista en background
                            } catch (err) {
                              alert("Hubo un error al crear el cliente. Verifica la conexión.");
                              console.error(err);
                            } finally {
                              setIsCreatingClient(false);
                            }
                          }} 
                          disabled={isCreatingClient || !nuevoClienteNombre} 
                          style={{ 
                            width: "100%", padding: "8px", 
                            backgroundColor: (!nuevoClienteNombre || isCreatingClient) ? "#cbd5e1" : "#0f172a", 
                            color: "#fff", border: "none", borderRadius: "6px", 
                            cursor: (!nuevoClienteNombre || isCreatingClient) ? "not-allowed" : "pointer", 
                            fontSize: "0.8rem", fontWeight: "700" 
                          }}
                        >
                          {isCreatingClient ? "Guardando..." : "Registrar y Usar"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

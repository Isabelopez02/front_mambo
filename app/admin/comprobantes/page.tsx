"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { comprobantesService } from "@/app/services/comprobantes.service"; 
import { motion, AnimatePresence } from "framer-motion";
import {
    Search01Icon,
    CheckmarkBadge01Icon,
    FilterIcon,
    Download01Icon,
    Add01Icon,
    Cancel01Icon,
    File01Icon,
    PrinterIcon,
    SmartPhone01Icon
} from "hugeicons-react";

interface ComprobanteDetalle {
    cantidad: number;
    descripcion: string;
    series: string[];
    precioUnitario: number;
    subtotal: number;
}

interface ComprobanteItem {
    id: number;
    tipo: "BOLETA" | "FACTURA";
    serieNumero: string;
    clienteNombre: string;
    clienteNumDoc: string; // DNI o RUC
    tipoDoc: "DNI" | "RUC";
    montoTotal: number;
    fechaEmision: string;
    estadoSunat: "ACEPTADO" | "RECHAZADO" | "PENDIENTE";
    tipoEnvio?: string;
    fechaEntrega?: string;
    tipoPago?: string;
    detalles: ComprobanteDetalle[];
}

export default function ComprobantesPage() {
    const router = useRouter();
    
    const [comprobantes, setComprobantes] = useState<ComprobanteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const fetchCompras = async () => {
        try {
            setErrorMsg(null);
            if (typeof window !== "undefined") {
                localStorage.removeItem('mockComprobantes');
            }
            const data = await comprobantesService.listarTodos();
            
            // Map seriesEscaneadas to series for the UI
            const mapeado = data.map(item => ({
                ...item,
                detalles: item.detalles.map((d: any) => ({
                    ...d,
                    series: d.seriesEscaneadas ? d.seriesEscaneadas.split(",") : []
                }))
            }));
            
            setComprobantes(mapeado as ComprobanteItem[]);
        } catch (error: any) {
            console.error("Error cargando comprobantes", error);
            setErrorMsg(error?.message || "Error desconocido al cargar comprobantes");
            // Si falla el backend, intentamos leer el fallback local
            const saved = localStorage.getItem('mockComprobantes');
            if (saved) {
                setComprobantes(JSON.parse(saved));
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCompras();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTipoFilter, setSelectedTipoFilter] = useState("TODOS");

    const [viewingComprobante, setViewingComprobante] = useState<ComprobanteItem | null>(null);

    const filteredComprobantes = comprobantes.filter(c => {
        const matchesSearch =
            c.serieNumero.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.clienteNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.clienteNumDoc.includes(searchQuery);

        const matchesTipo =
            selectedTipoFilter === "TODOS" ||
            (selectedTipoFilter === "BOLETA" && c.tipo === "BOLETA") ||
            (selectedTipoFilter === "FACTURA" && c.tipo === "FACTURA");

        return matchesSearch && matchesTipo;
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* HEADER SECTION */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                    <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
                        Comprobantes Electrónicos
                    </h1>
                    <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
                        Gestión de Boletas y Facturas electrónicas sincronizadas con SUNAT
                    </p>
                </div>

                <button
                    onClick={() => router.push("/admin/comprobantes/crearComprobante")}
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
                    <Add01Icon size={14} color="#ffffff" /> Emitir Comprobante
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
                {/* BUSCADOR */}
                <div style={{ position: "relative", width: "280px" }}>
                    <input
                        type="text"
                        placeholder="Buscar por comprobante, RUC/DNI o cliente..."
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

                {/* CHIPS DE TIPO */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        {[
                            { id: "TODOS", label: "Todos" },
                            { id: "BOLETA", label: "Boletas" },
                            { id: "FACTURA", label: "Facturas" }
                        ].map(f => (
                            <button
                                key={f.id}
                                onClick={() => setSelectedTipoFilter(f.id)}
                                style={{
                                    padding: "3px 9px",
                                    borderRadius: "14px",
                                    fontSize: "0.68rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    border: selectedTipoFilter === f.id ? "1px solid #059669" : "1px solid #e2e8f0",
                                    backgroundColor: selectedTipoFilter === f.id ? "#ecfdf5" : "#f8fafc",
                                    color: selectedTipoFilter === f.id ? "#047857" : "#64748b"
                                }}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

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

            {/* TABLA DE COMPROBANTES */}
            {errorMsg && (
                <div style={{ padding: "12px 16px", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "8px", border: "1px solid #fca5a5", fontSize: "0.85rem", fontWeight: "500" }}>
                    Error de conexión: {errorMsg}
                </div>
            )}
            <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "14px 16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
            }}>
                {filteredComprobantes.length === 0 ? (
                    <div style={{ padding: "32px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.78rem" }}>
                        No hay comprobantes para mostrar.
                    </div>
                ) : (
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                                    <th style={thStyle}>FECHA & HORA</th>
                                    <th style={thStyle}>COMPROBANTE</th>
                                    <th style={thStyle}>CLIENTE & DOC</th>
                                    <th style={thStyle}>MONTO TOTAL</th>
                                    <th style={{ ...thStyle, textAlign: "center" }}>ESTADO SUNAT</th>
                                    <th style={{ ...thStyle, textAlign: "right" }}>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComprobantes.map((item) => {
                                    const dateObj = new Date(item.fechaEmision);
                                    const dateStr = dateObj.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
                                    const timeStr = dateObj.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

                                    return (
                                        <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>

                                            {/* FECHA Y HORA */}
                                            <td style={{ ...tdStyle, padding: "8px 10px" }}>
                                                <div>
                                                    <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.75rem", display: "block" }}>{dateStr}</span>
                                                    <span style={{ color: "#64748b", fontSize: "0.66rem", display: "block", marginTop: "1px" }}>{timeStr}</span>
                                                </div>
                                            </td>

                                            {/* COMPROBANTE & TIPO */}
                                            <td style={{ ...tdStyle, padding: "8px 10px" }}>
                                                <div>
                                                    <span style={{ color: "#0f172a", fontWeight: "700", fontSize: "0.78rem", fontFamily: "monospace" }}>
                                                        {item.serieNumero}
                                                    </span>
                                                    <div style={{ marginTop: "2px" }}>
                                                        <span style={{
                                                            fontSize: "0.6rem",
                                                            fontWeight: "700",
                                                            padding: "1px 5px",
                                                            borderRadius: "3px",
                                                            backgroundColor: item.tipo === "FACTURA" ? "#eff6ff" : "#f1f5f9",
                                                            color: item.tipo === "FACTURA" ? "#1d4ed8" : "#475569",
                                                            border: item.tipo === "FACTURA" ? "1px solid #bfdbfe" : "1px solid #cbd5e1"
                                                        }}>
                                                            {item.tipo}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* CLIENTE & DOC */}
                                            <td style={{ ...tdStyle, padding: "8px 10px" }}>
                                                <div>
                                                    <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.76rem", display: "block" }}>{item.clienteNombre}</span>
                                                    <span style={{ color: "#64748b", fontSize: "0.64rem", fontFamily: "monospace" }}>
                                                        {item.tipoDoc}: {item.clienteNumDoc}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* MONTO TOTAL */}
                                            <td style={{ ...tdStyle, padding: "8px 10px", fontWeight: "700", color: "#0f172a" }}>
                                                S/ {item.montoTotal.toFixed(2)}
                                            </td>

                                            {/* ESTADO SUNAT */}
                                            <td style={{ ...tdStyle, textAlign: "center", padding: "8px 10px" }}>
                                                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                                                    <CheckmarkBadge01Icon size={13} color="#166534" /> Aceptado SUNAT
                                                </span>
                                            </td>

                                            {/* ACCIONES */}
                                            <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px" }}>
                                                <div style={{ display: "inline-flex", gap: "4px" }}>
                                                    <button
                                                        type="button"
                                                        title="Ver Comprobante"
                                                        onClick={() => setViewingComprobante(item)}
                                                        style={actionBtnStyle}
                                                    >
                                                        <File01Icon size={13} color="#0f172a" /> Ver Comprobante
                                                    </button>
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

            {/* MODAL: VER COMPROBANTE */}
            {/* MODAL: VER COMPROBANTE */}
<AnimatePresence>
    {viewingComprobante && (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setViewingComprobante(null)}
                style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1100, backdropFilter: "blur(3px)" }}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: "-50%", x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                exit={{ opacity: 0, scale: 0.94, y: "-50%", x: "-50%" }}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "92%",
                    maxWidth: "520px",
                    maxHeight: "92vh",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    zIndex: 1101,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}
            >
                {/* HEADER DEL MODAL */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                    <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                            Vista Previa del Documento
                        </h3>
                        <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "2px 0 0 0" }}>
                            {viewingComprobante.tipo === "FACTURA" ? "Factura" : "Boleta"} Electrónica · {viewingComprobante.serieNumero}
                        </p>
                    </div>
                    <button
                        onClick={() => setViewingComprobante(null)}
                        style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Cancel01Icon size={16} color="#0f172a" />
                    </button>
                </div>

                {/* CONTENIDO SCROLLABLE */}
                <div style={{ overflowY: "auto", padding: "20px", flex: 1 }}>
                    {/* DOCUMENTO TIPO A5 (formato real de comprobante peruano) */}
                    <div
                        id="comprobante-imprimible"
                        style={{
                            backgroundColor: "#ffffff",
                            padding: "22px 26px",
                            border: "1px solid #cbd5e1",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                            fontFamily: "'Helvetica Neue', Arial, sans-serif",
                            color: "#000",
                            fontSize: "11px",
                            lineHeight: "1.45"
                        }}
                    >
                        {/* ══════════ CABECERA ══════════ */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                            {/* Datos del emisor */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                    <div style={{
                                        width: "38px", height: "38px", borderRadius: "6px",
                                        backgroundColor: "#0f172a", color: "#fff",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: "900", fontSize: "14px", letterSpacing: "-0.5px"
                                    }}>
                                        T
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: "900", fontSize: "14px", letterSpacing: "0.5px", color: "#0f172a" }}>
                                            TATY IMPORTACIONES S.A.C.
                                        </div>
                                        <div style={{ fontSize: "9px", color: "#475569" }}>
                                            R.U.C. 20123456789
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "9.5px", color: "#334155", lineHeight: "1.5", marginTop: "6px" }}>
                                    <div>📍 Av. Principal 123, Lima, Perú</div>
                                    <div>📞 (01) 555-1234  ·  ✉ ventas@tatyimportaciones.pe</div>
                                </div>
                            </div>

                            {/* Recuadro SUNAT */}
                            <div style={{
                                border: "2px solid #0f172a",
                                borderRadius: "6px",
                                padding: "10px 14px",
                                textAlign: "center",
                                minWidth: "190px",
                                marginLeft: "12px"
                            }}>
                                <div style={{ fontSize: "10px", fontWeight: "700", color: "#334155" }}>
                                    R.U.C. 20123456789
                                </div>
                                <div style={{
                                    fontSize: "13px", fontWeight: "900", letterSpacing: "1px",
                                    margin: "6px 0",
                                    padding: "4px 6px",
                                    backgroundColor: viewingComprobante.tipo === "FACTURA" ? "#1e40af" : "#0f172a",
                                    color: "#fff",
                                    borderRadius: "3px"
                                }}>
                                    {viewingComprobante.tipo === "FACTURA" ? "FACTURA" : "BOLETA"} ELECTRÓNICA
                                </div>
                                <div style={{ fontSize: "15px", fontWeight: "900", fontFamily: "monospace", letterSpacing: "0.5px" }}>
                                    {viewingComprobante.serieNumero}
                                </div>
                            </div>
                        </div>

                        {/* ══════════ DATOS DEL CLIENTE ══════════ */}
                        <div style={{
                            borderTop: "2px solid #0f172a",
                            borderBottom: "1px solid #94a3b8",
                            padding: "10px 0",
                            marginBottom: "12px",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "4px 16px",
                            fontSize: "10.5px"
                        }}>
                            <div>
                                <strong>Señor(es):</strong> {viewingComprobante.clienteNombre}
                            </div>
                            <div>
                                <strong>Fecha Emisión:</strong>{" "}
                                {new Date(viewingComprobante.fechaEmision).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                            </div>
                            <div>
                                <strong>{viewingComprobante.tipoDoc}:</strong> {viewingComprobante.clienteNumDoc}
                            </div>
                            <div>
                                <strong>Moneda:</strong> SOLES (PEN)
                            </div>
                            {viewingComprobante.tipoPago && (
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <strong>Forma de Pago:</strong> {viewingComprobante.tipoPago}
                                </div>
                            )}
                        </div>

                        {/* ══════════ DETALLE ══════════ */}
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10.5px", marginBottom: "10px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#0f172a", color: "#fff" }}>
                                    <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: "700", fontSize: "9.5px", letterSpacing: "0.5px", width: "55px" }}>CANT.</th>
                                    <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: "700", fontSize: "9.5px", letterSpacing: "0.5px" }}>DESCRIPCIÓN</th>
                                    <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: "700", fontSize: "9.5px", letterSpacing: "0.5px", width: "75px" }}>V. UNIT.</th>
                                    <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: "700", fontSize: "9.5px", letterSpacing: "0.5px", width: "80px" }}>IMPORTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewingComprobante.detalles.map((detalle, idx) => (
                                    <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                        <td style={{ padding: "7px 8px", verticalAlign: "top", fontWeight: "600" }}>
                                            {detalle.cantidad.toFixed(2)}
                                        </td>
                                        <td style={{ padding: "7px 8px", verticalAlign: "top" }}>
                                            <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: detalle.series?.length ? "3px" : 0 }}>
                                                {detalle.descripcion}
                                            </div>
                                            {detalle.series && detalle.series.length > 0 && (
                                                <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", lineHeight: "1.4" }}>
                                                    <span style={{ color: "#475569", fontWeight: "600" }}>Series: </span>
                                                    {detalle.series.join(" - ")}
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ padding: "7px 8px", textAlign: "right", verticalAlign: "top" }}>
                                            S/ {detalle.precioUnitario.toFixed(2)}
                                        </td>
                                        <td style={{ padding: "7px 8px", textAlign: "right", verticalAlign: "top", fontWeight: "600" }}>
                                            S/ {detalle.subtotal.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* ══════════ TOTALES ══════════ */}
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                            <div style={{ width: "230px", fontSize: "10.5px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                                    <span style={{ color: "#475569" }}>OP. GRAVADA:</span>
                                    <span style={{ fontWeight: "600" }}>S/ {(viewingComprobante.montoTotal / 1.18).toFixed(2)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                                    <span style={{ color: "#475569" }}>OP. EXONERADA:</span>
                                    <span style={{ fontWeight: "600" }}>S/ 0.00</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                                    <span style={{ color: "#475569" }}>I.G.V. (18%):</span>
                                    <span style={{ fontWeight: "600" }}>S/ {(viewingComprobante.montoTotal - (viewingComprobante.montoTotal / 1.18)).toFixed(2)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                                    <span style={{ color: "#475569" }}>DESCUENTO:</span>
                                    <span style={{ fontWeight: "600" }}>S/ 0.00</span>
                                </div>
                                <div style={{
                                    display: "flex", justifyContent: "space-between",
                                    marginTop: "4px", paddingTop: "6px",
                                    borderTop: "2px solid #0f172a",
                                    fontSize: "13px", fontWeight: "900"
                                }}>
                                    <span>IMPORTE TOTAL:</span>
                                    <span>S/ {viewingComprobante.montoTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* ══════════ MONTO EN LETRAS ══════════ */}
                        <div style={{
                            padding: "7px 10px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px",
                            fontSize: "10px",
                            marginBottom: "12px"
                        }}>
                            <strong style={{ color: "#0f172a" }}>SON: </strong>
                            <span style={{ textTransform: "uppercase", color: "#334155" }}>
                                {numeroALetras(viewingComprobante.montoTotal)}
                            </span>
                        </div>

                        {/* ══════════ INFO ADICIONAL ══════════ */}
                        {(viewingComprobante.tipoEnvio || viewingComprobante.tipoPago) && (
                            <div style={{
                                borderTop: "1px dashed #cbd5e1",
                                paddingTop: "8px",
                                marginBottom: "12px",
                                fontSize: "10px",
                                color: "#334155",
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                                flexWrap: "wrap"
                            }}>
                                <div>
                                    <strong>Modo de Entrega:</strong> {viewingComprobante.tipoEnvio || "—"}
                                    {viewingComprobante.tipoEnvio === "A DOMICILIO" && viewingComprobante.fechaEntrega && (
                                        <span style={{ display: "block", marginTop: "1px" }}>
                                            <strong>Fecha Entrega:</strong> {viewingComprobante.fechaEntrega.split("-").reverse().join("/")}
                                        </span>
                                    )}
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <strong>Tipo de Pago:</strong> {viewingComprobante.tipoPago || "—"}
                                </div>
                            </div>
                        )}

                        {/* ══════════ PIE CON QR Y HASH (SUNAT) ══════════ */}
                        <div style={{
                            borderTop: "2px solid #0f172a",
                            paddingTop: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: "12px"
                        }}>
                            <div style={{ fontSize: "8.5px", color: "#475569", lineHeight: "1.5", flex: 1 }}>
                                <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: "3px" }}>
                                    Representación impresa del Comprobante de Pago Electrónico
                                </div>
                                <div>Autorizado mediante Resolución de Superintendencia N° 097-2012/SUNAT</div>
                                <div>Consulte su documento en: <strong>www.sunat.gob.pe</strong></div>
                                <div style={{ marginTop: "4px", fontFamily: "monospace", fontSize: "7.5px", color: "#64748b" }}>
                                    Hash: {btoa(`${viewingComprobante.serieNumero}-${viewingComprobante.montoTotal}-${viewingComprobante.fechaEmision}`).slice(0, 40)}
                                </div>
                            </div>
                            {/* QR simulado (placeholder visual) */}
                            <div style={{
                                width: "82px", height: "82px",
                                border: "1px solid #0f172a",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#fff",
                                flexShrink: 0,
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                    width: "100%", height: "100%",
                                    backgroundImage: `repeating-linear-gradient(0deg, #0f172a 0 2px, transparent 2px 4px), repeating-linear-gradient(90deg, #0f172a 0 2px, transparent 2px 4px)`,
                                    opacity: 0.85
                                }} />
                                <div style={{
                                    position: "absolute", inset: "22px",
                                    backgroundColor: "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: "900", fontSize: "9px", color: "#0f172a"
                                }}>
                                    QR
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════ BOTONES DE ACCIÓN ══════════ */}
                <div style={{
                    padding: "14px 20px",
                    borderTop: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                }}>
                    <button
                        onClick={() => {
                            const printContent = document.getElementById('comprobante-imprimible');
                            if (printContent) {
                                const printWindow = window.open('', '', 'width=800,height=600');
                                if (printWindow) {
                                    printWindow.document.write('<html><head><title>Imprimir Comprobante</title>');
                                    printWindow.document.write('<style>@page { size: A5; margin: 0; } body { margin: 0; padding: 20px; }</style>');
                                    printWindow.document.write('</head><body>');
                                    printWindow.document.write(printContent.outerHTML);
                                    printWindow.document.write('</body></html>');
                                    printWindow.document.close();
                                    printWindow.focus();
                                    setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
                                }
                            }
                        }}
                        style={{
                            width: "100%", padding: "11px",
                            backgroundColor: "#0284c7", color: "#ffffff",
                            border: "none", borderRadius: "8px",
                            fontSize: "0.8rem", fontWeight: "700",
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                            boxShadow: "0 2px 6px rgba(2,132,199,0.25)"
                        }}
                    >
                        <PrinterIcon size={16} /> Descargar / Imprimir Comprobante
                    </button>
                    <button
                        onClick={() => {
                            const text = `Hola ${viewingComprobante.clienteNombre}, adjunto tu ${viewingComprobante.tipo} ${viewingComprobante.serieNumero} por el monto de S/${viewingComprobante.montoTotal.toFixed(2)}. Gracias por tu compra en TATY Importaciones.`;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                        }}
                        style={{
                            width: "100%", padding: "11px",
                            backgroundColor: "#25D366", color: "#ffffff",
                            border: "none", borderRadius: "8px",
                            fontSize: "0.8rem", fontWeight: "700",
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                            boxShadow: "0 2px 6px rgba(37,211,102,0.25)"
                        }}
                    >
                        <SmartPhone01Icon size={16} /> Enviar por WhatsApp
                    </button>
                </div>
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
            padding: "7px 10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "0.74rem",
            outline: "none",
            backgroundColor: "#f8fafc",
            color: "#0f172a"
};

            const actionBtnStyle: React.CSSProperties = {
                padding: "3px 7px",
            backgroundColor: "#ffffff",
            color: "#334155",
            border: "1px solid #cbd5e1",
            borderRadius: "5px",
            fontSize: "0.68rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "3px"
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

// Convierte un número a letras en español peruano (formato SUNAT)
function numeroALetras(num: number): string {
    const entero = Math.floor(num);
    const centavos = Math.round((num - entero) * 100);
    
    const unidades = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
    const decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
    const especiales = ["DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"];
    const centenas = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];

    function convertirGrupo(n: number): string {
        if (n === 0) return "";
        if (n === 100) return "CIEN";
        let output = "";
        const c = Math.floor(n / 100);
        const resto = n % 100;
        if (c > 0) output += centenas[c] + " ";
        if (resto >= 10 && resto < 20) {
            output += especiales[resto - 10];
        } else {
            const d = Math.floor(resto / 10);
            const u = resto % 10;
            if (d > 0) {
                if (u === 0) output += decenas[d];
                else if (d === 2) output += "VEINTI" + unidades[u];
                else output += decenas[d] + " Y " + unidades[u];
            } else if (u > 0) {
                output += unidades[u];
            }
        }
        return output.trim();
    }

    function convertir(n: number): string {
        if (n === 0) return "CERO";
        const millones = Math.floor(n / 1000000);
        const miles = Math.floor((n % 1000000) / 1000);
        const resto = n % 1000;
        let res = "";
        if (millones > 0) {
            res += millones === 1 ? "UN MILLÓN " : convertirGrupo(millones) + " MILLONES ";
        }
        if (miles > 0) {
            res += miles === 1 ? "MIL " : convertirGrupo(miles) + " MIL ";
        }
        if (resto > 0) {
            res += convertirGrupo(resto);
        }
        return res.trim();
    }

    const letras = convertir(entero);
    return `${letras} CON ${centavos.toString().padStart(2, "0")}/100 SOLES`;
}
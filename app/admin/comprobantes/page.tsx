"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
}

export default function ComprobantesPage() {
    const router = useRouter();
    const [comprobantes, setComprobantes] = useState<ComprobanteItem[]>([
        {
            id: 1,
            tipo: "BOLETA",
            serieNumero: "B001-000452",
            clienteNombre: "Carlos Mendoza",
            clienteNumDoc: "45892100",
            tipoDoc: "DNI",
            montoTotal: 145.50,
            fechaEmision: "2026-09-15T10:14:00",
            estadoSunat: "ACEPTADO"
        },
        {
            id: 2,
            tipo: "FACTURA",
            serieNumero: "F001-000128",
            clienteNombre: "Comercializadora Jinnova S.A.C.",
            clienteNumDoc: "20601234567",
            tipoDoc: "RUC",
            montoTotal: 890.00,
            fechaEmision: "2026-09-15T11:05:00",
            estadoSunat: "ACEPTADO"
        },
        {
            id: 3,
            tipo: "BOLETA",
            serieNumero: "B001-000453",
            clienteNombre: "María Luisa Torres",
            clienteNumDoc: "71234567",
            tipoDoc: "DNI",
            montoTotal: 65.00,
            fechaEmision: "2026-09-15T11:50:00",
            estadoSunat: "ACEPTADO"
        },
        {
            id: 4,
            tipo: "FACTURA",
            serieNumero: "F001-000129",
            clienteNombre: "Distribuidora Mambo Perú E.I.R.L.",
            clienteNumDoc: "20559988771",
            tipoDoc: "RUC",
            montoTotal: 1250.00,
            fechaEmision: "2026-09-15T12:20:00",
            estadoSunat: "ACEPTADO"
        }
    ]);

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
            <AnimatePresence>
                {viewingComprobante && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setViewingComprobante(null)}
                            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
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
                                maxWidth: "420px",
                                backgroundColor: "#ffffff",
                                borderRadius: "16px",
                                padding: "24px",
                                zIndex: 1101,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                                border: "1px solid #e2e8f0"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                <div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 2px 0" }}>
                                        {viewingComprobante.tipo} {viewingComprobante.serieNumero}
                                    </h3>
                                    <span style={{ fontSize: "0.68rem", color: "#64748b" }}>Emitido: {new Date(viewingComprobante.fechaEmision).toLocaleString("es-PE")}</span>
                                </div>
                                <button onClick={() => setViewingComprobante(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                    <Cancel01Icon size={18} color="#0f172a" />
                                </button>
                            </div>

                            <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
                                <div style={{ marginBottom: "12px" }}>
                                    <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block" }}>Cliente</span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0f172a", display: "block" }}>{viewingComprobante.clienteNombre}</span>
                                    <span style={{ fontSize: "0.75rem", color: "#334155" }}>{viewingComprobante.tipoDoc}: {viewingComprobante.clienteNumDoc}</span>
                                </div>
                                
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px dashed #cbd5e1" }}>
                                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase" }}>Total Pagado</span>
                                    <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "#059669" }}>S/ {viewingComprobante.montoTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <button
                                    onClick={() => alert(`Descargando PDF ${viewingComprobante.serieNumero}`)}
                                    style={{ width: "100%", padding: "10px", backgroundColor: "#0284c7", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                >
                                    <Download01Icon size={16} /> Descargar PDF
                                </button>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => alert(`Enviando a WhatsApp ${viewingComprobante.serieNumero}`)}
                                        style={{ flex: 1, padding: "10px", backgroundColor: "#25D366", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                    >
                                        <SmartPhone01Icon size={16} /> WhatsApp
                                    </button>
                                    <button
                                        onClick={() => alert(`Imprimiendo ${viewingComprobante.serieNumero}`)}
                                        style={{ flex: 1, padding: "10px", backgroundColor: "#334155", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                    >
                                        <PrinterIcon size={16} /> Imprimir
                                    </button>
                                </div>
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

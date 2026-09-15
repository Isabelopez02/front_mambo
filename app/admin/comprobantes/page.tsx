"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search01Icon,
    CheckmarkBadge01Icon,
    FilterIcon,
    Download01Icon,
    Add01Icon,

    File01Icon,
    PrinterIcon
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
                                                        title="Descargar PDF"
                                                        onClick={() => alert(`Descargando PDF ${item.serieNumero}`)}
                                                        style={actionBtnStyle}
                                                    >
                                                        <File01Icon size={13} color="#0284c7" /> PDF
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Imprimir Ticket"
                                                        onClick={() => alert(`Imprimiendo ticket ${item.serieNumero}`)}
                                                        style={actionBtnStyle}
                                                    >
                                                        <PrinterIcon size={13} color="#334155" /> Imprimir
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

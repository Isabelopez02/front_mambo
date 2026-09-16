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
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>Vista Previa de Documento</h3>
                                <button onClick={() => setViewingComprobante(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                    <Cancel01Icon size={18} color="#0f172a" />
                                </button>
                            </div>

                            {/* DOCUMENTO TIPO PDF (VISTA PREVIA) */}
                            <div id="comprobante-imprimible" style={{
                                backgroundColor: "#ffffff",
                                padding: "24px",
                                borderRadius: "4px",
                                border: "1px solid #cbd5e1",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                                marginBottom: "20px",
                                fontFamily: "Arial, sans-serif",
                                color: "#000",
                                maxHeight: "50vh",
                                overflowY: "auto"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #000", paddingBottom: "10px", marginBottom: "15px" }}>
                                    <div>
                                        <h2 style={{ margin: "0 0 5px 0", fontSize: "1.2rem", fontWeight: "900", letterSpacing: "1px" }}>JINNOVA S.A.C.</h2>
                                        <p style={{ margin: "0", fontSize: "0.7rem", color: "#333" }}>Av. Principal 123, Lima, Perú</p>
                                        <p style={{ margin: "0", fontSize: "0.7rem", color: "#333" }}>Teléfono: (01) 555-1234</p>
                                    </div>
                                    <div style={{ border: "2px solid #000", padding: "8px 15px", textAlign: "center", borderRadius: "6px", minWidth: "140px" }}>
                                        <p style={{ margin: "0", fontSize: "0.8rem", fontWeight: "bold" }}>R.U.C. 20123456789</p>
                                        <p style={{ margin: "5px 0", fontSize: "0.95rem", fontWeight: "bold", backgroundColor: "#000", color: "#fff", padding: "4px" }}>
                                            {viewingComprobante.tipo === "FACTURA" ? "FACTURA" : "BOLETA"} ELECTRÓNICA
                                        </p>
                                        <p style={{ margin: "0", fontSize: "0.85rem", fontWeight: "bold" }}>{viewingComprobante.serieNumero}</p>
                                    </div>
                                </div>
                                
                                <div style={{ marginBottom: "20px", fontSize: "0.75rem", lineHeight: "1.6" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "6px" }}>
                                        <strong style={{ color: "#000" }}>Señor(es):</strong> <span>{viewingComprobante.clienteNombre}</span>
                                        <strong style={{ color: "#000" }}>{viewingComprobante.tipoDoc}:</strong> <span>{viewingComprobante.clienteNumDoc}</span>
                                        <strong style={{ color: "#000" }}>Fecha Emisión:</strong> <span>{new Date(viewingComprobante.fechaEmision).toLocaleDateString("es-PE")}</span>
                                    </div>
                                </div>

                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", marginBottom: "20px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #000", borderBottom: "1px solid #000" }}>
                                            <th style={{ padding: "6px", textAlign: "left" }}>Cant.</th>
                                            <th style={{ padding: "6px", textAlign: "left" }}>Descripción</th>
                                            <th style={{ padding: "6px", textAlign: "right" }}>P. Unitario</th>
                                            <th style={{ padding: "6px", textAlign: "right" }}>Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewingComprobante.detalles.map((detalle, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: "8px 6px", borderBottom: "1px solid #e2e8f0", verticalAlign: "top" }}>{detalle.cantidad.toFixed(2)}</td>
                                                <td style={{ padding: "8px 6px", borderBottom: "1px solid #e2e8f0", verticalAlign: "top" }}>
                                                    <span style={{ fontWeight: "bold" }}>{detalle.descripcion}</span>
                                                    {detalle.series && detalle.series.length > 0 && (
                                                        <div style={{ marginTop: "4px", fontSize: "0.65rem", color: "#555" }}>
                                                            <strong style={{ color: "#000" }}>S/N:</strong> {detalle.series.join(", ")}
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: "8px 6px", textAlign: "right", borderBottom: "1px solid #e2e8f0", verticalAlign: "top" }}>S/ {detalle.precioUnitario.toFixed(2)}</td>
                                                <td style={{ padding: "8px 6px", textAlign: "right", borderBottom: "1px solid #e2e8f0", verticalAlign: "top" }}>S/ {detalle.subtotal.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div style={{ display: "flex", justifyContent: "flex-end", fontSize: "0.8rem" }}>
                                    <div style={{ width: "180px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                            <span>Subtotal:</span>
                                            <span>S/ {(viewingComprobante.montoTotal / 1.18).toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                            <span>IGV (18%):</span>
                                            <span>S/ {(viewingComprobante.montoTotal - (viewingComprobante.montoTotal / 1.18)).toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "2px solid #000", paddingTop: "5px", fontSize: "0.95rem" }}>
                                            <span>Total:</span>
                                            <span>S/ {viewingComprobante.montoTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center", marginTop: "30px", fontSize: "0.65rem", color: "#666" }}>
                                    <p style={{ margin: "2px 0" }}>Representación impresa del Comprobante de Pago Electrónico.</p>
                                    <p style={{ margin: "2px 0" }}>Consulte su documento en www.sunat.gob.pe</p>
                                </div>
                            </div>

                            {/* BOTONES DE ACCION */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <button
                                    onClick={() => {
                                        const printContent = document.getElementById('comprobante-imprimible');
                                        if (printContent) {
                                            const printWindow = window.open('', '', 'width=800,height=600');
                                            if (printWindow) {
                                                printWindow.document.write('<html><head><title>Imprimir Comprobante</title>');
                                                printWindow.document.write('</head><body style="margin:0; padding:40px; font-family: Arial, sans-serif;">');
                                                printWindow.document.write(printContent.innerHTML);
                                                printWindow.document.write('</body></html>');
                                                printWindow.document.close();
                                                printWindow.focus();
                                                setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
                                            }
                                        }
                                    }}
                                    style={{ width: "100%", padding: "10px", backgroundColor: "#0284c7", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                >
                                    <Download01Icon size={16} /> Descargar PDF / Imprimir Documento
                                </button>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => {
                                            const text = `Hola ${viewingComprobante.clienteNombre}, adjunto tu ${viewingComprobante.tipo} ${viewingComprobante.serieNumero} por el monto de S/${viewingComprobante.montoTotal.toFixed(2)}. Gracias por tu compra en Jinnova S.A.C.`;
                                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                        }}
                                        style={{ flex: 1, padding: "10px", backgroundColor: "#25D366", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                    >
                                        <SmartPhone01Icon size={16} /> Enviar por WhatsApp
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

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft02Icon,
  Search01Icon, 
  DeliveryTruck01Icon, 
  User02Icon, 
  CheckmarkBadge01Icon, 
  Cancel01Icon, 
  FilterIcon, 
  Download01Icon,
  Location01Icon,
  Add01Icon,
  Clock01Icon
} from "hugeicons-react";

import { compraService } from "../../services/compra.service";

interface EntregaItem {
  id: number;
  pedidoCodigo: string;
  clienteNombre: string;
  clienteTelefono: string;
  direccion: string;
  ciudad: string;
  fechaEnvio: string;
  estado: "ENTREGADO" | "EN_CAMINO" | "PENDIENTE" | "POR_ALISTAR" | "POR_ENTREGAR" | "POR_RECOGER";
  notas?: string;
  detallesRaw?: any[];
}

export default function EntregasPage() {
  const [entregas, setEntregas] = useState<EntregaItem[]>([]);

  const [dbConductores, setDbConductores] = useState<ConductorDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("TODOS");

  // Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newPedidoCodigo, setNewPedidoCodigo] = useState("");
  const [newClienteNombre, setNewClienteNombre] = useState("");
  const [newDireccion, setNewDireccion] = useState("");

  const [isObservarModalOpen, setIsObservarModalOpen] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState<EntregaItem | null>(null);


  const fetchCompras = async () => {
    try {
      setLoading(true);
      const res = await compraService.listarCompras();
      const mapped = res.map((c: any) => {
        let estadoVisual = c.estado === "ENTREGADO" ? "ENTREGADO" : "PENDIENTE";
        if (estadoVisual === "PENDIENTE" && c.tipoEnvio === "RECOJO_TIENDA") {
          estadoVisual = c.estadoRecojo || "POR_ALISTAR";
        }

        return {
          id: c.id,
          pedidoCodigo: `PED-2026-${c.id.toString().padStart(4, '0')}`,
          clienteNombre: c.nombreDestinario || "Cliente",
          clienteTelefono: c.contactoDestinatario || "-",
          direccion: c.sedeRecojo || "Sede Centro Histórico",
          ciudad: "Lima",
          fechaEnvio: c.fechaCreacion || new Date().toISOString(),
          estado: estadoVisual,
          notas: c.envio?.referencia || "Recojo Presencial",
          detallesRaw: c.detalles || []
        };
      });
      setEntregas(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  const handleToggleEstado = (id: number) => {
    setEntregas(prev => prev.map(e => {
      if (e.id === id) {
        const nextStatus = e.estado === "PENDIENTE" ? "EN_CAMINO" : e.estado === "EN_CAMINO" ? "ENTREGADO" : "PENDIENTE";
        return { ...e, estado: nextStatus };
      }
      return e;
    }));
  };

  const handleCreateEntregaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPedidoCodigo || !newClienteNombre || !newDireccion) return;

    const newEntrega: EntregaItem = {
      id: Date.now(),
      pedidoCodigo: newPedidoCodigo,
      clienteNombre: newClienteNombre,
      clienteTelefono: "999888777",
      direccion: newDireccion,
      ciudad: "Lima",
      fechaEnvio: new Date().toISOString(),
      estado: "PENDIENTE"
    };

    setEntregas([newEntrega, ...entregas]);
    setIsAssignModalOpen(false);
    setNewPedidoCodigo("");
    setNewClienteNombre("");
    setNewDireccion("");
  };

  const filteredEntregas = entregas.filter(e => {
    const matchesSearch = 
      e.pedidoCodigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.clienteNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.direccion.toLowerCase().includes(searchQuery.toLowerCase());

    const isPendiente = e.estado === "POR_ALISTAR" || e.estado === "POR_RECOGER" || e.estado === "PENDIENTE" || e.estado === "EN_CAMINO";
    
    if (selectedFilter === "TODOS") return matchesSearch && isPendiente;
    if (selectedFilter === "ENTREGADO") return matchesSearch && e.estado === "ENTREGADO";
    if (selectedFilter === "PENDIENTE") return matchesSearch && isPendiente;
    return matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1.8px", textTransform: "uppercase" }}>
            Control de Entregas & Reparto
          </span>
          <h1 style={{ fontSize: "1.35rem", color: "#1a0f14", margin: "2px 0 0 0", fontWeight: "400" }}>
            Estado de los recojos en tienda en tiempo real
          </h1>
        </div>

        <button
          onClick={() => setIsAssignModalOpen(true)}
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
          <Add01Icon size={14} color="#ffffff" /> Asignar Nueva Entrega
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
            placeholder="Buscar por pedido o cliente..."
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

        {/* CHIPS DE ESTADO */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {[
              { id: "TODOS", label: "Todos" },
              { id: "PENDIENTE", label: "Pendientes" },
              { id: "EN_CAMINO", label: "En Camino" },
              { id: "ENTREGADO", label: "Entregados" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                style={{
                  padding: "3px 9px",
                  borderRadius: "14px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: selectedFilter === f.id ? "1px solid #059669" : "1px solid #e2e8f0",
                  backgroundColor: selectedFilter === f.id ? "#ecfdf5" : "#f8fafc",
                  color: selectedFilter === f.id ? "#047857" : "#64748b"
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

      {/* TABLA DE ENTREGAS */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "14px 16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
      }}>
        {filteredEntregas.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.78rem" }}>
            No hay entregas registradas para el filtro seleccionado.
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={thStyle}>FECHA & HORA</th>
                  <th style={thStyle}>PEDIDO & CLIENTE</th>
                  <th style={thStyle}>DIRECCIÓN & DESTINO</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>ESTADO DE ENTREGA</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntregas.map((item) => {
                  const dateObj = new Date(item.fechaEnvio);
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

                      {/* PEDIDO & CLIENTE */}
                      <td style={{ ...tdStyle, padding: "8px 10px" }}>
                        <div>
                          <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.78rem" }}>{item.pedidoCodigo}</span>
                          <div style={{ color: "#64748b", fontSize: "0.66rem", marginTop: "1px" }}>
                            {item.clienteNombre} ({item.clienteTelefono})
                          </div>
                        </div>
                      </td>

                      {/* DIRECCIÓN & DESTINO */}
                      <td style={{ ...tdStyle, padding: "8px 10px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
                          <Location01Icon size={13} color="#64748b" style={{ marginTop: "2px", flexShrink: 0 }} />
                          <div>
                            <span style={{ color: "#334155", fontWeight: "500", fontSize: "0.74rem", display: "block" }}>{item.direccion}</span>
                            <span style={{ color: "#64748b", fontSize: "0.64rem" }}>{item.ciudad}</span>
                          </div>
                        </div>
                      </td>


                      {/* ESTADO DE ENTREGA */}
                      <td style={{ ...tdStyle, textAlign: "center", padding: "8px 10px" }}>
                        {item.estado === "ENTREGADO" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                            <CheckmarkBadge01Icon size={13} color="#166534" /> Entregado
                          </span>
                        ) : item.estado === "EN_CAMINO" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
                            <DeliveryTruck01Icon size={13} color="#1d4ed8" /> En Camino
                          </span>
                        ) : item.estado === "POR_ALISTAR" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#fef2f2", color: "#b91c1c", padding: "2px 8px", borderRadius: "10px", border: "1px solid #fecaca" }}>
                            <Clock01Icon size={13} color="#b91c1c" /> Por Alistar (Recojo)
                          </span>
                        ) : item.estado === "POR_RECOGER" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#fffbeb", color: "#b45309", padding: "2px 8px", borderRadius: "10px", border: "1px solid #fde68a" }}>
                            <Clock01Icon size={13} color="#b45309" /> Por Recoger
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#fffbeb", color: "#b45309", padding: "2px 8px", borderRadius: "10px", border: "1px solid #fde68a" }}>
                            <Clock01Icon size={13} color="#b45309" /> Pendiente
                          </span>
                        )}
                      </td>

                      {/* ACCIONES */}
                      <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px", display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEntrega(item);
                            setIsObservarModalOpen(true);
                          }}
                          style={{
                            padding: "3px 8px",
                            backgroundColor: "#f8fafc",
                            color: "#0f172a",
                            border: "1px solid #cbd5e1",
                            borderRadius: "5px",
                            fontSize: "0.68rem",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          Observar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleEstado(item.id)}
                          style={{
                            padding: "3px 8px",
                            backgroundColor: "#0f172a",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "0.68rem",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          Entregar
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL PARA ASIGNAR NUEVA ENTREGA */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignModalOpen(false)}
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
                maxWidth: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1201,
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>Asignar Nueva Entrega</h3>
                <button onClick={() => setIsAssignModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleCreateEntregaSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Código de Pedido</label>
                  <input type="text" required placeholder="Ej. PED-2026-9010" value={newPedidoCodigo} onChange={(e) => setNewPedidoCodigo(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre del Cliente</label>
                  <input type="text" required placeholder="Ej. Ana Belén" value={newClienteNombre} onChange={(e) => setNewClienteNombre(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Dirección de Envío</label>
                  <input type="text" required placeholder="Ej. Av. Primavera 120" value={newDireccion} onChange={(e) => setNewDireccion(e.target.value)} style={inputStyle} />
                </div>


                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    marginTop: "6px"
                  }}
                >
                  REGISTRAR ENTREGA
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL OBSERVAR PRODUCTOS */}
      <AnimatePresence>
        {isObservarModalOpen && selectedEntrega && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsObservarModalOpen(false)}
              style={{
                position: "fixed",
                top: 0, left: 0, width: "100vw", height: "100vh",
                backgroundColor: "rgba(15,23,42,0.5)",
                zIndex: 999,
                backdropFilter: "blur(4px)"
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                width: "90%",
                maxWidth: "450px",
                zIndex: 1000,
                overflow: "hidden",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>
                  Pedido {selectedEntrega.pedidoCodigo}
                </h3>
                <button onClick={() => setIsObservarModalOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1 }}>
                  &times;
                </button>
              </div>
              <div style={{ padding: "20px 24px", maxHeight: "60vh", overflowY: "auto" }}>
                <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "16px" }}>
                  <strong>Cliente:</strong> {selectedEntrega.clienteNombre}<br/>
                  <strong>Sede de Recojo:</strong> {selectedEntrega.direccion}
                </p>
                <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>Productos a Alistar:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {selectedEntrega.detallesRaw?.map((det, idx) => (
                    <li key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                      <div>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1e293b", display: "block" }}>{det.nombreProducto || det.producto?.nombre || "Producto"}</span>
                        <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Cantidad: {det.cantidad}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: "16px 24px", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", textAlign: "right" }}>
                <button
                  onClick={() => setIsObservarModalOpen(false)}
                  style={{ padding: "8px 16px", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer" }}
                >
                  Cerrar
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

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
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

import { conductoresService } from "../../services/conductores.service";
import { ConductorDTO } from "../../types/conductor.dto";

interface EntregaItem {
  id: number;
  pedidoCodigo: string;
  clienteNombre: string;
  clienteTelefono: string;
  direccion: string;
  ciudad: string;
  conductorNombre: string;
  conductorVehiculo?: string;
  fechaEnvio: string;
  estado: "ENTREGADO" | "EN_CAMINO" | "PENDIENTE";
  notas?: string;
}

export default function EntregasPage() {
  const [entregas, setEntregas] = useState<EntregaItem[]>([
    {
      id: 101,
      pedidoCodigo: "PED-2026-8801",
      clienteNombre: "Carlos Mendoza",
      clienteTelefono: "987654321",
      direccion: "Av. Las Flores 450, San Isidro",
      ciudad: "Lima",
      conductorNombre: "Juan Carlos Pérez",
      conductorVehiculo: "Moto Honda (ABC-123)",
      fechaEnvio: "2026-09-15T10:30:00",
      estado: "ENTREGADO",
      notas: "Entregado en recepción con DNI 45892100"
    },
    {
      id: 102,
      pedidoCodigo: "PED-2026-8804",
      clienteNombre: "María Luisa Torres",
      clienteTelefono: "912345678",
      direccion: "Calle Los Pinos 128, Miraflores",
      ciudad: "Lima",
      conductorNombre: "Roberto Gómez",
      conductorVehiculo: "Van Chana (F4X-892)",
      fechaEnvio: "2026-09-15T11:45:00",
      estado: "EN_CAMINO",
      notas: "Cliente avisado 15min antes"
    },
    {
      id: 103,
      pedidoCodigo: "PED-2026-8809",
      clienteNombre: "Andrea Castillo",
      clienteTelefono: "955443322",
      direccion: "Jr. Ayacucho 890, Surco",
      ciudad: "Lima",
      conductorNombre: "Juan Carlos Pérez",
      conductorVehiculo: "Moto Honda (ABC-123)",
      fechaEnvio: "2026-09-15T12:15:00",
      estado: "PENDIENTE"
    }
  ]);

  const [dbConductores, setDbConductores] = useState<ConductorDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("TODOS");

  // Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newPedidoCodigo, setNewPedidoCodigo] = useState("");
  const [newClienteNombre, setNewClienteNombre] = useState("");
  const [newDireccion, setNewDireccion] = useState("");
  const [selectedConductorNombre, setSelectedConductorNombre] = useState("");

  const loadConductores = async () => {
    try {
      const data = await conductoresService.listar();
      setDbConductores(data);
      if (data.length > 0) {
        setSelectedConductorNombre(data[0].nombre || "");
      }
    } catch (err) {
      console.error("Error al cargar conductores:", err);
    }
  };

  useEffect(() => {
    loadConductores();
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
      conductorNombre: selectedConductorNombre || "Conductor Asignado",
      conductorVehiculo: "Moto / Vehículo",
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
      e.conductorNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.direccion.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      selectedFilter === "TODOS" ||
      (selectedFilter === "ENTREGADO" && e.estado === "ENTREGADO") ||
      (selectedFilter === "EN_CAMINO" && e.estado === "EN_CAMINO") ||
      (selectedFilter === "PENDIENTE" && e.estado === "PENDIENTE");

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
            Control de Entregas & Reparto
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Estado de entregas en tiempo real y asignación de conductores
          </p>
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
            placeholder="Buscar por pedido, cliente o conductor..."
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
                  <th style={thStyle}>CONDUCTOR (MANEJANDO)</th>
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

                      {/* CONDUCTOR / MANEJANDO */}
                      <td style={{ ...tdStyle, padding: "8px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <User02Icon size={14} color="#334155" />
                          </div>
                          <div>
                            <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.75rem", display: "block" }}>
                              {item.conductorNombre}
                            </span>
                            {item.conductorVehiculo && (
                              <span style={{ color: "#64748b", fontSize: "0.63rem", display: "block" }}>
                                {item.conductorVehiculo}
                              </span>
                            )}
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
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "700", backgroundColor: "#fffbeb", color: "#b45309", padding: "2px 8px", borderRadius: "10px", border: "1px solid #fde68a" }}>
                            <Clock01Icon size={13} color="#b45309" /> Pendiente
                          </span>
                        )}
                      </td>

                      {/* ACCIONES */}
                      <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleEstado(item.id)}
                          style={{
                            padding: "3px 8px",
                            backgroundColor: "#ffffff",
                            color: "#0f172a",
                            border: "1px solid #cbd5e1",
                            borderRadius: "5px",
                            fontSize: "0.68rem",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          Cambiar Estado
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

                <div>
                  <label style={{ display: "block", fontSize: "0.64rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Conductor Asignado (Manejando)</label>
                  <select
                    value={selectedConductorNombre}
                    onChange={(e) => setSelectedConductorNombre(e.target.value)}
                    style={inputStyle}
                  >
                    {dbConductores.length > 0 ? (
                      dbConductores.map(c => (
                        <option key={c.id || c.nombre} value={c.nombre}>{c.nombre} ({c.telefono || "Conductor"})</option>
                      ))
                    ) : (
                      <>
                        <option value="Juan Carlos Pérez">Juan Carlos Pérez (Moto Honda)</option>
                        <option value="Roberto Gómez">Roberto Gómez (Van Chana)</option>
                        <option value="Miguel Ángel Rivas">Miguel Ángel Rivas (Auto Nissan)</option>
                      </>
                    )}
                  </select>
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

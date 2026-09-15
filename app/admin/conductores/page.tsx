"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search01Icon, 
  Add01Icon, 
  Cancel01Icon, 
  Edit01Icon,
  ViewOffIcon,
  FilterIcon,
  Download01Icon,
  UserGroupIcon
} from "hugeicons-react";
import { conductoresService } from "../../services/conductores.service";
import { ConductorDTO } from "../../types/conductor.dto";

export default function ConductoresAdminPage() {
  const [conductores, setConductores] = useState<ConductorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("TODOS");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingConductor, setEditingConductor] = useState<ConductorDTO | null>(null);
  const [deletingConductor, setDeletingConductor] = useState<ConductorDTO | null>(null);

  // FORM STATE
  const [nombre, setNombre] = useState("");
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estado, setEstado] = useState("Libre");

  const estados = ["TODOS", "Libre", "Entregando"];

  const fetchConductores = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await conductoresService.listar();
      setConductores(data);
    } catch (err: any) {
      console.error("Error backend API:", err);
      setErrorMsg("No hay conexión con el servidor backend Spring Boot.");
      setConductores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConductores();
  }, []);

  const resetForm = () => {
    setNombre("");
    setDocumentoIdentidad("");
    setTelefono("");
    setDireccion("");
    setEstado("Libre");
    setEditingConductor(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cond: ConductorDTO) => {
    setEditingConductor(cond);
    setNombre(cond.nombre);
    setDocumentoIdentidad(cond.documentoIdentidad);
    setTelefono(cond.telefono);
    setDireccion(cond.direccion);
    setEstado(cond.estado);
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !documentoIdentidad) return;

    try {
      const payload: ConductorDTO = {
        nombre,
        documentoIdentidad,
        telefono,
        direccion,
        estado
      };

      if (editingConductor && editingConductor.id) {
        await conductoresService.actualizar(editingConductor.id, payload);
      } else {
        await conductoresService.crear(payload);
      }

      await fetchConductores();
      setIsAddModalOpen(false);
      setEditingConductor(null);
      resetForm();
    } catch (err: any) {
      alert("Error al guardar en la base de datos: " + (err.response?.data?.message || err.message));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingConductor || !deletingConductor.id) return;
    try {
      await conductoresService.eliminar(deletingConductor.id);
      await fetchConductores();
      setDeletingConductor(null);
    } catch (err: any) {
      alert("Error al eliminar en la base de datos backend: " + err.message);
    }
  };

  const filteredConductores = conductores.filter(c => {
    const matchesSearch = c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.documentoIdentidad.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEstado = selectedEstado === "TODOS" || c.estado === selectedEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
            Administración de Conductores
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Gestión del personal de entrega, estados y datos de contacto
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleOpenAdd}
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
            <Add01Icon size={14} color="#ffffff" /> Registrar Conductor
          </button>
        </div>
      </div>

      {/* TABLE HEADER: SEARCH LEFT, FILTERS RIGHT */}
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
        {/* SEARCH BAR LEFT */}
        <div style={{ position: "relative", width: "260px" }}>
          <input
            type="text"
            placeholder="Buscar por nombre o documento..."
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

        {/* CHIPS & BUTTONS RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", overflowX: "auto" }}>
            {estados.map((est) => (
              <button
                key={est}
                onClick={() => setSelectedEstado(est)}
                style={{
                  padding: "3px 9px",
                  borderRadius: "14px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: selectedEstado === est ? "1px solid #059669" : "1px solid #e2e8f0",
                  backgroundColor: selectedEstado === est ? "#ecfdf5" : "#f8fafc",
                  color: selectedEstado === est ? "#047857" : "#64748b"
                }}
              >
                {est}
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
            <Download01Icon size={13} color="#475569" /> Exportar
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "14px 16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
      }}>
        {loading ? (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#64748b", fontSize: "0.8rem" }}>
            Consultando backend...
          </div>
        ) : errorMsg ? (
          <div style={{ padding: "24px 16px", textAlign: "center", backgroundColor: "#fef2f2", borderRadius: "8px", border: "1px solid #fecaca", color: "#991b1b", fontSize: "0.78rem" }}>
            <p style={{ margin: "0 0 8px 0", fontWeight: "700" }}>⚠️ Error de Conexión</p>
            <p style={{ margin: 0, fontSize: "0.73rem", color: "#7f1d1d" }}>{errorMsg}</p>
            <button
              onClick={fetchConductores}
              style={{ marginTop: "10px", padding: "5px 10px", backgroundColor: "#991b1b", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}
            >
              Reintentar Conexión
            </button>
          </div>
        ) : filteredConductores.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b" }}>
            <UserGroupIcon size={28} color="#cbd5e1" style={{ margin: "0 auto 8px auto", display: "block" }} />
            <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0" }}>No hay conductores registrados.</p>
            <button
              onClick={handleOpenAdd}
              style={{ padding: "5px 12px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "600", cursor: "pointer" }}
            >
              + Registrar Conductor
            </button>
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={thStyle}>CONDUCTOR</th>
                  <th style={thStyle}>DNI / DOCUMENTO</th>
                  <th style={thStyle}>TELÉFONO</th>
                  <th style={thStyle}>DIRECCIÓN</th>
                  <th style={thStyle}>ESTADO</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredConductores.map((cond) => (
                  <tr key={cond.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ ...tdStyle, padding: "8px 10px", fontWeight: "600", color: "#0f172a" }}>
                      {cond.nombre}
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px", color: "#334155" }}>
                      {cond.documentoIdentidad}
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px", color: "#334155" }}>
                      {cond.telefono}
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px", color: "#334155" }}>
                      {cond.direccion}
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ 
                        fontSize: "0.7rem", 
                        fontWeight: "600", 
                        padding: "2px 8px", 
                        borderRadius: "12px",
                        backgroundColor: cond.estado === "Libre" ? "#f0fdf4" : "#fffbeb",
                        color: cond.estado === "Libre" ? "#166534" : "#b45309",
                        border: cond.estado === "Libre" ? "1px solid #bbf7d0" : "1px solid #fde68a"
                      }}>
                        {cond.estado}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cond)}
                          title="Editar"
                          style={actionBtnStyle}
                        >
                          <Edit01Icon size={13} color="#0284c7" /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingConductor(cond)}
                          title="Eliminar"
                          style={{
                            ...actionBtnStyle,
                            color: "#dc2626",
                            borderColor: "#fecaca",
                            backgroundColor: "#fef2f2"
                          }}
                        >
                          <ViewOffIcon size={13} color="#dc2626" /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: REGISTRAR / EDITAR CONDUCTOR */}
      <AnimatePresence>
        {(isAddModalOpen || editingConductor) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsAddModalOpen(false); setEditingConductor(null); }}
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
                maxWidth: "480px",
                maxHeight: "90vh",
                overflowY: "auto",
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
                  <h3 style={{ fontSize: "0.98rem", fontWeight: "700", color: "#0f172a", margin: "0" }}>
                    {editingConductor ? "Editar Conductor" : "Registrar Conductor"}
                  </h3>
                </div>
                <button onClick={() => { setIsAddModalOpen(false); setEditingConductor(null); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleSaveSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                
                <div>
                  <label style={labelStyle}>Nombre Completo</label>
                  <input type="text" required placeholder="Ej. Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Documento de Identidad (DNI/CE)</label>
                  <input type="text" required placeholder="Ej. 74839201" value={documentoIdentidad} onChange={(e) => setDocumentoIdentidad(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Teléfono</label>
                  <input type="text" placeholder="Ej. 987654321" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Dirección</label>
                  <input type="text" placeholder="Ej. Av. Los Pinos 123" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Estado</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value)} style={inputStyle}>
                    <option value="Libre">Libre</option>
                    <option value="Entregando">Entregando</option>
                  </select>
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "6px" }}>
                  {editingConductor ? "ACTUALIZAR CONDUCTOR" : "GUARDAR CONDUCTOR"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONFIRMACION ELIMINAR */}
      <AnimatePresence>
        {deletingConductor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingConductor(null)}
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
                maxWidth: "360px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0",
                textAlign: "center"
              }}
            >
              <div style={{ width: "48px", height: "48px", backgroundColor: "#fef2f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto" }}>
                <ViewOffIcon size={24} color="#dc2626" />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>¿Eliminar Conductor?</h3>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 20px 0" }}>
                Estás a punto de eliminar al conductor <strong>{deletingConductor.nombre}</strong>. Esta acción no se puede deshacer.
              </p>
              
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button
                  onClick={() => setDeletingConductor(null)}
                  style={{ padding: "8px 16px", backgroundColor: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", flex: 1 }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  style={{ padding: "8px 16px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", flex: 1 }}
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// STYLES
const thStyle: React.CSSProperties = {
  padding: "10px",
  color: "#475569",
  fontWeight: "700",
  fontSize: "0.68rem",
  textTransform: "uppercase",
  letterSpacing: "0.02em"
};

const tdStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  verticalAlign: "middle"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.75rem",
  color: "#334155",
  outline: "none"
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.65rem",
  fontWeight: "700",
  color: "#475569",
  textTransform: "uppercase",
  marginBottom: "4px"
};

const actionBtnStyle: React.CSSProperties = {
  padding: "4px 8px",
  backgroundColor: "#f0f9ff",
  color: "#0284c7",
  border: "1px solid #bae6fd",
  borderRadius: "6px",
  fontSize: "0.68rem",
  fontWeight: "600",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px"
};

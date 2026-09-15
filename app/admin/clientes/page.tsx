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
  UserIcon
} from "hugeicons-react";
import { clientesService } from "../../services/clientes.service";
import { ClienteDTO } from "../../types/cliente.dto";
import { TipoDocumento } from "../../types/enums.dto";

export default function ClientesAdminPage() {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("TODOS");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<ClienteDTO | null>(null);
  const [toggleStatusCliente, setToggleStatusCliente] = useState<ClienteDTO | null>(null);

  // CREATE FORM STATE
  const [nombreCompletoInput, setNombreCompletoInput] = useState("");
  const [tipoDocumentoInput, setTipoDocumentoInput] = useState<TipoDocumento | string>("DNI");
  const [numeroDocumentoInput, setNumeroDocumentoInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [telefonoInput, setTelefonoInput] = useState("");
  const [contraInput, setContraInput] = useState("");
  const [rolInput, setRolInput] = useState("CLIENTE");

  // EDIT FORM STATE
  const [editNombreCompleto, setEditNombreCompleto] = useState("");
  const [editTipoDocumento, setEditTipoDocumento] = useState<TipoDocumento | string>("DNI");
  const [editNumeroDocumento, setEditNumeroDocumento] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTelefono, setEditTelefono] = useState("");
  const [editContra, setEditContra] = useState("");
  const [editRol, setEditRol] = useState("CLIENTE");

  const roles = ["TODOS", "CLIENTE", "ADMIN"];

  const fetchClientes = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await clientesService.listar();
      setClientes(data);
    } catch (err: any) {
      console.error("Error backend API:", err);
      setErrorMsg("No hay conexión con el servidor backend Spring Boot.");
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter(c => {
    const matchesSearch = c.nombreCompleto?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.numeroDocumento?.includes(searchQuery) ||
                          c.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "TODOS" || c.rol === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleAddClienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreCompletoInput || !numeroDocumentoInput) return;

    try {
      await clientesService.crear({
        nombreCompleto: nombreCompletoInput,
        tipoDocumento: tipoDocumentoInput,
        numeroDocumento: numeroDocumentoInput,
        email: emailInput,
        telefono: telefonoInput,
        contra: contraInput,
        rol: rolInput
      });

      await fetchClientes();
      setIsAddModalOpen(false);
      // Reset form
      setNombreCompletoInput("");
      setTipoDocumentoInput("DNI");
      setNumeroDocumentoInput("");
      setEmailInput("");
      setTelefonoInput("");
      setContraInput("");
      setRolInput("CLIENTE");
    } catch (err: any) {
      alert("Error al conectar con la base de datos backend: " + err.message);
    }
  };

  const handleOpenEdit = (cliente: ClienteDTO) => {
    setEditingCliente(cliente);
    setEditNombreCompleto(cliente.nombreCompleto || "");
    setEditTipoDocumento(cliente.tipoDocumento || "DNI");
    setEditNumeroDocumento(cliente.numeroDocumento || cliente.numDocumento || "");
    setEditEmail(cliente.email || "");
    setEditTelefono(cliente.telefono || "");
    setEditContra(cliente.contra || "");
    setEditRol(cliente.rol || "CLIENTE");
  };

  const handleUpdateClienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCliente || !editingCliente.id) return;

    try {
      await clientesService.actualizar(editingCliente.id, {
        id: editingCliente.id,
        nombreCompleto: editNombreCompleto,
        tipoDocumento: editTipoDocumento,
        numeroDocumento: editNumeroDocumento,
        email: editEmail,
        telefono: editTelefono,
        contra: editContra,
        rol: editRol
      });

      await fetchClientes();
      setEditingCliente(null);
    } catch (err: any) {
      alert("Error al actualizar en la base de datos backend: " + err.message);
    }
  };

  const handleConfirmToggleStatus = async () => {
    if (!toggleStatusCliente || !toggleStatusCliente.id) return;
    try {
      await clientesService.eliminar(toggleStatusCliente.id);
      await fetchClientes();
      setToggleStatusCliente(null);
    } catch (err: any) {
      alert("Error al eliminar en la base de datos backend: " + err.message);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "0.75rem",
    backgroundColor: "#f8fafc",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const thStyle = {
    padding: "10px",
    color: "#475569",
    fontWeight: "700",
    fontSize: "0.65rem",
    textTransform: "uppercase" as const,
  };

  const tdStyle = {
    color: "#334155",
    verticalAlign: "middle" as const,
  };

  const actionBtnStyle = {
    padding: "5px 8px",
    backgroundColor: "#f0f9ff",
    color: "#0369a1",
    border: "1px solid #bae6fd",
    borderRadius: "6px",
    fontSize: "0.68rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
            Administración de Clientes
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Gestión de usuarios y clientes sincronizados con backend
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setIsAddModalOpen(true)}
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
            <Add01Icon size={14} color="#ffffff" /> Registrar Cliente
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
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
        {/* SEARCH BAR */}
        <div style={{ position: "relative", width: "260px" }}>
          <input
            type="text"
            placeholder="Buscar por nombre, documento o email..."
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

        {/* ROLE CHIPS */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", overflowX: "auto" }}>
            {roles.map((rol) => (
              <button
                key={rol}
                onClick={() => setSelectedRole(rol)}
                style={{
                  padding: "3px 9px",
                  borderRadius: "14px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: selectedRole === rol ? "1px solid #059669" : "1px solid #e2e8f0",
                  backgroundColor: selectedRole === rol ? "#ecfdf5" : "#f8fafc",
                  color: selectedRole === rol ? "#047857" : "#64748b"
                }}
              >
                {rol}
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
        </div>
      </div>

      {/* CLIENTES TABLE */}
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
              onClick={fetchClientes}
              style={{ marginTop: "10px", padding: "5px 10px", backgroundColor: "#991b1b", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}
            >
              Reintentar Conexión
            </button>
          </div>
        ) : filteredClientes.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b" }}>
            <UserIcon size={28} color="#cbd5e1" style={{ margin: "0 auto 8px auto", display: "block" }} />
            <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0" }}>No hay clientes para mostrar.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{ padding: "5px 12px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "600", cursor: "pointer" }}
            >
              + Registrar Cliente
            </button>
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ ...thStyle, width: "42px" }}></th>
                  <th style={thStyle}>CLIENTE</th>
                  <th style={thStyle}>DOCUMENTO</th>
                  <th style={thStyle}>CONTACTO</th>
                  <th style={thStyle}>ROL</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ ...tdStyle, padding: "8px 6px 8px 10px" }}>
                      <div style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "6px",
                        backgroundColor: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <UserIcon size={16} color="#64748b" />
                      </div>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.78rem" }}>{cliente.nombreCompleto}</span>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ fontSize: "0.62rem", fontWeight: "700", color: "#475569", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                        {cliente.tipoDocumento} - {cliente.numeroDocumento || cliente.numDocumento}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#334155", fontSize: "0.7rem" }}>{cliente.email}</span>
                        <span style={{ color: "#64748b", fontSize: "0.65rem" }}>{cliente.telefono}</span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: "600", color: "#166534", backgroundColor: "#f0fdf4", padding: "2px 6px", borderRadius: "4px" }}>
                        {cliente.rol || "CLIENTE"}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cliente)}
                          title="Editar Cliente"
                          style={actionBtnStyle}
                        >
                          <Edit01Icon size={13} color="#0284c7" /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setToggleStatusCliente(cliente)}
                          title="Eliminar Cliente"
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

      {/* MODAL 1: REGISTRAR NUEVO CLIENTE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
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
                  <h3 style={{ fontSize: "0.98rem", fontWeight: "700", color: "#0f172a", margin: "2px 0 0 0" }}>Registrar Cliente</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleAddClienteSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre Completo</label>
                  <input type="text" required placeholder="Ej. Juan Perez" value={nombreCompletoInput} onChange={(e) => setNombreCompletoInput(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Tipo Doc</label>
                    <select value={tipoDocumentoInput} onChange={(e) => setTipoDocumentoInput(e.target.value)} style={inputStyle}>
                      <option value="DNI">DNI</option>
                      <option value="CE">CE</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Número Doc</label>
                    <input type="text" required placeholder="Ej. 72483812" value={numeroDocumentoInput} onChange={(e) => setNumeroDocumentoInput(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Email</label>
                  <input type="email" required placeholder="ejemplo@correo.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Teléfono</label>
                  <input type="text" placeholder="Ej. 999888777" value={telefonoInput} onChange={(e) => setTelefonoInput(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Contraseña</label>
                  <input type="password" required placeholder="********" value={contraInput} onChange={(e) => setContraInput(e.target.value)} style={inputStyle} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "6px" }}>
                  GUARDAR CLIENTE
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDITAR CLIENTE */}
      <AnimatePresence>
        {editingCliente && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingCliente(null)}
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
                  <h3 style={{ fontSize: "0.98rem", fontWeight: "700", color: "#0f172a", margin: "2px 0 0 0" }}>Editar Cliente</h3>
                </div>
                <button onClick={() => setEditingCliente(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleUpdateClienteSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre Completo</label>
                  <input type="text" required value={editNombreCompleto} onChange={(e) => setEditNombreCompleto(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Tipo Doc</label>
                    <select value={editTipoDocumento} onChange={(e) => setEditTipoDocumento(e.target.value)} style={inputStyle}>
                      <option value="DNI">DNI</option>
                      <option value="CE">CE</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Número Doc</label>
                    <input type="text" required value={editNumeroDocumento} onChange={(e) => setEditNumeroDocumento(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Email</label>
                  <input type="email" required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Teléfono</label>
                  <input type="text" value={editTelefono} onChange={(e) => setEditTelefono(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Contraseña</label>
                  <input type="password" placeholder="******** (dejar vacío para no cambiar)" value={editContra} onChange={(e) => setEditContra(e.target.value)} style={inputStyle} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0284c7", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "6px" }}>
                  ACTUALIZAR CLIENTE
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONFIRMACION ELIMINAR */}
      <AnimatePresence>
        {toggleStatusCliente && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggleStatusCliente(null)}
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
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>¿Eliminar Cliente?</h3>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 20px 0" }}>
                Estás a punto de eliminar al cliente <strong>{toggleStatusCliente.nombreCompleto}</strong>. Esta acción no se puede deshacer.
              </p>
              
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button
                  onClick={() => setToggleStatusCliente(null)}
                  style={{ padding: "8px 16px", backgroundColor: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", flex: 1 }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmToggleStatus}
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

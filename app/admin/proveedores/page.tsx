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
  Building01Icon
} from "hugeicons-react";
import { ProveedorDTO } from "../../types";
import { proveedoresService } from "../../services/proveedores.service";

export default function ProveedoresAdminListPage() {
  const [suppliers, setSuppliers] = useState<ProveedorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("TODAS");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<ProveedorDTO | null>(null);
  const [deletingSupplier, setDeletingSupplier] = useState<ProveedorDTO | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await proveedoresService.listar();
      setSuppliers(data);
    } catch (err: any) {
      console.error("Error al consultar proveedores:", err);
      setErrorMsg(err.message || "Error al conectar con la base de datos de proveedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Extract unique cities for the chips
  const dynamicCities = ["TODAS", ...Array.from(new Set(suppliers.map(s => s.ciudad).filter(Boolean)))];

  const openCreateModal = () => {
    setEditingSupplier(null);
    setName("");
    setRuc("");
    setContact("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setIsModalOpen(true);
  };

  const openEditModal = (sup: ProveedorDTO) => {
    setEditingSupplier(sup);
    setName(sup.nombre || "");
    setRuc(sup.ruc || "");
    setContact(sup.contacto || "");
    setPhone(sup.telefono || "");
    setEmail(sup.email || "");
    setAddress(sup.direccion || "");
    setCity(sup.ciudad || "");
    setIsModalOpen(true);
  };

  const handleSaveSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ruc) return;

    setSaving(true);
    try {
      if (editingSupplier && editingSupplier.id) {
        // ACTUALIZAR PROVEEDOR EXISTENTE
        const updated = await proveedoresService.actualizar(editingSupplier.id, {
          nombre: name,
          ruc,
          contacto: contact,
          telefono: phone,
          email,
          direccion: address,
          ciudad: city
        });
        setSuppliers(prev => prev.map(s => s.id === updated.id ? updated : s));
      } else {
        // CREAR NUEVO PROVEEDOR
        const created = await proveedoresService.crear({
          nombre: name,
          ruc,
          contacto: contact,
          telefono: phone,
          email,
          direccion: address,
          ciudad: city
        });
        setSuppliers(prev => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Error al guardar proveedor: " + (err.message || "Verifica los datos ingresados"));
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingSupplier || !deletingSupplier.id) return;
    try {
      await proveedoresService.eliminar(deletingSupplier.id);
      setSuppliers(prev => prev.filter(s => s.id !== deletingSupplier.id));
      setDeletingSupplier(null);
    } catch (err: any) {
      alert("Error al eliminar proveedor: " + (err.message || "No se pudo completar la acción"));
    }
  };

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = (s.nombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.ruc || "").includes(searchQuery) ||
                          (s.contacto || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "TODAS" || s.ciudad === selectedCity;
    return matchesSearch && matchesCity;
  });

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
            Administración de Proveedores
          </h1>
          <p style={{ fontSize: "0.74rem", color: "#64748b", margin: "2px 0 0 0" }}>
            Directorio y gestión de proveedores sincronizados con backend
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={openCreateModal}
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
            <Add01Icon size={14} color="#ffffff" /> Registrar Proveedor
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
            placeholder="Buscar por proveedor, RUC o contacto..."
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

        {/* CITY CHIPS */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", overflowX: "auto" }}>
            {dynamicCities.slice(0, 5).map((cty) => (
              <button
                key={cty}
                onClick={() => setSelectedCity(cty as string)}
                style={{
                  padding: "3px 9px",
                  borderRadius: "14px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: selectedCity === cty ? "1px solid #059669" : "1px solid #e2e8f0",
                  backgroundColor: selectedCity === cty ? "#ecfdf5" : "#f8fafc",
                  color: selectedCity === cty ? "#047857" : "#64748b"
                }}
              >
                {cty}
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

      {/* PROVEEDORES TABLE */}
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
              onClick={fetchSuppliers}
              style={{ marginTop: "10px", padding: "5px 10px", backgroundColor: "#991b1b", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}
            >
              Reintentar Conexión
            </button>
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", color: "#64748b" }}>
            <Building01Icon size={28} color="#cbd5e1" style={{ margin: "0 auto 8px auto", display: "block" }} />
            <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0" }}>No hay proveedores para mostrar.</p>
            <button
              onClick={openCreateModal}
              style={{ padding: "5px 12px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "600", cursor: "pointer" }}
            >
              + Registrar Proveedor
            </button>
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ ...thStyle, width: "42px" }}></th>
                  <th style={thStyle}>PROVEEDOR</th>
                  <th style={thStyle}>RUC</th>
                  <th style={thStyle}>CONTACTO</th>
                  <th style={thStyle}>CELULAR</th>
                  <th style={thStyle}>UBICACIÓN</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((sup) => (
                  <tr key={sup.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
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
                        <Building01Icon size={16} color="#64748b" />
                      </div>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.78rem" }}>{sup.nombre}</span>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ fontSize: "0.62rem", fontWeight: "700", color: "#475569", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                        {sup.ruc}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#334155", fontSize: "0.7rem", fontWeight: "600" }}>{sup.contacto}</span>
                        <span style={{ color: "#64748b", fontSize: "0.65rem" }}>{sup.email}</span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <span style={{ color: "#334155", fontSize: "0.7rem", fontWeight: "500" }}>{sup.telefono || "-"}</span>
                    </td>
                    <td style={{ ...tdStyle, padding: "8px 10px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#334155", fontSize: "0.7rem" }}>{sup.ciudad || "No definida"}</span>
                        <span style={{ color: "#64748b", fontSize: "0.65rem" }}>{sup.direccion}</span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right", padding: "8px 10px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => openEditModal(sup)}
                          title="Editar Proveedor"
                          style={actionBtnStyle}
                        >
                          <Edit01Icon size={13} color="#0284c7" /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingSupplier(sup)}
                          title="Eliminar Proveedor"
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

      {/* MODAL CREAR / EDITAR PROVEEDOR */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
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
                  <h3 style={{ fontSize: "0.98rem", fontWeight: "700", color: "#0f172a", margin: "2px 0 0 0" }}>
                    {editingSupplier ? "Editar Proveedor" : "Registrar Proveedor"}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleSaveSupplier} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre o Razón Social</label>
                  <input type="text" required placeholder="Ej. Cosméticos Global S.A.C." value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>RUC</label>
                    <input type="text" required placeholder="20601234567" value={ruc} onChange={(e) => setRuc(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Ciudad</label>
                    <input type="text" placeholder="Ej. Lima" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre de Contacto</label>
                    <input type="text" placeholder="Ej. Elena Ramos" value={contact} onChange={(e) => setContact(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Teléfono / WhatsApp</label>
                    <input type="text" placeholder="+51 987 111 222" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Correo Electrónico</label>
                  <input type="email" placeholder="ventas@proveedor.pe" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Dirección</label>
                  <input type="text" placeholder="Av. Los Olivos 123" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: editingSupplier ? "#0284c7" : "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    cursor: saving ? "wait" : "pointer",
                    marginTop: "6px"
                  }}
                >
                  {saving ? "Guardando..." : editingSupplier ? "ACTUALIZAR PROVEEDOR" : "GUARDAR PROVEEDOR"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONFIRMACION ELIMINAR */}
      <AnimatePresence>
        {deletingSupplier && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingSupplier(null)}
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
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>¿Eliminar Proveedor?</h3>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 20px 0" }}>
                Estás a punto de eliminar al proveedor <strong>{deletingSupplier.nombre}</strong>. Esta acción no se puede deshacer.
              </p>
              
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button
                  onClick={() => setDeletingSupplier(null)}
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

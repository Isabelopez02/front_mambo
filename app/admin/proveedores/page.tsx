"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building01Icon, 
  Add01Icon, 
  Cancel01Icon, 
  Search01Icon, 
  SmartPhone01Icon, 
  Mail01Icon, 
  ArrowRight01Icon,
  Delete02Icon,
  PencilEdit01Icon,
  Location01Icon
} from "hugeicons-react";
import { ProveedorDTO } from "../../types";
import { proveedoresService } from "../../services/proveedores.service";

export default function ProveedoresAdminListPage() {
  const [suppliers, setSuppliers] = useState<ProveedorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<ProveedorDTO | null>(null);

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

  const handleDeleteSupplier = async (e: React.MouseEvent, id?: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    if (confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      try {
        await proveedoresService.eliminar(id);
        setSuppliers(prev => prev.filter(s => s.id !== id));
      } catch (err: any) {
        alert("Error al eliminar proveedor: " + (err.message || "No se pudo completar la acción"));
      }
    }
  };

  const filteredSuppliers = suppliers.filter(s =>
    (s.nombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.ruc || "").includes(searchQuery) ||
    (s.contacto || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.ciudad || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1.8px", textTransform: "uppercase" }}>
            GESTIÓN DE PROVEEDORES
          </span>
          <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.35rem", color: "#1a0f14", margin: "2px 0 0 0", fontWeight: "400" }}>
            Directorio de Proveedores
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          style={{
            padding: "9px 16px",
            backgroundColor: "#9c3552",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.74rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(156,53,82,0.2)"
          }}
        >
          <Add01Icon size={16} color="#fff" /> + Nuevo Proveedor
        </button>
      </div>

      {/* SEARCH BAR & SUMMARY */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #f3e2e8"
      }}>
        <div style={{ position: "relative", width: "280px" }}>
          <input
            type="text"
            placeholder="Buscar por proveedor, RUC o ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 32px 7px 12px",
              borderRadius: "6px",
              border: "1px solid #e0d0d6",
              fontSize: "0.75rem",
              backgroundColor: "#faf7f8",
              outline: "none"
            }}
          />
          <Search01Icon size={14} color="#9c3552" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        <span style={{ fontSize: "0.72rem", color: "#66585e" }}>
          Mostrando <strong>{filteredSuppliers.length}</strong> proveedores
        </span>
      </div>

      {/* ERROR BANNER */}
      {errorMsg && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "12px 16px", borderRadius: "10px", fontSize: "0.78rem" }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* LOADING STATE */}
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#66585e", fontSize: "0.85rem" }}>
          ⏳ Cargando proveedores desde la base de datos backend...
        </div>
      ) : filteredSuppliers.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#66585e", backgroundColor: "#ffffff", borderRadius: "14px", border: "1px dashed #e0d0d6" }}>
          No se encontraron proveedores registrados. ¡Crea el primero haciendo clic en <strong>+ Nuevo Proveedor</strong>!
        </div>
      ) : (
        /* SUPPLIER CARDS GRID */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {filteredSuppliers.map((sup) => (
            <motion.div
              key={sup.id}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #f3e2e8",
                padding: "16px",
                boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
                transition: "all 0.2s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", backgroundColor: "#fcf0f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Building01Icon size={18} color="#9c3552" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.88rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                        {sup.nombre}
                      </h3>
                      <span style={{ fontSize: "0.68rem", color: "#887980" }}>RUC: {sup.ruc}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      onClick={(e) => { e.preventDefault(); openEditModal(sup); }}
                      title="Editar Proveedor"
                      style={{ background: "#faf7f8", border: "1px solid #e0d0d6", borderRadius: "6px", padding: "4px 6px", cursor: "pointer" }}
                    >
                      <PencilEdit01Icon size={13} color="#9c3552" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteSupplier(e, sup.id)}
                      title="Eliminar Proveedor"
                      style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "4px 6px", cursor: "pointer" }}
                    >
                      <Delete02Icon size={13} color="#dc2626" />
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "10px", fontSize: "0.72rem", color: "#55494e" }}>
                  {sup.contacto && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <SmartPhone01Icon size={13} color="#9c3552" />
                      <span>Contacto: {sup.contacto} {sup.telefono ? `(${sup.telefono})` : ''}</span>
                    </div>
                  )}
                  {sup.email && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Mail01Icon size={13} color="#9c3552" />
                      <span>{sup.email}</span>
                    </div>
                  )}
                  {(sup.direccion || sup.ciudad) && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Location01Icon size={13} color="#9c3552" />
                      <span>{sup.direccion ? `${sup.direccion}, ` : ''}{sup.ciudad}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CARD FOOTER */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
                borderTop: "1px solid #f5eaee",
                marginTop: "4px"
              }}>
                <span style={{ fontSize: "0.68rem", color: "#887980" }}>
                  ID: #{sup.id}
                </span>

                <a
                  href={`/admin/proveedores/${sup.id}`}
                  style={{ fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", display: "inline-flex", alignItems: "center", gap: "2px", textDecoration: "none" }}
                >
                  Ver Detalle <ArrowRight01Icon size={12} color="#9c3552" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL CREAR / EDITAR PROVEEDOR */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(26, 15, 20, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
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
                maxWidth: "460px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #f3e2e8"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                  {editingSupplier ? "Editar Proveedor" : "Registrar Nuevo Proveedor"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#1a0f14" />
                </button>
              </div>

              <form onSubmit={handleSaveSupplier} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Nombre o Razón Social</label>
                  <input type="text" required placeholder="Ej. Cosméticos Global S.A.C." value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>RUC / DNI</label>
                    <input type="text" required placeholder="20601234567" value={ruc} onChange={(e) => setRuc(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Ciudad</label>
                    <input type="text" placeholder="Ej. Lima" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Nombre de Contacto</label>
                    <input type="text" placeholder="Ej. Elena Ramos" value={contact} onChange={(e) => setContact(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Teléfono / WhatsApp</label>
                    <input type="text" placeholder="+51 987 111 222" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Correo Electrónico</label>
                  <input type="email" placeholder="ventas@proveedor.pe" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Dirección</label>
                  <input type="text" placeholder="Av. Los Olivos 123" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#1a0f14",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    cursor: saving ? "wait" : "pointer",
                    marginTop: "8px"
                  }}
                >
                  {saving ? "Guardando..." : editingSupplier ? "ACTUALIZAR PROVEEDOR" : "GUARDAR PROVEEDOR"}
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
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #e0d0d6",
  fontSize: "0.75rem",
  outline: "none",
  backgroundColor: "#faf7f8",
  color: "#1a0f14"
};

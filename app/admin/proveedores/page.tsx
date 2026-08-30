"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building01Icon, 
  Add01Icon, 
  Cancel01Icon, 
  Search01Icon, 
  ShoppingBag01Icon, 
  SmartPhone01Icon, 
  Mail01Icon, 
  ArrowRight01Icon
} from "hugeicons-react";

export interface SupplierProduct {
  id: string;
  qrCode: string;
  nombre: string;
  categoria: string;
  precioCosto: number;
  precioVenta: number;
  stock: number;
}

export interface Supplier {
  id: number;
  nombre: string;
  ruc: string;
  contacto: string;
  telefono: string;
  email: string;
  categoriaPrincipal: string;
  productos: SupplierProduct[];
}

export const initialSuppliers: Supplier[] = [
  {
    id: 1,
    nombre: "Cosméticos Global S.A.C.",
    ruc: "20601234567",
    contacto: "Elena Ramos",
    telefono: "+51 987 111 222",
    email: "ventas@cosmeticosglobal.pe",
    categoriaPrincipal: "Maquillaje & Skincare",
    productos: [
      { id: "PROD-8801", qrCode: "880199201", nombre: "Kit Maquillaje Glow", categoria: "Maquillaje", precioCosto: 18.00, precioVenta: 35.00, stock: 150 },
      { id: "PROD-8802", qrCode: "880299302", nombre: "Serum Hidratante Skincare", categoria: "Skincare", precioCosto: 14.50, precioVenta: 29.90, stock: 80 }
    ]
  },
  {
    id: 2,
    nombre: "Importaciones Moda Luxe E.I.R.L.",
    ruc: "20549876543",
    contacto: "Carlos Mendoza",
    telefono: "+51 912 333 444",
    email: "contacto@modaluxe.pe",
    categoriaPrincipal: "Carteras & Calzado",
    productos: [
      { id: "PROD-7701", qrCode: "770144501", nombre: "Cartera Chic Luxe", categoria: "Carteras", precioCosto: 32.00, precioVenta: 59.00, stock: 45 },
      { id: "PROD-7702", qrCode: "770244602", nombre: "Bolso Shoulder Nude", categoria: "Carteras", precioCosto: 25.00, precioVenta: 49.00, stock: 60 }
    ]
  },
  {
    id: 3,
    nombre: "DecoHogar Import Perú",
    ruc: "20491827364",
    contacto: "Sofía Torres",
    telefono: "+51 955 777 888",
    email: "pedidos@deconogarimport.pe",
    categoriaPrincipal: "Hogar & Decoración",
    productos: [
      { id: "PROD-6601", qrCode: "660122301", nombre: "Jarrón Cerámica Deco", categoria: "Hogar", precioCosto: 22.00, precioVenta: 42.00, stock: 30 }
    ]
  }
];

export default function ProveedoresAdminListPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);

  // New Supplier Form State
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierRuc, setNewSupplierRuc] = useState("");
  const [newSupplierContact, setNewSupplierContact] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  const [newSupplierEmail, setNewSupplierEmail] = useState("");
  const [newSupplierCategory, setNewSupplierCategory] = useState("Maquillaje");

  const filteredSuppliers = suppliers.filter(s =>
    s.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.ruc.includes(searchQuery) ||
    s.categoriaPrincipal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplierName || !newSupplierRuc) return;

    const created: Supplier = {
      id: Date.now(),
      nombre: newSupplierName,
      ruc: newSupplierRuc,
      contacto: newSupplierContact || "Por asignar",
      telefono: newSupplierPhone || "+51 900 000 000",
      email: newSupplierEmail || "contacto@proveedor.pe",
      categoriaPrincipal: newSupplierCategory,
      productos: []
    };

    setSuppliers([created, ...suppliers]);
    setIsAddSupplierOpen(false);

    setNewSupplierName("");
    setNewSupplierRuc("");
    setNewSupplierContact("");
    setNewSupplierPhone("");
    setNewSupplierEmail("");
  };

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
          onClick={() => setIsAddSupplierOpen(true)}
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
            placeholder="Buscar por proveedor, RUC o categoría..."
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

      {/* SUPPLIER CARDS GRID (CLICK REDIRECTS TO /admin/proveedores/[id]) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {filteredSuppliers.map((sup) => (
          <a
            key={sup.id}
            href={`/admin/proveedores/${sup.id}`}
            style={{ textDecoration: "none" }}
          >
            <motion.div
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

                  <span style={{
                    fontSize: "0.58rem",
                    fontWeight: "700",
                    backgroundColor: "#fcf0f4",
                    color: "#9c3552",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase"
                  }}>
                    {sup.categoriaPrincipal.split(" ")[0]}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "10px", fontSize: "0.72rem", color: "#55494e" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <SmartPhone01Icon size={13} color="#9c3552" />
                    <span>Contacto: {sup.contacto} ({sup.telefono})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Mail01Icon size={13} color="#9c3552" />
                    <span>{sup.email}</span>
                  </div>
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
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShoppingBag01Icon size={14} color="#10b981" />
                  <span style={{ fontSize: "0.72rem", fontWeight: "600", color: "#1a0f14" }}>
                    {sup.productos.length} productos
                  </span>
                </div>

                <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#9c3552", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                  Ver Detalle <ArrowRight01Icon size={12} color="#9c3552" />
                </span>
              </div>
            </motion.div>
          </a>
        ))}
      </div>

      {/* MODAL NUEVO PROVEEDOR (CENTERED IN MIDDLE OF SCREEN) */}
      <AnimatePresence>
        {isAddSupplierOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddSupplierOpen(false)}
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
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>Registrar Nuevo Proveedor</h3>
                <button onClick={() => setIsAddSupplierOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#1a0f14" />
                </button>
              </div>

              <form onSubmit={handleAddSupplier} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Nombre o Razón Social</label>
                  <input type="text" required placeholder="Ej. Cosméticos Global S.A.C." value={newSupplierName} onChange={(e) => setNewSupplierName(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>RUC / DNI</label>
                    <input type="text" required placeholder="20601234567" value={newSupplierRuc} onChange={(e) => setNewSupplierRuc(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Categoría Principal</label>
                    <select value={newSupplierCategory} onChange={(e) => setNewSupplierCategory(e.target.value)} style={inputStyle}>
                      <option value="Maquillaje">Maquillaje</option>
                      <option value="Skincare">Skincare</option>
                      <option value="Carteras & Accesorios">Carteras & Accesorios</option>
                      <option value="Hogar & Decoración">Hogar & Decoración</option>
                      <option value="Calzado">Calzado</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Nombre de Contacto</label>
                    <input type="text" placeholder="Ej. Elena Ramos" value={newSupplierContact} onChange={(e) => setNewSupplierContact(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Teléfono / WhatsApp</label>
                    <input type="text" placeholder="+51 987 111 222" value={newSupplierPhone} onChange={(e) => setNewSupplierPhone(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", marginBottom: "4px" }}>Correo Electrónico</label>
                  <input type="email" placeholder="ventas@proveedor.pe" value={newSupplierEmail} onChange={(e) => setNewSupplierEmail(e.target.value)} style={inputStyle} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#1a0f14", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
                  GUARDAR PROVEEDOR
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

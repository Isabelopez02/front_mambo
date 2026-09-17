"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cancel01Icon, 
  Mail01Icon, 
  LockIcon, 
  UserIcon, 
  ViewIcon, 
  ViewOffIcon,
  CreditCardIcon
} from "hugeicons-react";
import { authService } from "../../services/auth.service";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (tab === "login") {
        await authService.login({ numeroDocumento: email, password }); // email state acts as identifier (DNI or Email)
        window.location.reload();
      } else {
        await authService.register({
          numeroDocumento: dni,
          password: password,
          email: email,
          nombre: nombre,
          apellidos: apellidos
        });
        window.location.reload();
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || error.message || "Ocurrió un error al autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(26, 15, 20, 0.6)", zIndex: 1100, backdropFilter: "blur(4px)" }}
          />

          {/* MODAL CONTAINER */}
          <div style={{ position: "fixed", inset: 0, zIndex: 1101, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", pointerEvents: "none" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ width: "100%", maxWidth: "420px", maxHeight: "90vh", overflowY: "auto", backgroundColor: "#ffffff", borderRadius: "20px", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)", pointerEvents: "auto", border: "1px solid #f3e2e8" }}
            >
              {/* HEADER */}
              <div style={{ backgroundColor: "#fcf0f4", padding: "24px 24px 20px 24px", textAlign: "center", position: "relative", borderBottom: "1px solid #f3e2e8" }}>
                <button
                  onClick={onClose}
                  style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Cancel01Icon size={18} color="#1a0f14" />
                </button>

                <span style={{ fontSize: "0.62rem", letterSpacing: "2.5px", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  TATY IMPORTACIONES
                </span>

                <h2 style={{ fontFamily: "'DM Serif Display', var(--font-dm-serif), Georgia, serif", fontSize: "1.6rem", color: "#1a0f14", fontWeight: "400", margin: "0 0 16px 0" }}>
                  {tab === "login" ? "¡Hola de Nuevo!" : "Crea tu Cuenta"}
                </h2>

                {/* TAB SWITCHER */}
                <div style={{ display: "flex", backgroundColor: "#ffffff", borderRadius: "25px", padding: "4px", border: "1px solid #e0d0d6" }}>
                  <button
                    type="button"
                    onClick={() => { setTab("login"); setErrorMsg(""); }}
                    style={{ flex: 1, padding: "8px 0", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "1px", border: "none", backgroundColor: tab === "login" ? "#1a0f14" : "transparent", color: tab === "login" ? "#ffffff" : "#66585e", cursor: "pointer", transition: "all 0.2s ease" }}
                  >
                    INICIAR SESIÓN
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTab("register"); setErrorMsg(""); }}
                    style={{ flex: 1, padding: "8px 0", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "1px", border: "none", backgroundColor: tab === "register" ? "#1a0f14" : "transparent", color: tab === "register" ? "#ffffff" : "#66585e", cursor: "pointer", transition: "all 0.2s ease" }}
                  >
                    REGISTRARSE
                  </button>
                </div>
              </div>

              {/* FORM BODY */}
              <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
                {errorMsg && (
                  <div style={{ backgroundColor: "#ffeef0", color: "#d32f2f", padding: "10px", borderRadius: "8px", fontSize: "0.75rem", marginBottom: "16px", textAlign: "center", border: "1px solid #ffcdd2" }}>
                    {errorMsg}
                  </div>
                )}

                {tab === "register" && (
                  <>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", letterSpacing: "1px", color: "#9c3552", marginBottom: "6px", textTransform: "uppercase" }}>
                        Nombre
                      </label>
                      <div style={{ position: "relative" }}>
                        <input type="text" required placeholder="Ej. Maria" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
                        <UserIcon size={16} color="#9c3552" style={iconStyle} />
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", letterSpacing: "1px", color: "#9c3552", marginBottom: "6px", textTransform: "uppercase" }}>
                        Apellidos
                      </label>
                      <div style={{ position: "relative" }}>
                        <input type="text" required placeholder="Ej. Garcia Perez" value={apellidos} onChange={(e) => setApellidos(e.target.value)} style={inputStyle} />
                        <UserIcon size={16} color="#9c3552" style={iconStyle} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", letterSpacing: "1px", color: "#9c3552", marginBottom: "6px", textTransform: "uppercase" }}>
                        DNI
                      </label>
                      <div style={{ position: "relative" }}>
                        <input type="text" required placeholder="Ej. 70123456" value={dni} onChange={(e) => setDni(e.target.value)} style={inputStyle} />
                        <CreditCardIcon size={16} color="#9c3552" style={iconStyle} />
                      </div>
                    </div>
                  </>
                )}

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: "700", letterSpacing: "1px", color: "#9c3552", marginBottom: "6px", textTransform: "uppercase" }}>
                    {tab === "login" ? "Correo Electrónico o DNI" : "Correo Electrónico"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={tab === "login" ? "text" : "email"}
                      required
                      placeholder={tab === "login" ? "tu.email@ejemplo.com o DNI" : "tu.email@ejemplo.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                    <Mail01Icon size={16} color="#9c3552" style={iconStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "0.68rem", fontWeight: "700", letterSpacing: "1px", color: "#9c3552", textTransform: "uppercase" }}>
                      Contraseña
                    </label>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                    />
                    <LockIcon size={16} color="#9c3552" style={iconStyle} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "2px" }}
                    >
                      {showPassword ? <ViewOffIcon size={16} color="#66585e" /> : <ViewIcon size={16} color="#66585e" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", padding: "12px", backgroundColor: "#1a0f14", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px", boxShadow: "0 4px 12px rgba(26, 15, 20, 0.2)", transition: "background-color 0.2s ease", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "PROCESANDO..." : (tab === "login" ? "INICIAR SESIÓN" : "CREAR MI CUENTA")}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputStyle = { width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 38px", borderRadius: "8px", border: "1px solid #e0d0d6", fontSize: "0.82rem", outline: "none", backgroundColor: "#faf7f8", color: "#1a0f14" } as React.CSSProperties;
const iconStyle = { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" } as React.CSSProperties;

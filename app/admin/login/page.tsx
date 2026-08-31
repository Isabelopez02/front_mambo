"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Mail01Icon, 
  LockIcon, 
  ShoppingBag01Icon, 
  CheckmarkBadge01Icon,
  ArrowRight01Icon
} from "hugeicons-react";
import { authService } from "../../services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@gmail.com");
  const [passwordInput, setPasswordInput] = useState("admin1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isRegisterMode) {
        await authService.register(emailInput, passwordInput, "Administrador General");
        setSuccessMsg("¡Administrador registrado exitosamente en la BD!");
      } else {
        await authService.login(emailInput, passwordInput);
        setSuccessMsg("¡Sesión iniciada con éxito! Accediendo...");
      }

      setTimeout(() => {
        router.push("/admin");
      }, 700);
    } catch (err: any) {
      setError(err.message || "Error de correo o contraseña en la base de datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a", // Dark Slate background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "var(--font-geist-sans), sans-serif"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          border: "1px solid #1e293b"
        }}
      >
        {/* LOGO HEADER */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            width: "54px",
            height: "54px",
            borderRadius: "14px",
            backgroundColor: "#0f172a",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
            boxShadow: "0 10px 20px rgba(15,23,42,0.2)"
          }}>
            <ShoppingBag01Icon size={26} color="#ffffff" />
          </div>

          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#059669", letterSpacing: "2px", textTransform: "uppercase", display: "block" }}>
            PANEL DE ADMINISTRACIÓN MAMBO
          </span>
          <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.5rem", color: "#0f172a", margin: "4px 0 0 0", fontWeight: "400" }}>
            {isRegisterMode ? "Registro de Administrador" : "Acceso Administrador"}
          </h1>
          <p style={{ fontSize: "0.76rem", color: "#64748b", margin: "4px 0 0 0" }}>
            {isRegisterMode 
              ? "Registra tu correo y contraseña en la Base de Datos" 
              : "Ingresa con tu correo y contraseña de administrador"}
          </p>
        </div>

        {/* NOTIFICATIONS */}
        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 14px", borderRadius: "8px", fontSize: "0.75rem", marginBottom: "16px" }}>
            ⚠️ {error}
          </div>
        )}

        {successMsg && (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "10px 14px", borderRadius: "8px", fontSize: "0.75rem", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckmarkBadge01Icon size={16} color="#166534" /> {successMsg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          
          {/* CORREO ELECTRÓNICO */}
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
              Correo Electrónico (Email)
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                placeholder="admin@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={inputStyle}
              />
              <Mail01Icon size={16} color="#64748b" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          {/* CONTRASEÑA */}
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                required
                placeholder="admin1234"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={inputStyle}
              />
              <LockIcon size={16} color="#64748b" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.8rem",
              fontWeight: "700",
              cursor: loading ? "wait" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "8px",
              boxShadow: "0 4px 12px rgba(15,23,42,0.2)"
            }}
          >
            {loading 
              ? "Validando..." 
              : isRegisterMode 
                ? "Registrar Admin (admin@gmail.com)" 
                : "Iniciar Sesión (admin@gmail.com)"
            }
            {!loading && <ArrowRight01Icon size={16} color="#ffffff" />}
          </button>
        </form>

        {/* TOGGLE MODE FOOTER */}
        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
            {isRegisterMode ? "¿Ya registraste tu correo?" : "¿Nuevo Administrador?"}{" "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError(null);
              setSuccessMsg(null);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#059669",
              fontSize: "0.75rem",
              fontWeight: "700",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {isRegisterMode ? "Iniciar Sesión" : "Crear Nuevo Registro"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "9px 36px 9px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.78rem",
  outline: "none",
  backgroundColor: "#f8fafc",
  color: "#0f172a"
};

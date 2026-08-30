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
  ShoppingBag01Icon
} from "hugeicons-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(tab === "login" ? `Bienvenido de nuevo, ${email}` : `Cuenta creada exitosamente para ${name}`);
    onClose();
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
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(26, 15, 20, 0.6)",
              zIndex: 1100,
              backdropFilter: "blur(4px)"
            }}
          />

          {/* MODAL CONTAINER */}
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 1101,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            pointerEvents: "none"
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                width: "100%",
                maxWidth: "420px",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                pointerEvents: "auto",
                border: "1px solid #f3e2e8"
              }}
            >
              {/* HEADER */}
              <div style={{
                backgroundColor: "#fcf0f4",
                padding: "24px 24px 20px 24px",
                textAlign: "center",
                position: "relative",
                borderBottom: "1px solid #f3e2e8"
              }}>
                <button
                  onClick={onClose}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Cancel01Icon size={18} color="#1a0f14" />
                </button>

                <span style={{
                  fontSize: "0.62rem",
                  letterSpacing: "2.5px",
                  fontWeight: "700",
                  color: "#9c3552",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "4px"
                }}>
                  TATY IMPORTACIONES
                </span>

                <h2 style={{
                  fontFamily: "'DM Serif Display', var(--font-dm-serif), Georgia, serif",
                  fontSize: "1.6rem",
                  color: "#1a0f14",
                  fontWeight: "400",
                  margin: "0 0 16px 0"
                }}>
                  {tab === "login" ? "¡Hola de Nuevo!" : "Crea tu Cuenta"}
                </h2>

                {/* TAB SWITCHER */}
                <div style={{
                  display: "flex",
                  backgroundColor: "#ffffff",
                  borderRadius: "25px",
                  padding: "4px",
                  border: "1px solid #e0d0d6"
                }}>
                  <button
                    onClick={() => setTab("login")}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: "20px",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      border: "none",
                      backgroundColor: tab === "login" ? "#1a0f14" : "transparent",
                      color: tab === "login" ? "#ffffff" : "#66585e",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    INICIAR SESIÓN
                  </button>
                  <button
                    onClick={() => setTab("register")}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: "20px",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      border: "none",
                      backgroundColor: tab === "register" ? "#1a0f14" : "transparent",
                      color: tab === "register" ? "#ffffff" : "#66585e",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    REGISTRARSE
                  </button>
                </div>
              </div>

              {/* FORM BODY */}
              <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
                {tab === "register" && (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "0.68rem",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      color: "#9c3552",
                      marginBottom: "6px",
                      textTransform: "uppercase"
                    }}>
                      Nombre Completo
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Maria Garcia"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "10px 12px 10px 38px",
                          borderRadius: "8px",
                          border: "1px solid #e0d0d6",
                          fontSize: "0.82rem",
                          outline: "none",
                          backgroundColor: "#faf7f8",
                          color: "#1a0f14"
                        }}
                      />
                      <UserIcon size={16} color="#9c3552" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "0.68rem",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: "#9c3552",
                    marginBottom: "6px",
                    textTransform: "uppercase"
                  }}>
                    Correo Electrónico
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      required
                      placeholder="tu.email@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "10px 12px 10px 38px",
                        borderRadius: "8px",
                        border: "1px solid #e0d0d6",
                        fontSize: "0.82rem",
                        outline: "none",
                        backgroundColor: "#faf7f8",
                        color: "#1a0f14"
                      }}
                    />
                    <Mail01Icon size={16} color="#9c3552" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{
                      fontSize: "0.68rem",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      color: "#9c3552",
                      textTransform: "uppercase"
                    }}>
                      Contraseña
                    </label>
                    {tab === "login" && (
                      <a href="#" style={{ fontSize: "0.68rem", color: "#9c3552", textDecoration: "none", fontWeight: "600" }}>
                        ¿Olvidaste tu contraseña?
                      </a>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "10px 38px 10px 38px",
                        borderRadius: "8px",
                        border: "1px solid #e0d0d6",
                        fontSize: "0.82rem",
                        outline: "none",
                        backgroundColor: "#faf7f8",
                        color: "#1a0f14"
                      }}
                    />
                    <LockIcon size={16} color="#9c3552" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px"
                      }}
                    >
                      {showPassword ? <ViewOffIcon size={16} color="#66585e" /> : <ViewIcon size={16} color="#66585e" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#1a0f14",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "8px",
                    boxShadow: "0 4px 12px rgba(26, 15, 20, 0.2)",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9c3552")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a0f14")}
                >
                  {tab === "login" ? "INICIAR SESIÓN" : "CREAR MI CUENTA"}
                </button>

                {/* DIVIDER */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                  gap: "10px"
                }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#f3e2e8" }} />
                  <span style={{ fontSize: "0.68rem", color: "#66585e", textTransform: "uppercase", letterSpacing: "0.5px" }}>o continúa con</span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#f3e2e8" }} />
                </div>

                {/* SOCIAL BUTTONS */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => alert("Inicio de sesión con Google en desarrollo")}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #e0d0d6",
                      backgroundColor: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      color: "#1a0f14",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px"
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Inicio de sesión con WhatsApp en desarrollo")}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #e0d0d6",
                      backgroundColor: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      color: "#1a0f14",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px"
                    }}
                  >
                    <span style={{ color: "#25D366", fontWeight: "bold" }}>WA</span>
                    WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

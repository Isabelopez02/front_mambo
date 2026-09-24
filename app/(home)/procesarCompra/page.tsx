"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart01Icon, DeliveryTruck01Icon, CreditCardIcon, CheckmarkBadge01Icon, ArrowRight01Icon, ArrowLeft01Icon, UserIcon } from "hugeicons-react";
import { useCart } from "../../components/context/CartContext";
import { compraService, CompraRequestDTO } from "../../services/compra.service";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export default function ProcesarCompraPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  // Auth state
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [authDni, setAuthDni] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [step, setStep] = useState(1);

  // Form states
  const [agencia, setAgencia] = useState("SHALOM");
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [local, setLocal] = useState("");

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [tipoComprobante, setTipoComprobante] = useState("BOLETA");
  const [tipoPago, setTipoPago] = useState("TRANSFERENCIA_BANCARIA");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
    setIsAuthChecking(false);
    
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      if (user) {
        setNumDocumento(user.numeroDocumento || "");
        setNombreCompleto(user.nombre || "");
      }
    }
  }, []);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (authMode === "LOGIN") {
        await authService.login(authDni, authPassword);
      } else {
        await authService.register(authDni, authPassword, "Cliente " + authDni);
      }
      setIsLoggedIn(true);
      const user = authService.getCurrentUser();
      if (user) {
        setNumDocumento(user.numeroDocumento || "");
        if (user.nombre !== "Administrador") setNombreCompleto(user.nombre || "");
      }
    } catch (err: any) {
      setAuthError(err.response?.data?.message || err.message || "Error al autenticar");
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (!local || !nombreCompleto || !numDocumento) {
        setErrorMsg("Por favor, selecciona la sede y completa los datos de facturación.");
        return;
      }
      setErrorMsg("");
    }
    setStep(s => s + 1);
  };

  const handlePrev = () => {
    setErrorMsg("");
    setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    const payload: CompraRequestDTO = {
      envio: {
        tipoEnvio: "RECOJO_TIENDA",
        direccionEnvio: local || "Sede Centro Histórico", // Where the user will pick it up
        ciudad: "Lima", 
        costoEnvio: 0.0,
        referencia: "Recojo Presencial"
      },
      destinatario: {
        nombreCompleto: nombreCompleto,
        numDocumento: numDocumento,
        telefono: "",
        email: "",
        apellidos: ""
      },
      pago: {
        precio: cartTotal,
        tipoPago: tipoPago
      },
      tipoComprobante: tipoComprobante,
      detalles: cartItems.map(item => ({
        productoId: item.id,
        nombreProducto: item.title,
        precioUnitario: item.price,
        cantidad: item.quantity,
        subtotal: item.price * item.quantity
      }))
    };

    try {
      await compraService.procesarCheckout(payload);
      setSuccess(true);
      clearCart();
    } catch (error: any) {
      setErrorMsg(error.message || "Ocurrió un error al procesar tu compra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthChecking) return <div style={{ minHeight: "100vh", backgroundColor: "#faf7f8" }} />;

  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: "#faf7f8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", maxWidth: "400px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#fcf0f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserIcon size={30} color="#9c3552" />
            </div>
          </div>
          <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#1a0f14", marginBottom: "10px", fontFamily: '"DM Serif Display", serif' }}>
            {authMode === "LOGIN" ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#66585e", marginBottom: "30px" }}>
            Para procesar tu compra, necesitas estar registrado en la tienda.
          </p>
          
          {authError && (
            <div style={{ backgroundColor: "#ffeef0", color: "#d32f2f", padding: "10px", borderRadius: "8px", fontSize: "0.8rem", marginBottom: "20px", textAlign: "center" }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", marginBottom: "8px" }}>DNI / RUC</label>
              <input type="text" required value={authDni} onChange={e => setAuthDni(e.target.value)} placeholder="Tu número de documento" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2d5da", outline: "none", fontSize: "0.85rem" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", marginBottom: "8px" }}>Contraseña</label>
              <input type="password" required value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="Tu contraseña" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2d5da", outline: "none", fontSize: "0.85rem" }} />
            </div>
            <button type="submit" style={{ backgroundColor: "#9c3552", color: "#fff", border: "none", padding: "14px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", marginTop: "10px" }}>
              {authMode === "LOGIN" ? "Ingresar y Continuar" : "Registrarse y Continuar"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button type="button" onClick={() => setAuthMode(authMode === "LOGIN" ? "REGISTER" : "LOGIN")} style={{ background: "none", border: "none", color: "#9c3552", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}>
              {authMode === "LOGIN" ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia Sesión"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#faf7f8", padding: "20px" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "20px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", maxWidth: "400px" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#28a745", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
            <CheckmarkBadge01Icon size={32} color="#fff" />
          </div>
          <h2 style={{ fontSize: "1.5rem", color: "#1a0f14", marginBottom: "10px" }}>¡Compra Registrada!</h2>
          <p style={{ fontSize: "0.9rem", color: "#66585e", marginBottom: "24px", lineHeight: "1.5" }}>
            Tu pedido ha sido registrado con estado <strong>PENDIENTE</strong>. Nos comunicaremos pronto para confirmar el envío.
          </p>
          <button onClick={() => router.push("/")} style={{ backgroundColor: "#9c3552", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "30px", fontWeight: "600", cursor: "pointer", width: "100%" }}>
            Volver a la tienda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#faf7f8", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2rem", color: "#1a0f14", fontFamily: '"DM Serif Display", serif', marginBottom: "12px" }}>Finalizar Compra</h1>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            {[
              { num: 1, icon: <ShoppingCart01Icon size={16} />, label: "Resumen" },
              { num: 2, icon: <DeliveryTruck01Icon size={16} />, label: "Envío" },
              { num: 3, icon: <CreditCardIcon size={16} />, label: "Pago" }
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{ 
                    width: "36px", height: "36px", borderRadius: "50%", 
                    backgroundColor: step >= s.num ? "#9c3552" : "#fff", 
                    border: step >= s.num ? "none" : "1px solid #e2d5da",
                    color: step >= s.num ? "#fff" : "#9c3552",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease"
                  }}>
                    {s.icon}
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", color: step >= s.num ? "#1a0f14" : "#9c8e93" }}>{s.label}</span>
                </div>
                {i < 2 && <div style={{ width: "40px", height: "2px", backgroundColor: step > s.num ? "#9c3552" : "#e2d5da", marginTop: "-16px" }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          {errorMsg && (
            <div style={{ backgroundColor: "#ffeef0", color: "#d32f2f", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.85rem", fontWeight: "500", border: "1px solid #ffcdd2" }}>
              {errorMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1a0f14", marginBottom: "20px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>Resumen del Carrito</h3>
                {cartItems.length === 0 ? (
                  <p style={{ textAlign: "center", padding: "30px", color: "#66585e" }}>Tu carrito está vacío.</p>
                ) : (
                  <>
                    <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
                      {cartItems.map(item => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px dashed #f5eaee" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img src={item.img} alt={item.title} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover", backgroundColor: "#f5f5f5" }} />
                            <div>
                              <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1a0f14", margin: "0 0 4px 0" }}>{item.title}</p>
                              <p style={{ fontSize: "0.75rem", color: "#66585e", margin: 0 }}>Cant: {item.quantity} x S/. {item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "#9c3552", margin: 0 }}>S/. {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#faf7f8", padding: "16px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#66585e" }}>Total ({totalItemsCount} productos)</span>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1a0f14" }}>S/. {cartTotal.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1a0f14", marginBottom: "20px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>Datos Logísticos de Envío</h3>
                
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ backgroundColor: "#fcf0f4", padding: "16px", borderRadius: "12px", border: "1px solid #f5eaee", marginBottom: "16px" }}>
                    <p style={{ fontSize: "0.85rem", color: "#9c3552", fontWeight: "600", margin: 0 }}>
                      ⚠️ Por el momento todas las entregas son exclusivamente de recojo presencial en nuestras sedes.
                    </p>
                  </div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", marginBottom: "8px" }}>Selecciona la Sede de Recojo</label>
                  <select value={local} onChange={e => setLocal(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2d5da", outline: "none", fontSize: "0.85rem", cursor: "pointer" }}>
                    <option value="" disabled>Seleccione una sede...</option>
                    <option value="Sede Centro Histórico">Sede Centro Histórico</option>
                    <option value="Sede Gamarra Luxe">Sede Gamarra Luxe</option>
                    <option value="Sede Los Olivos - Lima Norte">Sede Los Olivos - Lima Norte</option>
                    <option value="Sede Miraflores Boutique">Sede Miraflores Boutique</option>
                  </select>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1a0f14", marginBottom: "20px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>Datos de Facturación</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", marginBottom: "8px" }}>Nombre Completo / Razón Social</label>
                    <input type="text" value={nombreCompleto} onChange={e => setNombreCompleto(e.target.value)} placeholder="Ingresa el nombre de facturación" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2d5da", outline: "none", fontSize: "0.85rem" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", marginBottom: "8px" }}>DNI / RUC</label>
                    <input type="text" value={numDocumento} onChange={e => setNumDocumento(e.target.value)} placeholder="Número de Documento" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2d5da", outline: "none", fontSize: "0.85rem" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14", marginBottom: "8px" }}>Tipo de Comprobante</label>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                      <input type="radio" name="comprobante" value="BOLETA" checked={tipoComprobante === "BOLETA"} onChange={() => setTipoComprobante("BOLETA")} style={{ accentColor: "#9c3552" }} /> Boleta
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                      <input type="radio" name="comprobante" value="FACTURA" checked={tipoComprobante === "FACTURA"} onChange={() => setTipoComprobante("FACTURA")} style={{ accentColor: "#9c3552" }} /> Factura
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1a0f14", marginBottom: "20px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>Método de Pago</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  {[
                    { value: "TRANSFERENCIA_BANCARIA", label: "Transferencia" },
                    { value: "YAPE", label: "Yape / Plin" },
                    { value: "TARJETA", label: "Tarjeta (Pasarela)" }
                  ].map(metodo => (
                    <button
                      key={metodo.value}
                      type="button"
                      onClick={() => setTipoPago(metodo.value)}
                      style={{
                        padding: "16px",
                        border: tipoPago === metodo.value ? "2px solid #9c3552" : "1px solid #e2d5da",
                        borderRadius: "12px",
                        backgroundColor: tipoPago === metodo.value ? "#fff0f3" : "#fff",
                        color: tipoPago === metodo.value ? "#9c3552" : "#66585e",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        transition: "all 0.2s"
                      }}
                    >
                      <CreditCardIcon size={18} color={tipoPago === metodo.value ? "#9c3552" : "#66585e"} />
                      {metodo.label}
                    </button>
                  ))}
                </div>

                <div style={{ backgroundColor: "#faf7f8", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
                  <p style={{ fontSize: "0.8rem", color: "#66585e", margin: "0 0 4px 0" }}>Total a pagar</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>S/. {cartTotal.toFixed(2)}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", borderTop: "1px solid #f5eaee", paddingTop: "20px" }}>
            {step > 1 ? (
              <button onClick={handlePrev} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", backgroundColor: "#fff", border: "1px solid #e2d5da", borderRadius: "20px", color: "#66585e", fontWeight: "600", fontSize: "0.85rem", cursor: "pointer" }}>
                <ArrowLeft01Icon size={16} /> Atrás
              </button>
            ) : <div />}

            {step < 3 ? (
              <button 
                onClick={handleNext} 
                disabled={cartItems.length === 0}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 24px", backgroundColor: cartItems.length === 0 ? "#ccc" : "#1a0f14", border: "none", borderRadius: "20px", color: "#fff", fontWeight: "600", fontSize: "0.85rem", cursor: cartItems.length === 0 ? "not-allowed" : "pointer" }}
              >
                Continuar <ArrowRight01Icon size={16} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 30px", backgroundColor: "#9c3552", border: "none", borderRadius: "20px", color: "#fff", fontWeight: "700", fontSize: "0.9rem", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Procesando..." : "Procesar Compra"} <CheckmarkBadge01Icon size={18} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

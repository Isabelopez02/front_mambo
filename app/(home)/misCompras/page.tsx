"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag01Icon, DeliveryTruck01Icon, PackageIcon } from "hugeicons-react";
import { compraService } from "../../../services/compra.service";
import { authService } from "../../../services/auth.service";
import { useRouter } from "next/navigation";

export default function MisComprasPage() {
  const router = useRouter();
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/"); // o router.push("/login")
      return;
    }
    
    const fetchCompras = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) return;
        
        // Asumimos que listarCompras trae todas y las filtramos, o el backend ya las filtra.
        // Aquí las filtramos por numDocumento por seguridad si el endpoint trae todas.
        const response: any = await compraService.listarCompras();
        const data = Array.isArray(response) ? response : response.content || [];
        
        // Filtramos por cliente logueado
        const misCompras = data.filter((c: any) => 
          c.destinatario?.numDocumento === user.numeroDocumento || 
          c.cliente?.numeroDocumento === user.numeroDocumento
        );
        
        setCompras(misCompras);
      } catch (err: any) {
        setErrorMsg("Error al cargar tus compras. " + (err.message || ""));
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompras();
  }, [router]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#faf7f8", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#9c3552", fontWeight: "600" }}>Cargando tus compras...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#faf7f8", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2rem", color: "#1a0f14", fontFamily: '"DM Serif Display", serif', marginBottom: "12px" }}>Mis Compras</h1>
          <p style={{ fontSize: "0.9rem", color: "#66585e" }}>
            Revisa el estado de tus pedidos de recojo en tienda.
          </p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: "#ffeef0", color: "#d32f2f", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.85rem", fontWeight: "500" }}>
            {errorMsg}
          </div>
        )}

        {compras.length === 0 ? (
          <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "40px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "#fcf0f4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
              <ShoppingBag01Icon size={32} color="#9c3552" />
            </div>
            <h3 style={{ fontSize: "1.2rem", color: "#1a0f14", marginBottom: "10px" }}>Aún no tienes compras</h3>
            <p style={{ fontSize: "0.9rem", color: "#66585e", marginBottom: "20px" }}>
              ¡Explora nuestros productos y realiza tu primer pedido!
            </p>
            <button onClick={() => router.push("/productos")} style={{ backgroundColor: "#9c3552", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "30px", fontWeight: "600", cursor: "pointer" }}>
              Ver Productos
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {compras.map((compra: any) => (
              <motion.div 
                key={compra.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #f5eaee", paddingBottom: "16px", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#9c8e93", textTransform: "uppercase" }}>Pedido #{compra.id || "N/A"}</span>
                    <h3 style={{ fontSize: "1.1rem", color: "#1a0f14", margin: "4px 0" }}>
                      Recojo en {compra.envio?.direccionEnvio || "Sede Principal"}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#66585e", margin: 0 }}>
                      Total pagado: <strong style={{ color: "#9c3552" }}>S/. {compra.pago?.precio?.toFixed(2) || "0.00"}</strong>
                    </p>
                  </div>
                  <div style={{ 
                    padding: "6px 12px", 
                    borderRadius: "20px", 
                    fontSize: "0.75rem", 
                    fontWeight: "700",
                    backgroundColor: compra.estado === 'PENDIENTE' ? '#fff0f3' : compra.estado === 'ENTREGADO' ? '#ecfdf5' : '#f8fafc',
                    color: compra.estado === 'PENDIENTE' ? '#9c3552' : compra.estado === 'ENTREGADO' ? '#059669' : '#475569'
                  }}>
                    {compra.estado || "PENDIENTE"}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#1a0f14", fontWeight: "500" }}>
                    <PackageIcon size={16} color="#9c8e93" />
                    {compra.detalles?.length || 0} productos
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#1a0f14", fontWeight: "500" }}>
                    <DeliveryTruck01Icon size={16} color="#9c8e93" />
                    Tipo: Recojo en Tienda
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

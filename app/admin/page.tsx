"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag01Icon, 
  CheckmarkBadge01Icon,
  AnalyticsUpIcon,
  ArrowUp01Icon,
  Location01Icon,
  ArrowRight01Icon,
  PackageIcon,
  Alert01Icon
} from "hugeicons-react";
import { dashboardService } from "../services/dashboard.service";
import { comprobantesService, ComprobanteItem } from "../services/comprobantes.service";
import { DashboardDTO } from "../types";

export default function AdminDashboardPage() {
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(6);
  const [dashboardData, setDashboardData] = useState<DashboardDTO | null>(null);
  const [recentPickups, setRecentPickups] = useState<ComprobanteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resumen, comprobantes] = await Promise.all([
          dashboardService.obtenerResumen(),
          comprobantesService.listarTodos()
        ]);
        setDashboardData(resumen);

        // Filtrar comprobantes de recojo en tienda
        const recojos = comprobantes.filter(c => c.tipoEnvio === "RECOJO_TIENDA" || !c.tipoEnvio);
        setRecentPickups(recojos.slice(0, 5)); // Mostrar últimos 5
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const chartDays = dashboardData?.diasSemana && dashboardData.diasSemana.length > 0 
    ? dashboardData.diasSemana 
    : ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    
  const chartVentas = dashboardData?.ventasSemana && dashboardData.ventasSemana.length > 0 
    ? dashboardData.ventasSemana 
    : [0, 0, 0, 0, 0, 0, 0];
  
  const chartData = chartDays.map((dia, index) => {
    const ingresos = chartVentas[index] || 0;
    const egresos = ingresos * 0.4; // Estimado demostrativo
    return {
      mes: dia,
      ingresos,
      egresos,
      ganancia: ingresos - egresos
    };
  });

  const width = 640;
  const height = 230;
  const paddingX = 40;
  const paddingY = 30;

  const maxValRaw = Math.max(...chartData.map(d => d.ingresos), 1000);
  const maxVal = maxValRaw * 1.2;
  const minVal = 0;

  const getX = (index: number) => paddingX + (index * (width - 2 * paddingX)) / (Math.max(chartData.length - 1, 1));
  const getY = (value: number) => height - paddingY - ((value - minVal) * (height - 2 * paddingY)) / (maxVal - minVal);

  const generateSmoothPath = (key: keyof typeof chartData[0]) => {
    if (chartData.length === 0) return "";
    const points = chartData.map((d, i) => ({ x: getX(i), y: getY(d[key] as number) }));

    return points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      const prev = points[i - 1];
      const cx1 = prev.x + (point.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (point.x - prev.x) / 2;
      const cy2 = point.y;
      return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${point.x},${point.y}`;
    }, "");
  };

  const ingresosPath = generateSmoothPath("ingresos");
  const egresosPath = generateSmoothPath("egresos");
  const gananciaPath = generateSmoothPath("ganancia");

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#66585e" }}>Cargando dashboard...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* SMALL COMPACT HEADER TITLE */}
      <div>
        <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1.8px", textTransform: "uppercase" }}>
          PANEL DE CONTROL
        </span>
        <h1 style={{ fontSize: "1.35rem", color: "#1a0f14", margin: "2px 0 0 0", fontWeight: "400" }}>
          Resumen General de la Tienda
        </h1>
      </div>

      {/* COMPACT 3 CARDS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        
        {/* CARD 1: VENTAS DE HOY */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          style={{
            backgroundColor: "#ffffff",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #f3e2e8",
            boxShadow: "0 2px 8px rgba(26, 15, 20, 0.02)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#66585e" }}>Ventas de Hoy</span>
            <div style={{ padding: "6px", borderRadius: "8px", backgroundColor: "#fcf0f4" }}>
              <ShoppingBag01Icon size={15} color="#9c3552" />
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1a0f14", margin: "0 0 3px 0" }}>
            S/. {(dashboardData?.ventasHoy || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#15803d" }}>Sincronizado</span>
            <span style={{ fontSize: "0.65rem", color: "#887980" }}>en tiempo real</span>
          </div>
        </motion.div>

        {/* CARD 2: PEDIDOS PENDIENTES */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          style={{
            backgroundColor: "#ffffff",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #f3e2e8",
            boxShadow: "0 2px 8px rgba(26, 15, 20, 0.02)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#66585e" }}>Pedidos Pendientes</span>
            <div style={{ padding: "6px", borderRadius: "8px", backgroundColor: "#fcf0f4" }}>
              <CheckmarkBadge01Icon size={15} color="#9c3552" />
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1a0f14", margin: "0 0 3px 0" }}>
            {dashboardData?.pedidosPendientes || 0}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "0.65rem", color: "#887980" }}>Total por despachar</span>
          </div>
        </motion.div>

        {/* CARD 3: BAJO STOCK */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          style={{
            backgroundColor: "#ffffff",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #f3e2e8",
            boxShadow: "0 2px 8px rgba(26, 15, 20, 0.02)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#66585e" }}>Productos Bajo Stock</span>
            <div style={{ padding: "6px", borderRadius: "8px", backgroundColor: "#fcf0f4" }}>
              <Alert01Icon size={15} color="#9c3552" />
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1a0f14", margin: "0 0 3px 0" }}>
            {dashboardData?.productosBajoStock || 0}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "0.65rem", color: "#887980" }}>Requieren atención</span>
          </div>
        </motion.div>

      </div>

      {/* MAIN SPLIT ROW: BALANCE FINANCIERO (75%) | ENTREGAS (25%) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1fr)",
        gap: "18px",
        alignItems: "start"
      }}>
        
        {/* LEFT COLUMN: BALANCE FINANCIERO 75% */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "20px 20px",
          border: "1px solid #f3e2e8",
          boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)"
        }}>
          {/* HEADER & LEGEND */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AnalyticsUpIcon size={16} color="#9c3552" />
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                  Balance Semanal
                </h3>
              </div>
              <span style={{ fontSize: "0.68rem", color: "#66585e", display: "block", marginTop: "2px" }}>
                Pasa el mouse sobre el gráfico para ver el detalle por día
              </span>
            </div>

            {/* LEGEND BADGES */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "600", color: "#44383d" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#9c3552" }} />
                Ingresos
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "600", color: "#44383d" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                Egresos
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", fontWeight: "600", color: "#44383d" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                Ganancia Neta
              </div>
            </div>
          </div>

          {/* SVG LINE CHART */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", minWidth: "480px" }}>
              
              {/* GRID LINES */}
              {[0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f3e2e8" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={paddingX - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#887980" fontWeight="500">
                      S/. {(val / 1000).toFixed(1)}k
                    </text>
                  </g>
                );
              })}

              {/* DAY LABELS */}
              {chartData.map((d, i) => (
                <text key={i} x={getX(i)} y={height - 8} textAnchor="middle" fontSize="10" fill="#44383d" fontWeight={hoveredPointIndex === i ? "700" : "500"}>
                  {d.mes}
                </text>
              ))}

              {/* EGRESOS PATH */}
              <path d={egresosPath} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

              {/* GANANCIA PATH */}
              <path d={gananciaPath} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />

              {/* INGRESOS PATH */}
              <path d={ingresosPath} fill="none" stroke="#9c3552" strokeWidth="2.5" strokeLinecap="round" />

              {/* INTERACTIVE POINTS */}
              {chartData.map((d, i) => {
                const x = getX(i);
                const yIngresos = getY(d.ingresos);
                const yEgresos = getY(d.egresos);
                const yGanancia = getY(d.ganancia);
                const isHovered = hoveredPointIndex === i;

                return (
                  <g key={i} onMouseEnter={() => setHoveredPointIndex(i)} style={{ cursor: "pointer" }}>
                    {isHovered && (
                      <line x1={x} y1={paddingY} x2={x} y2={height - paddingY} stroke="#9c3552" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    )}
                    <circle cx={x} cy={yIngresos} r={isHovered ? 5 : 3.5} fill="#ffffff" stroke="#9c3552" strokeWidth="2" />
                    <circle cx={x} cy={yEgresos} r={isHovered ? 5 : 3.5} fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                    <circle cx={x} cy={yGanancia} r={isHovered ? 5 : 3.5} fill="#ffffff" stroke="#10b981" strokeWidth="2" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* DETAILED HOVER BREAKDOWN CARD */}
          {hoveredPointIndex !== null && chartData[hoveredPointIndex] && (
            <div style={{
              marginTop: "12px",
              backgroundColor: "#fcf0f4",
              borderRadius: "10px",
              padding: "10px 16px",
              border: "1px solid #f3c2d4",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <div>
                <span style={{ fontSize: "0.6rem", fontWeight: "700", color: "#9c3552", textTransform: "uppercase", letterSpacing: "1px" }}>
                  DETALLE DEL {chartData[hoveredPointIndex].mes.toUpperCase()}
                </span>
              </div>

              <div style={{ display: "flex", gap: "18px" }}>
                <div>
                  <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Ingresos:</span>{" "}
                  <strong style={{ fontSize: "0.78rem", color: "#9c3552" }}>
                    S/. {chartData[hoveredPointIndex].ingresos.toLocaleString('es-PE', { maximumFractionDigits: 0 })}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Egresos:</span>{" "}
                  <strong style={{ fontSize: "0.78rem", color: "#ef4444" }}>
                    S/. {chartData[hoveredPointIndex].egresos.toLocaleString('es-PE', { maximumFractionDigits: 0 })}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Ganancia Neta:</span>{" "}
                  <strong style={{ fontSize: "0.78rem", color: "#10b981" }}>
                    S/. {chartData[hoveredPointIndex].ganancia.toLocaleString('es-PE', { maximumFractionDigits: 0 })}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: ENTREGAS RECIENTES 25% */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "20px 16px",
          border: "1px solid #f3e2e8",
          boxShadow: "0 2px 10px rgba(26, 15, 20, 0.02)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%"
        }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid #f5eaee", paddingBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <PackageIcon size={16} color="#9c3552" />
                <h3 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                  Recojos Recientes
                </h3>
              </div>
              <span style={{ fontSize: "0.62rem", fontWeight: "700", color: "#9c3552", backgroundColor: "#fcf0f4", padding: "2px 6px", borderRadius: "4px" }}>
                NUEVOS
              </span>
            </div>

            {/* LIST OF PICKUPS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentPickups.length === 0 ? (
                <div style={{ fontSize: "0.75rem", color: "#66585e", textAlign: "center", padding: "20px 0" }}>No hay recojos pendientes</div>
              ) : recentPickups.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "8px",
                    backgroundColor: "#faf7f8",
                    border: "1px solid #f3e2e8",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14" }}>Nº {item.id}</span>
                    <span style={{
                      fontSize: "0.58rem",
                      fontWeight: "700",
                      color: "#ffffff",
                      backgroundColor: item.estadoSunat === "ACEPTADO" ? "#10b981" : "#9c3552",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      textTransform: "uppercase"
                    }}>
                      {item.estadoSunat || "PENDIENTE"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Location01Icon size={11} color="#66585e" />
                    <span style={{ fontSize: "0.68rem", color: "#66585e" }}>Tienda Principal</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <PackageIcon size={11} color="#9c3552" />
                    <span style={{ fontSize: "0.68rem", fontWeight: "600", color: "#44383d" }}>{item.clienteNombre}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VIEW ALL BUTTON */}
          <a
            href="/admin/comprobantes"
            style={{
              marginTop: "14px",
              padding: "8px",
              backgroundColor: "#fcf0f4",
              border: "1px solid #f3c2d4",
              borderRadius: "8px",
              color: "#9c3552",
              fontSize: "0.7rem",
              fontWeight: "700",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              textAlign: "center"
            }}
          >
            Ver Todos <ArrowRight01Icon size={12} color="#9c3552" />
          </a>
        </div>
      </div>
    </div>
  );
}

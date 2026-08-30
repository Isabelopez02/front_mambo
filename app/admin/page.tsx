"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag01Icon, 
  CheckmarkBadge01Icon,
  DeliveryTruck01Icon,
  AnalyticsUpIcon,
  ArrowUp01Icon,
  Location01Icon,
  ArrowRight01Icon,
  UserCheck01Icon
} from "hugeicons-react";

interface MonthlyData {
  mes: string;
  ingresos: number;
  egresos: number;
  ganancia: number;
}

const last6MonthsData: MonthlyData[] = [
  { mes: "Marzo", ingresos: 18500, egresos: 9200, ganancia: 9300 },
  { mes: "Abril", ingresos: 22100, egresos: 10800, ganancia: 11300 },
  { mes: "Mayo", ingresos: 20400, egresos: 9900, ganancia: 10500 },
  { mes: "Junio", ingresos: 26800, egresos: 12400, ganancia: 14400 },
  { mes: "Julio", ingresos: 24900, egresos: 11500, ganancia: 13400 },
  { mes: "Agosto", ingresos: 28450, egresos: 12900, ganancia: 15550 }
];

const recentDeliveries = [
  { id: "#1042", distrito: "Surco", conductor: "Pedro R.", estado: "En Camino", tagColor: "#3b82f6" },
  { id: "#1040", distrito: "Miraflores", conductor: "Juan M.", estado: "Entregado", tagColor: "#10b981" },
  { id: "#1039", distrito: "Los Olivos", conductor: "Carlos S.", estado: "Asignado", tagColor: "#9c3552" },
  { id: "#1038", distrito: "San Isidro", conductor: "Luis G.", estado: "Entregado", tagColor: "#10b981" }
];

export default function AdminDashboardPage() {
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(5); // Default to Agosto

  // Chart dimensions & scaling
  const width = 640;
  const height = 230;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = 32000;
  const minVal = 0;

  const getX = (index: number) => paddingX + (index * (width - 2 * paddingX)) / (last6MonthsData.length - 1);
  const getY = (value: number) => height - paddingY - ((value - minVal) * (height - 2 * paddingY)) / (maxVal - minVal);

  const generateSmoothPath = (key: keyof Omit<MonthlyData, 'mes'>) => {
    const points = last6MonthsData.map((d, i) => ({ x: getX(i), y: getY(d[key]) }));

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* SMALL COMPACT HEADER TITLE */}
      <div>
        <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#9c3552", letterSpacing: "1.8px", textTransform: "uppercase" }}>
          PANEL DE CONTROL
        </span>
        <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.35rem", color: "#1a0f14", margin: "2px 0 0 0", fontWeight: "400" }}>
          Resumen General de la Tienda
        </h1>
      </div>

      {/* COMPACT 3 CARDS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        
        {/* CARD 1: VENTAS DEL MES */}
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
            <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#66585e" }}>Ventas del Mes</span>
            <div style={{ padding: "6px", borderRadius: "8px", backgroundColor: "#fcf0f4" }}>
              <ShoppingBag01Icon size={15} color="#9c3552" />
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1a0f14", margin: "0 0 3px 0" }}>
            S/. 28,450.00
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowUp01Icon size={12} color="#15803d" />
            <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#15803d" }}>+14.2%</span>
            <span style={{ fontSize: "0.65rem", color: "#887980" }}>vs mes previo</span>
          </div>
        </motion.div>

        {/* CARD 2: PEDIDOS REALIZADOS */}
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
            <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#66585e" }}>Pedidos Realizados</span>
            <div style={{ padding: "6px", borderRadius: "8px", backgroundColor: "#fcf0f4" }}>
              <CheckmarkBadge01Icon size={15} color="#9c3552" />
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1a0f14", margin: "0 0 3px 0" }}>
            348
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#9c3552" }}>32 pendientes</span>
            <span style={{ fontSize: "0.65rem", color: "#887980" }}>por despachar</span>
          </div>
        </motion.div>

        {/* CARD 3: ENTREGAS EN CAMINO */}
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
            <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#66585e" }}>Entregas en Camino</span>
            <div style={{ padding: "6px", borderRadius: "8px", backgroundColor: "#fcf0f4" }}>
              <DeliveryTruck01Icon size={15} color="#9c3552" />
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#1a0f14", margin: "0 0 3px 0" }}>
            18
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#15803d" }}>4 conductores</span>
            <span style={{ fontSize: "0.65rem", color: "#887980" }}>en ruta activa</span>
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
                  Balance Financiero (6 Meses)
                </h3>
              </div>
              <span style={{ fontSize: "0.68rem", color: "#66585e", display: "block", marginTop: "2px" }}>
                Pasa el mouse sobre el gráfico para ver el detalle por mes
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
              {[0, 8000, 16000, 24000, 32000].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f3e2e8" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={paddingX - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#887980" fontWeight="500">
                      S/. {val / 1000}k
                    </text>
                  </g>
                );
              })}

              {/* MONTH LABELS */}
              {last6MonthsData.map((d, i) => (
                <text key={d.mes} x={getX(i)} y={height - 8} textAnchor="middle" fontSize="10" fill="#44383d" fontWeight={hoveredPointIndex === i ? "700" : "500"}>
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
              {last6MonthsData.map((d, i) => {
                const x = getX(i);
                const yIngresos = getY(d.ingresos);
                const yEgresos = getY(d.egresos);
                const yGanancia = getY(d.ganancia);
                const isHovered = hoveredPointIndex === i;

                return (
                  <g key={d.mes} onMouseEnter={() => setHoveredPointIndex(i)} style={{ cursor: "pointer" }}>
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
          {hoveredPointIndex !== null && (
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
                  DETALLE DE {last6MonthsData[hoveredPointIndex].mes.toUpperCase()}
                </span>
              </div>

              <div style={{ display: "flex", gap: "18px" }}>
                <div>
                  <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Ingresos:</span>{" "}
                  <strong style={{ fontSize: "0.78rem", color: "#9c3552" }}>
                    S/. {last6MonthsData[hoveredPointIndex].ingresos.toLocaleString('es-PE')}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Egresos:</span>{" "}
                  <strong style={{ fontSize: "0.78rem", color: "#ef4444" }}>
                    S/. {last6MonthsData[hoveredPointIndex].egresos.toLocaleString('es-PE')}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: "0.62rem", color: "#66585e" }}>Ganancia Neta:</span>{" "}
                  <strong style={{ fontSize: "0.78rem", color: "#10b981" }}>
                    S/. {last6MonthsData[hoveredPointIndex].ganancia.toLocaleString('es-PE')}
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
                <DeliveryTruck01Icon size={16} color="#9c3552" />
                <h3 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1a0f14", margin: 0 }}>
                  Entregas
                </h3>
              </div>
              <span style={{ fontSize: "0.62rem", fontWeight: "700", color: "#9c3552", backgroundColor: "#fcf0f4", padding: "2px 6px", borderRadius: "4px" }}>
                4 RUTA
              </span>
            </div>

            {/* LIST OF DELIVERIES */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentDeliveries.map((item) => (
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
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a0f14" }}>{item.id}</span>
                    <span style={{
                      fontSize: "0.58rem",
                      fontWeight: "700",
                      color: "#ffffff",
                      backgroundColor: item.tagColor,
                      padding: "2px 6px",
                      borderRadius: "4px",
                      textTransform: "uppercase"
                    }}>
                      {item.estado}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Location01Icon size={11} color="#66585e" />
                    <span style={{ fontSize: "0.68rem", color: "#66585e" }}>{item.distrito}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <UserCheck01Icon size={11} color="#9c3552" />
                    <span style={{ fontSize: "0.68rem", fontWeight: "600", color: "#44383d" }}>Cond: {item.conductor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VIEW ALL BUTTON */}
          <a
            href="/admin/entregas"
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
            Ver Entregas <ArrowRight01Icon size={12} color="#9c3552" />
          </a>
        </div>

      </div>

    </div>
  );
}

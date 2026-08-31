/**
 * Servicio de Dashboard conectado con DashboardController (/api/dashboard)
 */

import { DashboardDTO } from "../types";
import { authService } from "./auth.service";

const API_DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:8080/api/dashboard";

export const dashboardService = {
  // GET /api/dashboard/resumen
  async obtenerResumen(): Promise<DashboardDTO> {
    const res = await fetch(`${API_DASHBOARD_URL}/resumen`, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener el resumen del dashboard");
    return await res.json();
  }
};

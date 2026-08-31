/**
 * Servicio de Dashboard conectado con DashboardController (/api/dashboard) vía Interceptor
 */

import { DashboardDTO } from "../types";
import { apiClient } from "./apiClient";

const API_DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:8080/api/dashboard";

export const dashboardService = {
  // GET /api/dashboard/resumen
  async obtenerResumen(): Promise<DashboardDTO> {
    return await apiClient.get<DashboardDTO>(`${API_DASHBOARD_URL}/resumen`);
  }
};

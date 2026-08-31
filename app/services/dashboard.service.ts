/**
 * Servicio de Dashboard conectado con DashboardController (/api/dashboard)
 * Usando la URL Base centralizada desde apiClient (NEXT_PUBLIC_API_URL en .env)
 */

import { DashboardDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/api/dashboard";

export const dashboardService = {
  // GET /api/dashboard/resumen
  async obtenerResumen(): Promise<DashboardDTO> {
    return await apiClient.get<DashboardDTO>(`${ENDPOINT}/resumen`);
  }
};

/**
 * Servicio de Pagos conectado con PagoController (/api/pagos) vía Interceptor
 */

import { PagoDTO } from "../types";
import { apiClient } from "./apiClient";

const API_PAGOS_URL = process.env.NEXT_PUBLIC_PAGOS_URL || "http://localhost:8080/api/pagos";

export const pagosService = {
  // GET /api/pagos
  async listar(): Promise<PagoDTO[]> {
    return await apiClient.get<PagoDTO[]>(API_PAGOS_URL);
  }
};

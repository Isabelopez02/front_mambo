/**
 * Servicio de Pagos conectado con PagoController (/api/pagos)
 * Usando la URL Base centralizada desde apiClient (NEXT_PUBLIC_API_URL en .env)
 */

import { PagoDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/api/pagos";

export const pagosService = {
  // GET /api/pagos
  async listar(): Promise<PagoDTO[]> {
    return await apiClient.get<PagoDTO[]>(ENDPOINT);
  }
};

/**
 * Servicio de Pagos conectado con PagoController (/api/pagos)
 */

import { PagoDTO } from "../types";
import { authService } from "./auth.service";

const API_PAGOS_URL = process.env.NEXT_PUBLIC_PAGOS_URL || "http://localhost:8080/api/pagos";

export const pagosService = {
  // GET /api/pagos
  async listar(): Promise<PagoDTO[]> {
    const res = await fetch(API_PAGOS_URL, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener la lista de pagos");
    return await res.json();
  }
};

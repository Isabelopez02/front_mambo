/**
 * Servicio de Compras conectado con CompraController (/api/compras) vía Interceptor
 */

import { CompraDTO, CompraRequestDTO } from "../types";
import { apiClient } from "./apiClient";

const API_COMPRAS_URL = process.env.NEXT_PUBLIC_COMPRAS_URL || "http://localhost:8080/api/compras";

export const comprasService = {
  // GET /api/compras
  async listarTodas(): Promise<CompraDTO[]> {
    return await apiClient.get<CompraDTO[]>(API_COMPRAS_URL);
  },

  // GET /api/compras/mis-compras
  async verMiHistorial(): Promise<CompraDTO[]> {
    return await apiClient.get<CompraDTO[]>(`${API_COMPRAS_URL}/mis-compras`);
  },

  // GET /api/compras/{id}
  async obtenerPorId(id: number): Promise<CompraDTO> {
    return await apiClient.get<CompraDTO>(`${API_COMPRAS_URL}/${id}`);
  },

  // POST /api/compras/carrito
  async guardarCarrito(requestDTO: CompraRequestDTO): Promise<CompraDTO> {
    return await apiClient.post<CompraDTO>(`${API_COMPRAS_URL}/carrito`, requestDTO);
  },

  // PUT /api/compras/{id}/entregar
  async marcarComoEntregado(id: number, password: string): Promise<CompraDTO> {
    return await apiClient.put<CompraDTO>(`${API_COMPRAS_URL}/${id}/entregar`, { password });
  }
};

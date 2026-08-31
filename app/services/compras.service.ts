/**
 * Servicio de Compras conectado con CompraController (/api/compras)
 * Usando la URL Base centralizada desde apiClient (NEXT_PUBLIC_API_URL en .env)
 */

import { CompraDTO, CompraRequestDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/api/compras";

export const comprasService = {
  // GET /api/compras
  async listarTodas(): Promise<CompraDTO[]> {
    return await apiClient.get<CompraDTO[]>(ENDPOINT);
  },

  // GET /api/compras/mis-compras
  async verMiHistorial(): Promise<CompraDTO[]> {
    return await apiClient.get<CompraDTO[]>(`${ENDPOINT}/mis-compras`);
  },

  // GET /api/compras/{id}
  async obtenerPorId(id: number): Promise<CompraDTO> {
    return await apiClient.get<CompraDTO>(`${ENDPOINT}/${id}`);
  },

  // POST /api/compras/carrito
  async guardarCarrito(requestDTO: CompraRequestDTO): Promise<CompraDTO> {
    return await apiClient.post<CompraDTO>(`${ENDPOINT}/carrito`, requestDTO);
  },

  // PUT /api/compras/{id}/entregar
  async marcarComoEntregado(id: number, password: string): Promise<CompraDTO> {
    return await apiClient.put<CompraDTO>(`${ENDPOINT}/${id}/entregar`, { password });
  }
};

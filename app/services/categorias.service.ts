/**
 * Servicio de Categorías conectado con CategoriaRestController (/api/categorias) vía Interceptor
 */

import { CategoriaDTO } from "../types";
import { apiClient } from "./apiClient";

const API_CATEGORIAS_URL = process.env.NEXT_PUBLIC_CATEGORIAS_URL || "http://localhost:8080/api/categorias";

export const categoriasService = {
  // GET /api/categorias
  async listar(): Promise<CategoriaDTO[]> {
    return await apiClient.get<CategoriaDTO[]>(API_CATEGORIAS_URL);
  },

  // POST /api/categorias
  async crear(dto: CategoriaDTO): Promise<CategoriaDTO> {
    return await apiClient.post<CategoriaDTO>(API_CATEGORIAS_URL, dto);
  },

  // PUT /api/categorias/{id}
  async actualizar(id: number, dto: CategoriaDTO): Promise<CategoriaDTO> {
    return await apiClient.put<CategoriaDTO>(`${API_CATEGORIAS_URL}/${id}`, dto);
  },

  // DELETE /api/categorias/{id}
  async eliminar(id: number): Promise<void> {
    await apiClient.delete(`${API_CATEGORIAS_URL}/${id}`);
  },

  // GET /api/categorias/buscar?nombre=...
  async buscarPorNombre(nombre: string): Promise<CategoriaDTO> {
    return await apiClient.get<CategoriaDTO>(`${API_CATEGORIAS_URL}/buscar?nombre=${encodeURIComponent(nombre)}`);
  }
};

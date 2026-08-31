/**
 * Servicio de Categorías conectado con CategoriaRestController (/api/categorias)
 * Usando la URL Base centralizada desde apiClient (NEXT_PUBLIC_API_URL en .env)
 */

import { CategoriaDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/api/categorias";

export const categoriasService = {
  // GET /api/categorias
  async listar(): Promise<CategoriaDTO[]> {
    return await apiClient.get<CategoriaDTO[]>(ENDPOINT);
  },

  // POST /api/categorias
  async crear(dto: CategoriaDTO): Promise<CategoriaDTO> {
    return await apiClient.post<CategoriaDTO>(ENDPOINT, dto);
  },

  // PUT /api/categorias/{id}
  async actualizar(id: number, dto: CategoriaDTO): Promise<CategoriaDTO> {
    return await apiClient.put<CategoriaDTO>(`${ENDPOINT}/${id}`, dto);
  },

  // DELETE /api/categorias/{id}
  async eliminar(id: number): Promise<void> {
    await apiClient.delete(`${ENDPOINT}/${id}`);
  },

  // GET /api/categorias/buscar?nombre=...
  async buscarPorNombre(nombre: string): Promise<CategoriaDTO> {
    return await apiClient.get<CategoriaDTO>(`${ENDPOINT}/buscar?nombre=${encodeURIComponent(nombre)}`);
  }
};

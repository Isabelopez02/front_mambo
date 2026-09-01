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

  // POST /api/categorias (Soporta JSON o FormData con Imagen)
  async crear(nombre: string, imagenFile?: File | null): Promise<CategoriaDTO> {
    if (imagenFile) {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("iconoUrl", imagenFile);
      return await apiClient.post<CategoriaDTO>(ENDPOINT, formData);
    } else {
      return await apiClient.post<CategoriaDTO>(ENDPOINT, { nombre });
    }
  },

  // PUT /api/categorias/{id} (Soporta JSON o FormData con Imagen)
  async actualizar(id: number, nombre: string, imagenFile?: File | null): Promise<CategoriaDTO> {
    if (imagenFile) {
      const formData = new FormData();
      formData.append("id", id.toString());
      formData.append("nombre", nombre);
      formData.append("iconoUrl", imagenFile);
      return await apiClient.put<CategoriaDTO>(`${ENDPOINT}/${id}`, formData);
    } else {
      return await apiClient.put<CategoriaDTO>(`${ENDPOINT}/${id}`, { id, nombre });
    }
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

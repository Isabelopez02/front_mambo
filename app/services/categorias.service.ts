/**
 * Servicio de Categorías conectado con CategoriaRestController (/api/categorias)
 */

import { CategoriaDTO } from "../types";
import { authService } from "./auth.service";

const API_CATEGORIAS_URL = process.env.NEXT_PUBLIC_CATEGORIAS_URL || "http://localhost:8080/api/categorias";

export const categoriasService = {
  // GET /api/categorias
  async listar(): Promise<CategoriaDTO[]> {
    const res = await fetch(API_CATEGORIAS_URL, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener las categorías");
    return await res.json();
  },

  // POST /api/categorias
  async crear(dto: CategoriaDTO): Promise<CategoriaDTO> {
    const res = await fetch(API_CATEGORIAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authService.getAuthHeader() },
      body: JSON.stringify(dto)
    });
    if (!res.ok) throw new Error("Error al crear la categoría");
    return await res.json();
  },

  // PUT /api/categorias/{id}
  async actualizar(id: number, dto: CategoriaDTO): Promise<CategoriaDTO> {
    const res = await fetch(`${API_CATEGORIAS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authService.getAuthHeader() },
      body: JSON.stringify(dto)
    });
    if (!res.ok) throw new Error("Error al actualizar la categoría");
    return await res.json();
  },

  // DELETE /api/categorias/{id}
  async eliminar(id: number): Promise<void> {
    const res = await fetch(`${API_CATEGORIAS_URL}/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al eliminar la categoría");
  },

  // GET /api/categorias/buscar?nombre=...
  async buscarPorNombre(nombre: string): Promise<CategoriaDTO> {
    const res = await fetch(`${API_CATEGORIAS_URL}/buscar?nombre=${encodeURIComponent(nombre)}`, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al buscar la categoría");
    return await res.json();
  }
};

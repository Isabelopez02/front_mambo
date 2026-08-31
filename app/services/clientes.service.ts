/**
 * Servicio de Clientes conectado con ClienteRestController (/api/clientes)
 */

import { ClienteDTO } from "../types";
import { authService } from "./auth.service";

const API_CLIENTES_URL = process.env.NEXT_PUBLIC_CLIENTES_URL || "http://localhost:8080/api/clientes";

function buildFormData(dto: ClienteDTO): FormData {
  const formData = new FormData();
  if (dto.id) formData.append("id", dto.id.toString());
  if (dto.tipoDocumento) formData.append("tipoDocumento", dto.tipoDocumento);
  if (dto.numDocumento) formData.append("numDocumento", dto.numDocumento);
  if (dto.numeroDocumento) formData.append("numeroDocumento", dto.numeroDocumento);
  if (dto.nombreCompleto) formData.append("nombreCompleto", dto.nombreCompleto);
  if (dto.email) formData.append("email", dto.email);
  if (dto.telefono) formData.append("telefono", dto.telefono);
  if (dto.contra) formData.append("contra", dto.contra);
  if (dto.rol) formData.append("rol", dto.rol);
  return formData;
}

export const clientesService = {
  // GET /api/clientes
  async listar(): Promise<ClienteDTO[]> {
    const res = await fetch(API_CLIENTES_URL, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener los clientes");
    return await res.json();
  },

  // GET /api/clientes/buscar/{id}
  async obtenerPorId(id: number): Promise<ClienteDTO> {
    const res = await fetch(`${API_CLIENTES_URL}/buscar/${id}`, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener el cliente");
    return await res.json();
  },

  // POST /api/clientes
  async crear(dto: ClienteDTO): Promise<ClienteDTO> {
    const formData = buildFormData(dto);
    const res = await fetch(API_CLIENTES_URL, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData
    });
    if (!res.ok) throw new Error("Error al crear el cliente");
    return await res.json();
  },

  // PUT /api/clientes/actualizar/{id}
  async actualizar(id: number, dto: ClienteDTO): Promise<ClienteDTO> {
    const formData = buildFormData(dto);
    const res = await fetch(`${API_CLIENTES_URL}/actualizar/${id}`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData
    });
    if (!res.ok) throw new Error("Error al actualizar el cliente");
    return await res.json();
  },

  // DELETE /api/clientes/eliminar/{id}
  async eliminar(id: number): Promise<string> {
    const res = await fetch(`${API_CLIENTES_URL}/eliminar/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al eliminar el cliente");
    return await res.text();
  }
};

/**
 * Servicio de Clientes conectado con ClienteRestController (/api/clientes) vía Interceptor
 */

import { ClienteDTO } from "../types";
import { apiClient } from "./apiClient";

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
    return await apiClient.get<ClienteDTO[]>(API_CLIENTES_URL);
  },

  // GET /api/clientes/buscar/{id}
  async obtenerPorId(id: number): Promise<ClienteDTO> {
    return await apiClient.get<ClienteDTO>(`${API_CLIENTES_URL}/buscar/${id}`);
  },

  // POST /api/clientes
  async crear(dto: ClienteDTO): Promise<ClienteDTO> {
    const formData = buildFormData(dto);
    return await apiClient.post<ClienteDTO>(API_CLIENTES_URL, formData);
  },

  // PUT /api/clientes/actualizar/{id}
  async actualizar(id: number, dto: ClienteDTO): Promise<ClienteDTO> {
    const formData = buildFormData(dto);
    return await apiClient.put<ClienteDTO>(`${API_CLIENTES_URL}/actualizar/${id}`, formData);
  },

  // DELETE /api/clientes/eliminar/{id}
  async eliminar(id: number): Promise<string> {
    return await apiClient.delete<string>(`${API_CLIENTES_URL}/eliminar/${id}`);
  }
};

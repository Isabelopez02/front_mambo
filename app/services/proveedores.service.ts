/**
 * Servicio de Proveedores conectado con ProveedorRestController (/api/proveedores)
 * Usando el cliente e interceptor JWT centralizado (apiClient)
 */

import { ProveedorDTO, CreateProveedorDTO, UpdateProveedorDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/api/proveedores";

export const proveedoresService = {
  // GET /api/proveedores
  async listar(): Promise<ProveedorDTO[]> {
    return await apiClient.get<ProveedorDTO[]>(ENDPOINT);
  },

  // GET /api/proveedores/{id}
  async obtenerPorId(id: number | string): Promise<ProveedorDTO> {
    return await apiClient.get<ProveedorDTO>(`${ENDPOINT}/${id}`);
  },

  // POST /api/proveedores
  async crear(dto: CreateProveedorDTO): Promise<ProveedorDTO> {
    return await apiClient.post<ProveedorDTO>(ENDPOINT, dto);
  },

  // PUT /api/proveedores/{id}
  async actualizar(id: number | string, dto: UpdateProveedorDTO): Promise<ProveedorDTO> {
    return await apiClient.put<ProveedorDTO>(`${ENDPOINT}/${id}`, dto);
  },

  // DELETE /api/proveedores/{id}
  async eliminar(id: number | string): Promise<void> {
    await apiClient.delete(`${ENDPOINT}/${id}`);
  }
};

/**
 * Servicio de Usuarios conectado con UsuarioController (/usuarios)
 * Usando la URL Base centralizada desde apiClient (NEXT_PUBLIC_API_URL en .env)
 */

import { VendedorDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/usuarios";

export const usuariosService = {
  // GET /usuarios
  async listar(): Promise<VendedorDTO[]> {
    return await apiClient.get<VendedorDTO[]>(ENDPOINT);
  },

  // POST /usuarios
  async crearUsuario(dto: VendedorDTO): Promise<VendedorDTO> {
    return await apiClient.post<VendedorDTO>(ENDPOINT, dto);
  }
};

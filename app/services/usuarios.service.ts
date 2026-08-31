/**
 * Servicio de Usuarios conectado con UsuarioController (/usuarios) vía Interceptor
 */

import { VendedorDTO } from "../types";
import { apiClient } from "./apiClient";

const API_USUARIOS_URL = process.env.NEXT_PUBLIC_USUARIOS_URL || "http://localhost:8080/usuarios";

export const usuariosService = {
  // GET /usuarios
  async listar(): Promise<VendedorDTO[]> {
    return await apiClient.get<VendedorDTO[]>(API_USUARIOS_URL);
  },

  // POST /usuarios
  async crearUsuario(dto: VendedorDTO): Promise<VendedorDTO> {
    return await apiClient.post<VendedorDTO>(API_USUARIOS_URL, dto);
  }
};

/**
 * Servicio de Usuarios conectado con UsuarioController (/usuarios)
 */

import { VendedorDTO } from "../types";
import { authService } from "./auth.service";

const API_USUARIOS_URL = process.env.NEXT_PUBLIC_USUARIOS_URL || "http://localhost:8080/usuarios";

export const usuariosService = {
  // GET /usuarios
  async listar(): Promise<VendedorDTO[]> {
    const res = await fetch(API_USUARIOS_URL, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al listar usuarios");
    return await res.json();
  },

  // POST /usuarios
  async crearUsuario(dto: VendedorDTO): Promise<VendedorDTO> {
    const res = await fetch(API_USUARIOS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authService.getAuthHeader() },
      body: JSON.stringify(dto)
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return await res.json();
  }
};

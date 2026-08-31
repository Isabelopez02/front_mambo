/**
 * Servicio de Autenticación JWT con Backend Spring Boot (/auth)
 * Usando la URL Base centralizada desde apiClient (NEXT_PUBLIC_API_URL en .env)
 */

import { LoginRequest, RegisterRequest, AuthResponse } from "../types";
import { apiClient, getToken, setToken, clearToken } from "./apiClient";

export interface AuthUser {
  token: string;
  numeroDocumento: string;
  nombre: string;
  rol: string;
}

export const authService = {
  // LOGIN ADMINISTRADOR / USUARIO
  async login(requestOrDoc: LoginRequest | string, password?: string): Promise<AuthUser> {
    const payload: LoginRequest = typeof requestOrDoc === "string"
      ? { numeroDocumento: requestOrDoc, password: password || "" }
      : requestOrDoc;

    const data: AuthResponse & { numeroDocumento?: string; nombre?: string; rol?: string } = 
      await apiClient.post("/auth/login", payload);

    const user: AuthUser = {
      token: data.token,
      numeroDocumento: data.numeroDocumento || payload.numeroDocumento,
      nombre: data.nombre || "Administrador",
      rol: data.rol || "ADMIN"
    };

    setToken(user.token, user);
    return user;
  },

  // REGISTRAR NUEVO USUARIO / ADMIN
  async register(requestOrDoc: RegisterRequest | string, password?: string, nombre?: string): Promise<AuthUser> {
    const payload: RegisterRequest = typeof requestOrDoc === "string"
      ? { numeroDocumento: requestOrDoc, password: password || "" }
      : requestOrDoc;

    const data: AuthResponse & { numeroDocumento?: string; nombre?: string; rol?: string } = 
      await apiClient.post("/auth/register", payload);

    const user: AuthUser = {
      token: data.token,
      numeroDocumento: data.numeroDocumento || payload.numeroDocumento,
      nombre: data.nombre || nombre || "Administrador",
      rol: data.rol || "ADMIN"
    };

    setToken(user.token, user);
    return user;
  },

  // CERRAR SESIÓN
  logout() {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  },

  // VERIFICAR AUTENTICACIÓN
  isAuthenticated(): boolean {
    const token = getToken();
    return !!(token && token.split(".").length === 3);
  },

  // OBTENER CABECERA AUTENTICADA
  getAuthHeader(): Record<string, string> {
    const token = getToken();
    if (token && token.split(".").length === 3) {
      return { "Authorization": `Bearer ${token}` };
    }
    return {};
  },

  // OBTENER USUARIO ACTUAL
  getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("admin_user");
    return stored ? JSON.parse(stored) : null;
  }
};

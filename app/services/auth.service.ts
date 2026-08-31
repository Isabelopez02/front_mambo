/**
 * Servicio de Autenticación JWT con Backend Spring Boot (/auth)
 */

import { LoginRequest, RegisterRequest, AuthResponse } from "../types";

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8080/auth";

export interface AuthUser {
  token: string;
  numeroDocumento: string;
  nombre: string;
  rol: string;
}

export const authService = {
  // LOGIN ADMINISTRADOR / USUARIO (Acepta DTO o (numeroDocumento, password))
  async login(requestOrDoc: LoginRequest | string, password?: string): Promise<AuthUser> {
    const payload: LoginRequest = typeof requestOrDoc === "string"
      ? { numeroDocumento: requestOrDoc, password: password || "" }
      : requestOrDoc;

    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("El correo o documento y la contraseña no coinciden en la base de datos");
    }

    const data: AuthResponse & { numeroDocumento?: string; nombre?: string; rol?: string } = await response.json();
    const user: AuthUser = {
      token: data.token,
      numeroDocumento: data.numeroDocumento || payload.numeroDocumento,
      nombre: data.nombre || "Administrador",
      rol: data.rol || "ADMIN"
    };

    if (typeof window !== "undefined") {
      document.cookie = `admin_token=${user.token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem("admin_token", user.token);
      localStorage.setItem("admin_user", JSON.stringify(user));
    }

    return user;
  },

  // REGISTRAR NUEVO USUARIO (Acepta DTO o (numeroDocumento, password, nombre))
  async register(requestOrDoc: RegisterRequest | string, password?: string, nombre?: string): Promise<AuthUser> {
    const payload: RegisterRequest = typeof requestOrDoc === "string"
      ? { numeroDocumento: requestOrDoc, password: password || "" }
      : requestOrDoc;

    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario en la base de datos");
    }

    const data: AuthResponse & { numeroDocumento?: string; nombre?: string; rol?: string } = await response.json();
    const user: AuthUser = {
      token: data.token,
      numeroDocumento: data.numeroDocumento || payload.numeroDocumento,
      nombre: data.nombre || nombre || "Administrador",
      rol: data.rol || "ADMIN"
    };

    if (typeof window !== "undefined") {
      document.cookie = `admin_token=${user.token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem("admin_token", user.token);
      localStorage.setItem("admin_user", JSON.stringify(user));
    }

    return user;
  },

  // CERRAR SESIÓN
  logout() {
    if (typeof window !== "undefined") {
      document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/admin/login";
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const tokenCookie = document.cookie.split("; ").find(row => row.startsWith("admin_token="));
    const tokenLocal = localStorage.getItem("admin_token");
    const token = tokenLocal || (tokenCookie ? tokenCookie.split("=")[1] : null);
    return !!(token && token.split(".").length === 3);
  },

  getAuthHeader(): Record<string, string> {
    if (typeof window === "undefined") return {};
    const tokenLocal = localStorage.getItem("admin_token");
    const cookieRow = document.cookie.split("; ").find(row => row.startsWith("admin_token="));
    const tokenCookie = cookieRow ? cookieRow.split("=")[1] : null;
    const token = tokenLocal || tokenCookie;

    if (token && token.split(".").length === 3) {
      return { "Authorization": `Bearer ${token}` };
    }

    return {};
  },

  getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("admin_user");
    return stored ? JSON.parse(stored) : null;
  }
};

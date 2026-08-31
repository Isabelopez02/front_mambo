/**
 * Cliente HTTP Interceptor Centralizado para Frontend (Next.js)
 * Toma la URL Base desde la variable de entorno NEXT_PUBLIC_API_URL o API_URL (.env)
 * Adiciona automáticamente el token JWT Bearer a todas las peticiones
 * y maneja la expiración / desautenticación (401/403) enviando al login.
 */

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:8080"
).replace(/\/+$/, "");

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: any;
}

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const tokenLocal = localStorage.getItem("admin_token");
  const cookieRow = document.cookie.split("; ").find(row => row.startsWith("admin_token="));
  const tokenCookie = cookieRow ? cookieRow.split("=")[1] : null;
  return tokenLocal || tokenCookie;
};

export const setToken = (token: string, user?: any) => {
  if (typeof window !== "undefined") {
    document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Lax`;
    localStorage.setItem("admin_token", token);
    if (user) {
      localStorage.setItem("admin_user", JSON.stringify(user));
    }
  }
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  }
};

export function getFullUrl(endpoint: string): string {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${BASE_URL}${cleanEndpoint}`;
}

// INTERCEPTOR DE PETICIONES FETCH
export async function apiFetch<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const fullUrl = getFullUrl(endpoint);
  const token = getToken();

  const headers: Record<string, string> = {
    "Accept": "application/json",
    ...(options.headers as Record<string, string> || {})
  };

  // Si hay token JWT válido, adjuntarlo como Bearer Header
  if (token && token.split(".").length === 3) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let body = options.body;
  if (body && !(body instanceof FormData) && typeof body === "object") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const config: RequestInit = {
    ...options,
    headers,
    body
  };

  const response = await fetch(fullUrl, config);

  // INTERCEPTOR DE RESPUESTAS: 401 y 403
  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined" && !window.location.pathname.includes("/admin/login")) {
      clearToken();
      window.location.href = "/admin/login";
    }
  }

  if (!response.ok) {
    let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (typeof errorData === "string") errorMessage = errorData;
      else if (errorData?.message) errorMessage = errorData.message;
    } catch {
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {}
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return (await response.text()) as unknown as T;
}

export const apiClient = {
  get: <T = any>(url: string, options?: RequestOptions) =>
    apiFetch<T>(url, { ...options, method: "GET" }),

  post: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiFetch<T>(url, { ...options, method: "POST", body }),

  put: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiFetch<T>(url, { ...options, method: "PUT", body }),

  delete: <T = any>(url: string, options?: RequestOptions) =>
    apiFetch<T>(url, { ...options, method: "DELETE" }),

  baseUrl: BASE_URL
};

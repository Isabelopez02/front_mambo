/**
 * DTOs de Autenticación alineados con Spring Boot Backend (AuthService)
 */

export interface LoginRequest {
  numeroDocumento: string;
  password: string;
}

export interface RegisterRequest {
  numeroDocumento: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

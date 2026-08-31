/**
 * Servicio de Compras conectado con CompraController (/api/compras)
 */

import { CompraDTO, CompraRequestDTO } from "../types";
import { authService } from "./auth.service";

const API_COMPRAS_URL = process.env.NEXT_PUBLIC_COMPRAS_URL || "http://localhost:8080/api/compras";

export const comprasService = {
  // GET /api/compras
  async listarTodas(): Promise<CompraDTO[]> {
    const res = await fetch(API_COMPRAS_URL, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener las compras");
    return await res.json();
  },

  // GET /api/compras/mis-compras
  async verMiHistorial(): Promise<CompraDTO[]> {
    const res = await fetch(`${API_COMPRAS_URL}/mis-compras`, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (res.status === 204) return [];
    if (!res.ok) throw new Error("Error al obtener el historial de compras");
    return await res.json();
  },

  // GET /api/compras/{id}
  async obtenerPorId(id: number): Promise<CompraDTO> {
    const res = await fetch(`${API_COMPRAS_URL}/${id}`, {
      method: "GET",
      headers: { "Accept": "application/json", ...authService.getAuthHeader() }
    });
    if (!res.ok) throw new Error("Error al obtener la compra");
    return await res.json();
  },

  // POST /api/compras/carrito
  async guardarCarrito(requestDTO: CompraRequestDTO): Promise<CompraDTO> {
    const res = await fetch(`${API_COMPRAS_URL}/carrito`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authService.getAuthHeader() },
      body: JSON.stringify(requestDTO)
    });
    if (!res.ok) throw new Error("Error al procesar la compra");
    return await res.json();
  },

  // PUT /api/compras/{id}/entregar
  async marcarComoEntregado(id: number, password: string): Promise<CompraDTO> {
    const res = await fetch(`${API_COMPRAS_URL}/${id}/entregar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authService.getAuthHeader() },
      body: JSON.stringify({ password })
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Error al entregar la compra");
    }
    return await res.json();
  }
};

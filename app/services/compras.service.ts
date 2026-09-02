/**
 * Servicio de Compras e Ingresos de Mercadería conectado con Backend Spring Boot
 * Almacenamiento en las tablas 'compra_proveedor' y 'codigo_proveedor' en MySQL
 */

import { CompraDTO, CompraRequestDTO } from "../types";
import { apiClient } from "./apiClient";

const ENDPOINT = "/api/compras";

export interface CompraProveedorDTO {
  id?: number;
  productoId: number;
  productoNombre?: string;
  sku?: string;
  proveedorId?: number;
  proveedorNombre?: string;
  rucProveedor?: string;
  cantidad: number;
  costoTotal: number;
  costoUnitario?: number;
  estado?: string;
  fechaCompra?: string;
  codigosEscaneados?: string[];
  seriesGeneradas?: string[];
}

export const comprasService = {
  // GET /api/compras
  async listarTodas(): Promise<CompraDTO[]> {
    return await apiClient.get<CompraDTO[]>(ENDPOINT);
  },

  // GET /api/compras/mis-compras
  async verMiHistorial(): Promise<CompraDTO[]> {
    return await apiClient.get<CompraDTO[]>(`${ENDPOINT}/mis-compras`);
  },

  // GET /api/compras/{id}
  async obtenerPorId(id: number): Promise<CompraDTO> {
    return await apiClient.get<CompraDTO>(`${ENDPOINT}/${id}`);
  },

  // POST /api/compras/carrito
  async guardarCarrito(requestDTO: CompraRequestDTO): Promise<CompraDTO> {
    return await apiClient.post<CompraDTO>(`${ENDPOINT}/carrito`, requestDTO);
  },

  // PUT /api/compras/{id}/entregar
  async marcarComoEntregado(id: number, password: string): Promise<CompraDTO> {
    return await apiClient.put<CompraDTO>(`${ENDPOINT}/${id}/entregar`, { password });
  },

  // 🛍️ GET /api/compras-proveedor -> Obtener historial de compras a proveedor almacenadas en la tabla 'compra_proveedor' de MySQL
  async listarComprasProveedor(): Promise<CompraProveedorDTO[]> {
    return await apiClient.get<CompraProveedorDTO[]>("/api/compras-proveedor");
  },

  // 🛍️ POST /api/compras-proveedor -> Registrar compra a proveedor en 'compra_proveedor' y guardar códigos escaneados en 'codigo_proveedor' en MySQL
  async registrarCompraProveedor(
    productoId: number | string,
    proveedorId: number | string,
    cantidad: number,
    costoTotal: number,
    codigos: string[]
  ): Promise<CompraProveedorDTO> {
    return await apiClient.post<CompraProveedorDTO>("/api/compras-proveedor", {
      productoId: Number(productoId),
      proveedorId: proveedorId ? Number(proveedorId) : null,
      cantidad: Number(cantidad),
      costoTotal: Number(costoTotal),
      codigos: codigos || []
    });
  }
};

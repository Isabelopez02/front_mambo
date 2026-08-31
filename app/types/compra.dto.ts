/**
 * Data Transfer Objects (DTOs) para Gestión de Compras & Escaneo de Inventario
 */

export interface CompraDTO {
  id: string; // ej. "COMP-2026-001"
  fechaCompra: string;
  productoId: string;
  productoNombre: string;
  codigoBase5D: string;
  proveedorId: number;
  proveedorNombre: string;
  codigosEscaneadosCount: number;
  codigosProveedorLista: string[];
  costoTotalPagado: number;
  costoUnitarioPromedio: number; // Calculado: costoTotalPagado / codigosEscaneadosCount
  estado: "Completado" | "Pendiente" | "Cancelado";
  observaciones?: string;
}

export interface CreateCompraDTO {
  productoId: string;
  proveedorId: number;
  codigosProveedorLista: string[]; // Lista de códigos de barras/QR escaneados uno a uno
  costoTotalPagado: number;
  observaciones?: string;
}

export interface ResumenCompraCalculadoDTO {
  totalCodigosEscaneados: number;
  costoTotalPagado: number;
  costoUnitarioPromedioCalculado: number;
}

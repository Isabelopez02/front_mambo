/**
 * DTO de Dashboard alineado con Spring Boot Backend (DashboardDTO.java)
 */

export interface DashboardDTO {
  ventasHoy?: number;
  pedidosPendientes?: number;
  productosBajoStock?: number;
  totalClientes?: number;
  ventasSemana?: number[];
  diasSemana?: string[];
  productosPorCategoria?: Record<string, number>;
}

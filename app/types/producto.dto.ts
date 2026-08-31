/**
 * Data Transfer Objects (DTOs) alineados con Spring Boot Backend y cálculo por % de Ganancia
 */

export interface ProductoDTO {
  id?: number | string;
  nombre: string;
  categoriaNombre?: string;
  categoria?: string;
  icono?: string;
  precio: number;
  precioCompraProveedor: number; // Extraído del precio mayor de los proveedores
  porcentajeGananciaMin: number; // ej. 30%
  porcentajeGananciaMax: number; // ej. 50%
  precioVentaMin: number; // Calculado: precioCompra * (1 + %Min/100)
  precioVentaMax: number; // Calculado: precioCompra * (1 + %Max/100)
  stock?: number;
  descripcion?: string;
  img?: string; // URL o vista previa
  imagenUrl?: File | string | null; // Archivo de imagen o URL
  estadoStock?: string;
  codigoBase5D?: string;
  activo?: boolean;
}

export interface CreateProductoDTO {
  nombre: string;
  categoriaNombre: string;
  precio?: number;
  precioCompraProveedor?: number;
  porcentajeGananciaMin: number;
  porcentajeGananciaMax: number;
  precioVentaMin?: number;
  precioVentaMax?: number;
  descripcion?: string;
  imagenUrl?: File | string | null;
  codigoBase5D?: string;
}

export interface UpdateProductoDTO {
  id: number | string;
  nombre?: string;
  categoriaNombre?: string;
  precio?: number;
  precioCompraProveedor?: number;
  porcentajeGananciaMin?: number;
  porcentajeGananciaMax?: number;
  precioVentaMin?: number;
  precioVentaMax?: number;
  descripcion?: string;
  imagenUrl?: File | string | null;
  activo?: boolean;
}

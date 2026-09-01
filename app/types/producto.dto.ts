/**
 * DTO de Producto alineado con Spring Boot Backend (ProductoDTO.java)
 */

export interface ProductoDTO {
  id?: number | string;
  sku?: string;
  nombre: string;
  categoriaNombre?: string;
  categoria?: string;
  icono?: string;
  precio?: number;
  precioCompraProveedor?: number;
  porcentajeGananciaMin?: number;
  porcentajeGananciaMax?: number;
  precioVentaMin?: number;
  precioVentaMax?: number;
  stock?: number;
  descripcion?: string;
  img?: string;
  imagenUrl?: File | string | null;
  estadoStock?: string;
  activo?: boolean;
}

export interface CreateProductoDTO {
  sku?: string;
  nombre: string;
  categoriaNombre: string;
  precioCompraProveedor: number;
  porcentajeGananciaMin?: number;
  porcentajeGananciaMax?: number;
  precioVentaMin?: number;
  precioVentaMax?: number;
  precio?: number;
  stock?: number;
  descripcion?: string;
  imagenUrl?: File | string | null;
}

export interface UpdateProductoDTO {
  id?: number | string;
  sku?: string;
  nombre?: string;
  categoriaNombre?: string;
  precioCompraProveedor?: number;
  porcentajeGananciaMin?: number;
  porcentajeGananciaMax?: number;
  precioVentaMin?: number;
  precioVentaMax?: number;
  precio?: number;
  stock?: number;
  descripcion?: string;
  imagenUrl?: File | string | null;
  activo?: boolean;
}

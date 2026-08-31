/**
 * DTO de Producto alineado con Spring Boot Backend (ProductoDTO.java)
 */

export interface ProductoDTO {
  id?: number | string;
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
  nombre: string;
  categoriaNombre: string;
  precio?: number;
  precioCompraProveedor?: number;
  porcentajeGananciaMin?: number;
  porcentajeGananciaMax?: number;
  precioVentaMin?: number;
  precioVentaMax?: number;
  descripcion?: string;
  imagenUrl?: File | string | null;
}

export interface UpdateProductoDTO {
  id?: number | string;
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

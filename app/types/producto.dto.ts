/**
 * DTO de Producto alineado con Spring Boot Backend (ProductoDTO.java)
 */

export interface ProductoUnitarioDTO {
  id?: number;
  productoId?: number;
  serie: string; // 5 dígitos (ej. 00001, 00002)
  estado?: string; // DISPONIBLE, VENDIDO, etc.
  fechaRegistro?: string;
}

export interface ProductoDTO {
  id?: number | string;
  sku?: string; // 5 dígitos generado por backend (ej. 23212)
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
  series?: string[];
  unidades?: ProductoUnitarioDTO[];
}

export interface CreateProductoDTO {
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

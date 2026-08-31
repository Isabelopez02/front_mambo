/**
 * Data Transfer Objects (DTOs) para Gestión de Proveedores
 */

export interface ProveedorDTO {
  id: number;
  nombre: string;
  ruc: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
  ciudad?: string;
  activo: boolean;
  fechaRegistro: string;
}

export interface CreateProveedorDTO {
  nombre: string;
  ruc: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
  ciudad?: string;
}

export interface UpdateProveedorDTO {
  nombre?: string;
  ruc?: string;
  contacto?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  activo?: boolean;
}

export interface ProveedorProductoGroupedDTO {
  id: string;
  codigoInternoTienda: string; // 10 dígitos
  nombre: string;
  categoria: string;
  cantidadTotal: number;
  costoAnterior: number;
  costoActual: number;
  variacionPorcentaje: number;
  precioVentaSugerido: number;
  ultimaCompraFecha: string;
  codigosProveedorQR: string[];
}

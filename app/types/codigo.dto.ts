/**
 * Data Transfer Objects (DTOs) para la Gestión de Códigos Internos (10 dígitos: 5D Base + 5D Unidad)
 */

export interface CodigoInternoTiendaDTO {
  codigo10D: string; // 10 dígitos
  codigoBase5D: string; // 5 dígitos
  unidadSeq5D: string; // 5 dígitos
  productoId: string;
  productoNombre: string;
  proveedorId?: number;
  proveedorNombre?: string;
  codigoProveedorQR?: string;
  fechaCreacion: string;
}

export interface GenerarCodigoResponseDTO {
  codigoBase5D: string;
  secuenciaUnidadInicial: string; // "00001"
  codigoCompleto10D: string; // "1234300001"
  mensaje: string;
}

export interface VincularCodigoProveedorDTO {
  codigo10D: string;
  proveedorId: number;
  codigoProveedorQR: string;
}

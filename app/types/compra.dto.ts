/**
 * DTOs de Compra alineados con Spring Boot Backend (CompraDTO, CompraRequestDTO, DetalleCompraDto)
 */

import { TipoComprobante, TipoEnvio, TipoEstado, TipoPago } from "./enums.dto";
import { EnvioDTO } from "./envio.dto";
import { DestinatarioDTO } from "./destinatario.dto";
import { PagoDTO } from "./pago.dto";

export interface DetalleCompraDto {
  id?: number;
  productoId?: number;
  compraId?: number;
  nombreProducto?: string;
  precioUnitario?: number;
  cantidad?: number;
  subtotal?: number;
}

export interface CompraDTO {
  id?: number;
  numDocumento?: string;
  tipoEnvio?: TipoEnvio | string;
  nombreDestinario?: string;
  contactoDestinatario?: string;
  tipoPago?: TipoPago | string;
  total?: number;
  estado?: TipoEstado | string;
  fechaCreacion?: string;
  tipoComprobante?: TipoComprobante | string;
  detalles?: DetalleCompraDto[];
}

export interface CompraRequestDTO {
  envio?: EnvioDTO;
  destinatario?: DestinatarioDTO;
  pago?: PagoDTO;
  tipoComprobante?: TipoComprobante | string;
  detalles?: DetalleCompraDto[];
}

export interface CreateCompraDTO {
  productoId?: string | number;
  proveedorId?: number;
  codigosProveedorLista?: string[];
  costoTotalPagado?: number;
  observaciones?: string;
}

export interface ResumenCompraCalculadoDTO {
  totalCodigosEscaneados: number;
  costoTotalPagado: number;
  costoUnitarioPromedioCalculado: number;
}

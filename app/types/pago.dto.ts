/**
 * DTO de Pago alineado con Spring Boot Backend (PagoDTO.java)
 */

import { TipoPago } from "./enums.dto";

export interface PagoDTO {
  id?: number;
  precio?: number;
  tipoPago?: TipoPago | string;
  fechaPago?: string;
}

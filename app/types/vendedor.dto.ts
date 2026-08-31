/**
 * DTO de Vendedor alineado con Spring Boot Backend (VendedorDTO.java)
 */

import { TipoDocumento } from "./enums.dto";

export interface VendedorDTO {
  id?: number;
  nombreCompleto?: string;
  rol?: string;
  tipoDocumento?: TipoDocumento | string;
  numeroDocumento?: string;
  email?: string;
  telefono?: string;
  contra?: string;
}

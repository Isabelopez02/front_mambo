/**
 * DTO de Envío alineado con Spring Boot Backend (EnvioDTO.java)
 */

import { TipoEnvio } from "./enums.dto";

export interface EnvioDTO {
  id?: number;
  tipoEnvio?: TipoEnvio | string;
  direccionEnvio?: string;
  ciudad?: string;
  costoEnvio?: number;
  referencia?: string;
}

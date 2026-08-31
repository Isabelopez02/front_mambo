/**
 * DTO de Destinatario alineado con Spring Boot Backend (DestinatarioDTO.java)
 */

export interface DestinatarioDTO {
  id?: number;
  nombreCompleto?: string;
  telefono?: string;
  email?: string;
  apellidos?: string;
  numDocumento?: string;
}

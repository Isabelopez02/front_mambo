/**
 * DTO de Cliente alineado con Spring Boot Backend (ClienteDTO.java)
 */

import { TipoDocumento } from "./enums.dto";

export interface ClienteDTO {
  id?: number;
  tipoDocumento?: TipoDocumento | string;
  numDocumento?: string;
  rol?: string;
  numeroDocumento?: string;
  nombreCompleto?: string;
  email?: string;
  telefono?: string;
  contra?: string;
}

export interface CreateClienteDTO {
  nombres?: string;
  apellidos?: string;
  nombreCompleto?: string;
  tipoDocumento?: TipoDocumento | string;
  numeroDocumento?: string;
  numDocumento?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  contra?: string;
}

export interface EntregaDTO {
  id: string;
  pedidoNum: string;
  clienteId: string;
  clienteNombre: string;
  direccionEntrega: string;
  conductorId?: string;
  conductorNombre?: string;
  estadoEntrega: "Pendiente" | "En Ruta" | "Entregado" | "Cancelado";
  fechaProgramada: string;
  fechaEntrega?: string;
}

export interface UpdateEstadoEntregaDTO {
  entregaId: string;
  nuevoEstado: "Pendiente" | "En Ruta" | "Entregado" | "Cancelado";
  conductorId?: string;
  notas?: string;
}

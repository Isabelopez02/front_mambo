/**
 * Data Transfer Objects (DTOs) para Clientes & Entregas
 */

export interface ClienteDTO {
  id: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: "DNI" | "RUC" | "CE";
  documentoIdentidad: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  totalComprasCount: number;
  totalGastado: number;
  fechaRegistro: string;
}

export interface CreateClienteDTO {
  nombres: string;
  apellidos: string;
  tipoDocumento: "DNI" | "RUC" | "CE";
  documentoIdentidad: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
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

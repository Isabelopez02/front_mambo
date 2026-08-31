/**
 * Enums del Backend Spring Boot (Mambo)
 */

export type TipoDocumento = "DNI" | "CE";

export type TipoComprobante = "BOLETA" | "FACTURA";

export type TipoEnvio = "RECOJO_TIENDA" | "DELIVERY" | "CONTRA_ENTREGA";

export type TipoEstado = "PENDIENTE" | "CANCELADO" | "RECHAZADO" | "ENTREGADO";

export type TipoPago = "TARJETA" | "PAYPAL" | "TRANSFERENCIA_BANCARIA" | "YAPE" | "EFECTIVO";

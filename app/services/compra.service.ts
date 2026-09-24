import { apiClient } from "./apiClient";

export interface CompraRequestDTO {
  envio: {
    tipoEnvio: string;
    direccionEnvio: string;
    ciudad: string;
    costoEnvio: number;
    referencia: string;
  };
  destinatario: {
    nombreCompleto: string;
    numDocumento: string;
    telefono: string;
    email: string;
    apellidos: string;
  };
  pago: {
    precio: number;
    tipoPago: string;
  };
  tipoComprobante: string;
  detalles: Array<{
    productoId: number;
    nombreProducto: string;
    precioUnitario: number;
    cantidad: number;
    subtotal: number;
  }>;
}

export const compraService = {
  procesarCheckout: async (payload: CompraRequestDTO) => {
    return apiClient.post("/api/compras/carrito", payload);
  },
  listarCompras: async () => {
    return apiClient.get("/api/compras");
  }
};


import { apiClient } from "./apiClient";

export interface ComprobanteDetalleReqDTO {
    productoId?: number;
    cantidad: number;
    descripcion: string;
    precioUnitario: number;
    subtotal: number;
    series: string[];
}

export interface ComprobanteReqDTO {
    tipo: string;
    clienteNombre: string;
    clienteNumDoc: string;
    tipoDoc: string;
    montoTotal: number;
    tipoEnvio?: string;
    fechaEntrega?: string;
    tipoPago?: string;
    detalles: ComprobanteDetalleReqDTO[];
}

export interface ComprobanteItem {
    id: number;
    tipo: "BOLETA" | "FACTURA";
    serieNumero: string;
    clienteNombre: string;
    clienteNumDoc: string;
    tipoDoc: "DNI" | "RUC";
    montoTotal: number;
    tipoEnvio?: string;
    fechaEntrega?: string;
    tipoPago?: string;
    fechaEmision: string;
    estadoSunat: "ACEPTADO" | "RECHAZADO" | "PENDIENTE";
    detalles: {
        cantidad: number;
        descripcion: string;
        precioUnitario: number;
        subtotal: number;
        seriesEscaneadas: string;
    }[];
}

const ENDPOINT = "/api/comprobantes";

export const comprobantesService = {
    async listarTodos(): Promise<ComprobanteItem[]> {
        return await apiClient.get<ComprobanteItem[]>(ENDPOINT);
    },

    async emitir(dto: ComprobanteReqDTO): Promise<ComprobanteItem> {
        return await apiClient.post<ComprobanteItem>(ENDPOINT, dto);
    }
};

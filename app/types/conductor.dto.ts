export interface ConductorDTO {
    id?: number;
    nombre: string;
    documentoIdentidad: string;
    telefono: string;
    direccion: string;
    estado: string; // "Libre" | "Entregando"
}

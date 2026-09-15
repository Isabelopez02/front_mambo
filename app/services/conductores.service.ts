import { apiClient } from './apiClient';
import { ConductorDTO } from '../types/conductor.dto';

const BASE_URL = '/api/conductores';

export const conductoresService = {
  async listar(): Promise<ConductorDTO[]> {
    return await apiClient.get<ConductorDTO[]>(BASE_URL);
  },

  async obtenerPorId(id: number): Promise<ConductorDTO> {
    return await apiClient.get<ConductorDTO>(`${BASE_URL}/${id}`);
  },

  async crear(conductor: ConductorDTO): Promise<ConductorDTO> {
    return await apiClient.post<ConductorDTO>(BASE_URL, conductor);
  },

  async actualizar(id: number, conductor: ConductorDTO): Promise<ConductorDTO> {
    return await apiClient.put<ConductorDTO>(`${BASE_URL}/${id}`, conductor);
  },

  async eliminar(id: number): Promise<void> {
    await apiClient.delete(`${BASE_URL}/${id}`);
  }
};

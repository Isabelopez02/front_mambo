/**
 * DTO de Categoría alineado con Spring Boot Backend (CategoriaDTO.java)
 */

export interface CategoriaDTO {
  id?: number;
  nombre: string;
  icono?: string;
  iconoUrl?: File | string | null;
}

/**
 * Servicio de Productos conectado con Controller Spring Boot (/lista/productos) vía Interceptor
 */

import { ProductoDTO, CreateProductoDTO, UpdateProductoDTO } from "../types";
import { apiClient } from "./apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/lista/productos";

export const productosService = {
  // GET /lista/productos
  async getProductos(): Promise<ProductoDTO[]> {
    return await apiClient.get<ProductoDTO[]>(API_BASE_URL);
  },

  // POST /lista/productos (Multipart Form Data)
  async createProducto(dto: CreateProductoDTO): Promise<ProductoDTO> {
    const marginMin = dto.porcentajeGananciaMin || 30;
    const marginMax = dto.porcentajeGananciaMax || 50;
    const costPrice = dto.precioCompraProveedor || 20.00;
    const pMin = costPrice * (1 + marginMin / 100);
    const pMax = costPrice * (1 + marginMax / 100);

    const formData = new FormData();
    formData.append("nombre", dto.nombre);
    formData.append("categoriaNombre", dto.categoriaNombre);
    formData.append("precio", pMin.toFixed(2));
    formData.append("precioCompraProveedor", costPrice.toString());
    formData.append("porcentajeGananciaMin", marginMin.toString());
    formData.append("porcentajeGananciaMax", marginMax.toString());
    formData.append("precioVentaMin", pMin.toFixed(2));
    formData.append("precioVentaMax", pMax.toFixed(2));
    if (dto.descripcion) formData.append("descripcion", dto.descripcion);
    if (dto.imagenUrl instanceof File) formData.append("imagenUrl", dto.imagenUrl);

    return await apiClient.post<ProductoDTO>(API_BASE_URL, formData);
  },

  // PUT /lista/productos/{id} (Multipart Form Data)
  async updateProducto(id: number | string, dto: UpdateProductoDTO): Promise<ProductoDTO> {
    const marginMin = dto.porcentajeGananciaMin || 30;
    const marginMax = dto.porcentajeGananciaMax || 50;
    const costPrice = dto.precioCompraProveedor || 20.00;
    const pMin = costPrice * (1 + marginMin / 100);
    const pMax = costPrice * (1 + marginMax / 100);

    const formData = new FormData();
    if (dto.nombre) formData.append("nombre", dto.nombre);
    if (dto.categoriaNombre) formData.append("categoriaNombre", dto.categoriaNombre);
    formData.append("precio", pMin.toFixed(2));
    formData.append("precioCompraProveedor", costPrice.toString());
    formData.append("porcentajeGananciaMin", marginMin.toString());
    formData.append("porcentajeGananciaMax", marginMax.toString());
    formData.append("precioVentaMin", pMin.toFixed(2));
    formData.append("precioVentaMax", pMax.toFixed(2));
    if (dto.descripcion) formData.append("descripcion", dto.descripcion);
    if (dto.imagenUrl instanceof File) formData.append("imagenUrl", dto.imagenUrl);

    return await apiClient.put<ProductoDTO>(`${API_BASE_URL}/${id}`, formData);
  },

  // DELETE /lista/productos/{id}
  async deleteProducto(id: number | string): Promise<void> {
    await apiClient.delete(`${API_BASE_URL}/${id}`);
  }
};

/**
 * Servicio de Productos conectado con Controller Spring Boot (/lista/productos)
 */

import { ProductoDTO, CreateProductoDTO, UpdateProductoDTO } from "../types";
import { authService } from "./auth.service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/lista/productos";

export const productosService = {
  // GET /lista/productos
  async getProductos(): Promise<ProductoDTO[]> {
    const authHeaders = authService.getAuthHeader();
    const res = await fetch(API_BASE_URL, {
      method: "GET",
      headers: { "Accept": "application/json", ...authHeaders },
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`Error ${res.status}: Fallo al consultar productos`);
    return await res.json();
  },

  // POST /lista/productos (Multipart Form Data)
  async createProducto(dto: CreateProductoDTO): Promise<ProductoDTO> {
    const authHeaders = authService.getAuthHeader();
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

    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { ...authHeaders },
      body: formData
    });
    if (!res.ok) throw new Error(`Error ${res.status}: Fallo al guardar producto`);
    return await res.json();
  },

  // PUT /lista/productos/{id} (Multipart Form Data)
  async updateProducto(id: number | string, dto: UpdateProductoDTO): Promise<ProductoDTO> {
    const authHeaders = authService.getAuthHeader();
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

    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { ...authHeaders },
      body: formData
    });
    if (!res.ok) throw new Error(`Error ${res.status}: Fallo al actualizar producto`);
    return await res.json();
  },

  // DELETE /lista/productos/{id}
  async deleteProducto(id: number | string): Promise<void> {
    const authHeaders = authService.getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders }
    });
    if (!res.ok) throw new Error(`Error ${res.status}: Fallo al eliminar producto`);
  }
};

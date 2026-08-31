/**
 * Servicio API Axios conectado STRICTAMENTE con la Base de Datos vía Spring Boot Backend
 * Con cabecera de autenticación JWT Bearer Token (Authorization: Bearer <token>)
 */

import { ProductoDTO, CreateProductoDTO, UpdateProductoDTO } from "../types/producto.dto";
import { authService } from "./auth.service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/lista/productos";

const axiosClient = {
  async get<T>(url: string): Promise<{ data: T }> {
    const headers: Record<string, string> = {
      "Accept": "application/json",
      ...authService.getAuthHeader()
    };

    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers,
      cache: "no-store"
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}: Fallo al consultar la Base de Datos Backend`);
    const data = await res.json();
    return { data };
  },

  async post<T>(url: string, body: FormData): Promise<{ data: T }> {
    const headers = { ...authService.getAuthHeader() };

    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers,
      body
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}: Fallo al guardar en la Base de Datos Backend`);
    const data = await res.json();
    return { data };
  },

  async put<T>(url: string, body: FormData): Promise<{ data: T }> {
    const headers = { ...authService.getAuthHeader() };

    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers,
      body
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}: Fallo al actualizar en la Base de Datos Backend`);
    const data = await res.json();
    return { data };
  },

  async delete(url: string): Promise<{ status: number }> {
    const headers = { ...authService.getAuthHeader() };

    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}: Fallo al eliminar en la Base de Datos Backend`);
    return { status: res.status };
  }
};

export const productosService = {
  // GET ALL DIRECTO DE LA BASE DE DATOS
  async getProductos(): Promise<ProductoDTO[]> {
    const response = await axiosClient.get<ProductoDTO[]>("");
    return response.data;
  },

  // CREAR PRODUCTO CON TOKEN JWT (POST /lista/productos)
  async createProducto(dto: CreateProductoDTO): Promise<ProductoDTO> {
    const marginMin = dto.porcentajeGananciaMin || 30;
    const marginMax = dto.porcentajeGananciaMax || 50;
    const costPrice = dto.precioCompraProveedor || 20.00;
    const pMin = costPrice * (1 + marginMin / 100);
    const pMax = costPrice * (1 + marginMax / 100);

    const formData = new FormData();
    formData.append("nombre", dto.nombre);
    formData.append("categoriaNombre", dto.categoriaNombre);
    if (dto.codigoBase5D) formData.append("codigoBase5D", dto.codigoBase5D);
    formData.append("precio", pMin.toFixed(2));
    formData.append("precioCompraProveedor", costPrice.toString());
    formData.append("porcentajeGananciaMin", marginMin.toString());
    formData.append("porcentajeGananciaMax", marginMax.toString());
    formData.append("precioVentaMin", pMin.toFixed(2));
    formData.append("precioVentaMax", pMax.toFixed(2));
    if (dto.descripcion) formData.append("descripcion", dto.descripcion);
    if (dto.imagenUrl instanceof File) formData.append("imagenUrl", dto.imagenUrl);

    const response = await axiosClient.post<ProductoDTO>("", formData);
    return response.data;
  },

  // ACTUALIZAR PRODUCTO CON TOKEN JWT (PUT /lista/productos/{id})
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

    const response = await axiosClient.put<ProductoDTO>(`/${id}`, formData);
    return response.data;
  },

  // ELIMINAR PRODUCTO CON TOKEN JWT (DELETE /lista/productos/{id})
  async deleteProducto(id: number | string): Promise<void> {
    await axiosClient.delete(`/${id}`);
  }
};

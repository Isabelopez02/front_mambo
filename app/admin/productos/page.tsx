"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search01Icon, 
  Add01Icon, 
  AnalyticsUpIcon, 
  Cancel01Icon, 
  Edit01Icon,
  ViewOffIcon,
  FilterIcon,
  Download01Icon,
  Tag01Icon,
  ShoppingBag01Icon,
  Image01Icon,
  CalculatorIcon
} from "hugeicons-react";
import { productosService } from "../../services/productos.service";
import { categoriasService } from "../../services/categorias.service";
import { ProductoDTO } from "../../types/producto.dto";
import { CategoriaDTO } from "../../types/categoria.dto";

export default function ProductosAdminPage() {
  const [products, setProducts] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODAS");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductoDTO | null>(null);
  const [toggleStatusProduct, setToggleStatusProduct] = useState<ProductoDTO | null>(null);

  // CATEGORIES MODAL STATE
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [dbCategories, setDbCategories] = useState<CategoriaDTO[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);

  // CATEGORY FORM STATE (LEFT SIDE OF MODAL)
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [catNombreForm, setCatNombreForm] = useState("");
  const [catImageFile, setCatImageFile] = useState<File | null>(null);
  const [catImagePreview, setCatImagePreview] = useState<string | null>(null);
  const [savingCat, setSavingCat] = useState(false);

  // CREATE FORM STATE
  const [nombreInput, setNombreInput] = useState("");
  const [descripcionInput, setDescripcionInput] = useState("");
  const [catInput, setCatInput] = useState("Maquillaje");
  const [costoCompraInput, setCostoCompraInput] = useState<string>("20.00");
  const [gainMinPct, setGainMinPct] = useState<number>(30); // 30%
  const [gainMaxPct, setGainMaxPct] = useState<number>(50); // 50%
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // EDIT FORM STATE
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editCat, setEditCat] = useState("Maquillaje");
  const [editCostoCompra, setEditCostoCompra] = useState<string>("20.00");
  const [editGainMinPct, setEditGainMinPct] = useState<number>(30);
  const [editGainMaxPct, setEditGainMaxPct] = useState<number>(50);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // VIEW PHYSICAL UNITS MODAL STATE
  const [viewUnitsProduct, setViewUnitsProduct] = useState<ProductoDTO | null>(null);

  const categories = ["TODAS", "Carteras", "Maquillaje", "Skincare", "Hogar", "Accesorios"];

  // Fetch products strictly from backend database endpoint: GET http://localhost:8080/lista/productos
  const fetchProducts = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await productosService.getProductos();
      setProducts(data);
    } catch (err: any) {
      console.error("Error backend API:", err);
      setErrorMsg("No hay conexión con el servidor backend Spring Boot. Asegúrate de iniciar tu backend en Java.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories from Backend API (/api/categorias)
  const fetchCategories = async () => {
    setLoadingCats(true);
    try {
      const data = await categoriasService.listar();
      setDbCategories(data);
    } catch (err: any) {
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoadingCats(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const resetCatForm = () => {
    setEditingCatId(null);
    setCatNombreForm("");
    setCatImageFile(null);
    setCatImagePreview(null);
  };

  const handleSelectCatForEdit = (cat: CategoriaDTO) => {
    if (cat.id) {
      setEditingCatId(cat.id);
      setCatNombreForm(cat.nombre || "");
      setCatImagePreview(cat.icono || null);
      setCatImageFile(null);
    }
  };

  const handleSaveCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNombreForm.trim()) return;

    setSavingCat(true);
    try {
      if (editingCatId) {
        await categoriasService.actualizar(editingCatId, catNombreForm, catImageFile);
      } else {
        await categoriasService.crear(catNombreForm, catImageFile);
      }
      resetCatForm();
      await fetchCategories();
    } catch (err: any) {
      alert("Error al guardar categoría: " + (err.message || "No se pudo procesar la solicitud"));
    } finally {
      setSavingCat(false);
    }
  };

  const handleDeleteCategory = async (id?: number) => {
    if (!id) return;
    if (confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      try {
        await categoriasService.eliminar(id);
        await fetchCategories();
      } catch (err: any) {
        alert("Error al eliminar categoría: " + (err.message || "No se pudo completar la acción"));
      }
    }
  };

  const dynamicCategories = ["TODAS", ...Array.from(new Set(dbCategories.map(c => c.nombre)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const catName = p.categoriaNombre || p.categoria || "";
    const matchesCategory = selectedCategory === "TODAS" || catName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  // CALCULATE SALE PRICES REALTIME
  const numCostoCompra = parseFloat(costoCompraInput) || 20.00;
  const calcPMin = numCostoCompra * (1 + gainMinPct / 100);
  const calcPMax = numCostoCompra * (1 + gainMaxPct / 100);

  // CREATE PRODUCT STRICTLY ON BACKEND DATABASE
  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreInput) return;

    try {
      await productosService.createProducto({
        nombre: nombreInput,
        descripcion: descripcionInput,
        categoriaNombre: catInput,
        precioCompraProveedor: numCostoCompra,
        porcentajeGananciaMin: gainMinPct,
        porcentajeGananciaMax: gainMaxPct,
        imagenUrl: imageFile
      });

      await fetchProducts(); // Sincroniza desde la Base de Datos
      setIsAddModalOpen(false);
      setNombreInput("");
      setDescripcionInput("");
      setCostoCompraInput("20.00");
      setGainMinPct(30);
      setGainMaxPct(50);
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      alert("Error al conectar con la base de datos backend: " + err.message);
    }
  };

  // OPEN EDIT MODAL
  const handleOpenEdit = (prod: ProductoDTO) => {
    setEditingProduct(prod);
    setEditNombre(prod.nombre);
    setEditDescripcion(prod.descripcion || "");
    setEditCat(prod.categoriaNombre || prod.categoria || "Maquillaje");
    setEditCostoCompra((prod.precioCompraProveedor || 20.00).toString());
    setEditGainMinPct(prod.porcentajeGananciaMin || 30);
    setEditGainMaxPct(prod.porcentajeGananciaMax || 50);
    setEditImagePreview(prod.img || null);
  };

  const editNumCostoCompra = parseFloat(editCostoCompra) || 20.00;
  const editCalcPMin = editNumCostoCompra * (1 + editGainMinPct / 100);
  const editCalcPMax = editNumCostoCompra * (1 + editGainMaxPct / 100);

  // UPDATE PRODUCT STRICTLY ON BACKEND DATABASE
  const handleUpdateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.id) return;

    try {
      await productosService.updateProducto(editingProduct.id, {
        id: editingProduct.id,
        nombre: editNombre,
        descripcion: editDescripcion,
        categoriaNombre: editCat,
        precioCompraProveedor: editNumCostoCompra,
        porcentajeGananciaMin: editGainMinPct,
        porcentajeGananciaMax: editGainMaxPct,
        imagenUrl: editImageFile
      });

      await fetchProducts(); // Sincroniza desde la Base de Datos
      setEditingProduct(null);
    } catch (err: any) {
      alert("Error al actualizar en la base de datos backend: " + err.message);
    }
  };

  // DELETE PRODUCT STRICTLY ON BACKEND DATABASE (DELETE /lista/productos/{id})
  const handleConfirmToggleStatus = async () => {
    if (!toggleStatusProduct || !toggleStatusProduct.id) return;
    try {
      await productosService.deleteProducto(toggleStatusProduct.id);
      await fetchProducts(); // Sincroniza desde la Base de Datos
      setToggleStatusProduct(null);
    } catch (err: any) {
      alert("Error al eliminar en la base de datos backend: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#059669", letterSpacing: "1.8px", textTransform: "uppercase" }}>
            SINCRONIZACIÓN BASE DE DATOS BACKEND
          </span>
          <h1 style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "1.35rem", color: "#0f172a", margin: "2px 0 0 0", fontWeight: "400" }}>
            Administración de Productos & Base de Datos Backend
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => { resetCatForm(); setIsCatModalOpen(true); }}
            style={{
              padding: "9px 16px",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "0.76rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
            }}
          >
            <Tag01Icon size={16} color="#059669" /> Categorías
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              padding: "9px 18px",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.76rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(15,23,42,0.15)"
            }}
          >
            <Add01Icon size={16} color="#ffffff" /> Registrar Nuevo Producto
          </button>
        </div>
      </div>

      {/* TABLE HEADER OPTIMIZATION: SEARCH LEFT, OUTLINE ACTIONS RIGHT */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        {/* SEARCH BAR LEFT */}
        <div style={{ position: "relative", width: "280px" }}>
          <input
            type="text"
            placeholder="Buscar por producto o código 5D..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 32px 7px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "0.75rem",
              backgroundColor: "#f8fafc",
              outline: "none"
            }}
          />
          <Search01Icon size={14} color="#64748b" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        {/* CATEGORY CHIPS & OUTLINE ACTION BUTTONS RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", overflowX: "auto" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: selectedCategory === cat ? "1px solid #059669" : "1px solid #cbd5e1",
                  backgroundColor: selectedCategory === cat ? "#ecfdf5" : "#ffffff",
                  color: selectedCategory === cat ? "#059669" : "#64748b"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            style={{
              padding: "6px 12px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.72rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <FilterIcon size={14} color="#475569" /> Filtrar
          </button>

          <button
            type="button"
            style={{
              padding: "6px 12px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.72rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Download01Icon size={14} color="#475569" /> Exportar
          </button>
        </div>
      </div>

      {/* PRODUCTS TABLE STRICTLY BACKEND DATABASE (GET /lista/productos) */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "20px 24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
      }}>
        {loading ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
            ⏳ Consultando la base de datos backend...
          </div>
        ) : errorMsg ? (
          <div style={{ padding: "30px 20px", textAlign: "center", backgroundColor: "#fef2f2", borderRadius: "10px", border: "1px solid #fecaca", color: "#991b1b", fontSize: "0.8rem" }}>
            <p style={{ margin: "0 0 10px 0", fontWeight: "700" }}>⚠️ Error de Conexión a la Base de Datos</p>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#7f1d1d" }}>{errorMsg}</p>
            <button
              onClick={fetchProducts}
              style={{ marginTop: "12px", padding: "6px 12px", backgroundColor: "#991b1b", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.72rem", cursor: "pointer" }}
            >
              🔄 Reintentar Conexión BD
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px dashed #cbd5e1", color: "#64748b" }}>
            <ShoppingBag01Icon size={32} color="#cbd5e1" style={{ margin: "0 auto 10px auto", display: "block" }} />
            <p style={{ fontSize: "0.85rem", margin: "0 0 10px 0" }}>No existen productos guardados en la Base de Datos.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{ padding: "6px 14px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "600", cursor: "pointer" }}
            >
              + Registrar Producto en Base de Datos
            </button>
          </div>
        ) : (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.76rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={thStyle}>IMAGEN</th>
                  <th style={thStyle}>PRODUCTO & SKU (5D)</th>
                  <th style={thStyle}>UNIDADES / SERIES</th>
                  <th style={thStyle}>P. COMPRA PROVEEDOR</th>
                  <th style={thStyle}>MARGEN GANANCIA (%)</th>
                  <th style={thStyle}>P. VENTA MÍN.</th>
                  <th style={thStyle}>P. VENTA MÁX.</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => {
                  const costoCompra = prod.precioCompraProveedor || (prod.precio || 0) * 0.6 || 20.00;
                  const marginMin = prod.porcentajeGananciaMin || 30;
                  const marginMax = prod.porcentajeGananciaMax || 50;
                  const vMin = prod.precioVentaMin || (costoCompra * (1 + marginMin / 100));
                  const vMax = prod.precioVentaMax || (costoCompra * (1 + marginMax / 100));
                  const totalStock = prod.stock != null ? prod.stock : (prod.series?.length || 0);

                  return (
                    <tr key={prod.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      {/* PRODUCT THUMBNAIL IMAGE */}
                      <td style={{ ...tdStyle, width: "50px" }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "8px",
                          backgroundColor: "#f8fafc",
                          overflow: "hidden",
                          border: "1px solid #cbd5e1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {prod.img ? (
                            <img src={prod.img} alt={prod.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <Image01Icon size={20} color="#94a3b8" />
                          )}
                        </div>
                      </td>

                      {/* PRODUCTO & CÓDIGO SKU 5D */}
                      <td style={tdStyle}>
                        <div>
                          <strong style={{ color: "#0f172a", fontSize: "0.84rem" }}>{prod.nombre}</strong>
                          {prod.descripcion && (
                            <p style={{ margin: "2px 0 0 0", fontSize: "0.66rem", color: "#64748b", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {prod.descripcion}
                            </p>
                          )}
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                            {prod.sku && (
                              <span style={{ fontSize: "0.64rem", fontWeight: "800", backgroundColor: "#e2e8f0", color: "#0f172a", padding: "1px 6px", borderRadius: "4px", fontFamily: "monospace" }}>
                                SKU: {prod.sku}
                              </span>
                            )}
                            <span style={{ fontSize: "0.62rem", color: "#64748b" }}>
                              {prod.categoriaNombre || prod.categoria || "General"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* STOCK Y VER SERIES INDIVIDUALES */}
                      <td style={tdStyle}>
                        <button
                          type="button"
                          onClick={() => setViewUnitsProduct(prod)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: totalStock > 0 ? "#eff6ff" : "#fef2f2",
                            border: totalStock > 0 ? "1px solid #bfdbfe" : "1px solid #fecaca",
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            color: totalStock > 0 ? "#1d4ed8" : "#dc2626",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          📦 {totalStock} Unidades (Series 5D)
                        </button>
                      </td>

                      {/* P. COMPRA PROVEEDOR */}
                      <td style={tdStyle}>
                        <strong style={{ fontSize: "0.84rem", color: "#0f172a" }}>
                          S/ {costoCompra.toFixed(2)}
                        </strong>
                      </td>

                      {/* MARGEN DE GANANCIA PORCENTAJE (MIN % / MAX %) */}
                      <td style={tdStyle}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "3px 8px", borderRadius: "6px" }}>
                          <AnalyticsUpIcon size={13} color="#15803d" />
                          <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#166534" }}>
                            {marginMin}% a {marginMax}%
                          </span>
                        </div>
                      </td>

                      {/* P. VENTA MÍNIMO CALCULADO */}
                      <td style={{ ...tdStyle, fontWeight: "700", color: "#15803d", fontSize: "0.84rem" }}>
                        S/ {vMin.toFixed(2)}
                      </td>

                      {/* P. VENTA MÁXIMO CALCULADO */}
                      <td style={{ ...tdStyle, fontWeight: "800", color: "#166534", fontSize: "0.86rem" }}>
                        S/ {vMax.toFixed(2)}
                      </td>

                      {/* ACCIONES */}
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(prod)}
                            title="Editar Producto"
                            style={actionBtnStyle}
                          >
                            <Edit01Icon size={14} color="#0284c7" /> Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => setToggleStatusProduct(prod)}
                            title="Eliminar en Base de Datos"
                            style={{
                              ...actionBtnStyle,
                              color: "#dc2626",
                              borderColor: "#fca5a5",
                              backgroundColor: "#fef2f2"
                            }}
                          >
                            <ViewOffIcon size={14} color="#dc2626" /> Desactivar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: REGISTRAR NUEVO PRODUCTO EN BASE DE DATOS (POST /lista/productos) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "90%",
                maxWidth: "480px",
                maxHeight: "90vh",
                overflowY: "auto",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#059669", textTransform: "uppercase" }}>BACKEND DB: POST /lista/productos</span>
                  <h3 style={{ fontSize: "0.98rem", fontWeight: "700", color: "#0f172a", margin: "2px 0 0 0" }}>Registrar en Base de Datos</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                
                {/* IMAGE UPLOAD FIELD WITH PREVIEW */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Imagen del Producto
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                      backgroundColor: "#f8fafc",
                      border: "1px dashed #cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Image01Icon size={24} color="#94a3b8" />
                      )}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ fontSize: "0.72rem", color: "#334155" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre del Producto</label>
                  <input type="text" required placeholder="Ej. Bolso Americano" value={nombreInput} onChange={(e) => setNombreInput(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Descripción del Producto</label>
                  <textarea placeholder="Ingresa la descripción del producto..." value={descripcionInput} onChange={(e) => setDescripcionInput(e.target.value)} style={{ ...inputStyle, height: "55px", resize: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Categoría</label>
                  <select value={catInput} onChange={(e) => setCatInput(e.target.value)} style={inputStyle}>
                    {dbCategories.length > 0 ? (
                      dbCategories.map(c => <option key={c.id || c.nombre} value={c.nombre}>{c.nombre}</option>)
                    ) : (
                      <>
                        <option value="Carteras">Carteras</option>
                        <option value="Maquillaje">Maquillaje</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Hogar">Hogar</option>
                        <option value="Accesorios">Accesorios</option>
                      </>
                    )}
                  </select>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.66rem", color: "#475569" }}>
                  ℹ️ El <strong>SKU único de 5 dígitos</strong> (ej. 23212) será asignado automáticamente por el backend. Las <strong>unidades físicas y series de 5 dígitos</strong> se generarán únicamente cuando registres una compra/ingreso de mercadería.
                </div>

                {/* COST PRICE INPUT */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Precio Compra Proveedor (S/)</label>
                  <input type="number" step="0.10" required value={costoCompraInput} onChange={(e) => setCostoCompraInput(e.target.value)} style={inputStyle} />
                </div>

                {/* PERCENTAGE GAIN MARGIN INPUTS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>% Ganancia Mínima</label>
                    <input type="number" min="1" max="500" required value={gainMinPct} onChange={(e) => setGainMinPct(parseFloat(e.target.value) || 0)} style={inputStyle} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#166534", textTransform: "uppercase", marginBottom: "4px" }}>% Ganancia Máxima</label>
                    <input type="number" min="1" max="500" required value={gainMaxPct} onChange={(e) => setGainMaxPct(parseFloat(e.target.value) || 0)} style={inputStyle} />
                  </div>
                </div>

                {/* AUTOMATIC CALCULATED SALE PRICES DISPLAY */}
                <div style={{
                  backgroundColor: "#f0fdf4",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #bbf7d0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CalculatorIcon size={18} color="#15803d" />
                    <div>
                      <span style={{ fontSize: "0.58rem", fontWeight: "800", color: "#166534", textTransform: "uppercase", display: "block" }}>PRECIOS CALCULADOS BD</span>
                      <span style={{ fontSize: "0.62rem", color: "#15803d" }}>S/ {numCostoCompra.toFixed(2)} + {gainMinPct}% / {gainMaxPct}%</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#15803d", display: "block" }}>Mín: S/ {calcPMin.toFixed(2)}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#166534" }}>Máx: S/ {calcPMax.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "6px" }}>
                  GUARDAR DIRECTO EN BASE DE DATOS
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDITAR PRODUCTO EN BASE DE DATOS (PUT /lista/productos/{id}) */}
      <AnimatePresence>
        {editingProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "90%",
                maxWidth: "480px",
                maxHeight: "90vh",
                overflowY: "auto",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>BACKEND DB: PUT /lista/productos/{editingProduct.id}</span>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a", margin: "2px 0 0 0" }}>{editingProduct.nombre}</h3>
                </div>
                <button onClick={() => setEditingProduct(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={18} color="#0f172a" />
                </button>
              </div>

              <form onSubmit={handleUpdateProductSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                
                {/* 5-DIGIT BASE CODE READONLY */}


                {/* EDIT IMAGE UPLOAD FIELD */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Actualizar Imagen
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                      backgroundColor: "#f8fafc",
                      border: "1px dashed #cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}>
                      {editImagePreview ? (
                        <img src={editImagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Image01Icon size={24} color="#94a3b8" />
                      )}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                      style={{ fontSize: "0.72rem", color: "#334155" }}
                    />
                  </div>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#475569" }}>CÓDIGO SKU (MODELO 5D)</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#0f172a", fontFamily: "monospace", backgroundColor: "#e2e8f0", padding: "2px 8px", borderRadius: "4px" }}>
                    {editingProduct.sku || "AUTO"}
                  </span>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Nombre del Producto</label>
                  <input type="text" required value={editNombre} onChange={(e) => setEditNombre(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Descripción del Producto</label>
                  <textarea placeholder="Ingresa la descripción del producto..." value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} style={{ ...inputStyle, height: "55px", resize: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Categoría</label>
                  <select value={editCat} onChange={(e) => setEditCat(e.target.value)} style={inputStyle}>
                    {dbCategories.length > 0 ? (
                      dbCategories.map(c => <option key={c.id || c.nombre} value={c.nombre}>{c.nombre}</option>)
                    ) : (
                      <>
                        <option value="Carteras">Carteras</option>
                        <option value="Maquillaje">Maquillaje</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Hogar">Hogar</option>
                        <option value="Accesorios">Accesorios</option>
                      </>
                    )}
                  </select>
                </div>

                {/* EDIT COST PRICE INPUT */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>Precio Compra Proveedor (S/)</label>
                  <input type="number" step="0.10" required value={editCostoCompra} onChange={(e) => setEditCostoCompra(e.target.value)} style={inputStyle} />
                </div>

                {/* PERCENTAGE GAIN MARGIN INPUTS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>% Ganancia Mínima</label>
                    <input type="number" min="1" max="500" required value={editGainMinPct} onChange={(e) => setEditGainMinPct(parseFloat(e.target.value) || 0)} style={inputStyle} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: "700", color: "#166534", textTransform: "uppercase", marginBottom: "4px" }}>% Ganancia Máxima</label>
                    <input type="number" min="1" max="500" required value={editGainMaxPct} onChange={(e) => setEditGainMaxPct(parseFloat(e.target.value) || 0)} style={inputStyle} />
                  </div>
                </div>

                {/* AUTOMATIC CALCULATED SALE PRICES DISPLAY */}
                <div style={{
                  backgroundColor: "#f0fdf4",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #bbf7d0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CalculatorIcon size={18} color="#15803d" />
                    <div>
                      <span style={{ fontSize: "0.58rem", fontWeight: "800", color: "#166534", textTransform: "uppercase", display: "block" }}>NUEVOS PRECIOS CALCULADOS BD</span>
                      <span style={{ fontSize: "0.62rem", color: "#15803d" }}>S/ {editNumCostoCompra.toFixed(2)} + {editGainMinPct}% / {editGainMaxPct}%</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#15803d", display: "block" }}>Mín: S/ {editCalcPMin.toFixed(2)}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#166534" }}>Máx: S/ {editCalcPMax.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0284c7", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", marginTop: "6px" }}>
                  ACTUALIZAR DIRECTO EN BASE DE DATOS
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL 3: CONFIRMAR ELIMINAR EN BASE DE DATOS (DELETE /lista/productos/{id}) */}
      <AnimatePresence>
        {toggleStatusProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggleStatusProduct(null)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "90%",
                maxWidth: "400px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0",
                textAlign: "center"
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
                ¿Eliminar de la Base de Datos?
              </h3>

              <p style={{ fontSize: "0.76rem", color: "#64748b", margin: "0 0 16px 0" }}>
                ¿Deseas enviar un request <strong>DELETE /lista/productos/{toggleStatusProduct.id}</strong> para eliminar permanentemente de la Base de Datos?
              </p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setToggleStatusProduct(null)}
                  style={{ flex: 1, padding: "9px", backgroundColor: "#f8fafc", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.74rem", fontWeight: "600", cursor: "pointer" }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleConfirmToggleStatus}
                  style={{
                    flex: 1,
                    padding: "9px",
                    backgroundColor: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.74rem",
                    fontWeight: "700",
                    cursor: "pointer"
                  }}
                >
                  Confirmar DELETE BD
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL UNIDADES FÍSICAS (SERIES DE 5 DÍGITOS) */}
      <AnimatePresence>
        {viewUnitsProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewUnitsProduct(null)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.92, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "90%",
                maxWidth: "520px",
                maxHeight: "85vh",
                overflowY: "auto",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    Unidades Físicas Registradas
                  </h3>
                  <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                    Modelo: <strong>{viewUnitsProduct.nombre}</strong> | SKU: <strong style={{ fontFamily: "monospace" }}>{viewUnitsProduct.sku}</strong>
                  </span>
                </div>
                <button onClick={() => setViewUnitsProduct(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={20} color="#0f172a" />
                </button>
              </div>

              <p style={{ fontSize: "0.72rem", color: "#475569", marginBottom: "16px" }}>
                Cada registro representa una <strong>unidad física individual</strong> del producto. La <strong>Serie (5D)</strong> identifica de forma única la unidad para ventas y control de stock.
              </p>

              {(!viewUnitsProduct.unidades || viewUnitsProduct.unidades.length === 0) && (!viewUnitsProduct.series || viewUnitsProduct.series.length === 0) ? (
                <div style={{ padding: "24px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px dashed #cbd5e1", color: "#64748b", fontSize: "0.78rem" }}>
                  No hay unidades físicas registradas para este producto.
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px", maxHeight: "360px", overflowY: "auto" }}>
                  {(viewUnitsProduct.unidades && viewUnitsProduct.unidades.length > 0
                    ? viewUnitsProduct.unidades
                    : (viewUnitsProduct.series || []).map((s, idx) => ({ id: idx + 1, serie: s, estado: "DISPONIBLE" }))
                  ).map((unit, index) => (
                    <div
                      key={unit.id || index}
                      style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center"
                      }}
                    >
                      <span style={{ display: "block", fontSize: "0.6rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" }}>
                        Unidad #{index + 1}
                      </span>
                      <strong style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", fontFamily: "monospace", letterSpacing: "1px", margin: "2px 0" }}>
                        {unit.serie}
                      </strong>
                      <span style={{
                        display: "inline-block",
                        fontSize: "0.6rem",
                        fontWeight: "700",
                        backgroundColor: unit.estado === "VENDIDO" ? "#fef2f2" : "#f0fdf4",
                        color: unit.estado === "VENDIDO" ? "#dc2626" : "#166534",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        marginTop: "4px"
                      }}>
                        {unit.estado || "DISPONIBLE"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL CATEGORÍAS VISTA DIVIDIDA (IZQUIERDA: FORMULARIO CREAR/EDITAR | DERECHA: LISTA CATEGORÍAS) */}
      <AnimatePresence>
        {isCatModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCatModalOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1100, backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.94, y: "-50%", x: "-50%" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "92%",
                maxWidth: "960px",
                maxHeight: "90vh",
                overflowY: "auto",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                zIndex: 1101,
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                border: "1px solid #e2e8f0"
              }}
            >
              {/* MODAL HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Tag01Icon size={20} color="#059669" />
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>Gestión de Categorías</h3>
                    <span style={{ fontSize: "0.68rem", color: "#64748b" }}>Crea, edita o elimina las categorías sincronizadas con la Base de Datos</span>
                  </div>
                </div>
                <button onClick={() => setIsCatModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Cancel01Icon size={20} color="#0f172a" />
                </button>
              </div>

              {/* GRID DOS COLUMNAS: FORMULARIO IZQUIERDA (~28%) | LISTA DERECHA (~72%) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: "24px" }}>
                
                {/* COLUMNA IZQUIERDA: FORMULARIO PARA CREAR / EDITAR */}
                <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "12px", height: "fit-content" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.86rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                      {editingCatId ? "✏️ Editar Categoría" : "➕ Crear Categoría"}
                    </h4>
                    {editingCatId && (
                      <button
                        onClick={resetCatForm}
                        style={{ fontSize: "0.62rem", color: "#dc2626", border: "none", background: "none", cursor: "pointer", fontWeight: "700" }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveCategorySubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                        Nombre de Categoría
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Maquillaje, Skincare..."
                        value={catNombreForm}
                        onChange={(e) => setCatNombreForm(e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.65rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                        Imagen de Categoría
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          backgroundColor: "#ffffff",
                          border: "1px dashed #cbd5e1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden"
                        }}>
                          {catImagePreview ? (
                            <img src={catImagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <Image01Icon size={20} color="#94a3b8" />
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const f = e.target.files[0];
                              setCatImageFile(f);
                              setCatImagePreview(URL.createObjectURL(f));
                            }
                          }}
                          style={{ fontSize: "0.68rem", color: "#334155", width: "130px" }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={savingCat}
                      style={{
                        width: "100%",
                        padding: "9px",
                        backgroundColor: editingCatId ? "#0284c7" : "#059669",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.74rem",
                        fontWeight: "700",
                        cursor: savingCat ? "wait" : "pointer",
                        marginTop: "6px"
                      }}
                    >
                      {savingCat ? "Guardando..." : editingCatId ? "ACTUALIZAR CATEGORÍA" : "GUARDAR CATEGORÍA"}
                    </button>
                  </form>
                </div>

                {/* COLUMNA DERECHA: LISTADO DE CATEGORÍAS (OCUPA ~72% DEL MODAL) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#334155" }}>
                      Todas las Categorías ({dbCategories.length})
                    </span>
                    <button
                      onClick={fetchCategories}
                      style={{ fontSize: "0.68rem", color: "#059669", background: "none", border: "none", cursor: "pointer", fontWeight: "600" }}
                    >
                      🔄 Actualizar Lista
                    </button>
                  </div>

                  {loadingCats ? (
                    <div style={{ padding: "30px", textAlign: "center", color: "#64748b", fontSize: "0.8rem" }}>
                      ⏳ Cargando categorías desde la BD...
                    </div>
                  ) : dbCategories.length === 0 ? (
                    <div style={{ padding: "30px", textAlign: "center", color: "#64748b", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px dashed #cbd5e1", fontSize: "0.8rem" }}>
                      No hay categorías registradas en la Base de Datos.
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }}>
                      {dbCategories.map((cat) => (
                        <div
                          key={cat.id || cat.nombre}
                          style={{
                            backgroundColor: "#ffffff",
                            border: editingCatId === cat.id ? "2px solid #0284c7" : "1px solid #e2e8f0",
                            borderRadius: "10px",
                            padding: "10px 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              backgroundColor: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              {cat.icono ? (
                                <img src={cat.icono} alt={cat.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              ) : (
                                <Tag01Icon size={18} color="#059669" />
                              )}
                            </div>
                            <div>
                              <strong style={{ fontSize: "0.8rem", color: "#0f172a", display: "block" }}>{cat.nombre}</strong>
                              <span style={{ fontSize: "0.62rem", color: "#64748b" }}>ID: #{cat.id}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "4px" }}>
                            <button
                              onClick={() => handleSelectCatForEdit(cat)}
                              title="Extraer datos para Editar"
                              style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "6px", padding: "4px", cursor: "pointer" }}
                            >
                              <Edit01Icon size={14} color="#0284c7" />
                            </button>

                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              title="Eliminar Categoría"
                              style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "4px", cursor: "pointer" }}
                            >
                              <ViewOffIcon size={14} color="#dc2626" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.75rem",
  outline: "none",
  backgroundColor: "#f8fafc",
  color: "#0f172a"
};

const actionBtnStyle: React.CSSProperties = {
  padding: "4px 8px",
  backgroundColor: "#ffffff",
  color: "#0284c7",
  border: "1px solid #bae6fd",
  borderRadius: "6px",
  fontSize: "0.68rem",
  fontWeight: "600",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px"
};

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: "0.65rem",
  fontWeight: "700",
  color: "#475569",
  letterSpacing: "0.5px"
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "0.76rem",
  color: "#0f172a"
};

export type Producto = {
  id: number;
  name: string;
  price: number;
  stock?: number;
  oldPrice?: number; // Precio anterior
  img: string; // Imagen principal
  categoria: string; // Categoría del producto
  rating: number; // Calificación del producto
  compras: number; // Número de compras
  views: number; // Número de vistas
  badge?: string; // Texto del badge (ej. "-20%")
  badgeColor?: string; // Color del badge (ej. "#ef4444"
  sizes: string[]; // Tallas del producto
  description?: string[];
  colors?: { hex: string; img: string }[]; // Colores disponibles con su imagen
  features?: feature[]; 
};

export type feature = {
  titulo: string;
  descripcion: string;
}
export enum Talla {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL"

}

export const prendasPopulares: Producto[] = [
  { id: 21, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
  { id: 22, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
  { id: 23, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
  { id: 24, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
  { id: 26, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
  { id: 27, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
  { id: 28, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
];

export const productosCatalogo: Producto[] = [
  { 
    id: 31, name: "Urban Capa M1", price: 120.00, oldPrice: 500,
    img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg",
    categoria: "Chaquetas",
    rating: 4.8, compras: 120, views: 124,
    badge: "NUEVO", badgeColor: "#3b82f6",
    colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" }],
    sizes: ["S", "M", "L", "XL"],
    features: [
      {
        titulo: "COMPOSICIÓN",
        descripcion: "100% Poliéster reciclado de alta calidad. Forro interior térmico con tecnología HeatLock que mantiene la temperatura corporal."
      },
      {
        titulo: "CAPUCHA",
        descripcion: "Capucha desmontable con ajuste de cordón y protección facial. Incluye forro polar extraíble para mayor versatilidad."
      },
      {
        titulo: "BOLSILLOS",
        descripcion: "4 bolsillos exteriores con cierre hermético. 2 bolsillos interiores para guardar tus objetos de valor de forma segura."
      },
      {
        titulo: "CUIDADOS",
        descripcion: "Lavable a máquina en ciclo delicado con agua fría. No usar blanqueador. Secar al aire libre, evitar secadora."
      }
    ],
  },
  { 
    id: 32, name: "Neo Cargo Pant", price: 85.00, oldPrice: 110.00,
    img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg",
    categoria: "Pantalones",
    rating: 4.5,compras: 120,  views: 89, 
    badge: "-22%", badgeColor: "#ef4444", // Descuento en rojo
    colors: [{ hex: "#4b5563", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }],
    sizes: ["M", "L"]
  },
  { 
    id: 33, name: "Cyber Hoodie v2", price: 95.00, oldPrice: 520,
    img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg",
    categoria: "Sudaderas",
    rating: 5.0, compras: 120, views: 342, 
    badge: "BEST SELLER", badgeColor: "#FFB800", // Amarillo Mambo
    colors: [{ hex: "#f3f4f6", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" }, { hex: "#000000", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
    { 
    id: 35, name: "Urban Capa M1", price: 120.00, oldPrice:520,
    img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg",
    categoria: "Chaquetas",
    compras: 120,
    rating: 4.8, views: 124, 
    badge: "NUEVO", badgeColor: "#3b82f6",
    colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" }],
    sizes: ["S", "M", "L", "XL"]
  },
  { 
    id: 34,
    name: "Neo Cargo Pant",
    price: 85.00, oldPrice: 110.00, rating: 4.5, views: 89, 
    badge: "-22%", badgeColor: "#ef4444", // Descuento en rojo
    img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg", 
    categoria: "Pantalones",
    compras: 120,
    colors: [{ hex: "#4b5563", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }],
    sizes: ["M", "L"]
  },
  { 
    id: 36, name: "Cyber Hoodie v2", price: 95.00, oldPrice: 580, rating: 5.0, compras: 120,  views: 342, 
    badge: "BEST SELLER", badgeColor: "#FFB800", // Amarillo Mambo
    img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg", 
    categoria: "Sudaderas",
    colors: [{ hex: "#f3f4f6", img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" }, { hex: "#000000", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
];

export const nuevasPrendas: Producto[] = [
  { 
    id: 101, name: "Urban Capa M1", price: 120.00, oldPrice: 220,rating: 2, compras: 20,
    img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg",
    categoria: "Ropa",
    views: 50,
    sizes: ["M", "L", "XL"],
    badge: "DROP EXCLUSIVE",
    badgeColor: "#3b82f6"
  },
  { 
    id: 102, 
    name: "Neo Cargo Pant", 
    price: 95.00, 
    oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg",
    sizes: ["30", "32", "34"],
    colors: [
      { hex: "#000", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" },
      { hex: "#4b5563", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }
    ]
  },
  { 
    id: 103, 
    name: "Cyber Hoodie v2", 
    price: 85.00, 
    oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg",
    sizes: ["S", "M", "L"],
    badge: "NEW",
    badgeColor: "#3b82f6"
  },
  { 
    id: 104, 
    name: "Cargo Joggers", 
    price: 110.00, oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { hex: "#000", img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" }
    ]
  },
  { 
    id: 105, 
    name: "Alpha Sneakers", 
    price: 150.00, oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/1200x/06/a1/03/06a10364ca9d2bdb3f120bc34e708421.jpg",
    sizes: ["40", "41", "42", "43"],
    badge: "TOP",
    badgeColor: "#3b82f6"
  },
  { 
    id: 106, 
    name: "Tech Jacket", 
    price: 220.00, oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/736x/58/9e/47/589e4703e15ce9ad9619c222aab5101d.jpg",
    sizes: ["M", "L", "XL"],
  },
  { 
    id: 107, 
    name: "Graffiti Tee", 
    price: 45.00,
    oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/736x/1f/35/8f/1f358fc40b87d712c8c89f838fb73f43.jpg",
    sizes: ["S", "M", "L"]
  },
  { 
    id: 108, 
    name: "Metal Chain", 
    price: 65.00, 
    oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
    img: "https://i.pinimg.com/1200x/d4/25/21/d42521fa7f2a1566515cbd02fa3299a6.jpg",
    sizes: ["ONE SIZE"]
  },
  { 
    id: 109, 
    name: "Neo Cargo Pant", 
    price: 95.00, 
    img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg",
    sizes: ["30", "32", "34"],
    oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
  },
  { 
    id: 110, 
    name: "Skull Beanie", 
    price: 35.00, 
    img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg",
    sizes: ["ONE SIZE"],
    badge: "NEW",
    badgeColor: "#3b82f6",
    oldPrice: 115.00, rating: 2, compras: 20, categoria: "Ropa",
    views: 50,
  },
];
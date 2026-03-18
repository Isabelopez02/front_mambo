import { Producto, Talla } from "./Prendas";

export type oufit = {
    id: number;
    name: string;
    description: string;
    img: string;
    prendas: Producto[];
}

export const listaLooks: oufit[] = [
  {
    id: 1,
    name: "Urban Matrix",
    description: "Un estilo urbano con toques futuristas",
    img: "https://i.pinimg.com/736x/d2/33/27/d2332766467389c938c531a70014023c.jpg",
    prendas: [
    { id: 2, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    { id: 3, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 2,
    name: "Street Vision",
    description: "Un look casual con un toque de vanguardia",
    img: "https://i.pinimg.com/564x/80/7e/07/807e0761401d510b1a9c3da96d2bc2a3.jpg",
    prendas: [
      { id: 201, name: "Alpha Sneakers", price: 120.00, oldPrice: 220, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 1,
    name: "Urban Matrix",
    description: "Un estilo urbano con toques futuristas",
    img: "https://i.pinimg.com/736x/d2/33/27/d2332766467389c938c531a70014023c.jpg",
    prendas: [
    { id: 2, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    { id: 3, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 2,
    name: "Street Vision",
    description: "Un look casual con un toque de vanguardia",
    img: "https://i.pinimg.com/564x/80/7e/07/807e0761401d510b1a9c3da96d2bc2a3.jpg",
    prendas: [
      { id: 201, name: "Alpha Sneakers", price: 120.00, oldPrice: 220, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 1,
    name: "Urban Matrix",
    description: "Un estilo urbano con toques futuristas",
    img: "https://i.pinimg.com/736x/d2/33/27/d2332766467389c938c531a70014023c.jpg",
    prendas: [
    { id: 2, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    { id: 3, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 2,
    name: "Street Vision",
    description: "Un look casual con un toque de vanguardia",
    img: "https://i.pinimg.com/564x/80/7e/07/807e0761401d510b1a9c3da96d2bc2a3.jpg",
    prendas: [
      { id: 201, name: "Alpha Sneakers", price: 120.00, oldPrice: 220, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 1,
    name: "Urban Matrix",
    description: "Un estilo urbano con toques futuristas",
    img: "https://i.pinimg.com/736x/d2/33/27/d2332766467389c938c531a70014023c.jpg",
    prendas: [
    { id: 2, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    { id: 3, name: "NUEVA PRENDA DE ROPA", price: 15, oldPrice: 20,  img: "https://i.pinimg.com/736x/38/55/31/385531833eccf3172f2b9ac1cf6684a9.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  },
  {
    id: 2,
    name: "Street Vision",
    description: "Un look casual con un toque de vanguardia",
    img: "https://i.pinimg.com/564x/80/7e/07/807e0761401d510b1a9c3da96d2bc2a3.jpg",
    prendas: [
      { id: 201, name: "Alpha Sneakers", price: 120.00, oldPrice: 220, img: "https://i.pinimg.com/736x/44/0f/85/440f859330e1665d56f740067878c6eb.jpg" , categoria: "Polo", rating: 4.5, compras: 120, views: 500, badge: "-25%", badgeColor: "#ef4444", sizes: [Talla.S, Talla.M, Talla.L], colors: [{ hex: "#000000", img: "https://i.pinimg.com/736x/87/97/35/87973582c53b4851c2947bb4812fb441.jpg" }, { hex: "#ffffff", img: "https://i.pinimg.com/736x/4a/6f/b6/4a6fb6a7ee2e53f7eb37d85f48410f4e.jpg" }] },
    ]
  }
];
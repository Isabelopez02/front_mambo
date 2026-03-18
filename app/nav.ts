export type NavLink = {
  name: string;
  path: string;
};

// Exportamos el arreglo
export const navLinks: NavLink[] = [
  { name: "Ropa", path: "/product" },
  { name: "Sobre Nosotros", path: "/vestidor" },
  { name: "Envíos", path: "/envios" }
];
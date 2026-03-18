export interface Variante {
  nombre: string;
  hex: string;
  imagen?: string;
}

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  categoria: string;
  precio: number;
  descripcion: string;
  variantes: Variante[];
  tallas: string[];
  imagenes: string[];
  featured: boolean;
  activo: boolean;
}

export interface CartItem {
  producto: Producto;
  talla: string;
  color: string;
  cantidad: number;
}

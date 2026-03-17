'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Producto } from '@/types';
import { formatCOP } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(producto, producto.tallas[0], producto.variantes[0]?.nombre || '');
  };

  const isTallaUnica = producto.tallas[0]?.toLowerCase().includes('única') || producto.tallas[0]?.toLowerCase().includes('unica');

  return (
    <Link href={`/tienda/${producto.slug}`} className="group block">
      <div className="relative overflow-hidden bg-white">

        {/* Imagen */}
        <div className="relative aspect-[3/4] overflow-hidden bg-sand">
          <Image
            src={producto.imagenes[0]}
            alt={producto.nombre}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-oscuro/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Badge categoría */}
          <span className="absolute top-3 left-3 bg-white text-oscuro text-xs font-bold px-2.5 py-1 tracking-wide uppercase">
            {producto.categoria}
          </span>

          {isTallaUnica && (
            <span className="absolute top-3 right-3 bg-oscuro/80 text-white text-xs font-medium px-2.5 py-1 backdrop-blur-sm">
              Talla única
            </span>
          )}

          {/* Botón rápido de agregar al carrito */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-white text-oscuro text-sm font-bold py-4 hover:bg-rosado hover:text-white transition-colors duration-200"
            >
              <ShoppingBag size={15} /> Agregar al carrito
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-1">
          <h3 className="font-semibold text-oscuro text-base leading-snug mb-2 line-clamp-2 group-hover:text-rosado transition-colors duration-200">
            {producto.nombre}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-rosado font-bold text-lg">{formatCOP(producto.precio)}</p>
            {/* Swatches de color */}
            <div className="flex gap-1.5 items-center">
              {producto.variantes.slice(0, 4).map((v) => (
                <span
                  key={v.nombre}
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-sm ring-1 ring-gray-200 flex-shrink-0"
                  style={{ backgroundColor: v.hex }}
                  title={v.nombre}
                />
              ))}
              {producto.variantes.length > 4 && (
                <span className="text-[10px] text-gray-400">
                  +{producto.variantes.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

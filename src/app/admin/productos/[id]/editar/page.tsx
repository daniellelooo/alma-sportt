import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import allProducts from '@/data/products.json';
import { Producto } from '@/types';
import ProductForm from '../../ProductForm';

export default function EditarProductoPage({ params }: { params: { id: string } }) {
  const producto = (allProducts as Producto[]).find((p) => p.id === params.id);
  if (!producto) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Editar: {producto.nombre}</h1>
      <ProductForm inicial={producto} productoId={producto.id} />
    </div>
  );
}

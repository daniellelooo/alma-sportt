import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductForm from '../ProductForm';

export default function NuevoProductoPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-oscuro mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="text-2xl font-bold text-oscuro mb-2">Agregar nuevo producto</h1>
      <p className="text-gray-500 text-sm mb-8">Completa la información del producto y guarda los cambios.</p>
      <ProductForm />
    </div>
  );
}

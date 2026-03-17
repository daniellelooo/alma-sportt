import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductForm from '../ProductForm';

export default function NuevoProductoPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Nuevo producto</h1>
      <ProductForm />
    </div>
  );
}

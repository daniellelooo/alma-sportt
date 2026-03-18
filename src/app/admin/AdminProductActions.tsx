'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminProductActions({ productoId }: { productoId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Seguro que quieres eliminar este producto? Esta acción no se puede deshacer.')) return;
    await fetch(`/api/admin/products/${productoId}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/productos/${productoId}/editar`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-mocha bg-mocha/10 hover:bg-mocha/20 rounded-lg transition-colors"
        title="Editar producto"
      >
        <Pencil size={13} /> Editar
      </Link>
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        title="Eliminar producto"
      >
        <Trash2 size={13} /> Eliminar
      </button>
    </div>
  );
}

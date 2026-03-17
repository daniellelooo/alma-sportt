'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminProductActions({ productoId }: { productoId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
    await fetch(`/api/admin/products/${productoId}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/productos/${productoId}/editar`}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
        title="Editar"
      >
        <Pencil size={15} />
      </Link>
      <button
        onClick={handleDelete}
        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
        title="Eliminar"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

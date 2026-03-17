import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import allProducts from '@/data/products.json';
import { Producto } from '@/types';
import { formatCOP } from '@/lib/utils';
import AdminProductActions from './AdminProductActions';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const products = allProducts as Producto[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} productos en total</p>
        </div>
        <Button asChild className="bg-mocha hover:bg-mocha/90 text-white gap-2">
          <Link href="/admin/productos/nuevo">
            <Plus size={16} /> Nuevo producto
          </Link>
        </Button>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3 hidden sm:table-cell">Categoría</th>
              <th className="px-4 py-3 hidden md:table-cell">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                      <Image
                        src={p.imagenes[0]}
                        alt={p.nombre}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{p.nombre}</p>
                      <p className="text-xs text-gray-400">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-sm text-gray-300">{p.categoria}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-sm text-gray-300">{formatCOP(p.precio)}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={p.activo ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}
                  >
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <AdminProductActions productoId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

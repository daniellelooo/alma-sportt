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
          <h1 className="text-2xl font-bold text-oscuro">Mis productos</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} productos registrados</p>
        </div>
        <Button asChild className="bg-rosado hover:bg-rosado/90 text-white gap-2">
          <Link href="/admin/productos/nuevo">
            <Plus size={16} /> Agregar producto
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-sand overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sand text-left text-xs text-gray-500 uppercase tracking-wider bg-crema">
              <th className="px-5 py-3">Producto</th>
              <th className="px-5 py-3 hidden sm:table-cell">Categoría</th>
              <th className="px-5 py-3 hidden md:table-cell">Precio</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-crema/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-sand">
                      <Image
                        src={p.imagenes[0]}
                        alt={p.nombre}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-oscuro">{p.nombre}</p>
                      <p className="text-xs text-gray-400">{p.categoria}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="text-sm text-gray-600">{p.categoria}</span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-sm font-medium text-mocha">{formatCOP(p.precio)}</span>
                </td>
                <td className="px-5 py-4">
                  <Badge
                    className={p.activo
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-600 border-red-200'}
                  >
                    {p.activo ? 'Visible' : 'Oculto'}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <AdminProductActions productoId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">No hay productos aún</p>
            <p className="text-sm">Haz clic en &quot;Agregar producto&quot; para empezar</p>
          </div>
        )}
      </div>
    </div>
  );
}

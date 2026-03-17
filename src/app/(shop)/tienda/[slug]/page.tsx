import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import allProducts from '@/data/products.json';
import { Producto } from '@/types';
import ProductDetail from './ProductDetail';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

const products = allProducts as Producto[];

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const producto = products.find((p) => p.slug === params.slug);
  if (!producto) return {};
  return {
    title: producto.nombre,
    description: producto.descripcion,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const producto = products.find((p) => p.slug === params.slug);
  if (!producto) notFound();

  const relacionados = products
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id && p.activo)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="mb-6">
        <Breadcrumb items={[
          { label: 'Tienda',           href: '/tienda' },
          { label: producto.categoria, href: `/tienda?categoria=${encodeURIComponent(producto.categoria)}` },
          { label: producto.nombre },
        ]} />
      </div>
      <ProductDetail producto={producto} />

      {relacionados.length > 0 && (
        <section className="mt-20 pt-12 border-t border-sand">
          <p className="text-rosado text-xs font-bold tracking-widest uppercase mb-2">Descubre más</p>
          <h2 className="text-2xl font-bold text-oscuro mb-8">También te puede gustar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relacionados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

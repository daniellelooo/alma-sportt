'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import allProducts from '@/data/products.json';
import { Producto } from '@/types';
import { cn } from '@/lib/utils';

const products = allProducts as Producto[];
const categorias = Array.from(new Set(products.map((p) => p.categoria)));
const tallas = Array.from(new Set(products.flatMap((p) => p.tallas)));

const PRECIO_RANGES = [
  { label: 'Hasta $60.000',      min: 0,      max: 60000 },
  { label: '$60.000 – $100.000', min: 60000,  max: 100000 },
  { label: '$100.000 – $130.000',min: 100000, max: 130000 },
  { label: 'Más de $130.000',    min: 130000, max: Infinity },
];

// ── Sidebar de filtros ────────────────────────────────────────────────────────
function FilterSidebar({
  catFilter, tallaFilter, setTallaFilter,
  precioLabel, setPrecioLabel,
  hasFilters, onClear, handleCategoria,
}: {
  catFilter: string;
  tallaFilter: string; setTallaFilter: (v: string) => void;
  precioLabel: string; setPrecioLabel: (v: string) => void;
  hasFilters: boolean; onClear: () => void;
  handleCategoria: (v: string) => void;
}) {
  return (
    <div className="space-y-6 w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-oscuro uppercase tracking-widest">Filtros</h2>
        {hasFilters && (
          <button onClick={onClear} className="text-xs text-rosado hover:underline font-medium flex items-center gap-1">
            <X size={11} /> Limpiar
          </button>
        )}
      </div>

      {/* Categoría */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Categoría</p>
        <div className="space-y-0.5">
          {['', ...categorias].map((cat) => {
            const active = cat === '' ? !catFilter : catFilter === cat;
            return (
              <button
                key={cat || 'todos'}
                onClick={() => handleCategoria(cat)}
                className={cn(
                  'flex items-center justify-between w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150',
                  active ? 'bg-oscuro text-white font-semibold' : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                <span>{cat || 'Todos'}</span>
                {active && <Check size={13} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Talla */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Talla</p>
        <div className="flex flex-wrap gap-1.5">
          {tallas.map((t) => (
            <button
              key={t}
              onClick={() => setTallaFilter(tallaFilter === t ? '' : t)}
              className={cn(
                'px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150',
                tallaFilter === t
                  ? 'bg-rosado text-white border-rosado'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-rosado hover:text-rosado',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Precio */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Precio</p>
        <div className="space-y-1">
          {PRECIO_RANGES.map((r) => {
            const active = precioLabel === r.label;
            return (
              <button
                key={r.label}
                onClick={() => setPrecioLabel(active ? '' : r.label)}
                className={cn(
                  'flex items-center justify-between w-full text-left text-sm px-3 py-2 rounded-lg border transition-all duration-150',
                  active
                    ? 'bg-rosado/10 border-rosado/40 text-rosado font-semibold'
                    : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50',
                )}
              >
                <span>{r.label}</span>
                {active && <Check size={13} className="text-rosado flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function TiendaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [catFilter, setCatFilter] = useState(searchParams.get('categoria') || '');
  const [tallaFilter, setTallaFilter] = useState('');
  const [precioLabel, setPrecioLabel] = useState('');

  const updateUrl = (cat: string) => {
    const params = new URLSearchParams();
    if (cat) params.set('categoria', cat);
    router.replace(`/tienda${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
  };

  const handleCategoria = (v: string) => {
    const next = catFilter === v ? '' : v;
    setCatFilter(next);
    updateUrl(next);
  };

  const handleClear = () => {
    setCatFilter('');
    setTallaFilter('');
    setPrecioLabel('');
    router.replace('/tienda', { scroll: false });
  };

  const activeRange = PRECIO_RANGES.find((r) => r.label === precioLabel);

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.activo);
    if (catFilter) result = result.filter((p) => p.categoria === catFilter);
    if (tallaFilter) result = result.filter((p) => p.tallas.includes(tallaFilter));
    if (activeRange) result = result.filter((p) => p.precio >= activeRange.min && p.precio < activeRange.max);
    return result;
  }, [catFilter, tallaFilter, activeRange]);

  const activeFiltersCount = (catFilter ? 1 : 0) + (tallaFilter ? 1 : 0) + (precioLabel ? 1 : 0);
  const hasFilters = activeFiltersCount > 0;

  const sidebarProps = {
    catFilter, tallaFilter, setTallaFilter,
    precioLabel, setPrecioLabel,
    hasFilters, onClear: handleClear, handleCategoria,
  };

  return (
    <div className="bg-[#fafafa] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
            {catFilter ? ` en ${catFilter}` : ''}
          </p>

          {/* Mobile: Sheet trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-oscuro transition-colors">
                <SlidersHorizontal size={13} />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 bg-rosado text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto bg-white">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar {...sidebarProps} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Layout: productos + sidebar */}
        <div className="flex gap-8">

          {/* Sidebar desktop */}
          <div className="hidden lg:block flex-shrink-0 w-56">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
              <FilterSidebar {...sidebarProps} />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Tags activos */}
            {hasFilters && (
              <div className="flex items-center gap-2 flex-wrap mb-5">
                {catFilter && (
                  <span className="inline-flex items-center gap-1.5 bg-oscuro text-white text-xs font-medium px-3 py-1 rounded-full">
                    {catFilter}
                    <button onClick={() => { setCatFilter(''); updateUrl(''); }}><X size={10} /></button>
                  </span>
                )}
                {tallaFilter && (
                  <span className="inline-flex items-center gap-1.5 bg-rosado text-white text-xs font-medium px-3 py-1 rounded-full">
                    {tallaFilter}
                    <button onClick={() => setTallaFilter('')}><X size={10} /></button>
                  </span>
                )}
                {precioLabel && (
                  <span className="inline-flex items-center gap-1.5 bg-rosado/10 text-rosado text-xs font-medium px-3 py-1 rounded-full border border-rosado/30">
                    {precioLabel}
                    <button onClick={() => setPrecioLabel('')}><X size={10} /></button>
                  </span>
                )}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg mb-2">No hay productos con estos filtros</p>
                <p className="text-gray-300 text-sm mb-6">Intenta con otra combinación</p>
                <Button variant="outline" onClick={handleClear}>Ver todos los productos</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} producto={p} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function TiendaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Cargando...</div>}>
      <TiendaContent />
    </Suspense>
  );
}

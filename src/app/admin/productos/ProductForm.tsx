'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Producto } from '@/types';

interface ProductFormProps {
  inicial?: Partial<Producto>;
  productoId?: string;
}

const CATEGORIAS = ['Bodys', 'Enterizos', 'Licras', 'Tops', 'Shorts'];
const TALLAS = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductForm({ inicial, productoId }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!productoId;

  const [form, setForm] = useState({
    nombre: inicial?.nombre || '',
    slug: inicial?.slug || '',
    categoria: inicial?.categoria || 'Bodys',
    precio: String(inicial?.precio || ''),
    descripcion: inicial?.descripcion || '',
    tallas: inicial?.tallas || [],
    imagenes: (inicial?.imagenes || ['']).join('\n'),
    variantes: JSON.stringify(inicial?.variantes || [{ nombre: '', hex: '#000000' }], null, 2),
    featured: inicial?.featured ?? false,
    activo: inicial?.activo ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    let variantes;
    try {
      variantes = JSON.parse(form.variantes);
    } catch {
      setError('Las variantes no son JSON válido');
      setSaving(false);
      return;
    }

    const body: Omit<Producto, 'id'> = {
      nombre: form.nombre,
      slug: form.slug || form.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      categoria: form.categoria,
      precio: Number(form.precio),
      descripcion: form.descripcion,
      tallas: form.tallas,
      imagenes: form.imagenes.split('\n').map((s) => s.trim()).filter(Boolean),
      variantes,
      featured: form.featured,
      activo: form.activo,
    };

    const url = isEdit ? `/api/admin/products/${productoId}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Error al guardar el producto');
    }
    setSaving(false);
  };

  const toggleTalla = (t: string) => {
    setForm((prev) => ({
      ...prev,
      tallas: prev.tallas.includes(t) ? prev.tallas.filter((x) => x !== t) : [...prev.tallas, t],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Nombre</Label>
          <Input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            className="mt-1 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Slug (URL)</Label>
          <Input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="se genera automáticamente"
            className="mt-1 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Categoría</Label>
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
          >
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <Label className="text-gray-300">Precio (COP)</Label>
          <Input
            type="number"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            required
            min={0}
            className="mt-1 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div>
        <Label className="text-gray-300">Descripción</Label>
        <textarea
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          rows={3}
          required
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white resize-none"
        />
      </div>

      <div>
        <Label className="text-gray-300">Tallas disponibles</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {TALLAS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => toggleTalla(t)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                form.tallas.includes(t)
                  ? 'bg-mocha text-white border-mocha'
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-gray-300">
          Imágenes (URLs, una por línea)
        </Label>
        <textarea
          value={form.imagenes}
          onChange={(e) => setForm({ ...form, imagenes: e.target.value })}
          rows={3}
          required
          placeholder="https://images.unsplash.com/..."
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white resize-none font-mono"
        />
      </div>

      <div>
        <Label className="text-gray-300">
          Variantes (JSON: {'[{"nombre":"Negro","hex":"#000"}]'})
        </Label>
        <textarea
          value={form.variantes}
          onChange={(e) => setForm({ ...form, variantes: e.target.value })}
          rows={4}
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white resize-none font-mono"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="w-4 h-4 accent-mocha"
          />
          Destacado
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.activo}
            onChange={(e) => setForm({ ...form, activo: e.target.checked })}
            className="w-4 h-4 accent-mocha"
          />
          Activo (visible en tienda)
        </label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={saving}
          className="bg-mocha hover:bg-mocha/90 text-white"
        >
          {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin')}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

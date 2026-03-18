'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Upload, ImageIcon, Link } from 'lucide-react';
import { Producto } from '@/types';

interface ProductFormProps {
  inicial?: Partial<Producto>;
  productoId?: string;
}

const CATEGORIAS = ['Bodys', 'Enterizos', 'Licras', 'Tops', 'Shorts'];
const TALLAS = ['Unitalla', 'XS', 'S', 'M', 'L', 'XL'];

interface ColorVariante {
  nombre: string;
  hex: string;
  imagen: string;
}

// ── Subcomponente: foto de un color ─────────────────────────────
function ColorImagePicker({
  imagen,
  onChange,
}: {
  imagen: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) onChange(data.url);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleLink = () => {
    const url = link.trim();
    if (!url) return;
    onChange(url);
    setLink('');
    setShowLink(false);
  };

  if (imagen) {
    return (
      <div className="relative w-14 h-16 rounded-lg overflow-hidden border border-sand flex-shrink-0 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagen} alt="foto color" className="w-full h-full object-cover" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          title="Cambiar foto"
        >
          <X size={14} className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 space-y-1">
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {showLink ? (
        <div className="flex gap-1">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Pega el link..."
            className="w-32 text-xs border border-sand rounded-lg px-2 py-1.5 focus:outline-none focus:border-mocha"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLink(); } }}
          />
          <button type="button" onClick={handleLink} className="px-2 py-1.5 text-xs bg-mocha text-white rounded-lg">
            OK
          </button>
          <button type="button" onClick={() => setShowLink(false)} className="p-1.5 text-gray-400 hover:text-red-500">
            <X size={12} />
          </button>
        </div>
      ) : (
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 border border-dashed border-sand rounded-lg hover:border-mocha hover:text-mocha transition-colors"
            title="Subir foto"
          >
            <Upload size={11} />
            {uploading ? 'Subiendo...' : 'Subir'}
          </button>
          <button
            type="button"
            onClick={() => setShowLink(true)}
            className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 border border-dashed border-sand rounded-lg hover:border-mocha hover:text-mocha transition-colors"
            title="Pegar link"
          >
            <Link size={11} />
            Link
          </button>
        </div>
      )}
    </div>
  );
}

// ── Subcomponente: pegar link general ───────────────────────────
function PegarLink({ onAgregar }: { onAgregar: (url: string) => void }) {
  const [link, setLink] = useState('');
  const handleAgregar = () => {
    const url = link.trim();
    if (!url) return;
    onAgregar(url);
    setLink('');
  };
  return (
    <div className="flex gap-2">
      <Input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="O pega aquí el link de una imagen..."
        className="flex-1 bg-white border-sand text-oscuro focus:border-mocha text-sm"
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAgregar(); } }}
      />
      <button
        type="button"
        onClick={handleAgregar}
        disabled={!link.trim()}
        className="px-4 py-2 text-sm font-medium bg-mocha text-white rounded-lg hover:bg-mocha/90 disabled:opacity-40 transition-colors"
      >
        Agregar
      </button>
    </div>
  );
}

// ── Formulario principal ─────────────────────────────────────────
export default function ProductForm({ inicial, productoId }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!productoId;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nombre: inicial?.nombre || '',
    categoria: inicial?.categoria || 'Bodys',
    precio: String(inicial?.precio || ''),
    descripcion: inicial?.descripcion || '',
    tallas: inicial?.tallas || [],
    featured: inicial?.featured ?? false,
    activo: inicial?.activo ?? true,
  });

  const [imagenes, setImagenes] = useState<string[]>(
    inicial?.imagenes && inicial.imagenes.length > 0 ? inicial.imagenes : []
  );

  const [colores, setColores] = useState<ColorVariante[]>(
    inicial?.variantes && inicial.variantes.length > 0
      ? inicial.variantes.map((v) => ({ nombre: v.nombre, hex: v.hex, imagen: v.imagen || '' }))
      : []
  );

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [error, setError] = useState('');

  // ── Fotos generales ──────────────────────────────────────────

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setUploadError('');
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) setImagenes((prev) => [...prev, data.url]);
      else setUploadError(data.error || 'Error al subir la imagen');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const quitarImagen = (idx: number) => setImagenes((prev) => prev.filter((_, i) => i !== idx));

  // ── Colores ──────────────────────────────────────────────────

  const agregarColor = () => setColores([...colores, { nombre: '', hex: '#D44D72', imagen: '' }]);
  const quitarColor = (idx: number) => setColores(colores.filter((_, i) => i !== idx));

  const actualizarColor = (idx: number, campo: keyof ColorVariante, valor: string) =>
    setColores(colores.map((c, i) => i === idx ? { ...c, [campo]: valor } : c));

  const toggleTalla = (t: string) =>
    setForm((prev) => ({
      ...prev,
      tallas: prev.tallas.includes(t) ? prev.tallas.filter((x) => x !== t) : [...prev.tallas, t],
    }));

  // ── Guardar ──────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (imagenes.length === 0 && colores.every(c => !c.imagen)) {
      setError('Debes agregar al menos una foto del producto');
      setSaving(false);
      return;
    }

    for (const c of colores) {
      if (!c.nombre.trim()) {
        setError('Cada color debe tener un nombre (ej: Negro, Rosa, Azul)');
        setSaving(false);
        return;
      }
    }

    const slug = form.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // La foto principal es la primera foto de color (si existe) o la primera general
    const primeraFotoColor = colores[0]?.imagen || '';
    const imagenesFinales = imagenes.length > 0
      ? imagenes
      : colores.map(c => c.imagen).filter(Boolean);

    const body: Omit<Producto, 'id'> = {
      nombre: form.nombre,
      slug,
      categoria: form.categoria,
      precio: Number(form.precio),
      descripcion: form.descripcion,
      tallas: form.tallas,
      imagenes: imagenesFinales.length > 0 ? imagenesFinales : [primeraFotoColor],
      variantes: colores.map((c) => ({
        nombre: c.nombre.trim(),
        hex: c.hex,
        ...(c.imagen ? { imagen: c.imagen } : {}),
      })),
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
      setError('Hubo un error al guardar el producto. Intenta de nuevo.');
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-2xl">

      {/* Información básica */}
      <div className="bg-white rounded-2xl border border-sand p-6 space-y-5">
        <h2 className="font-semibold text-oscuro text-sm uppercase tracking-wide">Información básica</h2>

        <div>
          <Label className="text-oscuro font-medium">Nombre del producto</Label>
          <Input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            placeholder="Ej: Body Deportivo Canela"
            className="mt-1.5 bg-white border-sand text-oscuro focus:border-mocha"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-oscuro font-medium">Categoría</Label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-oscuro focus:outline-none focus:border-mocha"
            >
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-oscuro font-medium">Precio (pesos colombianos)</Label>
            <Input
              type="number"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              required
              min={0}
              placeholder="Ej: 85000"
              className="mt-1.5 bg-white border-sand text-oscuro focus:border-mocha"
            />
          </div>
        </div>

        <div>
          <Label className="text-oscuro font-medium">Descripción</Label>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            rows={3}
            required
            placeholder="Describe el producto, materiales, características..."
            className="mt-1.5 w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-oscuro resize-none focus:outline-none focus:border-mocha"
          />
        </div>
      </div>

      {/* Tallas */}
      <div className="bg-white rounded-2xl border border-sand p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-oscuro text-sm uppercase tracking-wide">Tallas disponibles</h2>
          <p className="text-xs text-gray-400 mt-0.5">Selecciona todas las tallas que tiene este producto</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {TALLAS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => toggleTalla(t)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                form.tallas.includes(t)
                  ? 'bg-mocha text-white border-mocha'
                  : 'border-sand text-gray-500 hover:border-mocha hover:text-mocha bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Colores */}
      <div className="bg-white rounded-2xl border border-sand p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-oscuro text-sm uppercase tracking-wide">Colores disponibles</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Cada color puede tener su propia foto — así el cliente la verá al seleccionarlo
          </p>
        </div>

        {colores.length === 0 && (
          <p className="text-sm text-gray-400 italic">Sin colores agregados</p>
        )}

        <div className="space-y-3">
          {colores.map((color, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-crema/40 rounded-xl border border-sand">
              {/* Selector de color */}
              <input
                type="color"
                value={color.hex}
                onChange={(e) => actualizarColor(idx, 'hex', e.target.value)}
                className="w-10 h-10 rounded-lg border border-sand cursor-pointer p-0.5 bg-white flex-shrink-0 mt-0.5"
                title="Elige el color"
              />

              {/* Nombre */}
              <div className="flex-1 min-w-0">
                <Input
                  value={color.nombre}
                  onChange={(e) => actualizarColor(idx, 'nombre', e.target.value)}
                  placeholder="Nombre del color (ej: Rosa, Negro)"
                  className="bg-white border-sand text-oscuro focus:border-mocha text-sm"
                />
                {/* Foto del color */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 flex-shrink-0">Foto:</span>
                  <ColorImagePicker
                    imagen={color.imagen}
                    onChange={(url) => actualizarColor(idx, 'imagen', url)}
                  />
                </div>
              </div>

              {/* Quitar */}
              <button
                type="button"
                onClick={() => quitarColor(idx)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 mt-0.5"
                title="Quitar este color"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={agregarColor}
          className="inline-flex items-center gap-2 text-sm font-medium text-mocha hover:text-rosado transition-colors"
        >
          <Plus size={16} /> Agregar color
        </button>
      </div>

      {/* Fotos generales */}
      <div className="bg-white rounded-2xl border border-sand p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-oscuro text-sm uppercase tracking-wide">Fotos generales del producto</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Fotos adicionales (lifestyle, detalles). Si solo tienes fotos por color, puedes dejar esto vacío.
          </p>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-sand rounded-xl p-6 text-center cursor-pointer hover:border-mocha hover:bg-crema/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload size={28} className="mx-auto text-gray-300 mb-2" />
          {uploading ? (
            <p className="text-sm text-mocha font-medium">Subiendo imagen...</p>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600">Toca aquí para subir una foto</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG — máximo 10 MB</p>
            </>
          )}
        </div>

        <PegarLink onAgregar={(url) => setImagenes((prev) => [...prev, url])} />

        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}

        {imagenes.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {imagenes.map((url, idx) => (
              <div key={idx} className="relative group aspect-[3/4] rounded-xl overflow-hidden bg-sand border border-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Foto ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => quitarImagen(idx)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    Principal
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {imagenes.length === 0 && !uploading && (
          <div className="flex items-center gap-2 text-gray-300">
            <ImageIcon size={16} />
            <span className="text-sm">Sin fotos generales</span>
          </div>
        )}
      </div>

      {/* Visibilidad */}
      <div className="bg-white rounded-2xl border border-sand p-6 space-y-4">
        <h2 className="font-semibold text-oscuro text-sm uppercase tracking-wide">Opciones de visibilidad</h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-mocha"
            />
            <div>
              <span className="text-sm font-medium text-oscuro">Producto destacado</span>
              <p className="text-xs text-gray-400">Aparece en la sección de destacados de la página principal</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              className="w-4 h-4 accent-mocha"
            />
            <div>
              <span className="text-sm font-medium text-oscuro">Visible en la tienda</span>
              <p className="text-xs text-gray-400">Si está desactivado, el producto no aparece para los clientes</p>
            </div>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-1 pb-6">
        <Button
          type="submit"
          disabled={saving || uploading}
          className="bg-rosado hover:bg-rosado/90 text-white px-8"
        >
          {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin')}
          className="border-sand text-gray-600 hover:bg-crema"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

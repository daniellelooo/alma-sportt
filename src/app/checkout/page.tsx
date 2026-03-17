'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/utils';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

const DEPARTAMENTOS = [
  'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
  'Cundinamarca', 'Huila', 'La Guajira', 'Magdalena', 'Meta',
  'Nariño', 'Norte de Santander', 'Quindío', 'Risaralda',
  'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567';

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <CartDrawer />
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <ShoppingBag size={48} className="text-gray-300" strokeWidth={1} />
          <p className="text-gray-500">Tu carrito está vacío</p>
          <Button asChild className="bg-mocha hover:bg-mocha/90 text-white">
            <Link href="/tienda">Ir a la tienda</Link>
          </Button>
        </div>
      </>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStripe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: form }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Error al procesar el pago');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const lines = items.map(
      (i) => `• ${i.producto.nombre} — Talla ${i.talla}, Color ${i.color} x${i.cantidad} = ${formatCOP(i.producto.precio * i.cantidad)}`
    );
    const msg = encodeURIComponent(
      `Hola! Quiero hacer un pedido:\n\n${lines.join('\n')}\n\nTotal: ${formatCOP(subtotal)}\n\nNombre: ${form.nombre || '(pendiente)'}\nCiudad: ${form.ciudad || '(pendiente)'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-oscuro mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <form onSubmit={handleStripe} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="font-bold text-oscuro text-lg mb-2">Datos de entrega</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                  placeholder="Calle 10 # 43-50, Apto 301"
                  className="mt-1"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="departamento">Departamento</Label>
                  <select
                    id="departamento"
                    name="departamento"
                    value={form.departamento}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Seleccionar...</option>
                    {DEPARTAMENTOS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 rounded-lg p-3">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-mocha hover:bg-mocha/90 text-white mt-4"
                size="lg"
              >
                {loading ? 'Redirigiendo...' : 'Pagar con Stripe'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400">o</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleWhatsApp}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 gap-2"
                size="lg"
              >
                <MessageCircle size={18} /> Pedir por WhatsApp
              </Button>
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="font-bold text-oscuro text-lg">Resumen del pedido</h2>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.producto.imagenes[0]}
                        alt={item.producto.nombre}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-oscuro">{item.producto.nombre}</p>
                      <p className="text-xs text-gray-500">{item.color} · Talla {item.talla} · x{item.cantidad}</p>
                      <p className="text-sm font-semibold text-mocha mt-1">
                        {formatCOP(item.producto.precio * item.cantidad)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Envío</span>
                  <span className="text-green-600 font-medium">
                    {subtotal >= 150000 ? 'Gratis' : formatCOP(8900)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-oscuro text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatCOP(subtotal >= 150000 ? subtotal : subtotal + 8900)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

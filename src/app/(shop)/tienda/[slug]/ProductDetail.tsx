'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ColorSwatch from '@/components/ColorSwatch';
import SizePicker from '@/components/SizePicker';
import { Producto } from '@/types';
import { formatCOP } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(producto.variantes[0]?.nombre || '');
  const isTallaUnica = producto.tallas.length === 1 && (
    producto.tallas[0].toLowerCase().includes('única') || producto.tallas[0].toLowerCase().includes('unica')
  );
  const [selectedTalla, setSelectedTalla] = useState(isTallaUnica ? producto.tallas[0] : '');
  const [mainImage, setMainImage] = useState(0);
  const [error, setError] = useState('');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567';

  const handleAddToCart = () => {
    if (!selectedTalla) {
      setError('Por favor selecciona una talla');
      return;
    }
    setError('');
    addItem(producto, selectedTalla, selectedColor);
  };

  const handleWhatsApp = () => {
    const talla = selectedTalla || '(sin talla seleccionada)';
    const msg = encodeURIComponent(
      `Hola! Me interesa el ${producto.nombre}, talla ${talla}, color ${selectedColor}. ¿Está disponible?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={producto.imagenes[mainImage]}
              alt={producto.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {producto.imagenes.length > 1 && (
            <div className="flex gap-3">
              {producto.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                    mainImage === idx ? 'border-mocha' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${producto.nombre} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-mocha font-medium uppercase tracking-wider mb-1">
              {producto.categoria}
            </p>
            <h1 className="text-3xl font-bold text-oscuro">{producto.nombre}</h1>
            <p className="text-3xl font-bold text-rosado mt-2">{formatCOP(producto.precio)}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{producto.descripcion}</p>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-oscuro mb-2">
              Color: <span className="font-normal text-gray-600">{selectedColor}</span>
            </p>
            <ColorSwatch
              variantes={producto.variantes}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
          </div>

          {/* Talla */}
          <div>
            <p className="text-sm font-semibold text-oscuro mb-2">Talla</p>
            {isTallaUnica ? (
              <div className="inline-flex items-center gap-2 bg-sand text-oscuro text-sm font-medium px-4 py-2.5 border border-sand/80">
                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                Talla única — buena elongación desde XS hasta L
              </div>
            ) : (
              <>
                <SizePicker
                  tallas={producto.tallas}
                  selected={selectedTalla}
                  onChange={(t) => {
                    setSelectedTalla(t);
                    setError('');
                  }}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-rosado hover:bg-rosado/90 text-white gap-2 shadow-md shadow-rosado/20 hover:shadow-lg hover:shadow-rosado/30 transition-all"
              size="lg"
            >
              <ShoppingBag size={18} /> Agregar al carrito
            </Button>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              size="lg"
              className="flex-1 border-green-500 text-green-600 hover:bg-green-50 gap-2"
            >
              <MessageCircle size={18} /> Pedir por WhatsApp
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 space-y-1">
            <p>Envíos a todo Colombia en 3-5 días hábiles</p>
            <p>Cambios y devoluciones en 15 días</p>
          </div>
        </div>
      </div>
    </div>
  );
}

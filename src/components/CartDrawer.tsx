'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-white">
        <SheetHeader className="border-b border-gray-200 pb-4">
          <SheetTitle className="flex items-center gap-2 text-oscuro font-semibold">
            <ShoppingBag size={20} />
            Carrito ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="text-sm">Tu carrito está vacío</p>
            <Button asChild variant="outline" onClick={closeCart}>
              <Link href="/tienda">Ver productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.producto.imagenes[0]}
                      alt={item.producto.nombre}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-oscuro leading-tight truncate pr-2">
                        {item.producto.nombre}
                      </h4>
                      <button
                        onClick={() => removeItem(item.producto.id, item.talla, item.color)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.color} · Talla {item.talla}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.producto.id, item.talla, item.color, item.cantidad - 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-6 text-center">{item.cantidad}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.producto.id, item.talla, item.color, item.cantidad + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-mocha">
                        {formatCOP(item.producto.precio * item.cantidad)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-oscuro">Subtotal</span>
                <span className="font-bold text-oscuro text-lg">{formatCOP(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-500">Envío calculado en el checkout</p>
              <Button
                asChild
                className="w-full bg-mocha hover:bg-mocha/90 text-white"
                onClick={closeCart}
              >
                <Link href="/checkout">Proceder al pago</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link href="/tienda">Seguir comprando</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

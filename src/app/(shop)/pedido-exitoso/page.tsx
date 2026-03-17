'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

function PedidoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-oscuro mb-3">¡Pedido confirmado!</h1>
        <p className="text-gray-600 mb-2">
          Gracias por tu compra. Recibirás un email de confirmación pronto.
        </p>
        {sessionId && (
          <p className="text-xs text-gray-400 mb-8">Referencia: {sessionId.slice(-8)}</p>
        )}
        <div className="space-y-3">
          <Button asChild className="w-full bg-mocha hover:bg-mocha/90 text-white">
            <Link href="/tienda">Seguir comprando</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PedidoExitosoPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Cargando...</div>}>
      <PedidoContent />
    </Suspense>
  );
}

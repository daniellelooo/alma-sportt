import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { CartItem } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { items, customer } = await req.json() as {
      items: CartItem[];
      customer: {
        nombre: string;
        email: string;
        telefono: string;
        direccion: string;
        ciudad: string;
        departamento: string;
      };
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No hay items en el carrito' }, { status: 400 });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'cop',
        product_data: {
          name: `${item.producto.nombre} — ${item.color}, Talla ${item.talla}`,
          images: [item.producto.imagenes[0]],
          description: item.producto.descripcion.slice(0, 100),
        },
        unit_amount: item.producto.precio * 100, // Stripe espera centavos: 89900 COP → 8990000
      },
      quantity: item.cantidad,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customer.email,
      metadata: {
        nombre: customer.nombre,
        email: customer.email,
        telefono: customer.telefono,
        direccion: customer.direccion,
        ciudad: customer.ciudad,
        departamento: customer.departamento,
      },
      success_url: `${baseUrl}/pedido-exitoso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tienda`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error al crear la sesión de pago';
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

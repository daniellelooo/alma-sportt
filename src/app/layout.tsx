import type { Metadata } from 'next';
import { Outfit, Bodoni_Moda } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Alma Sportt — Ropa Deportiva Femenina',
    template: '%s | Alma Sportt',
  },
  description:
    'Tienda de ropa deportiva femenina en Medellín. Bodys, licras, tops y shorts de alto rendimiento.',
  keywords: ['ropa deportiva', 'femenina', 'Medellín', 'licras', 'yoga', 'gym'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${bodoni.variable}`}>
      <body className="bg-crema font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

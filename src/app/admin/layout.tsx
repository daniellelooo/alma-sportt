import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-crema">
      <nav className="bg-white border-b border-sand px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/logosolosimbolo.png"
            alt="Alma Sportt"
            width={32}
            height={32}
          />
          <div>
            <Link href="/admin" className="font-bold text-lg text-oscuro leading-none">
              Alma Sportt
            </Link>
            <p className="text-xs text-gray-500 leading-none mt-0.5">Panel de administración</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/admin" className="text-mocha font-medium hover:text-rosado transition-colors">
            Productos
          </Link>
          <Link href="/" target="_blank" className="text-gray-500 hover:text-oscuro transition-colors">
            Ver tienda ↗
          </Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

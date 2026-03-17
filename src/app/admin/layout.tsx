import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logosolosimbolo.png"
            alt="Alma Sportt"
            width={32}
            height={32}
            className="brightness-0 invert"
          />
          <Link href="/admin" className="font-bold text-lg text-white">
            Admin — Alma Sportt
          </Link>
        </div>
        <div className="flex gap-4 text-sm text-gray-400">
          <Link href="/admin" className="hover:text-white transition-colors">Productos</Link>
          <Link href="/" target="_blank" className="hover:text-white transition-colors">Ver tienda</Link>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

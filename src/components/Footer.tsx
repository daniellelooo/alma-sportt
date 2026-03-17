import Link from 'next/link';
import { Instagram, Music2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-oscuro text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Heart size={22} className="text-rosado fill-rosado flex-shrink-0" />
              <span className="text-white font-bold text-xl tracking-tight">Alma Sportt</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Ropa deportiva femenina diseñada para mujeres que se mueven con propósito.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/almasportt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-rosado hover:text-white transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://tiktok.com/@almasportt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-rosado hover:text-white transition-all duration-200"
              >
                <Music2 size={16} />
              </a>
            </div>
          </div>

          {/* Colecciones */}
          <div>
            <h4 className="font-semibold mb-5 text-xs uppercase tracking-widest text-gray-400">
              Colecciones
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/tienda',                              label: 'Todo' },
                { href: '/tienda?categoria=Bodys',             label: 'Bodys' },
                { href: '/tienda?categoria=Sets',              label: 'Sets Short' },
                { href: '/tienda?categoria=Mallas',            label: 'Mallas' },
                { href: '/tienda?categoria=Enterizos%20Cortos', label: 'Enterizos Cortos' },
                { href: '/tienda?categoria=Enterizos%20Largos', label: 'Enterizos Largos' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-5 text-xs uppercase tracking-widest text-gray-400">
              Información
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/faq',      label: 'Preguntas frecuentes' },
                { href: '/contacto', label: 'Contacto' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Alma Sportt. Todos los derechos reservados.</p>
          <p>Hecho con ♡ en Medellín</p>
        </div>
      </div>
    </footer>
  );
}

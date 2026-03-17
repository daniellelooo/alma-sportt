import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, Leaf, Zap, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'Nosotros' };

const valores = [
  {
    icon: Heart,
    titulo: 'Pasión',
    desc: 'Cada prenda la diseñamos con amor por el deporte y el bienestar femenino.',
  },
  {
    icon: Zap,
    titulo: 'Rendimiento',
    desc: 'Usamos telas técnicas de alta calidad que se adaptan a tu cuerpo y movimiento.',
  },
  {
    icon: Leaf,
    titulo: 'Sostenibilidad',
    desc: 'Empaques eco-amigables y procesos de producción responsables con el medioambiente.',
  },
  {
    icon: Users,
    titulo: 'Comunidad',
    desc: 'Somos una comunidad de mujeres que se apoyan y se inspiran mutuamente.',
  },
];

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80"
          alt="Alma Sportt equipo"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oscuro/90 via-oscuro/30 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-rosa/70 text-xs font-bold tracking-widest uppercase mb-3">Quiénes somos</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Nuestra historia</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Historia */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-oscuro mb-4">
              Nacimos en Medellín con alma deportiva
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Alma Sportt nació en 2022 de la mano de dos amigas apasionadas por el fitness y
                cansadas de no encontrar ropa deportiva femenina que combinara rendimiento,
                comodidad y estilo al mismo tiempo.
              </p>
              <p>
                Lo que comenzó como un pequeño emprendimiento desde casa se convirtió en una marca
                que viste a miles de mujeres en todo Colombia. Cada prenda es diseñada pensando en
                ti: en tu entrenamiento, en tu cuerpo y en cómo quieres sentirte.
              </p>
              <p>
                Hoy operamos desde Medellín, la ciudad de la eterna primavera, y enviamos a cada
                rincón del país. Nuestro compromiso es simple: que te muevas con alma.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80"
              alt="Equipo Alma Sportt"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Valores */}
        <section>
          <h2 className="text-3xl font-bold text-oscuro text-center mb-10">Nuestros valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {valores.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="text-center p-6 bg-white border border-sand hover:border-rosa transition-colors duration-200">
                <div className="w-12 h-12 bg-rosa/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-rosado" />
                </div>
                <h3 className="font-bold text-oscuro mb-2 text-sm">{titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

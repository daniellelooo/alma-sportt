import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import products from '@/data/products.json';
import { Producto } from '@/types';

const categorias = [
  { nombre: 'Bodys',             slug: 'Bodys',            imagen: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80' },
  { nombre: 'Sets',              slug: 'Sets',             imagen: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { nombre: 'Mallas',            slug: 'Mallas',           imagen: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80' },
  { nombre: 'Enterizos Cortos',  slug: 'Enterizos Cortos', imagen: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
  { nombre: 'Enterizos Largos',  slug: 'Enterizos Largos', imagen: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80' },
];

const testimonios = [
  {
    nombre: 'Valentina R.',
    ciudad: 'Medellín',
    rating: 5,
    texto: 'Las mallas son increíbles, la tela es súper cómoda y aguanta todos mis entrenamientos de crossfit. La talla única me queda perfecta. 100% recomendadas.',
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    nombre: 'Camila T.',
    ciudad: 'Bogotá',
    rating: 5,
    texto: 'Compré el set short para gym y ya no puedo vivir sin él. La calidad es excepcional, el envío llegó rapidísimo y el ajuste es perfecto de XS a L.',
    imagen: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    nombre: 'Daniela M.',
    ciudad: 'Cali',
    rating: 5,
    texto: 'El enterizo deportivo es hermoso y funcional. Me lo puse para natación y para gym y en los dos funciona perfecto. La talla única me queda como guante.',
    imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
  },
];

const featuredProducts = (products as Producto[]).filter((p) => p.featured && p.activo);

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-end pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0a10 0%, #2d1020 30%, #7A4F35 65%, #D44D72 100%)' }}
      >
        {/* Ruido/textura sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        {/* Orbe decorativo */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-rosado/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-mocha/30 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-4">
          <div className="max-w-xl">
            <h1 className="animate-fade-up font-bold text-white leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl md:text-7xl">Muévete</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl text-rosa italic">con alma</span>
            </h1>
            <p className="animate-fade-up-d2 text-lg text-white/70 mb-8 max-w-sm leading-relaxed">
              Ropa deportiva femenina diseñada para mujeres que entrenan con pasión y viven con estilo.
            </p>
            <div className="animate-fade-up-d3 flex flex-wrap gap-3">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 bg-rosado hover:bg-rosado/90 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-rosado/30"
              >
                Ver colección <ArrowRight size={16} />
              </Link>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-base backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                Nuestra historia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand">
            {[
              { icon: <Truck size={16} />, title: 'Envíos a todo Colombia', sub: '3-5 días hábiles' },
              { icon: <RotateCcw size={16} />, title: 'Cambios y devoluciones', sub: 'En los primeros 15 días' },
              { icon: <Shield size={16} />, title: 'Talla única XS — L', sub: 'Buena elongación garantizada' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 px-6 py-3 justify-center">
                <span className="text-rosado flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-oscuro">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORÍAS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollRevealWrapper>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-rosado text-xs font-bold tracking-widest uppercase mb-2">Explorar</p>
              <h2 className="text-3xl md:text-4xl font-bold text-oscuro">Por categoría</h2>
            </div>
            <Link href="/tienda" className="text-sm font-medium text-gray-500 hover:text-rosado transition-colors flex items-center gap-1 group">
              Ver todo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {categorias.map((cat, i) => (
            <ScrollRevealWrapper key={cat.nombre} delay={i * 80}>
              <Link
                href={`/tienda?categoria=${cat.slug}`}
                className="group relative aspect-[2/3] overflow-hidden block"
              >
                <Image
                  src={cat.imagen}
                  alt={cat.nombre}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oscuro/75 via-oscuro/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-white font-bold text-sm leading-tight">{cat.nombre}</p>
                  <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Ver todos <ArrowRight size={10} />
                  </p>
                </div>
              </Link>
            </ScrollRevealWrapper>
          ))}
        </div>
      </section>

      {/* ─── PRODUCTOS DESTACADOS ─── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealWrapper>
            <div className="text-center mb-14">
              <p className="text-rosado text-xs font-bold tracking-widest uppercase mb-2">Lo más amado</p>
              <h2 className="text-3xl md:text-4xl font-bold text-oscuro">Favoritos de la temporada</h2>
            </div>
          </ScrollRevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((p, i) => (
              <ScrollRevealWrapper key={p.id} delay={i * 100}>
                <ProductCard producto={p} />
              </ScrollRevealWrapper>
            ))}
          </div>

          <ScrollRevealWrapper>
            <div className="text-center mt-12">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 border-2 border-oscuro text-oscuro hover:bg-oscuro hover:text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
              >
                Ver toda la colección <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* ─── BANNER MARCA ─── */}
      <section className="relative py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80"
          alt="Alma Sportt lifestyle"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-oscuro/75" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollRevealWrapper>
            <p className="text-rosa/70 text-xs font-bold tracking-widest uppercase mb-4">Nuestra promesa</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Cada prenda,<br/>
              <span className="text-rosa">cada movimiento</span>
            </h2>
            <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Diseñamos para el cuerpo real de la mujer colombiana. Tela única con excelente elongación — desde XS hasta una L.
            </p>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 bg-white text-oscuro hover:bg-rosa px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
            >
              Conoce nuestra historia <ArrowRight size={16} />
            </Link>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-sand py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { num: '5K+',  label: 'Clientas felices' },
              { num: '100%', label: 'Hecho con amor' },
              { num: '3-5',  label: 'Días de entrega' },
            ].map((s) => (
              <ScrollRevealWrapper key={s.label}>
                <div>
                  <p className="text-3xl md:text-5xl font-bold text-rosado mb-1">{s.num}</p>
                  <p className="text-xs md:text-sm text-gray-500">{s.label}</p>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIOS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollRevealWrapper>
          <div className="text-center mb-14">
            <p className="text-rosado text-xs font-bold tracking-widest uppercase mb-2">Opiniones</p>
            <h2 className="text-3xl md:text-4xl font-bold text-oscuro">Lo que dicen nuestras clientas</h2>
          </div>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <ScrollRevealWrapper key={t.nombre} delay={i * 100}>
              <div className="bg-white p-8 border border-sand hover:border-rosa hover:shadow-md transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-rosado text-rosado" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={t.imagen}
                    alt={t.nombre}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10 ring-2 ring-rosa"
                  />
                  <div>
                    <p className="font-bold text-oscuro text-sm">{t.nombre}</p>
                    <p className="text-gray-400 text-xs">{t.ciudad}</p>
                  </div>
                </div>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="bg-oscuro py-20">
        <ScrollRevealWrapper>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-rosa text-xs font-bold tracking-widest uppercase mb-4">¿Lista para entrenar?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Encuentra tu outfit<br/>perfecto
            </h2>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 bg-rosado hover:bg-rosado/90 text-white px-10 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-rosado/30"
            >
              Ver colección completa <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollRevealWrapper>
      </section>

    </div>
  );
}

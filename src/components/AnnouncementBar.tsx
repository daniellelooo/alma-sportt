'use client';

import { useState } from 'react';
import { X, Truck, Tag } from 'lucide-react';

const messages = [
  { icon: <Truck size={13} />, text: 'Envíos a todo Colombia en 3-5 días hábiles' },
  { icon: <Tag  size={13} />, text: 'Talla única con buena elongación desde XS hasta L' },
  { icon: <Truck size={13} />, text: 'Paga contra entrega disponible en ciudades principales' },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  if (!visible) return null;

  return (
    <div className="bg-oscuro text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2">
        <button
          onClick={() => setIdx((i) => (i - 1 + messages.length) % messages.length)}
          className="hidden sm:block text-white/40 hover:text-white transition-colors text-xs px-1"
          aria-label="Anterior"
        >‹</button>

        <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
          <span className="text-rosa opacity-80">{messages[idx].icon}</span>
          <span>{messages[idx].text}</span>
        </div>

        <button
          onClick={() => setIdx((i) => (i + 1) % messages.length)}
          className="hidden sm:block text-white/40 hover:text-white transition-colors text-xs px-1"
          aria-label="Siguiente"
        >›</button>

        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

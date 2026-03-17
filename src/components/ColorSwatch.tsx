'use client';

import { cn } from '@/lib/utils';
import { Variante } from '@/types';

interface ColorSwatchProps {
  variantes: Variante[];
  selected: string;
  onChange: (nombre: string) => void;
}

export default function ColorSwatch({ variantes, selected, onChange }: ColorSwatchProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {variantes.map((v) => (
        <button
          key={v.nombre}
          title={v.nombre}
          onClick={() => onChange(v.nombre)}
          className={cn(
            'w-8 h-8 rounded-full border-2 transition-all',
            selected === v.nombre
              ? 'ring-2 ring-rosado ring-offset-2 border-rosado scale-110'
              : 'border-gray-200 hover:border-gray-400 hover:scale-105'
          )}
          style={{ backgroundColor: v.hex }}
          aria-label={v.nombre}
        />
      ))}
    </div>
  );
}

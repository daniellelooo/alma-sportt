'use client';

import { cn } from '@/lib/utils';

interface SizePickerProps {
  tallas: string[];
  selected: string;
  onChange: (talla: string) => void;
  agotadas?: string[];
}

export default function SizePicker({ tallas, selected, onChange, agotadas = [] }: SizePickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tallas.map((t) => {
        const isAgotada = agotadas.includes(t);
        const isSelected = selected === t;
        return (
          <button
            key={t}
            onClick={() => !isAgotada && onChange(t)}
            disabled={isAgotada}
            className={cn(
              'px-4 py-2 rounded-md border text-sm font-medium transition-all',
              isAgotada
                ? 'line-through opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                : isSelected
                ? 'bg-rosado text-white border-rosado shadow-sm shadow-rosado/30'
                : 'border-gray-200 text-gray-700 hover:border-rosado hover:text-rosado'
            )}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

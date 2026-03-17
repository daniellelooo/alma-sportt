import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-oscuro transition-colors"
        aria-label="Inicio"
      >
        <Home size={12} />
      </Link>

      {items.map((crumb, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={11} className="text-gray-300 flex-shrink-0" />
            {isLast || !crumb.href ? (
              <span className={isLast ? 'text-oscuro font-medium' : 'text-gray-400'}>
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-oscuro transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

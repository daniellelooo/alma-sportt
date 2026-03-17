"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid
          ? "bg-white border-b border-gray-100"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">

          {/* Izquierda: links desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[17px] font-medium transition-colors relative group",
                  pathname === link.href
                    ? "text-rosado"
                    : solid
                      ? "text-gray-500 hover:text-oscuro"
                      : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-0.5 left-0 h-0.5 bg-rosado rounded-full transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full",
                )} />
              </Link>
            ))}
          </div>

          {/* Mobile: hamburger izquierda */}
          <div className="md:hidden flex items-center">
            <button
              className={cn("p-2 transition-colors", solid ? "text-oscuro" : "text-white")}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Centro: logo símbolo + letras */}
          <Link href="/" className="flex justify-center items-center gap-2 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logosolosimbolo-removebg-preview.png"
                alt=""
                fill
                className={cn(
                  "object-contain transition-all duration-300 group-hover:scale-110",
                  !solid && "brightness-0 invert",
                )}
                priority
              />
            </div>
            <div className="relative h-7 w-28 flex-shrink-0">
              <Image
                src="/logoletra-removebg-preview.png"
                alt="Alma Sportt"
                fill
                className={cn(
                  "object-contain object-left transition-all duration-300",
                  !solid && "brightness-0 invert",
                )}
              />
            </div>
          </Link>

          {/* Derecha: carrito */}
          <div className="flex items-center justify-end">
            <button
              onClick={openCart}
              className={cn(
                "relative p-2 transition-colors",
                solid ? "text-oscuro hover:text-rosado" : "text-white hover:text-white/70",
              )}
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rosado text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 py-3 space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center py-3 text-base font-medium transition-colors border-b border-gray-50 last:border-0",
                pathname === link.href ? "text-rosado" : "text-oscuro hover:text-rosado",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

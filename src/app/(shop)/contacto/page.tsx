'use client';

import { Instagram, Music2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function ContactoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567';
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-oscuro mb-2 text-center">Contáctanos</h1>
      <p className="text-gray-500 text-center mb-12">Estamos aquí para ayudarte</p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* WhatsApp + redes */}
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <MessageCircle size={40} className="text-green-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-oscuro mb-2">Escríbenos por WhatsApp</h2>
            <p className="text-sm text-gray-500 mb-4">
              Respondemos en menos de 2 horas en horario de atención (lun-sáb 8am-6pm)
            </p>
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-white gap-2 w-full"
            >
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> Abrir WhatsApp
              </a>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold text-oscuro mb-4">Síguenos en redes</h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com/almasportt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-rosa transition-colors"
              >
                <Instagram size={22} className="text-pink-500" />
                <div>
                  <p className="text-sm font-medium text-oscuro">Instagram</p>
                  <p className="text-xs text-gray-400">@almasportt</p>
                </div>
              </a>
              <a
                href="https://tiktok.com/@almasportt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-rosa transition-colors"
              >
                <Music2 size={22} className="text-oscuro" />
                <div>
                  <p className="text-sm font-medium text-oscuro">TikTok</p>
                  <p className="text-xs text-gray-400">@almasportt</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-green-500" />
              </div>
              <h3 className="font-bold text-oscuro text-lg mb-2">Mensaje enviado</h3>
              <p className="text-gray-500 text-sm">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-bold text-oscuro mb-4">Envíanos un mensaje</h2>
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Tu nombre" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mensaje">Mensaje</Label>
                <textarea
                  id="mensaje"
                  required
                  rows={4}
                  placeholder="¿En qué podemos ayudarte?"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-mocha hover:bg-mocha/90 text-white">
                Enviar mensaje
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

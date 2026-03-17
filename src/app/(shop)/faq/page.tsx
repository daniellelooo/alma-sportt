import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = { title: 'Preguntas Frecuentes' };

const faqs = [
  {
    seccion: 'Tallas',
    items: [
      {
        q: '¿Cómo sé qué talla elegir?',
        a: 'Recomendamos tomar tus medidas de busto, cintura y cadera, y compararlas con nuestra guía de tallas disponible en cada producto. Si estás entre dos tallas, opta por la mayor.',
      },
      {
        q: '¿Las tallas son estándar o varían por producto?',
        a: 'Nuestras tallas son consistentes en toda la colección. XS (32-34), S (36-38), M (40-42), L (44-46), XL (48-50).',
      },
    ],
  },
  {
    seccion: 'Envíos',
    items: [
      {
        q: '¿Cuánto tiempo demora el envío?',
        a: 'Los envíos nacionales tardan entre 3 y 5 días hábiles. En Medellín y Bogotá pueden llegar en 1-2 días hábiles.',
      },
      {
        q: '¿El envío tiene costo?',
        a: 'Los envíos tienen un costo de $8.900 COP para compras menores a $150.000 COP. Por encima de ese monto, el envío es gratuito.',
      },
      {
        q: '¿Envían a todo Colombia?',
        a: 'Sí, enviamos a todos los municipios de Colombia a través de nuestras alianzas con transportadoras nacionales.',
      },
    ],
  },
  {
    seccion: 'Cambios y Devoluciones',
    items: [
      {
        q: '¿Puedo cambiar mi talla?',
        a: 'Sí, aceptamos cambios dentro de los 15 días calendario después de recibir tu pedido. El producto debe estar sin uso, con etiquetas y en su empaque original.',
      },
      {
        q: '¿Cómo hago una devolución?',
        a: 'Contáctanos por WhatsApp o correo electrónico indicando el número de tu pedido y el motivo de la devolución. Te guiaremos en el proceso.',
      },
    ],
  },
  {
    seccion: 'Pagos',
    items: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, AmEx) a través de Stripe, y también puedes coordinar tu pedido por WhatsApp para pago por transferencia.',
      },
      {
        q: '¿Es seguro pagar en línea?',
        a: 'Completamente. Utilizamos Stripe, la plataforma de pagos más segura del mundo, con encriptación SSL y cumplimiento PCI DSS.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-oscuro mb-2 text-center">Preguntas frecuentes</h1>
      <p className="text-gray-500 text-center mb-12">
        Todo lo que necesitas saber antes de tu compra
      </p>

      <div className="space-y-10">
        {faqs.map((section) => (
          <div key={section.seccion}>
            <h2 className="text-lg font-bold text-mocha mb-4 uppercase tracking-wider text-sm">
              {section.seccion}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {section.items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`${section.seccion}-${idx}`}
                  className="bg-white rounded-xl border border-gray-100 px-4"
                >
                  <AccordionTrigger className="text-sm font-medium text-oscuro hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

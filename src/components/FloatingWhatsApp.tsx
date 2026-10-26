'use client';

import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    trackEvent('whatsapp_click', 'Boton Flotante WhatsApp');
  };

  return (
    <aside aria-label="Contacto directo" className="fixed bottom-6 right-6 z-40 group">
      <a
        href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20hacer%20una%20consulta."
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
        aria-label="Hablar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          ¿Cotizar por WhatsApp?
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-emerald-600"></span>
        </span>
      </a>
    </aside>
  );
}

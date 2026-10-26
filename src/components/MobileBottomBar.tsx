'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece después de scrollear 150px
      setIsVisible(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-2xl py-2 px-3 animate-fadeIn">
      <div className="flex items-center justify-between gap-2">
        
        {/* Llamada Directa */}
        <a
          href="tel:+56992409397"
          onClick={() => trackEvent('cta_click', 'BottomBar Llamar')}
          className="flex-1 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200/80"
          aria-label="Llamar a taller"
        >
          <Phone className="w-3.5 h-3.5 text-brand-blue" />
          <span>Llamar</span>
        </a>

        {/* WhatsApp con Pulso */}
        <a
          href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', 'BottomBar WhatsApp')}
          className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm relative"
          aria-label="Contactar por WhatsApp"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping absolute -top-0.5 -right-0.5" />
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        {/* Cotizar Rápido */}
        <a
          href="#cotizar"
          onClick={() => trackEvent('cta_click', 'BottomBar Cotizar')}
          className="flex-1 py-2.5 px-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-ice" />
          <span>Cotizar</span>
        </a>

      </div>
    </div>
  );
}

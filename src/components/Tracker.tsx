'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracker';

export default function Tracker() {
  useEffect(() => {
    // Registrar page view inicial
    trackEvent('page_view', 'Carga inicial del sitio');

    // Registrar clics automáticos en enlaces de WhatsApp o botones con data-track
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const trackLabel = target.getAttribute('data-track');

      if (href.includes('wa.me') || href.includes('whatsapp')) {
        trackEvent('whatsapp_click', trackLabel || 'Enlace directo a WhatsApp');
      } else if (trackLabel) {
        trackEvent('cta_click', trackLabel);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

'use client';

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('orellana_session_id');
  if (!id) {
    id = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    sessionStorage.setItem('orellana_session_id', id);
  }
  return id;
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

export function trackEvent(event: 'page_view' | 'cta_click' | 'whatsapp_click' | 'lead_submit' | 'section_view', label: string = '') {
  if (typeof window === 'undefined') return;

  const payload = {
    event,
    label,
    path: window.location.pathname,
    device: isMobileDevice() ? 'mobile' : 'desktop',
    session_id: getSessionId(),
  };

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', JSON.stringify(payload));
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch (err) {
    // Silencioso
  }
}

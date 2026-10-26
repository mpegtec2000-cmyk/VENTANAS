'use client';

import { useState, useEffect } from 'react';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Ruler, 
  Phone, 
  User, 
  Mail, 
  MapPin, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

const SERVICES_OPTIONS = [
  'Ventanas en Aluminio y PVC',
  'Puertas de Vidrio & Aluminio',
  'Shower Door a Medida',
  'Cierre de Balcón y Terrazas',
  'Espejos Biselados y LED',
  'Bow Window Panorámico',
  'Vitrinas Comerciales',
  'Celosías de Ventilación',
  'Reparación en General y Otros',
];

const COMMUNES = [
  'Viña del Mar',
  'Valparaíso',
  'Concón',
  'Quilpué',
  'Villa Alemana',
  'Reñaca',
  'Otra comuna de la V Región',
];

export default function QuotationCalculator() {
  const [service, setService] = useState(SERVICES_OPTIONS[0]);
  const [material, setMaterial] = useState('Aluminio');
  const [dimensions, setDimensions] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [commune, setCommune] = useState('Viña del Mar');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Escuchar evento externo (por ejemplo cuando dan clic en "Cotizar este Servicio" en la sección de servicios)
  useEffect(() => {
    const handleCustomSelect = (e: any) => {
      if (e.detail && typeof e.detail === 'string') {
        const found = SERVICES_OPTIONS.find((s) => s.toLowerCase().includes(e.detail.toLowerCase()));
        if (found) setService(found);
      }
    };
    window.addEventListener('orellana_select_service', handleCustomSelect);
    return () => window.removeEventListener('orellana_select_service', handleCustomSelect);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Por favor indica tu nombre y número de teléfono/WhatsApp.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        phone,
        email,
        service,
        dimensions: dimensions || `Material: ${material}`,
        message: message || `Interesado en ${service} (${material}). Ubicación: ${commune}.`,
        commune,
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        trackEvent('lead_submit', `Cotización: ${service}`);
        setSubmitted(true);
      } else {
        setErrorMsg('Ocurrió un error al enviar la cotización. Por favor contáctanos por WhatsApp.');
      }
    } catch (err) {
      setErrorMsg('Error de conexión. Puedes contactarnos directamente por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const getWaLink = () => {
    const text = encodeURIComponent(
      `Hola Vidriería Orellana! Acabo de enviar una cotización:\n\n` +
      `*Cliente:* ${name}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Servicio:* ${service}\n` +
      `*Material:* ${material}\n` +
      (dimensions ? `*Medidas/Detalle:* ${dimensions}\n` : '') +
      `*Comuna:* ${commune}\n` +
      (message ? `*Mensaje:* ${message}\n` : '') +
      `\nMe gustaría coordinar presupuesto o visita técnica. Gracias!`
    );
    return `https://wa.me/56992409397?text=${text}`;
  };

  return (
    <section id="cotizar" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Cotizador Online Rápido
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Solicita tu Presupuesto sin Costo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Completa los datos de tu proyecto y nuestro equipo técnico te responderá con una propuesta clara, transparente y detallada.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden">
          
          {submitted ? (
            /* Estado de Éxito */
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-brand-navy">¡Cotización Recibida con Éxito!</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  Gracias <strong>{name}</strong>. Hemos registrado tu solicitud para <strong>{service}</strong> en nuestro sistema. Te contactaremos a la brevedad.
                </p>
              </div>

              {/* Botón destacado WhatsApp para agilizar */}
              <div className="pt-4 max-w-md mx-auto">
                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="WhatsApp Cotizacion Exito"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enviar resumen directo a WhatsApp ahora</span>
                </a>
                <p className="text-xs text-slate-400 mt-2">
                  Agiliza tu presupuesto enviando un mensaje directo a nuestro taller.
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setDimensions('');
                  setMessage('');
                }}
                className="text-xs text-brand-blue hover:underline font-semibold"
              >
                Enviar otra cotización
              </button>
            </div>
          ) : (
            /* Formulario */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Paso 1: Selección de Servicio */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-brand-navy">
                  1. ¿Qué servicio o producto necesitas? <span className="text-brand-blue">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {SERVICES_OPTIONS.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setService(srv)}
                      className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        service === srv
                          ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2: Material y Medidas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Preferencia de Material / Perfilería
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                  >
                    <option value="Aluminio">Aluminio (Línea Nacional o Europea)</option>
                    <option value="PVC">PVC Termofusionado (Alta aislación)</option>
                    <option value="Cristal Templado">Cristal Templado de Seguridad</option>
                    <option value="Termopanel">Termopanel (Doble Vidrio Hermético)</option>
                    <option value="Por Asesorar">No lo sé, prefiero recomendación técnica</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Medidas aproximadas o cantidad (Opcional)</span>
                    <span className="text-[11px] text-slate-400 font-normal">Ej: 1.50 x 1.20 m</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej: 2 ventanas de 120x100 cm"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                    <Ruler className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Comuna y Mensaje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Comuna o Sector de Instalación
                  </label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                  >
                    {COMMUNES.map((com) => (
                      <option key={com} value={com}>
                        {com}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Detalles adicionales del trabajo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Es para un 3er piso, piso con cerámico..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              {/* Paso 3: Datos de Contacto */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-sm font-bold text-brand-navy">
                  2. ¿Dónde te enviamos la cotización?
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Tu Nombre completo *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp o Teléfono *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Correo (opcional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Alerta de Error si ocurre */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Botón de Envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  data-track="Submit Cotizador Form"
                  className="w-full py-4 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-base shadow-lg shadow-brand-blue/25 hover:shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Solicitar Cotización Gratuita</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center mt-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Respuesta rápida · Sin compromiso · Asesoría técnica profesional</span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

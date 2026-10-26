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
  AlertCircle,
  Clock,
  Layers,
  ShieldCheck
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
  'Viña del Mar (Achupallas / Reñaca / Miraflores / Recreo / Centro)',
  'Concón',
  'Valparaíso',
  'Quilpué',
  'Villa Alemana',
  'Otra comuna de la V Región',
];

export default function QuotationCalculator() {
  const [service, setService] = useState(SERVICES_OPTIONS[0]);
  const [material, setMaterial] = useState('Aluminio Línea Europea');
  const [dimensions, setDimensions] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [commune, setCommune] = useState(COMMUNES[0]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Escuchar evento personalizado emitido desde las tarjetas de servicio o galería
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
      setErrorMsg('Por favor ingresa tu nombre y número de teléfono/WhatsApp de contacto.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        phone,
        email,
        service,
        dimensions: dimensions ? `Material: ${material} | Medidas: ${dimensions}` : `Material: ${material}`,
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
        setErrorMsg('Ocurrió un error al enviar. Puedes contactarnos de inmediato por WhatsApp.');
      }
    } catch (err) {
      setErrorMsg('Error de conexión. Puedes contactarnos directamente por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const getWaLink = () => {
    const text = encodeURIComponent(
      `Hola Vidriería Orellana! Acabo de enviar una cotización desde el sitio web:\n\n` +
      `*Cliente:* ${name}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Servicio:* ${service}\n` +
      `*Preferencia de Material:* ${material}\n` +
      (dimensions ? `*Medidas/Cantidad:* ${dimensions}\n` : '') +
      `*Comuna/Sector:* ${commune}\n` +
      (message ? `*Detalle:* ${message}\n` : '') +
      `\nMe gustaría coordinar el presupuesto formal o visita técnica. Muchas gracias!`
    );
    return `https://wa.me/56992409397?text=${text}`;
  };

  return (
    <section id="cotizar" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Cotizador Online de Precisión
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Solicita tu Presupuesto sin Costo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Configura tu requerimiento en simples pasos. Nuestro equipo técnico revisará los datos y te enviará una propuesta clara, detallada y sin sorpresas.
          </p>
        </div>

        {/* Tarjeta del Formulario Configurador */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-10 relative overflow-hidden">
          
          {submitted ? (
            /* Estado de Éxito */
            <div className="py-10 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Solicitud Registrada en Taller
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
                  ¡Muchas Gracias, {name}!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Hemos recibido tu solicitud de cotización para <strong>{service}</strong>. Nuestro equipo de maestros la está revisando para responderte con el presupuesto detallado.
                </p>
              </div>

              {/* Botón WhatsApp de Agilización */}
              <div className="pt-4 max-w-md mx-auto space-y-3">
                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="WhatsApp Cotizacion Exito"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enviar resumen directo al WhatsApp del Maestro</span>
                </a>
                <p className="text-xs text-slate-400">
                  Recomendado para agilizar la entrega de tu presupuesto formal en menos de 2 horas.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setDimensions('');
                    setMessage('');
                  }}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  ← Realizar otra cotización
                </button>
              </div>
            </div>
          ) : (
            /* Formulario */
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* Paso 1: Selección de Servicio */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-navy text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    <span>Selecciona el Servicio o Estructura:</span>
                    <span className="text-brand-blue">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Paso 1 de 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {SERVICES_OPTIONS.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setService(srv)}
                      className={`text-left px-3.5 py-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                        service === srv
                          ? 'bg-brand-navy text-white border-brand-navy shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span className="line-clamp-1">{srv}</span>
                      {service === srv && <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 ml-1.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2: Materiales y Medidas */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-navy text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    <span>Especificaciones Técnicas del Proyecto:</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Paso 2 de 3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Preferencia de Material o Perfilería
                    </label>
                    <div className="relative">
                      <select
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-blue focus:bg-white"
                      >
                        <option value="Aluminio Línea Europea">Aluminio Línea Europea (Alta Resistencia)</option>
                        <option value="PVC Termofusionado">PVC Termofusionado (Máxima Aislación Térmica)</option>
                        <option value="Termopanel DVH Aislante">Termopanel DVH (Doble Vidrio Hermético)</option>
                        <option value="Cristal Templado de Seguridad 8mm">Cristal Templado de Seguridad 8mm / 10mm</option>
                        <option value="Por Asesorar en Terreno">Prefiero recomendación técnica del maestro</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Medidas aproximadas o cantidad (Opcional)</span>
                      <span className="text-[11px] text-slate-400 font-normal">Ej: 150 x 120 cm</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ej: 3 ventanas de 1.40 x 1.10 m"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-brand-blue focus:bg-white"
                      />
                      <Ruler className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Sector / Comuna de Instalación
                    </label>
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-blue focus:bg-white"
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
                      Detalles o Comentarios Adicionales
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Departamento en piso 8, retiro de marco antiguo..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Paso 3: Datos de Contacto */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-navy text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    <span>¿Dónde te contactamos?</span>
                    <span className="text-brand-blue">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Paso 3 de 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Tu Nombre completo *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-medium"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Teléfono o WhatsApp *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-medium"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Correo electrónico (opcional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Mensaje de Error si existiese */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
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
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue-dark hover:from-brand-blue-dark hover:to-brand-navy text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-blue/30 hover:shadow-glow transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-ice" />
                      <span>Solicitar Cotización Gratuita Ahora</span>
                    </>
                  )}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 text-center mt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    Respuesta en menos de 24 hrs
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                    Sin compromiso de compra
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    Taller en Achupallas, Viña del Mar
                  </span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

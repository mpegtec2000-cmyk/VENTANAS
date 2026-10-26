'use client';

import { MapPin, Phone, Mail, Instagram, Facebook, Clock, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function ContactLocation() {
  const address = 'Av. Alessandri 1055, 2550737 Viña del Mar, Valparaíso';
  const googleMapsUrl = 'https://share.google/p1rW58oiJ0iUPcRm1';

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Ubicación & Canales de Atención
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Visítanos en Taller o Contáctanos
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Estamos ubicados en Av. Alessandri 1055, Viña del Mar, con atención telefónica permanente y coordinación para visitas en terreno.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tarjeta de Contacto Directo */}
          <div className="lg:col-span-5 bg-card-gradient rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 flex flex-col justify-between space-y-8 reveal-init">
            <div className="space-y-6">
              
              <div>
                <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wider block">
                  Taller y Ventas
                </span>
                <h3 className="text-2xl font-black text-brand-navy mt-1">Orellana - Vidrios & Aluminios</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Fabricación de Ventanas en Aluminio y PVC · Calidad y Tradición
                </p>
              </div>

              {/* Lista de Datos */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Dirección */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/70">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Dirección Taller & Local</span>
                    <span className="font-bold text-slate-800 leading-snug block mt-0.5">
                      {address}
                    </span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline font-bold mt-1.5"
                    >
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp y Teléfono */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/70">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Teléfono & WhatsApp Directo</span>
                    <a
                      href="https://wa.me/56992409397"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="WhatsApp Contact Section"
                      className="font-black text-emerald-700 hover:text-emerald-800 text-base block mt-0.5"
                    >
                      +56 9924 09397
                    </a>
                    <span className="text-[11px] text-slate-500">Llamadas y mensajes de cotización</span>
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/70">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Correo Electrónico Oficial</span>
                    <a
                      href="mailto:Contacto@Vidreria.Orellana.cl"
                      className="font-bold text-slate-800 hover:text-brand-blue transition-colors text-xs sm:text-sm block mt-0.5"
                    >
                      Contacto@Vidreria.Orellana.cl
                    </a>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/70">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Horario de Atención</span>
                    <span className="text-xs text-slate-800 block font-semibold mt-0.5">
                      Lunes a Viernes: 08:30 a 18:30 hrs
                    </span>
                    <span className="text-xs text-slate-600 block font-medium">
                      Sábados: 09:00 a 14:00 hrs
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Redes Sociales Oficiales */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Síguenos en Redes Sociales:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/vidrieriaorellanayventanas.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="Instagram Click"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 text-purple-900 border border-purple-200 text-xs font-bold hover:shadow-sm transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>@vidrieriaorellanayventanas.cl</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="Facebook Click"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold hover:shadow-sm transition-all"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>Vidrios y Aluminios Orellana</span>
                </a>
              </div>
            </div>

          </div>

          {/* Tarjeta de Mapa / Visita en Terreno */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 flex flex-col justify-between reveal-init reveal-delay-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-brand-navy text-lg">Mapa de Ubicación del Taller</h4>
                  <p className="text-xs text-slate-500">Achupallas · Viña del Mar, Región de Valparaíso</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Local Abierto
                </span>
              </div>

              {/* Contenedor del Mapa Embed Oficial de Google Maps */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-72 sm:h-80 w-full shadow-inner">
                <iframe
                  title="Vidriería Orellana y Ventanas - Av. Alessandri 1055"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d566.441785881002!2d-71.51083037945885!3d-32.99997829466662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde1596c4315%3A0xeb4ce71e8f4e31b6!2sVidrier%C3%ADa%20Orellana%20y%20Ventanas!5e0!3m2!1ses-419!2scl!4v1793008418094!5m2!1ses-419!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                ¿Prefieres coordinar una visita técnica a tu domicilio u obra?
              </div>
              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20me%20gustar%C3%ADa%20coordinar%20una%20visita%20en%20terreno%20para%20mediciones."
                target="_blank"
                rel="noopener noreferrer"
                data-track="Coordinar Visita WhatsApp"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-brand-blue" />
                <span>Coordinar Visita en Terreno</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

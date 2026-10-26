'use client';

import { MapPin, Phone, Mail, Instagram, Facebook, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function ContactLocation() {
  const address = 'Guillermo García Huidobro Esq. Alessandri Local 1, Achupallas - Viña del Mar';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Guillermo Garcia Huidobro Alessandri Achupallas Vina del Mar'
  )}`;

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            Ubicación & Contacto Directo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Visítanos o Contáctanos Hoy Mismo
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Estamos en Viña del Mar listos para atenderte personalmente o resolver tus dudas por teléfono y WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tarjeta de Datos de Contacto */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">Taller y Local Comercial</span>
                <h3 className="text-2xl font-bold text-brand-navy mt-1">Orellana - Vidrios & Aluminios</h3>
                <p className="text-xs text-slate-500 mt-1">Giro: Fabricación de Ventanas en Aluminio y PVC</p>
              </div>

              {/* Lista de Datos */}
              <div className="space-y-4 text-sm">
                
                {/* Dirección */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">Dirección</span>
                    <span className="font-semibold text-slate-800 leading-snug block mt-0.5">
                      {address}
                    </span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline font-semibold mt-1"
                    >
                      <span>Ver en Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp y Teléfono */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">Teléfono / WhatsApp</span>
                    <a
                      href="https://wa.me/56992409397"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="WhatsApp Contact Section"
                      className="font-bold text-emerald-700 hover:text-emerald-800 text-base block mt-0.5"
                    >
                      +56 9924 09397
                    </a>
                    <span className="text-xs text-slate-500">Atención telefónica directa con taller</span>
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">Correo Electrónico</span>
                    <a
                      href="mailto:Contacto@Vidreria.Orellana.cl"
                      className="font-medium text-slate-800 hover:text-brand-blue transition-colors text-sm block mt-0.5"
                    >
                      Contacto@Vidreria.Orellana.cl
                    </a>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">Horario de Atención</span>
                    <span className="text-xs text-slate-700 block font-medium mt-0.5">
                      Lunes a Viernes: 08:30 a 18:30 hrs
                    </span>
                    <span className="text-xs text-slate-700 block font-medium">
                      Sábados: 09:00 a 14:00 hrs
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Redes Sociales Oficiales */}
            <div className="pt-6 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Síguenos en Redes Sociales
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/aluminios_orellana"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="Instagram Click"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 text-purple-900 border border-purple-200 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>@aluminios_orellana</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="Facebook Click"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>Vidrios y Aluminios Orellana</span>
                </a>
              </div>
            </div>

          </div>

          {/* Tarjeta de Mapa / Dirección Visual */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-brand-navy text-lg">Ubicación del Taller Orellana</h4>
                  <p className="text-xs text-slate-500">Achupallas · Viña del Mar, Región de Valparaíso</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  Atención en Terreno
                </span>
              </div>

              {/* Contenedor del Mapa / Embed Estilizado */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-72 sm:h-80 w-full">
                <iframe
                  title="Ubicación Vidriería Orellana"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Guillermo%20Garc%C3%ADa%20Huidobro%20Alessandri%20Achupallas%20Vina%20del%20Mar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                ¿Prefieres que vayamos a tu obra o domicilio a medir?
              </div>
              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20me%20gustar%C3%ADa%20coordinar%20una%20visita%20en%20terreno%20para%20mediciones."
                target="_blank"
                rel="noopener noreferrer"
                data-track="Coordinar Visita WhatsApp"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
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

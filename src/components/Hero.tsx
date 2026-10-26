'use client';

import { Shield, Award, Ruler, CheckCircle2, ArrowRight, MessageCircle, Sparkles, VolumeX, ThermometerSnowflake, Layers } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-brand-blue-light/15 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 bg-blueprint">
      
      {/* Resplandores arquitectónicos de fondo */}
      <div className="absolute top-0 right-1/4 -translate-y-16 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 translate-y-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge Oficial */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-xs sm:text-[13px] font-bold text-brand-navy">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              <span className="text-brand-blue">Calidad y Tradición</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-semibold">Taller Directo en Viña del Mar</span>
            </div>

            {/* Titular Principal Arquitectónico */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-[1.12]">
              Fabricación de Ventanas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-700">Aluminio & PVC</span> a tu Medida
            </h1>

            {/* Bajada Comercial de Confianza */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              En <strong className="text-brand-navy font-bold">Orellana - Vidrios & Aluminios</strong> transformamos tus espacios con estructuras de precisión milimétrica. Diseñamos e instalamos ventanas con termopanel aislante, shower doors, cierres de balcón, espejos y vitrinas con la durabilidad que el clima costero exige.
            </p>

            {/* Checklist Técnico de 4 Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start bg-white/70 backdrop-blur-sm p-2 rounded-xl border border-slate-200/60">
                <ThermometerSnowflake className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Termopanel Aislante Térmico</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start bg-white/70 backdrop-blur-sm p-2 rounded-xl border border-slate-200/60">
                <VolumeX className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Reducción Acústica Certificada</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start bg-white/70 backdrop-blur-sm p-2 rounded-xl border border-slate-200/60">
                <Shield className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Cristal Templado de Seguridad</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start bg-white/70 backdrop-blur-sm p-2 rounded-xl border border-slate-200/60">
                <Layers className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Línea Europea & PVC Soldado</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue-dark hover:from-brand-blue-dark hover:to-brand-navy text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-blue/30 hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                <Sparkles className="w-4 h-4 text-brand-ice" />
                <span>Solicitar Presupuesto Gratuito</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200/90 shadow-sm flex items-center justify-center gap-2.5 transition-all hover:border-emerald-300"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Micro badges inferiores de confianza */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-200/80">
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-brand-blue" />
                Más de 20 Años de Oficio
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Ruler className="w-4 h-4 text-brand-blue" />
                Medición Precisa en Terreno
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Garantía Escrita Orellana
              </span>
            </div>

          </div>

          {/* Columna Derecha: Showcase Arquitectónico de Cristal y Ventanas */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Tarjeta Visual de Precisión */}
              <div className="glass-panel-luxury rounded-3xl p-6 sm:p-7 relative overflow-hidden glass-reflection">
                
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-black text-sm shadow-md">
                      VO
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Ingeniería & Taller</span>
                      <h2 className="text-base font-bold text-brand-navy">Orellana Vidrios & Aluminios</h2>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
                    Viña del Mar
                  </span>
                </div>

                {/* Grilla visual de especificaciones técnicas */}
                <div className="py-5 space-y-3">
                  
                  {/* Item 1 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-between hover:border-brand-blue transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                        01
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-brand-navy">Ventanas Termopanel DVH</div>
                        <div className="text-[11px] text-slate-500">Cámara estanca · Control acústico y térmico</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-blue bg-blue-50/80 px-2.5 py-1 rounded-lg">
                      -32 dB
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-between hover:border-brand-blue transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                        02
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-brand-navy">Shower Doors & Balcones</div>
                        <div className="text-[11px] text-slate-500">Cristal templado 8mm · Acero inoxidable</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-blue bg-blue-50/80 px-2.5 py-1 rounded-lg">
                      8-10 mm
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-between hover:border-brand-blue transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                        03
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-brand-navy">Espejos & Bow Windows</div>
                        <div className="text-[11px] text-slate-500">Biselado fino · Retroiluminación LED</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-blue bg-blue-50/80 px-2.5 py-1 rounded-lg">
                      Premium
                    </span>
                  </div>

                </div>

                {/* Banner inferior de Taller Propio */}
                <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
                  <div>
                    <div className="text-[11px] text-brand-cyan font-bold uppercase tracking-wider">Fabricación Propia</div>
                    <div className="text-xs font-semibold text-slate-200">Guillermo García Huidobro, Achupallas</div>
                  </div>
                  <a
                    href="https://wa.me/56992409397"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Cotizar
                  </a>
                </div>

              </div>

              {/* Mini Badge Flotante Superior */}
              <div className="absolute -top-3 -right-3 bg-white rounded-2xl shadow-lg border border-slate-200/80 px-3.5 py-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-brand-navy">Presupuestos en 24h</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

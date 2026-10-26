'use client';

import { ShieldCheck, Award, Ruler, CheckCircle2, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-brand-blue-light/20 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      {/* Elementos geométricos decorativos tipo cristal de fondo */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-brand-navy/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Contenido Principal */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge de Gancho Oficial */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span>Calidad y Tradición en Cada Proyecto</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.15]">
              Fabricación de Ventanas en <span className="text-brand-blue">Aluminio & PVC</span> a tu Medida
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              En <strong className="text-brand-navy font-semibold">Orellana - Vidrios & Aluminios</strong> combinamos décadas de oficio tradicional con perfiles de alta eficiencia térmica y acústica. Especialistas en ventanas, shower doors, cierres de balcón, espejos y vitrinas para hogares y empresas.
            </p>

            {/* Checklist de garantías */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span>Termopaneles con aislación acústica y térmica</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span>Cristales templados de máxima seguridad</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span>Medición técnica y asesoría en terreno</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span>Taller propio en Achupallas, Viña del Mar</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-base shadow-lg shadow-brand-blue/25 hover:shadow-glow transition-all flex items-center justify-center gap-2 group"
              >
                <span>Cotizar Presupuesto Gratis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

            {/* Badges de credibilidad inferior */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-blue" />
                <span>Tradición y Confianza Comprobada</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-brand-blue" />
                <span>100% Hecho a Medida</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>Garantía de Instalación</span>
              </div>
            </div>
          </div>

          {/* Tarjeta Visual de Impacto (Glass Card con mockup de servicios) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Tarjeta Flotante Principal */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-glass-card border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-bl-full pointer-events-none" />

                <div className="space-y-6">
                  {/* Header de la tarjeta */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">Especialistas Certificados</span>
                      <h2 className="text-xl font-bold text-brand-navy">Orellana Vidrios & Aluminios</h2>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-black text-sm">
                      VO
                    </div>
                  </div>

                  {/* Fila de Soluciones Destacadas */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-between hover:border-brand-blue/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                          01
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-brand-navy">Ventanas Aluminio & PVC</div>
                          <div className="text-xs text-slate-500">Termopanel · Línea Europea · Hermética</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md">A Medida</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-between hover:border-brand-blue/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                          02
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-brand-navy">Cierres de Balcón & Terrazas</div>
                          <div className="text-xs text-slate-500">Protección contra viento y brisa marina</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md">Seguridad</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-between hover:border-brand-blue/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                          03
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-brand-navy">Shower Doors & Espejos</div>
                          <div className="text-xs text-slate-500">Templado 8mm · Biselados · LED</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md">Elegancia</span>
                    </div>
                  </div>

                  {/* Banner de llamada rápida */}
                  <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-xl p-4 text-white flex items-center justify-between">
                    <div>
                      <div className="text-xs text-brand-blue-light font-medium">Atención en Viña del Mar y alrededores</div>
                      <div className="text-sm font-bold">¿Tienes dudas o medidas listas?</div>
                    </div>
                    <a
                      href="https://wa.me/56992409397"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                    >
                      Escribir
                    </a>
                  </div>
                </div>
              </div>

              {/* Mini badge flotante de garantía */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex items-center gap-3 max-w-[200px]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-[11px] leading-tight text-slate-700">
                  <strong className="text-brand-navy block font-bold">100% Confiable</strong>
                  Cotizaciones claras y sin costos ocultos
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

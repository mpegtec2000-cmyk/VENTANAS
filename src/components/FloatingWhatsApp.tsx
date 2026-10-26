'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Hammer, 
  Wrench, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw,
  Building2,
  FileText
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
  options?: string[];
  summaryCard?: {
    serviceType: string;
    product: string;
    commune: string;
    details: string;
    contactName?: string;
    contactPhone?: string;
  };
}

interface LeadData {
  serviceType: string;
  product: string;
  commune: string;
  details: string;
  name: string;
  phone: string;
}

const STEP_OPTIONS = {
  serviceTypes: [
    '🔨 Fabricación a Medida (Taller Propio)',
    '🔧 Instalación en Obra / Terreno',
    '🛠️ Reparación o Mantención',
    '💬 Hablar directo con un Maestro por WhatsApp',
  ],
  productsFab: [
    'Ventanas Aluminio / PVC / Termopanel',
    'Shower Door en Cristal Templado',
    'Cierre de Balcón o Terraza',
    'Barandas de Cristal & Acero Inox',
    'Vitrinas o Fachadas Comerciales',
    'Otro proyecto arquitectónico a medida',
  ],
  productsRep: [
    'Cambio de Cristal Roto / Quebrado',
    'Filtración o Desajuste en Ventana',
    'Mantención de Correderas / Rodamientos',
    'Sellado Hermético y Siliconado',
  ],
  communes: [
    'Viña del Mar (Achupallas / Reñaca / Centro)',
    'Concón',
    'Valparaíso',
    'Quilpué / Villa Alemana',
    'Otra comuna de la V Región',
  ],
  measurements: [
    'Requiero Visita Técnica en Terreno (Gratis)',
    'Tengo medidas estimadas (las escribiré)',
    'Aún no tengo medidas exactas',
  ],
};

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [lead, setLead] = useState<LeadData>({
    serviceType: '',
    product: '',
    commune: '',
    details: '',
    name: '',
    phone: '',
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Bienvenido a Vidriería Orellana. Soy tu Asesor Técnico Virtual.\n\nPara asesorarte con precisión y calcular tu presupuesto, ¿qué tipo de requerimiento tienes hoy?',
      timestamp: 'Ahora',
      options: STEP_OPTIONS.serviceTypes,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent('ai_chat_open', 'Abrir Asesor Virtual');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRestart = () => {
    setStep(1);
    setLead({
      serviceType: '',
      product: '',
      commune: '',
      details: '',
      name: '',
      phone: '',
    });
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: '¡Conversación reiniciada! ¿Qué tipo de requerimiento necesitas cotizar?',
        timestamp: 'Ahora',
        options: STEP_OPTIONS.serviceTypes,
      },
    ]);
  };

  const saveLeadToCRM = async (finalLead: LeadData) => {
    try {
      const payload = {
        name: finalLead.name || 'Cliente Asistente Virtual',
        phone: finalLead.phone || 'Por coordinar en WhatsApp',
        service: `${finalLead.serviceType} - ${finalLead.product}`,
        commune: finalLead.commune,
        dimensions: finalLead.details,
        message: `Cotización Asesor Virtual: Requerimiento de ${finalLead.serviceType} para ${finalLead.product} en ${finalLead.commune}. Detalles/Medidas: ${finalLead.details}.`,
      };

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      trackEvent('ai_chat_lead_captured', finalLead.product);
    } catch (err) {
      console.error('Error guardando lead en CRM:', err);
    }
  };

  const handleUserSelection = (selectedOption: string) => {
    // Si el usuario elige hablar directo por WhatsApp
    if (selectedOption.includes('Hablar directo con un Maestro')) {
      const waUrl = 'https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20contactar%20directamente%20con%20un%20maestro%20para%20una%20consulta.';
      window.open(waUrl, '_blank');
      return;
    }

    // Registrar mensaje del usuario
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: selectedOption,
      timestamp: 'Ahora',
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      if (step === 1) {
        // Guardar Tipo de Servicio (Fabricación, Instalación, Reparación)
        const updatedLead = { ...lead, serviceType: selectedOption };
        setLead(updatedLead);
        setStep(2);

        const isReparacion = selectedOption.includes('Reparación');
        const nextOptions = isReparacion ? STEP_OPTIONS.productsRep : STEP_OPTIONS.productsFab;

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Excelente. Registrado: ${selectedOption}.\n\n¿Para qué tipo de estructura o trabajo específico lo requieres?`,
          timestamp: 'Ahora',
          options: nextOptions,
        };
        setMessages((prev) => [...prev, botReply]);
      } else if (step === 2) {
        // Guardar Producto
        const updatedLead = { ...lead, product: selectedOption };
        setLead(updatedLead);
        setStep(3);

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Perfecto, somos especialistas en ${selectedOption}.\n\n¿En qué comuna o sector se encuentra el proyecto o domicilio?`,
          timestamp: 'Ahora',
          options: STEP_OPTIONS.communes,
        };
        setMessages((prev) => [...prev, botReply]);
      } else if (step === 3) {
        // Guardar Comuna
        const updatedLead = { ...lead, commune: selectedOption };
        setLead(updatedLead);
        setStep(4);

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Tenemos cobertura activa en ${selectedOption}.\n\n¿Tienes las medidas aproximadas de la estructura o prefieres agendar una visita técnica para rectificar medidas en terreno?`,
          timestamp: 'Ahora',
          options: STEP_OPTIONS.measurements,
        };
        setMessages((prev) => [...prev, botReply]);
      } else if (step === 4) {
        // Guardar Medidas o Solicitud de Visita
        const updatedLead = { ...lead, details: selectedOption };
        setLead(updatedLead);
        setStep(5);

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `¡Casi listo! Para formalizar tu cotización y transferirte con el maestro en taller, por favor escribe tu Nombre y Teléfono o WhatsApp de contacto a continuación.`,
          timestamp: 'Ahora',
        };
        setMessages((prev) => [...prev, botReply]);
      }

      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: 'Ahora',
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(async () => {
      if (step === 5) {
        // El usuario está ingresando su nombre y teléfono para finalizar la cotización
        const updatedLead = {
          ...lead,
          name: lead.name || userText,
          phone: lead.phone || userText,
        };
        setLead(updatedLead);
        setStep(6);

        // Guardar lead automáticamente en base de datos CRM
        await saveLeadToCRM(updatedLead);

        const waMessage = `Hola Vidriería Orellana, coticé con su Asesor Virtual:\n• Requerimiento: ${updatedLead.serviceType}\n• Producto: ${updatedLead.product}\n• Ubicación: ${updatedLead.commune}\n• Medidas/Detalles: ${updatedLead.details}\n• Contacto: ${userText}`;
        const waUrl = `https://wa.me/56992409397?text=${encodeURIComponent(waMessage)}`;

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `✅ ¡Ficha técnica completada con éxito!\n\nHemos registrado tu solicitud en nuestro sistema. Puedes continuar directamente con el maestro asignado por WhatsApp para confirmar presupuesto y fecha de fabricación/visita:`,
          timestamp: 'Ahora',
          summaryCard: {
            serviceType: updatedLead.serviceType,
            product: updatedLead.product,
            commune: updatedLead.commune,
            details: updatedLead.details,
            contactName: userText,
          },
          actionUrl: waUrl,
          actionText: 'Abrir WhatsApp con Ficha Técnica Completa',
        };

        setMessages((prev) => [...prev, botReply]);
      } else if (step === 4 && userText.length > 2) {
        // El usuario escribió sus medidas manualmente
        const updatedLead = { ...lead, details: `Medidas: ${userText}` };
        setLead(updatedLead);
        setStep(5);

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Medidas registradas: "${userText}".\n\nPor último, déjanos tu Nombre y Teléfono / WhatsApp para asignarte la cotización formal.`,
          timestamp: 'Ahora',
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        // Respuesta inteligente ante texto libre: Detección contextual
        const lower = userText.toLowerCase();
        let detectedService = lead.serviceType;
        let detectedProduct = lead.product;

        if (lower.includes('repar') || lower.includes('rot') || lower.includes('cambi')) {
          detectedService = 'Reparación o Mantención';
        } else if (lower.includes('instal') || lower.includes('montaj') || lower.includes('faena')) {
          detectedService = 'Instalación en Terreno';
        } else if (lower.includes('fabric') || lower.includes('nuev') || lower.includes('medida')) {
          detectedService = 'Fabricación a Medida';
        }

        if (lower.includes('ventana') || lower.includes('pvc') || lower.includes('termopanel')) {
          detectedProduct = 'Ventanas en Aluminio & PVC';
        } else if (lower.includes('shower') || lower.includes('ducha') || lower.includes('baño')) {
          detectedProduct = 'Shower Door en Cristal Templado';
        } else if (lower.includes('balcon') || lower.includes('terraza')) {
          detectedProduct = 'Cierre de Balcón o Terraza';
        } else if (lower.includes('baranda')) {
          detectedProduct = 'Barandas de Cristal & Inox';
        }

        const updatedLead = {
          ...lead,
          serviceType: detectedService || 'Fabricación a Medida',
          product: detectedProduct || userText,
          details: lead.details ? `${lead.details} | Nota: ${userText}` : `Consulta: ${userText}`,
        };
        setLead(updatedLead);

        const waMessage = `Hola Vidriería Orellana, consulta desde Asesor Virtual: ${userText}`;
        const waUrl = `https://wa.me/56992409397?text=${encodeURIComponent(waMessage)}`;

        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Entendido: "${userText}". Nuestro taller cuenta con maestros calificados para este trabajo.\n\nPuedes continuar con las opciones guiadas o hablar de inmediato por WhatsApp:`,
          timestamp: 'Ahora',
          options: STEP_OPTIONS.serviceTypes,
          actionUrl: waUrl,
          actionText: 'Consultar por WhatsApp con el Maestro',
        };
        setMessages((prev) => [...prev, botReply]);
      }

      setIsTyping(false);
    }, 700);
  };

  return (
    <aside aria-label="Asistente Virtual" className="fixed bottom-6 right-6 z-50">
      
      {/* Botón Lanzador Flotante con Logo HD */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Abrir Asesor Virtual Vidriería Orellana"
          className="flex items-center gap-3 bg-[#0F172A] hover:bg-[#1E293B] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-slate-900/50 transition-all duration-300 transform hover:scale-105 group border border-white/20"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-600/30 border border-blue-400/40">
            <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-[#0F172A]"></span>
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="font-extrabold text-xs tracking-wide text-white">Vidriería Orellana</span>
            <span className="text-[10.5px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Cotizador Inteligente en Línea
            </span>
          </div>
        </button>
      )}

      {/* Ventana Modal del Chat Inteligente */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[410px] h-[560px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Superior Corporativo con Logo HD Oficial del Navbar */}
          <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between shadow-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-36 sm:h-10 sm:w-44">
                <Image
                  src="/images/logo-orellana-white-hd.png"
                  alt="Vidriería Orellana - Vidrios & Aluminios"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>En Línea</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleRestart}
                title="Reiniciar cotización"
                aria-label="Reiniciar cotización"
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                aria-label="Cerrar chat"
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'bot' && (
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1 ml-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    Asesor Técnico Orellana
                  </span>
                )}
                
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.sender === 'bot'
                      ? 'bg-[#0F172A] text-white rounded-tl-sm'
                      : 'bg-blue-600 text-white rounded-tr-sm font-medium'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Tarjeta de Resumen Técnico si la cotización finalizó */}
                {msg.summaryCard && (
                  <div className="mt-2.5 w-full bg-white border border-blue-200 rounded-2xl p-3.5 shadow-md space-y-2 text-xs text-slate-800">
                    <div className="font-bold text-sm text-[#0F172A] border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Ficha de Cotización Generada</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Tipo:</span>
                        <span className="font-semibold text-slate-900">{msg.summaryCard.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Producto:</span>
                        <span className="font-semibold text-slate-900">{msg.summaryCard.product}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Comuna:</span>
                        <span className="font-semibold text-slate-900">{msg.summaryCard.commune}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Medidas / Visita:</span>
                        <span className="font-semibold text-slate-900">{msg.summaryCard.details}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón de acción directo para WhatsApp */}
                {msg.actionUrl && (
                  <a
                    href={msg.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200 group/btn"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{msg.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                )}

                {/* Opciones Interactivas Guiadas */}
                {msg.options && (
                  <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                    <span className="text-[11px] font-bold text-slate-600 mb-0.5">
                      Selecciona una opción:
                    </span>
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleUserSelection(opt)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-[#0052CC] bg-white hover:bg-blue-50/60 text-[#0F172A] text-xs font-semibold transition-all duration-150 shadow-xs flex items-center justify-between group"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0052CC] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200 text-slate-800 w-fit text-xs font-medium shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-slate-600 font-semibold">Asesor analizando requerimiento...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer de Entrada de Texto */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step === 5 ? "Escribe tu Nombre y WhatsApp aquí..." : "Escribe tu consulta o medidas..."}
              className="flex-1 bg-slate-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Enviar mensaje"
              className="w-10 h-10 rounded-xl bg-[#0F172A] hover:bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Sello de Confianza Inferior */}
          <div className="py-1.5 px-3 text-center bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span>Taller Propio en Achupallas • Atención Inmediata en la V Región</span>
          </div>

        </div>
      )}

    </aside>
  );
}

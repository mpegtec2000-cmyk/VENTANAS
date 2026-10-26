'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Paperclip, 
  Smile, 
  PhoneCall, 
  Clock 
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
}

const QUICK_OPTIONS = [
  'Ventanas de Aluminio & PVC',
  'Cierre de Balcón o Terraza',
  'Shower Door a Medida',
  'Vitrinas Comerciales',
  'Cotización Personalizada',
  'Hablar con Maestro por WhatsApp',
];

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hola, bienvenido a Vidriería Orellana, estoy en línea para asesorarte. ¿En qué proyecto te puedo ayudar hoy?',
      timestamp: 'Ahora',
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
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent('ai_chat_open', 'Abrir Asistente IA');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectOption = (option: string) => {
    trackEvent('ai_chat_option', option);

    // Si es hablar directo por WhatsApp
    if (option === 'Hablar con Maestro por WhatsApp') {
      const url = 'https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20asesor%C3%ADa%20t%C3%A9cnica%20inmediata.';
      window.open(url, '_blank');
      return;
    }

    // Agregar mensaje del usuario
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: option,
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let waText = '';

      if (option.includes('Ventanas')) {
        botResponse = 'Excelente. Fabricamos ventanas en Termopanel DVH y perfiles de aluminio o PVC de alta aislación térmica y acústica. ¿Deseas cotizar medidas aproximadas o solicitar rectificación en terreno?';
        waText = `Hola Vidriería Orellana, solicito cotización para ${option}.`;
      } else if (option.includes('Balcón')) {
        botResponse = 'Nuestros cierres de balcón en aluminio y cristal protegen contra el viento y la lluvia costera manteniendo la vista panorámica. ¿En qué comuna se encuentra tu departamento o casa?';
        waText = `Hola Vidriería Orellana, me interesa cotizar un cierre de balcón o terraza.`;
      } else if (option.includes('Shower')) {
        botResponse = 'Fabricamos Shower Doors a medida en cristal templado de seguridad (8mm y 10mm) con herrajes inoxidables resistentes a la humedad. ¿Es puerta corredera o abatible?';
        waText = `Hola Vidriería Orellana, busco cotizar un Shower Door a medida.`;
      } else if (option.includes('Vitrinas')) {
        botResponse = 'Diseñamos e instalamos vitrinas y frentes comerciales de alto tráfico con perfilería reforzada de aluminio y vidrios de seguridad. ¿Tienes plano o medidas de la vitrina?';
        waText = `Hola Vidriería Orellana, requiero cotización para vitrina comercial o frente de local.`;
      } else {
        botResponse = 'Perfecto. Cuéntame los detalles de tu proyecto o déjame tus medidas para transferir tu solicitud directamente al maestro en taller.';
        waText = `Hola Vidriería Orellana, deseo una cotización personalizada para mi proyecto.`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: 'Ahora',
        actionUrl: `https://wa.me/56992409397?text=${encodeURIComponent(waText)}`,
        actionText: 'Continuar por WhatsApp con un Maestro',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
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

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Entendido: "${userText}". Podemos fabricarlo a la medida exacta en nuestro taller de Achupallas. Te transferiré con el maestro para validar disponibilidad y presupuesto exacto.`,
        timestamp: 'Ahora',
        actionUrl: `https://wa.me/56992409397?text=${encodeURIComponent(`Hola Vidriería Orellana, mi consulta es: ${userText}`)}`,
        actionText: 'Enviar consulta al Maestro por WhatsApp',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <aside aria-label="Asistente Virtual" className="fixed bottom-6 right-6 z-50">
      
      {/* Botón Lanzador Flotante (Icono de Agente IA) */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Abrir Asistente Virtual Vidriería Orellana"
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#0052CC] to-[#003B99] hover:from-[#0040A8] hover:to-[#002B73] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 group border border-white/20"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border border-white"></span>
            </span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-extrabold text-xs tracking-wide">Vidriería Orellana</span>
            <span className="text-[10px] text-blue-200 font-medium">Asesor Virtual en línea</span>
          </div>
        </button>
      )}

      {/* Ventana Modal del Chat IA (Estilo Cliengo según captura) */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Superior Corporativo */}
          <div className="bg-[#0052CC] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0052CC]" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-none text-white">
                  Vidriería Orellana
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-blue-100 font-medium">Disponible ahora</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              aria-label="Cerrar chat"
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'bot' && (
                  <span className="text-[11px] text-slate-500 font-semibold mb-1 ml-1">
                    Vidriería Orellana
                  </span>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'bot'
                      ? 'bg-[#0052CC] text-white rounded-tl-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Botón de acción directo si el bot lo sugiere */}
                {msg.actionUrl && (
                  <a
                    href={msg.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{msg.actionText}</span>
                  </a>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#0052CC]/10 text-[#0052CC] w-fit text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">Escribiendo respuesta...</span>
              </div>
            )}

            {/* Chips de Opciones Rápidas (Estilo Cliengo de la captura) */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-500 font-medium block mb-2">
                Opciones frecuentes:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {QUICK_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className="px-3 py-1.5 rounded-full border border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white text-xs font-semibold transition-all duration-200 bg-white shadow-xs text-left"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Footer de Entrada de Texto */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <div className="flex items-center gap-1 text-slate-400 pl-1">
              <Smile className="w-5 h-5 hover:text-slate-600 cursor-pointer" />
              <Paperclip className="w-5 h-5 hover:text-slate-600 cursor-pointer" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-slate-100 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0052CC]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Enviar mensaje"
              className="w-9 h-9 rounded-xl bg-[#0052CC] hover:bg-[#0040A8] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Sello inferior sutil */}
          <div className="py-1 text-center bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
            Asesor Virtual en línea • Vidriería Orellana
          </div>

        </div>
      )}

    </aside>
  );
}

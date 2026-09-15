import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, MessageCircle, X, Send, Bot, CalendarCheck, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

const QUICK_PROMPTS = [
  { label: '💰 Pricing & Cost', query: 'How much does automation cost?' },
  { label: '⏱️ Project Timeline', query: 'How long does an automation take?' },
  { label: '⚡ What Can You Automate?', query: 'What processes can you automate?' },
  { label: '📅 Book a Call', query: 'How do I book a strategy call?' },
  { label: '💬 WhatsApp', query: 'Can I chat with you on WhatsApp?' }
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm Eldorado's portfolio assistant. What business process or bottleneck are you looking to automate?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAnswer = (query: string): { text: string; action?: { label: string; href: string; external?: boolean } } => {
    const q = query.toLowerCase();

    if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('rate') || q.includes('budget') || q.includes('how much')) {
      return {
        text: "Pricing is project-based and depends on your workflow, integrations, and complexity. The first conversation is about mapping your process to determine whether automation is genuinely worth implementing for your business.",
        action: { label: 'Book a Free Strategy Call', href: 'https://cal.com/eldoradoautomate/free-strategy-call', external: true }
      };
    }

    if (q.includes('time') || q.includes('long') || q.includes('duration') || q.includes('turnaround') || q.includes('weeks') || q.includes('days')) {
      return {
        text: "It depends on complexity. Standard workflow automations (like order routing or lead notifications) can often be built in 5-10 days. Comprehensive multi-system integrations (like full CRM pipelines or custom AI support agents) typically take 2-3 weeks.",
        action: { label: 'Discuss Your Timeline', href: 'https://cal.com/eldoradoautomate/free-strategy-call', external: true }
      };
    }

    if (q.includes('tool') || q.includes('n8n') || q.includes('make') || q.includes('zapier') || q.includes('stack') || q.includes('software')) {
      return {
        text: "I select tools based entirely on your business needs rather than pushing a specific vendor. Core tools include n8n, Make.com, webhooks, REST APIs, HubSpot, Salesforce, Airtable, Shopify, and modern AI models (OpenAI, Claude, Gemini, DeepSeek).",
        action: { label: 'Explore Tools Stack', href: '#tools' }
      };
    }

    if (q.includes('book') || q.includes('call') || q.includes('schedule') || q.includes('calendar') || q.includes('meeting')) {
      return {
        text: "You can book a free, no-pressure 30-minute strategy call directly on Eldorado's calendar. We'll audit your current manual bottlenecks and map out a concrete solution.",
        action: { label: 'Open Cal.com Booking', href: 'https://cal.com/eldoradoautomate/free-strategy-call', external: true }
      };
    }

    if (q.includes('whatsapp') || q.includes('chat') || q.includes('phone') || q.includes('contact') || q.includes('message')) {
      return {
        text: "You can reach Eldorado directly on WhatsApp. He's available to review your workflow questions directly.",
        action: { label: 'Message on WhatsApp', href: 'https://wa.me/2348083693498', external: true }
      };
    }

    if (q.includes('lead') || q.includes('sales') || q.includes('crm') || q.includes('hubspot') || q.includes('follow up') || q.includes('followup')) {
      return {
        text: "I build end-to-end Lead & Sales pipelines that qualify inbound inquiries, calculate scoring tiers, notify reps instantly in Slack, and trigger automated follow-ups so high-value leads never sit waiting.",
        action: { label: 'View 5D CRM Case Study', href: '#portfolio' }
      };
    }

    if (q.includes('ecom') || q.includes('shopify') || q.includes('order') || q.includes('fulfill') || q.includes('shipping') || q.includes('refund')) {
      return {
        text: "For e-commerce brands, I automate fulfillment label generation via Shippo, return intake, automated refund evaluation, and executive BI reporting so your operations team doesn't spend hours re-typing data.",
        action: { label: 'View E-Commerce Case Study', href: '#portfolio' }
      };
    }

    if (q.includes('support') || q.includes('customer') || q.includes('agent') || q.includes('bot') || q.includes('inquiry')) {
      return {
        text: "I build 24/7 AI-powered support systems on WhatsApp and web platforms trained strictly on your verified product documentation, FAQs, and business policies, with immediate escalation to human staff.",
        action: { label: 'View Support Assistant', href: '#portfolio' }
      };
    }

    if (q.includes('technical') || q.includes('code') || q.includes('developer') || q.includes('do i need')) {
      return {
        text: "No technical knowledge is required from you or your team. I handle the architecture, building, testing, error monitoring, and training. You simply tell me what you are doing manually.",
        action: { label: 'Book a Free Strategy Call', href: 'https://cal.com/eldoradoautomate/free-strategy-call', external: true }
      };
    }

    // Default business response
    return {
      text: "I identify operational friction points such as manual data entry, slow lead follow-ups, support triage, or order handling, and convert them into dependable automated systems.",
      action: { label: 'Book Strategy Call to Discuss', href: 'https://cal.com/eldoradoautomate/free-strategy-call', external: true }
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = query.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response.text, action: response.action }]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-[calc(100vw-2rem)] sm:w-[380px] h-[490px] max-h-[calc(100vh-6rem)] mb-3 overflow-hidden flex flex-col shadow-2xl border-gold/30 rounded-3xl pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-gold px-4 py-2 flex justify-between items-center text-black">
              <div className="flex items-center gap-2 font-tech font-bold text-sm tracking-wider">
                <Bot size={18} />
                <span>AUTOMATION ASSISTANT</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                aria-label="Close Assistant"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="p-3 bg-bg-alt/80 border-b border-gold/10 overflow-x-auto flex gap-2 scrollbar-hide">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSend(prompt.query)}
                  className="whitespace-nowrap min-h-[44px] px-3.5 py-2 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-tech rounded-full border border-gold/20 transition-colors flex items-center justify-center cursor-pointer"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            
            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gold text-black rounded-tr-none font-medium' 
                      : 'bg-gold/10 text-[var(--text)] border border-gold/15 rounded-tl-none font-light'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.action && (
                    <div className="mt-2">
                      <a
                        href={msg.action.href}
                        target={msg.action.external ? '_blank' : undefined}
                        rel={msg.action.external ? 'noopener noreferrer' : undefined}
                        onClick={() => {
                          if (!msg.action?.external) setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 bg-gold text-black rounded-xl font-tech font-bold text-xs hover:bg-gold-light transition-all shadow-md"
                      >
                        {msg.action.label}
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gold/10 border border-gold/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-gold/10 flex gap-2 bg-bg/95 items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about pricing, timelines, workflows..."
                className="flex-1 min-h-[44px] bg-gold/5 border border-gold/20 rounded-xl px-4 py-2 text-base sm:text-xs focus:outline-none focus:border-gold transition-colors text-[var(--text)] placeholder:text-muted/60"
              />
              <button 
                onClick={() => handleSend()}
                className="w-11 h-11 min-w-[44px] min-h-[44px] bg-gold text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Cluster: WhatsApp Quick Chat + AI Assistant Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
        {/* WhatsApp Quick Chat Bubble */}
        <a
          id="whatsapp-quick-chat"
          href="https://wa.me/2348083693498?text=Hi%20Eldorado%2C%20I'm%20interested%20in%20automating%20a%20process%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp Quick Chat with Eldorado"
          className="group flex items-center gap-2.5 pl-3.5 pr-4 py-2 sm:py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_14px_38px_rgba(37,211,102,0.55)] transition-all hover:scale-105 active:scale-95 border border-white/25 min-h-[48px] sm:min-h-[52px]"
        >
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white/30" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#25D366] animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[0.6rem] font-tech uppercase tracking-wider text-emerald-100 font-bold leading-none">
              Direct Contact
            </span>
            <span className="text-xs sm:text-sm font-tech font-bold tracking-tight text-white leading-tight">
              Quick Chat
            </span>
          </div>
        </a>

        {/* AI Assistant Toggle Button */}
        <button 
          id="toggle-ai-assistant"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] bg-gold text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all group cursor-pointer border border-gold-light/40"
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          title={isOpen ? "Close AI Assistant" : "Ask AI Assistant"}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:rotate-6 transition-transform" />}
        </button>
      </div>
    </div>
  );
};

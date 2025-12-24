"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TelegramIcon, ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";

// Local Icons for this page
const MailIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M4 10 L16 18 L28 10" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="23" cy="9" r="1.5" fill="currentColor" opacity="0.6" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M16 8 L16 16 L22 20" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const contacts = [
  {
    icon: TelegramIcon,
    title: "Telegram",
    value: "@tleyouself",
    href: "https://t.me/tleyouself",
    description: "Быстрый ответ за 5 минут",
    accent: true,
  },
  {
    icon: MailIcon,
    title: "Email",
    value: "hello@tleyou.ru",
    href: "mailto:hello@tleyou.ru",
    description: "Для деловых предложений",
    accent: false,
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    value: "@tleyouself",
    href: "https://instagram.com/tleyou",
    description: "Вдохновение и практики",
    accent: false,
  },
];

const faqItems = [
  { 
    q: "Как быстро вы отвечаете?", 
    a: "В Telegram — обычно за 5-10 минут. На email — в течение дня." 
  },
  { 
    q: "Работаете ли вы по выходным?", 
    a: "Да, мы на связи каждый день." 
  },
  { 
    q: "Можно ли задать вопрос перед покупкой?", 
    a: "Конечно! Напишите нам в Telegram, с радостью ответим." 
  },
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero с фоновым изображением */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Frameolen.jpg"
            alt="Contact atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a]/60 via-[#0a0c0a]/50 to-[#0a0c0a]" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-12 h-12 z-20 opacity-40">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <path d="M0 24 L0 0 L24 0" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" fill="none" />
            <circle cx="12" cy="12" r="6" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-12 h-12 z-20 opacity-40">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <path d="M24 0 L48 0 L48 24" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" fill="none" />
            <circle cx="36" cy="12" r="6" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8fb583]/50" />
              <span className="text-xs uppercase tracking-[0.4em] text-[#8fb583]">Контакты</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8fb583]/50" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-6">
              Свяжитесь с нами
            </h1>
            
            <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Есть вопрос? Мы всегда рады помочь.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Contact Cards Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0c0e0c] to-[#0a0c0a]" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#4a6741]/[0.05] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left: Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8fb583]/60">Каналы связи</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#8fb583]/30 to-transparent" />
              </div>

              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.title}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group relative block rounded-2xl p-6 transition-all duration-500 ${
                      contact.accent 
                        ? 'bg-gradient-to-br from-[#4a6741]/20 to-[#4a6741]/10 border border-[#4a6741]/30 hover:border-[#8fb583]/40' 
                        : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-[#8fb583]/20'
                    }`}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-2 left-2 w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                      <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
                        <path d="M0 6 L0 0 L6 0" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                      </svg>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                      <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
                        <path d="M6 0 L12 0 L12 6" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center ${
                        contact.accent ? 'bg-[#8fb583]/20' : 'bg-white/[0.05]'
                      } group-hover:scale-110 transition-transform duration-500`}>
                        <div className="w-6 h-6 text-[#8fb583]">
                          <Icon />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-heading text-white mb-1 group-hover:text-[#8fb583] transition-colors duration-300">
                          {contact.title}
                        </h3>
                        <p className="text-[#8fb583] text-sm mb-1">{contact.value}</p>
                        <p className="text-white/40 text-xs">{contact.description}</p>
                      </div>
                      <div className="w-5 h-5 text-white/30 group-hover:text-[#8fb583] group-hover:translate-x-1 transition-all duration-300">
                        <ArrowRightIcon />
                      </div>
                    </div>
                  </motion.a>
                );
              })}

              {/* Response time card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 mt-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8fb583]/10 flex items-center justify-center">
                    <div className="w-5 h-5 text-[#8fb583]">
                      <ClockIcon />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Время ответа</p>
                    <p className="text-[#8fb583] text-lg font-heading">5-10 минут</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8">
                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-5 h-5 opacity-40">
                  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                    <path d="M0 10 L0 0 L10 0" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                    <circle cx="5" cy="5" r="2.5" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
                <div className="absolute top-3 right-3 w-5 h-5 opacity-40">
                  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                    <path d="M10 0 L20 0 L20 10" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                    <circle cx="15" cy="5" r="2.5" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 w-5 h-5 opacity-40">
                  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                    <path d="M0 10 L0 20 L10 20" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className="absolute bottom-3 right-3 w-5 h-5 opacity-40">
                  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                    <path d="M10 20 L20 20 L20 10" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8fb583]/60">Написать нам</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#8fb583]/30 to-transparent" />
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">Имя</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                          placeholder="Ваше имя"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">Сообщение</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors resize-none h-28"
                        placeholder="Ваше сообщение..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-full overflow-hidden disabled:opacity-50"
                    >
                      {/* Button background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4a6741] to-[#3d5636] group-hover:from-[#5a7a4f] group-hover:to-[#4a6741] transition-all duration-300" />
                      
                      {/* Inner highlight */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {isLoading ? (
                        <span className="relative z-10 text-white">Отправка...</span>
                      ) : (
                        <>
                          <span className="relative z-10 font-medium text-white">Отправить</span>
                          <div className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRightIcon />
                          </div>
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
                      <div className="w-8 h-8 text-[#8fb583]">
                        <CheckIcon />
                      </div>
                    </div>
                    <h3 className="text-xl font-heading text-white mb-2">Сообщение отправлено</h3>
                    <p className="text-white/40">Мы ответим вам в ближайшее время</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Background Image */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-21T185324.383.jfif"
            alt="FAQ background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a]/95 via-[#0a0c0a]/90 to-[#0a0c0a]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#8fb583]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8fb583]/60">FAQ</span>
              <div className="w-8 h-px bg-[#8fb583]/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white">
              Частые вопросы
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.05] hover:border-[#8fb583]/20 transition-all duration-500"
              >
                {/* Corner accent on hover */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                    <path d="M16 0 L32 0 L32 16" stroke="rgba(143,181,131,0.4)" strokeWidth="0.5" />
                  </svg>
                </div>
                
                <h4 className="text-white font-medium mb-2 group-hover:text-[#8fb583] transition-colors duration-300">
                  {item.q}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

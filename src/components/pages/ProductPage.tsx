"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons
const CeramicIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <ellipse cx="32" cy="48" rx="20" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 48 C12 36, 20 28, 32 28 C44 28, 52 36, 52 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="32" cy="28" rx="8" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M32 20 L32 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle cx="32" cy="12" r="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
  </svg>
);

const HerbIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 56 L32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 40 C24 40, 18 34, 18 26 C18 18, 24 12, 32 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M32 40 C40 40, 46 34, 46 26 C46 18, 40 12, 32 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M32 32 C28 32, 24 28, 24 24" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M32 32 C36 32, 40 28, 40 24" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

const CardsIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="16" y="12" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="20" y="16" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M24 28 L36 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M24 34 L32 34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <circle cx="30" cy="44" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M21 5 L2 11 L9 13 L11 20 L14 15 L19 19 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M9 13 L19 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 22 C12 22, 4 16, 4 10 C4 4, 12 2, 12 2 C12 2, 20 4, 20 10 C20 16, 12 22, 12 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 22 L12 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Pill Tag component
const PillTag = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`
    inline-flex items-center px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em]
    border transition-all duration-300
    ${active 
      ? 'border-[#8fb583]/40 text-[#8fb583] bg-[#8fb583]/5' 
      : 'border-white/10 text-white/40 hover:border-white/20'
    }
  `}>
    {children}
  </span>
);

const productDetails = [
  {
    icon: CeramicIcon,
    title: "Керамическая подставка",
    description: "Ручная работа из глины. Безопасно удерживает тлеющую скрутку.",
    features: ["Ручная работа", "Термостойкая глина", "Уникальный дизайн"],
  },
  {
    icon: HerbIcon,
    title: "Травяная скрутка",
    description: "Натуральная смесь лаванды, шалфея и полыни. Мягкий аромат.",
    features: ["Натуральные травы", "10-15 сеансов", "Безопасное тление"],
  },
  {
    icon: CardsIcon,
    title: "30 карточек",
    description: "Вопросы для ежедневной практики самопознания.",
    features: ["30 вопросов", "Плотная бумага", "Минималистичный дизайн"],
  },
];

const atmosphereItems = [
  "Декоративный мох — создаёт атмосферу леса",
  "Льняные мешочки — для хранения карточек",
  "Письмо к покупателю — личное послание",
  "Карта разрешения — напоминание о праве на паузу",
  "Инструкция — как провести первый ритуал",
];

export default function ProductPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0a0c0a]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4a6741]/[0.08] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 text-[#8fb583]/30">
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M8 28 L32 40 L56 28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                      <circle cx="24" cy="32" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <p className="text-white/30 text-sm">Фото набора TLEYOU</p>
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 0 L32 0 L32 12" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 20 L0 32 L12 32" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 32 L32 32 L32 20" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#8fb583]/50" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#8fb583]">Набор TLEYOU</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-6">
                Ритуал возвращения к себе
              </h1>
              
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Всё необходимое для 30 дней практики самопознания. Минималистичный набор без лишнего — только то, что работает.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-white/40 line-through text-lg">4 990 ₽</span>
                <span className="text-4xl font-heading font-light text-[#8fb583]">4 490 ₽</span>
                <span className="text-xs uppercase tracking-wider text-white/40 bg-white/5 px-3 py-1 rounded-full">
                  -10%
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://t.me/tleyou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300"
                >
                  <span className="font-medium">Заказать набор</span>
                  <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowIcon />
                  </div>
                </a>
                <a
                  href="https://t.me/tleyou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
                >
                  <div className="w-5 h-5">
                    <TelegramIcon />
                  </div>
                  <span>Задать вопрос</span>
                </a>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                <PillTag>Бесплатная доставка</PillTag>
                <PillTag>Возврат 14 дней</PillTag>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f120e]/50 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mb-6" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#8fb583] mb-4 block">Что внутри</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white">
              Три элемента ритуала
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-[#8fb583]/20 transition-all duration-500"
                >
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-12 h-12">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 0 L48 0 L48 24" stroke="rgba(143,181,131,0.15)" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="w-16 h-16 text-[#8fb583] mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon />
                  </div>
                  
                  <h3 className="text-xl font-heading font-light text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">{item.description}</p>
                  
                  <ul className="space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/40">
                        <div className="w-4 h-4 text-[#8fb583]">
                          <CheckIcon />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Atmosphere */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a6741]/[0.05] to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#8fb583]/50" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#8fb583]">Атмосфера</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-light text-white mb-6">
                Детали, которые создают настроение
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Помимо основных элементов, в набор входят детали, которые делают распаковку особенным моментом.
              </p>

              <ul className="space-y-4">
                {atmosphereItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 text-[#8fb583] mt-0.5 flex-shrink-0">
                      <LeafIcon />
                    </div>
                    <span className="text-white/70">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#4a6741]/10 to-transparent"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 text-[#8fb583]/20">
                  <LeafIcon />
                </div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/[0.05] rounded-full" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-[#8fb583]/[0.08] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f120e] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4a6741]/[0.1] rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mb-6" />
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white mb-6">
              Готова начать?
            </h2>
            <p className="text-lg text-white/50 mb-10">
              10 минут в день могут изменить всё
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://t.me/tleyou"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300"
              >
                <span className="font-medium">Заказать за 4 490 ₽</span>
                <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowIcon />
                </div>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30 uppercase tracking-wider">
              <span>✓ Бесплатная доставка</span>
              <span>✓ Безопасная оплата</span>
              <span>✓ Гарантия 30 дней</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

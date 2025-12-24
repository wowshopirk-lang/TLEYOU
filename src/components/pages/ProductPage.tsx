"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  CeramicIcon, 
  HerbIcon, 
  CardsIcon, 
  CheckIcon, 
  ArrowRightIcon, 
  TelegramIcon, 
  LeafIcon 
} from "@/components/ui/Icons";

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
      {/* Hero Section with background image */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Mossy Forest.jfif"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/95" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm"
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
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Набор TLEYOU</span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
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
                  href="https://t.me/tleyouself"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 font-medium">Заказать набор</span>
                  <div className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRightIcon />
                  </div>
                </a>
                <a
                  href="https://t.me/tleyouself"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-5 h-5">
                    <TelegramIcon />
                  </div>
                  <span>Задать вопрос</span>
                </a>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-3 text-xs text-white/40">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 text-[#8fb583]"><CheckIcon /></div>
                  Бесплатная доставка
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 text-[#8fb583]"><CheckIcon /></div>
                  Возврат 14 дней
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside - gradient background */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background - gradient only */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Что внутри</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
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
                  className="group relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-[#8fb583]/20 transition-all duration-500"
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

      {/* Atmosphere - with background image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-24T131815.981.jfif"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/95" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Атмосфера</span>
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
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm"
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

      {/* CTA - gradient background */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background - gradient only */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Начать</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white mb-6">
              Готова начать?
            </h2>
            <p className="text-lg text-white/50 mb-10">
              10 минут в день могут изменить всё
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://t.me/tleyouself"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-medium">Заказать за 4 490 ₽</span>
                <div className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRightIcon />
                </div>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 text-[#8fb583]"><CheckIcon /></div>
                Бесплатная доставка
              </span>
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 text-[#8fb583]"><CheckIcon /></div>
                Безопасная оплата
              </span>
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 text-[#8fb583]"><CheckIcon /></div>
                Гарантия 30 дней
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

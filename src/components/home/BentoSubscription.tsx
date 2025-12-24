"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { AwakeningIcon, GiftPackageIcon, ContinuityIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/Icons";

const pricingOptions = [
  {
    id: "free",
    title: "Карточка дня",
    subtitle: "Попробовать",
    price: "0 ₽",
    priceNote: "бесплатно",
    description: "Начни знакомство с TLEYOU",
    features: [
      "Карточка с вопросом",
      "Мини-медитация",
      "Доступ в Telegram",
    ],
    cta: "Получить",
    ctaLink: "/card-of-day",
    icon: AwakeningIcon,
    highlight: false,
  },
  {
    id: "set",
    title: "Набор TLEYOU",
    subtitle: "Рекомендуем",
    price: "4 490 ₽",
    priceNote: "−10% через сайт",
    originalPrice: "4 990 ₽",
    description: "Всё для твоего ритуала",
    features: [
      "Керамическая подставка",
      "Травяная скрутка",
      "30 карточек для рефлексии",
      "Подробная инструкция",
      "Подарочная упаковка",
    ],
    cta: "Заказать",
    ctaLink: "/product",
    icon: GiftPackageIcon,
    highlight: true,
    badge: "Хит продаж",
  },
  {
    id: "subscription",
    title: "Подписка",
    subtitle: "Для практикующих",
    price: "500 ₽",
    priceNote: "в месяц",
    description: "Продолжай практику",
    features: [
      "Ежедневные практики",
      "Медитации и дыхание",
      "Новые карточки",
      "Закрытое сообщество",
    ],
    cta: "Оформить",
    ctaLink: "/subscription",
    icon: ContinuityIcon,
    highlight: false,
  },
];

export default function BentoSubscription() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden min-h-screen flex items-center">
      {/* Background - with image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/Без названия - 2025-12-21T185432.544.jfif"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/90" />
      </div>

      {/* Decorative circles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Large circle - top right */}
        <div className="absolute -top-32 -right-32 w-72 h-72 md:w-96 md:h-96">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
            <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="200" cy="200" r="100" stroke="rgba(143,181,131,0.04)" strokeWidth="0.5" />
          </svg>
        </div>
        
        {/* Medium circle - bottom left */}
        <div className="absolute -bottom-20 -left-20 w-56 h-56 md:w-72 md:h-72">
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
            <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            <circle cx="150" cy="150" r="80" stroke="rgba(143,181,131,0.05)" strokeWidth="0.5" strokeDasharray="3 6" />
          </svg>
        </div>
        
        {/* Curved line - left */}
        <svg className="absolute left-0 top-1/4 w-24 h-[400px] opacity-40" viewBox="0 0 80 400" fill="none">
          <path
            d="M80 0 C50 80, 30 160, 50 240 C70 320, 20 380, 40 400"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="50" cy="240" r="3" fill="rgba(143,181,131,0.2)" />
        </svg>
        
        {/* Small decorative dot */}
        <div className="absolute top-1/2 right-[15%] w-1.5 h-1.5 bg-[#90a955]/30 rounded-full" />
        <div className="absolute bottom-1/3 left-[10%] w-1 h-1 bg-white/10 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-[5] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="w-12 h-px bg-gradient-to-r from-transparent via-[#90a955]/60 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-[#90a955] mb-3">
            Выбери свой путь
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white mb-3">
            Три способа начать
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Попробуй бесплатно, закажи набор или оформи подписку
          </p>
          
          <motion.div 
            className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pricingOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative ${option.highlight ? 'md:-mt-2 md:mb-2' : ''}`}
              >
                {/* Card */}
                <div className={`relative h-full rounded-2xl p-5 md:p-6 flex flex-col transition-all duration-500 ${
                  option.highlight 
                    ? "bg-gradient-to-br from-[#4a6741] to-[#3a5232] text-white shadow-2xl shadow-[#4a6741]/30" 
                    : "bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.05]"
                }`}>
                  
                  {/* Badge */}
                  {option.badge && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#90a955] text-white text-[10px] font-medium shadow-lg">
                      {option.badge}
                    </div>
                  )}
                  
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                      <path d="M0 5 L0 0 L5 0" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 w-4 h-4">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                      <path d="M11 0 L16 0 L16 5" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-4 h-4">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                      <path d="M0 11 L0 16 L5 16" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                      <path d="M11 16 L16 16 L16 11" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 mb-4 ${option.highlight ? 'text-white/80' : 'text-[#90a955]'} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${option.highlight ? 'text-white/60' : 'text-white/40'}`}>
                    {option.subtitle}
                  </span>
                  
                  {/* Title */}
                  <h3 className={`text-lg md:text-xl font-heading font-medium mb-2 ${option.highlight ? 'text-white' : 'text-white'}`}>
                    {option.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-3">
                    {option.originalPrice && (
                      <span className="text-xs text-white/40 line-through mr-2">
                        {option.originalPrice}
                      </span>
                    )}
                    <span className={`text-2xl md:text-3xl font-heading font-light ${option.highlight ? 'text-white' : 'text-white'}`}>
                      {option.price}
                    </span>
                    <span className={`text-xs ml-2 ${option.highlight ? 'text-white/70' : 'text-[#90a955]'}`}>
                      {option.priceNote}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className={`text-xs md:text-sm mb-4 ${option.highlight ? 'text-white/70' : 'text-white/50'}`}>
                    {option.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className={`w-4 h-4 flex-shrink-0 mt-0.5 ${option.highlight ? 'text-white' : 'text-[#90a955]'}`}>
                          <CheckIcon />
                        </div>
                        <span className={`text-xs ${option.highlight ? 'text-white/85' : 'text-white/70'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Link
                    href={option.ctaLink}
                    className={`group/btn relative inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                      option.highlight 
                        ? 'bg-white text-[#4a6741] hover:bg-white/90' 
                        : 'bg-[#4a6741] text-white hover:bg-[#5a7a51]'
                    }`}
                  >
                    <span>{option.cta}</span>
                    <div className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300">
                      <ArrowRightIcon />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note with Ozon price */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-xs md:text-sm text-white/40 mb-3">
            На Ozon — 4 990 ₽ · Через сайт или Telegram — скидка 10%
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] md:text-xs text-white/30">
            <span>30 дней гарантия возврата</span>
            <span>·</span>
            <span>Безопасная оплата</span>
            <span>·</span>
            <span>Доставка по России</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

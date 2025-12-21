"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons - line style
const SparkleIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 4 L26 16 L38 18 L26 20 L24 32 L22 20 L10 18 L22 16 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <circle cx="38" cy="10" r="2" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="10" cy="28" r="1.5" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M8 16 L24 8 L40 16 L40 36 L24 44 L8 36 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <path d="M24 8 L24 44" stroke="currentColor" strokeWidth="1" />
    <path d="M8 16 L24 24 L40 16" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="2" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path 
      d="M24 40 C16 34, 8 26, 8 18 C8 12, 12 8, 18 8 C21 8, 23 10, 24 12 C25 10, 27 8, 30 8 C36 8, 40 12, 40 18 C40 26, 32 34, 24 40" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M24 36 C18 31, 12 25, 12 19" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
    <path d="M8 12 L11 15 L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
    icon: SparkleIcon,
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
    icon: PackageIcon,
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
    icon: HeartIcon,
    highlight: false,
  },
];

export default function BentoSubscription() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background - dark gradients like other sections */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0c0e0c]" />
        
        {/* Glow effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#4a6741]/[0.04] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#3d5a36]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#4a6741]/[0.02] rounded-full blur-[100px]" />
        
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
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
          className="text-center mb-16 md:mb-20"
        >
          <motion.div 
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#90a955]/60 to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-[#90a955] mb-4">
            Выбери свой путь
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white mb-4">
            Три способа начать
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Попробуй бесплатно, закажи набор или оформи подписку
          </p>
          
          <motion.div 
            className="w-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative ${option.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Card */}
                <div className={`relative h-full rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 ${
                  option.highlight 
                    ? "bg-gradient-to-br from-[#4a6741] to-[#3a5232] text-white shadow-2xl shadow-[#4a6741]/30" 
                    : "bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.05]"
                }`}>
                  
                  {/* Badge */}
                  {option.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#90a955] text-white text-xs font-medium shadow-lg">
                      {option.badge}
                    </div>
                  )}
                  
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-5 h-5">
                    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                      <path d="M0 6 L0 0 L6 0" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 w-5 h-5">
                    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                      <path d="M14 0 L20 0 L20 6" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-5 h-5">
                    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                      <path d="M0 14 L0 20 L6 20" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5">
                    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                      <path d="M14 20 L20 20 L20 14" stroke={option.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"} strokeWidth="1" fill="none" />
                    </svg>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 mb-5 ${option.highlight ? 'text-white/80' : 'text-[#90a955]'} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs uppercase tracking-[0.2em] mb-1 ${option.highlight ? 'text-white/60' : 'text-white/40'}`}>
                    {option.subtitle}
                  </span>
                  
                  {/* Title */}
                  <h3 className={`text-xl font-heading font-medium mb-3 ${option.highlight ? 'text-white' : 'text-white'}`}>
                    {option.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    {option.originalPrice && (
                      <span className="text-sm text-white/40 line-through mr-2">
                        {option.originalPrice}
                      </span>
                    )}
                    <span className={`text-3xl md:text-4xl font-heading font-light ${option.highlight ? 'text-white' : 'text-white'}`}>
                      {option.price}
                    </span>
                    <span className={`text-sm ml-2 ${option.highlight ? 'text-white/70' : 'text-[#90a955]'}`}>
                      {option.priceNote}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className={`text-sm mb-6 ${option.highlight ? 'text-white/70' : 'text-white/50'}`}>
                    {option.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 flex-shrink-0 mt-0.5 ${option.highlight ? 'text-white' : 'text-[#90a955]'}`}>
                          <CheckIcon />
                        </div>
                        <span className={`text-sm ${option.highlight ? 'text-white/85' : 'text-white/70'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Link
                    href={option.ctaLink}
                    className={`group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      option.highlight 
                        ? 'bg-white text-[#4a6741] hover:bg-white/90' 
                        : 'bg-[#4a6741] text-white hover:bg-[#5a7a51]'
                    }`}
                  >
                    <span>{option.cta}</span>
                    <div className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300">
                      <ArrowIcon />
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
          className="text-center mt-12"
        >
          <p className="text-sm text-white/40 mb-4">
            На Ozon — 4 990 ₽ · Через сайт или Telegram — скидка 10%
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/30">
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

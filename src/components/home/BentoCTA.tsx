"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons - Nature line style
const SparkleIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 8 L35 24 L51 27 L35 30 L32 46 L29 30 L13 27 L29 24 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <circle cx="48" cy="14" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="16" cy="40" r="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
    <path d="M32 52 L32 58" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M28 56 L36 56" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M12 22 L32 12 L52 22 L52 46 L32 56 L12 46 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M32 12 L32 56" stroke="currentColor" strokeWidth="1" />
    <path d="M12 22 L32 32 L52 22" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <circle cx="32" cy="34" r="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
    <path d="M22 17 L32 22 L42 17" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path 
      d="M32 54 C22 46, 12 36, 12 26 C12 18, 18 12, 26 12 C29 12, 31 14, 32 17 C33 14, 35 12, 38 12 C46 12, 52 18, 52 26 C52 36, 42 46, 32 54" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M32 48 C24 42, 18 34, 18 27" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <circle cx="26" cy="24" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.4" fill="none" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 3 L20 7 L20 13 C20 17 16 20 12 22 C8 20 4 17 4 13 L4 7 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none" />
    <path d="M9 12 L11 14 L15 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M21 5 L2 11 L9 13 L11 20 L14 15 L19 19 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M9 13 L19 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Pill Tag component - consistent with other sections
const PillTag = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`
    inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em]
    border transition-all duration-300
    ${active 
      ? 'border-[#8fb583]/40 text-[#8fb583]/80 bg-[#8fb583]/5' 
      : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
    }
  `}>
    {children}
  </span>
);

const ctaOptions = [
  {
    icon: PackageIcon,
    title: "Набор TLEYOU",
    price: "4 490 ₽",
    priceNote: "через сайт",
    originalPrice: "4 990 ₽",
    description: "Всё для твоего ритуала тишины",
    link: "/product",
    primary: true,
    badge: "Популярный",
  },
  {
    icon: HeartIcon,
    title: "Подписка",
    price: "500 ₽/мес",
    description: "Ежедневные практики и медитации",
    link: "/subscription",
    primary: false,
  },
  {
    icon: SparkleIcon,
    title: "Карточка дня",
    price: "Бесплатно",
    description: "Попробовать прямо сейчас",
    link: "/card-of-day",
    primary: false,
  },
];

const guarantees = [
  { text: "30 дней гарантия", icon: ShieldIcon },
  { text: "Безопасная оплата", icon: ShieldIcon },
  { text: "Доставка по России", icon: ShieldIcon },
];

export default function BentoCTA() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden min-h-screen flex items-center">
      {/* Background - dark gradient with nature image */}
      <div className="absolute inset-0 z-0">
        <div className="section-bg section-bg-cta" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a]/85 via-[#0f120e]/75 to-[#0c0e0c]/90" />
        
        {/* Additional glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#4a6741]/[0.06] rounded-full blur-[200px]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Large organic circle - top left */}
        <motion.div 
          className="absolute -top-32 -left-32 w-80 h-80 md:w-[500px] md:h-[500px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
            <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" strokeDasharray="6 10" />
            <circle cx="200" cy="200" r="100" stroke="rgba(143,181,131,0.04)" strokeWidth="0.5" />
          </svg>
        </motion.div>
        
        {/* Curved line - right side */}
        <motion.svg 
          className="absolute right-0 top-1/4 w-24 h-[350px] opacity-40"
          viewBox="0 0 80 350" 
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <path
            d="M80 0 C40 70, 60 140, 30 210 C10 270, 50 310, 80 350"
            stroke="rgba(144,169,85,0.3)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="30" cy="210" r="4" fill="rgba(144,169,85,0.4)" />
        </motion.svg>
        
        {/* Floating dots */}
        <div className="absolute top-1/3 left-[60%] w-2 h-2 bg-[#90a955]/30 rounded-full" />
        <div className="absolute top-[45%] left-[20%] w-1.5 h-1.5 bg-white/15 rounded-full" />
        <div className="absolute bottom-1/3 right-[25%] w-2.5 h-2.5 bg-[#90a955]/25 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-[5] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          {/* Decorative arrow down */}
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M10 0 L10 20 M4 14 L10 20 L16 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          
          {/* Pill tags */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PillTag active>НАЧАТЬ</PillTag>
            <PillTag>РИТУАЛ</PillTag>
            <PillTag>ТИШИНА</PillTag>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white/90 mb-3"
          >
            Начни сегодня
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base text-white/50 max-w-lg mx-auto leading-relaxed"
          >
            Всего 10 минут в день могут изменить всё
          </motion.p>
          
          {/* Quote annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 flex items-center justify-center gap-2"
          >
            <div className="w-1 h-1 rounded-full bg-[#8fb583]/40" />
            <svg width="24" height="2" viewBox="0 0 24 2">
              <line x1="0" y1="1" x2="24" y2="1" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
            </svg>
            <p className="text-xs md:text-sm text-white/30 italic">
              "Ты заслуживаешь эти 10 минут"
            </p>
            <svg width="24" height="2" viewBox="0 0 24 2">
              <line x1="0" y1="1" x2="24" y2="1" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
            </svg>
            <div className="w-1 h-1 rounded-full bg-[#8fb583]/40" />
          </motion.div>
        </motion.div>

        {/* CTA Options Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8"
        >
          {ctaOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Link key={option.title} href={option.link} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className={`relative h-full rounded-2xl text-center transition-all duration-500 ${
                    option.primary 
                      ? "bg-gradient-to-br from-[#4a6741] to-[#3a5232] shadow-2xl shadow-[#4a6741]/30 md:scale-105 hover:scale-[1.08]" 
                      : "bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#8fb583]/20 hover:scale-[1.02]"
                  }`}
                >
                  {/* Badge */}
                  {option.badge && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#90a955] text-white text-[10px] md:text-xs font-medium tracking-wide">
                      {option.badge}
                    </div>
                  )}
                  
                  {/* Card content with proper padding */}
                  <div className="p-5 md:p-6">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-5 h-5">
                      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                        <path d="M0 6 L0 0 L6 0" stroke={option.primary ? "rgba(255,255,255,0.3)" : "rgba(143,181,131,0.2)"} strokeWidth="1" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute top-0 right-0 w-5 h-5">
                      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                        <path d="M14 0 L20 0 L20 6" stroke={option.primary ? "rgba(255,255,255,0.3)" : "rgba(143,181,131,0.2)"} strokeWidth="1" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-5 h-5">
                      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                        <path d="M0 14 L0 20 L6 20" stroke={option.primary ? "rgba(255,255,255,0.3)" : "rgba(143,181,131,0.2)"} strokeWidth="1" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-5 h-5">
                      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                        <path d="M14 20 L20 20 L20 14" stroke={option.primary ? "rgba(255,255,255,0.3)" : "rgba(143,181,131,0.2)"} strokeWidth="1" fill="none" />
                      </svg>
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 ${
                      option.primary ? 'text-white' : 'text-[#90a955]'
                    }`}>
                      <Icon />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-heading font-light text-white mb-2">
                      {option.title}
                    </h3>
                    
                    {/* Price */}
                    <div className="mb-3">
                      {option.originalPrice && (
                        <span className="text-xs text-white/40 line-through mr-2">
                          {option.originalPrice}
                        </span>
                      )}
                      <span className={`text-xl md:text-2xl font-heading font-light ${option.primary ? 'text-white' : 'text-[#90a955]'}`}>
                        {option.price}
                      </span>
                      {option.priceNote && (
                        <span className="block text-[10px] md:text-xs text-white/50 mt-1">
                          {option.priceNote}
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className={`text-xs md:text-sm mb-4 ${option.primary ? 'text-white/70' : 'text-white/50'}`}>
                      {option.description}
                    </p>
                    
                    {/* Arrow button */}
                    <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 ${
                      option.primary ? 'bg-white/20 border border-white/30' : 'bg-white/5 border border-white/10'
                    }`}>
                      <div className="w-4 h-4 text-white">
                        <ArrowIcon />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-5 mb-6"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M0 5 L0 0 L5 0" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M11 0 L16 0 L16 5" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 text-[#8fb583]">
                    <Icon />
                  </div>
                  <span className="text-xs md:text-sm text-white/50">{guarantee.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Telegram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /></svg>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/30">Есть вопросы?</span>
            <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /></svg>
            <div className="w-1 h-1 rounded-full bg-white/20" />
          </div>
          
          <p className="text-white/40 mb-4 text-xs md:text-sm">
            Ответим за 5 минут
          </p>
          
          <a
            href="https://t.me/tleyou"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:bg-white/5 hover:text-white hover:border-[#8fb583]/30 transition-all duration-300 text-xs md:text-sm"
          >
            <div className="w-4 h-4 group-hover:scale-110 transition-transform duration-300">
              <TelegramIcon />
            </div>
            <span>Написать в Telegram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// Circular Diagram Component - inspired by reference design
const CircularDiagram = () => {
  const items = [
    { label: "ДИВЕРСИФИКАЦИЯ", sublabel: "ЭНЕРГИИ", position: "top" },
    { label: "СТАБИЛЬНЫЙ", sublabel: "РИТУАЛ", position: "left" },
    { label: "ЗДОРОВОЕ", sublabel: "МЫШЛЕНИЕ", position: "right" },
    { label: "РАБОТА", sublabel: "С СОБОЙ", position: "bottom" },
  ];

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
      {/* Main circle */}
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Outer circle */}
        <circle cx="200" cy="200" r="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        {/* Inner circle */}
        <circle cx="200" cy="200" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none" />
        {/* Center circle */}
        <circle cx="200" cy="200" r="35" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
        
        {/* Cross arrows */}
        <path d="M200 80 L200 100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <path d="M200 300 L200 320" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <path d="M80 200 L100 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <path d="M300 200 L320 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        
        {/* Arrow markers definition */}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="rgba(255,255,255,0.2)" />
          </marker>
        </defs>
        
        {/* Connection dots */}
        <circle cx="200" cy="20" r="5" fill="rgba(255,255,255,0.3)" />
        <circle cx="200" cy="380" r="5" fill="rgba(255,255,255,0.3)" />
        <circle cx="20" cy="200" r="5" fill="rgba(255,255,255,0.3)" />
        <circle cx="380" cy="200" r="5" fill="rgba(255,255,255,0.3)" />
      </svg>
      
      {/* Labels */}
      {/* Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 md:-translate-y-12 text-center px-2">
        <span className="block text-sm md:text-base uppercase tracking-widest text-white/60 mb-0.5">{items[0].label}</span>
        <span className="block text-xs md:text-sm uppercase tracking-wide text-white/40">{items[0].sublabel}</span>
      </div>
      {/* Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 md:translate-y-12 text-center px-2">
        <span className="block text-sm md:text-base uppercase tracking-widest text-white/60 mb-0.5">{items[3].label}</span>
        <span className="block text-xs md:text-sm uppercase tracking-wide text-white/40">{items[3].sublabel}</span>
      </div>
      {/* Left */}
      <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 text-right pr-5 md:pr-6 max-w-[120px]">
        <span className="block text-sm md:text-base uppercase tracking-widest text-white/60 mb-0.5">{items[1].label}</span>
        <span className="block text-xs md:text-sm uppercase tracking-wide text-white/40">{items[1].sublabel}</span>
      </div>
      {/* Right */}
      <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 text-left pl-5 md:pl-6 max-w-[120px]">
        <span className="block text-sm md:text-base uppercase tracking-widest text-white/60 mb-0.5">{items[2].label}</span>
        <span className="block text-xs md:text-sm uppercase tracking-wide text-white/40">{items[2].sublabel}</span>
      </div>
      
      {/* Center icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-white/40">
          <circle cx="20" cy="20" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

// Connected Vertical Bubbles for product items
const ProductBubbles = () => {
  const items = [
    { 
      title: "КЕРАМИЧЕСКАЯ ПОДСТАВКА", 
      description: "Ручная работа",
      filled: false,
      annotation: "основа ритуала"
    },
    { 
      title: "ТРАВЯНАЯ СКРУТКА", 
      description: "Лаванда, шалфей",
      filled: false,
      annotation: null
    },
    { 
      title: "30 КАРТОЧЕК", 
      description: "Вопросы для рефлексии",
      filled: true,
      fillColor: "rgba(180,155,120,0.4)",
      annotation: "главный инструмент"
    },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Vertical line */}
      <div className="absolute top-12 bottom-12 left-1/2 w-px bg-white/10 -translate-x-1/2" />
      
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative z-10 my-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          {/* Bubble */}
          <div className="relative group cursor-pointer">
            <svg width="220" height="130" viewBox="0 0 220 130" className="transition-transform duration-300 group-hover:scale-105">
              {/* Pill shape */}
              <rect 
                x="5" y="5" 
                width="210" height="120" 
                rx="60" 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth="1" 
                fill={item.filled ? item.fillColor : "rgba(255,255,255,0.02)"}
                className="transition-all duration-300 group-hover:stroke-[rgba(143,181,131,0.3)]"
              />
            </svg>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-4">
              <span className={`text-xs md:text-sm uppercase tracking-[0.12em] mb-1.5 leading-tight transition-colors duration-300 max-w-[85%] ${item.filled ? 'text-white/90' : 'text-white/60 group-hover:text-white/80'}`}>
                {item.title}
              </span>
              <span className="text-[11px] md:text-xs text-white/40">{item.description}</span>
            </div>
          </div>
          
          {/* Annotation */}
          {item.annotation && (
            <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2 ${index === 0 ? 'right-full mr-3' : 'left-full ml-3'}`}>
              {index !== 0 && <div className="w-1 h-1 rounded-full bg-white/30" />}
              {index !== 0 && <svg width="16" height="2"><line x1="0" y1="1" x2="16" y2="1" stroke="rgba(255,255,255,0.2)" strokeWidth="1" /></svg>}
              <span className="text-xs md:text-sm text-white/40 italic whitespace-nowrap">{item.annotation}</span>
              {index === 0 && <svg width="16" height="2"><line x1="0" y1="1" x2="16" y2="1" stroke="rgba(255,255,255,0.2)" strokeWidth="1" /></svg>}
              {index === 0 && <div className="w-1 h-1 rounded-full bg-white/30" />}
            </div>
          )}
          
          {/* Connection dot */}
          {index < items.length - 1 && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Arrow icon
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Pill Tag
const PillTag = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`
    inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm uppercase tracking-[0.15em]
    border transition-all duration-300
    ${active 
      ? 'border-[#8fb583]/40 text-[#8fb583]/80 bg-[#8fb583]/5' 
      : 'border-white/10 text-white/40 hover:border-white/20'
    }
  `}>
    {children}
  </span>
);

const comparisonData = {
  without: [
    "Засыпаешь с телефоном",
    "Бесконечный список дел",
    "На автопилоте",
    "Нет времени на себя",
  ],
  with: [
    "Засыпаешь с благодарностью",
    "Ясность мыслей",
    "Присутствуешь в моменте",
    "10 минут тишины",
  ],
};

export default function BentoFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacityProgress = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.7]);

  return (
    <section 
      ref={sectionRef}
      id="features"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image - Woman silhouette */}
      <div className="section-bg section-bg-social" />
      <div className="bg-overlay-warm" />
      
      {/* Background */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/80 via-[#101310]/60 to-[#0a0c0a]/80" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#4a6741]/[0.06] rounded-full blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Large decorative circle - background */}
      <motion.div 
        className="absolute -top-40 -right-40 w-[500px] h-[500px] z-[2] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <circle cx="250" cy="250" r="220" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
          <circle cx="250" cy="250" r="180" stroke="rgba(143,181,131,0.02)" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-[5] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: opacityProgress }}
      >
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Down arrow */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <path d="M10 0 L10 24 M4 18 L10 24 L16 18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-[#8fb583]/60 mb-4">
            Что внутри
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white/90 mb-4">
            Набор TLEYOU
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-6">
            Всё необходимое для ежедневного ритуала
          </p>
          
          {/* Pill tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <PillTag active>КЕРАМИКА</PillTag>
            <PillTag>ТРАВЫ</PillTag>
            <PillTag>КАРТОЧКИ</PillTag>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Product bubbles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ProductBubbles />
          </motion.div>

          {/* Right - Circular diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="text-center mb-6">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40">Баланс жизни</span>
            </div>
            <CircularDiagram />
            <p className="text-center mt-6 text-xs text-white/40 italic">
              Ритуал как точка равновесия в ежедневном хаосе
            </p>
          </motion.div>
        </div>

        {/* Price card with comparison */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M0 10 L0 0 L10 0" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M22 0 L32 0 L32 10" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M0 22 L0 32 L10 32" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M22 32 L32 32 L32 22" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Price */}
              <div className="flex flex-col items-center justify-center text-center lg:border-r border-white/[0.06] lg:pr-10">
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mb-3">Цена набора</span>
                <div className="mb-4">
                  <span className="text-sm text-white/40 line-through mr-2">4 990 ₽</span>
                  <span className="text-4xl md:text-5xl font-heading font-light text-white">4 490 ₽</span>
                </div>
                <span className="text-xs text-[#8fb583]/70 mb-6">при заказе через сайт</span>
                
                <Link
                  href="/product"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#4a6741]/40 hover:bg-[#4a6741]/60 border border-[#8fb583]/30 hover:border-[#8fb583]/50 rounded-full text-white text-sm transition-all duration-300"
                >
                  <span>Заказать</span>
                  <div className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowIcon />
                  </div>
                </Link>
              </div>

              {/* Comparison */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Without */}
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/30 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="w-4 h-px bg-white/10" />
                    Без ритуала
                    <span className="w-4 h-px bg-white/10" />
                  </p>
                  <div className="space-y-3">
                    {comparisonData.without.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-4 h-4 flex-shrink-0">
                          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full text-red-400/50">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                            <path d="M5 5 L11 11 M11 5 L5 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="text-sm text-white/40 line-through">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* With */}
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#8fb583]/70 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="w-4 h-px bg-[#8fb583]/20" />
                    С TLEYOU
                    <span className="w-4 h-px bg-[#8fb583]/20" />
                  </p>
                  <div className="space-y-3">
                    {comparisonData.with.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-4 h-4 flex-shrink-0">
                          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full text-[#8fb583]">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                            <path d="M5 8 L7 10 L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-sm text-white/70">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1" /></svg>
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/40">Попробуй бесплатно</span>
            <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1" /></svg>
            <div className="w-1 h-1 rounded-full bg-white/20" />
          </div>
          
          <Link
            href="/card-of-day"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
          >
            Получить карточку дня
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

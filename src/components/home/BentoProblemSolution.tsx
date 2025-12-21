"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// Connected Circles Flow Component - inspired by reference designs
const ConnectedCirclesFlow = () => {
  const steps = [
    { 
      label: "ЧТО СЕЙЧАС",
      text: "Бесконечный поток мыслей", 
      filled: false,
      annotation: "стартовая точка",
      annotationSide: "right"
    },
    { 
      label: "ПРОЦЕСС",
      text: "Ритуал возвращения к себе", 
      filled: false,
      annotation: "трезвая оценка",
      annotationSide: "left"
    },
    { 
      label: "ПРАКТИКА",
      text: "10 минут тишины в день", 
      filled: true,
      fillColor: "rgba(143,181,131,0.3)",
      annotation: null,
      annotationSide: null
    },
    { 
      label: "РЕЗУЛЬТАТ",
      text: "Ясность и внутренний покой", 
      filled: true,
      fillColor: "rgba(180,155,120,0.5)",
      annotation: "понимание для будущего",
      annotationSide: "right"
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-between h-full py-0">
      {/* Vertical connecting line */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full" viewBox="0 0 4 700" preserveAspectRatio="none">
        <line x1="2" y1="100" x2="2" y2="600" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>
      
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
        >
          {/* Left annotation */}
          {step.annotation && step.annotationSide === "left" && (
            <div className="absolute right-full mr-4 md:mr-5 flex items-center gap-2">
              <span className="text-xs md:text-sm text-white/40 italic tracking-wide whitespace-nowrap">
                {step.annotation}
              </span>
              <svg width="24" height="2" viewBox="0 0 24 2">
                <line x1="0" y1="1" x2="24" y2="1" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          )}
          
          {/* Circle */}
          <div className="relative">
            {/* Outer ring */}
            <svg width="180" height="180" viewBox="0 0 180 180" className="w-40 h-40 md:w-44 md:h-44">
              <circle 
                cx="90" 
                cy="90" 
                r="85" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1" 
                fill={step.filled ? step.fillColor : "none"}
              />
              {/* Inner decorative circle */}
              {!step.filled && (
                <circle 
                  cx="90" 
                  cy="90" 
                  r="68" 
                  stroke="rgba(255,255,255,0.08)" 
                  strokeWidth="0.5" 
                  strokeDasharray="3 5"
                  fill="none"
                />
              )}
            </svg>
            
            {/* Text inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-5 md:px-5 md:py-6 text-center">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/40 mb-2">
                {step.label}
              </span>
              <span className={`text-xs md:text-sm leading-snug font-light max-w-[90%] ${step.filled ? 'text-white/90' : 'text-white/60'}`}>
                {step.text}
              </span>
            </div>
          </div>
          
          {/* Right annotation */}
          {step.annotation && step.annotationSide === "right" && (
            <div className="absolute left-full ml-4 md:ml-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <svg width="24" height="2" viewBox="0 0 24 2">
                <line x1="0" y1="1" x2="24" y2="1" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              </svg>
              <span className="text-xs md:text-sm text-white/40 italic tracking-wide whitespace-nowrap">
                {step.annotation}
              </span>
            </div>
          )}
          
          {/* Connection dot below (except last) */}
          {index < steps.length - 1 && (
            <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Pill tag component
const PillTag = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`
    inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm uppercase tracking-[0.2em]
    border transition-all duration-300
    ${active 
      ? 'border-[#8fb583]/40 text-[#8fb583]/80 bg-[#8fb583]/5' 
      : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
    }
  `}>
    {children}
  </span>
);

export default function BentoProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-12 md:py-16 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Image - Mossy tree looking up */}
      <div className="section-bg section-bg-solution" />
      <div className="bg-overlay-dark" />
      
      {/* Background accents */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#111410]/50 to-[#0a0c0a]/80" />
        
        {/* Glow behind solution */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] bg-[#4a6741]/[0.05] rounded-full blur-[180px]" />
        
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Large decorative circle - right background */}
      <motion.div 
        className="absolute top-1/4 -right-40 w-[400px] h-[400px] z-[2] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" stroke="rgba(143,181,131,0.03)" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </motion.div>

      {/* Curved decorative line - left */}
      <motion.svg 
        className="absolute left-0 top-1/4 w-24 h-[400px] z-[2] pointer-events-none"
        viewBox="0 0 80 400" 
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <path
          d="M80 0 C50 60, 30 120, 50 200 C70 280, 20 340, 40 400"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="50" cy="200" r="3" fill="rgba(143,181,131,0.2)" />
      </motion.svg>

      {/* Content */}
      <motion.div
        className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
        style={{ opacity: opacityProgress }}
      >
        {/* Header with pill tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          {/* Decorative arrow down */}
          <motion.div 
            className="flex justify-center mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M10 0 L10 20 M5 15 L10 20 L15 15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          
          {/* Pill tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <PillTag active>ОСОЗНАННОСТЬ</PillTag>
            <PillTag>ТИШИНА</PillTag>
            <PillTag>РЕФЛЕКСИЯ</PillTag>
          </div>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-light text-white/90 mb-2 uppercase tracking-wide">
            Путь к себе
          </h2>
          <p className="text-xs md:text-sm text-white/50 max-w-md mx-auto leading-relaxed">
            От хаоса к ясности через простой ежедневный ритуал
          </p>
        </motion.div>

        {/* Main content - Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-stretch">
          {/* Left - Connected Circles Flow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full flex items-center"
          >
            <ConnectedCirclesFlow />
          </motion.div>

          {/* Right - Solution card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-stretch"
          >
            {/* Solution frame */}
            <div className="relative border border-white/[0.08] rounded-2xl p-8 md:p-10 bg-white/[0.02] w-full flex flex-col justify-center">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M0 8 L0 0 L8 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M16 0 L24 0 L24 8" stroke="rgba(143,181,131,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M0 16 L0 24 L8 24" stroke="rgba(143,181,131,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M16 24 L24 24 L24 16" stroke="rgba(143,181,131,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Label */}
              <span className="inline-block text-xs md:text-sm uppercase tracking-[0.3em] text-[#8fb583]/70 mb-6">
                Решение
              </span>
              
              {/* Logo */}
              <div className="flex justify-start mb-6">
                <img
                  src="/images/logo/tleyou-logo-white.svg"
                  alt="TLEYOU"
                  className="h-10 md:h-12 w-auto"
                />
              </div>
              
              {/* Description */}
              <p className="text-base md:text-lg text-white/70 mb-4 leading-relaxed font-heading font-light">
                Твой ежедневный ритуал тишины
              </p>
              
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                10 минут для себя каждый день.
                <span className="block mt-2 text-white/30">Травяная скрутка · Карточка с вопросом · Ты</span>
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/[0.06]">
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-heading font-light text-white/90">10</span>
                  <span className="text-xs uppercase tracking-widest text-white/40">минут</span>
                </div>
                <div className="w-px h-10 bg-white/[0.1]" />
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-heading font-light text-white/90">30</span>
                  <span className="text-xs uppercase tracking-widest text-white/40">карточек</span>
                </div>
                <div className="w-px h-10 bg-white/[0.1]" />
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-heading font-light text-white/90">∞</span>
                  <span className="text-xs uppercase tracking-widest text-white/40">спокойствие</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/product"
                  className="group relative inline-flex items-center gap-3 px-6 py-3 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-sm tracking-wide">Узнать о наборе</span>
                  <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
                >
                  Что внутри
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom quote with annotation style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#8fb583]/40" />
          <svg width="40" height="2" viewBox="0 0 40 2">
            <line x1="0" y1="1" x2="40" y2="1" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
          </svg>
          <p className="text-sm text-white/40 italic">
            Каждый день ты отдаёшь себя другим. А на себя не остаётся ни времени, ни сил.
          </p>
          <svg width="40" height="2" viewBox="0 0 40 2">
            <line x1="0" y1="1" x2="40" y2="1" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
          </svg>
          <div className="w-1.5 h-1.5 rounded-full bg-[#8fb583]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

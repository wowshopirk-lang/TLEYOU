"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LeafIcon, HeartIcon, SparkleIcon, ArrowRightIcon, QuoteIcon, EnergyIcon } from "@/components/ui/Icons";

const values = [
  {
    icon: LeafIcon,
    title: "Простота",
    description: "Убираем лишнее, оставляем суть. Никаких сложных практик — только то, что работает.",
  },
  {
    icon: HeartIcon,
    title: "Забота",
    description: "Каждый элемент создан с любовью к тебе и твоему времени тишины.",
  },
  {
    icon: SparkleIcon,
    title: "Честность",
    description: "Мы не обещаем чудес. Мы предлагаем ежедневный ритуал возвращения к себе.",
  },
];

const timeline = [
  { year: "01", title: "Идея", description: "Личная потребность в тишине стала началом TLEYOU" },
  { year: "02", title: "Создание", description: "Месяцы поиска идеальных материалов и формулировок" },
  { year: "03", title: "Запуск", description: "Первые наборы нашли своих владельцев" },
  { year: "04", title: "Сообщество", description: "Тысячи женщин практикуют тишину каждый день" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero с фоновым изображением */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-21T185051.459.jfif"
            alt="TLEYOU atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a]/70 via-[#0a0c0a]/50 to-[#0a0c0a]" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 z-20 opacity-40">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path d="M0 32 L0 0 L32 0" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" fill="none" />
            <circle cx="16" cy="16" r="8" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-16 h-16 z-20 opacity-40">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path d="M32 0 L64 0 L64 32" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" fill="none" />
            <circle cx="48" cy="16" r="8" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-8 left-8 w-16 h-16 z-20 opacity-40">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path d="M0 32 L0 64 L32 64" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16 z-20 opacity-40">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <path d="M32 64 L64 64 L64 32" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" fill="none" />
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
              <span className="text-xs uppercase tracking-[0.4em] text-[#8fb583]">О бренде</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8fb583]/50" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-light text-white mb-8 leading-tight">
              Ритуал<br />
              <span className="text-[#8fb583]/80">возвращения к себе</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
              TLEYOU — это набор для ежедневной практики тишины. 
              10 минут в день, чтобы услышать себя.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Листай</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Story Section */}
      <section id="story" className="relative py-20 md:py-32 overflow-hidden">
        {/* Background - gradient only */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>

        <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Left: Story cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full flex items-center"
            >
              <div className="space-y-4 w-full">
                {/* Story intro card */}
                <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8">
                  {/* Corner decorations */}
                  <div className="absolute top-2 left-2 w-4 h-4 opacity-40">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                      <path d="M0 8 L0 0 L8 0" stroke="rgba(143,181,131,0.5)" strokeWidth="0.5" />
                    </svg>
                  </div>
                  <div className="absolute top-2 right-2 w-4 h-4 opacity-40">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                      <path d="M8 0 L16 0 L16 8" stroke="rgba(143,181,131,0.5)" strokeWidth="0.5" />
                    </svg>
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8fb583]/60 mb-4 block">История</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-light text-white mb-4">
                    Как всё началось
                  </h2>
                  <p className="text-white/50 leading-relaxed">
                    TLEYOU родился из личной потребности в тишине. В мире, где телефон звонит каждые 5 минут, 
                    найти 10 минут для себя — уже победа.
                  </p>
                </div>

                {/* Name meaning card */}
                <div className="relative bg-[#4a6741]/10 border border-[#4a6741]/20 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8fb583]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 text-[#8fb583]">
                        <EnergyIcon />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-white mb-2">Почему TLEYOU?</h3>
                      <p className="text-[#8fb583]/80 italic text-sm leading-relaxed">
                        «Тлеет» (горит тихо, без пламени) + «you» (ты). Тлеющий огонь — метафора внимания к себе. 
                        Не яркий, не громкий, но тёплый и настоящий.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8 h-full">
                {/* Corner decorations */}
                <div className="absolute bottom-2 left-2 w-4 h-4 opacity-40">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M0 8 L0 16 L8 16" stroke="rgba(143,181,131,0.5)" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 w-4 h-4 opacity-40">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M8 16 L16 16 L16 8" stroke="rgba(143,181,131,0.5)" strokeWidth="0.5" />
                  </svg>
                </div>

                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8fb583]/60 mb-6 block">Путь</span>
                
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-heading text-[#8fb583]/60">{item.year}</span>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-[#8fb583]/30 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-4">
                        <h4 className="text-lg font-heading text-white mb-1">{item.title}</h4>
                        <p className="text-white/40 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section with Background Image */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-21T185109.830.jfif"
            alt="Values background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#8fb583]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8fb583]/60">Философия</span>
              <div className="w-8 h-px bg-[#8fb583]/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white">
              Наши ценности
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-[#8fb583]/20 transition-all duration-500"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8fb583]/0 via-[#8fb583]/5 to-[#4a6741]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <path d="M32 0 L64 0 L64 32" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 mb-6 text-[#8fb583] group-hover:scale-110 transition-transform duration-500">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-heading font-light text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section - Bento style */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background - gradient only */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-3xl p-10 md:p-16 text-center"
          >
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 opacity-40">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M0 16 L0 0 L16 0" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                <circle cx="8" cy="8" r="4" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 opacity-40">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M16 0 L32 0 L32 16" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
                <circle cx="24" cy="8" r="4" stroke="rgba(143,181,131,0.3)" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 w-8 h-8 opacity-40">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M0 16 L0 32 L16 32" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 opacity-40">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M16 32 L32 32 L32 16" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="w-10 h-10 mx-auto mb-8 text-[#8fb583]/40">
              <QuoteIcon />
            </div>
            <p className="text-2xl md:text-4xl font-heading font-light text-white leading-relaxed mb-8">
              Тишина — это не отсутствие звука.<br />
              <span className="text-[#8fb583]/70">Это присутствие покоя.</span>
            </p>
            <span className="text-white/30 text-sm tracking-wider">— TLEYOU</span>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-21T185208.096.jfif"
            alt="CTA background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0a] via-[#0a0c0a]/80 to-[#0a0c0a]/70" />
        </div>

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-12 h-12 z-10 opacity-30">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <path d="M0 24 L0 0 L24 0" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-12 h-12 z-10 opacity-30">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <path d="M24 0 L48 0 L48 24" stroke="rgba(143,181,131,0.6)" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-white mb-6">
              Готовы начать свой ритуал?
            </h2>
            <p className="text-white/50 mb-10 max-w-xl mx-auto">
              Присоединяйтесь к тысячам женщин, которые уже нашли свои 10 минут тишины каждый день
            </p>
            
            <Link
              href="/product"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full overflow-hidden"
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a6741] to-[#3d5636] group-hover:from-[#5a7a4f] group-hover:to-[#4a6741] transition-all duration-300" />
              
              {/* Glow */}
              <div className="absolute -inset-1 bg-[#8fb583]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10 font-medium text-white">Узнать о наборе</span>
              <div className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRightIcon />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

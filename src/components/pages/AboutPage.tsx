"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Icons
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 22 C12 22, 4 16, 4 10 C4 4, 12 2, 12 2 C12 2, 20 4, 20 10 C20 16, 12 22, 12 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 22 L12 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 3 L13 8 L18 9 L13 10 L12 15 L11 10 L6 9 L11 8 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const story = [
  "TLEYOU родился из личной потребности в тишине.",
  "В мире, где телефон звонит каждые 5 минут, найти 10 минут для себя — уже победа.",
  "Мы создали набор, который помогает начать. Без приложений, без экранов, без сложных техник.",
  "Просто ты, карточка с вопросом, и тлеющая скрутка.",
  "Название TLEYOU — это игра слов: «тлеет» (горит тихо, без пламени) + «you» (ты).",
  "Тлеющий огонь — метафора внимания к себе. Не яркий, не громкий, но тёплый и настоящий.",
];

export default function AboutPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0a0c0a]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4a6741]/[0.08] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#8fb583]/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#8fb583]">О нас</span>
              <div className="w-8 h-px bg-[#8fb583]/50" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-6">
              Ритуал возвращения к себе
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              TLEYOU — это набор для ежедневной практики тишины. 10 минут в день, чтобы услышать себя.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mb-8" />
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white text-center">
              История
            </h2>
          </motion.div>

          <div className="space-y-6">
            {story.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-lg leading-relaxed ${
                  index === 4 || index === 5 ? 'text-[#8fb583]/80 italic' : 'text-white/60'
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f120e]/50 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white">
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
                  className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-6 text-[#8fb583]">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-heading font-light text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-8 h-8 mx-auto mb-8 text-[#8fb583]/40">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M10 8 C10 8, 6 8, 6 12 C6 16, 10 16, 10 16 L10 12 L6 12" stroke="currentColor" strokeWidth="1" />
                <path d="M18 8 C18 8, 14 8, 14 12 C14 16, 18 16, 18 16 L18 12 L14 12" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-light text-white leading-relaxed mb-6">
              Тишина — это не отсутствие звука. Это присутствие покоя.
            </p>
            <span className="text-white/40 text-sm">— TLEYOU</span>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#4a6741]/[0.1] rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white mb-6">
              Готовы начать свой ритуал?
            </h2>
            
            <Link
              href="/product"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300"
            >
              <span className="font-medium">Узнать о наборе</span>
              <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowIcon />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

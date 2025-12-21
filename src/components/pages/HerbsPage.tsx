"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons
const LeafIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 56 C32 56, 24 48, 24 40 C24 32, 28 28, 32 28 C36 28, 40 32, 40 40 C40 48, 32 56, 32 56" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M32 56 L32 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M32 40 C28 40, 24 36, 24 32" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M32 40 C36 40, 40 36, 40 32" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
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

// Разные варианты скруток
const herbRolls = [
  {
    id: "classic",
    name: "Классическая",
    description: "Баланс успокоения и ясности",
    composition: ["Лаванда", "Шалфей", "Полынь"],
    effect: "Универсальная смесь для ежедневного ритуала",
    duration: "10-15 сеансов",
    bestFor: ["Вечерний ритуал", "Снятие стресса", "Подготовка ко сну"],
    color: "from-[#4a6741]/20 to-[#3a5232]/10",
  },
  {
    id: "calm",
    name: "Спокойствие",
    description: "Для глубокого расслабления",
    composition: ["Лаванда", "Ромашка", "Мята"],
    effect: "Мягкий успокаивающий аромат",
    duration: "12-18 сеансов",
    bestFor: ["Бессонница", "Тревожность", "Восстановление"],
    color: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "focus",
    name: "Концентрация",
    description: "Для ясности мыслей",
    composition: ["Шалфей", "Розмарин", "Эвкалипт"],
    effect: "Очищает пространство и ум",
    duration: "10-15 сеансов",
    bestFor: ["Утренний ритуал", "Медитация", "Работа"],
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "ritual",
    name: "Ритуал",
    description: "Традиционная смесь",
    composition: ["Полынь", "Шалфей", "Кедр"],
    effect: "Особая атмосфера для практик",
    duration: "8-12 сеансов",
    bestFor: ["Духовные практики", "Очищение пространства", "Особые моменты"],
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "balance",
    name: "Баланс",
    description: "Гармония и равновесие",
    composition: ["Лаванда", "Розмарин", "Мелисса"],
    effect: "Восстанавливает внутренний баланс",
    duration: "12-16 сеансов",
    bestFor: ["Дневной ритуал", "Перезагрузка", "Баланс эмоций"],
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "sleep",
    name: "Сон",
    description: "Для глубокого отдыха",
    composition: ["Лаванда", "Ромашка", "Валериана"],
    effect: "Подготовка к качественному сну",
    duration: "15-20 сеансов",
    bestFor: ["Перед сном", "Бессонница", "Релаксация"],
    color: "from-indigo-500/20 to-purple-500/10",
  },
];

const usageSteps = [
  {
    step: "1",
    title: "Подготовка",
    description: "Зажгите скрутку и дайте ей разгореться, затем аккуратно затушите пламя",
  },
  {
    step: "2",
    title: "Тление",
    description: "Положите тлеющую скрутку в керамическую подставку",
  },
  {
    step: "3",
    title: "Ритуал",
    description: "Сядьте удобно, закройте глаза и сделайте несколько глубоких вдохов",
  },
  {
    step: "4",
    title: "Рефлексия",
    description: "Возьмите карточку дня и ответьте на вопрос честно",
  },
];

export default function HerbsPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
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
              <span className="text-xs uppercase tracking-[0.3em] text-[#8fb583]">Травяные скрутки</span>
              <div className="w-8 h-px bg-[#8fb583]/50" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-6">
              Выбери свою скрутку
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
              Шесть вариантов с разным наполнением. Каждая скрутка создана для определённого настроения и цели.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Herb Rolls */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white">
              Варианты скруток
            </h2>
            <p className="text-white/40 mt-4">Выбери состав под своё настроение</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {herbRolls.map((roll, index) => (
              <motion.div
                key={roll.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-gradient-to-br ${roll.color} border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-[#8fb583]/20 transition-all duration-500`}
              >
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M16 0 L32 0 L32 16" stroke="rgba(143,181,131,0.15)" strokeWidth="1" />
                  </svg>
                </div>

                <div className="w-10 h-10 text-[#8fb583] mb-4">
                  <LeafIcon />
                </div>
                
                <h3 className="text-xl font-heading font-light text-white mb-2">{roll.name}</h3>
                <p className="text-white/60 text-sm mb-4">{roll.description}</p>
                
                {/* Composition */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Состав</p>
                  <div className="flex flex-wrap gap-2">
                    {roll.composition.map((herb) => (
                      <span
                        key={herb}
                        className="px-2 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/60"
                      >
                        {herb}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Effect */}
                <p className="text-sm text-white/50 mb-4 italic">{roll.effect}</p>

                {/* Duration */}
                <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                  <span>⏱</span>
                  <span>{roll.duration}</span>
                </div>

                {/* Best for */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Подходит для</p>
                  <ul className="space-y-1">
                    {roll.bestFor.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 text-[#8fb583]">
                          <CheckIcon />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f120e]/30 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white">
              Как использовать
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usageSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-white/[0.02] border border-white/[0.08] rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-[#8fb583]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#8fb583] font-medium">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{step.title}</h3>
                  <p className="text-sm text-white/40">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8"
          >
            <h3 className="text-xl font-heading font-light text-white mb-4">
              Меры предосторожности
            </h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#8fb583] mt-0.5 flex-shrink-0">
                  <CheckIcon />
                </div>
                <span>Используйте только в хорошо проветриваемом помещении</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#8fb583] mt-0.5 flex-shrink-0">
                  <CheckIcon />
                </div>
                <span>Не оставляйте тлеющую скрутку без присмотра</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#8fb583] mt-0.5 flex-shrink-0">
                  <CheckIcon />
                </div>
                <span>Храните в сухом месте, вдали от источников тепла</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#8fb583] mt-0.5 flex-shrink-0">
                  <CheckIcon />
                </div>
                <span>Не используйте при беременности и аллергии на травы</span>
              </li>
            </ul>
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
              Хотите попробовать?
            </h2>
            <p className="text-white/50 mb-8">
              Выберите свою скрутку или закажите набор TLEYOU с классической смесью
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/product"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300"
              >
                <span className="font-medium">Узнать о наборе</span>
                <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowIcon />
                </div>
              </Link>
              
              <a
                href="https://t.me/tleyou"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                <div className="w-5 h-5">
                  <TelegramIcon />
                </div>
                <span>Выбрать скрутку</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

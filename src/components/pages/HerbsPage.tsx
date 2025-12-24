"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  LeafIcon, 
  CheckIcon, 
  ArrowRightIcon, 
  TelegramIcon,
  BalanceIcon,
  RelaxIcon,
  EyeIcon,
  FlameIcon,
  LotusIcon
} from "@/components/ui/Icons";

// Иконки для разных скруток
const rollIcons: Record<string, React.FC<{ className?: string }>> = {
  classic: LeafIcon,
  calm: RelaxIcon,
  focus: EyeIcon,
  ritual: FlameIcon,
  balance: BalanceIcon,
  sleep: LotusIcon,
};

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
  },
  {
    id: "calm",
    name: "Спокойствие",
    description: "Для глубокого расслабления",
    composition: ["Лаванда", "Ромашка", "Мята"],
    effect: "Мягкий успокаивающий аромат",
    duration: "12-18 сеансов",
    bestFor: ["Бессонница", "Тревожность", "Восстановление"],
  },
  {
    id: "focus",
    name: "Концентрация",
    description: "Для ясности мыслей",
    composition: ["Шалфей", "Розмарин", "Эвкалипт"],
    effect: "Очищает пространство и ум",
    duration: "10-15 сеансов",
    bestFor: ["Утренний ритуал", "Медитация", "Работа"],
  },
  {
    id: "ritual",
    name: "Ритуал",
    description: "Традиционная смесь",
    composition: ["Полынь", "Шалфей", "Кедр"],
    effect: "Особая атмосфера для практик",
    duration: "8-12 сеансов",
    bestFor: ["Духовные практики", "Очищение пространства", "Особые моменты"],
  },
  {
    id: "balance",
    name: "Баланс",
    description: "Гармония и равновесие",
    composition: ["Лаванда", "Розмарин", "Мелисса"],
    effect: "Восстанавливает внутренний баланс",
    duration: "12-16 сеансов",
    bestFor: ["Дневной ритуал", "Перезагрузка", "Баланс эмоций"],
  },
  {
    id: "sleep",
    name: "Сон",
    description: "Для глубокого отдыха",
    composition: ["Лаванда", "Ромашка", "Валериана"],
    effect: "Подготовка к качественному сну",
    duration: "15-20 сеансов",
    bestFor: ["Перед сном", "Бессонница", "Релаксация"],
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

const safetyItems = [
  "Используйте только в хорошо проветриваемом помещении",
  "Не оставляйте тлеющую скрутку без присмотра",
  "Храните в сухом месте, вдали от источников тепла",
  "Не используйте при беременности и аллергии на травы",
];

export default function HerbsPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero - with background image */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-24T131827.583.jfif"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/88 via-[#0a0c0a]/80 to-[#0c0e0c]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Травяные скрутки</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-6">
              Выбери свою скрутку
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
              Шесть вариантов с разным наполнением. Каждая скрутка создана для определённого настроения и цели.
            </p>

            <motion.a
              href="#rolls"
              className="group inline-flex items-center gap-2 text-[#8fb583]/70 hover:text-[#8fb583] transition-colors"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm">Смотреть варианты</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 5 L12 19 M5 12 L12 19 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Herb Rolls - solid gradient */}
      <section id="rolls" className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Варианты</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white">
              Варианты скруток
            </h2>
            <p className="text-white/40 mt-2 text-sm">Выбери состав под своё настроение</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {herbRolls.map((roll, index) => (
              <motion.div
                key={roll.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 hover:bg-white/[0.04] hover:border-[#8fb583]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                <div className="w-8 h-8 text-[#8fb583] flex-shrink-0">
                  {(() => {
                    const IconComponent = rollIcons[roll.id] || LeafIcon;
                    return <IconComponent />;
                  })()}
                </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-heading font-light text-white mb-1">{roll.name}</h3>
                    <p className="text-white/50 text-sm mb-2">{roll.description}</p>
                    
                    {/* Composition */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {roll.composition.map((herb) => (
                        <span
                          key={herb}
                          className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs text-white/50"
                        >
                          {herb}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs text-white/30">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" />
                        <path d="M12 7 L12 12 L15 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      <span>{roll.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use - with background image (grounding, connection with nature) */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image - barefoot on moss */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/barefoot-moss.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/90" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Инструкция</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
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
                className="flex gap-4 p-6 bg-white/[0.02] border border-white/[0.05] rounded-xl backdrop-blur-sm"
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

      {/* Safety - solid gradient */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8"
          >
            <h3 className="text-xl font-heading font-light text-white mb-4">
              Меры предосторожности
            </h3>
            <ul className="space-y-3 text-white/50 text-sm">
              {safetyItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 text-[#8fb583] mt-0.5 flex-shrink-0">
                    <CheckIcon />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA - with background image */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-24T131838.142.jfif"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/95" />
        </div>
        
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
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-medium">Узнать о наборе</span>
                <div className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRightIcon />
                </div>
              </Link>
              
              <a
                href="https://t.me/tleyouself"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20 transition-all duration-300"
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

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Icons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);

const WindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M3 8 L13 8 C15.21 8 17 6.21 17 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 12 L17 12 C19.76 12 22 14.24 22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 16 L9 16 C10.66 16 12 17.34 12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M21 12.79 C20.27 16.42, 16.88 19.21, 12.89 19.21 C8.13 19.21, 4.29 15.37, 4.29 10.61 C4.29 6.62, 7.08 3.23, 10.71 2.5 C9.22 4.42, 8.5 6.89, 8.5 9.5 C8.5 14.47, 12.53 18.5, 17.5 18.5 C18.61 18.5, 19.68 18.31, 20.68 17.96 C20.48 18.26, 20.26 18.54, 20.02 18.79" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2 L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 20 L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 12 L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 12 L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5.64 5.64 L4.22 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19.78 19.78 L18.36 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.36 5.64 L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.22 19.78 L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const practices = [
  {
    id: 1,
    title: "Дыхание 4-7-8",
    description: "Техника для быстрого успокоения",
    duration: "5 мин",
    category: "Дыхание",
    icon: WindIcon,
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: 2,
    title: "Утренняя медитация",
    description: "Начни день с ясностью",
    duration: "10 мин",
    category: "Медитация",
    icon: SunIcon,
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: 3,
    title: "Благодарность",
    description: "Практика для позитивного настроя",
    duration: "7 мин",
    category: "Осознанность",
    icon: HeartIcon,
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    id: 4,
    title: "Релаксация перед сном",
    description: "Отпусти напряжение дня",
    duration: "15 мин",
    category: "Сон",
    icon: MoonIcon,
    color: "from-indigo-500/20 to-purple-500/10",
  },
];

const categories = ["Все", "Дыхание", "Медитация", "Осознанность", "Сон"];

export default function CabinetPractices() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const filteredPractices = activeCategory === "Все" 
    ? practices 
    : practices.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Практики
        </h1>
        <p className="text-white/40">
          Медитации, дыхательные упражнения и практики осознанности
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === category
                ? 'bg-[#8fb583]/20 text-[#8fb583] border border-[#8fb583]/30'
                : 'bg-white/[0.03] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Practices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPractices.map((practice, index) => {
          const Icon = practice.icon;
          const isActive = isPlaying === practice.id;
          
          return (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br ${practice.color} border border-white/[0.08] rounded-2xl p-6 overflow-hidden group`}
            >
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10">
                <Icon />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <div className="w-6 h-6 text-white">
                      <Icon />
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-white/40 bg-white/5 px-3 py-1 rounded-full">
                    {practice.duration}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-light text-white mb-1">
                  {practice.title}
                </h3>
                <p className="text-sm text-white/50 mb-4">
                  {practice.description}
                </p>

                <button
                  onClick={() => setIsPlaying(isActive ? null : practice.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-[#0a0c0a]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="w-4 h-4">
                    {isActive ? <PauseIcon /> : <PlayIcon />}
                  </div>
                  <span className="text-sm font-medium">
                    {isActive ? 'Пауза' : 'Начать'}
                  </span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Coming soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
      >
        <p className="text-white/40 text-sm">
          Новые практики добавляются каждую неделю
        </p>
      </motion.div>
    </div>
  );
}

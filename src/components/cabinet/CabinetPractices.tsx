"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <path d="M21 12.79 C20.27 16.42, 16.88 19.21, 12.89 19.21 C8.13 19.21, 4.29 15.37, 4.29 10.61 C4.29 6.62, 7.08 3.23, 10.71 2.5 C9.22 4.42, 8.5 6.89, 8.5 9.5 C8.5 14.47, 12.53 18.5, 17.5 18.5 C18.61 18.5, 19.68 18.31, 20.68 17.96" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
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
  </svg>
);

const LotusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 21 C12 21, 9 18, 9 14 C9 10, 12 8, 12 8 C12 8, 15 10, 15 14 C15 18, 12 21, 12 21" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 8 C12 8, 8 6, 5 8 C2 10, 3 14, 3 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M12 8 C12 8, 16 6, 19 8 C22 10, 21 14, 21 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

type Practice = {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  icon: React.FC;
  color: string;
  gradient: string;
};

const practices: Practice[] = [
  {
    id: 1,
    title: "Дыхание 4-7-8",
    description: "Техника для быстрого успокоения и снятия тревоги",
    duration: "5 мин",
    category: "Дыхание",
    icon: WindIcon,
    color: "#7a9ebb",
    gradient: "from-[#7a9ebb]/20 to-[#5f7a9e]/10",
  },
  {
    id: 2,
    title: "Утренняя медитация",
    description: "Начни день с ясностью и фокусом",
    duration: "10 мин",
    category: "Медитация",
    icon: SunIcon,
    color: "#b49b78",
    gradient: "from-[#b49b78]/20 to-[#9a8562]/10",
  },
  {
    id: 3,
    title: "Благодарность",
    description: "Практика для позитивного настроя и осознанности",
    duration: "7 мин",
    category: "Осознанность",
    icon: HeartIcon,
    color: "#9a8fb5",
    gradient: "from-[#9a8fb5]/20 to-[#7a6b9a]/10",
  },
  {
    id: 4,
    title: "Релаксация перед сном",
    description: "Отпусти напряжение дня и подготовься ко сну",
    duration: "15 мин",
    category: "Сон",
    icon: MoonIcon,
    color: "#5f7a9e",
    gradient: "from-[#5f7a9e]/20 to-[#4a6180]/10",
  },
  {
    id: 5,
    title: "Сканирование тела",
    description: "Осознанное расслабление каждой части тела",
    duration: "12 мин",
    category: "Медитация",
    icon: LotusIcon,
    color: "#8fb583",
    gradient: "from-[#8fb583]/20 to-[#6b9a62]/10",
  },
  {
    id: 6,
    title: "Квадратное дыхание",
    description: "Сбалансируй свой ритм и найди внутренний покой",
    duration: "8 мин",
    category: "Дыхание",
    icon: WindIcon,
    color: "#7a9ebb",
    gradient: "from-[#7a9ebb]/20 to-[#5f7a9e]/10",
  },
];

const categories = ["Все", "Дыхание", "Медитация", "Осознанность", "Сон"];

// Practice Card Component
const PracticeCard = ({ 
  practice, 
  isPlaying, 
  onPlay,
  delay 
}: { 
  practice: Practice; 
  isPlaying: boolean;
  onPlay: () => void;
  delay: number;
}) => {
  const Icon = practice.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative bg-gradient-to-br ${practice.gradient} border border-white/[0.06] rounded-2xl p-6 overflow-hidden group`}
    >
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-40 h-40 opacity-10">
        <Icon />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-3 h-3">
        <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
          <path d="M0 4 L0 0 L4 0" stroke={`${practice.color}40`} strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${practice.color}20` }}
          >
            <div className="w-6 h-6" style={{ color: practice.color }}>
              <Icon />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full"
              style={{ backgroundColor: `${practice.color}15`, color: practice.color }}
            >
              {practice.category}
            </span>
            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">
              {practice.duration}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-heading font-light text-white/90 mb-1">
          {practice.title}
        </h3>
        <p className="text-sm text-white/40 mb-5 line-clamp-2">
          {practice.description}
        </p>

        <button
          onClick={onPlay}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
            isPlaying
              ? 'bg-white text-[#0a0c0a]'
              : 'bg-white/[0.08] text-white/80 hover:bg-white/[0.12]'
          }`}
        >
          <div className="w-4 h-4">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
          <span className="text-sm font-medium">
            {isPlaying ? 'Пауза' : 'Начать'}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default function CabinetPractices() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const filteredPractices = activeCategory === "Все" 
    ? practices 
    : practices.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Основное</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Практики осознанности
        </h1>
        <p className="text-white/40 text-sm">
          Медитации, дыхательные упражнения и практики релаксации
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-4 flex-shrink-0"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
              activeCategory === category
                ? 'bg-[#8fb583]/20 text-[#8fb583] border border-[#8fb583]/30'
                : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.15]'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Practices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pb-4">
        {filteredPractices.map((practice, index) => (
          <PracticeCard
            key={practice.id}
            practice={practice}
            isPlaying={isPlaying === practice.id}
            onPlay={() => setIsPlaying(isPlaying === practice.id ? null : practice.id)}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {isPlaying !== null && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 lg:left-80 z-40"
          >
            <div className="bg-gradient-to-r from-[#1a1d1a] to-[#0f120e] border border-white/[0.08] rounded-2xl p-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                {(() => {
                  const practice = practices.find(p => p.id === isPlaying);
                  if (!practice) return null;
                  const Icon = practice.icon;
                  return (
                    <>
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${practice.color}20` }}
                      >
                        <div className="w-6 h-6" style={{ color: practice.color }}>
                          <Icon />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/90 truncate">{practice.title}</p>
                        <p className="text-xs text-white/40">{practice.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlaying(null)}
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                          <div className="w-4 h-4">
                            <PauseIcon />
                          </div>
                        </button>
                        <button
                          onClick={() => setIsPlaying(null)}
                          className="text-white/40 hover:text-white/70 transition-colors"
                        >
                          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                            <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: practices.find(p => p.id === isPlaying)?.color || "#8fb583" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-xs text-white/40">Новые практики добавляются каждую неделю</span>
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
        </div>
      </motion.div>
    </div>
  );
}

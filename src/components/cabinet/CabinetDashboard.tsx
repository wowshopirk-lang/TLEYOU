"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Icons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8 L16 12 L10 16 Z" fill="currentColor" />
  </svg>
);

const CardsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="6" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M8 10 L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const WindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M3 8 L13 8 C15.21 8 17 6.21 17 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 12 L17 12 C19.76 12 22 14.24 22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 16 L9 16 C10.66 16 12 17.34 12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 3 L13 8 L18 9 L13 10 L12 15 L11 10 L6 9 L11 8 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M19 14 L19.5 16 L21.5 16.5 L19.5 17 L19 19 L18.5 17 L16.5 16.5 L18.5 16 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.6" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10 L21 10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 3 L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Card questions
const cards = [
  "Что сегодня заставило тебя улыбнуться?",
  "За что ты благодарна прямо сейчас?",
  "Какая мысль не даёт тебе покоя?",
  "Что бы ты сделала, если бы не боялась?",
  "Какое чувство ты сейчас испытываешь?",
];

const todayPractice = {
  title: "Дыхание 4-7-8 для спокойствия",
  duration: "5 минут",
  category: "Дыхание",
};

export default function CabinetDashboard() {
  const todayCard = cards[new Date().getDate() % cards.length];
  const progress = 12;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Добро пожаловать домой
        </h1>
        <p className="text-white/40">
          Время для тишины и заботы о себе
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <Link href="/cabinet/practices">
          <div className="relative bg-gradient-to-br from-[#4a6741] to-[#3a5232] p-6 rounded-2xl group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-10 h-10 text-white/80 mb-4">
                <PlayIcon />
              </div>
              <p className="text-white font-medium">Практики</p>
              <p className="text-white/50 text-sm">Медитации и дыхание</p>
            </div>
          </div>
        </Link>
        
        <Link href="/cabinet/cards">
          <div className="relative bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl group cursor-pointer hover:bg-white/[0.05] hover:border-[#8fb583]/20 transition-all duration-300">
            <div className="w-10 h-10 text-[#8fb583] mb-4">
              <CardsIcon />
            </div>
            <p className="text-white font-medium">Карточки</p>
            <p className="text-white/40 text-sm">30 вопросов</p>
          </div>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Practice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 text-[#8fb583] mb-4">
            <div className="w-5 h-5">
              <SparklesIcon />
            </div>
            <span className="text-xs uppercase tracking-wider">Практика дня</span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#8fb583]/10 flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 text-[#8fb583]">
                <WindIcon />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-heading font-light text-white mb-1">
                {todayPractice.title}
              </h3>
              <p className="text-sm text-white/40">
                {todayPractice.category} · {todayPractice.duration}
              </p>
            </div>
          </div>

          <button className="group w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300">
            <div className="w-4 h-4">
              <PlayIcon />
            </div>
            <span className="font-medium">Начать практику</span>
          </button>
        </motion.div>

        {/* Today's Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] border border-white/[0.08] rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 text-white/50 mb-4">
            <div className="w-5 h-5">
              <CalendarIcon />
            </div>
            <span className="text-xs uppercase tracking-wider">Карточка дня</span>
          </div>

          <p className="text-xl font-heading font-light text-white mb-6 leading-relaxed">
            {todayCard}
          </p>

          <Link href="/cabinet/cards">
            <button className="flex items-center gap-2 text-[#8fb583] hover:text-[#a0c694] transition-colors text-sm">
              <span>Все карточки</span>
              <div className="w-4 h-4">
                <ArrowIcon />
              </div>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-[#8fb583]">
              <HeartIcon />
            </div>
            <span className="text-white font-medium">Твой прогресс</span>
          </div>
          <span className="text-[#8fb583] font-medium">
            {progress} из 30 дней
          </span>
        </div>

        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(progress / 30) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-[#4a6741] to-[#8fb583] rounded-full"
          />
        </div>

        <p className="text-sm text-white/40">
          Отличная работа! Продолжай в том же духе.
        </p>
      </motion.div>
    </div>
  );
}

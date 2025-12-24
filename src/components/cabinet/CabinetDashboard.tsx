"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mood options
const moods = [
  { emoji: "😊", label: "Хорошо", color: "#8fb583" },
  { emoji: "😌", label: "Спокойно", color: "#7a9ebb" },
  { emoji: "😐", label: "Так себе", color: "#b49b78" },
  { emoji: "😔", label: "Грустно", color: "#9a8fb5" },
];

const cardQuestions = [
  "Что сегодня заставило тебя улыбнуться?",
  "За что ты благодарна прямо сейчас?",
  "Какая мысль не даёт тебе покоя?",
  "Что бы ты сделала, если бы не боялась?",
  "Какое чувство ты сейчас испытываешь?",
];

export default function CabinetDashboard() {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [greeting, setGreeting] = useState("Добрый день");
  const [isMounted, setIsMounted] = useState(false);
  const [todayCard, setTodayCard] = useState(cardQuestions[0]);

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    if (hour < 6) setGreeting("Доброй ночи");
    else if (hour < 12) setGreeting("Доброе утро");
    else if (hour < 18) setGreeting("Добрый день");
    else setGreeting("Добрый вечер");
    
    setTodayCard(cardQuestions[new Date().getDate() % cardQuestions.length]);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-white/10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      
      {/* Left Column - Greeting & Progress */}
      <div className="flex-1 flex flex-col justify-center">
        
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8fb583]/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              {greeting}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          </div>
          <h1 className="text-3xl font-heading font-light text-white/90 mb-2">
            Анна
          </h1>
          <p className="text-sm text-white/40">
            Время для тишины и заботы о себе
          </p>
        </motion.div>

        {/* Progress Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="flex items-center gap-6">
            {/* Main progress circle */}
            <div className="relative w-28 h-28 flex-shrink-0">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-full border border-dashed border-white/[0.04]" />
              
              {/* Progress ring */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="52"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="3"
                  fill="none"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="52"
                  stroke="#8fb583"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "327", strokeDashoffset: "327" }}
                  animate={{ strokeDashoffset: "196" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-heading text-white/90">12</span>
                <span className="text-[8px] uppercase tracking-wider text-white/40">дней</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b49b78]/10 border border-[#b49b78]/20 flex items-center justify-center">
                  <span className="text-xs text-[#b49b78]">8</span>
                </div>
                <div>
                  <p className="text-xs text-white/60">Карточек</p>
                  <p className="text-[10px] text-white/30">пройдено</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7a9ebb]/10 border border-[#7a9ebb]/20 flex items-center justify-center">
                  <span className="text-xs text-[#7a9ebb]">5</span>
                </div>
                <div>
                  <p className="text-xs text-white/60">Практик</p>
                  <p className="text-[10px] text-white/30">завершено</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-[#8fb583]/60">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 12 C8 13.5, 9 14, 10 14 C11 14, 12 13.5, 13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="7" cy="8" r="1" fill="currentColor" />
              <circle cx="13" cy="8" r="1" fill="currentColor" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
              Как ты сегодня?
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            {moods.map((mood, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentMood(index)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                  currentMood === index
                    ? 'bg-white/[0.06]'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <div 
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all duration-300 border ${
                    currentMood === index ? 'scale-110' : ''
                  }`}
                  style={{ 
                    backgroundColor: currentMood === index ? `${mood.color}20` : 'rgba(255,255,255,0.02)',
                    borderColor: currentMood === index ? `${mood.color}50` : 'rgba(255,255,255,0.06)'
                  }}
                >
                  {mood.emoji}
                </div>
                <span className={`text-[9px] uppercase tracking-wide transition-colors ${
                  currentMood === index ? 'text-white/70' : 'text-white/30'
                }`}>
                  {mood.label}
                </span>
              </motion.button>
            ))}
          </div>

          {currentMood !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-white/[0.06]"
            >
              <Link href="/cabinet/journal">
                <button className="w-full py-2.5 rounded-xl bg-[#8fb583]/10 border border-[#8fb583]/20 text-[#8fb583] text-xs hover:bg-[#8fb583]/15 transition-colors">
                  Записать в дневник
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Center - Card of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex items-center justify-center"
      >
        <Link href="/cabinet/cards">
          <div className="group relative w-52 cursor-pointer">
            {/* Card */}
            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-b from-[#1a1814] via-[#13110f] to-[#0d0c0a] border border-[#b49b78]/20 overflow-hidden transition-all duration-500 group-hover:border-[#b49b78]/40 group-hover:shadow-xl group-hover:shadow-[#b49b78]/5">
              
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M0 6 L0 0 L6 0" stroke="#b49b78" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M10 0 L16 0 L16 6" stroke="#b49b78" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M0 10 L0 16 L6 16" stroke="#b49b78" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute bottom-3 right-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M10 16 L16 16 L16 10" stroke="#b49b78" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>

              {/* Center circle decoration */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-28 h-28 rounded-full border border-[#b49b78]/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-5 text-center">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#b49b78]/50 mb-4">
                  Карточка дня
                </p>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  {todayCard}
                </p>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
                    <div className="w-4 h-px bg-[#b49b78]" />
                    <div className="w-1 h-1 rounded-full bg-[#b49b78]" />
                    <div className="w-4 h-px bg-[#b49b78]" />
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#b49b78]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Shadow */}
            <div className="absolute -bottom-1 left-3 right-3 h-3 bg-gradient-to-b from-black/20 to-transparent blur-sm rounded-b-xl" />
          </div>
        </Link>
      </motion.div>

      {/* Right Column - Quick Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex-1 flex flex-col justify-center space-y-4"
      >
        {/* Practice of the Day */}
        <Link href="/cabinet/practices">
          <div className="group p-5 rounded-2xl bg-gradient-to-br from-[#8fb583]/5 to-transparent border border-[#8fb583]/10 hover:border-[#8fb583]/25 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8fb583]/10 border border-[#8fb583]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#8fb583]">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 8 L16 12 L10 16 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#8fb583]/60 mb-1">Практика дня</p>
                <p className="text-sm text-white/80 font-light mb-1">Дыхание 4-7-8</p>
                <p className="text-xs text-white/40">5 минут • Успокоение</p>
              </div>
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white/20 group-hover:text-[#8fb583] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1">
                <path d="M4 10 L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 6 L16 10 L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Journal */}
        <Link href="/cabinet/journal">
          <div className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#9a8fb5]/25 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#9a8fb5]/10 border border-[#9a8fb5]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#9a8fb5]">
                  <path d="M12 4 C8 4, 5 7, 5 10 C5 13, 7 15, 9 17 C10 18, 11 19, 12 21 C13 19, 14 18, 15 17 C17 15, 19 13, 19 10 C19 7, 16 4, 12 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 font-light">Дневник эмоций</p>
                <p className="text-xs text-white/40">Запиши свои мысли</p>
              </div>
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white/20 group-hover:text-[#9a8fb5] group-hover:translate-x-1 transition-all">
                <path d="M4 10 L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 6 L16 10 L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Chat */}
        <Link href="/cabinet/chat">
          <div className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#7a9ebb]/25 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7a9ebb]/10 border border-[#7a9ebb]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#7a9ebb]">
                  <path d="M12 3 C7 3, 3 7, 3 11 C3 13, 4 15, 5 16 L4 20 L8 18 C9 18.5, 10.5 19, 12 19 C17 19, 21 15, 21 11 C21 7, 17 3, 12 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 font-light">Чат поддержки</p>
                <p className="text-xs text-white/40">Поговори с помощником</p>
              </div>
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white/20 group-hover:text-[#7a9ebb] group-hover:translate-x-1 transition-all">
                <path d="M4 10 L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 6 L16 10 L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Tests */}
        <Link href="/cabinet/tests">
          <div className="group p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:border-[#b49b78]/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#b49b78]/10 border border-[#b49b78]/15 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-[#b49b78]">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 10 L8 12 L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/60">Тесты</p>
              </div>
              <span className="text-[9px] text-white/30">3 доступно</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

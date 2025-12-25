"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Icons
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 20 C2 16.69 4.69 14 8 14 C11.31 14 14 16.69 14 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 20 C22 16.69 19.31 14 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="3" y="8" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8 L12 22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 8 C7 6.34 8.34 5 10 5 C10.5 5, 11 5.2, 11.5 5.5 C11.5 4.12, 10.38 3, 9 3 C7.62 3, 6.5 4.12, 6.5 5.5 C7 5.2, 7.5 5, 8 5 C9.66 5, 11 6.34, 11 8 L7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 8 C17 6.34 15.66 5 14 5 C13.5 5, 13 5.2, 12.5 5.5 C12.5 4.12, 13.62 3, 15 3 C16.38 3, 17.5 4.12, 17.5 5.5 C17 5.2, 16.5 5, 16 5 C14.34 5, 13 6.34, 13 8 L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ComingSoonBadge = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8fb583]/20 border border-[#8fb583]/30">
    <div className="w-2 h-2 rounded-full bg-[#8fb583] animate-pulse" />
    <span className="text-xs uppercase tracking-wider text-[#8fb583]">Скоро</span>
  </div>
);

export default function TogetherPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // В будущем здесь будет отправка на сервер
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Сообщество</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-heading font-light text-white">
            Совместные практики
          </h1>
          <ComingSoonBadge />
        </div>
        <p className="text-white/40 text-sm">
          Практики с друзьями для взаимной поддержки и мотивации
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Invite Friend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8fb583]/20 flex items-center justify-center mb-4">
              <div className="w-6 h-6 text-[#8fb583]">
                <UsersIcon />
              </div>
            </div>
            <h3 className="text-lg font-heading text-white/90 mb-2">
              Пригласи друга на практику
            </h3>
            <p className="text-sm text-white/50 mb-4">
              Проходите медитации и практики вместе в реальном времени или асинхронно. Поддерживайте друг друга на пути к благополучию.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <div className="w-1 h-1 rounded-full bg-[#8fb583]" />
              <span>Синхронное прохождение</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/30 mt-1">
              <div className="w-1 h-1 rounded-full bg-[#8fb583]" />
              <span>Асинхронные сессии</span>
            </div>
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#b49b78]/20 flex items-center justify-center mb-4">
              <div className="w-6 h-6 text-[#b49b78]">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-heading text-white/90 mb-2">
              Челенджи с друзьями
            </h3>
            <p className="text-sm text-white/50 mb-4">
              Бросайте вызовы друг другу, мотивируйте и поддерживайте. Это не социальная сеть, а инструмент взаимной поддержки.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <div className="w-1 h-1 rounded-full bg-[#b49b78]" />
              <span>Еженедельные челенджи</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/30 mt-1">
              <div className="w-1 h-1 rounded-full bg-[#b49b78]" />
              <span>Отслеживание прогресса</span>
            </div>
          </motion.div>

          {/* Gift Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] md:col-span-2"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#c49b88]/20 flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 text-[#c49b88]">
                  <GiftIcon />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading text-white/90 mb-2">
                  Подари практику другу
                </h3>
                <p className="text-sm text-white/50 mb-4">
                  Подари одну практику (совместную или одиночную) другу бесплатно, чтобы он мог попробовать TLEYOU. Это отличный способ поделиться заботой о себе с близкими.
                </p>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <div className="w-1 h-1 rounded-full bg-[#c49b88]" />
                  <span>1 бесплатная практика для друга</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-[#8fb583]/10 to-[#7a9ebb]/10 border border-[#8fb583]/20 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
            <div className="w-8 h-8 text-[#8fb583]">
              <HeartIcon />
            </div>
          </div>
          <h2 className="text-xl font-heading text-white/90 mb-2">
            Скоро: Collaborative Wellness
          </h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Мы работаем над функцией совместных практик. Оставь свой email, и мы сообщим тебе, когда она будет готова.
          </p>
          
          {/* Email Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Твой email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-[#8fb583]/50 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={submitted}
                className="px-6 py-3 rounded-xl bg-[#8fb583] text-white font-medium hover:bg-[#7fa573] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? "Отправлено!" : "Уведомить"}
              </button>
            </div>
            {submitted && (
              <p className="text-xs text-[#8fb583] mt-2">
                Спасибо! Мы сообщим тебе, когда функция будет готова.
              </p>
            )}
          </form>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-start gap-4">
            <div className="w-1 h-1 rounded-full bg-[#8fb583] mt-2 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-white/90 mb-2">
                Что будет доступно?
              </h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-[#8fb583] mt-1">•</span>
                  <span>Приглашение друга на совместную медитацию через уникальную ссылку</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8fb583] mt-1">•</span>
                  <span>Синхронное прохождение практик в реальном времени</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8fb583] mt-1">•</span>
                  <span>Асинхронные сессии — проходите практики в удобное время</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8fb583] mt-1">•</span>
                  <span>Еженедельные челенджи для мотивации друг друга</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8fb583] mt-1">•</span>
                  <span>Возможность подарить практику другу бесплатно</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}




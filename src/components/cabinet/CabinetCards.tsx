"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 12 C4 7.58, 7.58 4, 12 4 C15.35 4, 18.19 6.04, 19.43 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 12 C20 16.42, 16.42 20, 12 20 C8.65 20, 5.81 17.96, 4.57 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 9 L20 9 L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 15 L4 15 L4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// All cards
const allCards = [
  "Что сегодня заставило тебя улыбнуться?",
  "За что ты благодарна прямо сейчас?",
  "Какая мысль не даёт тебе покоя?",
  "Что бы ты сделала, если бы не боялась?",
  "Какое чувство ты сейчас испытываешь?",
  "Что ты откладываешь на потом?",
  "Кого бы ты хотела поблагодарить?",
  "Что для тебя значит быть собой?",
  "Какой урок преподнёс тебе сегодняшний день?",
  "Что ты можешь отпустить прямо сейчас?",
  "Какая твоя самая смелая мечта?",
  "Что приносит тебе настоящую радость?",
  "О чём ты давно хотела поговорить?",
  "Что ты можешь простить себе?",
  "Какой момент сегодня был особенным?",
  "Что ты ценишь в себе больше всего?",
  "Куда зовёт тебя твоё сердце?",
  "Что ты хотела бы изменить?",
  "Какая мелочь сделала бы твой день лучше?",
  "С кем ты чувствуешь себя настоящей?",
  "Что ты делаешь только для себя?",
  "Какой совет ты бы дала себе год назад?",
  "Что помогает тебе чувствовать покой?",
  "Какую привычку ты хотела бы сформировать?",
  "Что делает тебя уникальной?",
  "За что ты можешь похвалить себя сегодня?",
  "Какое решение ты откладываешь?",
  "Что ты узнала о себе недавно?",
  "Какой страх держит тебя на месте?",
  "Что значит для тебя любовь к себе?",
];

// Circular progress for cards
const CardsProgress = ({ completed, total }: { completed: number; total: number }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (completed / total) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        {/* Background ring */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
          fill="none"
        />
        {/* Dashed decorative ring */}
        <circle
          cx="70"
          cy="70"
          r={radius - 15}
          stroke="rgba(180,155,120,0.1)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          fill="none"
        />
        {/* Progress ring */}
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#b49b78"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-heading text-white/90">{completed}</span>
        <span className="text-[10px] uppercase tracking-wider text-white/40">из {total}</span>
      </div>
    </div>
  );
};

export default function CabinetCards() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [completedCards, setCompletedCards] = useState<number[]>([0, 1, 2, 3, 4]);

  const toggleComplete = (index: number) => {
    if (completedCards.includes(index)) {
      setCompletedCards(completedCards.filter(i => i !== index));
    } else {
      setCompletedCards([...completedCards, index]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#b49b78]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Основное</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          30 карточек рефлексии
        </h1>
        <p className="text-white/40 text-sm">
          Один вопрос — один день — одна честность
        </p>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          {/* Decorative background */}
          <div className="absolute -right-20 -top-20 w-60 h-60 opacity-20">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <circle cx="100" cy="100" r="80" stroke="rgba(180,155,120,0.2)" strokeWidth="1" />
            </svg>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M0 5 L0 0 L5 0" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M11 0 L16 0 L16 5" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <CardsProgress completed={completedCards.length} total={30} />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-heading text-white/90 mb-2">Твой прогресс</h3>
              <p className="text-sm text-white/50 mb-4">
                Ты уже прошла {completedCards.length} карточек. Продолжай в том же духе!
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b49b78]/10 border border-[#b49b78]/20">
                  <div className="w-2 h-2 rounded-full bg-[#b49b78]" />
                  <span className="text-xs text-[#b49b78]">{completedCards.length} пройдено</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-xs text-white/40">{30 - completedCards.length} осталось</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">
          {allCards.map((card, index) => {
            const isCompleted = completedCards.includes(index);
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                onClick={() => setSelectedCard(index)}
                className={`relative aspect-square rounded-xl transition-all duration-300 group ${
                  isCompleted
                    ? 'bg-[#b49b78]/15 border border-[#b49b78]/30'
                    : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#b49b78] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 text-white">
                      <CheckIcon />
                    </div>
                  </div>
                )}
                <div className="h-full flex flex-col items-center justify-center">
                  <span className={`text-lg font-heading ${isCompleted ? 'text-[#b49b78]' : 'text-white/50'}`}>
                    {index + 1}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Card Modal */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0c0a]/95 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] rounded-3xl p-8 md:p-12 max-w-lg w-full border border-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 0 L32 0 L32 12" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 20 L0 32 L12 32" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 32 L32 32 L32 20" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
                </svg>
              </div>

              {/* Decorative circle */}
              <div className="absolute -right-16 -top-16 w-48 h-48 opacity-20">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" stroke="rgba(180,155,120,0.2)" strokeWidth="0.5" strokeDasharray="4 8" />
                </svg>
              </div>

              {/* Card number */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#b49b78]/20 flex items-center justify-center">
                  <span className="text-lg font-heading text-[#b49b78]">{selectedCard + 1}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Карточка {selectedCard + 1} из 30
                </span>
              </div>

              {/* Question */}
              <p className="text-xl md:text-2xl font-heading font-light text-white/90 text-center leading-relaxed mb-8">
                {allCards[selectedCard]}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => toggleComplete(selectedCard)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    completedCards.includes(selectedCard)
                      ? 'bg-[#b49b78] text-white'
                      : 'bg-white/[0.05] border border-white/20 text-white/70 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="w-5 h-5">
                    <CheckIcon />
                  </div>
                  <span className="text-sm font-medium">
                    {completedCards.includes(selectedCard) ? 'Выполнено' : 'Отметить'}
                  </span>
                </button>
                
                <button
                  onClick={() => setSelectedCard((selectedCard + 1) % allCards.length)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/60 hover:bg-white/[0.05] hover:text-white transition-all duration-300"
                >
                  <div className="w-5 h-5">
                    <RefreshIcon />
                  </div>
                  <span className="text-sm">Следующая</span>
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-12 text-white/30 hover:text-white/60 transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

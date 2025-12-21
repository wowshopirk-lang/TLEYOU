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

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M10 8 C10 8, 6 8, 6 12 C6 16, 10 16, 10 16 L10 12 L6 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 8 C18 8, 14 8, 14 12 C14 16, 18 16, 18 16 L18 12 L14 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          30 карточек
        </h1>
        <p className="text-white/40">
          Один вопрос — один день — одна честность
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8fb583]" />
            <span className="text-sm text-white/50">{completedCards.length} пройдено</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <span className="text-sm text-white/50">{30 - completedCards.length} осталось</span>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {allCards.map((card, index) => {
          const isCompleted = completedCards.includes(index);
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              onClick={() => setSelectedCard(index)}
              className={`relative aspect-[3/4] rounded-xl p-4 transition-all duration-300 ${
                isCompleted
                  ? 'bg-[#8fb583]/10 border border-[#8fb583]/30'
                  : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {isCompleted && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#8fb583] flex items-center justify-center">
                  <div className="w-3 h-3 text-white">
                    <CheckIcon />
                  </div>
                </div>
              )}
              <div className="h-full flex flex-col items-center justify-center">
                <span className={`text-2xl font-heading ${isCompleted ? 'text-[#8fb583]' : 'text-white/60'}`}>
                  {index + 1}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Card Modal */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
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
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 0 L32 0 L32 12" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 20 L0 32 L12 32" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 32 L32 32 L32 20" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                </svg>
              </div>

              {/* Quote icon */}
              <div className="w-8 h-8 mx-auto mb-6 text-[#8fb583]/40">
                <QuoteIcon />
              </div>

              {/* Card number */}
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wider text-white/30">
                  Карточка {selectedCard + 1} из 30
                </span>
              </div>

              {/* Question */}
              <p className="text-2xl md:text-3xl font-heading font-light text-white text-center leading-relaxed mb-8">
                {allCards[selectedCard]}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => toggleComplete(selectedCard)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    completedCards.includes(selectedCard)
                      ? 'bg-[#8fb583] text-white'
                      : 'bg-white/[0.05] border border-white/20 text-white/70 hover:text-white'
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
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
                >
                  <div className="w-5 h-5">
                    <RefreshIcon />
                  </div>
                  <span className="text-sm">Следующая</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Card questions
const cards = [
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

// Icons
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 12 C4 7.58, 7.58 4, 12 4 C15.35 4, 18.19 6.04, 19.43 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 12 C20 16.42, 16.42 20, 12 20 C8.65 20, 5.81 17.96, 4.57 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 9 L20 9 L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 15 L4 15 L4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 10.5 L15.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.5 13.5 L15.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M10 8 C10 8, 6 8, 6 12 C6 16, 10 16, 10 16 L10 12 L6 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 8 C18 8, 14 8, 14 12 C14 16, 18 16, 18 16 L18 12 L14 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CardOfDayPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Get today's card based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setCardIndex(dayOfYear % cards.length);
  }, []);

  const getNewCard = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % cards.length);
      setIsFlipped(false);
    }, 300);
  };

  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0a0c0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4a6741]/[0.06] rounded-full blur-[150px]" />
          
          {/* Decorative circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/[0.03] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-[#8fb583]/[0.05] rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#8fb583]/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#8fb583]">Карточка дня</span>
              <div className="w-8 h-px bg-[#8fb583]/50" />
            </div>
            <p className="text-white/40 text-sm">
              {new Date().toLocaleDateString("ru-RU", { 
                weekday: "long", 
                day: "numeric", 
                month: "long" 
              })}
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-12"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cardIndex}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Card container */}
                <div className="relative bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] rounded-3xl p-10 md:p-14 border border-white/[0.08] shadow-2xl">
                  {/* Corner decorations */}
                  <div className="absolute top-6 left-6 w-10 h-10">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M0 16 L0 0 L16 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute top-6 right-6 w-10 h-10">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M24 0 L40 0 L40 16" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute bottom-6 left-6 w-10 h-10">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M0 24 L0 40 L16 40" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute bottom-6 right-6 w-10 h-10">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M24 40 L40 40 L40 24" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Quote icon */}
                  <div className="w-8 h-8 mx-auto mb-8 text-[#8fb583]/40">
                    <QuoteIcon />
                  </div>

                  {/* Question */}
                  <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white leading-relaxed">
                    {cards[cardIndex]}
                  </p>

                  {/* Card number */}
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <div className="w-6 h-px bg-white/10" />
                    <span className="text-xs text-white/30 uppercase tracking-wider">
                      {cardIndex + 1} / {cards.length}
                    </span>
                    <div className="w-6 h-px bg-white/10" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={getNewCard}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              <div className="w-5 h-5">
                <RefreshIcon />
              </div>
              <span className="text-sm">Другая карточка</span>
            </button>
            
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              <div className="w-5 h-5">
                <ShareIcon />
              </div>
              <span className="text-sm">Поделиться</span>
            </button>
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-sm text-white/30 italic"
          >
            Закрой глаза. Сделай глубокий вдох. Ответь честно.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f120e] to-transparent" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mb-8" />
            
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white mb-4">
              Хочешь больше?
            </h2>
            <p className="text-white/50 mb-8">
              В наборе TLEYOU — 30 физических карточек для ежедневной практики
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/product"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300"
              >
                <span className="font-medium">Узнать о наборе</span>
                <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowIcon />
                </div>
              </Link>
              
              <Link
                href="/subscription"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                <span>Подписка с практиками</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

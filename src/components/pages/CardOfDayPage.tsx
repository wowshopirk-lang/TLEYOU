"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { QuoteIcon, ArrowRightIcon } from "@/components/ui/Icons";

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

// Custom icons for this page
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

// Get today's date string for storage key
const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

// Generate unique card indices for today based on date seed
const generateTodayCards = (seed: number): [number, number] => {
  const firstCard = seed % cards.length;
  // Second card is different from first
  let secondCard = (seed * 7 + 13) % cards.length;
  if (secondCard === firstCard) {
    secondCard = (firstCard + 1) % cards.length;
  }
  return [firstCard, secondCard];
};

export default function CardOfDayPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [canChange, setCanChange] = useState(true);
  const [todayCards, setTodayCards] = useState<[number, number]>([0, 1]);
  const [isSecondCard, setIsSecondCard] = useState(false);

  useEffect(() => {
    // Get today's seed based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const yearSeed = today.getFullYear() * 1000 + dayOfYear;
    
    // Generate today's unique cards
    const [first, second] = generateTodayCards(yearSeed);
    setTodayCards([first, second]);
    
    // Check localStorage for today's state
    const todayKey = getTodayKey();
    const savedState = localStorage.getItem(`tleyou_card_${todayKey}`);
    
    if (savedState) {
      const { usedSecond } = JSON.parse(savedState);
      if (usedSecond) {
        setCardIndex(second);
        setIsSecondCard(true);
        setCanChange(false);
      } else {
        setCardIndex(first);
        setCanChange(true);
      }
    } else {
      setCardIndex(first);
      setCanChange(true);
    }
  }, []);

  const getNewCard = () => {
    if (!canChange) return;
    
    // Switch to second card
    setCardIndex(todayCards[1]);
    setIsSecondCard(true);
    setCanChange(false);
    
    // Save state to localStorage
    const todayKey = getTodayKey();
    localStorage.setItem(`tleyou_card_${todayKey}`, JSON.stringify({ usedSecond: true }));
  };

  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero - with background image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-24T131957.477.jfif"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/88 via-[#0a0c0a]/80 to-[#0c0e0c]/90" />
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
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Карточка дня</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
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
                <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/[0.08] shadow-2xl">
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
              disabled={!canChange}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                canChange 
                  ? "border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20 cursor-pointer" 
                  : "border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              <div className="w-5 h-5">
                <RefreshIcon />
              </div>
              <span className="text-sm">
                {canChange ? "Ещё одна карточка" : "Завтра будет новая"}
              </span>
            </button>
            
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <div className="w-5 h-5">
                <ShareIcon />
              </div>
              <span className="text-sm">Поделиться</span>
            </button>
          </motion.div>

          {/* Card counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2"
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isSecondCard ? "bg-[#8fb583]/30" : "bg-[#8fb583]/60"}`} />
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isSecondCard ? "bg-[#8fb583]/60" : "bg-white/10"}`} />
            <span className="ml-2 text-xs text-white/25">
              {isSecondCard ? "2 из 2 на сегодня" : "1 из 2 на сегодня"}
            </span>
          </motion.div>

          {/* Practice Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 max-w-lg mx-auto px-4"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#8fb583]/30" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8fb583]/40">Как практиковать</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#8fb583]/30" />
            </div>
            
            <div className="space-y-4 text-sm text-white/40 leading-relaxed text-left">
              <div className="flex items-start gap-1.5">
                <span className="text-white/50 font-medium">1.</span>
                <p>Найди тихое место, где тебя никто не побеспокоит</p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-white/50 font-medium">2.</span>
                <p>Сделай 3 глубоких вдоха, закрой глаза на мгновение</p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-white/50 font-medium">3.</span>
                <p>Прочитай вопрос и позволь ответу прийти — без спешки</p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-white/50 font-medium">4.</span>
                <p>Запиши свои мысли или просто побудь с ними</p>
              </div>
            </div>
            
            <p className="mt-8 text-xs text-white/25 italic text-center leading-relaxed">
              Каждый день — две уникальные карточки. Не торопись. Честность — ключ к себе.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA - solid gradient */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Больше</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white mb-4">
              Хочешь больше?
            </h2>
            <p className="text-white/50 mb-8">
              В наборе TLEYOU — 30 физических карточек для ежедневной практики
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/product"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-medium">Узнать о наборе</span>
                <div className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRightIcon />
                </div>
              </Link>
              
              <Link
                href="/subscription"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20 transition-all duration-300"
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

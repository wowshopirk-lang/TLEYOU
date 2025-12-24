"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCardsStore, formatCardDate } from "@/stores/cardsStore";
import { cards as allCards, categoryNames, categoryColors } from "@/data/cards";

// Icons
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11 L8 7 C8 4.79 9.79 3 12 3 C14.21 3 16 4.79 16 7 L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TodayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
    <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Circular progress for cards
const CardsProgress = ({ opened, total }: { opened: number; total: number }) => {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = (opened / total) * circumference;

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
        {/* Background ring */}
        <circle
          cx="65"
          cy="65"
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
          fill="none"
        />
        {/* Dashed decorative ring */}
        <circle
          cx="65"
          cy="65"
          r={radius - 12}
          stroke="rgba(143,181,131,0.1)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          fill="none"
        />
        {/* Progress ring */}
        <motion.circle
          cx="65"
          cy="65"
          r={radius}
          stroke="#8fb583"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-heading text-white/90">{opened}</span>
        <span className="text-[9px] uppercase tracking-wider text-white/40">из {total}</span>
      </div>
    </div>
  );
};

export default function CabinetCards() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const { getTodayCard, isCardOpened, openTodayCard, getOpenedCardsData, getCardOpenDate } = useCardsStore();
  
  const todayCardData = getTodayCard();
  const openedCardsData = getOpenedCardsData();
  const openedCount = openedCardsData.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Определяем статус каждой карточки
  const getCardStatus = (cardId: number): 'opened' | 'today' | 'locked' => {
    if (isCardOpened(cardId)) {
      return 'opened';
    }
    if (cardId === todayCardData.cardId && !todayCardData.isOpened) {
      return 'today';
    }
    return 'locked';
  };

  // Открыть сегодняшнюю карточку
  const handleOpenTodayCard = (cardId: number) => {
    if (cardId === todayCardData.cardId && !todayCardData.isOpened) {
      openTodayCard();
      setSelectedCard(cardId);
    }
  };

  // Клик по карточке
  const handleCardClick = (cardId: number) => {
    const status = getCardStatus(cardId);
    
    if (status === 'opened') {
      setSelectedCard(cardId);
    } else if (status === 'today') {
      handleOpenTodayCard(cardId);
    }
    // locked - ничего не делаем
  };

  if (!isMounted) {
    return (
      <div className="h-[calc(100vh-400px)] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-white/10 animate-pulse" />
      </div>
    );
  }

  const selectedCardData = selectedCard ? allCards.find(c => c.id === selectedCard) : null;

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
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Коллекция</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          30 карточек рефлексии
        </h1>
        <p className="text-white/40 text-sm">
          Каждый день — новый вопрос. Пропущенные карточки остаются закрытыми навсегда.
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
              <circle cx="100" cy="100" r="80" stroke="rgba(143,181,131,0.2)" strokeWidth="1" />
            </svg>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M0 5 L0 0 L5 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M11 0 L16 0 L16 5" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <CardsProgress opened={openedCount} total={30} />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-heading text-white/90 mb-2">Твоя коллекция</h3>
              <p className="text-sm text-white/50 mb-4">
                {openedCount === 0 
                  ? "Ты ещё не открыла ни одной карточки. Начни сегодня!"
                  : openedCount === 30
                    ? "Поздравляем! Ты открыла все 30 карточек!"
                    : `Ты открыла ${openedCount} ${openedCount === 1 ? 'карточку' : openedCount < 5 ? 'карточки' : 'карточек'}. Продолжай каждый день!`
                }
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8fb583]/10 border border-[#8fb583]/20">
                  <div className="w-2 h-2 rounded-full bg-[#8fb583]" />
                  <span className="text-xs text-[#8fb583]">{openedCount} открыто</span>
                </div>
                {!todayCardData.isOpened && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b49b78]/10 border border-[#b49b78]/20">
                    <div className="w-2 h-2 rounded-full bg-[#b49b78] animate-pulse" />
                    <span className="text-xs text-[#b49b78]">Сегодняшняя доступна</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-xs text-white/40">{30 - openedCount} закрыто</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider text-white/40"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#8fb583]/20 border border-[#8fb583]/40 flex items-center justify-center">
            <div className="w-2 h-2 text-[#8fb583]"><CheckIcon /></div>
          </div>
          <span>Открыта</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#b49b78]/20 border border-[#b49b78]/40 flex items-center justify-center">
            <div className="w-2 h-2 text-[#b49b78]"><TodayIcon /></div>
          </div>
          <span>Сегодня</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white/[0.02] border border-white/[0.08] flex items-center justify-center">
            <div className="w-2 h-2 text-white/20"><LockIcon /></div>
          </div>
          <span>Недоступна</span>
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
            const status = getCardStatus(card.id);
            const isOpened = status === 'opened';
            const isToday = status === 'today';
            const isLocked = status === 'locked';
            
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                onClick={() => handleCardClick(card.id)}
                disabled={isLocked}
                className={`relative aspect-square rounded-xl transition-all duration-300 group ${
                  isOpened
                    ? 'bg-[#8fb583]/15 border border-[#8fb583]/30 cursor-pointer hover:border-[#8fb583]/50 hover:bg-[#8fb583]/20'
                    : isToday
                      ? 'bg-[#b49b78]/15 border border-[#b49b78]/40 cursor-pointer hover:border-[#b49b78]/60 hover:bg-[#b49b78]/25 animate-pulse'
                      : 'bg-white/[0.01] border border-white/[0.05] cursor-not-allowed opacity-50'
                }`}
              >
                {/* Status indicator */}
                {isOpened && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8fb583] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 text-white">
                      <CheckIcon />
                    </div>
                  </div>
                )}
                {isToday && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#b49b78] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 text-white">
                      <TodayIcon />
                    </div>
                  </div>
                )}
                {isLocked && (
                  <div className="absolute top-1 right-1 w-3.5 h-3.5 text-white/20">
                    <LockIcon />
                  </div>
                )}
                
                <div className="h-full flex flex-col items-center justify-center">
                  <span className={`text-lg font-heading ${
                    isOpened 
                      ? 'text-[#8fb583]' 
                      : isToday 
                        ? 'text-[#b49b78]' 
                        : 'text-white/20'
                  }`}>
                    {card.id}
                  </span>
                </div>

                {/* Hover tooltip for opened cards */}
                {isOpened && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-[#1a1d1a] border border-white/10 rounded-lg px-2 py-1 text-[9px] text-white/60 whitespace-nowrap">
                      {formatCardDate(getCardOpenDate(card.id) || '')}
                    </div>
                  </div>
                )}

                {/* Hover tooltip for today */}
                {isToday && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-[#1a1d1a] border border-[#b49b78]/30 rounded-lg px-2 py-1 text-[9px] text-[#b49b78] whitespace-nowrap">
                      Нажми, чтобы открыть
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Info block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
      >
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5">
            <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 6 L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="14" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white/60 leading-relaxed">
              <span className="text-white/80">Как это работает:</span> Каждый день тебе доступна одна новая карточка. 
              Открой её на <Link href="/cabinet" className="text-[#8fb583] hover:underline">главной странице</Link> или здесь, 
              нажав на карточку с пульсирующей рамкой. Если пропустишь день — карточка останется закрытой навсегда.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Selected Card Modal */}
      <AnimatePresence>
        {selectedCard !== null && selectedCardData && (
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
              className="relative bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] rounded-3xl p-8 md:p-12 max-w-lg w-full border border-[#8fb583]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 0 L32 0 L32 12" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 20 L0 32 L12 32" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 32 L32 32 L32 20" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>

              {/* Decorative circle */}
              <div className="absolute -right-16 -top-16 w-48 h-48 opacity-20">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" stroke="rgba(143,181,131,0.2)" strokeWidth="0.5" strokeDasharray="4 8" />
                </svg>
              </div>

              {/* Card number and category */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
                  <span className="text-lg font-heading text-[#8fb583]">{selectedCardData.id}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span 
                    className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${categoryColors[selectedCardData.category]}15`,
                      color: categoryColors[selectedCardData.category]
                    }}
                  >
                    {categoryNames[selectedCardData.category]}
                  </span>
                </div>
                <p className="text-[10px] text-white/30 mt-2">
                  Открыта {formatCardDate(getCardOpenDate(selectedCardData.id) || '')}
                </p>
              </div>

              {/* Question */}
              <p className="text-xl md:text-2xl font-heading font-light text-white/90 text-center leading-relaxed mb-8">
                {selectedCardData.question}
              </p>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <Link href="/cabinet/journal">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8fb583]/20 border border-[#8fb583]/30 text-[#8fb583] hover:bg-[#8fb583]/30 transition-all duration-300">
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <path d="M4 4 L16 4 L16 16 L4 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M7 8 L13 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      <path d="M7 11 L11 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm">Записать в дневник</span>
                  </button>
                </Link>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white/60 hover:bg-white/[0.05] hover:text-white transition-all duration-300"
                >
                  <span className="text-sm">Закрыть</span>
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-12 w-5 h-5 text-white/30 hover:text-white/60 transition-colors"
              >
                <CloseIcon />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


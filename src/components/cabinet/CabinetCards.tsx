"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCardsStore, formatCardDate, getDayName } from "@/stores/cardsStore";
import { cards as allCards, categoryNames, categoryColors } from "@/data/cards";

// Icons
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11 L8 7 C8 4.79 9.79 3 12 3 C14.21 3 16 4.79 16 7 L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
    <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M15 18 L9 12 L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M9 18 L15 12 L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Дни недели
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Месяцы на русском
const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export default function CabinetCards() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const { getTodayCard, isCardOpened, openTodayCard, getCardOpenDate, openedCards } = useCardsStore();
  
  const todayCardData = getTodayCard();
  const today = new Date();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Получить дни месяца для календаря
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Первый день месяца
    const firstDay = new Date(year, month, 1);
    // День недели первого дня (0=вс, 1=пн, ...) - корректируем для пн=0
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;
    
    // Последний день месяца
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Создаём массив дней
    const days: { date: Date | null; dayNum: number }[] = [];
    
    // Пустые ячейки до первого дня
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: null, dayNum: 0 });
    }
    
    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), dayNum: day });
    }
    
    return days;
  };

  // Проверить, является ли день сегодняшним
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  // Проверить, прошёл ли день
  const isPastDay = (date: Date | null) => {
    if (!date) return false;
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  // Проверить, текущий ли месяц
  const isCurrentMonth = () => {
    return currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  // Получить ID карточки для дня (день месяца, но не больше 30)
  const getCardIdForDay = (dayNum: number): number => {
    return dayNum > 30 ? dayNum - 30 : dayNum;
  };

  // Статус дня: opened, today, missed, future
  const getDayStatus = (date: Date | null, dayNum: number): 'opened' | 'today' | 'missed' | 'future' | 'empty' => {
    if (!date || dayNum === 0) return 'empty';
    
    const cardId = getCardIdForDay(dayNum);
    
    if (isToday(date)) {
      return isCardOpened(cardId) ? 'opened' : 'today';
    }
    
    if (isPastDay(date)) {
      return isCardOpened(cardId) ? 'opened' : 'missed';
    }
    
    return 'future';
  };

  // Клик по дню
  const handleDayClick = (date: Date | null, dayNum: number) => {
    if (!date || dayNum === 0) return;
    
    const status = getDayStatus(date, dayNum);
    const cardId = getCardIdForDay(dayNum);
    
    if (status === 'opened') {
      setSelectedCard(cardId);
    } else if (status === 'today') {
      openTodayCard();
      setSelectedCard(cardId);
    }
  };

  // Навигация по месяцам
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  if (!isMounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-white/10 animate-pulse" />
      </div>
    );
  }

  const calendarDays = getCalendarDays();
  const selectedCardData = selectedCard ? allCards.find(c => c.id === selectedCard) : null;
  
  // Подсчитываем открытые карточки, которые видны на календаре (статус 'opened')
  // Это гарантирует, что счетчик соответствует тому, что видно на календаре
  const openedCount = calendarDays.reduce((count, day) => {
    if (day.dayNum > 0 && day.date) {
      const status = getDayStatus(day.date, day.dayNum);
      if (status === 'opened') {
        return count + 1;
      }
    }
    return count;
  }, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h1 className="text-lg font-heading font-light text-white">
            Календарь карточек
          </h1>
          <p className="text-[10px] text-white/40">
            Открыто {openedCount} из 30 • День {today.getDate()} = Карточка {getCardIdForDay(today.getDate())}
          </p>
        </div>
        
        {/* Legend */}
        <div className="hidden md:flex items-center gap-2 text-[8px] uppercase tracking-wider text-white/40">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-[#8fb583]/30 border border-[#8fb583]/50" />
            <span>Открыта</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-[#b49b78]/30 border border-[#b49b78]/50 animate-pulse" />
            <span>Сегодня</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-red-900/20 border border-red-900/30" />
            <span>Пропущена</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 overflow-visible min-h-0">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <button 
            onClick={prevMonth}
            className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/[0.15] transition-all"
          >
            <div className="w-3.5 h-3.5"><ChevronLeftIcon /></div>
          </button>
          
          <div className="text-center">
            <h2 className="text-base font-heading text-white/90">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            {!isCurrentMonth() && (
              <button 
                onClick={() => setCurrentMonth(new Date())}
                className="text-[9px] text-[#8fb583] hover:underline"
              >
                Вернуться к сегодня
              </button>
            )}
          </div>
          
          <button 
            onClick={nextMonth}
            className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/[0.15] transition-all"
          >
            <div className="w-3.5 h-3.5"><ChevronRightIcon /></div>
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-0.5 mb-1.5 flex-shrink-0">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center text-[9px] uppercase tracking-wider text-white/30 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0.5 flex-1 min-h-0 auto-rows-fr">
          {calendarDays.map((day, index) => {
            const status = getDayStatus(day.date, day.dayNum);
            const cardId = day.dayNum > 0 ? getCardIdForDay(day.dayNum) : 0;
            
            if (status === 'empty') {
              return <div key={index} className="min-h-0" />;
            }
            
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                onClick={() => handleDayClick(day.date, day.dayNum)}
                disabled={status === 'future' || status === 'missed'}
                className={`relative rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-0.5 group min-h-0 ${
                  status === 'opened'
                    ? 'bg-[#8fb583]/20 border border-[#8fb583]/40 cursor-pointer hover:bg-[#8fb583]/30'
                    : status === 'today'
                      ? 'bg-[#b49b78]/20 border-2 border-[#b49b78]/60 cursor-pointer hover:bg-[#b49b78]/30 animate-pulse'
                      : status === 'missed'
                        ? 'bg-red-900/10 border border-red-900/20 cursor-not-allowed opacity-60'
                        : 'bg-white/[0.01] border border-white/[0.04] cursor-not-allowed opacity-40'
                }`}
              >
                {/* Day number */}
                <span className={`text-xs font-medium ${
                  status === 'opened' ? 'text-[#8fb583]' 
                    : status === 'today' ? 'text-[#b49b78]' 
                    : status === 'missed' ? 'text-red-400/60'
                    : 'text-white/30'
                }`}>
                  {day.dayNum}
                </span>
                
                {/* Card number (small) */}
                <span className={`text-[7px] ${
                  status === 'opened' ? 'text-[#8fb583]/60' 
                    : status === 'today' ? 'text-[#b49b78]/60' 
                    : 'text-white/20'
                }`}>
                  #{cardId}
                </span>

                {/* Status indicators */}
                {status === 'opened' && (
                  <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#8fb583] flex items-center justify-center">
                    <div className="w-2 h-2 text-white"><CheckIcon /></div>
                  </div>
                )}
                {status === 'missed' && (
                  <div className="absolute top-1 right-1 w-3 h-3 text-red-400/40">
                    <LockIcon />
                  </div>
                )}

                {/* Hover tooltip */}
                {(status === 'opened' || status === 'today') && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className={`bg-[#1a1d1a] border rounded-lg px-2 py-1 text-[9px] whitespace-nowrap ${
                      status === 'today' ? 'border-[#b49b78]/30 text-[#b49b78]' : 'border-white/10 text-white/60'
                    }`}>
                      {status === 'today' ? 'Нажми, чтобы открыть' : 'Карточка #' + cardId}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Today's Card Quick Access */}
        {!todayCardData.isOpened && isCurrentMonth() && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2 rounded-xl bg-[#b49b78]/10 border border-[#b49b78]/30 flex-shrink-0"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[#b49b78]">Сегодняшняя карточка доступна!</p>
                <p className="text-[10px] text-white/40">Карточка #{todayCardData.cardId}</p>
              </div>
              <button
                onClick={() => {
                  openTodayCard();
                  setSelectedCard(todayCardData.cardId);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#b49b78] text-white text-xs font-medium hover:bg-[#b49b78]/80 transition-colors flex-shrink-0"
              >
                Открыть
              </button>
            </div>
          </motion.div>
        )}
      </div>

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
              className="relative bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] rounded-3xl p-8 md:p-10 max-w-lg w-full border border-[#8fb583]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card number and category */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
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
                {getCardOpenDate(selectedCardData.id) && (
                  <p className="text-[10px] text-white/30 mt-2">
                    Открыта {formatCardDate(getCardOpenDate(selectedCardData.id) || '')}
                  </p>
                )}
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
                    <span className="text-sm">В дневник</span>
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
                className="absolute top-4 right-4 w-5 h-5 text-white/30 hover:text-white/60 transition-colors"
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

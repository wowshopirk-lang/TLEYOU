"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface DayData {
  date: number;
  mood?: number;
  practices: string[];
  journal?: boolean;
  card?: boolean;
}

// Icons
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PracticeIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
    <path d="M6 5 L11 8 L6 11 Z" fill="currentColor" />
  </svg>
);

const JournalIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
    <path d="M8 3 C6 3, 4 5, 4 7 C4 9, 5.5 10.5, 6.5 11.5 C7 12, 7.5 13, 8 14 C8.5 13, 9 12, 9.5 11.5 C10.5 10.5, 12 9, 12 7 C12 5, 10 3, 8 3" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
    <rect x="4" y="3" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
    <rect x="5" y="2" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

// Static sample data generator - no randomness to avoid hydration issues
const generateMonthData = (year: number, month: number): DayData[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: DayData[] = [];
  const practices = ["Дыхание", "Медитация", "Благодарность", "Релаксация"];
  
  // Use deterministic pattern based on day of month
  for (let i = 1; i <= daysInMonth; i++) {
    // Deterministic pattern: every 2nd, 3rd, 5th, 7th days have activity
    const hasActivity = i % 2 === 0 || i % 3 === 0 || i % 5 === 0 || i % 7 === 0;
    const practiceCount = hasActivity ? ((i % 3) + 1) : 0;
    const mood = hasActivity ? ((i % 5) + 1) : undefined;
    
    data.push({
      date: i,
      mood: mood as 1 | 2 | 3 | 4 | 5 | undefined,
      practices: hasActivity ? practices.slice(0, practiceCount) : [],
      journal: hasActivity && i % 2 === 0,
      card: hasActivity && i % 3 === 0,
    });
  }
  return data;
};

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const moodColors = ["#b58f8f", "#9a8fb5", "#b49b78", "#7a9ebb", "#8fb583"];
const moodEmojis = ["😤", "😔", "😐", "😌", "😊"];

// Day Cell Component
const DayCell = ({ 
  day, 
  isToday, 
  isSelected, 
  onClick,
  isCurrentMonth
}: { 
  day: DayData; 
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
  isCurrentMonth: boolean;
}) => {
  const hasActivity = day.practices.length > 0 || day.journal || day.card;

  return (
    <motion.button
      onClick={onClick}
      className={`relative aspect-square p-1 rounded-xl transition-all duration-200 ${
        isSelected 
          ? 'bg-white/[0.1] ring-1 ring-[#8fb583]/50' 
          : isToday
            ? 'bg-[#8fb583]/10'
            : hasActivity
              ? 'bg-white/[0.02] hover:bg-white/[0.05]'
              : 'hover:bg-white/[0.03]'
      } ${!isCurrentMonth ? 'opacity-30' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Date number */}
      <span className={`text-sm ${
        isToday ? 'text-[#8fb583] font-medium' : 'text-white/60'
      }`}>
        {day.date}
      </span>

      {/* Mood indicator */}
      {day.mood && (
        <div 
          className="absolute top-1 right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: moodColors[day.mood - 1] }}
        />
      )}

      {/* Activity indicators */}
      {hasActivity && (
        <div className="absolute bottom-1 left-1 right-1 flex items-center justify-center gap-0.5">
          {day.practices.length > 0 && (
            <div className="w-1 h-1 rounded-full bg-[#8fb583]" />
          )}
          {day.journal && (
            <div className="w-1 h-1 rounded-full bg-[#9a8fb5]" />
          )}
          {day.card && (
            <div className="w-1 h-1 rounded-full bg-[#b49b78]" />
          )}
        </div>
      )}
    </motion.button>
  );
};

// Day Detail Panel
const DayDetail = ({ day, date }: { day: DayData; date: Date }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-lg font-heading text-white/90">
          {date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
        </p>
        <p className="text-xs text-white/40">
          {date.toLocaleDateString("ru-RU", { weekday: "long" })}
        </p>
      </div>
      {day.mood && (
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{ backgroundColor: `${moodColors[day.mood - 1]}20` }}
        >
          {moodEmojis[day.mood - 1]}
        </div>
      )}
    </div>

    {/* Activities */}
    {(day.practices.length > 0 || day.journal || day.card) ? (
      <div className="space-y-3">
        {/* Practices */}
        {day.practices.length > 0 && (
          <div className="p-3 rounded-xl bg-[#8fb583]/10 border border-[#8fb583]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 text-[#8fb583]">
                <PracticeIcon />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#8fb583]">Практики</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {day.practices.map((practice, i) => (
                <span key={i} className="px-2 py-1 rounded-lg bg-[#8fb583]/10 text-xs text-white/60">
                  {practice}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Journal */}
        {day.journal && (
          <div className="p-3 rounded-xl bg-[#9a8fb5]/10 border border-[#9a8fb5]/20">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-[#9a8fb5]">
                <JournalIcon />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#9a8fb5]">Дневник</span>
              <span className="ml-auto text-xs text-white/40">1 запись</span>
            </div>
          </div>
        )}

        {/* Card */}
        {day.card && (
          <div className="p-3 rounded-xl bg-[#b49b78]/10 border border-[#b49b78]/20">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-[#b49b78]">
                <CardIcon />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#b49b78]">Карточка</span>
              <span className="ml-auto text-xs text-white/40">✓ Пройдена</span>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="text-center py-8">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/[0.03] flex items-center justify-center">
          <span className="text-xl opacity-50">📝</span>
        </div>
        <p className="text-sm text-white/40">Нет активности в этот день</p>
      </div>
    )}
  </motion.div>
);

// Stats Bar
const StatsBar = ({ monthData }: { monthData: DayData[] }) => {
  const daysWithPractice = monthData.filter(d => d.practices.length > 0).length;
  const daysWithJournal = monthData.filter(d => d.journal).length;
  const daysWithCard = monthData.filter(d => d.card).length;
  const moodDays = monthData.filter(d => d.mood);
  const avgMood = moodDays.length > 0 
    ? moodDays.reduce((sum, d) => sum + (d.mood || 0), 0) / moodDays.length 
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="p-4 rounded-xl bg-[#8fb583]/10 border border-[#8fb583]/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 text-[#8fb583]">
            <PracticeIcon />
          </div>
          <span className="text-xs text-white/40">Практики</span>
        </div>
        <p className="text-xl font-heading text-white/90" suppressHydrationWarning>{daysWithPractice}</p>
        <p className="text-[10px] text-white/30">дней</p>
      </div>
      <div className="p-4 rounded-xl bg-[#9a8fb5]/10 border border-[#9a8fb5]/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 text-[#9a8fb5]">
            <JournalIcon />
          </div>
          <span className="text-xs text-white/40">Дневник</span>
        </div>
        <p className="text-xl font-heading text-white/90" suppressHydrationWarning>{daysWithJournal}</p>
        <p className="text-[10px] text-white/30">записей</p>
      </div>
      <div className="p-4 rounded-xl bg-[#b49b78]/10 border border-[#b49b78]/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 text-[#b49b78]">
            <CardIcon />
          </div>
          <span className="text-xs text-white/40">Карточки</span>
        </div>
        <p className="text-xl font-heading text-white/90" suppressHydrationWarning>{daysWithCard}</p>
        <p className="text-[10px] text-white/30">пройдено</p>
      </div>
      <div className="p-4 rounded-xl bg-[#7a9ebb]/10 border border-[#7a9ebb]/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">{moodEmojis[Math.round(avgMood) - 1] || "😐"}</span>
          <span className="text-xs text-white/40">Настроение</span>
        </div>
        <p className="text-xl font-heading text-white/90" suppressHydrationWarning>{avgMood.toFixed(1)}</p>
        <p className="text-[10px] text-white/30">в среднем</p>
      </div>
    </div>
  );
};

export default function CabinetCalendar() {
  const [isMounted, setIsMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState(1);
  
  // Initialize date only on client
  useEffect(() => {
    const now = new Date();
    setToday(now);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setSelectedDate(now.getDate());
    setIsMounted(true);
  }, []);

  // Calculate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (date: number) => 
    today !== null &&
    date === today.getDate() && 
    currentMonth === today.getMonth() && 
    currentYear === today.getFullYear();

  // Generate data deterministically based on year and month
  const currentMonthData = useMemo(() => {
    return generateMonthData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);
  
  const selectedDayData = currentMonthData.find(d => d.date === selectedDate) || { 
    date: selectedDate, 
    practices: [], 
    journal: false, 
    card: false 
  };

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-1 rounded-full bg-[#7a9ebb]/50" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Помощь</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
            Календарь практик
          </h1>
          <p className="text-white/40 text-sm">
            Отслеживай свой прогресс и активность
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse">
              <div className="h-4 w-20 bg-white/10 rounded mb-2" />
              <div className="h-6 w-12 bg-white/10 rounded mb-1" />
              <div className="h-3 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          <div className="w-1 h-1 rounded-full bg-[#7a9ebb]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Помощь</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Календарь практик
        </h1>
        <p className="text-white/40 text-sm">
          Отслеживай свой прогресс и активность
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <StatsBar monthData={currentMonthData} />
      </motion.div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 w-48 h-48 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <circle cx="100" cy="100" r="80" stroke="rgba(122,158,187,0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="rgba(143,181,131,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-5 h-5">
                  <ChevronLeftIcon />
                </div>
              </button>
              <div className="text-center">
                <p className="text-lg font-heading text-white/90">
                  {monthNames[currentMonth]}
                </p>
                <p className="text-xs text-white/40">{currentYear}</p>
              </div>
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-5 h-5">
                  <ChevronRightIcon />
                </div>
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center py-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/30">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Previous month days */}
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <div key={`prev-${i}`} className="aspect-square p-1 flex items-start justify-start">
                  <span className="text-sm text-white/20">
                    {daysInPrevMonth - adjustedFirstDay + i + 1}
                  </span>
                </div>
              ))}

              {/* Current month days */}
              {currentMonthData.map((day) => (
                <DayCell
                  key={day.date}
                  day={day}
                  isToday={isToday(day.date)}
                  isSelected={selectedDate === day.date}
                  onClick={() => setSelectedDate(day.date)}
                  isCurrentMonth={true}
                />
              ))}

              {/* Next month days */}
              {Array.from({ length: 42 - adjustedFirstDay - daysInMonth }).map((_, i) => (
                <div key={`next-${i}`} className="aspect-square p-1 flex items-start justify-start">
                  <span className="text-sm text-white/20">{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8fb583]" />
                  <span className="text-[10px] text-white/40">Практика</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#9a8fb5]" />
                  <span className="text-[10px] text-white/40">Дневник</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#b49b78]" />
                  <span className="text-[10px] text-white/40">Карточка</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Day Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <DayDetail 
              key={selectedDate}
              day={selectedDayData} 
              date={new Date(currentYear, currentMonth, selectedDate)} 
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}


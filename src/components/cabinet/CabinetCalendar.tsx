"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "@/stores/calendarStore";
import { useCardsStore } from "@/stores/cardsStore";
import { useJournalStore } from "@/stores/journalStore";
import { useMoodStore } from "@/stores/moodStore";
import { getPracticeById } from "@/data/practices";
import { 
  LightIcon, 
  BalanceIcon, 
  MindIcon, 
  RelaxIcon, 
  LabyrinthIcon,
  PeaceIcon,
  HeartIcon,
  EnergyIcon,
  GroundingIcon,
  AwakenIcon,
  MeditationIcon
} from "@/components/icons/BrandIcons";

// Types
interface DayData {
  date: number;
  mood?: string;
  practices: string[];
  journal: boolean;
  card: boolean;
  test: boolean;
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

// Generate month data from real stores
const generateMonthData = (
  year: number, 
  month: number,
  calendarEvents: ReturnType<typeof useCalendarStore.getState>['events'],
  openedCards: ReturnType<typeof useCardsStore.getState>['openedCards'],
  journalEntries: ReturnType<typeof useJournalStore.getState>['entries'],
  moodHistory: ReturnType<typeof useMoodStore.getState>['moodHistory']
): DayData[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: DayData[] = [];
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    
    // Get events for this date
    const dayEvents = calendarEvents.filter(e => e.date === dateStr);
    const practices = dayEvents
      .filter(e => e.type === 'practice')
      .map(e => {
        const practice = getPracticeById(e.eventId);
        return practice ? practice.title : e.title;
      });
    
    const hasJournal = dayEvents.some(e => e.type === 'journal') || 
                      journalEntries.some(e => e.date === dateStr);
    const hasCard = dayEvents.some(e => e.type === 'card') ||
                   openedCards.some(c => c.dateOpened === dateStr);
    const hasTest = dayEvents.some(e => e.type === 'test');
    
    // Get mood for this date
    const moodEntry = moodHistory.find(m => m.date === dateStr);
    const mood = moodEntry?.mood;
    
    data.push({
      date: i,
      mood,
      practices,
      journal: hasJournal,
      card: hasCard,
      test: hasTest,
    });
  }
  return data;
};

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const moodColors: Record<string, string> = {
  radiant: "#8fb583",
  calm: "#7a9ebb",
  balanced: "#b49b78",
  tender: "#9a8fb5",
  tired: "#8b8b9a",
  anxious: "#a0b5c5",
  inspired: "#88b5a0",
  grateful: "#b5a888",
  energetic: "#e5a855",
  peaceful: "#6b9b8a",
  confused: "#9b8b7a",
};

const moodLabels: Record<string, string> = {
  radiant: "Отлично",
  calm: "Спокойно",
  balanced: "Нормально",
  tender: "Грустно",
  tired: "Устала",
  anxious: "Тревожно",
  inspired: "Вдохновлена",
  grateful: "Благодарна",
  energetic: "Энергичная",
  peaceful: "Умиротворена",
  confused: "Растеряна",
};

const moodIcons: Record<string, any> = {
  radiant: LightIcon,
  calm: BalanceIcon,
  balanced: MindIcon,
  tender: HeartIcon,
  tired: RelaxIcon,
  anxious: LabyrinthIcon,
  inspired: AwakenIcon,
  grateful: GroundingIcon,
  energetic: EnergyIcon,
  peaceful: PeaceIcon,
  confused: MeditationIcon,
};

const MoodIcon = ({ mood, className, color }: { mood: string; className?: string; color?: string }) => {
  const Icon = moodIcons[mood] || MindIcon;
  return <Icon className={className} style={{ color }} />;
};

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
      className={`relative w-full h-full rounded-xl transition-all duration-200 flex flex-col items-center justify-center ${
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
      <span className={`text-sm leading-none ${
        isToday ? 'text-[#8fb583] font-medium' : 'text-white/60'
      }`}>
        {day.date}
      </span>

      {/* Mood indicator */}
      {day.mood && (
        <div 
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
          style={{ backgroundColor: moodColors[day.mood] || "#8fb583" }}
        />
      )}

      {/* Activity indicators */}
      {hasActivity && (
        <div className="flex items-center justify-center gap-0.5 mt-1">
          {day.practices.length > 0 && (
            <div className="w-1 h-1 rounded-full bg-[#8fb583]" />
          )}
          {day.journal && (
            <div className="w-1 h-1 rounded-full bg-[#9a8fb5]" />
          )}
          {day.card && (
            <div className="w-1 h-1 rounded-full bg-[#b49b78]" />
          )}
          {day.test && (
            <div className="w-1 h-1 rounded-full bg-[#7a9ebb]" />
          )}
        </div>
      )}
    </motion.button>
  );
};

// Inactive Day Cell (for prev/next month)
const InactiveDayCell = ({ date }: { date: number }) => (
  <div className="relative w-full h-full rounded-xl flex flex-col items-center justify-center">
    <span className="text-sm leading-none text-white/20">{date}</span>
  </div>
);

// Day Detail Panel
const DayDetail = ({ day, date }: { day: DayData; date: Date }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-full overflow-auto"
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="text-lg font-heading text-white/90">
          {date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
        </p>
        <p className="text-xs text-white/40">
          {date.toLocaleDateString("ru-RU", { weekday: "long" })}
        </p>
      </div>
      {day.mood && (
        <div className="flex flex-col items-center gap-2">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/[0.1]"
            style={{ backgroundColor: `${moodColors[day.mood] || '#8fb583'}20` }}
          >
            <MoodIcon 
              mood={day.mood} 
              className="w-6 h-6" 
              color={moodColors[day.mood] || '#8fb583'} 
            />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/60">
            {moodLabels[day.mood] || "Неизвестно"}
          </span>
        </div>
      )}
    </div>

    {/* Activities */}
    {(day.practices.length > 0 || day.journal || day.card || day.test) ? (
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

        {/* Test */}
        {day.test && (
          <div className="p-3 rounded-xl bg-[#7a9ebb]/10 border border-[#7a9ebb]/20">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-[#7a9ebb]">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
                  <path d="M5 8 L7 10 L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#7a9ebb]">Тест</span>
              <span className="ml-auto text-xs text-white/40">✓ Пройден</span>
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
  
  // Вычисляем наиболее частое настроение
  const moodCounts: Record<string, number> = {};
  moodDays.forEach(d => {
    if (d.mood) {
      moodCounts[d.mood] = (moodCounts[d.mood] || 0) + 1;
    }
  });
  
  const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b, 
    moodDays[0]?.mood || ''
  );

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="p-2 rounded-lg bg-[#8fb583]/10 border border-[#8fb583]/20">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-3 h-3 text-[#8fb583]">
            <PracticeIcon />
          </div>
          <span className="text-[10px] text-white/40">Практики</span>
        </div>
        <p className="text-lg font-heading text-white/90" suppressHydrationWarning>{daysWithPractice}</p>
        <p className="text-[9px] text-white/30">дней</p>
      </div>
      <div className="p-2 rounded-lg bg-[#9a8fb5]/10 border border-[#9a8fb5]/20">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-3 h-3 text-[#9a8fb5]">
            <JournalIcon />
          </div>
          <span className="text-[10px] text-white/40">Дневник</span>
        </div>
        <p className="text-lg font-heading text-white/90" suppressHydrationWarning>{daysWithJournal}</p>
        <p className="text-[9px] text-white/30">записей</p>
      </div>
      <div className="p-2 rounded-lg bg-[#b49b78]/10 border border-[#b49b78]/20">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-3 h-3 text-[#b49b78]">
            <CardIcon />
          </div>
          <span className="text-[10px] text-white/40">Карточки</span>
        </div>
        <p className="text-lg font-heading text-white/90" suppressHydrationWarning>{daysWithCard}</p>
        <p className="text-[9px] text-white/30">пройдено</p>
      </div>
      <div className="p-2 rounded-lg bg-[#7a9ebb]/10 border border-[#7a9ebb]/20">
        <div className="flex items-center gap-1.5 mb-0.5">
          {mostCommonMood ? (
            <div className="w-3 h-3">
              <MoodIcon 
                mood={mostCommonMood} 
                className="w-full h-full" 
                color={moodColors[mostCommonMood] || '#7a9ebb'} 
              />
            </div>
          ) : (
            <div className="w-3 h-3 rounded-full bg-white/10" />
          )}
          <span className="text-[10px] text-white/40">Настроение</span>
        </div>
        {mostCommonMood ? (
          <>
            <p className="text-lg font-heading text-white/90" suppressHydrationWarning>
              {moodLabels[mostCommonMood] || "—"}
            </p>
            <p className="text-[9px] text-white/30">{moodDays.length} дней</p>
          </>
        ) : (
          <>
            <p className="text-lg font-heading text-white/90" suppressHydrationWarning>—</p>
            <p className="text-[9px] text-white/30">нет данных</p>
          </>
        )}
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
  
  // Get real data from stores
  const { events: calendarEvents } = useCalendarStore();
  const { openedCards } = useCardsStore();
  const { entries: journalEntries } = useJournalStore();
  const { moodHistory } = useMoodStore();
  
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
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start (0-6)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  // Calculate last day of month weekday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
  // Days needed to complete the last week (if last day is Sunday, we don't need next month days)
  const daysToShowNextMonth = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;

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

  // Generate data from real stores
  const currentMonthData = useMemo(() => {
    return generateMonthData(
      currentYear, 
      currentMonth,
      calendarEvents,
      openedCards,
      journalEntries,
      moodHistory
    );
  }, [currentYear, currentMonth, calendarEvents, openedCards, journalEntries, moodHistory]);
  
  const selectedDayData = currentMonthData.find(d => d.date === selectedDate) || { 
    date: selectedDate, 
    practices: [], 
    journal: false, 
    card: false,
    test: false,
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
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-1 rounded-full bg-[#7a9ebb]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Помощь</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-light text-white mb-1">
          Календарь практик
        </h1>
        <p className="text-white/40 text-xs">
          Отслеживай свой прогресс и активность
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4"
      >
        <StatsBar monthData={currentMonthData} />
      </motion.div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-3 min-h-0">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="xl:col-span-2 min-h-0 flex flex-col"
        >
          <div className="relative p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex-1 flex flex-col min-h-0">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 w-48 h-48 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <circle cx="100" cy="100" r="80" stroke="rgba(122,158,187,0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="rgba(143,181,131,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
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
            <div className="grid grid-cols-7 gap-1 mb-2 flex-shrink-0">
              {dayNames.map((day) => (
                <div key={day} className="text-center py-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/30">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 grid-rows-6 gap-1 flex-1 min-h-0">
              {/* Previous month days - только в начале месяца, если первый день не понедельник */}
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <InactiveDayCell 
                  key={`prev-${i}`} 
                  date={daysInPrevMonth - adjustedFirstDay + i + 1} 
                />
              ))}

              {/* Current month days - ВСЕ дни от 1 до конца месяца */}
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

              {/* Next month days - только в конце месяца, если последний день не воскресенье */}
              {Array.from({ length: daysToShowNextMonth }).map((_, i) => (
                <InactiveDayCell key={`next-${i}`} date={i + 1} />
              ))}
            </div>

            {/* Legend - compact */}
            <div className="mt-2 pt-2 border-t border-white/[0.06] flex-shrink-0">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8fb583]" />
                  <span className="text-[9px] text-white/40">Практика</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9a8fb5]" />
                  <span className="text-[9px] text-white/40">Дневник</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b49b78]" />
                  <span className="text-[9px] text-white/40">Карточка</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7a9ebb]" />
                  <span className="text-[9px] text-white/40">Тест</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Day Detail - hidden on smaller screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden xl:block"
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


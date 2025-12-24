"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Mood data types
interface MoodEntry {
  date: string;
  dayOfWeek: string;
  mood: number; // 1-5
  emoji: string;
}

// Last 30 days mood data (sample)
const generateMoodData = (): MoodEntry[] => {
  const emojis = ["😤", "😔", "😐", "😌", "😊"];
  const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const data: MoodEntry[] = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const mood = Math.floor(Math.random() * 5) + 1;
    data.push({
      date: date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
      dayOfWeek: dayNames[date.getDay()],
      mood,
      emoji: emojis[mood - 1],
    });
  }
  return data;
};

const moods = [
  { level: 1, emoji: "😤", label: "Плохо", color: "#b58f8f" },
  { level: 2, emoji: "😔", label: "Грустно", color: "#9a8fb5" },
  { level: 3, emoji: "😐", label: "Нормально", color: "#b49b78" },
  { level: 4, emoji: "😌", label: "Хорошо", color: "#7a9ebb" },
  { level: 5, emoji: "😊", label: "Отлично", color: "#8fb583" },
];

// Circular Mood Chart Component
const MoodCircleChart = ({ data }: { data: MoodEntry[] }) => {
  const avgMood = data.reduce((sum, d) => sum + d.mood, 0) / data.length;
  const avgMoodIndex = Math.round(avgMood) - 1;
  const avgMoodInfo = moods[avgMoodIndex];

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        {/* Background circles */}
        <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
        <circle cx="128" cy="128" r="100" stroke="rgba(255,255,255,0.02)" strokeWidth="20" fill="none" />
        
        {/* Mood level indicators */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
          <circle
            key={i}
            cx="128"
            cy="128"
            r={80 - i * 12}
            stroke={`rgba(143,181,131,${opacity * 0.2})`}
            strokeWidth="0.5"
            strokeDasharray="2 4"
            fill="none"
          />
        ))}

        {/* Progress arc based on avg mood */}
        <motion.circle
          cx="128"
          cy="128"
          r="100"
          stroke={avgMoodInfo.color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ 
            strokeDasharray: 628.32, 
            strokeDashoffset: 628.32 
          }}
          animate={{ 
            strokeDashoffset: 628.32 - (628.32 * avgMood / 5) 
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          transform="rotate(-90 128 128)"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl mb-2">{avgMoodInfo.emoji}</span>
        <span className="text-2xl font-heading text-white/90">{avgMood.toFixed(1)}</span>
        <span className="text-[10px] uppercase tracking-wider text-white/40 mt-1">средний балл</span>
      </div>
    </div>
  );
};

// Week Mood Bar Chart
const WeekMoodChart = ({ data }: { data: MoodEntry[] }) => {
  const lastWeek = data.slice(-7);

  return (
    <div className="flex items-end justify-between h-32 gap-2">
      {lastWeek.map((day, index) => {
        const moodInfo = moods[day.mood - 1];
        const height = (day.mood / 5) * 100;

        return (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-2 flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.div
              className="w-full rounded-t-lg relative overflow-hidden"
              style={{ backgroundColor: `${moodInfo.color}30` }}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Inner gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{ background: `linear-gradient(to top, ${moodInfo.color}50, transparent)` }}
              />
            </motion.div>
            <span className="text-[9px] text-white/40">{day.dayOfWeek}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

// Mood Heatmap for the month
const MoodHeatmap = ({ data }: { data: MoodEntry[] }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {data.map((day, index) => {
        const moodInfo = moods[day.mood - 1];
        return (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className="relative group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: `${moodInfo.color}40` }}
            >
              <span className="text-xs">{day.emoji}</span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#1a1d1a] border border-white/10 text-[10px] text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {day.date}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Stats Card
const StatCard = ({ icon: Icon, label, value, sublabel, color }: { 
  icon: React.FC; 
  label: string; 
  value: string; 
  sublabel: string;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
  >
    <div 
      className="absolute top-0 right-0 w-20 h-20 opacity-10 blur-xl"
      style={{ backgroundColor: color }}
    />
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4" style={{ color }}>
          <Icon />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-white/40">{label}</span>
      </div>
      <p className="text-xl font-heading text-white/90">{value}</p>
      <p className="text-[10px] text-white/40 mt-1">{sublabel}</p>
    </div>
  </motion.div>
);

// Icons
const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 18 L10 12 L14 16 L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10 L20 10 L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 3 L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 3 L14 9 L20 9 L15 13 L17 19 L12 15 L7 19 L9 13 L4 9 L10 9 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export default function CabinetMood() {
  const [moodData] = useState<MoodEntry[]>(generateMoodData);
  const [view, setView] = useState<"chart" | "heatmap">("chart");

  // Calculate stats
  const avgMood = moodData.reduce((sum, d) => sum + d.mood, 0) / moodData.length;
  const bestDay = moodData.reduce((best, d) => d.mood > best.mood ? d : best);
  const streak = moodData.filter(d => d.mood >= 4).length;
  const trend = avgMood > 3 ? "+0.3" : "-0.2";

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
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Благополучие</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Трекер настроения
        </h1>
        <p className="text-white/40 text-sm">
          Отслеживай своё эмоциональное состояние
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-60 h-60 opacity-20">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <circle cx="100" cy="100" r="80" stroke="rgba(122,158,187,0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="rgba(122,158,187,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* View Toggle */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-[0.15em] text-white/40">Последние 30 дней</span>
                <div className="flex rounded-lg bg-white/[0.03] p-1">
                  <button
                    onClick={() => setView("chart")}
                    className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                      view === "chart" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    График
                  </button>
                  <button
                    onClick={() => setView("heatmap")}
                    className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                      view === "heatmap" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    Карта
                  </button>
                </div>
              </div>

              {/* Chart/Heatmap */}
              {view === "chart" ? (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <MoodCircleChart data={moodData} />
                  <div className="flex-1 w-full">
                    <p className="text-xs text-white/40 mb-4">Эта неделя</p>
                    <WeekMoodChart data={moodData} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-white/40 mb-4">Карта настроения за месяц</p>
                  <MoodHeatmap data={moodData} />
                </div>
              )}

              {/* Mood Legend */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {moods.map((mood) => (
                    <div key={mood.level} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: mood.color }}
                      />
                      <span className="text-[10px] text-white/40">{mood.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <StatCard
            icon={TrendUpIcon}
            label="Тренд"
            value={trend}
            sublabel="за последнюю неделю"
            color="#8fb583"
          />
          <StatCard
            icon={StarIcon}
            label="Лучший день"
            value={bestDay.date}
            sublabel={`${bestDay.emoji} ${moods[bestDay.mood - 1].label}`}
            color="#b49b78"
          />
          <StatCard
            icon={HeartIcon}
            label="Хорошие дни"
            value={`${streak}`}
            sublabel="за месяц"
            color="#7a9ebb"
          />
          <StatCard
            icon={CalendarIcon}
            label="Записей"
            value={`${moodData.length}`}
            sublabel="всего отслежено"
            color="#9a8fb5"
          />

          {/* Quick Mood Entry */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#7a9ebb]/10 to-transparent border border-[#7a9ebb]/20">
            <p className="text-xs text-white/50 mb-3">Как ты сейчас?</p>
            <div className="flex justify-between">
              {moods.map((mood) => (
                <button
                  key={mood.level}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${mood.color}20` }}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8"
      >
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-[#b49b78]">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 6 L10 10 L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs uppercase tracking-[0.15em] text-white/40">Инсайты</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <p className="text-sm text-white/70 mb-2">🌅 Лучшее время</p>
              <p className="text-xs text-white/40">Твоё настроение обычно лучше всего утром</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <p className="text-sm text-white/70 mb-2">📈 Положительный тренд</p>
              <p className="text-xs text-white/40">Твоё среднее настроение растёт последние 2 недели</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <p className="text-sm text-white/70 mb-2">💪 Рекомендация</p>
              <p className="text-xs text-white/40">Практика дыхания помогает в дни тревоги</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


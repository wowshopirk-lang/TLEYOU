"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Premium botanical mood icons
const MoodIcons = {
  // Withering - feeling terrible
  withering: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Fallen, wilted leaf */}
      <path 
        d="M8 10 Q16 8, 24 14 Q26 20, 22 24 Q18 26, 12 24 Q8 22, 8 16 Q8 12, 8 10" 
        stroke={color} 
        strokeWidth="1" 
        fill={`${color}15`}
        opacity="0.7"
      />
      {/* Broken stem */}
      <path d="M8 10 L6 6" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Decay marks */}
      <circle cx="14" cy="16" r="1" fill={color} opacity="0.3" />
      <circle cx="18" cy="20" r="0.75" fill={color} opacity="0.25" />
    </svg>
  ),
  // Tender/drooping - feeling low
  tender: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Delicate drooping leaf */}
      <path 
        d="M16 6 Q22 10, 22 16 Q22 22, 16 26 Q10 22, 10 16 Q10 10, 16 6" 
        stroke={color} 
        strokeWidth="1" 
        fill={`${color}15`}
        opacity="0.8"
      />
      {/* Leaf vein */}
      <path d="M16 8 L16 24" stroke={color} strokeWidth="0.75" opacity="0.5" />
      <path d="M16 12 Q12 14, 11 16" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <path d="M16 12 Q20 14, 21 16" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      {/* Dew drop - tear */}
      <circle cx="13" cy="19" r="1.25" fill={color} opacity="0.5" />
    </svg>
  ),
  // Balanced - feeling neutral
  balanced: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Outer circle */}
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Horizontal balance line */}
      <line x1="6" y1="16" x2="26" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Vertical support */}
      <line x1="16" y1="10" x2="16" y2="22" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Balance points */}
      <circle cx="9" cy="16" r="2.5" stroke={color} strokeWidth="1" fill={`${color}20`} opacity="0.7" />
      <circle cx="23" cy="16" r="2.5" stroke={color} strokeWidth="1" fill={`${color}20`} opacity="0.7" />
      {/* Center diamond */}
      <path d="M16 12 L18 16 L16 20 L14 16 Z" stroke={color} strokeWidth="0.75" fill={`${color}25`} opacity="0.7" />
    </svg>
  ),
  // Calm wave - feeling peaceful
  calm: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Flowing water curves */}
      <path d="M8 14 Q12 11, 16 14 Q20 17, 24 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M10 18 Q14 15, 18 18 Q22 21, 26 18" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M6 22 Q10 19, 14 22" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.35" />
      {/* Moon accent */}
      <circle cx="22" cy="10" r="2" stroke={color} strokeWidth="0.75" fill={`${color}20`} opacity="0.6" />
    </svg>
  ),
  // Radiant bloom - feeling great
  radiant: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1" opacity="0.8" />
      <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
      {/* Petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={i}
          d={`M16 6 Q18 3, 16 1 Q14 3, 16 6`}
          stroke={color}
          strokeWidth="1"
          fill={`${color}30`}
          transform={`rotate(${angle} 16 16)`}
          opacity="0.7"
        />
      ))}
      <circle cx="16" cy="16" r="2" fill={color} opacity="0.7" />
    </svg>
  ),
};

// Mood data types
interface MoodEntry {
  date: string;
  dayOfWeek: string;
  mood: number; // 1-5
  iconKey: keyof typeof MoodIcons;
}

// Last 30 days mood data (sample)
const generateMoodData = (): MoodEntry[] => {
  const iconKeys: (keyof typeof MoodIcons)[] = ["withering", "tender", "balanced", "calm", "radiant"];
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
      iconKey: iconKeys[mood - 1],
    });
  }
  return data;
};

const moods = [
  { level: 1, icon: MoodIcons.withering, label: "Плохо", color: "#b58f8f" },
  { level: 2, icon: MoodIcons.tender, label: "Грустно", color: "#9a8fb5" },
  { level: 3, icon: MoodIcons.balanced, label: "Нормально", color: "#b49b78" },
  { level: 4, icon: MoodIcons.calm, label: "Хорошо", color: "#7a9ebb" },
  { level: 5, icon: MoodIcons.radiant, label: "Отлично", color: "#8fb583" },
];

// Circular Mood Chart Component
const MoodCircleChart = ({ data }: { data: MoodEntry[] }) => {
  const avgMood = data.reduce((sum, d) => sum + d.mood, 0) / data.length;
  const avgMoodIndex = Math.round(avgMood) - 1;
  const avgMoodInfo = moods[avgMoodIndex];

  return (
    <div className="relative w-full h-full mx-auto">
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
        <div className="w-8 h-8 mb-1">
          {avgMoodInfo.icon(avgMoodInfo.color, "w-full h-full")}
        </div>
        <span className="text-xl font-heading text-white/90">{avgMood.toFixed(1)}</span>
        <span className="text-[9px] uppercase tracking-wider text-white/40 mt-0.5">средний балл</span>
      </div>
    </div>
  );
};

// Week Mood Bar Chart
const WeekMoodChart = ({ data }: { data: MoodEntry[] }) => {
  const lastWeek = data.slice(-7);

  return (
    <div className="flex items-end justify-between h-24 gap-1.5">
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
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform p-1.5"
              style={{ backgroundColor: `${moodInfo.color}40` }}
            >
              {moodInfo.icon(moodInfo.color, "w-full h-full")}
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
    className="relative p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex-shrink-0"
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
    <div className="max-w-5xl mx-auto h-full flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#7a9ebb]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Благополучие</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-light text-white mb-1">
          Трекер настроения
        </h1>
        <p className="text-white/40 text-xs">
          Отслеживай своё эмоциональное состояние
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Left - Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col"
        >
          <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex-1 flex flex-col">
            {/* Decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-60 h-60 opacity-20">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <circle cx="100" cy="100" r="80" stroke="rgba(122,158,187,0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="rgba(122,158,187,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              {/* View Toggle */}
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">Последние 30 дней</span>
                <div className="flex rounded-lg bg-white/[0.03] p-1">
                  <button
                    onClick={() => setView("chart")}
                    className={`px-2.5 py-1 rounded-md text-[10px] transition-all ${
                      view === "chart" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    График
                  </button>
                  <button
                    onClick={() => setView("heatmap")}
                    className={`px-2.5 py-1 rounded-md text-[10px] transition-all ${
                      view === "heatmap" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    Карта
                  </button>
                </div>
              </div>

              {/* Chart/Heatmap */}
              <div className="flex-1 flex items-center justify-center min-h-0">
                {view === "chart" ? (
                  <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                    <div className="w-40 h-40 flex-shrink-0">
                      <MoodCircleChart data={moodData} />
                    </div>
                    <div className="flex-1 w-full">
                      <p className="text-[10px] text-white/40 mb-2">Эта неделя</p>
                      <WeekMoodChart data={moodData} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <p className="text-[10px] text-white/40 mb-2">Карта настроения за месяц</p>
                    <MoodHeatmap data={moodData} />
                  </div>
                )}
              </div>

              {/* Mood Legend */}
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex-shrink-0">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {moods.map((mood) => (
                    <div key={mood.level} className="flex items-center gap-1.5">
                      <div className="w-4 h-4">
                        {mood.icon(mood.color, "w-full h-full")}
                      </div>
                      <span className="text-[9px] text-white/40 whitespace-nowrap">{mood.label}</span>
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
          className="flex flex-col gap-3 h-full"
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
            sublabel={moods[bestDay.mood - 1].label}
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#7a9ebb]/10 to-transparent border border-[#7a9ebb]/20 flex-shrink-0">
            <p className="text-[10px] text-white/50 mb-2">Как ты сейчас?</p>
            <div className="flex justify-between gap-1">
              {moods.map((mood) => (
                <button
                  key={mood.level}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform p-1.5 flex-1"
                  style={{ backgroundColor: `${mood.color}20` }}
                >
                  {mood.icon(mood.color, "w-full h-full")}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights Section - Hidden for compact view */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 flex-shrink-0"
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
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-[#b49b78]">
                  <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 9 L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 6 L10 4 L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-white/70">Лучшее время</span>
              </div>
              <p className="text-xs text-white/40">Твоё настроение обычно лучше всего утром</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-[#8fb583]">
                  <path d="M4 16 L8 10 L12 12 L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="4" r="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className="text-sm text-white/70">Положительный тренд</span>
              </div>
              <p className="text-xs text-white/40">Твоё среднее настроение растёт последние 2 недели</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-[#7a9ebb]">
                  <path d="M10 3 Q14 6, 14 10 Q14 14, 10 17 Q6 14, 6 10 Q6 6, 10 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M10 5 L10 15" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
                </svg>
                <span className="text-sm text-white/70">Рекомендация</span>
              </div>
              <p className="text-xs text-white/40">Практика дыхания помогает в дни тревоги</p>
            </div>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
}


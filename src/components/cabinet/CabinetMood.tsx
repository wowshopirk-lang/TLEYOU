"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMoodStore, MoodKey } from "@/stores/moodStore";
import { usePracticesStore } from "@/stores/practicesStore";

// Botanical Icons
const LightBulbLeafIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <path d="M16 4 Q22 8, 22 14 Q22 18, 18 22 L14 22 Q10 18, 10 14 Q10 8, 16 4" stroke={color} strokeWidth="1" fill={`${color}15`} />
    <path d="M13 22 L13 26 Q13 28, 16 28 Q19 28, 19 26 L19 22" stroke={color} strokeWidth="1" />
    <circle cx="16" cy="12" r="2" fill={color} opacity="0.3" />
  </svg>
);

// Mood categories
const moodLevels = [
  { key: "great", label: "Отлично", color: "#8fb583" },
  { key: "good", label: "Хорошо", color: "#7a9ebb" },
  { key: "neutral", label: "Нейтрально", color: "#b49b78" },
  { key: "low", label: "Грустно", color: "#9a8fb5" },
  { key: "bad", label: "Тяжело", color: "#8b7355" },
];

const moodKeyToLevel = (moodKey: MoodKey | null): number => {
  if (!moodKey) return 2;
  const map: Record<MoodKey, number> = {
    radiant: 0, energetic: 0, inspired: 0,
    calm: 1, peaceful: 1, grateful: 1,
    balanced: 2,
    tender: 3, tired: 3, anxious: 3, confused: 3,
  };
  return map[moodKey] ?? 2;
};

// Wave Chart Component
const WaveChart = ({ data }: { data: number[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    
    const updateDimensions = () => {
      const rect = parent.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = dimensions;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, width, height);
    
    const padding = 10;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    const points = data.map((v, i) => ({
      x: padding + (i / (data.length - 1)) * chartWidth,
      y: padding + ((4 - v) / 4) * chartHeight,
    }));
    
    const drawCurve = (pts: typeof points) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      ctx.quadraticCurveTo(pts[pts.length - 1].x, pts[pts.length - 1].y, pts[pts.length - 1].x, pts[pts.length - 1].y);
    };
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(143, 181, 131, 0.4)');
    gradient.addColorStop(0.5, 'rgba(122, 158, 187, 0.2)');
    gradient.addColorStop(1, 'rgba(143, 181, 131, 0)');
    
    ctx.save();
    drawCurve(points);
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.lineTo(points[0].x, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
    
    // Main line with glow
    ctx.save();
    ctx.shadowColor = '#8fb583';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#8fb583';
    ctx.lineWidth = 2;
    drawCurve(points);
    ctx.stroke();
    ctx.restore();
    
    // Dots
    points.forEach((p, i) => {
      if (i % 3 === 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#8fb583';
        ctx.shadowColor = '#8fb583';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
    
    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
  }, [data, dimensions]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

// Compact Bar
const CompactBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] text-white/40 w-14 truncate">{label}</span>
    <div className="flex-1 h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8 }}
      />
    </div>
    <span className="text-[10px] text-white/50 w-8 text-right">{value.toFixed(0)}%</span>
  </div>
);

export default function CabinetMood() {
  const { moodHistory } = useMoodStore();
  const { getTimeOfDayStats } = usePracticesStore();
  const [isMounted, setIsMounted] = useState(false);
  const [practiceTimeStats, setPracticeTimeStats] = useState({
    total: 0,
    mostActiveTime: "—",
    timeActivity: [
      { label: "Утро", value: 0, count: 0, isMax: false },
      { label: "День", value: 0, count: 0, isMax: false },
      { label: "Вечер", value: 0, count: 0, isMax: false },
      { label: "Ночь", value: 0, count: 0, isMax: false },
    ],
    activityInsight: "Пройди первую практику, чтобы увидеть аналитику",
    formattedHour: "00:00",
  });
  
  const chartData = useMemo(() => {
    const data: number[] = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const entry = moodHistory.find(m => m.date === dateStr);
      data.push(4 - moodKeyToLevel(entry?.mood || null));
    }
    return data;
  }, [moodHistory]);
  
  const stats = useMemo(() => {
    const levels = chartData;
    const avg = levels.reduce((s, v) => s + v, 0) / levels.length;
    const goodDays = levels.filter(v => v >= 3).length;
    const trend = levels.slice(-7).reduce((s, v) => s + v, 0) / 7 - levels.slice(0, 7).reduce((s, v) => s + v, 0) / 7;
    const stability = 100 - (Math.max(...levels) - Math.min(...levels)) * 15;
    
    const dist = [0, 0, 0, 0, 0];
    levels.forEach(v => dist[4 - Math.round(v)]++);
    const distPercent = dist.map(d => (d / levels.length) * 100);
    
    // Find best day
    const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const maxValue = Math.max(...levels);
    const bestDayIndex = levels.indexOf(maxValue);
    const bestDate = new Date();
    bestDate.setDate(bestDate.getDate() - 13 + bestDayIndex);
    const bestDay = dayNames[bestDate.getDay()];
    
    return { avg, goodDays, trend, stability: Math.max(0, stability), distPercent, bestDay };
  }, [chartData]);
  
  // Update practice time stats on client only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsMounted(true);
    
    const updateStats = () => {
      const stats = getTimeOfDayStats();
      const total = stats.total || 1;
      
      const morningPercent = (stats.morning / total) * 100;
      const afternoonPercent = (stats.afternoon / total) * 100;
      const eveningPercent = (stats.evening / total) * 100;
      const nightPercent = (stats.night / total) * 100;
      
      const maxPercent = Math.max(morningPercent, afternoonPercent, eveningPercent, nightPercent);
      
      const timeActivity = [
        { label: "Утро", value: morningPercent, count: stats.morning, isMax: morningPercent === maxPercent && stats.morning > 0 },
        { label: "День", value: afternoonPercent, count: stats.afternoon, isMax: afternoonPercent === maxPercent && stats.afternoon > 0 },
        { label: "Вечер", value: eveningPercent, count: stats.evening, isMax: eveningPercent === maxPercent && stats.evening > 0 },
        { label: "Ночь", value: nightPercent, count: stats.night, isMax: nightPercent === maxPercent && stats.night > 0 },
      ];
      
      let activityInsight = "";
      if (stats.total === 0) {
        activityInsight = "Пройди первую практику, чтобы увидеть аналитику";
      } else if (stats.total < 3) {
        activityInsight = `${stats.total} ${stats.total === 1 ? 'практика' : 'практики'} — продолжай для точной аналитики`;
      } else {
        const mostActive = timeActivity.find(t => t.isMax);
        if (mostActive) {
          if (mostActive.label === "Утро") activityInsight = "Ты чаще занимаешься утром — планируй практики на 6:00–12:00";
          else if (mostActive.label === "День") activityInsight = "Твоё активное время — день. Планируй на 12:00–18:00";
          else if (mostActive.label === "Вечер") activityInsight = "Вечер — твоё время. Планируй практики на 18:00–22:00";
          else activityInsight = "Ты сова! Твоё время — после 22:00";
        }
      }
      
      const formattedHour = stats.mostActiveHour < 10 
        ? `0${stats.mostActiveHour}:00` 
        : `${stats.mostActiveHour}:00`;
      
      setPracticeTimeStats({
        total: stats.total,
        mostActiveTime: stats.total > 0 ? stats.mostActiveTime : "—",
        timeActivity,
        activityInsight,
        formattedHour,
      });
    };
    
    // Delay update to ensure Zustand stores are rehydrated
    setTimeout(updateStats, 0);
    
    // Subscribe to practices store changes
    const unsubscribe = usePracticesStore.subscribe(
      (state) => state.completedPractices,
      () => updateStats()
    );
    
    return () => unsubscribe();
  }, [getTimeOfDayStats]);
  
  const currentMood = moodLevels[4 - Math.round(stats.avg)];
  const adviceColor = stats.trend > 0.2 ? '#8fb583' : stats.trend < -0.2 ? '#9a8fb5' : '#7a9ebb';

  const getAdvice = () => {
    if (stats.trend > 0.3) return 'Отличная динамика! Продолжай практики — они работают.';
    if (stats.trend < -0.3) return stats.avg < 2 
      ? 'Попробуй дыхание 4-7-8 или запиши мысли в дневник.'
      : 'Добавь короткую медитацию утром для стабилизации.';
    if (stats.goodDays < 5) return 'Отмечай 3 вещи благодарности ежедневно — это меняет восприятие.';
    if (stats.stability < 60) return 'Регулярный сон поможет выровнять настроение.';
    return 'Стабильное состояние. Добавь новую практику для роста.';
  };

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: currentMood.color }} />
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">Трекер настроения</span>
        </div>
        <span className="text-[10px] text-white/30">14 дней</span>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left: Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 flex flex-col min-w-0"
        >
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-1 flex-shrink-0">
            <span className="text-xs text-white/50">Динамика</span>
            <div className="flex gap-2">
              {moodLevels.slice(0, 3).map((m, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[8px] text-white/30">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chart */}
          <div className="flex-1 min-h-0">
            <WaveChart data={chartData} />
          </div>
          
          {/* X-axis */}
          <div className="flex justify-between px-2 mt-1 flex-shrink-0">
            {Array.from({ length: 7 }).map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - 13 + i * 2);
              return <span key={i} className="text-[8px] text-white/20">{d.getDate()}</span>;
            })}
          </div>
        </motion.div>

        {/* Right: Stats & Advice */}
        <div className="w-64 flex flex-col gap-2 flex-shrink-0">
          {/* Current State - Compact */}
          <div 
            className="p-3 rounded-xl border"
            style={{ backgroundColor: `${currentMood.color}10`, borderColor: `${currentMood.color}25` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[8px] text-white/40 uppercase">Сейчас</span>
                <p className="text-base font-heading" style={{ color: currentMood.color }}>{currentMood.label}</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-white/40 uppercase">Тренд</span>
                <p className="text-sm text-white/60">
                  {stats.trend > 0.2 ? '↑' : stats.trend < -0.2 ? '↓' : '→'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-center">
              <p className="text-lg font-heading text-[#8fb583]">{stats.goodDays}</p>
              <p className="text-[8px] text-white/30 uppercase">Хороших дней</p>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-center">
              <p className="text-lg font-heading text-[#b49b78]">{stats.stability.toFixed(0)}%</p>
              <p className="text-[8px] text-white/30 uppercase">Стабильность</p>
            </div>
          </div>

          {/* Best Day + Best Time */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[8px] text-white/30 uppercase">Лучший день</span>
              <p className="text-xs text-white/70 mt-0.5">{stats.bestDay}</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#8fb583]/10 to-transparent border border-[#8fb583]/20">
              <span className="text-[8px] text-[#8fb583]/60 uppercase">Твоё время</span>
              <p className="text-xs text-white/70 mt-0.5" suppressHydrationWarning>
                {practiceTimeStats.total > 0 ? practiceTimeStats.mostActiveTime : "—"}
              </p>
            </div>
          </div>

          {/* Activity Tracker - Real Time Data */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] text-white/30 uppercase">Когда ты занимаешься</span>
              <span className="text-[8px] text-white/20" suppressHydrationWarning>{practiceTimeStats.total} практик</span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-12">
              {practiceTimeStats.timeActivity.map((activity, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="relative w-full flex items-end justify-center" style={{ height: 36 }}>
                    <motion.div
                      className="w-full rounded-t relative"
                      style={{ 
                        backgroundColor: activity.isMax ? '#8fb583' : 'rgba(255,255,255,0.08)',
                        boxShadow: activity.isMax ? '0 0 12px #8fb58340' : 'none'
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: practiceTimeStats.total > 0 ? `${Math.max((activity.value / 100) * 36, activity.count > 0 ? 8 : 0)}px` : 4 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    />
                    {activity.count > 0 && (
                      <span className="absolute -top-3 text-[8px] text-white/50">{activity.count}</span>
                    )}
                  </div>
                  <span className={`text-[8px] ${activity.isMax ? 'text-[#8fb583]' : 'text-white/30'}`}>
                    {activity.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-white/50 mt-2 text-center leading-relaxed" suppressHydrationWarning>
              {practiceTimeStats.activityInsight}
            </p>
            {practiceTimeStats.total >= 3 && (
              <p className="text-[8px] text-[#8fb583]/60 mt-1 text-center" suppressHydrationWarning>
                Пик активности: {practiceTimeStats.formattedHour}
              </p>
            )}
          </div>

          {/* Distribution - Compact */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[8px] text-white/30 uppercase">Распределение</span>
            <div className="mt-1.5 space-y-1">
              {moodLevels.map((m, i) => (
                <CompactBar key={i} label={m.label} value={stats.distPercent[i]} color={m.color} />
              ))}
            </div>
          </div>

          {/* Advice - Compact */}
          <div 
            className="flex-1 p-2.5 rounded-xl border min-h-0"
            style={{ 
              background: `linear-gradient(135deg, ${adviceColor}15 0%, transparent 100%)`,
              borderColor: `${adviceColor}30`
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-3.5 h-3.5">
                <LightBulbLeafIcon color={adviceColor} />
              </div>
              <span className="text-[8px] uppercase tracking-wider" style={{ color: adviceColor }}>
                {stats.trend > 0.2 ? 'Отлично!' : stats.trend < -0.2 ? 'Совет' : 'Рекомендация'}
              </span>
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed">{getAdvice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

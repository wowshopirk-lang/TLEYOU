"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Practice, getAllPractices, getWeeklyPractices } from "@/data/practices";
import { usePracticesStore } from "@/stores/practicesStore";

// Icons
const AudioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
  </svg>
);

const TextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 6 L20 6 M4 12 L20 12 M4 18 L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10 L16 12 L10 14 Z" fill="currentColor" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type TabType = "all" | "favorites" | "completed";

// Practice Card Component
const PracticeCard = ({ 
  practice, 
  delay 
}: { 
  practice: Practice; 
  delay: number;
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites, isPracticeCompletedFully } = usePracticesStore();
  const isFav = isFavorite(practice.id);
  const isCompleted = isPracticeCompletedFully(practice.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFromFavorites(practice.id);
    } else {
      addToFavorites(practice.id);
    }
  };

  const getTypeIcon = () => {
    switch (practice.type) {
      case 'audio':
        return <AudioIcon />;
      case 'text':
        return <TextIcon />;
      case 'video':
        return <VideoIcon />;
    }
  };

  const getTypeLabel = () => {
    switch (practice.type) {
      case 'audio':
        return 'Аудио';
      case 'text':
        return 'Текст';
      case 'video':
        return 'Видео';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <Link href={`/cabinet/practices?practice=${practice.id}`}>
        <div className={`relative bg-gradient-to-br ${practice.color ? `from-[${practice.color}]/20 to-[${practice.color}]/10` : 'from-white/[0.02] to-white/[0.01]'} border border-white/[0.06] rounded-xl p-4 overflow-hidden hover:border-white/[0.12] transition-all duration-300 cursor-pointer h-full flex flex-col`}>
          {/* Background decoration */}
          <div className="absolute -top-8 -right-8 w-32 h-32 opacity-10">
            {getTypeIcon()}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all z-10 ${
              isFav
                ? 'bg-[#c49b88]/20 text-[#c49b88]'
                : 'bg-white/[0.05] text-white/30 hover:text-white/60 hover:bg-white/[0.08]'
            }`}
          >
            <div className="w-3.5 h-3.5">
              <HeartIcon filled={isFav} />
            </div>
          </button>

          {/* Completed badge */}
          {isCompleted && (
            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-[#8fb583]/20 border border-[#8fb583]/30 z-10">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 text-[#8fb583]">
                  <CheckIcon />
                </div>
                <span className="text-[8px] uppercase tracking-wider text-[#8fb583]">Пройдена</span>
              </div>
            </div>
          )}

          <div className="relative z-10 flex-1 flex flex-col">
            {/* Icon and Category */}
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${practice.color}20` }}
              >
                <div className="w-4 h-4" style={{ color: practice.color }}>
                  {getTypeIcon()}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span 
                    className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${practice.color}15`, color: practice.color }}
                  >
                    {practice.category}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-white/30 px-1.5 py-0.5 rounded-full bg-white/5">
                    {getTypeLabel()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/30 text-[8px] mt-0.5">
                  <span>{practice.duration}</span>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-sm font-heading font-light text-white/90 mb-1 line-clamp-1 flex-shrink-0">
              {practice.title}
            </h3>
            <p className="text-xs text-white/40 mb-3 line-clamp-2 flex-1">
              {practice.description}
            </p>

            {/* Start button */}
            <div className="flex items-center gap-2 mt-auto">
              <div className="flex-1 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center text-white/80 hover:bg-white/[0.12] transition-all text-xs font-medium">
                Начать
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function CabinetPractices() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  
  const { getFavoritePractices, getCompletedPractices, isFavorite, isPracticeCompletedFully } = usePracticesStore();
  
  // Get practices - 7 weekly practices for "all" tab, all practices for other tabs
  const weeklyPractices = getWeeklyPractices();
  const allPractices = getAllPractices();
  
  // Filter practices based on tab
  const filteredPractices = useMemo(() => {
    // Для вкладки "Все" показываем только 7 практик недели
    let practices = activeTab === "all" ? weeklyPractices : allPractices;
    
    // Filter by tab
    if (activeTab === "favorites") {
      const favoriteIds = getFavoritePractices();
      practices = practices.filter(p => favoriteIds.includes(p.id));
    } else if (activeTab === "completed") {
      practices = practices.filter(p => isPracticeCompletedFully(p.id));
    }
    
    return practices;
  }, [weeklyPractices, allPractices, activeTab, getFavoritePractices, isPracticeCompletedFully]);

  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "Все" },
    { id: "favorites", label: "Избранное" },
    { id: "completed", label: "Пройденные" },
  ];


  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col min-h-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-2 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Основное</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-light text-white mb-1">
          Практики осознанности
        </h1>
        <p className="text-white/40 text-xs mb-0.5">
          Медитации, дыхательные упражнения и практики релаксации
        </p>
        {activeTab === "all" && (
          <p className="text-[10px] text-[#8fb583]/70 flex items-center gap-1">
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
              <path d="M8 1 L8 8 L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            7 новых практик каждую неделю
          </p>
        )}
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-2 flex-shrink-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#8fb583]/20 text-[#8fb583] border border-[#8fb583]/30'
                : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.15]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Practices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 flex-1 min-h-0 content-start">
        {filteredPractices.length > 0 ? (
          filteredPractices.map((practice, index) => (
            <PracticeCard
              key={practice.id}
              practice={practice}
              delay={index * 0.05}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-white/40 mb-2">
              {activeTab === "favorites" 
                ? "У тебя пока нет избранных практик"
                : activeTab === "completed"
                ? "Ты ещё не завершила ни одной практики"
                : "Практики не найдены"}
            </p>
            {activeTab !== "all" && (
              <button
                onClick={() => setActiveTab("all")}
                className="text-[#8fb583] hover:underline text-sm"
              >
                Посмотреть все практики
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPracticeById } from "@/data/practices";
import { usePracticesStore } from "@/stores/practicesStore";
import AudioPractice from "./AudioPractice";
import TextPractice from "./TextPractice";
import VideoPractice from "./VideoPractice";

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M19 12 L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 19 L5 12 L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 20 C12 20, 3 13, 3 7.5 C3 4.5, 6 3, 8 4.5 C9 5.2, 10 6, 10 6 C10 6, 11 5.2, 12 4.5 C14 3, 17 4.5, 17 7.5 C17 13, 12 20, 12 20"
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

export default function PracticeDetail({ practiceId }: { practiceId: string }) {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  
  const practice = getPracticeById(practiceId);
  const { isFavorite, addToFavorites, removeFromFavorites, isPracticeCompletedFully, favoritePractices } = usePracticesStore();

  if (!practice) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <p className="text-white/60 mb-4">Практика не найдена</p>
          <Link href="/cabinet/practices" className="text-[#8fb583] hover:underline">
            Вернуться к списку практик
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = isPracticeCompletedFully(practice.id);
  const isFav = favoritePractices.includes(practice.id);

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isFav) {
      removeFromFavorites(practice.id);
    } else {
      addToFavorites(practice.id);
    }
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleComplete = () => {
    // Practice completed, redirect to practices page
    router.push('/cabinet/practices');
  };

  // Render practice component based on type
  const renderPractice = () => {
    if (!hasStarted) return null;

    switch (practice.type) {
      case 'audio':
        return <AudioPractice practice={practice} onComplete={handleComplete} />;
      case 'text':
        return <TextPractice practice={practice} onComplete={handleComplete} />;
      case 'video':
        return <VideoPractice practice={practice} onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {!hasStarted ? (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-6"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-4"
            >
              <div className="w-5 h-5">
                <BackIcon />
              </div>
              <span className="text-sm">Назад</span>
            </button>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${practice.color}50` }} />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{practice.category}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
              </div>
              
              {/* Favorite button */}
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-xl transition-all ${
                  isFav
                    ? 'bg-[#c49b88]/20 text-[#c49b88]'
                    : 'bg-white/[0.02] text-white/40 hover:text-white/70 hover:bg-white/[0.05]'
                }`}
              >
                <div className="w-5 h-5">
                  <HeartIcon filled={isFav} />
                </div>
              </button>
            </div>
            
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-1">
                  {practice.title}
                </h1>
                <p className="text-white/40 text-sm">{practice.subtitle}</p>
              </div>
              
              {/* Completed badge */}
              {isCompleted && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8fb583]/20 border border-[#8fb583]/30">
                  <div className="w-4 h-4 text-[#8fb583]">
                    <CheckIcon />
                  </div>
                  <span className="text-xs text-[#8fb583] uppercase tracking-wider">Пройдена</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 px-6"
          >
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-white/70 leading-relaxed mb-4">{practice.description}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: practice.color }} />
                  <span className="text-xs text-white/40">{practice.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: practice.color }} />
                  <span className="text-xs text-white/40 capitalize">{practice.type}</span>
                </div>
                {practice.steps && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: practice.color }} />
                    <span className="text-xs text-white/40">{practice.steps.length} шагов</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-6 pb-6"
          >
            <div className="text-center py-8">
              <div 
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-2"
                style={{ 
                  backgroundColor: `${practice.color}15`,
                  borderColor: `${practice.color}40`,
                  color: practice.color
                }}
              >
                {practice.type === 'audio' && (
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
                    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
                  </svg>
                )}
                {practice.type === 'text' && (
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
                    <path d="M4 6 L20 6 M4 12 L20 12 M4 18 L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
                {practice.type === 'video' && (
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 10 L16 12 L10 14 Z" fill="currentColor" />
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-heading text-white/90 mb-3">Готова начать?</h2>
              <p className="text-white/50 mb-6 max-w-md mx-auto">
                Эта практика займёт {practice.duration}. Найди тихое место, где тебя никто не потревожит.
              </p>
              <button
                onClick={handleStart}
                className="px-8 py-3.5 rounded-xl text-white font-medium transition-all hover:scale-105"
                style={{ backgroundColor: practice.color }}
              >
                Начать практику
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Back button when practice is running */}
          <div className="px-6 pt-4 pb-2">
            <button
              onClick={() => setHasStarted(false)}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
            >
              <div className="w-5 h-5">
                <BackIcon />
              </div>
              <span className="text-sm">Назад</span>
            </button>
          </div>
          
          {/* Practice component */}
          <div className="flex-1 overflow-hidden">
            {renderPractice()}
          </div>
        </>
      )}
    </div>
  );
}

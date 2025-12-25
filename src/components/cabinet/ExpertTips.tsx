"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExpertTip, getAllTips, getTipOfDay } from "@/data/expertTips";
import { useUserStore } from "@/stores/userStore";

// Icons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
  </svg>
);

const ExpertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 20 C6 16.69 8.69 14 12 14 C15.31 14 18 16.69 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Tip Card Component
const TipCard = ({ tip, delay }: { tip: ExpertTip; delay: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] rounded-2xl p-6 overflow-hidden hover:border-white/[0.12] transition-all duration-300">
        {/* Background decoration */}
        <div className="absolute -top-8 -right-8 w-32 h-32 opacity-5">
          <ExpertIcon />
        </div>

        {/* Video thumbnail or placeholder */}
        <div className="relative aspect-video bg-black/20 rounded-xl overflow-hidden mb-4">
          {tip.videoUrl ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#8fb583]/20 to-[#7a9ebb]/20">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <div className="w-8 h-8 ml-1">
                  <PlayIcon />
                </div>
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#8fb583]/10 to-[#7a9ebb]/10">
              <div className="w-12 h-12 text-white/30">
                <ExpertIcon />
              </div>
            </div>
          )}
          {tip.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-xs">
              {tip.duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 text-[#8fb583]">
              <ExpertIcon />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-white/30">Совет эксперта</span>
          </div>
          
          <h3 className="text-lg font-heading font-light text-white/90 mb-2 line-clamp-2">
            {tip.title}
          </h3>
          
          <p className="text-sm text-white/50 mb-4 line-clamp-2">
            {tip.description}
          </p>
          
          <div className="pt-4 border-t border-white/[0.05]">
            <p className="text-xs font-medium text-white/70 mb-0.5">{tip.expertName}</p>
            <p className="text-xs text-white/40">{tip.expertRole}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ExpertTips() {
  const { getDayOfYear } = useUserStore();
  const tipOfDay = getTipOfDay();
  const allTips = getAllTips();

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Образование</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Советы экспертов
        </h1>
        <p className="text-white/40 text-sm">
          Еженедельные короткие видео от психологов и специалистов по благополучию
        </p>
      </motion.div>

      {/* Tip of the Day */}
      {tipOfDay && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex-shrink-0"
        >
          <div className="p-1 rounded-2xl bg-gradient-to-r from-[#8fb583]/20 to-[#7a9ebb]/20">
            <div className="p-5 rounded-xl bg-[#0a0c0a] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#8fb583]" />
                <span className="text-xs uppercase tracking-wider text-[#8fb583]">Совет дня</span>
              </div>
              <TipCard tip={tipOfDay} delay={0} />
            </div>
          </div>
        </motion.div>
      )}

      {/* All Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pb-4">
        {allTips.map((tip, index) => (
          <TipCard key={tip.id} tip={tip} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );
}




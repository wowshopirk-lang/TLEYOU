"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertTip, getAllTips, getTipOfDay } from "@/data/expertTips";

// Icons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M18 6 L6 18 M6 6 L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Compact Tip Card
const TipCard = ({ tip, onSelect }: { tip: ExpertTip; onSelect: () => void }) => (
  <motion.button
    onClick={onSelect}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    className="relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 overflow-hidden hover:border-white/[0.12] transition-all text-left group w-full"
  >
    <div className="flex items-center gap-3">
      {/* Play button */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8fb583]/20 to-[#7a9ebb]/20 flex items-center justify-center flex-shrink-0 group-hover:from-[#8fb583]/30 group-hover:to-[#7a9ebb]/30 transition-all">
        <div className="w-4 h-4 text-white/60 ml-0.5">
          <PlayIcon />
        </div>
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white/80 truncate">{tip.title}</h3>
        <p className="text-[10px] text-white/40">{tip.expertName} • {tip.duration || "2:00"}</p>
      </div>
      
      {/* Category badge */}
      <span className="text-[8px] uppercase tracking-wider px-2 py-1 rounded bg-white/[0.05] text-white/40 flex-shrink-0">
        {tip.category || "Совет"}
      </span>
    </div>
  </motion.button>
);

// Featured Tip (larger)
const FeaturedTip = ({ tip, onSelect }: { tip: ExpertTip; onSelect: () => void }) => (
  <motion.button
    onClick={onSelect}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.01 }}
    className="relative bg-gradient-to-br from-[#8fb583]/10 to-[#7a9ebb]/10 border border-[#8fb583]/20 rounded-xl p-4 overflow-hidden hover:border-[#8fb583]/30 transition-all text-left group w-full"
  >
    <div className="flex items-center gap-4">
      {/* Large play */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8fb583]/30 to-[#7a9ebb]/30 flex items-center justify-center flex-shrink-0 group-hover:from-[#8fb583]/40 group-hover:to-[#7a9ebb]/40 transition-all">
        <div className="w-6 h-6 text-white ml-0.5">
          <PlayIcon />
        </div>
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8fb583]" />
          <span className="text-[9px] uppercase tracking-wider text-[#8fb583]">Совет дня</span>
        </div>
        <h3 className="text-base font-medium text-white/90 mb-1">{tip.title}</h3>
        <p className="text-xs text-white/50">{tip.expertName} • {tip.expertRole}</p>
      </div>
      
      {/* Duration */}
      <div className="text-right flex-shrink-0">
        <span className="text-lg font-heading text-white/60">{tip.duration || "2:30"}</span>
      </div>
    </div>
  </motion.button>
);

// Video Modal
const VideoModal = ({ tip, onClose }: { tip: ExpertTip; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="relative bg-[#0f120e] border border-white/[0.1] rounded-2xl p-6 max-w-2xl w-full"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/[0.05] text-white/50 hover:bg-white/[0.1] hover:text-white/70 transition-all flex items-center justify-center"
      >
        <div className="w-4 h-4"><CloseIcon /></div>
      </button>
      
      {/* Video placeholder */}
      <div className="aspect-video bg-black/40 rounded-xl mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#8fb583]/20 flex items-center justify-center mx-auto mb-3">
            <div className="w-8 h-8 text-[#8fb583] ml-1"><PlayIcon /></div>
          </div>
          <p className="text-white/40 text-sm">Видео скоро будет доступно</p>
        </div>
      </div>
      
      <h3 className="text-xl font-heading text-white mb-2">{tip.title}</h3>
      <p className="text-white/60 text-sm mb-4">{tip.description}</p>
      
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8fb583]/20 to-[#7a9ebb]/20 flex items-center justify-center">
          <span className="text-sm">{tip.expertName?.[0] || "E"}</span>
        </div>
        <div>
          <p className="text-sm text-white/80">{tip.expertName}</p>
          <p className="text-xs text-white/40">{tip.expertRole}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function ExpertTips() {
  const tipOfDay = getTipOfDay();
  const allTips = getAllTips();
  const [selectedTip, setSelectedTip] = useState<ExpertTip | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-1 rounded-full bg-[#8fb583]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Образование</span>
          </div>
          <h1 className="text-lg font-heading text-white">Советы экспертов</h1>
        </div>
        <p className="text-xs text-white/40 hidden sm:block">Короткие видео от специалистов</p>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0">
        {/* Left: Featured + List */}
        <div className="lg:col-span-2 flex flex-col gap-3 min-h-0">
          {/* Featured Tip */}
          {tipOfDay && (
            <FeaturedTip tip={tipOfDay} onSelect={() => setSelectedTip(tipOfDay)} />
          )}
          
          {/* Tips List */}
          <div className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Все советы</span>
              <span className="text-[10px] text-white/30">{allTips.length} видео</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {allTips.slice(0, 6).map((tip) => (
                <TipCard key={tip.id} tip={tip} onSelect={() => setSelectedTip(tip)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Categories + Info */}
        <div className="flex flex-col gap-3">
          {/* Categories */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Категории</span>
            <div className="mt-2 space-y-1.5">
              {["Медитация", "Дыхание", "Сон", "Тревога", "Фокус"].map((cat, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all text-left group"
                >
                  <span className="text-xs text-white/60 group-hover:text-white/80">{cat}</span>
                  <span className="text-[10px] text-white/30">{Math.floor(Math.random() * 5) + 2}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Expert Spotlight */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#9a8fb5]/10 to-[#7a9ebb]/10 border border-[#9a8fb5]/20 flex-1">
            <span className="text-[10px] text-[#9a8fb5] uppercase tracking-wider">Эксперт недели</span>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9a8fb5]/30 to-[#7a9ebb]/30 flex items-center justify-center">
                <span className="text-lg">👩‍⚕️</span>
              </div>
              <div>
                <p className="text-sm text-white/80">Анна Соколова</p>
                <p className="text-[10px] text-white/40">Психолог, 10+ лет опыта</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/50 leading-relaxed">
              Специализируется на работе с тревожностью и стрессом
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedTip && (
          <VideoModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

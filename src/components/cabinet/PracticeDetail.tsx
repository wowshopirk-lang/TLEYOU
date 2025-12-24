"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPracticeById } from "@/data/practices";
import { usePracticesStore } from "@/stores/practicesStore";

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M19 12 L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 19 L5 12 L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PracticeDetail({ practiceId }: { practiceId: string }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const practice = getPracticeById(practiceId);

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

  const handleNextStep = () => {
    if (currentStep < practice.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Practice completed - mark as completed
      completePractice(practiceId);
      setIsPlaying(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const progress = ((currentStep + 1) / practice.steps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
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

        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${practice.color}50` }} />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{practice.category}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-1">
          {practice.title}
        </h1>
        <p className="text-white/40 text-sm">{practice.subtitle}</p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
      >
        <p className="text-white/70 leading-relaxed">{practice.description}</p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: practice.color }} />
            <span className="text-xs text-white/40">{practice.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: practice.color }} />
            <span className="text-xs text-white/40">{practice.steps.length} шагов</span>
          </div>
        </div>
      </motion.div>

      {/* Practice Steps */}
      {!isPlaying ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12"
        >
          <div 
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-2"
            style={{ 
              backgroundColor: `${practice.color}15`,
              borderColor: `${practice.color}40`,
              color: practice.color
            }}
          >
            <div className="w-12 h-12">
              <PlayIcon />
            </div>
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
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Progress bar */}
          <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: practice.color }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Current step */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] min-h-[300px] flex flex-col">
            {/* Step number */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: practice.color }}
                >
                  {currentStep + 1}
                </div>
                <span className="text-sm text-white/40">
                  Шаг {currentStep + 1} из {practice.steps.length}
                </span>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 flex items-center justify-center">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-heading font-light text-white/90 text-center leading-relaxed max-w-2xl"
              >
                {practice.steps[currentStep]}
              </motion.p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.05]">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-xl border border-white/[0.1] text-white/60 hover:text-white hover:border-white/[0.2] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Назад
              </button>

              {currentStep < practice.steps.length - 1 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl text-white font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: practice.color }}
                >
                  Дальше
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[#8fb583]">
                  <div className="w-5 h-5">
                    <CheckIcon />
                  </div>
                  <span className="font-medium">Практика завершена</span>
                </div>
              )}
            </div>
          </div>

          {/* Completed steps indicator */}
          <div className="flex flex-wrap gap-2">
            {practice.steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentStep
                    ? 'opacity-100'
                    : 'opacity-20'
                }`}
                style={{ 
                  backgroundColor: index <= currentStep ? practice.color : '#ffffff'
                }}
              />
            ))}
          </div>

          {/* Stop button */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(0);
              }}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Завершить практику
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}


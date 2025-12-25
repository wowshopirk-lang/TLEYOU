"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Practice } from "@/data/practices";
import { usePracticesStore } from "@/stores/practicesStore";
import { useCalendarStore, getDateKey } from "@/stores/calendarStore";

interface TextPracticeProps {
  practice: Practice;
  onComplete?: () => void;
}

export default function TextPractice({ practice, onComplete }: TextPracticeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewedSteps, setViewedSteps] = useState<Set<number>>(new Set([0]));
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  
  const { completePractice } = usePracticesStore();
  const { addEvent } = useCalendarStore();

  const textContent = practice.textContent || practice.steps;
  const totalSteps = textContent.length;
  const reflectionQuestions = practice.reflectionQuestions || [];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setViewedSteps(prev => new Set([...prev, nextStep]));
    } else {
      // Все шаги просмотрены
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Проверяем, что все шаги просмотрены по порядку
    const allStepsViewed = viewedSteps.size === totalSteps;
    const stepsInOrder = Array.from(viewedSteps).every((step, index) => {
      if (index === 0) return step === 0;
      return step === Array.from(viewedSteps)[index - 1] + 1;
    });

    const completedFully = allStepsViewed && stepsInOrder;
    const progressPercent = completedFully ? 100 : (viewedSteps.size / totalSteps) * 100;

    if (completedFully) {
      completePractice(
        practice.id,
        true,
        progressPercent,
        'text',
        practice.durationSeconds
      );

      // Добавляем событие в календарь
      addEvent({
        date: getDateKey(),
        type: 'practice',
        eventId: practice.id,
        title: practice.title,
      });

      setIsCompleted(true);
      onComplete?.();
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Progress Indicator */}
      <div className="px-6 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-white/40">
            Шаг {currentStep + 1} из {totalSteps}
          </span>
          <div className="flex-1 h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#8fb583] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-2xl mx-auto"
        >
          {/* Step Content */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
                <span className="text-lg text-[#8fb583] font-medium">{currentStep + 1}</span>
              </div>
              <h3 className="text-lg font-heading text-white/90">
                Шаг {currentStep + 1}
              </h3>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-base text-white/80 leading-relaxed whitespace-pre-line">
                {textContent[currentStep]}
              </p>
            </div>
          </div>

          {/* Reflection Questions (show after all steps) */}
          {currentStep === totalSteps - 1 && reflectionQuestions.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-heading text-white/90 mb-4">
                Вопросы для рефлексии
              </h4>
              <div className="space-y-4">
                {reflectionQuestions.map((question, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <p className="text-sm text-white/70 mb-3">{question}</p>
                    <textarea
                      value={answers[index] || ''}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder="Твои мысли..."
                      className="w-full p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/80 placeholder-white/30 text-sm resize-none focus:outline-none focus:border-[#8fb583]/50"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completion Message */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 rounded-xl bg-[#8fb583]/20 border border-[#8fb583]/30 text-center"
              >
                <p className="text-sm text-[#8fb583] font-medium">
                  ✓ Практика успешно завершена!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-white/[0.05] flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-xl text-sm transition-all ${
            currentStep === 0
              ? 'bg-white/[0.02] text-white/20 cursor-not-allowed'
              : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.08]'
          }`}
        >
          Назад
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-xl bg-[#8fb583] text-white text-sm font-medium hover:bg-[#7fa573] transition-colors"
          >
            Далее
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
              isCompleted
                ? 'bg-[#8fb583]/50 text-white/50 cursor-not-allowed'
                : 'bg-[#8fb583] text-white hover:bg-[#7fa573]'
            }`}
          >
            Завершить практику
          </button>
        )}
      </div>
    </div>
  );
}


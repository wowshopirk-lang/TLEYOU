"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Practice } from "@/data/practices";
import { usePracticesStore } from "@/stores/practicesStore";
import { useCalendarStore, getDateKey } from "@/stores/calendarStore";

interface AudioPracticeProps {
  practice: Practice;
  onComplete?: () => void;
}

export default function AudioPractice({ practice, onComplete }: AudioPracticeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasSeekedBack, setHasSeekedBack] = useState(false);
  const [lastSeekTime, setLastSeekTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { completePractice } = usePracticesStore();
  const { addEvent } = useCalendarStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
      setCurrentTime(audio.currentTime);
    };

    const handleTimeUpdate = () => {
      updateProgress();
      
      // Проверяем, не перематывали ли назад
      if (audio.currentTime < lastSeekTime) {
        setHasSeekedBack(true);
      }
      setLastSeekTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      const finalProgress = 100;
      setProgress(finalProgress);
      
      // Практика считается пройденной если:
      // 1. Прослушано 95%+
      // 2. Не было перемотки назад
      const completedFully = finalProgress >= 95 && !hasSeekedBack;
      
      if (completedFully) {
        completePractice(
          practice.id,
          true,
          finalProgress,
          'audio',
          Math.floor(audio.duration)
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

    const handleSeeking = () => {
      if (audio.currentTime < lastSeekTime) {
        setHasSeekedBack(true);
      }
      setLastSeekTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('seeking', handleSeeking);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('seeking', handleSeeking);
    };
  }, [practice.id, hasSeekedBack, lastSeekTime, completePractice, addEvent, onComplete]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDuration = () => {
    const audio = audioRef.current;
    return audio ? audio.duration : practice.durationSeconds;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Audio Player */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          {/* Play Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-[#8fb583] text-white'
                  : 'bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.1]'
              }`}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 ml-1">
                  <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8fb583] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(getDuration())}</span>
            </div>
          </div>

          {/* Practice Info */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-heading text-white/90 mb-2">{practice.title}</h2>
            <p className="text-sm text-white/50">{practice.description}</p>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {practice.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="w-6 h-6 rounded-full bg-[#8fb583]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#8fb583]">{index + 1}</span>
                </div>
                <p className="text-sm text-white/70 flex-1">{step}</p>
              </div>
            ))}
          </div>

          {/* Warning if seeked back */}
          {hasSeekedBack && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-[#c49b88]/10 border border-[#c49b88]/20"
            >
              <p className="text-xs text-[#c49b88] text-center">
                Для завершения практики прослушай её от начала до конца без перемотки
              </p>
            </motion.div>
          )}

          {/* Completion Message */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-xl bg-[#8fb583]/20 border border-[#8fb583]/30 text-center"
              >
                <p className="text-sm text-[#8fb583] font-medium">
                  ✓ Практика успешно завершена!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={practice.audioUrl}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}


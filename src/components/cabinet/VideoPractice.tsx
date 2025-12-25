"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Practice } from "@/data/practices";
import { usePracticesStore } from "@/stores/practicesStore";
import { useCalendarStore, getDateKey } from "@/stores/calendarStore";

interface VideoPracticeProps {
  practice: Practice;
  onComplete?: () => void;
}

export default function VideoPractice({ practice, onComplete }: VideoPracticeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasSeekedBack, setHasSeekedBack] = useState(false);
  const [lastSeekTime, setLastSeekTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const { completePractice } = usePracticesStore();
  const { addEvent } = useCalendarStore();

  const hasVideo = !!practice.videoUrl;
  const hasImages = practice.images && practice.images.length > 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
      setCurrentTime(video.currentTime);
    };

    const handleTimeUpdate = () => {
      updateProgress();
      
      // Проверяем, не перематывали ли назад
      if (video.currentTime < lastSeekTime) {
        setHasSeekedBack(true);
      }
      setLastSeekTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      const finalProgress = 100;
      setProgress(finalProgress);
      
      // Практика считается пройденной если:
      // 1. Просмотрено 95%+
      // 2. Не было перемотки назад
      const completedFully = finalProgress >= 95 && !hasSeekedBack;
      
      if (completedFully) {
        completePractice(
          practice.id,
          true,
          finalProgress,
          'video',
          Math.floor(video.duration)
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
      if (video.currentTime < lastSeekTime) {
        setHasSeekedBack(true);
      }
      setLastSeekTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('seeking', handleSeeking);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('seeking', handleSeeking);
    };
  }, [practice.id, hasVideo, hasSeekedBack, lastSeekTime, completePractice, addEvent, onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDuration = () => {
    const video = videoRef.current;
    return video ? video.duration : practice.durationSeconds;
  };

  // Для практик с изображениями (без видео)
  const handleImagePracticeComplete = () => {
    completePractice(
      practice.id,
      true,
      100,
      'video',
      practice.durationSeconds
    );
    
    addEvent({
      date: getDateKey(),
      type: 'practice',
      eventId: practice.id,
      title: practice.title,
    });
    
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Video/Image Display */}
      <div className="flex-1 flex items-center justify-center p-6 bg-black/20">
        {hasVideo ? (
          <div className="w-full max-w-4xl">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                src={practice.videoUrl}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Play Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 ml-1">
                      <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
                    </svg>
                  </motion.button>
                </div>
              )}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-[#8fb583] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(getDuration())}</span>
                </div>
              </div>
            </div>
          </div>
        ) : hasImages ? (
          <div className="w-full max-w-4xl">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              <img
                src={practice.images![currentImageIndex]}
                alt={`Step ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {practice.images!.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {practice.images!.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index
                          ? 'bg-[#8fb583] w-6'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-heading text-white/90 mb-2">{practice.title}</h2>
          <p className="text-sm text-white/50 mb-6">{practice.description}</p>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {practice.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="w-8 h-8 rounded-full bg-[#8fb583]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[#8fb583] font-medium">{index + 1}</span>
                </div>
                <p className="text-sm text-white/70 flex-1 pt-1">{step}</p>
              </div>
            ))}
          </div>

          {/* Warning if seeked back */}
          {hasVideo && hasSeekedBack && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-[#c49b88]/10 border border-[#c49b88]/20"
            >
              <p className="text-xs text-[#c49b88] text-center">
                Для завершения практики просмотри её от начала до конца без перемотки
              </p>
            </motion.div>
          )}

          {/* Completion Button (for image-based practices) */}
          {!hasVideo && hasImages && (
            <button
              onClick={handleImagePracticeComplete}
              disabled={isCompleted}
              className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                isCompleted
                  ? 'bg-[#8fb583]/50 text-white/50 cursor-not-allowed'
                  : 'bg-[#8fb583] text-white hover:bg-[#7fa573]'
              }`}
            >
              {isCompleted ? '✓ Практика завершена' : 'Завершить практику'}
            </button>
          )}

          {/* Completion Message */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-xl bg-[#8fb583]/20 border border-[#8fb583]/30 text-center"
              >
                <p className="text-sm text-[#8fb583] font-medium">
                  ✓ Практика успешно завершена!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


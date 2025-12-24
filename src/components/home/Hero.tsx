"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  StarFilledIcon, 
  LotusIcon, 
  EyeIcon, 
  LeafIcon, 
  CardsIcon, 
  FlameIcon, 
  BalanceIcon,
  ArrowDownIcon 
} from "@/components/ui/Icons";

// Minimal breathing circle - single subtle ring
const BreathingCircle = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 1 }}
  >
    <motion.div
      className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-white/[0.02]"
      animate={{
        scale: [1, 1.02, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [breathePhase, setBreathePhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [showBreathingGuide, setShowBreathingGuide] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoaded(true);
          })
          .catch((error) => {
            console.log("Autoplay заблокирован:", error);
            setIsVideoLoaded(false);
          });
      }
    }
  }, []);

  // Breathing animation cycle
  useEffect(() => {
    if (!showBreathingGuide) return;
    
    const phases = ["inhale", "hold", "exhale"] as const;
    const durations = [4000, 2000, 4000]; // 4s inhale, 2s hold, 4s exhale
    let currentPhase = 0;
    
    const cycle = () => {
      setBreathePhase(phases[currentPhase]);
      const timeout = setTimeout(() => {
        currentPhase = (currentPhase + 1) % phases.length;
        cycle();
      }, durations[currentPhase]);
      return timeout;
    };
    
    const timeout = cycle();
    return () => clearTimeout(timeout);
  }, [showBreathingGuide]);

  const handleEnterSilence = () => {
    const nextSection = document.getElementById("problem");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartBreathing = () => {
    setShowBreathingGuide(true);
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* SEO-optimized hidden h1 */}
      <h1 className="sr-only">
        TLEYOU — Набор для медитации и ритуал возвращения к себе. 
        Травяные скрутки, карточки для рефлексии и практики осознанности для женщин.
      </h1>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="video-background"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onError={() => setIsVideoLoaded(false)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="/videos/6498100_Smoke Forest Textures Liquid Smoke_By_Reinis_Kaspars_Artlist_HD (1) (online-video-cutter.com).mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#111410] to-[#0a0c0a]" />
        )}
        
        {/* Enhanced overlay with vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Minimal breathing circle */}
      <BreathingCircle />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Logo */}
        <motion.div
          className="mb-8 flex justify-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/images/logo/tleyou-logo-white.svg"
            alt="TLEYOU — ритуал возвращения к себе"
            width={600}
            height={180}
            priority
            className="w-full max-w-[280px] md:max-w-[380px] lg:max-w-[480px] h-auto mx-auto"
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        {/* Minimal divider */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="h-px w-12 bg-white/10" />
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        {/* Main heading */}
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl font-heading text-white/85 mb-6 font-light tracking-wide w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Пауза для тех, кто забыл себя
        </motion.h2>

        {/* CTA Buttons - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={handleEnterSilence}
            className="group relative px-6 py-3 bg-gradient-to-br from-[#2d3e2a] to-[#1e2a1a] hover:from-[#3a4d35] hover:to-[#2d3e2a] border border-[#3a4d35]/60 hover:border-[#4a6741]/70 rounded-full text-white shadow-lg shadow-[#1e2a1a]/30 hover:shadow-[#2d3e2a]/50 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Ambient glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2d3e2a]/30 via-[#1e2a1a]/40 to-[#2d3e2a]/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide font-light">
              Войти в тишину
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 opacity-70"
              >
                <ArrowDownIcon />
              </motion.span>
            </span>
          </motion.button>

          {/* Secondary CTA - Breathing Practice */}
          <motion.button
            onClick={handleStartBreathing}
            className="group relative px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Hover glow effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8fb583]/10 via-[#4a6741]/20 to-[#8fb583]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Background on hover */}
            <div className="absolute inset-0 rounded-full bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide font-light">
              Практика дыхания
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Breathing Guide Modal */}
      <AnimatePresence>
        {showBreathingGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c0a]/95 backdrop-blur-md"
            onClick={() => setShowBreathingGuide(false)}
          >
            {/* Background organic elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8fb583]/[0.03] rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#b49b78]/[0.03] rounded-full blur-[80px]" />
            </div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex flex-col items-center px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Breathing visualization */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
                {/* Outer decorative rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#b49b78]/10"
                  animate={{
                    scale: breathePhase === "inhale" ? [1, 1.15] : breathePhase === "exhale" ? [1.15, 1] : 1.15,
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: breathePhase === "hold" ? 0 : 4,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Middle ring */}
                <motion.div
                  className="absolute inset-4 rounded-full border border-[#8fb583]/20"
                  animate={{
                    scale: breathePhase === "inhale" ? [1, 1.2] : breathePhase === "exhale" ? [1.2, 1] : 1.2,
                  }}
                  transition={{
                    duration: breathePhase === "hold" ? 0 : 4,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Main breathing circle */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-white/10 flex items-center justify-center overflow-hidden"
                  animate={{
                    scale: breathePhase === "inhale" ? [1, 1.25] : breathePhase === "exhale" ? [1.25, 1] : 1.25,
                  }}
                  transition={{
                    duration: breathePhase === "hold" ? 0 : 4,
                    ease: "easeInOut",
                  }}
                >
                  {/* Inner gradient fill */}
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-[#8fb583]/15 via-[#8fb583]/10 to-[#b49b78]/10"
                    animate={{
                      scale: breathePhase === "inhale" ? [0.7, 1.1] : breathePhase === "exhale" ? [1.1, 0.7] : 1.1,
                    }}
                    transition={{
                      duration: breathePhase === "hold" ? 0 : 4,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                
                {/* Center accent */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-[#8fb583]/40"
                  animate={{
                    scale: breathePhase === "hold" ? [1, 1.2, 1] : 1,
                    opacity: breathePhase === "hold" ? [0.4, 0.8, 0.4] : 0.4,
                  }}
                  transition={{
                    duration: 2,
                    repeat: breathePhase === "hold" ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </div>
              
              {/* Phase indicator */}
              <div className="mt-10 flex flex-col items-center">
                <motion.div
                  key={breathePhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/30" />
                  <span className="text-xl md:text-2xl font-heading text-white/70 tracking-wide">
                    {breathePhase === "inhale" && "Вдох"}
                    {breathePhase === "hold" && "Задержка"}
                    {breathePhase === "exhale" && "Выдох"}
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/30" />
                </motion.div>
                
                {/* Timer dots */}
                <div className="mt-4 flex items-center gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#8fb583]/40"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Close hint */}
              <motion.p 
                className="mt-12 text-[11px] tracking-[0.2em] uppercase text-white/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Нажмите для выхода
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Branded Marquee with minimalistic icons */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden border-t border-[#b49b78]/10 z-20">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />
        
        <div className="flex relative py-4 bg-black/20 backdrop-blur-sm">
          <motion.div
            className="flex shrink-0 gap-12 items-center"
            animate={{
              x: [0, -2400],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {/* Медитация - лотос */}
                <div className="flex items-center gap-3 group">
                  <div className="w-4 h-4 text-[#b49b78]/50 group-hover:text-[#b49b78]/80 transition-colors">
                    <LotusIcon />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">Медитация</span>
                </div>
                
                {/* Разделитель */}
                <div className="w-px h-3 bg-[#b49b78]/20" />
                
                {/* Осознанность - глаз */}
                <div className="flex items-center gap-3 group">
                  <div className="w-4 h-4 text-[#b49b78]/50 group-hover:text-[#b49b78]/80 transition-colors">
                    <EyeIcon />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">Осознанность</span>
                </div>
                
                {/* Разделитель */}
                <div className="w-px h-3 bg-[#b49b78]/20" />
                
                {/* Травяные скрутки - листок */}
                <div className="flex items-center gap-3 group">
                  <div className="w-4 h-4 text-[#b49b78]/50 group-hover:text-[#b49b78]/80 transition-colors">
                    <LeafIcon />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">Травяные скрутки</span>
                </div>
                
                {/* Разделитель */}
                <div className="w-px h-3 bg-[#b49b78]/20" />
                
                {/* Карточки - стопка карточек */}
                <div className="flex items-center gap-3 group">
                  <div className="w-4 h-4 text-[#b49b78]/50 group-hover:text-[#b49b78]/80 transition-colors">
                    <CardsIcon />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">Рефлексия</span>
                </div>
                
                {/* Разделитель */}
                <div className="w-px h-3 bg-[#b49b78]/20" />
                
                {/* Ритуал тишины - свеча/пламя */}
                <div className="flex items-center gap-3 group">
                  <div className="w-4 h-4 text-[#b49b78]/50 group-hover:text-[#b49b78]/80 transition-colors">
                    <FlameIcon />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">Ритуал тишины</span>
                </div>
                
                {/* Разделитель */}
                <div className="w-px h-3 bg-[#b49b78]/20" />
                
                {/* Баланс - инь-ян */}
                <div className="flex items-center gap-3 group">
                  <div className="w-4 h-4 text-[#b49b78]/50 group-hover:text-[#b49b78]/80 transition-colors">
                    <BalanceIcon />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">Баланс</span>
                </div>
                
                {/* Разделитель */}
                <div className="w-px h-3 bg-[#b49b78]/20" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

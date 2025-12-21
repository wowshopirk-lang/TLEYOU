"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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

  const handleEnterSilence = () => {
    const nextSection = document.getElementById("problem");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
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
        
        <div className="video-overlay" />
        
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.02] z-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Large circle - top right */}
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 md:w-[500px] md:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            <circle cx="250" cy="250" r="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <circle cx="250" cy="250" r="160" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="120" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" strokeDasharray="4 8" />
          </svg>
        </motion.div>

        {/* Circle - bottom left */}
        <motion.div 
          className="absolute -bottom-10 -left-10 w-48 h-48 md:w-72 md:h-72"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
            <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <circle cx="150" cy="150" r="80" stroke="rgba(143,181,131,0.06)" strokeWidth="0.5" strokeDasharray="3 6" />
          </svg>
        </motion.div>

        {/* Curved line - left side */}
        <motion.svg 
          className="absolute left-0 top-1/4 w-32 md:w-48 h-[400px] md:h-[500px]"
          viewBox="0 0 150 500" 
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <path
            d="M150 0 C100 80, 50 150, 80 250 C110 350, 30 420, 60 500"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="80" cy="250" r="4" fill="rgba(143,181,131,0.25)" />
        </motion.svg>

        {/* Curved line - right side */}
        <motion.svg 
          className="absolute right-0 bottom-1/4 w-32 md:w-48 h-[300px] md:h-[400px]"
          viewBox="0 0 150 400" 
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          <path
            d="M0 0 C50 60, 100 120, 70 200 C40 280, 120 340, 90 400"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="70" cy="200" r="3" fill="rgba(143,181,131,0.2)" />
        </motion.svg>

        {/* Small decorative circle - center left */}
        <motion.div 
          className="absolute top-1/3 left-[15%] w-8 h-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
            <circle cx="16" cy="16" r="14" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Small decorative circle - center right */}
        <motion.div 
          className="absolute bottom-1/3 right-[15%] w-6 h-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl">
        {/* Frame around content */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Corner decorations */}
          <motion.div 
            className="absolute -top-8 -left-8 w-12 h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <path d="M0 16 L0 0 L16 0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute -top-8 -right-8 w-12 h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <path d="M32 0 L48 0 L48 16" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute -bottom-8 -left-8 w-12 h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <path d="M0 32 L0 48 L16 48" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute -bottom-8 -right-8 w-12 h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <path d="M32 48 L48 48 L48 32" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                src="/images/logo/tleyou-logo-white.svg"
                alt="TLEYOU"
                width={600}
                height={180}
                priority
                className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] h-auto"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
            
            {/* Thin horizontal line */}
            <motion.div 
              className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl font-heading text-white/80 mb-2 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Пауза для тех, кто забыл себя
            </motion.p>
            
            <motion.p 
              className="text-sm md:text-base text-white/40 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Ритуал возвращения к себе
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <button
              onClick={handleEnterSilence}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] rounded-full text-white transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative z-10 text-sm md:text-base tracking-wide font-light">Войти в тишину</span>
              <svg 
                className="relative z-10 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer flex flex-col items-center gap-2"
          onClick={handleEnterSilence}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden border-t border-white/[0.05] z-20">
        <div className="flex relative z-10 py-3">
          <motion.div
            className="flex shrink-0 gap-8 items-center"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...Array(3)].map((_, groupIndex) => (
              [
                "НАБОР ДЛЯ МЕДИТАЦИИ",
                "·",
                "РИТУАЛ ДЛЯ ЖЕНЩИН", 
                "·",
                "ПРАКТИКИ ОСОЗНАННОСТИ",
                "·",
                "ТРАВЯНЫЕ СКРУТКИ",
                "·",
                "КАРТОЧКИ ДЛЯ РЕФЛЕКСИИ",
                "·",
                "ЗАБОТА О СЕБЕ",
                "·",
                "ВОЗВРАЩЕНИЕ К СЕБЕ",
                "·",
                "ПАУЗА ОТ СУЕТЫ",
                "·",
              ].map((item, index) => (
                <span
                  key={`group-${groupIndex}-${index}`}
                  className={`text-xs tracking-[0.25em] uppercase whitespace-nowrap ${
                    item === "·" 
                      ? "text-[#8fb583]/40 text-[10px]" 
                      : "text-white/50 font-light"
                  }`}
                >
                  {item}
                </span>
              ))
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

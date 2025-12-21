"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "НАБОР ДЛЯ МЕДИТАЦИИ",
  "◇",
  "РИТУАЛ ДЛЯ ЖЕНЩИН", 
  "◇",
  "ПРАКТИКИ ОСОЗНАННОСТИ",
  "◇",
  "ТРАВЯНЫЕ СКРУТКИ",
  "◇",
  "КАРТОЧКИ ДЛЯ РЕФЛЕКСИИ",
  "◇",
  "ЗАБОТА О СЕБЕ",
  "◇",
  "ВОЗВРАЩЕНИЕ К СЕБЕ",
  "◇",
  "ПАУЗА ОТ СУЕТЫ",
  "◇",
];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/5">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-transparent via-transparent to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-transparent via-transparent to-transparent pointer-events-none" />
      
      {/* Marquee container */}
      <div className="flex relative z-10">
        <motion.div
          className="flex shrink-0 gap-8 items-center"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Double the items for seamless loop */}
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className={`text-sm tracking-[0.3em] uppercase whitespace-nowrap ${
                item === "◇" 
                  ? "text-[#4a6741]/70 text-xs" 
                  : "text-white/60 font-light"
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
        
        {/* Second copy for seamless loop */}
        <motion.div
          className="flex shrink-0 gap-8 items-center"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className={`text-sm tracking-[0.3em] uppercase whitespace-nowrap ${
                item === "◇" 
                  ? "text-[#4a6741]/70 text-xs" 
                  : "text-white/60 font-light"
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


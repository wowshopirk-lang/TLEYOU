"use client";

import React from "react";

// ============================================
// TLEYOU BRAND ICON SYSTEM v2.0
// Inspired by minimalist wellness/spiritual line art
// Style: Ultra-thin strokes (0.5-0.75), organic curves, zen aesthetics
// ============================================

interface IconProps {
  className?: string;
}

// === BALANCE / HARMONY / PEACE ===

// Баланс — три парящих органических формы (референс "BALANCE")
export const BalanceIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="6" r="2" stroke="currentColor" strokeWidth="0.6" />
    <path d="M16 8 C14 10, 13 12, 14 14" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <ellipse cx="16" cy="16" rx="4" ry="2.5" stroke="currentColor" strokeWidth="0.6" transform="rotate(-15 16 16)" />
    <path d="M16 18.5 C14 20, 12 22, 12 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <ellipse cx="16" cy="26" rx="6" ry="2.5" stroke="currentColor" strokeWidth="0.6" transform="rotate(10 16 26)" />
  </svg>
);

// Покой — гора с восходящим солнцем (референс "PEACE")
export const PeaceIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="22" cy="8" r="2.5" stroke="currentColor" strokeWidth="0.6" />
    <path d="M3 26 C8 26, 12 16, 16 12 C20 16, 24 26, 29 26" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// Велнесс — изящная волнистая линия (референс "WELLNESS")
export const WellnessIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M4 18 Q8 10, 12 16 T20 14 T28 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <circle cx="28" cy="16" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

// === MEDITATION / MINDFULNESS ===

// Медитация — сидящая фигура (минималистичная)
export const MeditationIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="7" r="3" stroke="currentColor" strokeWidth="0.6" />
    <path d="M6 26 Q10 20, 16 20 Q22 20, 26 26" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M10 24 L22 24" stroke="currentColor" strokeWidth="0.5" opacity="0.5" strokeLinecap="round" />
  </svg>
);

// Разум — профиль с внутренней спиралью (референс "MIND")
export const MindIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M10 28 C6 24, 5 16, 8 10 C11 4, 20 4, 24 8 C28 12, 28 20, 24 26" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M18 12 Q20 14, 18 16 Q16 18, 14 16 Q12 14, 15 13" stroke="currentColor" strokeWidth="0.5" fill="none" />
  </svg>
);

// Дух/Просветление — фигура с лучами (референс "SPIRIT")
export const SpiritIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="0.6" />
    <path d="M16 4 L16 2" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M10 6 L8 4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M22 6 L24 4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M11 16 Q11 22, 16 24 Q21 22, 21 16" stroke="currentColor" strokeWidth="0.6" fill="none" />
  </svg>
);

// Глаз осознанности (референс "AWAKEN")
export const EyeIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <ellipse cx="16" cy="16" rx="12" ry="6" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

// === NATURE / ELEMENTS ===

// Лотос — элегантный цветок со звездой (референс)
export const LotusIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Центральный лепесток */}
    <path d="M16 22 Q14 16, 16 8 Q18 16, 16 22" stroke="currentColor" strokeWidth="0.6" fill="none" />
    {/* Левые лепестки */}
    <path d="M16 22 Q10 18, 7 12 Q12 14, 16 22" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M16 22 Q8 20, 4 16 Q10 16, 16 22" stroke="currentColor" strokeWidth="0.5" opacity="0.6" fill="none" />
    {/* Правые лепестки */}
    <path d="M16 22 Q22 18, 25 12 Q20 14, 16 22" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M16 22 Q24 20, 28 16 Q22 16, 16 22" stroke="currentColor" strokeWidth="0.5" opacity="0.6" fill="none" />
    {/* Звезда над лотосом */}
    <path d="M16 4 L16.5 6 L18 6 L17 7 L17.5 9 L16 8 L14.5 9 L15 7 L14 6 L15.5 6 Z" stroke="currentColor" strokeWidth="0.4" fill="none" />
  </svg>
);

// Волна — океан (референс)
export const WaveIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M2 16 Q6 10, 10 14 Q14 18, 18 12 Q22 6, 26 12 Q28 16, 30 14" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 22 Q10 20, 16 22 Q22 24, 28 20" stroke="currentColor" strokeWidth="0.5" opacity="0.4" fill="none" strokeLinecap="round" />
  </svg>
);

// Лист — природа (минималистичный)
export const LeafIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M6 28 Q8 20, 16 12 Q24 4, 28 2" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M6 28 Q16 24, 22 14 Q26 6, 28 2" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M10 22 Q16 16, 24 8" stroke="currentColor" strokeWidth="0.4" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// Росток/Рост (референс "GROWTH")
export const GrowthIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 28 L16 12" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    {/* Ветви */}
    <path d="M16 12 Q10 12, 8 6" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M16 12 Q22 12, 24 6" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M16 18 Q12 18, 10 14" stroke="currentColor" strokeWidth="0.5" opacity="0.6" fill="none" strokeLinecap="round" />
    <path d="M16 18 Q20 18, 22 14" stroke="currentColor" strokeWidth="0.5" opacity="0.6" fill="none" strokeLinecap="round" />
    {/* Точка на вершине */}
    <circle cx="16" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

// Травы/Растения (референс "PLANTS/HERBS")
export const HerbIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Центральный стебель */}
    <path d="M16 28 L16 8" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    {/* Листья */}
    <path d="M16 10 L12 6 M16 10 L20 6" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M16 14 L10 10 M16 14 L22 10" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M16 18 L8 14 M16 18 L24 14" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M16 22 L10 18 M16 22 L22 18" stroke="currentColor" strokeWidth="0.5" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// === RITUAL / PRACTICE ===

// Пламя/Свеча — тлеющий огонь
export const FlameIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 4 Q20 10, 20 14 Q20 18, 16 20 Q12 18, 12 14 Q12 10, 16 4" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M16 12 Q14 14, 14.5 16 Q15 18, 16 18" stroke="currentColor" strokeWidth="0.4" opacity="0.5" fill="none" />
    <path d="M16 20 L16 26" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    <ellipse cx="16" cy="27" rx="3" ry="1" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

// Благовоние — восходящий дым
export const IncenseIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 28 L16 20" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    <path d="M16 20 Q14 16, 16 12 Q18 8, 16 4 Q14 0, 16 -2" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="29" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

// Карточки рефлексии
export const CardsIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="8" y="6" width="12" height="18" rx="1.5" stroke="currentColor" strokeWidth="0.6" />
    <rect x="12" y="4" width="12" height="18" rx="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <path d="M11 12 L17 12" stroke="currentColor" strokeWidth="0.4" opacity="0.6" strokeLinecap="round" />
    <path d="M11 15 L15 15" stroke="currentColor" strokeWidth="0.4" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// Капля с медитацией (референс — drop with zen)
export const DropMeditationIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 3 Q8 14, 8 19 Q8 26, 16 28 Q24 26, 24 19 Q24 14, 16 3" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <circle cx="16" cy="14" r="2" stroke="currentColor" strokeWidth="0.5" />
    <path d="M12 22 Q14 19, 16 19 Q18 19, 20 22" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// === TIME / RHYTHM ===

// Время — минималистичные часы
export const TimeIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.6" />
    <path d="M16 8 L16 16 L21 20" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

// Бесконечность — классический символ ∞
export const InfinityIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Классический символ бесконечности: одна непрерывная линия с двумя переплетающимися петлями */}
    <path 
      d="M8 12 C8 8, 12 8, 16 10 C20 8, 24 8, 24 12 C24 16, 20 16, 16 18 C12 16, 8 16, 8 20 C8 24, 12 24, 16 22 C20 24, 24 24, 24 20 C24 16, 20 16, 16 14 C12 16, 8 16, 8 12" 
      stroke="currentColor" 
      strokeWidth="0.6" 
      fill="none" 
      strokeLinecap="round"
    />
  </svg>
);

// Дыхание — круги вдоха/выдоха (референс Inhale/Exhale)
export const BreathIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="0.6" />
    <path d="M12 19 Q16 16, 20 13" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
  </svg>
);

// === ENERGY / LIGHT ===

// Свет/Солнце (референс "LIGHT")
export const LightIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="0.6" />
    {/* Лучи */}
    <path d="M16 6 L16 9" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M16 23 L16 26" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M6 16 L9 16" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M23 16 L26 16" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    {/* Диагональные точки */}
    <circle cx="9" cy="9" r="0.8" fill="currentColor" opacity="0.4" />
    <circle cx="23" cy="9" r="0.8" fill="currentColor" opacity="0.4" />
    <circle cx="9" cy="23" r="0.8" fill="currentColor" opacity="0.4" />
    <circle cx="23" cy="23" r="0.8" fill="currentColor" opacity="0.4" />
  </svg>
);

// Энергия — концентрические круги (референс "ENERGY")
export const EnergyIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </svg>
);

// Пробуждение — глаз с лучами
export const AwakenIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <ellipse cx="16" cy="16" rx="10" ry="5" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
    {/* Лучи сверху */}
    <path d="M16 8 L16 5" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
    <path d="M12 9 L10 6" stroke="currentColor" strokeWidth="0.4" opacity="0.4" strokeLinecap="round" />
    <path d="M20 9 L22 6" stroke="currentColor" strokeWidth="0.4" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// === PATH / LABYRINTH ===

// Лабиринт — круговой путь (референс)
export const LabyrinthIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.6" />
    <path d="M16 5 L16 8" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M16 8 Q9 8, 9 14 Q9 20, 14 22 Q16 23, 18 22 Q23 20, 23 16 Q23 12, 18 11 Q16 10.5, 14 12 Q12 14, 14 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

// Путь — дорога
export const PathIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M4 28 Q10 20, 14 16 Q18 12, 20 8 Q22 4, 28 2" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <circle cx="4" cy="28" r="1.5" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="28" cy="2" r="1.5" fill="currentColor" />
  </svg>
);

// === HANDS / BODY ===

// Руки — открытые ладони (референс "HANDS")
export const HandsIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M3 20 Q8 12, 14 16 Q16 17, 16 18" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M29 20 Q24 12, 18 16 Q16 17, 16 18" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 22 L3 20 L5 18" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
    <path d="M28 22 L29 20 L27 18" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
  </svg>
);

// Тело (референс "BODY")
export const BodyIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="6" r="3" stroke="currentColor" strokeWidth="0.6" />
    <path d="M16 9 Q16 12, 14 16 Q12 22, 12 28" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M16 9 Q16 12, 18 16 Q20 22, 20 28" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// === ADDITIONAL CONCEPTS ===

// Сердце — любовь
export const HeartIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 28 Q10 22, 6 16 Q2 10, 6 6 Q10 2, 16 8 Q22 2, 26 6 Q30 10, 26 16 Q22 22, 16 28" stroke="currentColor" strokeWidth="0.6" fill="none" />
  </svg>
);

// Гармония — пересекающиеся круги (референс "HARMONY")
export const HarmonyIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M10 12 Q10 8, 16 8 Q22 8, 22 12" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M10 12 Q6 16, 10 20 Q14 24, 16 20" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M22 12 Q26 16, 22 20 Q18 24, 16 20" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// Укоренение (референс "GROUNDING") — арка с фигурой
export const GroundingIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M4 24 Q4 10, 16 10 Q28 10, 28 24" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M16 24 L16 16" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    <circle cx="16" cy="14" r="2" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

// Ритуал/Набор — чаша с восходящим паром (для продукта)
export const RitualIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Чаша */}
    <path d="M6 16 Q6 26, 16 26 Q26 26, 26 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M6 16 L26 16" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    {/* Пар/дым */}
    <path d="M12 12 Q13 10, 12 8" stroke="currentColor" strokeWidth="0.5" opacity="0.6" strokeLinecap="round" />
    <path d="M16 10 Q17 8, 16 6" stroke="currentColor" strokeWidth="0.5" opacity="0.7" strokeLinecap="round" />
    <path d="M20 12 Q21 10, 20 8" stroke="currentColor" strokeWidth="0.5" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// Подписка/Поток — непрерывные волны (референс "PEACE waves")
export const ContinuityIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M4 12 Q10 8, 16 12 Q22 16, 28 12" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 18 Q10 14, 16 18 Q22 22, 28 18" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 24 Q10 20, 16 24 Q22 28, 28 24" stroke="currentColor" strokeWidth="0.5" opacity="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Рефлексия/Вопросы — спираль в голове (референс "MIND")  
export const ReflectionIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Профиль головы */}
    <path d="M8 28 Q4 24, 4 16 Q4 8, 12 6 Q20 4, 24 10 Q28 16, 24 22" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    {/* Спираль внутри */}
    <path d="M14 12 Q18 10, 20 14 Q22 18, 18 20 Q14 22, 12 18 Q10 14, 14 12" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

// Пробуждение/Свет — солнце с лучами (референс "LIGHT")
export const AwakeningIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="0.6" />
    {/* Основные лучи */}
    <path d="M16 6 L16 9" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M16 23 L16 26" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M6 16 L9 16" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M23 16 L26 16" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    {/* Диагональные лучи */}
    <path d="M9 9 L11 11" stroke="currentColor" strokeWidth="0.4" opacity="0.6" strokeLinecap="round" />
    <path d="M21 21 L23 23" stroke="currentColor" strokeWidth="0.4" opacity="0.6" strokeLinecap="round" />
    <path d="M9 23 L11 21" stroke="currentColor" strokeWidth="0.4" opacity="0.6" strokeLinecap="round" />
    <path d="M21 11 L23 9" stroke="currentColor" strokeWidth="0.4" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// Травяная скрутка — благовоние с дымом (для трав в продукте)
export const IncenseSmokeIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Стебель/скрутка */}
    <path d="M16 28 L16 18" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    {/* Дым поднимается */}
    <path d="M16 18 Q14 14, 16 10 Q18 6, 16 2" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M14 16 Q12 12, 14 8" stroke="currentColor" strokeWidth="0.4" opacity="0.4" fill="none" strokeLinecap="round" />
    <path d="M18 14 Q20 10, 18 6" stroke="currentColor" strokeWidth="0.4" opacity="0.4" fill="none" strokeLinecap="round" />
  </svg>
);

// Детокс (референс "DETOX")
export const DetoxIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="10" r="6" stroke="currentColor" strokeWidth="0.6" />
    <path d="M16 3 L16 2" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
    <path d="M16 16 Q16 20, 12 24 Q10 26, 8 26" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <circle cx="14" cy="9" r="1" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
  </svg>
);

// Релакс — три волны (референс "RELAX"/"PEACE waves")
export const RelaxIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M4 10 Q10 8, 16 10 Q22 12, 28 10" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 16 Q10 14, 16 16 Q22 18, 28 16" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 22 Q10 20, 16 22 Q22 24, 28 22" stroke="currentColor" strokeWidth="0.5" opacity="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Красота — капля (референс "BEAUTY")
export const BeautyIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 4 Q24 14, 24 18 Q24 26, 16 28 Q8 26, 8 18 Q8 14, 16 4" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <circle cx="16" cy="18" r="3" stroke="currentColor" strokeWidth="0.5" />
    <path d="M14 16 Q16 14, 18 16" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
  </svg>
);

// Поток — S-образная волна
export const FlowIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M4 8 Q10 8, 12 12 Q14 16, 16 16 Q18 16, 20 12 Q22 8, 28 8" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M4 24 Q10 24, 12 20 Q14 16, 16 16 Q18 16, 20 20 Q22 24, 28 24" stroke="currentColor" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// === NAVIGATION / ACTIONS ===

// Стрелка вниз
export const ArrowDownIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5 L12 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M7 14 L12 19 L17 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Стрелка вправо
export const ArrowRightIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Стрелка вверх
export const ArrowUpIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 19 L12 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M7 10 L12 5 L17 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Галочка
export const CheckIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12 L10 17 L19 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Плюс
export const PlusIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5 L12 19 M5 12 L19 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Минус
export const MinusIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Закрыть
export const CloseIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Обновить
export const RefreshIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12 Q4 6, 12 6 Q18 6, 19 10" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M20 12 Q20 18, 12 18 Q6 18, 5 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M16 10 L19 10 L19 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14 L5 14 L5 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Поделиться
export const ShareIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="0.75" />
    <path d="M8.5 10.5 L15.5 7.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
    <path d="M8.5 13.5 L15.5 16.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
  </svg>
);

// === STARS / RATING ===

// Звезда пустая
export const StarIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4 L13.5 9.5 L19 9.5 L14.5 13 L16 19 L12 15.5 L8 19 L9.5 13 L5 9.5 L10.5 9.5 Z" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" />
  </svg>
);

// Звезда заполненная
export const StarFilledIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 4 L13.5 9.5 L19 9.5 L14.5 13 L16 19 L12 15.5 L8 19 L9.5 13 L5 9.5 L10.5 9.5 Z" />
  </svg>
);

// === PRODUCTS / OBJECTS ===

// Подарок/Упаковка — минималистичная коробка с лентой (референс стиль)
export const PackageIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Коробка */}
    <path d="M8 10 L16 6 L24 10 L24 22 L16 26 L8 22 Z" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />
    {/* Вертикальная лента */}
    <path d="M16 6 L16 26" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* Горизонтальная лента */}
    <path d="M8 16 L24 16" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* Бант сверху */}
    <path d="M14 6 Q16 4, 18 6" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="6" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

// Подарок/Набор — простая и понятная иконка (для CTA)
export const GiftPackageIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    {/* Основная коробка */}
    <rect x="6" y="10" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="0.6" />
    {/* Вертикальная лента */}
    <line x1="16" y1="10" x2="16" y2="26" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* Горизонтальная лента */}
    <line x1="6" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* Бант сверху */}
    <path d="M12 10 Q14 7, 16 10 Q18 7, 20 10" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="10" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);

// Керамика/Чаша с паром
export const CeramicIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <ellipse cx="16" cy="24" rx="9" ry="3" stroke="currentColor" strokeWidth="0.6" />
    <path d="M7 24 Q7 16, 16 14 Q25 16, 25 24" stroke="currentColor" strokeWidth="0.6" fill="none" />
    {/* Пар */}
    <path d="M12 10 Q13 8, 12 6" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
    <path d="M16 8 Q17 6, 16 4" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
    <path d="M20 10 Q21 8, 20 6" stroke="currentColor" strokeWidth="0.4" opacity="0.5" strokeLinecap="round" />
  </svg>
);

// === SOCIAL ===

// Telegram
export const TelegramIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 5 L3 11 L9 13 L11 19 L14 14 L18 17 Z" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" />
    <path d="M9 13 L17 7" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

// VK
export const VKIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="0.75" />
    <path d="M7 10 L8 14 Q9 13, 10 11 Q11 13, 12 14 L13 10" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// === SYMBOLS ===

// Сверкание/Искра
export const SparkleIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 4 L17 13 L26 14 L17 15 L16 24 L15 15 L6 14 L15 13 Z" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />
    <circle cx="24" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
    <circle cx="8" cy="22" r="1" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
  </svg>
);

// Щит — гарантия
export const ShieldIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3 L20 7 L20 12 Q20 18, 12 22 Q4 18, 4 12 L4 7 Z" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" />
    <path d="M9 12 L11 14 L15 10" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Цитата
export const QuoteIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M6 18 Q6 12, 12 12 L12 16 Q8 16, 8 20 L8 24 L6 24 Z" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />
    <path d="M18 18 Q18 12, 24 12 L24 16 Q20 16, 20 20 L20 24 L18 24 Z" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />
  </svg>
);

// Вопрос
export const QuestionIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.6" />
    <path d="M12 12 Q12 8, 16 8 Q20 8, 20 12 Q20 14, 16 16 L16 18" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="22" r="1" fill="currentColor" />
  </svg>
);

// Капля
export const DropIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 4 Q8 14, 8 20 Q8 26, 16 28 Q24 26, 24 20 Q24 14, 16 4" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <path d="M12 18 Q14 15, 16 18" stroke="currentColor" strokeWidth="0.4" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// Часы (алиас)
export const ClockIcon = TimeIcon;

"use client";

// Минималистичные иконки в стиле бренда TLEYOU
// Вдохновлены референсами: тонкие линии, органические формы, абстрактные символы

interface IconProps {
  className?: string;
}

// ═══════════════════════════════════════════════════════════════
// БАЛАНС / ГАРМОНИЯ
// ═══════════════════════════════════════════════════════════════

// Баланс - три плавающих камня (как на референсе "BALANCE")
export const BalanceIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="11" r="2.5" />
    <ellipse cx="12" cy="18" rx="4" ry="2" />
    <path d="M12 7v1.5M12 13.5v2" strokeDasharray="1 1" opacity="0.4" />
  </svg>
);

// Покой/Мир - гора с солнцем (как на референсе "PEACE")
export const PeaceIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="7" r="2" />
    <path d="M4 18 C8 18, 10 12, 12 12 C14 12, 18 18, 20 18" />
  </svg>
);

// Велнесс/Спираль - плавная волна (как на референсе "WELLNESS")  
export const WellnessIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M5 12 C7 8, 9 16, 12 12 C15 8, 17 16, 19 12" />
    <path d="M7 16 C9 14, 11 18, 14 16" opacity="0.5" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// МЕДИТАЦИЯ / ОСОЗНАННОСТЬ
// ═══════════════════════════════════════════════════════════════

// Медитация - сидящая фигура (минимальная, как на референсе)
export const MeditationIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="6" r="2.5" />
    <path d="M6 20 C6 16, 8 13, 12 13 C16 13, 18 16, 18 20" />
    <path d="M8 18 L16 18" />
  </svg>
);

// Осознанность/Разум - профиль с спиралью внутри
export const MindIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M8 20 C8 14, 8 8, 12 6 C16 4, 20 8, 18 14 C17 17, 14 19, 12 19" />
    <path d="M12 10 C13 10, 14 11, 14 12 C14 13.5, 12 14, 11 13" />
  </svg>
);

// Просветление - фигура с лучами
export const EnlightenmentIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="7" r="2" />
    <path d="M12 3v1" />
    <path d="M8 5 L9 6" />
    <path d="M16 5 L15 6" />
    <path d="M9 9 L9 12 C9 14, 10 15, 12 15 C14 15, 15 14, 15 12 L15 9" />
    <path d="M9 18 L15 18" />
    <path d="M10 21 L14 21" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ПРИРОДА / ЭЛЕМЕНТЫ
// ═══════════════════════════════════════════════════════════════

// Лотос - чистый геометрический цветок
export const LotusIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18 C12 18, 8 14, 8 10 C8 7, 10 5, 12 3 C14 5, 16 7, 16 10 C16 14, 12 18, 12 18" />
    <path d="M12 18 C10 16, 4 14, 4 10 C4 8, 6 6, 8 6" opacity="0.6" />
    <path d="M12 18 C14 16, 20 14, 20 10 C20 8, 18 6, 16 6" opacity="0.6" />
    <path d="M12 21 L12 18" />
    <circle cx="12" cy="22" r="0.5" fill="currentColor" />
  </svg>
);

// Волна - океанская волна
export const WaveIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M2 12 C4 10, 5 9, 7 9 C9 9, 10 11, 12 12 C14 13, 16 12, 18 10 C20 8, 21 9, 22 10" />
    <path d="M2 16 C4 15, 6 14, 8 14 C10 14, 12 15, 14 15 C16 15, 18 14, 22 13" opacity="0.5" />
  </svg>
);

// Лист - простой органический лист
export const LeafIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M5 20 C5 14, 8 10, 12 6 C16 2, 20 2, 20 2 C20 2, 20 8, 16 12 C12 16, 6 18, 5 20" />
    <path d="M6 18 C10 14, 14 10, 18 4" opacity="0.4" />
  </svg>
);

// Росток/Рост - простой росток
export const GrowthIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 22 L12 10" />
    <path d="M12 10 C12 10, 8 8, 8 5 C8 3, 10 2, 12 4" />
    <path d="M12 14 C12 14, 16 12, 16 9 C16 7, 14 6, 12 8" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// РИТУАЛ / ПРАКТИКА
// ═══════════════════════════════════════════════════════════════

// Свеча/Пламя - минималистичное пламя
export const FlameIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 4 C12 4, 16 8, 16 12 C16 15, 14 17, 12 17 C10 17, 8 15, 8 12 C8 8, 12 4, 12 4" />
    <path d="M12 14 C11 14, 10 13, 10 12 C10 10.5, 12 9, 12 9" opacity="0.5" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

// Дым/Благовоние - восходящий дым
export const IncenseIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 20 L12 14" />
    <path d="M12 14 C11 12, 13 10, 12 8 C11 6, 13 4, 12 2" />
    <circle cx="12" cy="21.5" r="1" opacity="0.5" />
  </svg>
);

// Капля с медитацией (как на референсе с океаном)
export const DropMeditationIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 3 C12 3, 6 10, 6 14 C6 18, 8.5 21, 12 21 C15.5 21, 18 18, 18 14 C18 10, 12 3, 12 3" />
    <circle cx="12" cy="12" r="1" />
    <path d="M9 17 C9 15, 10 14, 12 14 C14 14, 15 15, 15 17" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ВРЕМЯ / РИТМ
// ═══════════════════════════════════════════════════════════════

// Время/Часы - минималистичные часы
export const TimeIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6 L12 12 L16 14" />
  </svg>
);

// Бесконечность - лежачая восьмерка
export const InfinityIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M4 12 C4 9, 6 7, 9 7 C12 7, 12 12, 12 12 C12 12, 12 17, 15 17 C18 17, 20 15, 20 12 C20 9, 18 7, 15 7 C12 7, 12 12, 12 12 C12 12, 12 17, 9 17 C6 17, 4 15, 4 12" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// КАРТОЧКИ / РЕФЛЕКСИЯ
// ═══════════════════════════════════════════════════════════════

// Карточки - стопка карточек
export const CardsIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="5" width="14" height="18" rx="1" />
    <rect x="6" y="3" width="14" height="18" rx="1" opacity="0.5" />
    <line x1="8" y1="11" x2="14" y2="11" opacity="0.6" />
    <line x1="8" y1="14" x2="12" y2="14" opacity="0.4" />
  </svg>
);

// Книга знаний
export const KnowledgeIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 5 C12 5, 8 4, 4 4 L4 18 C8 18, 12 19, 12 19 C12 19, 16 18, 20 18 L20 4 C16 4, 12 5, 12 5" />
    <path d="M12 5 L12 19" />
    <circle cx="12" cy="3" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ЭНЕРГИЯ / СВЕТ
// ═══════════════════════════════════════════════════════════════

// Свет/Сияние - минималистичное солнце
export const LightIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 4 L12 6" />
    <path d="M12 18 L12 20" />
    <path d="M4 12 L6 12" />
    <path d="M18 12 L20 12" />
    <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.3" />
  </svg>
);

// Энергия - концентрические круги (как спираль разума)
export const EnergyIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="6" opacity="0.6" />
    <circle cx="12" cy="12" r="9" opacity="0.3" />
  </svg>
);

// Пробуждение - глаз с лучами
export const AwakenIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <ellipse cx="12" cy="12" rx="8" ry="4" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 6 L12 4" opacity="0.5" />
    <path d="M7 8 L5 6" opacity="0.5" />
    <path d="M17 8 L19 6" opacity="0.5" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ТЕЛО / РУКА
// ═══════════════════════════════════════════════════════════════

// Рука - открытая ладонь
export const HandIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M6 12 C4 10, 4 8, 6 6" />
    <path d="M6 12 L6 20 C6 21, 7 22, 8 22 L16 22 C17 22, 18 21, 18 20 L18 12" />
    <path d="M18 12 C20 10, 20 8, 18 6" />
    <path d="M12 10 L12 4" opacity="0.6" />
  </svg>
);

// Тело - абстрактная фигура (как на референсе "BODY")
export const BodyIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="5" r="2" />
    <path d="M8 22 C8 16, 10 12, 10 10" />
    <path d="M16 22 C16 16, 14 12, 14 10" />
    <path d="M10 10 C10 8, 11 7, 12 7 C13 7, 14 8, 14 10" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ЛАБИРИНТ / ПУТЬ
// ═══════════════════════════════════════════════════════════════

// Лабиринт - круговой лабиринт
export const LabyrinthIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3 L12 8" />
    <path d="M12 8 C8 8, 6 10, 6 12 C6 16, 10 18, 12 18" />
    <path d="M12 18 C14 18, 16 16, 16 14 C16 12, 14 11, 12 11" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

// Путь - извилистая дорога
export const PathIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M4 20 C8 18, 6 14, 10 12 C14 10, 12 6, 16 4 C18 3, 20 3, 20 4" />
    <circle cx="4" cy="20" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="20" cy="4" r="1" fill="currentColor" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ДОПОЛНИТЕЛЬНЫЕ
// ═══════════════════════════════════════════════════════════════

// Земля/Укоренение - корни
export const GroundingIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 4 L12 12" />
    <path d="M6 22 C8 16, 10 14, 12 12 C14 14, 16 16, 18 22" />
    <path d="M9 20 C10 16, 11 14, 12 12" opacity="0.5" />
    <path d="M15 20 C14 16, 13 14, 12 12" opacity="0.5" />
  </svg>
);

// Сердце - минималистичное
export const HeartIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20 C8 16, 4 12, 4 8 C4 5, 6 3, 9 3 C10.5 3, 11.5 4, 12 5 C12.5 4, 13.5 3, 15 3 C18 3, 20 5, 20 8 C20 12, 16 16, 12 20" />
  </svg>
);

// Звезда - минималистичная
export const StarIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 3 L12 8 M12 16 L12 21 M3 12 L8 12 M16 12 L21 12" />
    <path d="M6 6 L9 9 M15 15 L18 18 M6 18 L9 15 M15 9 L18 6" opacity="0.5" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Галочка
export const CheckIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12 L10 17 L19 6" />
  </svg>
);

// Стрелка
export const ArrowIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12 L19 12" />
    <path d="M14 7 L19 12 L14 17" />
  </svg>
);

// Керамика/Чаша
export const BowlIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M4 10 C4 14, 6 18, 12 18 C18 18, 20 14, 20 10" />
    <ellipse cx="12" cy="10" rx="8" ry="3" />
    <path d="M10 21 L14 21" />
    <path d="M12 18 L12 21" />
  </svg>
);

// Дыхание - Inhale/Exhale
export const BreathIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="12" r="8" strokeDasharray="3 2" />
    <path d="M12 8 C10 10, 10 14, 12 16" />
    <path d="M12 8 C14 10, 14 14, 12 16" />
    <circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="12" cy="16" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

// Духовность/Spirit - чаша с восходящим
export const SpiritIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M8 20 C8 16, 12 14, 12 10" />
    <path d="M16 20 C16 16, 12 14, 12 10" />
    <circle cx="12" cy="6" r="3" />
    <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

// Детокс/Очищение
export const DetoxIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <circle cx="12" cy="10" r="6" />
    <path d="M12 4 L12 2" />
    <path d="M12 16 L12 18 C12 20, 10 22, 8 22" />
    <path d="M9 8 C10 9, 10 11, 9 12" opacity="0.5" />
  </svg>
);

// Красота
export const BeautyIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M12 4 C12 4, 18 10, 18 14 C18 18, 15 20, 12 20 C9 20, 6 18, 6 14 C6 10, 12 4, 12 4" />
    <circle cx="12" cy="14" r="2" />
    <path d="M10 12 C11 11, 13 11, 14 12" opacity="0.5" />
  </svg>
);

// Подарок/Упаковка
export const GiftIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <rect x="4" y="10" width="16" height="10" rx="1" />
    <path d="M4 13 L20 13" opacity="0.5" />
    <path d="M12 10 L12 20" />
    <path d="M8 10 C8 8, 10 6, 12 6 C14 6, 16 8, 16 10" />
    <path d="M8 6 C10 7, 11 8, 12 10" opacity="0.5" />
    <path d="M16 6 C14 7, 13 8, 12 10" opacity="0.5" />
  </svg>
);

// Релакс - волны расслабления
export const RelaxIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
    <path d="M4 8 C7 8, 8 10, 12 10 C16 10, 17 8, 20 8" />
    <path d="M4 12 C7 12, 8 14, 12 14 C16 14, 17 12, 20 12" opacity="0.7" />
    <path d="M4 16 C7 16, 8 18, 12 18 C16 18, 17 16, 20 16" opacity="0.4" />
  </svg>
);


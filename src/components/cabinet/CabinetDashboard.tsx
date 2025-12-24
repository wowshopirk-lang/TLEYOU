"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMoodStore, MoodKey } from "@/stores/moodStore";
import { useCardsStore, formatCardDate } from "@/stores/cardsStore";
import { cards as allCards } from "@/data/cards";

// Персонализированный контент для каждого настроения
const moodContent: Record<MoodKey, { 
  practices: { label: string; sub: string }[];
  affirmation: string;
  greeting: string;
}> = {
  radiant: {
    practices: [
      { label: "Медитация благодарности", sub: "Усиль позитив" },
      { label: "Энергичная йога", sub: "15 минут движения" },
    ],
    affirmation: "Я излучаю радость и позитив",
    greeting: "Прекрасно! Сохрани это состояние",
  },
  calm: {
    practices: [
      { label: "Дыхательная практика", sub: "5 минут покоя" },
      { label: "Тело-сканирование", sub: "Расслабление" },
    ],
    affirmation: "Я в гармонии с собой и миром",
    greeting: "Спокойствие — твоя сила",
  },
  balanced: {
    practices: [
      { label: "Осознанная прогулка", sub: "10 минут на воздухе" },
      { label: "Журналирование", sub: "Запиши свои мысли" },
    ],
    affirmation: "Я нахожусь в равновесии",
    greeting: "Стабильность — хорошая основа",
  },
  tender: {
    practices: [
      { label: "Самосострадание", sub: "Будь добра к себе" },
      { label: "Тёплое обнимание", sub: "Практика заботы" },
    ],
    affirmation: "Мои чувства важны и ценны",
    greeting: "Позволь себе чувствовать",
  },
  tired: {
    practices: [
      { label: "Глубокое расслабление", sub: "Восстанови силы" },
      { label: "Мягкая растяжка", sub: "5 минут нежности" },
    ],
    affirmation: "Я заслуживаю отдыха и заботы",
    greeting: "Отдых — это тоже важно",
  },
  anxious: {
    practices: [
      { label: "Заземление 5-4-3-2-1", sub: "Вернись в момент" },
      { label: "Дыхание 4-7-8", sub: "Успокой нервную систему" },
    ],
    affirmation: "Я в безопасности. Всё пройдёт",
    greeting: "Ты справишься. Шаг за шагом",
  },
  inspired: {
    practices: [
      { label: "Визуализация цели", sub: "Представь результат" },
      { label: "Креативная медитация", sub: "Поток идей" },
    ],
    affirmation: "Моё вдохновение ведёт меня вперёд",
    greeting: "Твори и создавай!",
  },
  grateful: {
    practices: [
      { label: "Список благодарности", sub: "Запиши 5 вещей" },
      { label: "Медитация изобилия", sub: "Ощути полноту жизни" },
    ],
    affirmation: "Моя жизнь полна благословений",
    greeting: "Благодарность умножает радость",
  },
  energetic: {
    practices: [
      { label: "Динамическая практика", sub: "Выплесни энергию" },
      { label: "Танцевальная медитация", sub: "Двигайся свободно" },
    ],
    affirmation: "Моя энергия безгранична",
    greeting: "Направь энергию в действие!",
  },
  peaceful: {
    practices: [
      { label: "Созерцательная практика", sub: "Наслаждайся тишиной" },
      { label: "Медитация на природе", sub: "Единение с миром" },
    ],
    affirmation: "Покой живёт внутри меня",
    greeting: "Наслаждайся этим моментом",
  },
  confused: {
    practices: [
      { label: "Практика ясности", sub: "Найди ответы внутри" },
      { label: "Письмо себе", sub: "Разберись в мыслях" },
    ],
    affirmation: "Я доверяю своему пути",
    greeting: "Замешательство — это начало понимания",
  },
};

// Базовые быстрые действия
const baseActions = [
  { href: "/cabinet/journal", icon: "leaf", label: "Дневник", sub: "Записать мысли", color: "#9a8fb5" },
  { href: "/cabinet/chat", icon: "chat", label: "Чат", sub: "Поддержка ИИ", color: "#7a9ebb" },
  { href: "/cabinet/tests", icon: "tests", label: "Тесты", sub: "Узнай себя лучше", color: "#88a5b5" },
  { href: "/cabinet/mood", icon: "mood", label: "Настроение", sub: "История состояний", color: "#b49b78" },
];

const ActionIcon = ({ icon, color }: { icon: string; color: string }) => {
  const icons: Record<string, JSX.Element> = {
    practice: (
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full" style={{ color }}>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7 L13 10 L8 13 Z" fill="currentColor" opacity="0.4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full" style={{ color }}>
        <path d="M10 3 C6 3, 4 6, 4 9 C4 12, 6 14, 8 15.5 C9 16.5, 10 17, 10 18 C10 17, 11 16.5, 12 15.5 C14 14, 16 12, 16 9 C16 6, 14 3, 10 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full" style={{ color }}>
        <path d="M10 3 C5 3, 2 6, 2 9 C2 11, 3 13, 4.5 14 L4 17 L7 15.5 C8 16, 9 16, 10 16 C15 16, 18 13, 18 9 C18 6, 15 3, 10 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full" style={{ color }}>
        <path d="M10 17 C10 17, 3 12, 3 7.5 C3 4.5, 6 3, 8 4.5 C9 5.2, 10 6, 10 6 C10 6, 11 5.2, 12 4.5 C14 3, 17 4.5, 17 7.5 C17 12, 10 17, 10 17" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    tests: (
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full" style={{ color }}>
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10 L8 12 L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    mood: (
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full" style={{ color }}>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 12 C8 13, 9 13.5, 10 13.5 C11 13.5, 12 13, 13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="7" cy="8" r="1" fill="currentColor" />
        <circle cx="13" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  };
  return icons[icon] || null;
};

export default function CabinetDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const { currentMood } = useMoodStore();
  const { getTodayCard, openTodayCard, isCardOpened } = useCardsStore();
  
  // Получаем данные о сегодняшней карточке
  const todayCardData = getTodayCard();
  const todayCard = allCards.find(c => c.id === todayCardData.cardId);
  
  // Персонализированный контент на основе настроения
  const content = currentMood ? moodContent[currentMood] : null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Открыть карточку дня
  const handleOpenCard = () => {
    if (todayCardData.canOpen) {
      setIsFlipping(true);
      
      // Анимация переворота
      setTimeout(() => {
        openTodayCard();
        setIsFlipped(true);
        setIsFlipping(false);
      }, 600);
    } else if (todayCardData.isOpened) {
      // Уже открыта - просто показываем
      setIsFlipped(true);
      setShowCardModal(true);
    }
  };

  // Закрыть модалку
  const handleCloseModal = () => {
    setShowCardModal(false);
    setIsFlipped(false);
  };

  if (!isMounted) {
    return (
      <div className="h-[calc(100vh-400px)] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-white/10 animate-pulse" />
      </div>
    );
  }

  // Если настроение не выбрано — показываем приглашение
  if (!currentMood) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 lg:py-24"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-md"
        >
          {/* Декоративный элемент */}
          <div className="w-20 h-20 mx-auto mb-6 opacity-30">
            <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
              <circle cx="40" cy="40" r="35" stroke="#8fb583" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="40" cy="40" r="25" stroke="#b49b78" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="15" stroke="#7a9ebb" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="40" cy="40" r="5" fill="#8fb583" opacity="0.3" />
            </svg>
          </div>
          
          <h2 className="text-xl lg:text-2xl font-heading font-light text-white/80 mb-3">
            Как ты себя чувствуешь сегодня?
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">
            Выбери своё настроение выше, чтобы увидеть персональную карточку дня и подборку практик
          </p>
          
          {/* Стрелка вверх */}
          <motion.div 
            className="mt-8 opacity-20"
            animate={{ y: [-5, 0, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto">
              <path d="M12 19 L12 5 M5 12 L12 5 L19 12" stroke="#8fb583" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentMood}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10"
      >
        {/* Left - Card of the Day (большая) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center flex-shrink-0 w-full lg:w-auto"
        >
          <div 
            className="block cursor-pointer"
            onClick={handleOpenCard}
          >
            <div className="group relative">
              {/* Ambient glow */}
              <div className="absolute -inset-12 bg-gradient-radial from-[#b49b78]/15 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-2xl" />
              
              {/* Card with flip animation */}
              <motion.div 
                className="relative w-64 lg:w-80 aspect-[3/4.2]"
                animate={{ rotateY: isFlipping ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Front (not opened) */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-[#1c1915] via-[#14120f] to-[#0b0a09] border overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#b49b78]/15 ${
                    todayCardData.isOpened 
                      ? 'border-[#8fb583]/40' 
                      : 'border-[#b49b78]/25 group-hover:border-[#b49b78]/50'
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Inner frame */}
                  <div className="absolute inset-4 border border-[#b49b78]/10 rounded-2xl pointer-events-none" />
                  
                  {/* Corner accents */}
                  {[
                    { pos: "top-4 left-4", path: "M0 12 L0 0 L12 0" },
                    { pos: "top-4 right-4", path: "M12 0 L24 0 L24 12" },
                    { pos: "bottom-4 left-4", path: "M0 12 L0 24 L12 24" },
                    { pos: "bottom-4 right-4", path: "M12 24 L24 24 L24 12" },
                  ].map((corner, i) => (
                    <div key={i} className={`absolute ${corner.pos} w-6 h-6`}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                        <path d={corner.path} stroke="#b49b78" strokeWidth="1" opacity="0.5" />
                      </svg>
                    </div>
                  ))}

                  {/* Center mandala decoration */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
                    <svg viewBox="0 0 80 80" fill="none" className="w-48 h-48">
                      <circle cx="40" cy="40" r="30" stroke="#b49b78" strokeWidth="0.5" />
                      <circle cx="40" cy="40" r="18" stroke="#b49b78" strokeWidth="0.5" strokeDasharray="3 3" />
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <path
                          key={i}
                          d="M40 10 Q43 5, 40 2 Q37 5, 40 10"
                          stroke="#b49b78"
                          strokeWidth="0.5"
                          transform={`rotate(${angle} 40 40)`}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                    {todayCardData.isOpened ? (
                      <>
                        {/* Opened card - show question */}
                        <div className="w-6 h-6 mb-3 text-[#8fb583]">
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8fb583]/70 mb-4">
                          Открыта сегодня
                        </p>
                        <p className="text-lg lg:text-xl text-white/90 leading-relaxed font-light px-2">
                          {todayCard?.question}
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Not opened - show invitation to open */}
                        <div className="w-12 h-12 mb-4 opacity-60">
                          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                            <rect x="8" y="8" width="28" height="36" rx="3" stroke="#b49b78" strokeWidth="1.5" fill="none" />
                            <rect x="12" y="4" width="28" height="36" rx="3" stroke="#b49b78" strokeWidth="1" opacity="0.3" fill="none" />
                            <path d="M16 20 L28 20" stroke="#b49b78" strokeWidth="1" opacity="0.4" />
                            <path d="M16 26 L24 26" stroke="#b49b78" strokeWidth="1" opacity="0.3" />
                          </svg>
                        </div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#b49b78]/70 mb-3">
                          Карточка дня
                        </p>
                        <p className="text-sm text-white/50 mb-4">
                          Нажми, чтобы открыть
                        </p>
                        <div className="text-[10px] text-white/30">
                          Карточка #{todayCard?.id} из 30
                        </div>
                      </>
                    )}
                    
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-80 transition-opacity">
                        <div className="w-6 h-px bg-[#b49b78]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#b49b78]" />
                        <div className="w-6 h-px bg-[#b49b78]" />
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#b49b78]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              {/* Floating shadow */}
              <div className="absolute -bottom-4 left-6 right-6 h-4 bg-black/40 blur-xl rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Right - Personalized Content */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {/* Статистика открытых карточек */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Link href="/cabinet/cards">
              <div className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-[#b49b78]/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Коллекция</p>
                    <p className="text-lg text-white/80 font-light">
                      {useCardsStore.getState().openedCards.length} из 30 карточек
                    </p>
                  </div>
                  <div className="text-white/30 group-hover:text-[#b49b78] transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Персональное приветствие */}
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
            >
              <p className="text-sm text-white/60 mb-1">{content.greeting}</p>
              <p className="text-base lg:text-lg text-white/90 font-light italic">
                &ldquo;{content.affirmation}&rdquo;
              </p>
            </motion.div>
          )}

          {/* Рекомендованные практики */}
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {content.practices.map((practice, i) => (
                <Link key={i} href="/cabinet/practices">
                  <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:bg-[#8fb583]/5 hover:border-[#8fb583]/20">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#8fb583]/10 border border-[#8fb583]/20 flex-shrink-0">
                      <ActionIcon icon="practice" color="#8fb583" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-white/85 font-light truncate">{practice.label}</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">{practice.sub}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* Быстрые действия - сетка 2x2 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-2 gap-3"
          >
            {baseActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
                >
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 border"
                    style={{ backgroundColor: `${action.color}10`, borderColor: `${action.color}20` }}
                  >
                    <ActionIcon icon={action.icon} color={action.color} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white/85 font-light">{action.label}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">{action.sub}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {showCardModal && todayCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0c0a]/95 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] rounded-3xl p-8 md:p-12 max-w-lg w-full border border-[#8fb583]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 0 L32 0 L32 12" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M0 20 L0 32 L12 32" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M20 32 L32 32 L32 20" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
                </svg>
              </div>

              {/* Card number */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
                  <span className="text-lg font-heading text-[#8fb583]">{todayCard.id}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Карточка дня • {formatCardDate(new Date().toISOString().split('T')[0])}
                </span>
              </div>

              {/* Question */}
              <p className="text-xl md:text-2xl font-heading font-light text-white/90 text-center leading-relaxed mb-8">
                {todayCard.question}
              </p>

              {/* Actions */}
              <div className="flex justify-center">
                <Link href="/cabinet/cards">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/20 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-300">
                    <span className="text-sm font-medium">Все карточки</span>
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <path d="M7 4 L13 10 L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-12 text-white/30 hover:text-white/60 transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

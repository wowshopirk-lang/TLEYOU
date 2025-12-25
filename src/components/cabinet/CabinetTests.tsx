"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTestsStore } from "@/stores/testsStore";
import { useCalendarStore, getDateKey } from "@/stores/calendarStore";

// Ботанические иконки в стиле проекта
const TestIcons = {
  stress: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Увядший лист с трещинами */}
      <path 
        d="M16 4 Q20 8, 22 14 Q24 20, 20 24 Q16 26, 12 24 Q8 22, 8 16 Q8 10, 12 6 Q14 4, 16 4" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={`${color}15`}
        opacity="0.7"
      />
      {/* Трещины */}
      <path d="M12 10 L14 14" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.5" />
      <path d="M18 12 L20 16" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.5" />
      <path d="M14 18 L16 22" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  emotions: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Цветок с лепестками */}
      <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1" fill={`${color}20`} opacity="0.6" />
      {/* Лепестки */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx="16"
          cy="10"
          rx="3"
          ry="5"
          stroke={color}
          strokeWidth="1"
          fill={`${color}25`}
          opacity="0.7"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
    </svg>
  ),
  balance: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Симметричный лист */}
      <path 
        d="M16 4 Q20 8, 22 12 Q24 16, 22 20 Q20 24, 16 26 Q12 24, 10 20 Q8 16, 10 12 Q12 8, 16 4" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={`${color}15`}
        opacity="0.8"
      />
      {/* Центральная жилка */}
      <path d="M16 4 L16 26" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Боковые жилки */}
      <path d="M16 10 Q12 12, 11 14" stroke={color} strokeWidth="0.75" opacity="0.4" />
      <path d="M16 10 Q20 12, 21 14" stroke={color} strokeWidth="0.75" opacity="0.4" />
    </svg>
  ),
  anxiety: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Волны/рябь */}
      <path d="M4 16 Q8 12, 12 16 T20 16 T28 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M4 20 Q8 16, 12 20 T20 20 T28 20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M4 24 Q8 20, 12 24 T20 24 T28 24" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
      {/* Капли */}
      <circle cx="8" cy="12" r="1.5" fill={color} opacity="0.5" />
      <circle cx="24" cy="12" r="1" fill={color} opacity="0.4" />
    </svg>
  ),
  selfesteem: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Цветущий бутон */}
      <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1.5" fill={`${color}20`} opacity="0.8" />
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1" fill={`${color}30`} opacity="0.7" />
      {/* Лепестки вокруг */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx="16"
          cy="8"
          rx="2"
          ry="4"
          stroke={color}
          strokeWidth="1"
          fill={`${color}25`}
          opacity="0.7"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
    </svg>
  ),
  sleep: (color: string, size: string = "w-full h-full") => (
    <svg viewBox="0 0 32 32" fill="none" className={size}>
      {/* Луна */}
      <path 
        d="M20 8 C24 8, 26 12, 24 16 C26 20, 24 24, 20 24 C16 24, 14 20, 16 16 C14 12, 16 8, 20 8" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={`${color}20`}
        opacity="0.8"
      />
      {/* Звёзды */}
      <path d="M8 10 L8.5 11.5 L10 12 L8.5 12.5 L8 14 L7.5 12.5 L6 12 L7.5 11.5 Z" fill={color} opacity="0.5" />
      <path d="M12 20 L12.3 20.8 L13 21 L12.3 21.2 L12 22 L11.7 21.2 L11 21 L11.7 20.8 Z" fill={color} opacity="0.4" />
      {/* Закрытый бутон */}
      <circle cx="10" cy="22" r="2" stroke={color} strokeWidth="0.75" fill={`${color}15`} opacity="0.5" />
    </svg>
  ),
};

// Types
interface Test {
  id: number;
  title: string;
  description: string;
  duration: string;
  questions: number;
  category: string;
  color: string;
  icon: keyof typeof TestIcons;
  completed?: boolean;
  result?: string;
}

interface Question {
  id: number;
  text: string;
  options: { text: string; value: number }[];
}

// Available tests
const tests: Test[] = [
  {
    id: 1,
    title: "Уровень стресса",
    description: "Оцени свой текущий уровень стресса и получи рекомендации",
    duration: "5 мин",
    questions: 10,
    category: "Стресс",
    color: "#b58f8f",
    icon: "stress",
  },
  {
    id: 2,
    title: "Эмоциональный интеллект",
    description: "Узнай, насколько хорошо ты понимаешь свои и чужие эмоции",
    duration: "10 мин",
    questions: 20,
    category: "Эмоции",
    color: "#9a8fb5",
    icon: "emotions",
  },
  {
    id: 3,
    title: "Баланс жизни",
    description: "Проверь, насколько сбалансированы разные сферы твоей жизни",
    duration: "7 мин",
    questions: 15,
    category: "Баланс",
    color: "#8fb583",
    icon: "balance",
  },
  {
    id: 4,
    title: "Уровень тревожности",
    description: "Тест на определение уровня тревожности (GAD-7)",
    duration: "3 мин",
    questions: 7,
    category: "Тревога",
    color: "#7a9ebb",
    icon: "anxiety",
  },
  {
    id: 5,
    title: "Самооценка",
    description: "Оцени своё отношение к себе и уверенность",
    duration: "5 мин",
    questions: 10,
    category: "Самооценка",
    color: "#b49b78",
    icon: "selfesteem",
    completed: true,
    result: "Здоровая самооценка",
  },
  {
    id: 6,
    title: "Качество сна",
    description: "Проверь качество своего сна и получи советы",
    duration: "4 мин",
    questions: 8,
    category: "Сон",
    color: "#5f7a9e",
    icon: "sleep",
  },
];

// Questions for stress test (Уровень стресса)
const stressQuestions: Question[] = [
  {
    id: 1,
    text: "Как часто ты чувствуешь себя подавленной за последний месяц?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 2,
    text: "Как часто ты чувствуешь, что не можешь справиться со своими делами?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Как часто ты чувствуешь раздражение?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 4,
    text: "Как часто ты чувствуешь уверенность в своей способности решать проблемы?",
    options: [
      { text: "Очень часто", value: 0 },
      { text: "Часто", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Редко", value: 3 },
      { text: "Никогда", value: 4 },
    ],
  },
  {
    id: 5,
    text: "Как часто ты чувствуешь, что всё идёт по плану?",
    options: [
      { text: "Очень часто", value: 0 },
      { text: "Часто", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Редко", value: 3 },
      { text: "Никогда", value: 4 },
    ],
  },
  {
    id: 6,
    text: "Как часто ты испытываешь физическое напряжение?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 7,
    text: "Как часто ты чувствуешь усталость без видимой причины?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 8,
    text: "Как часто у тебя возникают проблемы со сном из-за переживаний?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 9,
    text: "Как часто ты чувствуешь, что у тебя нет времени на отдых?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 10,
    text: "Как часто ты чувствуешь, что не можешь расслабиться?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
];

// Questions for emotional intelligence test (Эмоциональный интеллект)
const emotionsQuestions: Question[] = [
  {
    id: 1,
    text: "Насколько хорошо ты понимаешь свои эмоции в момент их возникновения?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 2,
    text: "Как часто ты можешь назвать конкретную эмоцию, которую испытываешь?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Насколько хорошо ты понимаешь эмоции других людей?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 4,
    text: "Как часто ты можешь предсказать, как твои действия повлияют на эмоции других?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 5,
    text: "Насколько хорошо ты управляешь своими эмоциями в стрессовых ситуациях?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 6,
    text: "Как часто ты используешь эмоции для принятия решений?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 7,
    text: "Насколько легко тебе выразить свои чувства словами?",
    options: [
      { text: "Очень сложно", value: 0 },
      { text: "Сложно", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Легко", value: 3 },
      { text: "Очень легко", value: 4 },
    ],
  },
  {
    id: 8,
    text: "Как часто ты замечаешь изменения в настроении других людей?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 9,
    text: "Насколько хорошо ты понимаешь связь между мыслями и эмоциями?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 10,
    text: "Как часто ты можешь успокоить себя, когда расстроена?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 11,
    text: "Насколько хорошо ты понимаешь, почему ты испытываешь ту или иную эмоцию?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 12,
    text: "Как часто ты можешь помочь другим справиться с их эмоциями?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 13,
    text: "Насколько хорошо ты контролируешь свои импульсивные реакции?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 14,
    text: "Как часто ты используешь эмпатию в общении с другими?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 15,
    text: "Насколько хорошо ты понимаешь невербальные сигналы других людей?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 16,
    text: "Как часто ты можешь изменить своё настроение, когда это необходимо?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 17,
    text: "Насколько хорошо ты понимаешь влияние эмоций на твоё поведение?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 18,
    text: "Как часто ты можешь найти баланс между логикой и эмоциями?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 19,
    text: "Насколько хорошо ты понимаешь свои эмоциональные потребности?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Очень хорошо", value: 4 },
    ],
  },
  {
    id: 20,
    text: "Как часто ты можешь использовать эмоции для мотивации себя?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
];

// Questions for life balance test (Баланс жизни)
const balanceQuestions: Question[] = [
  {
    id: 1,
    text: "Насколько ты удовлетворена своей работой или учёбой?",
    options: [
      { text: "Совсем не удовлетворена", value: 0 },
      { text: "Слабо удовлетворена", value: 1 },
      { text: "Удовлетворена", value: 2 },
      { text: "Хорошо удовлетворена", value: 3 },
      { text: "Полностью удовлетворена", value: 4 },
    ],
  },
  {
    id: 2,
    text: "Как часто ты находишь время для отдыха и восстановления?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Насколько хорошо ты заботишься о своём физическом здоровье?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 4,
    text: "Как часто ты проводишь время с близкими людьми?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 5,
    text: "Насколько ты удовлетворена своими отношениями?",
    options: [
      { text: "Совсем не удовлетворена", value: 0 },
      { text: "Слабо удовлетворена", value: 1 },
      { text: "Удовлетворена", value: 2 },
      { text: "Хорошо удовлетворена", value: 3 },
      { text: "Полностью удовлетворена", value: 4 },
    ],
  },
  {
    id: 6,
    text: "Как часто ты занимаешься хобби или творчеством?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 7,
    text: "Насколько хорошо ты управляешь своим временем?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 8,
    text: "Как часто ты чувствуешь, что у тебя есть время для себя?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 9,
    text: "Насколько ты удовлетворена своим финансовым положением?",
    options: [
      { text: "Совсем не удовлетворена", value: 0 },
      { text: "Слабо удовлетворена", value: 1 },
      { text: "Удовлетворена", value: 2 },
      { text: "Хорошо удовлетворена", value: 3 },
      { text: "Полностью удовлетворена", value: 4 },
    ],
  },
  {
    id: 10,
    text: "Как часто ты чувствуешь, что успеваешь сделать всё необходимое?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 11,
    text: "Насколько хорошо ты заботишься о своём ментальном здоровье?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 12,
    text: "Как часто ты чувствуешь баланс между разными сферами жизни?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 13,
    text: "Насколько ты удовлетворена своим личностным ростом?",
    options: [
      { text: "Совсем не удовлетворена", value: 0 },
      { text: "Слабо удовлетворена", value: 1 },
      { text: "Удовлетворена", value: 2 },
      { text: "Хорошо удовлетворена", value: 3 },
      { text: "Полностью удовлетворена", value: 4 },
    ],
  },
  {
    id: 14,
    text: "Как часто ты чувствуешь, что живёшь в соответствии со своими ценностями?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 15,
    text: "Насколько хорошо ты устанавливаешь границы в отношениях?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
];

// Questions for anxiety test (GAD-7) (Уровень тревожности)
const anxietyQuestions: Question[] = [
  {
    id: 1,
    text: "За последние 2 недели, как часто тебя беспокоило чувство нервозности, тревоги или напряжения?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
  {
    id: 2,
    text: "За последние 2 недели, как часто ты не могла остановить или контролировать беспокойство?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
  {
    id: 3,
    text: "За последние 2 недели, как часто тебя беспокоило чрезмерное беспокойство о разных вещах?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
  {
    id: 4,
    text: "За последние 2 недели, как часто тебе было трудно расслабиться?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
  {
    id: 5,
    text: "За последние 2 недели, как часто ты чувствовала такое беспокойство, что было трудно сидеть спокойно?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
  {
    id: 6,
    text: "За последние 2 недели, как часто тебя раздражало или беспокоило то, что обычно тебя не беспокоит?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
  {
    id: 7,
    text: "За последние 2 недели, как часто ты чувствовала страх, как будто должно произойти что-то ужасное?",
    options: [
      { text: "Совсем не беспокоило", value: 0 },
      { text: "Несколько дней", value: 1 },
      { text: "Больше половины дней", value: 2 },
      { text: "Почти каждый день", value: 3 },
    ],
  },
];

// Questions for self-esteem test (Самооценка)
const selfesteemQuestions: Question[] = [
  {
    id: 1,
    text: "Насколько ты довольна собой в целом?",
    options: [
      { text: "Совсем не довольна", value: 0 },
      { text: "Слабо довольна", value: 1 },
      { text: "Довольна", value: 2 },
      { text: "Хорошо довольна", value: 3 },
      { text: "Полностью довольна", value: 4 },
    ],
  },
  {
    id: 2,
    text: "Как часто ты чувствуешь, что у тебя есть хорошие качества?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Насколько ты уверена в своих способностях?",
    options: [
      { text: "Совсем не уверена", value: 0 },
      { text: "Слабо уверена", value: 1 },
      { text: "Уверена", value: 2 },
      { text: "Хорошо уверена", value: 3 },
      { text: "Полностью уверена", value: 4 },
    ],
  },
  {
    id: 4,
    text: "Как часто ты сравниваешь себя с другими в негативном ключе?",
    options: [
      { text: "Всегда", value: 4 },
      { text: "Часто", value: 3 },
      { text: "Иногда", value: 2 },
      { text: "Редко", value: 1 },
      { text: "Никогда", value: 0 },
    ],
  },
  {
    id: 5,
    text: "Насколько хорошо ты принимаешь комплименты?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 6,
    text: "Как часто ты чувствуешь себя достойной любви и уважения?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
  {
    id: 7,
    text: "Насколько ты уверена в своём внешнем виде?",
    options: [
      { text: "Совсем не уверена", value: 0 },
      { text: "Слабо уверена", value: 1 },
      { text: "Уверена", value: 2 },
      { text: "Хорошо уверена", value: 3 },
      { text: "Полностью уверена", value: 4 },
    ],
  },
  {
    id: 8,
    text: "Как часто ты критикуешь себя за ошибки?",
    options: [
      { text: "Всегда", value: 4 },
      { text: "Часто", value: 3 },
      { text: "Иногда", value: 2 },
      { text: "Редко", value: 1 },
      { text: "Никогда", value: 0 },
    ],
  },
  {
    id: 9,
    text: "Насколько хорошо ты заботишься о себе?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 10,
    text: "Как часто ты чувствуешь, что заслуживаешь хорошего в жизни?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
];

// Questions for sleep quality test (Качество сна)
const sleepQuestions: Question[] = [
  {
    id: 1,
    text: "Как часто у тебя возникают проблемы с засыпанием?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 2,
    text: "Как часто ты просыпаешься ночью?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Насколько хорошо ты высыпаешься?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 4,
    text: "Как часто ты чувствуешь усталость после пробуждения?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Очень часто", value: 4 },
    ],
  },
  {
    id: 5,
    text: "Насколько регулярен твой режим сна?",
    options: [
      { text: "Очень нерегулярен", value: 0 },
      { text: "Нерегулярен", value: 1 },
      { text: "Средне регулярен", value: 2 },
      { text: "Регулярен", value: 3 },
      { text: "Очень регулярен", value: 4 },
    ],
  },
  {
    id: 6,
    text: "Как часто ты используешь гаджеты перед сном?",
    options: [
      { text: "Всегда", value: 4 },
      { text: "Часто", value: 3 },
      { text: "Иногда", value: 2 },
      { text: "Редко", value: 1 },
      { text: "Никогда", value: 0 },
    ],
  },
  {
    id: 7,
    text: "Насколько хорошо твоя спальня подходит для сна?",
    options: [
      { text: "Очень плохо", value: 0 },
      { text: "Плохо", value: 1 },
      { text: "Средне", value: 2 },
      { text: "Хорошо", value: 3 },
      { text: "Отлично", value: 4 },
    ],
  },
  {
    id: 8,
    text: "Как часто ты чувствуешь, что сон восстанавливает твои силы?",
    options: [
      { text: "Никогда", value: 0 },
      { text: "Редко", value: 1 },
      { text: "Иногда", value: 2 },
      { text: "Часто", value: 3 },
      { text: "Всегда", value: 4 },
    ],
  },
];

// Function to get questions for a specific test
const getQuestionsForTest = (testId: number): Question[] => {
  switch (testId) {
    case 1: return stressQuestions;
    case 2: return emotionsQuestions;
    case 3: return balanceQuestions;
    case 4: return anxietyQuestions;
    case 5: return selfesteemQuestions;
    case 6: return sleepQuestions;
    default: return stressQuestions;
  }
};

// Test Card Component
const TestCard = ({ test, onClick }: { test: Test; onClick: () => void }) => {
  const IconComponent = TestIcons[test.icon];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
          style={{ background: `radial-gradient(circle, ${test.color}10, transparent)` }}
        />

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-3 h-3">
          <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
            <path d="M0 4 L0 0 L4 0" stroke={`${test.color}40`} strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute top-2 right-2 w-3 h-3">
          <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
            <path d="M8 0 L12 0 L12 4" stroke={`${test.color}40`} strokeWidth="1" />
          </svg>
        </div>

        {/* Completed badge */}
        {test.completed && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#8fb583]/20 border border-[#8fb583]/30">
            <span className="text-[9px] uppercase tracking-wider text-[#8fb583]">Пройден</span>
          </div>
        )}

        <div className="relative z-10">
          {/* Icon and Category */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${test.color}20` }}
            >
              <div className="w-6 h-6" style={{ color: test.color }}>
                {IconComponent(test.color, "w-full h-full")}
              </div>
            </div>
            <div className="min-w-0">
              <span
                className="text-[10px] uppercase tracking-wider block"
                style={{ color: test.color }}
              >
                {test.category}
              </span>
              <div className="flex items-center gap-2 text-white/30 text-[9px] mt-0.5">
                <span>{test.duration}</span>
                <span>•</span>
                <span>{test.questions} вопросов</span>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-base font-heading font-light text-white/90 mb-1.5">
            {test.title}
          </h3>
          <p className="text-xs text-white/40 mb-3 line-clamp-2">
            {test.description}
          </p>

          {/* Result or Start button */}
          {test.completed && test.result ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Результат:</span>
              <span className="text-xs font-medium" style={{ color: test.color }}>
                {test.result}
              </span>
            </div>
          ) : (
            <button
              className="w-full py-2 rounded-xl border border-white/10 text-white/60 hover:bg-white/[0.05] hover:text-white transition-all text-xs"
            >
              Начать тест
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Progress Ring Component
const ProgressRing = ({ progress, color }: { progress: number; color: string }) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="5"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-heading text-white/90">{progress}%</span>
      </div>
    </div>
  );
};

export default function CabinetTests() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"tests" | "history">("tests");
  
  const { addResult, canTakeTest, getResultsByTest, getAllResults } = useTestsStore();
  const { addEvent } = useCalendarStore();

  const completedTests = getAllResults().length;
  const totalTests = tests.length;

  const handleStartTest = (test: Test) => {
    if (canTakeTest(String(test.id))) {
      setSelectedTest(test);
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResult(false);
    }
  };

  const handleAnswer = (value: number) => {
    if (!selectedTest) return;
    
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    const questions = getQuestionsForTest(selectedTest.id);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    if (!selectedTest) return { level: "", text: "", color: "", score: 0, maxScore: 0 };
    
    const questions = getQuestionsForTest(selectedTest.id);
    const total = answers.reduce((sum, a) => sum + a, 0);
    const maxScore = questions.length * 4;
    const percentage = (total / maxScore) * 100;

    // Different result logic for different tests
    switch (selectedTest.id) {
      case 1: // Stress
        if (percentage <= 25) return { level: "Низкий", text: "У тебя низкий уровень стресса. Продолжай заботиться о себе!", color: "#8fb583", score: total, maxScore };
        if (percentage <= 50) return { level: "Умеренный", text: "Уровень стресса умеренный. Обрати внимание на практики релаксации.", color: "#b49b78", score: total, maxScore };
        if (percentage <= 75) return { level: "Повышенный", text: "Стресс повышен. Рекомендуем больше времени уделять отдыху и практикам.", color: "#9a8fb5", score: total, maxScore };
        return { level: "Высокий", text: "Уровень стресса высокий. Важно обратить внимание на своё состояние.", color: "#b58f8f", score: total, maxScore };
      
      case 2: // Emotional Intelligence
        if (percentage >= 75) return { level: "Высокий", text: "У тебя высокий эмоциональный интеллект! Ты хорошо понимаешь и управляешь эмоциями.", color: "#8fb583", score: total, maxScore };
        if (percentage >= 50) return { level: "Средний", text: "Твой эмоциональный интеллект на среднем уровне. Есть куда расти!", color: "#9a8fb5", score: total, maxScore };
        return { level: "Низкий", text: "Эмоциональный интеллект можно развить. Практикуй осознанность и эмпатию.", color: "#b58f8f", score: total, maxScore };
      
      case 3: // Life Balance
        if (percentage >= 75) return { level: "Сбалансированная", text: "У тебя отличный баланс в жизни! Продолжай поддерживать равновесие.", color: "#8fb583", score: total, maxScore };
        if (percentage >= 50) return { level: "Частично сбалансированная", text: "Есть некоторые дисбалансы. Обрати внимание на области, которым нужно больше внимания.", color: "#b49b78", score: total, maxScore };
        return { level: "Дисбаланс", text: "В твоей жизни есть значительные дисбалансы. Важно пересмотреть приоритеты.", color: "#b58f8f", score: total, maxScore };
      
      case 4: // Anxiety (GAD-7)
        if (total <= 4) return { level: "Минимальная", text: "У тебя минимальный уровень тревожности. Продолжай заботиться о себе!", color: "#8fb583", score: total, maxScore };
        if (total <= 9) return { level: "Лёгкая", text: "Лёгкий уровень тревожности. Обрати внимание на практики релаксации.", color: "#b49b78", score: total, maxScore };
        if (total <= 14) return { level: "Умеренная", text: "Умеренная тревожность. Рекомендуем больше времени уделять саморегуляции.", color: "#9a8fb5", score: total, maxScore };
        return { level: "Высокая", text: "Высокий уровень тревожности. Важно обратиться за поддержкой.", color: "#b58f8f", score: total, maxScore };
      
      case 5: // Self-esteem
        if (percentage >= 75) return { level: "Высокая", text: "У тебя здоровая самооценка! Ты ценишь себя и свои качества.", color: "#8fb583", score: total, maxScore };
        if (percentage >= 50) return { level: "Средняя", text: "Твоя самооценка на среднем уровне. Работай над принятием себя.", color: "#b49b78", score: total, maxScore };
        return { level: "Низкая", text: "Самооценка нуждается в поддержке. Практикуй самосострадание и заботу о себе.", color: "#b58f8f", score: total, maxScore };
      
      case 6: // Sleep
        if (percentage <= 25) return { level: "Отличное", text: "У тебя отличное качество сна! Продолжай поддерживать здоровый режим.", color: "#8fb583", score: total, maxScore };
        if (percentage <= 50) return { level: "Хорошее", text: "Качество сна хорошее, но есть что улучшить. Обрати внимание на режим.", color: "#5f7a9e", score: total, maxScore };
        if (percentage <= 75) return { level: "Среднее", text: "Качество сна среднее. Рекомендуем улучшить гигиену сна.", color: "#b49b78", score: total, maxScore };
        return { level: "Плохое", text: "Качество сна нуждается в улучшении. Важно обратиться к специалисту.", color: "#b58f8f", score: total, maxScore };
      
      default:
        return { level: "Неизвестно", text: "", color: "#8fb583", score: total, maxScore };
    }
  };

  const handleCompleteTest = () => {
    if (!selectedTest) return;
    
    const result = getResult();
    
    // Save result to store
    addResult({
      testId: String(selectedTest.id),
      score: result.score,
      maxScore: result.maxScore,
      resultLevel: result.level,
      resultText: result.text,
      completedAt: new Date().toISOString(),
    });
    
    // Add to calendar
    addEvent({
      date: getDateKey(),
      type: 'test',
      eventId: String(selectedTest.id),
      title: selectedTest.title,
    });
  };

  const closeTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-1 rounded-full bg-[#b49b78]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Благополучие</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-light text-white mb-1">
          Психологические тесты
        </h1>
        <p className="text-white/40 text-xs">
          Узнай себя лучше и получи персональные рекомендации
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
            <ProgressRing progress={Math.round((completedTests / totalTests) * 100)} color="#b49b78" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-base font-heading text-white/90 mb-1">Твой прогресс</h3>
              <p className="text-xs text-white/40 mb-3">
                {completedTests} из {totalTests} тестов пройдено
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                {tests.filter(t => t.completed).map((test) => (
                  <div
                    key={test.id}
                    className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider"
                    style={{ backgroundColor: `${test.color}20`, color: test.color }}
                  >
                    {test.category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex gap-2 mb-4 flex-shrink-0"
      >
        <button
          onClick={() => setActiveTab("tests")}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
            activeTab === "tests"
              ? 'bg-[#b49b78]/20 text-[#b49b78] border border-[#b49b78]/30'
              : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70'
          }`}
        >
          Тесты
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
            activeTab === "history"
              ? 'bg-[#b49b78]/20 text-[#b49b78] border border-[#b49b78]/30'
              : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70'
          }`}
        >
          История результатов
        </button>
      </motion.div>

      {/* Content */}
      {activeTab === "tests" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 overflow-y-auto pb-4">
          {tests.map((test, index) => {
            const canTake = canTakeTest(String(test.id));
            const results = getResultsByTest(String(test.id));
            const latestResult = results[0];
            
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TestCard 
                  test={{
                    ...test,
                    completed: latestResult !== undefined,
                    result: latestResult?.resultLevel,
                  }} 
                  onClick={() => handleStartTest(test)} 
                />
                {!canTake && results.length >= 2 && (
                  <div className="mt-2 text-center">
                    <span className="text-xs text-white/30">
                      Лимит попыток на этой неделе исчерпан
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-4">
          {getAllResults().length > 0 ? (
            <div className="space-y-3">
              {getAllResults().map((result) => {
                const test = tests.find(t => String(t.id) === result.testId);
                if (!test) return null;
                
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${test.color}20` }}
                          >
                            <div className="w-6 h-6" style={{ color: test.color }}>
                              {TestIcons[test.icon](test.color, "w-full h-full")}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-base font-heading text-white/90">{test.title}</h3>
                            <p className="text-xs text-white/40">
                              {new Date(result.completedAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="ml-13">
                          <p className="text-sm text-white/60 mb-1">
                            Результат: <span style={{ color: test.color }}>{result.resultLevel}</span>
                          </p>
                          <p className="text-xs text-white/40">
                            Попытка {result.attemptNumber} • Неделя {result.weekNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/40 mb-2">У тебя пока нет результатов тестов</p>
              <button
                onClick={() => setActiveTab("tests")}
                className="text-[#b49b78] hover:underline text-sm"
              >
                Пройти тесты
              </button>
            </div>
          )}
        </div>
      )}

      {/* Test Modal */}
      <AnimatePresence>
        {selectedTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0c0a]/95 backdrop-blur-md"
            onClick={closeTest}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] border border-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M0 5 L0 0 L5 0" stroke={`${selectedTest.color}40`} strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M11 0 L16 0 L16 5" stroke={`${selectedTest.color}40`} strokeWidth="1" />
                </svg>
              </div>

              {/* Close button */}
              <button
                onClick={closeTest}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M4 4 L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {!showResult ? (
                <>
                  {/* Test Header */}
                  {(() => {
                    const questions = getQuestionsForTest(selectedTest.id);
                    return (
                      <>
                        <div className="mb-5">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8" style={{ color: selectedTest.color }}>
                              {TestIcons[selectedTest.icon](selectedTest.color, "w-full h-full")}
                            </div>
                            <span className="text-xs uppercase tracking-wider" style={{ color: selectedTest.color }}>
                              {selectedTest.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: selectedTest.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-white/40">
                              {currentQuestion + 1}/{questions.length}
                            </span>
                          </div>
                          {!canTakeTest(String(selectedTest.id)) && (
                            <div className="mt-2 text-xs text-white/40">
                              Попытка {getResultsByTest(String(selectedTest.id)).length + 1} из 2 на этой неделе
                            </div>
                          )}
                        </div>

                        {/* Question */}
                        <div className="mb-5">
                          <p className="text-base font-heading font-light text-white/90 leading-relaxed">
                            {questions[currentQuestion].text}
                          </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                          {questions[currentQuestion].options.map((option, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleAnswer(option.value)}
                              className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-left text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all text-sm"
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option.text}
                            </motion.button>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </>
              ) : (
                <>
                  {/* Result */}
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getResult().color}20` }}
                    >
                      <div className="w-10 h-10" style={{ color: getResult().color }}>
                        {TestIcons[selectedTest.icon](getResult().color, "w-full h-full")}
                      </div>
                    </div>
                    <h3 className="text-lg font-heading text-white/90 mb-2">
                      {selectedTest.title}: <span style={{ color: getResult().color }}>{getResult().level}</span>
                    </h3>
                    <p className="text-sm text-white/50 mb-5">
                      {getResult().text}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          handleCompleteTest();
                          closeTest();
                        }}
                        className="px-8 py-2.5 rounded-xl text-white transition-colors text-sm"
                        style={{ backgroundColor: selectedTest.color }}
                      >
                        Сохранить результат
                      </button>
                      <button
                        onClick={closeTest}
                        className="px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/70 hover:bg-white/[0.08] transition-colors text-sm"
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

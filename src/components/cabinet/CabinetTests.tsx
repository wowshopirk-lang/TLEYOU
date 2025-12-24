"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Test {
  id: number;
  title: string;
  description: string;
  duration: string;
  questions: number;
  category: string;
  color: string;
  icon: string;
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
    icon: "⚡",
  },
  {
    id: 2,
    title: "Эмоциональный интеллект",
    description: "Узнай, насколько хорошо ты понимаешь свои и чужие эмоции",
    duration: "10 мин",
    questions: 20,
    category: "Эмоции",
    color: "#9a8fb5",
    icon: "💜",
  },
  {
    id: 3,
    title: "Баланс жизни",
    description: "Проверь, насколько сбалансированы разные сферы твоей жизни",
    duration: "7 мин",
    questions: 15,
    category: "Баланс",
    color: "#8fb583",
    icon: "⚖️",
  },
  {
    id: 4,
    title: "Уровень тревожности",
    description: "Тест на определение уровня тревожности (GAD-7)",
    duration: "3 мин",
    questions: 7,
    category: "Тревога",
    color: "#7a9ebb",
    icon: "🌊",
  },
  {
    id: 5,
    title: "Самооценка",
    description: "Оцени своё отношение к себе и уверенность",
    duration: "5 мин",
    questions: 10,
    category: "Самооценка",
    color: "#b49b78",
    icon: "✨",
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
    icon: "🌙",
  },
];

// Sample questions for stress test
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
];

// Test Card Component
const TestCard = ({ test, onClick }: { test: Test; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="relative group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
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
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#8fb583]/20 border border-[#8fb583]/30">
          <span className="text-[9px] uppercase tracking-wider text-[#8fb583]">Пройден</span>
        </div>
      )}

      <div className="relative z-10">
        {/* Icon and Category */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: `${test.color}20` }}
          >
            {test.icon}
          </div>
          <div>
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ color: test.color }}
            >
              {test.category}
            </span>
            <div className="flex items-center gap-2 text-white/30 text-[10px] mt-0.5">
              <span>{test.duration}</span>
              <span>•</span>
              <span>{test.questions} вопросов</span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-heading font-light text-white/90 mb-2">
          {test.title}
        </h3>
        <p className="text-sm text-white/40 mb-4 line-clamp-2">
          {test.description}
        </p>

        {/* Result or Start button */}
        {test.completed && test.result ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Результат:</span>
            <span className="text-sm font-medium" style={{ color: test.color }}>
              {test.result}
            </span>
          </div>
        ) : (
          <button
            className="w-full py-2.5 rounded-xl border border-white/10 text-white/60 hover:bg-white/[0.05] hover:text-white transition-all text-sm"
          >
            Начать тест
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

// Progress Ring Component
const ProgressRing = ({ progress, color }: { progress: number; color: string }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-heading text-white/90">{progress}%</span>
      </div>
    </div>
  );
};

export default function CabinetTests() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const completedTests = tests.filter(t => t.completed).length;
  const totalTests = tests.length;

  const handleStartTest = (test: Test) => {
    if (!test.completed) {
      setSelectedTest(test);
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResult(false);
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < stressQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const total = answers.reduce((sum, a) => sum + a, 0);
    const maxScore = stressQuestions.length * 4;
    const percentage = (total / maxScore) * 100;

    if (percentage <= 25) return { level: "Низкий", text: "У тебя низкий уровень стресса. Продолжай заботиться о себе!", color: "#8fb583" };
    if (percentage <= 50) return { level: "Умеренный", text: "Уровень стресса умеренный. Обрати внимание на практики релаксации.", color: "#b49b78" };
    if (percentage <= 75) return { level: "Повышенный", text: "Стресс повышен. Рекомендуем больше времени уделять отдыху и практикам.", color: "#9a8fb5" };
    return { level: "Высокий", text: "Уровень стресса высокий. Важно обратить внимание на своё состояние.", color: "#b58f8f" };
  };

  const closeTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#b49b78]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Благополучие</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Психологические тесты
        </h1>
        <p className="text-white/40 text-sm">
          Узнай себя лучше и получи персональные рекомендации
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 opacity-20">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <circle cx="100" cy="100" r="80" stroke="rgba(180,155,120,0.2)" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <ProgressRing progress={Math.round((completedTests / totalTests) * 100)} color="#b49b78" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-heading text-white/90 mb-1">Твой прогресс</h3>
              <p className="text-sm text-white/40 mb-4">
                {completedTests} из {totalTests} тестов пройдено
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {tests.filter(t => t.completed).map((test) => (
                  <div
                    key={test.id}
                    className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider"
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

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TestCard test={test} onClick={() => handleStartTest(test)} />
          </motion.div>
        ))}
      </div>

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
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{selectedTest.icon}</span>
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
                          animate={{ width: `${((currentQuestion + 1) / stressQuestions.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40">
                        {currentQuestion + 1}/{stressQuestions.length}
                      </span>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <p className="text-lg font-heading font-light text-white/90 leading-relaxed">
                      {stressQuestions[currentQuestion].text}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {stressQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-left text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option.text}
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Result */}
                  <div className="text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getResult().color}20` }}
                    >
                      <span className="text-3xl">{selectedTest.icon}</span>
                    </div>
                    <h3 className="text-xl font-heading text-white/90 mb-2">
                      Уровень стресса: <span style={{ color: getResult().color }}>{getResult().level}</span>
                    </h3>
                    <p className="text-sm text-white/50 mb-6">
                      {getResult().text}
                    </p>
                    <button
                      onClick={closeTest}
                      className="px-8 py-3 rounded-xl text-white transition-colors"
                      style={{ backgroundColor: selectedTest.color }}
                    >
                      Понятно
                    </button>
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


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Wind, Heart, BookOpen, Clock, Filter } from "lucide-react";
import Button from "@/components/ui/Button";

const categories = [
  { id: "all", label: "Все", icon: null },
  { id: "meditation", label: "Медитации", icon: Heart },
  { id: "breathing", label: "Дыхание", icon: Wind },
  { id: "journal", label: "Дневник", icon: BookOpen },
];

const practices = [
  {
    id: 1,
    title: "Утренняя медитация благодарности",
    category: "meditation",
    duration: "10 мин",
    description: "Начни день с чувства благодарности за то, что имеешь",
  },
  {
    id: 2,
    title: "Дыхание 4-7-8 для спокойствия",
    category: "breathing",
    duration: "5 мин",
    description: "Техника для быстрого снятия стресса и тревоги",
  },
  {
    id: 3,
    title: "Дневник благодарности",
    category: "journal",
    duration: "5 мин",
    description: "Запиши 3 вещи, за которые ты благодарна сегодня",
  },
  {
    id: 4,
    title: "Медитация на отпускание",
    category: "meditation",
    duration: "15 мин",
    description: "Отпусти напряжение и негативные мысли",
  },
  {
    id: 5,
    title: "Квадратное дыхание",
    category: "breathing",
    duration: "4 мин",
    description: "Техника для концентрации и ясности ума",
  },
  {
    id: 6,
    title: "Вечерняя медитация для сна",
    category: "meditation",
    duration: "12 мин",
    description: "Подготовь тело и разум к глубокому сну",
  },
  {
    id: 7,
    title: "Дыхание огня",
    category: "breathing",
    duration: "3 мин",
    description: "Энергизирующая техника для бодрости",
  },
  {
    id: 8,
    title: "Письмо себе",
    category: "journal",
    duration: "10 мин",
    description: "Напиши письмо себе будущей",
  },
];

const categoryIcons: Record<string, typeof Heart> = {
  meditation: Heart,
  breathing: Wind,
  journal: BookOpen,
};

const categoryColors: Record<string, string> = {
  meditation: "bg-pink-500",
  breathing: "bg-blue-500",
  journal: "bg-purple-500",
};

export default function CabinetPractices() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPractices =
    activeCategory === "all"
      ? practices
      : practices.filter((p) => p.category === activeCategory);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-light mb-2">
          Практики
        </h1>
        <p className="text-[var(--color-stone)]">
          Выбери практику для сегодняшнего дня
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-muted)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Practices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPractices.map((practice, index) => {
          const Icon = categoryIcons[practice.category];
          const bgColor = categoryColors[practice.category];

          return (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-medium text-lg mb-1">
                    {practice.title}
                  </h3>
                  <p className="text-sm text-[var(--color-stone)] mb-3">
                    {practice.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-stone)]">
                      <Clock className="w-3 h-3" />
                      {practice.duration}
                    </span>
                    <Button variant="primary" size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Начать
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredPractices.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-[var(--color-stone)]/30 mx-auto mb-4" />
          <p className="text-[var(--color-stone)]">
            В этой категории пока нет практик
          </p>
        </div>
      )}
    </div>
  );
}





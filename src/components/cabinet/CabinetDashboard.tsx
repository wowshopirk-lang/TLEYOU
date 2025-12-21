"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Layers, Calendar, Heart, Wind, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { cards } from "@/data/cards";

const quickActions = [
  { href: "/cabinet/practices", icon: Play, label: "Практики", color: "bg-blue-500" },
  { href: "/cabinet/cards", icon: Layers, label: "Карточки", color: "bg-purple-500" },
];

const todayPractice = {
  title: "Дыхание 4-7-8 для спокойствия",
  duration: "5 минут",
  category: "Дыхание",
  icon: Wind,
};

export default function CabinetDashboard() {
  const todayCard = cards[new Date().getDate() % 30];
  const progress = 12; // TODO: Get from user data

  return (
    <div className="p-6 lg:p-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-light mb-2">
          Добро пожаловать домой
        </h1>
        <p className="text-[var(--color-stone)]">
          {new Date().toLocaleDateString("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-10"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <div className={`${action.color} p-6 rounded-2xl text-white hover:opacity-90 transition-opacity`}>
                <Icon className="w-8 h-8 mb-4" />
                <p className="text-lg font-medium">{action.label}</p>
              </div>
            </Link>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Practice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-2 text-[var(--color-primary)] mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Практика дня
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
              <todayPractice.icon className="w-7 h-7 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-medium mb-1">
                {todayPractice.title}
              </h3>
              <p className="text-sm text-[var(--color-stone)]">
                {todayPractice.category} · {todayPractice.duration}
              </p>
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Начать практику
          </Button>
        </motion.div>

        {/* Today's Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-[var(--color-moss)] to-[var(--color-moss-light)] p-6 rounded-2xl text-white"
        >
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Карточка дня
            </span>
          </div>

          <p className="text-2xl font-heading font-light mb-6 leading-relaxed">
            {todayCard.question}
          </p>

          <Link href="/cabinet/cards">
            <Button
              variant="secondary"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Все карточки
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 bg-white p-6 rounded-2xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-medium">Твой прогресс</span>
          </div>
          <span className="text-[var(--color-primary)] font-medium">
            {progress} из 30 дней
          </span>
        </div>

        <div className="h-3 bg-[var(--color-cream)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all"
            style={{ width: `${(progress / 30) * 100}%` }}
          />
        </div>

        <p className="mt-4 text-sm text-[var(--color-stone)]">
          Отличная работа! Продолжай в том же духе.
        </p>
      </motion.div>
    </div>
  );
}





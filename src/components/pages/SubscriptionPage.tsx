"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Play,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  Calendar,
  Check,
  X,
  Crown,
} from "lucide-react";

const features = [
  {
    icon: Play,
    title: "Ежедневные практики",
    description: "Короткие аудио и видео практики для расслабления каждый день",
  },
  {
    icon: BookOpen,
    title: "Медитации",
    description: "Библиотека медитаций для разных состояний и целей",
  },
  {
    icon: Heart,
    title: "Дыхательные техники",
    description: "Техники для снятия стресса, улучшения сна и энергии",
  },
  {
    icon: Calendar,
    title: "Все 30 карточек",
    description: "Полный доступ ко всем карточкам без ограничений",
  },
  {
    icon: Sparkles,
    title: "Новый контент",
    description: "Свежие практики и материалы каждую неделю",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Доступ в закрытый чат единомышленниц",
  },
];

const comparisonItems = [
  { feature: "Карточка с вопросом", free: "1 в день", premium: "Все 30" },
  { feature: "Медитации", free: false, premium: true },
  { feature: "Дыхательные техники", free: false, premium: true },
  { feature: "Ежедневные практики", free: false, premium: true },
  { feature: "Дневник благодарности", free: false, premium: true },
  { feature: "Закрытое сообщество", free: false, premium: true },
  { feature: "Новый контент еженедельно", free: false, premium: true },
];

export default function SubscriptionPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-b from-[var(--color-moss)] to-[var(--color-moss-light)] text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Подписка TLEYOU</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
              Продолжай путь к себе
            </h1>
            <p className="text-xl text-white/80 mb-10">
              Набор — это начало. Подписка — это практика. Получи доступ к
              медитациям, дыхательным техникам и сообществу женщин, которые
              выбрали себя.
            </p>

            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-5xl font-heading font-medium mb-2">500 ₽</div>
              <div className="text-white/70">в месяц</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-[var(--color-moss)] hover:bg-white/90"
                >
                  Начать бесплатный период
                </Button>
              </Link>
              <Link href="/card-of-day">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Попробовать бесплатно
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="section bg-[var(--color-background)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6">
              Что входит в подписку
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-[var(--color-cream)] p-8 rounded-2xl"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--color-stone)]">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="section bg-[var(--color-cream)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6">
              Сравнение
            </h2>
            <p className="text-xl text-[var(--color-stone)]">
              Бесплатный доступ vs Подписка
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-3 bg-[var(--color-charcoal)] text-white p-4">
              <div className="font-medium">Возможность</div>
              <div className="text-center font-medium">Бесплатно</div>
              <div className="text-center font-medium">Подписка</div>
            </div>
            {comparisonItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 p-4 border-b border-[var(--color-muted)] last:border-0"
              >
                <div className="text-[var(--color-charcoal)]">{item.feature}</div>
                <div className="text-center">
                  {typeof item.free === "string" ? (
                    <span className="text-[var(--color-stone)]">{item.free}</span>
                  ) : item.free ? (
                    <Check className="w-5 h-5 text-[var(--color-primary)] mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-[var(--color-stone)]/30 mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {typeof item.premium === "string" ? (
                    <span className="text-[var(--color-primary)] font-medium">
                      {item.premium}
                    </span>
                  ) : item.premium ? (
                    <Check className="w-5 h-5 text-[var(--color-primary)] mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-[var(--color-stone)]/30 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--color-charcoal)] text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6 text-white">
              Начни прямо сейчас
            </h2>
            <p className="text-xl text-white/70 mb-10">
              7 дней бесплатного доступа. Отмена в любой момент.
            </p>

            <Link href="/auth/register">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-[var(--color-charcoal)] hover:bg-white/90"
              >
                Попробовать 7 дней бесплатно
              </Button>
            </Link>

            <p className="mt-6 text-sm text-white/50">
              После пробного периода — 500 ₽/месяц
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}





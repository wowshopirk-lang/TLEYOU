"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, BookOpen, Heart, Users, Sparkles, Calendar } from "lucide-react";

const subscriptionFeatures = [
  { icon: Play, label: "Ежедневные практики расслабления" },
  { icon: BookOpen, label: "Медитации и дыхательные техники" },
  { icon: Heart, label: "Дневник благодарности" },
  { icon: Calendar, label: "Все 30 карточек без ограничений" },
  { icon: Sparkles, label: "Новый контент каждую неделю" },
  { icon: Users, label: "Закрытое сообщество" },
];

export default function SubscriptionPreview() {
  return (
    <section className="section bg-[var(--color-background)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Подписка TLEYOU
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6">
              Продолжай практику
            </h2>
            <p className="text-lg text-[var(--color-stone)] mb-8">
              Набор — это начало. Подписка — это путь. Получи доступ к практикам,
              медитациям и сообществу женщин, которые выбрали себя.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {subscriptionFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                    <span className="text-sm">{feature.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/subscription">
                <Button variant="primary" size="lg">
                  Подробнее о подписке
                </Button>
              </Link>
              <div className="text-left">
                <p className="text-2xl font-heading font-medium text-[var(--color-primary)]">
                  500 ₽/мес
                </p>
                <p className="text-sm text-[var(--color-stone)]">
                  Отмена в любой момент
                </p>
              </div>
            </div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[var(--color-moss)] to-[var(--color-moss-light)] rounded-2xl p-8 md:p-12 text-white">
              <div className="text-sm uppercase tracking-wider mb-4 opacity-80">
                Личный кабинет
              </div>
              <h3 className="text-3xl font-heading font-light mb-6">
                Добро пожаловать<br />домой
              </h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-sm uppercase tracking-wider mb-2 opacity-70">
                  Практика дня
                </p>
                <p className="text-xl font-heading">
                  Дыхание 4-7-8 для глубокого сна
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-5 h-5" />
                  </div>
                  <span className="text-sm">5 минут</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="opacity-70">Твой прогресс</span>
                <span>12 из 30 дней</span>
              </div>
              <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[40%] bg-white rounded-full" />
              </div>
            </div>

            {/* Free card hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-center"
            >
              <Link
                href="/card-of-day"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
              >
                <Sparkles className="w-4 h-4" />
                <span>Попробуй бесплатную карточку дня</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}













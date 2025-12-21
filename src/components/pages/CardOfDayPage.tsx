"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cards, categoryNames } from "@/data/cards";
import { Sparkles, RotateCcw, Lock, Crown } from "lucide-react";

function getStoredCardData(): { date: string; cardId: number } | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("tleyou_card_of_day");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function getCardForToday(): number {
  const today = getTodayDateString();
  const stored = getStoredCardData();

  if (stored && stored.date === today) {
    return stored.cardId;
  }

  // Generate a "random" card based on date
  const dateNum = parseInt(today.replace(/-/g, ""), 10);
  const cardId = (dateNum % 30) + 1;

  if (typeof window !== "undefined") {
    localStorage.setItem(
      "tleyou_card_of_day",
      JSON.stringify({ date: today, cardId })
    );
  }

  return cardId;
}

export default function CardOfDayPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardId, setCardId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = getCardForToday();
    setCardId(id);
    setIsLoading(false);
  }, []);

  const card = cardId ? cards.find((c) => c.id === cardId) : null;

  if (isLoading) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-[var(--color-cream)]">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">🌿</div>
          <p className="text-[var(--color-stone)]">Загрузка...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-background)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" />
                Карточка дня
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
                Твой вопрос на сегодня
              </h1>
              <p className="text-lg text-[var(--color-stone)] mb-12">
                Одна карточка в день. Один честный ответ. Один шаг к себе.
              </p>
            </motion.div>

            {/* Card */}
            <div className="relative perspective-1000">
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <div
                      className="aspect-[3/4] max-w-sm mx-auto bg-[var(--color-primary)] rounded-2xl shadow-2xl cursor-pointer overflow-hidden group"
                      onClick={() => setIsRevealed(true)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                          🌿
                        </div>
                        <p className="text-xl font-heading mb-2">TLEYOU</p>
                        <p className="text-sm opacity-70">Нажми, чтобы открыть</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <div className="aspect-[3/4] max-w-sm mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1 flex items-center justify-center p-8">
                          <p className="text-2xl md:text-3xl font-heading font-light text-center text-[var(--color-charcoal)] leading-relaxed">
                            {card?.question}
                          </p>
                        </div>
                        <div className="p-6 bg-[var(--color-cream)] border-t border-[var(--color-muted)]">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--color-stone)]">
                              {card && categoryNames[card.category]}
                            </span>
                            <span className="text-sm text-[var(--color-primary)]">
                              День {card?.id}/30
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setIsRevealed(false)}
                        className="inline-flex items-center gap-2 text-[var(--color-stone)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Перевернуть
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Timer / Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-[var(--color-stone)] mb-2">
                Следующая карточка будет доступна завтра
              </p>
              <div className="inline-flex items-center gap-2 text-[var(--color-stone)]/50">
                <Lock className="w-4 h-4" />
                <span className="text-xs">29 карточек заблокировано</span>
              </div>
            </motion.div>
          </div>
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
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Хочешь больше?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-light mb-6 text-white">
              Получи доступ ко всем 30 карточкам
            </h2>
            <p className="text-lg text-white/70 mb-10">
              Оформи подписку и открой все карточки, медитации, дыхательные
              техники и ежедневные практики.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/subscription">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-[var(--color-charcoal)] hover:bg-white/90"
                >
                  Оформить подписку — 500 ₽/мес
                </Button>
              </Link>
              <Link href="/product">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Или купить набор
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}





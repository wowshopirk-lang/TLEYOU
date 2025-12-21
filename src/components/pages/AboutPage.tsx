"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Heart, Leaf, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Забота",
    description:
      "Мы верим, что забота о себе — это не эгоизм, а необходимость. Только наполнив себя, ты сможешь дарить другим.",
  },
  {
    icon: Leaf,
    title: "Естественность",
    description:
      "Натуральные материалы, простые ритуалы, честные вопросы. Ничего искусственного — только то, что работает.",
  },
  {
    icon: Sparkles,
    title: "Осознанность",
    description:
      "Каждый момент с собой — это инвестиция. Мы создаём пространство для этих моментов.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-cream)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              О бренде
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-8">
              TLEYOU — пауза для тех, кто забыл себя
            </h1>
            <p className="text-xl text-[var(--color-stone)] leading-relaxed">
              Мы создаём пространство для возвращения к себе. Не терапию, не
              медитации, не курсы. Просто 10 минут тишины каждый день.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Story */}
      <section className="section bg-[var(--color-background)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-light mb-8">
                Как всё началось
              </h2>
              <div className="space-y-6 text-[var(--color-stone)] text-lg leading-relaxed">
                <p>
                  TLEYOU родился из личного опыта выгорания. Бесконечная гонка,
                  попытки успеть всё, потеря связи с собой — всё это привело к
                  точке, когда единственным выходом стала пауза.
                </p>
                <p>
                  Но как остановиться, если ты разучилась это делать? Как услышать
                  себя, если внутри — только тишина усталости?
                </p>
                <p>
                  Так появился ритуал: зажечь скрутку, достать карточку, задать себе
                  один честный вопрос. 10 минут, которые изменили всё.
                </p>
                <p className="font-medium text-[var(--color-charcoal)]">
                  Теперь мы хотим подарить эту практику тебе.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-[var(--color-cream)] rounded-2xl flex items-center justify-center"
            >
              <div className="text-center p-8">
                <div className="text-8xl mb-4 opacity-30">🌿</div>
                <p className="text-[var(--color-stone)]">Фото создателя бренда</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section bg-[var(--color-charcoal)] text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6 text-white">
              Наши ценности
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center p-8"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-moss)] flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-medium mb-4 text-white">
                    {value.title}
                  </h3>
                  <p className="text-white/70">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="section bg-[var(--color-cream)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-8">
              Наша миссия
            </h2>
            <p className="text-2xl font-heading font-light text-[var(--color-charcoal)] italic leading-relaxed">
              "Помочь каждой женщине найти 10 минут для себя. Не для работы, не
              для семьи, не для достижений — просто для себя. Потому что ты
              заслуживаешь эту паузу."
            </p>
            <div className="divider" />
            <p className="text-[var(--color-primary)] font-medium">
              Команда TLEYOU
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}





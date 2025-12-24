"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Flame, Wind, Sparkles } from "lucide-react";

const ritualSteps = [
  {
    icon: Flame,
    step: "01",
    title: "Зажги",
    description: "Подожги травяную скрутку и позволь аромату наполнить пространство",
  },
  {
    icon: Wind,
    step: "02",
    title: "Вдохни",
    description: "Сделай глубокий вдох и почувствуй, как напряжение покидает тело",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Спроси себя",
    description: "Вытяни карточку с вопросом и позволь себе честный ответ",
  },
];

export default function Solution() {
  return (
    <section className="section bg-[var(--color-cream)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Ритуал возвращения
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
            TLEYOU — твоя пауза
          </h2>
          <p className="text-xl text-[var(--color-stone)] max-w-2xl mx-auto">
            Не медитация. Не терапия. Просто 10 минут честности с собой каждый день.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {ritualSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-heading text-[var(--color-primary)]/10 font-light">
                  {step.step}
                </div>
                <div className="relative pt-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-primary)] mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-medium mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-stone)]">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-8 md:p-12 bg-white rounded-2xl shadow-lg max-w-2xl">
            <p className="text-2xl md:text-3xl font-heading font-light text-[var(--color-charcoal)] italic">
              "Тишина — это не отсутствие звука.<br />
              Это присутствие себя."
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}













"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Heart, User, Zap } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Бежать некуда",
    description: "Бесконечная гонка, из которой нет выхода",
  },
  {
    icon: User,
    title: "Терять себя",
    description: "Забываешь, кто ты на самом деле",
  },
  {
    icon: Heart,
    title: "Забыть кто ты",
    description: "Теряешь связь с собой и своими потребностями",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section bg-[var(--color-background)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
            Ты устала...
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-stone)] max-w-2xl mx-auto">
            Когда последний раз ты была наедине с собой?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-8 rounded-lg bg-[var(--color-cream)]/50 hover:bg-[var(--color-cream)] transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-6">
                  <Icon className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-2xl font-heading font-medium mb-4">
                  {problem.title}
                </h3>
                <p className="text-[var(--color-stone)]">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


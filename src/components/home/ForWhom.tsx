"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const checklistItems = [
  "Ты просыпаешься уже уставшей",
  "Ты не помнишь, когда последний раз была наедине с собой",
  "Ты всё делаешь для других, но забываешь о себе",
  "Ты чувствуешь, что потеряла связь с собой",
  "Ты хочешь замедлиться, но не знаешь как",
  "Ты ищешь не решение, а паузу",
];

export default function ForWhom() {
  return (
    <section className="section bg-[var(--color-charcoal)] text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-moss-light)] mb-4">
              Для кого это
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6 text-white">
              Это для тебя, если...
            </h2>
            <p className="text-lg text-white/70 mb-8">
              TLEYOU создан для женщин, которые устали быть сильными.
              Для тех, кто готов позволить себе паузу.
            </p>

            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-moss)] flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg text-white/90">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[var(--color-moss)]/30 to-[var(--color-coal)] overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6 opacity-20">🌿</div>
                  <p className="text-xl font-heading italic text-white/60">
                    "Ты заслуживаешь<br />эти 10 минут"
                  </p>
                </div>
              </div>
              {/* Decorative fog effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--color-charcoal)] to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}













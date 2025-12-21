"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Анна",
    role: "Предприниматель, 34 года",
    text: "Я думала, что мне нужен отпуск. Оказалось, мне нужны были эти 10 минут каждый вечер. TLEYOU стал моим ритуалом возвращения домой — к себе.",
    avatar: "А",
  },
  {
    name: "Мария",
    role: "Мама двоих детей, 29 лет",
    text: "Когда дети засыпают, у меня есть 10 минут только для себя. Карточки с вопросами помогли мне вспомнить, кто я есть помимо роли мамы.",
    avatar: "М",
  },
  {
    name: "Екатерина",
    role: "Дизайнер, 31 год",
    text: "Аромат скрутки стал для меня сигналом — пора остановиться. Теперь мой мозг автоматически замедляется, когда я зажигаю её.",
    avatar: "Е",
  },
];

export default function Testimonials() {
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
            Истории
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
            Они уже вернулись к себе
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <Quote className="w-10 h-10 text-[var(--color-primary)]/20 mb-6" />
              <p className="text-[var(--color-charcoal)] mb-6 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[var(--color-stone)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}





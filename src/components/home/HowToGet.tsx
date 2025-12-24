"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ExternalLink, MessageCircle, Percent } from "lucide-react";

export default function HowToGet() {
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
            Как получить
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
            Два способа заказа
          </h2>
          <p className="text-xl text-[var(--color-stone)] max-w-2xl mx-auto">
            Выбери удобный для тебя вариант
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ozon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-heading font-medium mb-4">
              Купить на Ozon
            </h3>
            <p className="text-[var(--color-stone)] mb-6">
              Быстрая доставка по всей России.<br />
              Полная цена набора.
            </p>
            <div className="text-3xl font-heading font-medium text-[var(--color-charcoal)] mb-6">
              3 990 ₽
            </div>
            <a
              href="https://ozon.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="secondary" size="lg" className="w-full">
                Перейти на Ozon
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>

          {/* Discount */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[var(--color-primary)] p-8 md:p-10 rounded-2xl text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-sm">
              -15%
            </div>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-medium mb-4">
              Заказать со скидкой
            </h3>
            <p className="text-white/80 mb-6">
              Напиши нам в Telegram или оставь заявку.<br />
              Получи скидку 10-15% на набор.
            </p>
            <div className="mb-6">
              <span className="text-lg line-through opacity-60">3 990 ₽</span>
              <span className="text-3xl font-heading font-medium ml-3">3 390 ₽</span>
            </div>
            <a
              href="https://t.me/tleyouself"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-white text-[var(--color-primary)] hover:bg-white/90"
              >
                Написать в Telegram
                <MessageCircle className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}













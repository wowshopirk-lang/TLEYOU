"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  Leaf,
  Flame,
  MessageCircleQuestion,
  Package,
  ExternalLink,
  MessageCircle,
  Check,
} from "lucide-react";

const productDetails = [
  {
    icon: Flame,
    title: "Керамическая подставка",
    description:
      "Ручная работа из глины. Безопасно удерживает тлеющую скрутку. Каждая подставка уникальна.",
    features: ["Ручная работа", "Термостойкая глина", "Уникальный дизайн"],
  },
  {
    icon: Leaf,
    title: "Травяная скрутка",
    description:
      "Натуральная смесь лаванды, шалфея и полыни. Мягкий аромат, который помогает замедлиться.",
    features: ["Натуральные травы", "10-15 сеансов", "Безопасное тление"],
  },
  {
    icon: MessageCircleQuestion,
    title: "30 карточек с вопросами",
    description:
      "Вопросы для ежедневной практики самопознания. Один вопрос — один день — одна честность.",
    features: ["30 уникальных вопросов", "Плотная бумага", "Минималистичный дизайн"],
  },
];

const atmosphereItems = [
  "Декоративный мох — создаёт атмосферу леса",
  "Льняные мешочки — для хранения карточек и скрутки",
  "Письмо к покупателю — личное послание от создателя",
  "Карта разрешения — напоминание о праве на паузу",
  "Инструкция — как провести свой первый ритуал",
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-[var(--color-cream)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Package className="w-20 h-20 text-[var(--color-primary)]" />
                  </div>
                  <p className="text-[var(--color-stone)]">
                    Фото набора TLEYOU
                    <br />
                    <span className="text-sm">(добавьте в /public/images/products/)</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
                Набор TLEYOU
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
                Ритуал возвращения к себе
              </h1>
              <p className="text-xl text-[var(--color-stone)] mb-8">
                Всё необходимое для 30 дней практики самопознания. Минималистичный
                набор без лишнего — только то, что работает.
              </p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-heading font-medium">3 990 ₽</span>
                <span className="text-[var(--color-stone)]">
                  или 3 390 ₽ со скидкой
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://ozon.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    Купить на Ozon
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a
                  href="https://t.me/tleyou"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    Заказать со скидкой 15%
                    <MessageCircle className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>

              <p className="text-sm text-[var(--color-stone)]">
                ✓ Бесплатная доставка от 5 000 ₽ · ✓ Возврат 14 дней
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Product Details */}
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
              Что внутри
            </h2>
            <p className="text-xl text-[var(--color-stone)] max-w-2xl mx-auto">
              Три элемента для ежедневного ритуала
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-[var(--color-cream)] p-8 rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-medium mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-stone)] mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-[var(--color-primary)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Atmosphere */}
      <section className="section bg-[var(--color-charcoal)] text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-moss-light)] mb-4">
                Атмосфера
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-light mb-6 text-white">
                Детали, которые создают настроение
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Помимо основных элементов, в набор входят детали, которые делают
                распаковку особенным моментом.
              </p>

              <ul className="space-y-4">
                {atmosphereItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Leaf className="w-5 h-5 text-[var(--color-moss-light)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square bg-gradient-to-br from-[var(--color-moss)]/30 to-transparent rounded-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-8xl mb-4 opacity-30">🌿</div>
                <p className="text-white/50 text-sm">Фото атмосферы набора</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--color-cream)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6">
              Готова начать?
            </h2>
            <p className="text-xl text-[var(--color-stone)] mb-10">
              Выбери удобный способ заказа
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://ozon.ru"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg">
                  Купить на Ozon — 3 990 ₽
                </Button>
              </a>
              <a
                href="https://t.me/tleyou"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Telegram со скидкой — 3 390 ₽
                </Button>
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}





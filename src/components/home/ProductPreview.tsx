"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, Flame, MessageCircleQuestion } from "lucide-react";

const productItems = [
  {
    icon: Flame,
    title: "Керамическая подставка",
    description: "Для безопасного тления скрутки. Ручная работа из глины.",
  },
  {
    icon: Leaf,
    title: "Травяная скрутка",
    description: "Смесь лаванды, шалфея и полыни. Аромат покоя и ясности.",
  },
  {
    icon: MessageCircleQuestion,
    title: "30 карточек с вопросами",
    description: "Вопросы, которые помогут вернуться к себе за 30 дней.",
  },
];

export default function ProductPreview() {
  return (
    <section id="product" className="section bg-[var(--color-background)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-[var(--color-cream)] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-[var(--color-primary)]" />
                </div>
                <p className="text-[var(--color-stone)] text-sm">
                  Фото набора TLEYOU<br />
                  <span className="text-xs">(добавьте в /public/images/products/)</span>
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[var(--color-primary)]/5" />
            <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full bg-[var(--color-moss-light)]/10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              Набор TLEYOU
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6">
              Всё для ритуала в одной коробке
            </h2>
            <p className="text-lg text-[var(--color-stone)] mb-8">
              Минималистичный набор, созданный для тех, кто хочет вернуться к себе.
              Никаких лишних деталей — только то, что работает.
            </p>

            <div className="space-y-6 mb-10">
              {productItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                      <p className="text-[var(--color-stone)] text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/product">
                <Button variant="primary" size="lg">
                  Подробнее о наборе
                </Button>
              </Link>
              <Button variant="secondary" size="lg">
                3 990 ₽
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}





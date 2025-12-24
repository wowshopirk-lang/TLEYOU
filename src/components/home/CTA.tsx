"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="section bg-[var(--color-charcoal)] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--color-moss)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--color-moss-light)] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6 text-white">
            Готова вернуться к себе?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Начни с малого. Всего 10 минут в день могут изменить всё.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/product">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-[var(--color-charcoal)] hover:bg-white/90"
              >
                Заказать набор
              </Button>
            </Link>
            <Link href="/card-of-day">
              <Button
                variant="secondary"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Попробовать бесплатно
              </Button>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-sm text-white/50"
          >
            Бесплатная доставка при заказе от 5 000 ₽
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}













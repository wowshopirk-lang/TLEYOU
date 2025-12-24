"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Что входит в набор TLEYOU?",
    answer:
      "В набор входит: керамическая подставка для скруток (ручная работа), травяная скрутка (смесь лаванды, шалфея и полыни), 30 карточек с вопросами для самопознания, декоративный мох, льняные мешочки, письмо к покупателю и карта разрешения.",
  },
  {
    question: "Безопасно ли использовать травяную скрутку?",
    answer:
      "Да, скрутка безопасна при соблюдении инструкции. Она тлеет, а не горит открытым пламенем. Всегда используйте керамическую подставку из набора и не оставляйте тлеющую скрутку без присмотра.",
  },
  {
    question: "Сколько хватает одной скрутки?",
    answer:
      "Одна скрутка рассчитана на 10-15 сеансов по 10 минут. Вы можете затушить её в любой момент и продолжить в следующий раз.",
  },
  {
    question: "Что такое подписка и зачем она нужна?",
    answer:
      "Подписка — это доступ к личному кабинету с ежедневными практиками, медитациями, дыхательными техниками и всеми 30 карточками без ограничений. Это продолжение вашего ритуала возвращения к себе.",
  },
  {
    question: "Могу ли я отменить подписку?",
    answer:
      "Да, вы можете отменить подписку в любой момент. Доступ сохранится до конца оплаченного периода.",
  },
  {
    question: "Как работает бесплатная карточка дня?",
    answer:
      "Каждый день вы можете получить одну карточку с вопросом бесплатно, без регистрации. Это позволяет попробовать практику перед покупкой набора или оформлением подписки.",
  },
  {
    question: "Доставляете ли вы по всей России?",
    answer:
      "Да! При заказе через Ozon доступна доставка по всей России. При заказе через Telegram/заявку мы обсудим удобный способ доставки.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-muted)] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left gap-4"
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-4 h-4 text-[var(--color-primary)]" />
          ) : (
            <Plus className="w-4 h-4 text-[var(--color-primary)]" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--color-stone)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-[var(--color-background)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
            Вопросы
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light">
            Частые вопросы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}














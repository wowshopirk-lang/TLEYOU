"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

// FAQ Data
const faqs = [
  {
    question: "Что входит в набор?",
    answer:
      "Керамическая подставка, травяная скрутка (лаванда, шалфей), 30 карточек для рефлексии, декоративный мох и подарочная упаковка.",
  },
  {
    question: "Можно вернуть?",
    answer:
      "Да! 30 дней гарантии. Если набор не оправдает ожиданий — вернём деньги без вопросов.",
  },
  {
    question: "Безопасна ли скрутка?",
    answer:
      "Абсолютно. Скрутка тлеет, не горит пламенем. Травы 100% натуральные, без химии.",
  },
  {
    question: "На сколько хватает?",
    answer:
      "На 10-15 сеансов. Можно затушить и продолжить позже. Дополнительные скрутки продаются отдельно.",
  },
  {
    question: "Как быстро доставка?",
    answer:
      "Ozon — 1-5 дней. Telegram — отправка за 1-2 дня, доставка 3-7 дней по России.",
  },
];

export default function BentoFAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Schema.org JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="relative h-screen flex items-center py-8 md:py-12 overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background - gradient only */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
      </div>

      {/* Content */}
      <div className="relative z-[5] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Вопросы</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-light text-white/90">
            Частые вопросы
          </h2>
        </motion.div>

        {/* FAQ Grid - Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Questions list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#4a6741]/20 border border-[#4a6741]/40"
                    : "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10"
                }`}
              >
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  activeIndex === index ? "text-[#8fb583]" : "text-white/70"
                }`}>
                  {faq.question}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Answer display - Fixed height */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8 h-[280px] flex flex-col justify-center">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg md:text-xl font-heading text-white/90 mb-4">
                  {faqs[activeIndex].question}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm md:text-base">
                  {faqs[activeIndex].answer}
                </p>
              </motion.div>
            </div>

            {/* CTA below answer */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/product"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white text-sm transition-all duration-300 whitespace-nowrap"
              >
                <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Заказать набор</span>
                <div className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <ArrowRightIcon />
                </div>
              </Link>
              <a
                href="https://t.me/tleyouself"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20 transition-all duration-300 text-sm whitespace-nowrap"
              >
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

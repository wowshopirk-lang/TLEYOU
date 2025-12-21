"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Line-style icons
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 5 L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuestionIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" />
    <path d="M18 18 C18 14, 21 12, 24 12 C27 12, 30 14, 30 18 C30 22, 26 22, 24 24 L24 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle cx="24" cy="34" r="1.5" fill="currentColor" />
  </svg>
);

// FAQ Data
const faqs = [
  {
    question: "Что входит в набор TLEYOU?",
    answer:
      "Керамическая подставка для скруток, травяная скрутка (лаванда, шалфей), 30 карточек с вопросами для рефлексии, декоративный мох, льняные мешочки и письмо. Всё в подарочной упаковке.",
  },
  {
    question: "Можно вернуть, если не понравится?",
    answer:
      "Да! 30 дней гарантии возврата. Если набор не оправдает ожиданий — вернём деньги без вопросов.",
  },
  {
    question: "Безопасно ли использовать скрутку?",
    answer:
      "Абсолютно безопасно при соблюдении инструкции. Скрутка тлеет, не горит пламенем. Травы 100% натуральные.",
  },
  {
    question: "Сколько хватает одной скрутки?",
    answer:
      "На 10-15 сеансов по 10 минут. Можно затушить и продолжить позже. Дополнительные скрутки продаются отдельно.",
  },
  {
    question: "Как быстро доставите?",
    answer:
      "Ozon — 1-5 дней по всей России. Telegram-заказы — отправка за 1-2 дня, доставка 3-7 дней.",
  },
  {
    question: "Зачем подписка, если есть набор?",
    answer:
      "Набор — начало ритуала. Подписка — продолжение: ежедневные практики, новые карточки, медитации и сообщество.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group"
    >
      <button
        onClick={onClick}
        className="w-full text-left"
        aria-expanded={isOpen}
      >
        <div className={`flex items-start justify-between gap-3 py-3 border-b transition-colors duration-300 ${
          isOpen ? 'border-[#90a955]/40' : 'border-white/10 hover:border-white/20'
        }`}>
          <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${
            isOpen ? 'text-[#90a955]' : 'text-white group-hover:text-[#90a955]'
          }`}>
            {question}
          </span>
          <span className={`flex-shrink-0 w-5 h-5 mt-0.5 transition-all duration-300 ${
            isOpen ? 'text-[#90a955]' : 'text-white/50 group-hover:text-[#90a955]'
          }`}>
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </span>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="py-3 text-white/60 leading-relaxed text-xs md:text-sm pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BentoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section className="relative py-12 md:py-16 overflow-hidden min-h-screen flex items-center">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background - dark gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0f120e] to-[#0a0c0a]" />
        
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4a6741]/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#3d5a36]/[0.03] rounded-full blur-[100px]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Large circle - top right */}
        <div className="absolute -top-20 -right-20 w-64 h-64 md:w-80 md:h-80">
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
            <circle cx="150" cy="150" r="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="150" cy="150" r="100" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="150" cy="150" r="60" stroke="rgba(143,181,131,0.04)" strokeWidth="0.5" />
          </svg>
        </div>
        
        {/* Curved line - left */}
        <svg className="absolute left-0 top-1/4 w-20 h-[300px] opacity-40" viewBox="0 0 80 300" fill="none">
          <path
            d="M80 0 C50 60, 30 120, 50 180 C70 240, 20 280, 40 300"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="50" cy="180" r="3" fill="rgba(143,181,131,0.2)" />
        </svg>
        
        {/* Question icon - top left */}
        <div className="absolute top-20 left-8 md:left-20 w-12 h-12 md:w-16 md:h-16 text-[#90a955]/10">
          <QuestionIcon />
        </div>
        
        {/* Small decorative dots */}
        <div className="absolute top-1/3 right-[15%] w-1.5 h-1.5 bg-[#90a955]/30 rounded-full" />
        <div className="absolute bottom-1/4 left-[20%] w-1 h-1 bg-white/15 rounded-full" />
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-[#90a955]/20 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-[5] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="w-10 h-px bg-gradient-to-r from-transparent via-[#90a955]/60 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-[#90a955] mb-3">
            Вопросы
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white">
            Частые вопросы
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="mb-10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/40 mb-4 text-xs md:text-sm">
            Остались вопросы? Напиши нам
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/product"
              className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-colors duration-300 text-xs md:text-sm"
            >
              <span>Заказать набор</span>
              <div className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowIcon />
              </div>
            </Link>
            <a
              href="https://t.me/tleyou"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300 text-xs md:text-sm"
            >
              Telegram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

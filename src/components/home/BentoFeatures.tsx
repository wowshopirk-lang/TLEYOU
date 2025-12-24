"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TimeIcon, IncenseSmokeIcon, ReflectionIcon, CheckIcon, StarFilledIcon, ArrowRightIcon } from "@/components/ui/Icons";

// Product benefits with icons
const benefits = [
  {
    Icon: TimeIcon,
    title: "10 минут в день",
    desc: "Простой ежедневный ритуал",
  },
  {
    Icon: IncenseSmokeIcon,
    title: "Натуральные травы",
    desc: "Лаванда, шалфей, полынь",
  },
  {
    Icon: ReflectionIcon,
    title: "30 карточек",
    desc: "Вопросы для рефлексии",
  },
];

// What's included
const included = [
  { name: "Керамическая подставка", detail: "ручная работа" },
  { name: "Травяная скрутка", detail: "3 шт." },
  { name: "30 карточек рефлексии", detail: "" },
  { name: "Инструкция к ритуалу", detail: "" },
  { name: "Подарочная упаковка", detail: "" },
];

export default function BentoFeatures() {
  return (
    <section 
      id="features"
      className="relative h-screen flex items-center py-8 md:py-12 overflow-hidden"
    >
      {/* Background - gradient only */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
      </div>

      {/* Content */}
      <div className="relative z-[5] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left side - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Product image placeholder */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
              <div className="absolute inset-8 rounded-full border border-[#b49b78]/10" />
              
              {/* Image container */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#1a1c1a] to-[#0e100e] border border-white/[0.05] overflow-hidden flex items-center justify-center">
                {/* Placeholder - replace with actual product image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/product-set.jpg"
                    alt="Набор TLEYOU для медитации"
                    fill
                    className="object-cover opacity-90"
                    onError={(e) => {
                      // Fallback to placeholder
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-[#1a1c1a] to-[#0e100e]">
                    <div className="w-16 h-16 mb-4 text-[#b49b78]/30">
                      <TimeIcon />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Фото набора
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating labels */}
              <motion.div
                className="absolute top-8 right-0 flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-8 h-px bg-[#b49b78]/30" />
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#b49b78]/60">Керамика</span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 left-0 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#b49b78]/60">Травы</span>
                <div className="w-8 h-px bg-[#b49b78]/30" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-px bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/40">Карточки</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-[#b49b78]/70 border border-[#b49b78]/20 rounded-full">
                Хит продаж
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white/90 mb-2 leading-tight">
              Набор для<br />
              <span className="text-[#b49b78]/80">ритуала тишины</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-white/50 mb-6 leading-relaxed font-light max-w-md">
              Всё необходимое для ежедневной практики осознанности. 
              10 минут в день для себя.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {benefits.map((benefit, i) => {
                const IconComponent = benefit.Icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-8 h-8 mx-auto mb-2 text-[#b49b78]/50">
                      <IconComponent />
                    </div>
                    <h3 className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-white/70 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[9px] text-white/35">{benefit.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* What's included */}
            <div className="mb-6 py-4 border-y border-white/[0.05]">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                В наборе
              </span>
              <div className="flex flex-wrap gap-2 max-h-[72px] overflow-hidden">
                {included.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/60 bg-white/[0.02] border border-white/[0.05] rounded-full"
                  >
                    <div className="w-3.5 h-3.5 text-[#8fb583]/60 flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="whitespace-nowrap">{item.name}</span>
                    {item.detail && (
                      <span className="text-white/40 whitespace-nowrap">{item.detail}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              {/* Price */}
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">
                  Цена
                </span>
                <div className="flex items-baseline gap-3 whitespace-nowrap">
                  <span className="text-sm text-white/30 line-through">4 990 ₽</span>
                  <span className="text-4xl md:text-5xl font-heading font-light text-white/90 whitespace-nowrap">
                    4 490 ₽
                  </span>
                </div>
                <span className="text-[10px] text-[#8fb583]/60 mt-1 whitespace-nowrap">
                  Скидка 10% через сайт
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
                <Link
                  href="/product"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white text-sm tracking-wide transition-all duration-300 whitespace-nowrap"
                >
                  <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Заказать набор</span>
                  <div className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <ArrowRightIcon />
                  </div>
                </Link>
                
                <Link
                  href="/card-of-day"
                  className="group relative inline-flex items-center justify-center px-6 py-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-[#8fb583]/30 rounded-full text-white/70 hover:text-white text-sm tracking-wide transition-all duration-300 whitespace-nowrap"
                >
                  Попробовать бесплатно
                </Link>
              </div>
            </div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 mt-8 pt-6 border-t border-white/[0.03]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 text-[#b49b78]/70">
                        <StarFilledIcon />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-white/40">4.9</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-[10px] text-white/35">1 000+ заказов</span>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-[10px] text-white/35">Доставка 2-5 дней</span>
              </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  StarIcon, 
  CheckIcon, 
  ArrowRightIcon, 
  MeditationIcon, 
  HeartIcon, 
  InfinityIcon 
} from "@/components/ui/Icons";

const plans = [
  {
    name: "Месяц",
    price: "500",
    period: "/мес",
    description: "Попробовать",
    features: [
      "Ежедневные практики",
      "Карточка дня",
      "Медитации",
      "Доступ к сообществу",
    ],
    icon: MeditationIcon,
    popular: false,
  },
  {
    name: "Год",
    price: "3 990",
    period: "/год",
    originalPrice: "6 000",
    description: "Популярный выбор",
    features: [
      "Всё из месячной подписки",
      "Экономия 33%",
      "Эксклюзивный контент",
      "Приоритетная поддержка",
      "Бонусные материалы",
    ],
    icon: HeartIcon,
    popular: true,
  },
  {
    name: "Навсегда",
    price: "9 990",
    period: "",
    description: "Один платёж",
    features: [
      "Пожизненный доступ",
      "Все будущие обновления",
      "VIP поддержка",
      "Личные консультации",
      "Закрытый клуб",
    ],
    icon: InfinityIcon,
    popular: false,
  },
];

const subscriptionFeatures = [
  { title: "Ежедневные медитации", desc: "Короткие и длинные сессии на любое настроение" },
  { title: "Дыхательные практики", desc: "Техники для снятия стресса и концентрации" },
  { title: "Карточка дня", desc: "Новый вопрос для рефлексии каждый день" },
  { title: "Сообщество", desc: "Общение с единомышленниками в закрытом чате" },
  { title: "Треки для сна", desc: "Звуки природы и музыка для засыпания" },
  { title: "Личный прогресс", desc: "Статистика и достижения в вашем профиле" },
];

const testimonials = [
  { text: "Медитации помогли справиться с тревожностью", author: "Анна" },
  { text: "Практикую каждый день уже 3 месяца", author: "Мария" },
  { text: "Лучшая инвестиция в себя", author: "Елена" },
];

export default function SubscriptionPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero - with background image */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/woman-silhouette.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/88 via-[#0a0c0a]/80 to-[#0c0e0c]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Подписка</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-4">
              Ежедневные практики тишины
            </h1>
            
            {/* Tags - простое перечисление */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                Медитации
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                Дыхание
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                Осознанность
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                Рефлексия
              </span>
            </div>
            
            <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              Медитации, дыхательные упражнения и практики осознанности. Новый контент каждый день.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing - solid gradient */}
      <section className="relative py-16 md:py-24 overflow-visible">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Тарифы</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white">
              Выбери свой путь
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-2xl p-6 md:p-8 transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-[#4a6741] to-[#3a5232] md:-mt-4 md:pb-12 shadow-2xl shadow-[#4a6741]/20'
                      : 'bg-white/[0.02] border border-white/[0.05] hover:border-[#8fb583]/20'
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#90a955] text-white text-xs font-medium">
                      Популярный
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 mb-6 ${plan.popular ? 'text-white' : 'text-[#8fb583]'}`}>
                    <Icon />
                  </div>

                  {/* Plan name */}
                  <h3 className={`text-lg font-medium mb-2 ${plan.popular ? 'text-white' : 'text-white/80'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-white/70' : 'text-white/40'}`}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <span className={`text-sm line-through mr-2 ${plan.popular ? 'text-white/50' : 'text-white/30'}`}>
                        {plan.originalPrice} ₽
                      </span>
                    )}
                    <span className={`text-3xl font-heading font-light ${plan.popular ? 'text-white' : 'text-[#8fb583]'}`}>
                      {plan.price} ₽
                    </span>
                    <span className={plan.popular ? 'text-white/60' : 'text-white/40'}>
                      {plan.period}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/80' : 'text-white/50'}`}>
                        <div className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-[#8fb583]'}`}>
                          <CheckIcon />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-[#4a6741] hover:bg-white/90'
                      : 'border border-white/10 text-white/60 hover:bg-white/[0.03] hover:text-white hover:border-white/20'
                  }`}>
                    Выбрать
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's included - with background image (roots, foundation) */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image - tree cross section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/tree-cross-section.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/92 via-[#0a0c0a]/88 to-[#0c0e0c]/92" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#b49b78]/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b49b78]/60">Содержание</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#b49b78]/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white">
              Что входит в подписку
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscriptionFeatures.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
              >
                <div className="w-5 h-5 text-[#8fb583] flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - solid gradient */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] via-[#0a0c0a] to-[#0c0e0c]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-8 h-8 mx-auto mb-4 text-[#8fb583]">
              <StarIcon />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-white">
              Отзывы подписчиков
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <p className="text-white/70 mb-3 italic">&ldquo;{item.text}&rdquo;</p>
                <p className="text-sm text-[#8fb583]">— {item.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - with background image */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/Без названия - 2025-12-24T131919.379.jfif"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c]/90 via-[#0a0c0a]/85 to-[#0c0e0c]/95" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white mb-6">
              Начни с бесплатной недели
            </h2>
            <p className="text-white/50 mb-8">
              Попробуй подписку бесплатно в течение 7 дней. Без обязательств.
            </p>
            
            <a
              href="/auth/register"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#4a6741]/30 hover:bg-[#4a6741]/50 border border-[#4a6741]/40 hover:border-[#4a6741]/60 rounded-full text-white transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-[#4a6741]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 font-medium">Попробовать бесплатно</span>
              <div className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRightIcon />
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

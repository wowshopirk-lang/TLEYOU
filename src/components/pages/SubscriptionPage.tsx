"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2 L14 8 L21 9 L16 14 L17 21 L12 18 L7 21 L8 14 L3 9 L10 8 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MeditationIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M20 56 L20 44 C20 38, 24 34, 32 34 C40 34, 44 38, 44 44 L44 56" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 56 L52 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="32" cy="48" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 54 C22 46, 12 36, 12 26 C12 18, 18 12, 26 12 C29 12, 31 14, 32 17 C33 14, 35 12, 38 12 C46 12, 52 18, 52 26 C52 36, 42 46, 32 54" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M32 48 C24 42, 18 34, 18 27" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
  </svg>
);

const InfinityIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 32 C32 24, 24 20, 18 20 C12 20, 8 26, 8 32 C8 38, 12 44, 18 44 C24 44, 32 40, 32 32 C32 40, 40 44, 46 44 C52 44, 56 38, 56 32 C56 26, 52 20, 46 20 C40 20, 32 24, 32 32" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

// Pill Tag
const PillTag = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`
    inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em]
    border transition-all duration-300
    ${active 
      ? 'border-[#8fb583]/40 text-[#8fb583] bg-[#8fb583]/5' 
      : 'border-white/10 text-white/40'
    }
  `}>
    {children}
  </span>
);

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

const testimonials = [
  { text: "Медитации помогли справиться с тревожностью", author: "Анна" },
  { text: "Практикую каждый день уже 3 месяца", author: "Мария" },
  { text: "Лучшая инвестиция в себя", author: "Елена" },
];

export default function SubscriptionPage() {
  return (
    <main className="bg-[#0a0c0a] min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0a0c0a]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#4a6741]/[0.08] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#8fb583]/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#8fb583]">Подписка</span>
              <div className="w-8 h-px bg-[#8fb583]/50" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-6">
              Ежедневные практики тишины
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
              Медитации, дыхательные упражнения и практики осознанности. Новый контент каждый день.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <PillTag active>Медитации</PillTag>
              <PillTag>Дыхание</PillTag>
              <PillTag>Осознанность</PillTag>
              <PillTag>Рефлексия</PillTag>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-2xl p-6 md:p-8 transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-[#4a6741] to-[#3a5232] md:-mt-4 md:pb-12'
                      : 'bg-white/[0.02] border border-white/[0.08] hover:border-[#8fb583]/20'
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
                      : 'border border-white/20 text-white/70 hover:bg-white/5 hover:text-white'
                  }`}>
                    Выбрать
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f120e]/50 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-light text-white">
              Что входит в подписку
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Ежедневные медитации", desc: "Короткие и длинные сессии на любое настроение" },
              { title: "Дыхательные практики", desc: "Техники для снятия стресса и концентрации" },
              { title: "Карточка дня", desc: "Новый вопрос для рефлексии каждый день" },
              { title: "Сообщество", desc: "Общение с единомышленниками в закрытом чате" },
              { title: "Треки для сна", desc: "Звуки природы и музыка для засыпания" },
              { title: "Личный прогресс", desc: "Статистика и достижения в вашем профиле" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
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

      {/* Testimonials */}
      <section className="relative py-16 md:py-24 overflow-hidden">
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
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <p className="text-white/70 mb-3 italic">"{item.text}"</p>
                <p className="text-sm text-[#8fb583]">— {item.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#4a6741]/[0.1] rounded-full blur-[100px]" />
        
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
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300"
            >
              <span className="font-medium">Попробовать бесплатно</span>
              <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowIcon />
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

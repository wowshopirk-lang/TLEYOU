"use client";

import { motion } from "framer-motion";

const mainTestimonial = {
  name: "Екатерина",
  role: "Основатель студии йоги",
  text: "TLEYOU изменил мои вечера. Раньше я засыпала с телефоном в руках, а теперь — с благодарностью к себе. Эти 10 минут тишины стали моим якорем в суете дней.",
  avatar: "Е",
};

const testimonials = [
  {
    name: "Анна",
    text: "После 30 дней практики я наконец научилась слышать себя.",
    avatar: "А",
  },
  {
    name: "Мария", 
    text: "Карточки помогли вспомнить, кто я есть помимо роли мамы.",
    avatar: "М",
  },
  {
    name: "Ольга",
    text: "За месяц ушла тревожность. Сплю спокойно.",
    avatar: "О",
  },
];

// Horizontal Timeline Transformation
const TransformationTimeline = () => {
  const milestones = [
    { 
      day: "День 1",
      title: "Тревога и хаос",
      status: "before",
      description: "Стартовая точка"
    },
    { 
      day: "День 7",
      title: "Первые шаги",
      status: "progress",
      description: "Ежедневный ритуал"
    },
    { 
      day: "День 21",
      title: "Осознанность",
      status: "growth",
      description: "Точка роста"
    },
    { 
      day: "День 30",
      title: "Спокойствие",
      status: "result",
      description: "Результат"
    },
  ];

  return (
    <div className="relative py-6">
      {/* Horizontal timeline line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
      
      <div className="relative flex flex-col gap-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="relative flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {/* Timeline marker */}
            <div className="relative flex-shrink-0">
              <div className={`
                w-3 h-3 rounded-full border-2 transition-all duration-300
                ${milestone.status === 'before' ? 'bg-white/5 border-white/20' : ''}
                ${milestone.status === 'progress' ? 'bg-white/10 border-white/30' : ''}
                ${milestone.status === 'growth' ? 'bg-[#8fb583]/30 border-[#8fb583]/50' : ''}
                ${milestone.status === 'result' ? 'bg-[#b49b78]/40 border-[#b49b78]/60' : ''}
              `} />
              {/* Connecting line to timeline */}
              <div className="absolute top-1/2 left-1/2 w-8 h-px bg-white/5 -translate-y-1/2 -translate-x-full" />
            </div>
            
            {/* Card content */}
            <div className={`
              flex-1 rounded-lg p-4 md:p-5 border transition-all duration-300
              ${milestone.status === 'before' ? 'bg-white/[0.01] border-white/5' : ''}
              ${milestone.status === 'progress' ? 'bg-white/[0.02] border-white/8' : ''}
              ${milestone.status === 'growth' ? 'bg-[#8fb583]/[0.05] border-[#8fb583]/20' : ''}
              ${milestone.status === 'result' ? 'bg-[#b49b78]/[0.08] border-[#b49b78]/25' : ''}
            `}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs md:text-sm uppercase tracking-widest text-white/30 font-medium">
                  {milestone.day}
                </span>
                {milestone.status === 'result' && (
                  <svg className="w-5 h-5 text-[#b49b78]/60 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h4 className={`
                text-sm md:text-base font-medium mb-1 leading-tight
                ${milestone.status === 'before' ? 'text-white/50' : ''}
                ${milestone.status === 'progress' ? 'text-white/60' : ''}
                ${milestone.status === 'growth' ? 'text-[#8fb583]/90' : ''}
                ${milestone.status === 'result' ? 'text-[#b49b78]/90' : ''}
              `}>
                {milestone.title}
              </h4>
              <p className="text-xs md:text-sm text-white/30 italic">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Custom SVG Icons
const QuoteIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M12 28 C12 22, 16 18, 20 18 L20 22 C18 22, 16 24, 16 28 L16 32 L12 32 L12 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 28 C28 22, 32 18, 36 18 L36 22 C34 22, 32 24, 32 28 L32 32 L28 32 L28 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

// Pill Tag
const PillTag = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`
    inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm uppercase tracking-[0.15em]
    border transition-all duration-300
    ${active 
      ? 'border-[#8fb583]/40 text-[#8fb583]/80 bg-[#8fb583]/5' 
      : 'border-white/10 text-white/40'
    }
  `}>
    {children}
  </span>
);

export default function BentoSocialProof() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0c0e0c]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4a6741]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Large decorative circle */}
      <motion.div 
        className="absolute -top-32 -right-32 w-72 h-72 md:w-96 md:h-96 z-[2] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" stroke="rgba(143,181,131,0.03)" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </motion.div>

      {/* Curved line - left */}
      <motion.svg 
        className="absolute left-0 top-1/3 w-20 h-[300px] z-[2] pointer-events-none"
        viewBox="0 0 60 300" 
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <path d="M60 0 C30 50, 20 100, 35 150 C50 200, 15 250, 30 300" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
        <circle cx="35" cy="150" r="2.5" fill="rgba(143,181,131,0.2)" />
      </motion.svg>

      {/* Content */}
      <div className="relative z-[5] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Down arrow */}
          <div className="flex justify-center mb-6">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M10 0 L10 20 M4 14 L10 20 L16 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          {/* Pill tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <PillTag active>ОТЗЫВЫ</PillTag>
            <PillTag>РЕЗУЛЬТАТЫ</PillTag>
            <PillTag>ИСТОРИИ</PillTag>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white/85 tracking-wide mb-3">
            Истории возвращения к себе
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto">
            Более 500 женщин уже обрели свой ритуал тишины
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Testimonial - spans 2 cols */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10 h-full">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M0 8 L0 0 L8 0" stroke="rgba(143,181,131,0.25)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M16 0 L24 0 L24 8" stroke="rgba(143,181,131,0.25)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M0 16 L0 24 L8 24" stroke="rgba(143,181,131,0.25)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M16 24 L24 24 L24 16" stroke="rgba(143,181,131,0.25)" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4a6741]/[0.06] via-transparent to-[#4a6741]/[0.03] pointer-events-none" />
              
              {/* Rating stars */}
              <div className="absolute top-5 right-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 text-[#8fb583]">
                    <StarIcon />
                  </div>
                ))}
              </div>
              
              {/* Quote icon */}
              <div className="w-10 h-10 text-[#8fb583]/30 mb-6">
                <QuoteIcon />
              </div>
              
              {/* Quote text */}
              <p className="text-lg md:text-xl font-heading font-light text-white/80 leading-relaxed mb-8 max-w-2xl relative z-10">
                {mainTestimonial.text}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a6741]/40 to-[#3a5232]/30 flex items-center justify-center text-white/90 text-sm font-medium border border-[#8fb583]/20">
                    {mainTestimonial.avatar}
                  </div>
                  <div className="absolute -inset-1 rounded-full border border-[#8fb583]/10" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/85">{mainTestimonial.name}</p>
                  <p className="text-xs text-white/40">{mainTestimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transformation Flow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 h-full">
              <div className="absolute top-0 right-0 w-5 h-5">
                <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                  <path d="M12 0 L20 0 L20 8" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              
              <div className="text-center mb-4">
                <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#8fb583]/70">Путь трансформации</span>
              </div>
              
              <TransformationTimeline />
              
              <div className="text-center mt-4">
                <span className="text-xs text-white/30 italic">30 дней практики</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Small testimonials row */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name} 
              className="group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-[#8fb583]/15">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8fb583]/0 to-[#8fb583]/0 group-hover:from-[#8fb583]/[0.03] group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100" />
                
                <div className="relative z-10 flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#4a6741]/20 border border-[#8fb583]/15 flex items-center justify-center text-[#8fb583]/80 text-xs font-medium flex-shrink-0 group-hover:border-[#8fb583]/30 transition-colors duration-500">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/55 leading-relaxed mb-2 group-hover:text-white/70 transition-colors duration-500">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="text-xs text-white/30">— {testimonial.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom annotation */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /></svg>
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/30">Реальные истории клиентов</span>
          <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="1" /></svg>
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}

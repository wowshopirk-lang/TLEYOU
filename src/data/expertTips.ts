// Получить день года (1-366)
const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export interface ExpertTip {
  id: string;
  title: string;
  description: string;
  expertName: string;
  expertRole: string;
  videoUrl?: string; // placeholder URL
  dayOfYear: number; // когда показывать (1-366)
  duration?: string;
}

export const expertTips: ExpertTip[] = [
  {
    id: "tip-1",
    title: "Почему дыхание помогает при тревоге?",
    description: "Психолог объясняет научные основы техники дыхания и как она влияет на нервную систему.",
    expertName: "Анна Петрова",
    expertRole: "Психолог, специалист по тревожным расстройствам",
    videoUrl: "/videos/expert-breathing.mp4",
    dayOfYear: 1,
    duration: "2:30",
  },
  {
    id: "tip-2",
    title: "Как практика благодарности меняет мозг",
    description: "Нейропсихолог рассказывает о влиянии благодарности на структуру мозга и эмоциональное состояние.",
    expertName: "Мария Соколова",
    expertRole: "Нейропсихолог",
    videoUrl: "/videos/expert-gratitude.mp4",
    dayOfYear: 2,
    duration: "3:15",
  },
  {
    id: "tip-3",
    title: "Медитация для начинающих: с чего начать",
    description: "Опытный медитатор делится простыми шагами для тех, кто только начинает практику.",
    expertName: "Елена Иванова",
    expertRole: "Инструктор по медитации",
    videoUrl: "/videos/expert-meditation.mp4",
    dayOfYear: 3,
    duration: "2:45",
  },
  {
    id: "tip-4",
    title: "Стресс и тело: как напряжение влияет на здоровье",
    description: "Врач объясняет связь между стрессом и физическим здоровьем, и как практики помогают.",
    expertName: "Доктор Ольга Сидорова",
    expertRole: "Врач-терапевт, специалист по интегративной медицине",
    videoUrl: "/videos/expert-stress.mp4",
    dayOfYear: 4,
    duration: "3:00",
  },
  {
    id: "tip-5",
    title: "Осознанность в повседневной жизни",
    description: "Практические советы о том, как внедрить осознанность в ежедневные дела.",
    expertName: "Александра Козлова",
    expertRole: "Тренер по mindfulness",
    videoUrl: "/videos/expert-mindfulness.mp4",
    dayOfYear: 5,
    duration: "2:20",
  },
  {
    id: "tip-6",
    title: "Сон и практики релаксации",
    description: "Сомнолог рассказывает, как практики осознанности улучшают качество сна.",
    expertName: "Доктор Ирина Волкова",
    expertRole: "Сомнолог",
    videoUrl: "/videos/expert-sleep.mp4",
    dayOfYear: 6,
    duration: "2:50",
  },
  {
    id: "tip-7",
    title: "Эмоциональный интеллект и самосознание",
    description: "Психолог объясняет важность понимания своих эмоций и как практики помогают развить это.",
    expertName: "Виктория Новикова",
    expertRole: "Психолог, специалист по эмоциональному интеллекту",
    videoUrl: "/videos/expert-emotions.mp4",
    dayOfYear: 7,
    duration: "3:10",
  },
  // Добавьте больше советов для каждого дня года...
  // Для демонстрации используем цикл для остальных дней
  ...Array.from({ length: 358 }, (_, i) => ({
    id: `tip-${i + 8}`,
    title: `Совет эксперта ${i + 8}`,
    description: "Ежедневный совет от наших экспертов для твоего благополучия.",
    expertName: "Эксперт TLEYOU",
    expertRole: "Специалист по благополучию",
    videoUrl: `/videos/expert-${i + 8}.mp4`,
    dayOfYear: i + 8,
    duration: "2:30",
  })),
];

export const getTipOfDay = (): ExpertTip | null => {
  const dayOfYear = getDayOfYear();
  const tip = expertTips.find(t => t.dayOfYear === dayOfYear);
  return tip || expertTips[dayOfYear % expertTips.length] || null;
};

export const getAllTips = (): ExpertTip[] => {
  return expertTips;
};

export { getDayOfYear };




// Получить номер недели года
const getWeekNumber = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) + 1;
};

export type TrackCategory = 'meditation' | 'nature' | 'ambient' | 'sleep' | 'focus';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSeconds: number;
  category: TrackCategory;
  audioUrl: string; // placeholder URL
  weekNumber: number; // для еженедельного обновления
  description?: string;
}

export const tracks: Track[] = [
  // Meditation tracks
  {
    id: "meditation-1",
    title: "Утренняя медитация",
    artist: "TLEYOU",
    duration: "10:00",
    durationSeconds: 600,
    category: "meditation",
    audioUrl: "/audio/meditation-morning.mp3",
    weekNumber: 1,
    description: "Спокойная мелодия для утренней практики осознанности",
  },
  {
    id: "meditation-2",
    title: "Глубокое расслабление",
    artist: "TLEYOU",
    duration: "15:00",
    durationSeconds: 900,
    category: "meditation",
    audioUrl: "/audio/meditation-deep.mp3",
    weekNumber: 1,
    description: "Мелодия для глубокого погружения в медитацию",
  },
  {
    id: "meditation-3",
    title: "Дыхание и покой",
    artist: "TLEYOU",
    duration: "8:00",
    durationSeconds: 480,
    category: "meditation",
    audioUrl: "/audio/meditation-breath.mp3",
    weekNumber: 2,
    description: "Музыка для синхронизации дыхания",
  },

  // Nature sounds
  {
    id: "nature-1",
    title: "Лесной ручей",
    artist: "Природа",
    duration: "30:00",
    durationSeconds: 1800,
    category: "nature",
    audioUrl: "/audio/nature-stream.mp3",
    weekNumber: 1,
    description: "Успокаивающий звук текущей воды",
  },
  {
    id: "nature-2",
    title: "Дождь в лесу",
    artist: "Природа",
    duration: "45:00",
    durationSeconds: 2700,
    category: "nature",
    audioUrl: "/audio/nature-rain.mp3",
    weekNumber: 1,
    description: "Мягкий дождь среди деревьев",
  },
  {
    id: "nature-3",
    title: "Пение птиц",
    artist: "Природа",
    duration: "20:00",
    durationSeconds: 1200,
    category: "nature",
    audioUrl: "/audio/nature-birds.mp3",
    weekNumber: 2,
    description: "Утреннее пение птиц в лесу",
  },

  // Ambient
  {
    id: "ambient-1",
    title: "Космическая тишина",
    artist: "TLEYOU",
    duration: "25:00",
    durationSeconds: 1500,
    category: "ambient",
    audioUrl: "/audio/ambient-space.mp3",
    weekNumber: 1,
    description: "Атмосферная музыка для концентрации",
  },
  {
    id: "ambient-2",
    title: "Эфирные волны",
    artist: "TLEYOU",
    duration: "18:00",
    durationSeconds: 1080,
    category: "ambient",
    audioUrl: "/audio/ambient-ether.mp3",
    weekNumber: 1,
    description: "Плавные звуковые волны для расслабления",
  },
  {
    id: "ambient-3",
    title: "Тихий океан",
    artist: "TLEYOU",
    duration: "35:00",
    durationSeconds: 2100,
    category: "ambient",
    audioUrl: "/audio/ambient-ocean.mp3",
    weekNumber: 2,
    description: "Мягкие звуки океана",
  },

  // Sleep
  {
    id: "sleep-1",
    title: "Сновидения",
    artist: "TLEYOU",
    duration: "60:00",
    durationSeconds: 3600,
    category: "sleep",
    audioUrl: "/audio/sleep-dreams.mp3",
    weekNumber: 1,
    description: "Музыка для глубокого и спокойного сна",
  },
  {
    id: "sleep-2",
    title: "Лунный свет",
    artist: "TLEYOU",
    duration: "45:00",
    durationSeconds: 2700,
    category: "sleep",
    audioUrl: "/audio/sleep-moon.mp3",
    weekNumber: 1,
    description: "Успокаивающая мелодия перед сном",
  },
  {
    id: "sleep-3",
    title: "Тихая ночь",
    artist: "TLEYOU",
    duration: "50:00",
    durationSeconds: 3000,
    category: "sleep",
    audioUrl: "/audio/sleep-night.mp3",
    weekNumber: 2,
    description: "Звуки для подготовки ко сну",
  },

  // Focus
  {
    id: "focus-1",
    title: "Концентрация",
    artist: "TLEYOU",
    duration: "30:00",
    durationSeconds: 1800,
    category: "focus",
    audioUrl: "/audio/focus-concentration.mp3",
    weekNumber: 1,
    description: "Музыка для работы и учебы",
  },
  {
    id: "focus-2",
    title: "Поток мыслей",
    artist: "TLEYOU",
    duration: "25:00",
    durationSeconds: 1500,
    category: "focus",
    audioUrl: "/audio/focus-flow.mp3",
    weekNumber: 2,
    description: "Звуки для творческой работы",
  },
];

export const getTracksForCurrentWeek = (): Track[] => {
  const currentWeek = getWeekNumber();
  // Показываем треки текущей недели + все предыдущие
  return tracks.filter(t => t.weekNumber <= currentWeek);
};

export const getTracksByCategory = (category: TrackCategory): Track[] => {
  return tracks.filter(t => t.category === category);
};

export const getTrackById = (id: string): Track | undefined => {
  return tracks.find(t => t.id === id);
};

export { getWeekNumber };




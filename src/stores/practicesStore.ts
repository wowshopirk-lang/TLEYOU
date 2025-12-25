import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompletedPractice {
  practiceId: string;
  dateCompleted: string; // YYYY-MM-DD
  timestamp: number;
  completedFully: boolean; // true если без перемоток/пропусков
  progressPercent: number; // процент прохождения
  practiceType: 'audio' | 'text' | 'video';
  duration?: number; // время в секундах
}

interface PracticesState {
  completedPractices: CompletedPractice[];
  favoritePractices: string[]; // массив id избранных практик
  
  // Методы для завершённых практик
  completePractice: (
    practiceId: string, 
    completedFully: boolean, 
    progressPercent: number,
    practiceType: 'audio' | 'text' | 'video',
    duration?: number
  ) => void;
  isPracticeCompleted: (practiceId: string) => boolean;
  isPracticeCompletedFully: (practiceId: string) => boolean;
  isPracticeCompletedToday: (practiceId: string) => boolean;
  getCompletedCount: () => number;
  getFullyCompletedCount: () => number;
  getCompletedPractices: () => CompletedPractice[];
  getCompletedByDate: (date: string) => CompletedPractice[];
  
  // Методы для избранного
  addToFavorites: (practiceId: string) => void;
  removeFromFavorites: (practiceId: string) => void;
  isFavorite: (practiceId: string) => boolean;
  getFavoritePractices: () => string[];
}

// Получить дату в формате YYYY-MM-DD
const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Получить номер недели года
const getWeekNumber = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) + 1;
};

export const usePracticesStore = create<PracticesState>()(
  persist(
    (set, get) => ({
      completedPractices: [],
      favoritePractices: [],

      completePractice: (
        practiceId: string, 
        completedFully: boolean, 
        progressPercent: number,
        practiceType: 'audio' | 'text' | 'video',
        duration?: number
      ) => {
        const state = get();
        const today = getDateKey();
        
        // Проверяем, не завершена ли уже сегодня
        const alreadyCompleted = state.completedPractices.some(
          (p) => p.practiceId === practiceId && p.dateCompleted === today
        );
        
        if (alreadyCompleted) {
          return;
        }
        
        const newCompleted: CompletedPractice = {
          practiceId,
          dateCompleted: today,
          timestamp: Date.now(),
          completedFully,
          progressPercent,
          practiceType,
          duration,
        };
        
        set({
          completedPractices: [...state.completedPractices, newCompleted],
        });
      },

      isPracticeCompleted: (practiceId: string) => {
        const { completedPractices } = get();
        return completedPractices.some((p) => p.practiceId === practiceId);
      },

      isPracticeCompletedFully: (practiceId: string) => {
        const { completedPractices } = get();
        return completedPractices.some(
          (p) => p.practiceId === practiceId && p.completedFully
        );
      },

      isPracticeCompletedToday: (practiceId: string) => {
        const { completedPractices } = get();
        const today = getDateKey();
        return completedPractices.some(
          (p) => p.practiceId === practiceId && p.dateCompleted === today
        );
      },

      getCompletedCount: () => {
        return get().completedPractices.length;
      },

      getFullyCompletedCount: () => {
        return get().completedPractices.filter((p) => p.completedFully).length;
      },

      getCompletedPractices: () => {
        return get().completedPractices;
      },

      getCompletedByDate: (date: string) => {
        return get().completedPractices.filter((p) => p.dateCompleted === date);
      },

      // Методы для избранного
      addToFavorites: (practiceId: string) => {
        const state = get();
        if (!state.favoritePractices.includes(practiceId)) {
          set({
            favoritePractices: [...state.favoritePractices, practiceId],
          });
        }
      },

      removeFromFavorites: (practiceId: string) => {
        set({
          favoritePractices: get().favoritePractices.filter((id) => id !== practiceId),
        });
      },

      isFavorite: (practiceId: string) => {
        return get().favoritePractices.includes(practiceId);
      },

      getFavoritePractices: () => {
        return get().favoritePractices;
      },
    }),
    {
      name: 'practices-storage',
      partialize: (state) => ({
        completedPractices: state.completedPractices,
        favoritePractices: state.favoritePractices,
      }),
    }
  )
);

export { getWeekNumber, getDateKey };

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompletedPractice {
  practiceId: string;
  dateCompleted: string; // YYYY-MM-DD
  timestamp: number;
}

interface PracticesState {
  completedPractices: CompletedPractice[];
  
  // Методы
  completePractice: (practiceId: string) => void;
  isPracticeCompleted: (practiceId: string) => boolean;
  getCompletedCount: () => number;
  getCompletedPractices: () => CompletedPractice[];
}

// Получить дату в формате YYYY-MM-DD
const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export const usePracticesStore = create<PracticesState>()(
  persist(
    (set, get) => ({
      completedPractices: [],

      completePractice: (practiceId: string) => {
        const state = get();
        
        // Проверяем, не завершена ли уже сегодня
        const today = getDateKey();
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
        };
        
        set({
          completedPractices: [...state.completedPractices, newCompleted],
        });
      },

      isPracticeCompleted: (practiceId: string) => {
        const { completedPractices } = get();
        return completedPractices.some((p) => p.practiceId === practiceId);
      },

      getCompletedCount: () => {
        return get().completedPractices.length;
      },

      getCompletedPractices: () => {
        return get().completedPractices;
      },
    }),
    {
      name: 'practices-storage',
      partialize: (state) => ({
        completedPractices: state.completedPractices,
      }),
    }
  )
);


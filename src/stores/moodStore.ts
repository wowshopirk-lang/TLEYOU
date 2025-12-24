import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MoodKey = 
  | 'radiant' 
  | 'calm' 
  | 'balanced' 
  | 'tender' 
  | 'tired' 
  | 'anxious' 
  | 'inspired' 
  | 'grateful' 
  | 'energetic' 
  | 'peaceful' 
  | 'confused';

export interface MoodEntry {
  date: string; // ISO date string
  mood: MoodKey;
  timestamp: number;
}

interface MoodState {
  // Текущее выбранное настроение (null = не выбрано)
  currentMood: MoodKey | null;
  
  // История настроений
  moodHistory: MoodEntry[];
  
  // Индекс карточки дня (привязан к дате)
  todayCardDate: string | null;
  todayCardIndex: number;
  
  // Методы
  setMood: (mood: MoodKey) => void;
  clearMood: () => void;
  getMoodHistory: (days?: number) => MoodEntry[];
  getTodayCardIndex: (totalCards: number) => number;
}

// Получить дату в формате YYYY-MM-DD
const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Получить день года (1-366)
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const useMoodStore = create<MoodState>()(
  persist(
    (set, get) => ({
      currentMood: null,
      moodHistory: [],
      todayCardDate: null,
      todayCardIndex: 0,

      setMood: (mood: MoodKey) => {
        const dateKey = getDateKey();
        const timestamp = Date.now();
        
        set((state) => {
          // Добавляем запись в историю
          const newEntry: MoodEntry = {
            date: dateKey,
            mood,
            timestamp,
          };
          
          return {
            currentMood: mood,
            moodHistory: [...state.moodHistory, newEntry],
          };
        });
      },

      clearMood: () => {
        set({ currentMood: null });
      },

      getMoodHistory: (days = 30) => {
        const { moodHistory } = get();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const cutoffTime = cutoffDate.getTime();
        
        return moodHistory.filter(entry => entry.timestamp >= cutoffTime);
      },

      getTodayCardIndex: (totalCards: number) => {
        const dateKey = getDateKey();
        const state = get();
        
        // Если карточка уже выбрана на сегодня - вернуть её
        if (state.todayCardDate === dateKey) {
          return state.todayCardIndex;
        }
        
        // Иначе - вычислить новую карточку на основе дня года
        const dayOfYear = getDayOfYear();
        const newIndex = dayOfYear % totalCards;
        
        // Сохраняем
        set({
          todayCardDate: dateKey,
          todayCardIndex: newIndex,
        });
        
        return newIndex;
      },
    }),
    {
      name: 'mood-storage',
      // Сохраняем только историю и данные карточки дня
      partialize: (state) => ({
        moodHistory: state.moodHistory,
        todayCardDate: state.todayCardDate,
        todayCardIndex: state.todayCardIndex,
        // currentMood сбрасывается при новом дне
        currentMood: state.todayCardDate === getDateKey() ? state.currentMood : null,
      }),
    }
  )
);




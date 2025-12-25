import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCalendarStore } from './calendarStore';

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
        const state = get();
        
        // Проверяем, было ли уже выбрано настроение сегодня
        const todayMood = state.moodHistory.find(entry => entry.date === dateKey);
        if (todayMood) {
          // Настроение уже выбрано сегодня, не позволяем изменить
          return;
        }
        
        const timestamp = Date.now();
        
        // Добавляем запись в историю
        const newEntry: MoodEntry = {
          date: dateKey,
          mood,
          timestamp,
        };
        
        // Сохраняем настроение в календарь
        const moodLabels: Record<MoodKey, string> = {
          radiant: 'Отлично',
          calm: 'Спокойно',
          balanced: 'Нормально',
          tender: 'Грустно',
          tired: 'Устала',
          anxious: 'Тревожно',
          inspired: 'Вдохновлена',
          grateful: 'Благодарна',
          energetic: 'Энергичная',
          peaceful: 'Умиротворена',
          confused: 'Растеряна',
        };
        
        useCalendarStore.getState().addEvent({
          date: dateKey,
          type: 'mood',
          eventId: mood,
          title: moodLabels[mood] || mood,
          metadata: { mood },
        });
        
        set({
          currentMood: mood,
          moodHistory: [...state.moodHistory, newEntry],
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
      partialize: (state) => {
        const dateKey = getDateKey();
        const todayMood = state.moodHistory.find(entry => entry.date === dateKey);
        return {
          moodHistory: state.moodHistory,
          todayCardDate: state.todayCardDate,
          todayCardIndex: state.todayCardIndex,
          // currentMood устанавливается из истории настроений на сегодня
          currentMood: todayMood ? todayMood.mood : null,
        };
      },
      // При загрузке восстанавливаем currentMood из истории
      onRehydrateStorage: () => (state) => {
        if (state) {
          const dateKey = getDateKey();
          const todayMood = state.moodHistory.find(entry => entry.date === dateKey);
          if (todayMood) {
            state.currentMood = todayMood.mood;
          }
        }
      },
    }
  )
);




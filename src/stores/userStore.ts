import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Получить день подписки (1-30) на основе даты начала подписки
const getSubscriptionDay = (subscriptionStartDate: string | null): number => {
  if (!subscriptionStartDate) {
    // Если подписки нет, возвращаем день месяца
    return new Date().getDate();
  }
  
  const startDate = new Date(subscriptionStartDate);
  const today = new Date();
  
  // Вычисляем разницу в днях
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 потому что первый день = день 1
  
  // Всегда используем цикл 1-30 (независимо от количества дней в месяце начала подписки)
  // Если день больше 30, используем цикл
  if (diffDays > 30) {
    return ((diffDays - 1) % 30) + 1;
  }
  
  return diffDays;
};

// Проверить, являются ли две даты последовательными днями
const areConsecutiveDays = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

// Проверить, является ли дата сегодняшней
const isToday = (dateStr: string): boolean => {
  return dateStr === getDateKey();
};

// Проверить, является ли дата вчерашней
const isYesterday = (dateStr: string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
  return dateStr === yesterdayStr;
};

export interface UserState {
  // Данные профиля
  name: string;
  email: string;
  
  // Даты посещений (уникальные дни)
  visitDates: string[];
  
  // Последняя дата посещения
  lastVisitDate: string | null;
  
  // Дата начала подписки (YYYY-MM-DD)
  subscriptionStartDate: string | null;
  
  // Настройки
  notifications: boolean;
  
  // Методы
  setProfile: (name: string, email: string) => void;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  setNotifications: (enabled: boolean) => void;
  recordVisit: () => void;
  getStreak: () => number;
  getTotalVisits: () => number;
  getVisitDates: () => string[];
  getDayOfYear: () => number;
  setSubscriptionStartDate: (date: string) => void;
  getSubscriptionDay: () => number; // День подписки (1-30/31/28)
  getSubscriptionDayOfMonth: () => number; // День подписки в месяце (1-30/31/28)
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: '',
      email: '',
      visitDates: [],
      lastVisitDate: null,
      subscriptionStartDate: null,
      notifications: true,

      setProfile: (name: string, email: string) => {
        set({ name, email });
      },

      updateName: (name: string) => {
        set({ name });
      },

      updateEmail: (email: string) => {
        set({ email });
      },

      setNotifications: (enabled: boolean) => {
        set({ notifications: enabled });
      },

      setSubscriptionStartDate: (date: string) => {
        set({ subscriptionStartDate: date });
      },

      getSubscriptionDay: () => {
        const { subscriptionStartDate } = get();
        return getSubscriptionDay(subscriptionStartDate);
      },

      getSubscriptionDayOfMonth: () => {
        const { subscriptionStartDate } = get();
        if (!subscriptionStartDate) {
          return new Date().getDate();
        }
        return getSubscriptionDay(subscriptionStartDate);
      },

      recordVisit: () => {
        const today = getDateKey();
        const state = get();
        
        // Если уже записали визит сегодня, ничего не делаем
        if (state.visitDates.includes(today)) {
          // Но обновляем lastVisitDate на случай если это первый визит после загрузки
          if (state.lastVisitDate !== today) {
            set({ lastVisitDate: today });
          }
          return;
        }
        
        // Добавляем сегодняшнюю дату
        set({
          visitDates: [...state.visitDates, today],
          lastVisitDate: today,
        });
      },

      getStreak: () => {
        const state = get();
        const visits = [...state.visitDates].sort().reverse(); // Сортируем по убыванию
        
        if (visits.length === 0) {
          return 0;
        }
        
        const today = getDateKey();
        const latestVisit = visits[0];
        
        // Если последний визит не сегодня и не вчера, streak = 0
        if (!isToday(latestVisit) && !isYesterday(latestVisit)) {
          return 0;
        }
        
        // Считаем streak
        let streak = 1;
        let currentDate = latestVisit;
        
        for (let i = 1; i < visits.length; i++) {
          const prevDate = visits[i];
          
          if (areConsecutiveDays(prevDate, currentDate)) {
            streak++;
            currentDate = prevDate;
          } else if (prevDate === currentDate) {
            // Дубликат даты, пропускаем
            continue;
          } else {
            // Разрыв в днях, streak закончен
            break;
          }
        }
        
        return streak;
      },

      getTotalVisits: () => {
        return get().visitDates.length;
      },

      getVisitDates: () => {
        return get().visitDates;
      },

      getDayOfYear: () => {
        return getDayOfYear();
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        visitDates: state.visitDates,
        lastVisitDate: state.lastVisitDate,
        subscriptionStartDate: state.subscriptionStartDate,
        notifications: state.notifications,
      }),
    }
  )
);

// Хелпер для получения дня года (экспорт для других модулей)
export { getDayOfYear, getDateKey };


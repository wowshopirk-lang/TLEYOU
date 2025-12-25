import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CalendarEventType = 'practice' | 'card' | 'journal' | 'test' | 'playlist' | 'mood';

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  type: CalendarEventType;
  eventId: string;
  title: string;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

interface CalendarState {
  events: CalendarEvent[];
  
  // Методы
  addEvent: (event: Omit<CalendarEvent, 'id' | 'timestamp'>) => void;
  getEventsByDate: (date: string) => CalendarEvent[];
  getEventsByMonth: (year: number, month: number) => CalendarEvent[];
  getEventsByType: (type: CalendarEventType) => CalendarEvent[];
  hasEventsOnDate: (date: string) => boolean;
  getEventsCount: () => number;
  removeEvent: (id: string) => void;
}

// Получить дату в формате YYYY-MM-DD
const getDateKey = (date?: Date) => {
  const d = date || new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [],

      addEvent: (eventData) => {
        const newEvent: CalendarEvent = {
          id: `${eventData.type}-${eventData.eventId}-${Date.now()}`,
          timestamp: Date.now(),
          ...eventData,
        };
        
        set({
          events: [...get().events, newEvent],
        });
      },

      getEventsByDate: (date: string) => {
        return get().events.filter((e) => e.date === date);
      },

      getEventsByMonth: (year: number, month: number) => {
        const monthStr = String(month + 1).padStart(2, '0');
        const prefix = `${year}-${monthStr}`;
        return get().events.filter((e) => e.date.startsWith(prefix));
      },

      getEventsByType: (type: CalendarEventType) => {
        return get().events.filter((e) => e.type === type);
      },

      hasEventsOnDate: (date: string) => {
        return get().events.some((e) => e.date === date);
      },

      getEventsCount: () => {
        return get().events.length;
      },

      removeEvent: (id: string) => {
        set({
          events: get().events.filter((e) => e.id !== id),
        });
      },
    }),
    {
      name: 'calendar-storage',
      partialize: (state) => ({
        events: state.events,
      }),
    }
  )
);

export { getDateKey };




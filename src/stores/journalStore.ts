import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  id: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
  mood: { emoji: string; label: string; color: string };
  text: string;
  tags: string[];
}

interface JournalState {
  entries: JournalEntry[];
  
  // Методы
  addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  getEntries: () => JournalEntry[];
  getEntriesCount: () => number;
  deleteEntry: (id: number) => void;
}

// Получить дату в формате YYYY-MM-DD
const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entryData) => {
        const newEntry: JournalEntry = {
          id: Date.now(),
          timestamp: Date.now(),
          ...entryData,
        };
        
        set({
          entries: [newEntry, ...get().entries],
        });
      },

      getEntries: () => {
        return get().entries;
      },

      getEntriesCount: () => {
        return get().entries.length;
      },

      deleteEntry: (id: number) => {
        set({
          entries: get().entries.filter((e) => e.id !== id),
        });
      },
    }),
    {
      name: 'journal-storage',
      partialize: (state) => ({
        entries: state.entries,
      }),
    }
  )
);


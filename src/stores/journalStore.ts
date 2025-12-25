import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  id: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
  mood: { icon: string; label: string; color: string; emoji?: string }; // emoji для обратной совместимости
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

// Маппинг старых эмодзи на новые иконки
const emojiToIconMap: Record<string, string> = {
  "😊": "LightIcon",
  "😌": "BalanceIcon",
  "😐": "MindIcon",
  "😔": "RelaxIcon",
  "😤": "LabyrinthIcon",
  "🥰": "LightIcon",
  "😴": "RelaxIcon",
  "🤔": "LabyrinthIcon",
};

// Миграция старых записей
const migrateEntry = (entry: any): JournalEntry => {
  if (entry.mood.emoji && !entry.mood.icon) {
    // Старая запись с emoji - конвертируем в icon
    const icon = emojiToIconMap[entry.mood.emoji] || "MindIcon";
    return {
      ...entry,
      mood: {
        ...entry.mood,
        icon,
      },
    };
  }
  return entry as JournalEntry;
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
        // Мигрируем записи при получении
        const entries = get().entries;
        return entries.map(migrateEntry);
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
      onRehydrateStorage: () => (state) => {
        // Мигрируем записи при загрузке из localStorage
        if (state) {
          const migratedEntries = state.entries.map(migrateEntry);
          state.entries = migratedEntries;
        }
      },
    }
  )
);


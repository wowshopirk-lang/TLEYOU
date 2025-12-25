import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TestResult {
  id: string;
  testId: string;
  score: number;
  maxScore: number;
  resultLevel: string;
  resultText: string;
  attemptNumber: number;
  weekNumber: number;
  completedAt: string;
  timestamp: number;
}

interface TestsState {
  results: TestResult[];
  
  // Методы
  addResult: (result: Omit<TestResult, 'id' | 'timestamp' | 'weekNumber' | 'attemptNumber'>) => void;
  getResultsByTest: (testId: string) => TestResult[];
  getLatestResult: (testId: string) => TestResult | null;
  getAttemptsThisWeek: (testId: string) => number;
  canTakeTest: (testId: string) => boolean;
  getAllResults: () => TestResult[];
  getResultsCount: () => number;
}

// Получить номер недели года
const getWeekNumber = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) + 1;
};

// Получить дату в формате YYYY-MM-DD
const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export const useTestsStore = create<TestsState>()(
  persist(
    (set, get) => ({
      results: [],

      addResult: (resultData) => {
        const state = get();
        const weekNumber = getWeekNumber();
        
        // Подсчитываем номер попытки для этого теста на этой неделе
        const attemptsThisWeek = state.results.filter(
          (r) => r.testId === resultData.testId && r.weekNumber === weekNumber
        ).length;
        
        const newResult: TestResult = {
          ...resultData,
          id: `${resultData.testId}-${Date.now()}`,
          timestamp: Date.now(),
          weekNumber,
          attemptNumber: attemptsThisWeek + 1,
        };
        
        set({
          results: [...state.results, newResult],
        });
      },

      getResultsByTest: (testId: string) => {
        return get().results
          .filter((r) => r.testId === testId)
          .sort((a, b) => b.timestamp - a.timestamp);
      },

      getLatestResult: (testId: string) => {
        const results = get().getResultsByTest(testId);
        return results.length > 0 ? results[0] : null;
      },

      getAttemptsThisWeek: (testId: string) => {
        const weekNumber = getWeekNumber();
        return get().results.filter(
          (r) => r.testId === testId && r.weekNumber === weekNumber
        ).length;
      },

      canTakeTest: (testId: string) => {
        const attempts = get().getAttemptsThisWeek(testId);
        return attempts < 2; // Максимум 2 попытки в неделю
      },

      getAllResults: () => {
        return get().results.sort((a, b) => b.timestamp - a.timestamp);
      },

      getResultsCount: () => {
        return get().results.length;
      },
    }),
    {
      name: 'tests-storage',
      partialize: (state) => ({
        results: state.results,
      }),
    }
  )
);

export { getWeekNumber };


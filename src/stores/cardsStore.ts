import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cards as allCards } from '@/data/cards';

export interface OpenedCard {
  cardId: number;
  dateOpened: string; // YYYY-MM-DD
  timestamp: number;
}

interface CardsState {
  // Открытые карточки (с датами)
  openedCards: OpenedCard[];
  
  // Текущая карточка дня
  todayCardDate: string | null;
  todayCardId: number | null;
  
  // Методы
  getTodayCard: () => { cardId: number; isOpened: boolean; canOpen: boolean };
  openTodayCard: () => boolean;
  isCardOpened: (cardId: number) => boolean;
  canOpenCard: (cardId: number) => boolean;
  getOpenedCardsData: () => OpenedCard[];
  getCardOpenDate: (cardId: number) => string | null;
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

// Вычислить ID карточки для конкретного дня
const getCardIdForDay = (dayOffset = 0): number => {
  const dayOfYear = getDayOfYear() + dayOffset;
  // Карточки 1-30 (ID 1-30)
  const cardIndex = ((dayOfYear - 1) % allCards.length);
  return allCards[cardIndex].id;
};

export const useCardsStore = create<CardsState>()(
  persist(
    (set, get) => ({
      openedCards: [],
      todayCardDate: null,
      todayCardId: null,

      getTodayCard: () => {
        const dateKey = getDateKey();
        const state = get();
        
        // Определяем карточку дня
        let todayCardId: number;
        
        if (state.todayCardDate === dateKey && state.todayCardId !== null) {
          // Карточка уже определена на сегодня
          todayCardId = state.todayCardId;
        } else {
          // Вычисляем новую карточку
          todayCardId = getCardIdForDay();
          
          // Сохраняем
          set({
            todayCardDate: dateKey,
            todayCardId: todayCardId,
          });
        }
        
        // Проверяем, открыта ли она
        const isOpened = state.openedCards.some(
          (c) => c.cardId === todayCardId && c.dateOpened === dateKey
        );
        
        return {
          cardId: todayCardId,
          isOpened,
          canOpen: !isOpened, // Можно открыть если ещё не открыта
        };
      },

      openTodayCard: () => {
        const dateKey = getDateKey();
        const state = get();
        const todayCard = state.getTodayCard();
        
        // Проверяем, не открыта ли уже
        if (todayCard.isOpened) {
          return false;
        }
        
        // Открываем карточку
        const newOpenedCard: OpenedCard = {
          cardId: todayCard.cardId,
          dateOpened: dateKey,
          timestamp: Date.now(),
        };
        
        set({
          openedCards: [...state.openedCards, newOpenedCard],
        });
        
        return true;
      },

      isCardOpened: (cardId: number) => {
        const { openedCards } = get();
        return openedCards.some((c) => c.cardId === cardId);
      },

      canOpenCard: (cardId: number) => {
        const state = get();
        const todayCard = state.getTodayCard();
        
        // Можно открыть только сегодняшнюю карточку
        if (cardId !== todayCard.cardId) {
          return false;
        }
        
        // И только если она ещё не открыта
        return !todayCard.isOpened;
      },

      getOpenedCardsData: () => {
        return get().openedCards;
      },

      getCardOpenDate: (cardId: number) => {
        const { openedCards } = get();
        const card = openedCards.find((c) => c.cardId === cardId);
        return card ? card.dateOpened : null;
      },
    }),
    {
      name: 'cards-storage',
      partialize: (state) => ({
        openedCards: state.openedCards,
        todayCardDate: state.todayCardDate,
        todayCardId: state.todayCardId,
      }),
    }
  )
);

// Хелпер для форматирования даты
export const formatCardDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};


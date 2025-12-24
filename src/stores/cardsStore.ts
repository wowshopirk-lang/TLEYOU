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
  
  // Методы
  getTodayCard: () => { cardId: number; isOpened: boolean; canOpen: boolean };
  openTodayCard: () => boolean;
  isCardOpened: (cardId: number) => boolean;
  canOpenCard: (cardId: number) => boolean;
  getOpenedCardsData: () => OpenedCard[];
  getCardOpenDate: (cardId: number) => string | null;
  getDayOfMonth: () => number;
}

// Получить дату в формате YYYY-MM-DD
const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Получить день месяца (1-31)
const getDayOfMonth = (): number => {
  return new Date().getDate();
};

// Карточка дня = день месяца (1-30, с циклом)
const getTodayCardId = (): number => {
  const day = getDayOfMonth();
  // Если день > 30, берём остаток (31 -> 1)
  const cardId = day > 30 ? day - 30 : day;
  return cardId;
};

export const useCardsStore = create<CardsState>()(
  persist(
    (set, get) => ({
      openedCards: [],

      getDayOfMonth: () => getDayOfMonth(),

      getTodayCard: () => {
        const dateKey = getDateKey();
        const todayCardId = getTodayCardId();
        const state = get();
        
        // Проверяем, открыта ли карточка сегодня
        const isOpened = state.openedCards.some(
          (c) => c.cardId === todayCardId && c.dateOpened === dateKey
        );
        
        return {
          cardId: todayCardId,
          isOpened,
          canOpen: !isOpened,
        };
      },

      openTodayCard: () => {
        const dateKey = getDateKey();
        const state = get();
        const todayCard = state.getTodayCard();
        
        // Проверяем, не открыта ли уже сегодня
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
      }),
    }
  )
);

// Хелпер для форматирования даты
export const formatCardDate = (dateString: string): string => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

// Получить название дня недели
export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', { weekday: 'short' });
};

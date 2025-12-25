// Функция для очистки всех данных пользователя из localStorage
export const clearUserData = () => {
  if (typeof window === 'undefined') return;
  
  // Список всех ключей stores, которые нужно очистить
  const storeKeys = [
    'journal-storage',
    'mood-storage',
    'cards-storage',
    'calendar-storage',
    'practices-storage',
    'playlist-storage',
    'tests-storage',
    'user-storage',
  ];
  
  storeKeys.forEach(key => {
    localStorage.removeItem(key);
  });
};

// Получить текущий ID пользователя
export const getCurrentUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('currentUserId');
};

// Получить данные пользователя
export const getUserData = (): { id?: string; name?: string; email?: string } | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};




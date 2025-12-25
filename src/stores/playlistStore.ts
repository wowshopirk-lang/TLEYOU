import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlaylistState {
  // Избранные треки
  favoriteTracks: string[];
  
  // Текущий трек
  currentTrackId: string | null;
  
  // Состояние воспроизведения
  isPlaying: boolean;
  
  // Прогресс воспроизведения (0-100)
  progress: number;
  
  // Громкость (0-1)
  volume: number;
  
  // Методы
  addToFavorites: (trackId: string) => void;
  removeFromFavorites: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  getFavoriteTracks: () => string[];
  
  setCurrentTrack: (trackId: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  
  togglePlay: () => void;
  stop: () => void;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      favoriteTracks: [],
      currentTrackId: null,
      isPlaying: false,
      progress: 0,
      volume: 0.7,

      addToFavorites: (trackId: string) => {
        const state = get();
        if (!state.favoriteTracks.includes(trackId)) {
          set({
            favoriteTracks: [...state.favoriteTracks, trackId],
          });
        }
      },

      removeFromFavorites: (trackId: string) => {
        set({
          favoriteTracks: get().favoriteTracks.filter((id) => id !== trackId),
        });
      },

      isFavorite: (trackId: string) => {
        return get().favoriteTracks.includes(trackId);
      },

      getFavoriteTracks: () => {
        return get().favoriteTracks;
      },

      setCurrentTrack: (trackId: string | null) => {
        set({
          currentTrackId: trackId,
          progress: 0,
        });
      },

      setIsPlaying: (isPlaying: boolean) => {
        set({ isPlaying });
      },

      setProgress: (progress: number) => {
        set({ progress });
      },

      setVolume: (volume: number) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },

      togglePlay: () => {
        set({ isPlaying: !get().isPlaying });
      },

      stop: () => {
        set({
          isPlaying: false,
          progress: 0,
          currentTrackId: null,
        });
      },
    }),
    {
      name: 'playlist-storage',
      partialize: (state) => ({
        favoriteTracks: state.favoriteTracks,
        volume: state.volume,
      }),
    }
  )
);




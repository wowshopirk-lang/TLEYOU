"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Track, TrackCategory, getTracksForCurrentWeek, getTracksByCategory } from "@/data/playlist";
import { usePlaylistStore } from "@/stores/playlistStore";
import { useCalendarStore, getDateKey } from "@/stores/calendarStore";

// Icons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 20 C9 17, 4 13, 4 9 C4 6, 6 4, 9 4 C10.5 4, 11.5 5, 12 6 C12.5 5, 13.5 4, 15 4 C18 4, 20 6, 20 9 C20 13, 15 17, 12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

const categoryLabels: Record<TrackCategory, string> = {
  meditation: "Медитация",
  nature: "Природа",
  ambient: "Атмосфера",
  sleep: "Сон",
  focus: "Фокус",
};

const categoryColors: Record<TrackCategory, string> = {
  meditation: "#b49b78",
  nature: "#8fb583",
  ambient: "#7a9ebb",
  sleep: "#5f7a9e",
  focus: "#9a8fb5",
};

type TabType = "all" | "favorites";

// Track Card Component
const TrackCard = ({ 
  track, 
  delay,
  isPlaying,
  onPlay,
  onToggleFavorite,
  isFavorite: isFav
}: { 
  track: Track;
  delay: number;
  isPlaying: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className={`relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] rounded-2xl p-5 overflow-hidden hover:border-white/[0.12] transition-all duration-300 ${
        isPlaying ? 'border-[#8fb583]/50 bg-[#8fb583]/5' : ''
      }`}>
        {/* Background decoration */}
        <div className="absolute -top-8 -right-8 w-32 h-32 opacity-5">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Favorite button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all z-10 ${
            isFav
              ? 'bg-[#c49b88]/20 text-[#c49b88]'
              : 'bg-white/[0.05] text-white/30 hover:text-white/60 hover:bg-white/[0.08]'
          }`}
        >
          <div className="w-4 h-4">
            <HeartIcon filled={isFav} />
          </div>
        </button>

        <div className="relative z-10">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span 
              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${categoryColors[track.category]}15`, 
                color: categoryColors[track.category] 
              }}
            >
              {categoryLabels[track.category]}
            </span>
            <span className="text-xs text-white/30">{track.duration}</span>
          </div>

          {/* Title & Artist */}
          <h3 className="text-base font-heading font-light text-white/90 mb-1 line-clamp-1">
            {track.title}
          </h3>
          <p className="text-sm text-white/50 mb-4">{track.artist}</p>
          {track.description && (
            <p className="text-xs text-white/40 mb-4 line-clamp-2">{track.description}</p>
          )}

          {/* Play button */}
          <button
            onClick={onPlay}
            className={`w-full py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isPlaying
                ? 'bg-[#8fb583] text-white'
                : 'bg-white/[0.08] text-white/80 hover:bg-white/[0.12]'
            }`}
          >
            <div className="w-4 h-4">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
            <span className="text-sm font-medium">
              {isPlaying ? 'Пауза' : 'Слушать'}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function CabinetPlaylist() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeCategory, setActiveCategory] = useState<TrackCategory | "all">("all");
  
  const { 
    favoriteTracks, 
    currentTrackId, 
    isPlaying, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite,
    setCurrentTrack,
    setIsPlaying,
    setProgress,
    stop
  } = usePlaylistStore();
  const { addEvent } = useCalendarStore();
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get tracks based on filters
  const allTracks = getTracksForCurrentWeek();
  const filteredTracks = allTracks.filter(track => {
    if (activeTab === "favorites" && !isFavorite(track.id)) return false;
    if (activeCategory !== "all" && track.category !== activeCategory) return false;
    return true;
  });

  // Audio player handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setIsPlaying, setCurrentTrack, setProgress]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentTrackId) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackId]);

  const handlePlay = (track: Track) => {
    if (currentTrackId === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track.id);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.load();
      }
      
      // Add to calendar
      addEvent({
        date: getDateKey(),
        type: 'playlist',
        eventId: track.id,
        title: track.title,
      });
    }
  };

  const handleToggleFavorite = (trackId: string) => {
    if (isFavorite(trackId)) {
      removeFromFavorites(trackId);
    } else {
      addToFavorites(trackId);
    }
  };

  const currentTrack = allTracks.find(t => t.id === currentTrackId);

  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "Все" },
    { id: "favorites", label: "Мои сохранённые" },
  ];

  const categories: { id: TrackCategory | "all"; label: string }[] = [
    { id: "all", label: "Все" },
    { id: "meditation", label: "Медитация" },
    { id: "nature", label: "Природа" },
    { id: "ambient", label: "Атмосфера" },
    { id: "sleep", label: "Сон" },
    { id: "focus", label: "Фокус" },
  ];

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Музыка</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Плейлист для практик
        </h1>
        <p className="text-white/40 text-sm">
          Музыка, звуки природы и атмосферные композиции для медитаций и расслабления
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-4 flex-shrink-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#8fb583]/20 text-[#8fb583] border border-[#8fb583]/30'
                : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.15]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-4 flex-shrink-0"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-white/[0.08] text-white border border-white/[0.15]'
                : 'bg-white/[0.02] border border-white/[0.05] text-white/40 hover:text-white/60 hover:border-white/[0.1]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pb-4">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              delay={index * 0.05}
              isPlaying={currentTrackId === track.id && isPlaying}
              onPlay={() => handlePlay(track)}
              onToggleFavorite={() => handleToggleFavorite(track.id)}
              isFavorite={isFavorite(track.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-white/40 mb-2">
              {activeTab === "favorites" 
                ? "У тебя пока нет избранных треков"
                : "Треки не найдены"}
            </p>
            {activeTab !== "all" && (
              <button
                onClick={() => setActiveTab("all")}
                className="text-[#8fb583] hover:underline text-sm"
              >
                Посмотреть все треки
              </button>
            )}
          </div>
        )}
      </div>

      {/* Audio Player (fixed at bottom) */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 lg:left-80 z-40 flex-shrink-0"
          >
            <div className="bg-gradient-to-r from-[#1a1d1a] to-[#0f120e] border border-white/[0.08] rounded-2xl p-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8fb583]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 text-[#8fb583]">
                    <PlayIcon />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/90 truncate">{currentTrack.title}</p>
                  <p className="text-xs text-white/40">{currentTrack.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <div className="w-5 h-5">
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      stop();
                      setCurrentTrack(null);
                    }}
                    className="text-white/40 hover:text-white/70 transition-colors"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          )}
      </AnimatePresence>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Info footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center flex-shrink-0"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-xs text-white/40">Плейлист обновляется каждую неделю</span>
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
        </div>
      </motion.div>
    </div>
  );
}




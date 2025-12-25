"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Track, TrackCategory, getTracksForCurrentWeek } from "@/data/playlist";
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

const MusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
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

// Compact Track Row Component
const TrackRow = ({ 
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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${
        isPlaying 
          ? 'bg-[#8fb583]/10 border border-[#8fb583]/30' 
          : 'bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08]'
      }`}
    >
      {/* Play Button */}
      <button
        onClick={onPlay}
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
          isPlaying
            ? 'bg-[#8fb583] text-white'
            : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.1] hover:text-white/80'
        }`}
      >
        <div className="w-4 h-4">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
      </button>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${isPlaying ? 'text-[#8fb583]' : 'text-white/80'}`}>
          {track.title}
        </h3>
        <p className="text-xs text-white/40 truncate">{track.artist}</p>
      </div>

      {/* Category Badge */}
      <span 
        className="hidden sm:inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ 
          backgroundColor: `${categoryColors[track.category]}15`, 
          color: categoryColors[track.category] 
        }}
      >
        {categoryLabels[track.category]}
      </span>

      {/* Duration */}
      <span className="text-xs text-white/30 w-12 text-right flex-shrink-0">{track.duration}</span>

      {/* Favorite Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
          isFav
            ? 'text-[#c49b88]'
            : 'text-white/20 hover:text-white/50'
        }`}
      >
        <div className="w-4 h-4">
          <HeartIcon filled={isFav} />
        </div>
      </button>
    </motion.div>
  );
};

export default function CabinetPlaylist() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeCategory, setActiveCategory] = useState<TrackCategory | "all">("all");
  
  const { 
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
    { id: "favorites", label: "Избранное" },
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Музыка</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-xl font-heading font-light text-white mb-0.5">
          Плейлист для практик
        </h1>
        <p className="text-white/40 text-xs">
          Музыка и звуки для медитаций и расслабления
        </p>
      </motion.div>

      {/* Tabs & Filters Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 mb-3 flex-shrink-0"
      >
        {/* Tabs */}
        <div className="flex gap-1.5 mr-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#8fb583]/20 text-[#8fb583] border border-[#8fb583]/30'
                  : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-white/[0.08]" />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-2.5 py-1 rounded-md text-[10px] transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-white/[0.08] text-white border border-white/[0.12]'
                  : 'bg-white/[0.02] border border-white/[0.04] text-white/30 hover:text-white/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Tracks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredTracks.length > 0 ? (
              filteredTracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  delay={index * 0.02}
                  isPlaying={currentTrackId === track.id && isPlaying}
                  onPlay={() => handlePlay(track)}
                  onToggleFavorite={() => handleToggleFavorite(track.id)}
                  isFavorite={isFavorite(track.id)}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/[0.03] flex items-center justify-center">
                    <div className="w-6 h-6 text-white/30">
                      <MusicIcon />
                    </div>
                  </div>
                  <p className="text-white/40 text-sm mb-2">
                    {activeTab === "favorites" 
                      ? "Нет избранных треков"
                      : "Треки не найдены"}
                  </p>
                  {activeTab !== "all" && (
                    <button
                      onClick={() => setActiveTab("all")}
                      className="text-[#8fb583] hover:underline text-xs"
                    >
                      Посмотреть все
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Now Playing Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex w-72 flex-shrink-0"
        >
          <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-[#8fb583]" />
              <span className="text-[10px] uppercase tracking-wider text-white/40">Сейчас играет</span>
            </div>

            {currentTrack ? (
              <div className="flex-1 flex flex-col">
                {/* Album Art Placeholder */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[#8fb583]/20 to-[#4a6741]/10 border border-white/[0.06] flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 text-[#8fb583]/60 ${isPlaying ? 'animate-pulse' : ''}`}>
                    <MusicIcon />
                  </div>
                </div>

                {/* Track Info */}
                <h3 className="text-base font-heading text-white/90 mb-1 line-clamp-2">
                  {currentTrack.title}
                </h3>
                <p className="text-sm text-white/50 mb-1">{currentTrack.artist}</p>
                <span 
                  className="inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full w-fit mb-4"
                  style={{ 
                    backgroundColor: `${categoryColors[currentTrack.category]}15`, 
                    color: categoryColors[currentTrack.category] 
                  }}
                >
                  {categoryLabels[currentTrack.category]}
                </span>

                {/* Controls */}
                <div className="mt-auto flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-[#8fb583] text-white flex items-center justify-center hover:bg-[#7aa472] transition-colors"
                  >
                    <div className="w-6 h-6">
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      stop();
                      setCurrentTrack(null);
                    }}
                    className="w-10 h-10 rounded-full bg-white/[0.05] text-white/40 flex items-center justify-center hover:bg-white/[0.1] hover:text-white/60 transition-all"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <rect x="4" y="4" width="12" height="12" rx="2" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/[0.03] flex items-center justify-center">
                    <div className="w-8 h-8 text-white/20">
                      <MusicIcon />
                    </div>
                  </div>
                  <p className="text-white/30 text-sm">Выбери трек</p>
                  <p className="text-white/20 text-xs">для воспроизведения</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Mobile Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
          >
            <div className="bg-[#1a1d1a]/95 border border-white/[0.08] rounded-2xl p-3 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-[#8fb583] text-white flex items-center justify-center flex-shrink-0"
                >
                  <div className="w-5 h-5">
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </div>
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/90 truncate">{currentTrack.title}</p>
                  <p className="text-xs text-white/40">{currentTrack.artist}</p>
                </div>
                <button
                  onClick={() => {
                    stop();
                    setCurrentTrack(null);
                  }}
                  className="text-white/40 hover:text-white/70 transition-colors p-2"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
}

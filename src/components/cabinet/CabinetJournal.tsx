"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJournalStore } from "@/stores/journalStore";
import { useCalendarStore, getDateKey } from "@/stores/calendarStore";
import { 
  LightIcon, 
  BalanceIcon, 
  MindIcon, 
  RelaxIcon, 
  LabyrinthIcon,
  CheckIcon,
  CalendarIcon
} from "@/components/icons/BrandIcons";

// Types - используем из store
import type { JournalEntry } from "@/stores/journalStore";

// Icons
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 5 L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SaveIcon = () => (
  <div className="w-full h-full">
    <CheckIcon />
  </div>
);

const moods = [
  { icon: "LightIcon", label: "Хорошо", color: "#8fb583" },
  { icon: "BalanceIcon", label: "Спокойно", color: "#7a9ebb" },
  { icon: "MindIcon", label: "Нейтрально", color: "#b49b78" },
  { icon: "RelaxIcon", label: "Устало", color: "#8b8b9a" },
  { icon: "LabyrinthIcon", label: "Тревожно", color: "#a0b5c5" },
];

const MoodIcon = ({ icon, className, color }: { icon: string; className?: string; color?: string }) => {
  const components: Record<string, any> = {
    LightIcon,
    BalanceIcon,
    MindIcon,
    RelaxIcon,
    LabyrinthIcon
  };
  const Icon = components[icon];
  return Icon ? <Icon className={className} style={{ color }} /> : null;
};

const tags = [
  "работа", "семья", "отношения", "здоровье", "отдых", 
  "творчество", "саморазвитие", "природа", "медитация", "благодарность"
];

// Sample entries
const sampleEntries: JournalEntry[] = [
  {
    id: 1,
    date: "23 декабря 2024",
    mood: moods[0],
    text: "Сегодня был прекрасный день. Утренняя практика дыхания помогла начать день с ясностью. Заметила, как много мелочей приносят радость.",
    tags: ["медитация", "благодарность"],
    timestamp: Date.now() - 86400000,
  },
  {
    id: 2,
    date: "22 декабря 2024",
    mood: moods[3],
    text: "Чувствую усталость от рабочей недели. Нужно больше времени для себя. Практика карточек помогла разобраться в мыслях.",
    tags: ["работа", "саморазвитие"],
    timestamp: Date.now() - 172800000,
  },
  {
    id: 3,
    date: "21 декабря 2024",
    mood: moods[1],
    text: "Прогулка в парке и тёплый чай. Простые радости. Вечером медитация принесла глубокий покой.",
    tags: ["природа", "отдых", "медитация"],
    timestamp: Date.now() - 259200000,
  },
];

// Mood Wheel Component - полукруг с 5 иконками
const MoodWheel = ({ selectedMood, onSelect }: { selectedMood: number | null; onSelect: (index: number) => void }) => {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Mood options arranged in a circle */}
      {moods.map((mood, index) => {
        const totalItems = moods.length;
        // Распределяем 5 иконок по кругу
        const angle = (index * (360 / totalItems)) - 90;
        const radius = 105; // Радиус для иконок
        const x = 144 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 144 + radius * Math.sin((angle * Math.PI) / 180);
        const isSelected = selectedMood === index;

        return (
          <motion.button
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: x, top: y }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(index)}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border ${
                isSelected 
                  ? 'bg-white/[0.08] border-white/20 shadow-lg shadow-black/20' 
                  : 'bg-white/[0.03] border-white/[0.05] hover:border-white/10'
              }`}
              style={{ 
                color: isSelected ? mood.color : 'rgba(255,255,255,0.4)',
              }}
            >
              <MoodIcon icon={mood.icon} className="w-8 h-8" />
            </div>
            
            {/* Постоянная подпись под иконкой */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
              <span 
                className={`text-[8px] uppercase tracking-[0.2em] transition-all duration-500 ${
                  isSelected ? 'text-white/80 scale-110' : 'text-white/15'
                }`}
                style={{ color: isSelected ? mood.color : undefined }}
              >
                {mood.label}
              </span>
            </div>
          </motion.button>
        );
      })}

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-[#1a1d1a] rounded-full w-24 h-24 flex flex-col items-center justify-center border border-white/[0.05] z-0">
          {selectedMood !== null ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              key={selectedMood}
            >
              <MoodIcon icon={moods[selectedMood].icon} className="w-8 h-8 mb-1 mx-auto" color={moods[selectedMood].color} />
              <p className="text-[10px] text-white/60 uppercase tracking-tighter">{moods[selectedMood].label}</p>
            </motion.div>
          ) : (
            <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] leading-tight px-4">
              Твоё<br/>состояние
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Format date from YYYY-MM-DD to readable format
const formatJournalDate = (dateString: string): string => {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateString;
  }
};

// Delete Icon
const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M18 6 L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6 L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Entry Card Component
const EntryCard = ({ entry, delay, onDelete }: { entry: JournalEntry; delay: number; onDelete: (id: number) => void }) => {
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* Left accent line */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-all duration-300"
        style={{ backgroundColor: `${entry.mood.color}40` }}
      />

      {/* Delete Button */}
      <AnimatePresence>
        {showDelete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Удалить эту запись?')) {
                onDelete(entry.id);
              }
            }}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/[0.05] text-white/30 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-all duration-200 z-10"
          >
            <div className="w-4 h-4">
              <DeleteIcon />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="pl-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${entry.mood.color}20` }}
            >
              {entry.mood.icon ? (
                <MoodIcon icon={entry.mood.icon} className="w-4 h-4" color={entry.mood.color} />
              ) : entry.mood.emoji ? (
                <span className="text-sm">{entry.mood.emoji}</span>
              ) : null}
            </div>
            <span className="text-sm text-white/60">{entry.mood.label}</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <div className="w-4 h-4">
              <CalendarIcon />
            </div>
            <span className="text-xs">{formatJournalDate(entry.date)}</span>
          </div>
        </div>

        {/* Text */}
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          {entry.text}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[10px] uppercase tracking-wider text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function CabinetJournal() {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [entryText, setEntryText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { entries, addEntry, deleteEntry, getEntries } = useJournalStore();
  const { addEvent } = useCalendarStore();
  
  // Получаем мигрированные записи
  const displayEntries = getEntries();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const saveEntry = () => {
    if (selectedMood === null || entryText.trim() === "") return;

    const dateKey = getDateKey();

    addEntry({
      date: dateKey,
      mood: moods[selectedMood],
      text: entryText,
      tags: selectedTags,
    });

    // Добавляем событие в календарь
    addEvent({
      date: dateKey,
      type: 'journal',
      eventId: `journal-${Date.now()}`,
      title: `Запись в дневнике: ${moods[selectedMood].label}`,
    });

    // Очищаем форму
    setIsWriting(false);
    setSelectedMood(null);
    setEntryText("");
    setSelectedTags([]);
  };

  const closeModal = () => {
    setIsWriting(false);
    setSelectedMood(null);
    setEntryText("");
    setSelectedTags([]);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#9a8fb5]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Благополучие</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
              Дневник эмоций
            </h1>
            <p className="text-white/40 text-sm">
              Записывай свои мысли и чувства каждый день
            </p>
          </div>

          {!isWriting && (
            <motion.button
              onClick={() => setIsWriting(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9a8fb5]/20 border border-[#9a8fb5]/30 text-[#9a8fb5] hover:bg-[#9a8fb5]/30 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-4 h-4">
                <PlusIcon />
              </div>
              <span className="text-sm">Новая запись</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0c0a]/95 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] border border-white/[0.08] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-60 h-60 opacity-20">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" stroke="rgba(154,143,181,0.2)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" stroke="rgba(154,143,181,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
                </svg>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M0 5 L0 0 L5 0" stroke="rgba(154,143,181,0.3)" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M11 0 L16 0 L16 5" stroke="rgba(154,143,181,0.3)" strokeWidth="1" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">Новая запись</span>
                  <button
                    onClick={closeModal}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M5 5 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Mood Selection */}
                <div className="mb-6">
                  <p className="text-sm text-white/60 mb-4 text-center">Как ты себя чувствуешь?</p>
                  <MoodWheel selectedMood={selectedMood} onSelect={setSelectedMood} />
                </div>

                {/* Text Entry - показываем только после выбора эмоции */}
                <AnimatePresence>
                  {selectedMood !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 overflow-hidden"
                    >
                      <textarea
                        value={entryText}
                        onChange={(e) => setEntryText(e.target.value)}
                        placeholder="О чём ты думаешь сегодня?"
                        className="w-full h-32 bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-white/80 placeholder-white/30 resize-none focus:outline-none focus:border-[#9a8fb5]/40 transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tags - показываем только после выбора эмоции */}
                <AnimatePresence>
                  {selectedMood !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 overflow-hidden"
                    >
                      <p className="text-xs text-white/40 mb-3">Теги (необязательно)</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                              selectedTags.includes(tag)
                                ? 'bg-[#9a8fb5]/30 border border-[#9a8fb5]/50 text-[#9a8fb5]'
                                : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:border-white/[0.15]'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Save Button - показываем только после выбора эмоции */}
                <AnimatePresence>
                  {selectedMood !== null && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      onClick={saveEntry}
                      disabled={entryText.trim() === ""}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#9a8fb5]/80 hover:bg-[#9a8fb5] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-5 h-5">
                        <SaveIcon />
                      </div>
                      <span className="font-medium">Сохранить запись</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries List */}
      <div className="space-y-4 flex-1 overflow-y-auto pb-4">
        {displayEntries.map((entry, index) => (
          <EntryCard 
            key={entry.id} 
            entry={entry} 
            delay={index * 0.1}
            onDelete={deleteEntry}
          />
        ))}
      </div>

      {/* Empty State */}
      {displayEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.03] flex items-center justify-center text-white/20">
            <MindIcon className="w-8 h-8" />
          </div>
          <p className="text-white/40">Начни вести дневник своих эмоций</p>
        </motion.div>
      )}
    </div>
  );
}


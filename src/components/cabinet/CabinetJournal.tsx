"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface JournalEntry {
  id: number;
  date: string;
  mood: { emoji: string; label: string; color: string };
  text: string;
  tags: string[];
}

// Icons
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 5 L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 10 L20 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M8 3 L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const moods = [
  { emoji: "😊", label: "Хорошо", color: "#8fb583" },
  { emoji: "😌", label: "Спокойно", color: "#7a9ebb" },
  { emoji: "😐", label: "Нейтрально", color: "#b49b78" },
  { emoji: "😔", label: "Грустно", color: "#9a8fb5" },
  { emoji: "😤", label: "Тревожно", color: "#b58f8f" },
  { emoji: "🥰", label: "Влюблённо", color: "#e89ab3" },
  { emoji: "😴", label: "Устало", color: "#8b8b9a" },
  { emoji: "🤔", label: "Задумчиво", color: "#a0b5c5" },
];

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
    tags: ["медитация", "благодарность"]
  },
  {
    id: 2,
    date: "22 декабря 2024",
    mood: moods[3],
    text: "Чувствую усталость от рабочей недели. Нужно больше времени для себя. Практика карточек помогла разобраться в мыслях.",
    tags: ["работа", "саморазвитие"]
  },
  {
    id: 3,
    date: "21 декабря 2024",
    mood: moods[1],
    text: "Прогулка в парке и тёплый чай. Простые радости. Вечером медитация принесла глубокий покой.",
    tags: ["природа", "отдых", "медитация"]
  },
];

// Mood Wheel Component
const MoodWheel = ({ selectedMood, onSelect }: { selectedMood: number | null; onSelect: (index: number) => void }) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer decorative circle */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
        <circle cx="128" cy="128" r="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="4 8" fill="none" />
      </svg>

      {/* Mood options arranged in a circle */}
      {moods.map((mood, index) => {
        const angle = (index * 360) / moods.length - 90; // Start from top
        const radius = 90;
        const x = 128 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 128 + radius * Math.sin((angle * Math.PI) / 180);
        const isSelected = selectedMood === index;

        return (
          <motion.button
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(index)}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                isSelected ? 'ring-2 ring-offset-2 ring-offset-[#0a0c0a]' : ''
              }`}
              style={{ 
                backgroundColor: isSelected ? `${mood.color}40` : 'rgba(255,255,255,0.05)',
                ...(isSelected ? { '--tw-ring-color': mood.color } : {})
              } as React.CSSProperties}
            >
              {mood.emoji}
            </div>
          </motion.button>
        );
      })}

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {selectedMood !== null ? (
            <>
              <span className="text-3xl">{moods[selectedMood].emoji}</span>
              <p className="text-sm text-white/60 mt-2">{moods[selectedMood].label}</p>
            </>
          ) : (
            <p className="text-xs text-white/40 max-w-[80px]">Выбери своё настроение</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Entry Card Component
const EntryCard = ({ entry, delay }: { entry: JournalEntry; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
  >
    {/* Left accent line */}
    <div
      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-all duration-300"
      style={{ backgroundColor: `${entry.mood.color}40` }}
    />

    <div className="pl-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${entry.mood.color}20` }}
          >
            <span className="text-sm">{entry.mood.emoji}</span>
          </div>
          <span className="text-sm text-white/60">{entry.mood.label}</span>
        </div>
        <div className="flex items-center gap-2 text-white/30">
          <div className="w-4 h-4">
            <CalendarIcon />
          </div>
          <span className="text-xs">{entry.date}</span>
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

export default function CabinetJournal() {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [entryText, setEntryText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const saveEntry = () => {
    if (selectedMood === null || entryText.trim() === "") return;

    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      mood: moods[selectedMood],
      text: entryText,
      tags: selectedTags,
    };

    setEntries([newEntry, ...entries]);
    setIsWriting(false);
    setSelectedMood(null);
    setEntryText("");
    setSelectedTags([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
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

      {/* New Entry Form */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1a1d1a] to-[#0f120e] border border-white/[0.08] overflow-hidden">
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
                    onClick={() => setIsWriting(false)}
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

                {/* Text Entry */}
                <div className="mb-6">
                  <textarea
                    value={entryText}
                    onChange={(e) => setEntryText(e.target.value)}
                    placeholder="О чём ты думаешь сегодня?"
                    className="w-full h-32 bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-white/80 placeholder-white/30 resize-none focus:outline-none focus:border-[#9a8fb5]/40 transition-colors"
                  />
                </div>

                {/* Tags */}
                <div className="mb-6">
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
                </div>

                {/* Save Button */}
                <button
                  onClick={saveEntry}
                  disabled={selectedMood === null || entryText.trim() === ""}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#9a8fb5]/80 hover:bg-[#9a8fb5] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-5 h-5">
                    <SaveIcon />
                  </div>
                  <span className="font-medium">Сохранить запись</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <EntryCard key={entry.id} entry={entry} delay={index * 0.1} />
        ))}
      </div>

      {/* Empty State */}
      {entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.03] flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-white/40">Начни вести дневник своих эмоций</p>
        </motion.div>
      )}
    </div>
  );
}


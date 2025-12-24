"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

type CharacterKey = "veles" | "mudra" | "liska" | "grey";

interface Character {
  key: CharacterKey;
  name: string;
  title: string;
  description: string;
  color: string;
  icon: React.FC<{ className?: string }>;
}

// Character Icons
const DeerIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M16 14 Q12 8, 10 4 M16 14 Q11 10, 8 8 M16 14 Q13 9, 14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M32 14 Q36 8, 38 4 M32 14 Q37 10, 40 8 M32 14 Q35 9, 34 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <ellipse cx="24" cy="26" rx="10" ry="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M14 20 Q10 17, 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M34 20 Q38 17, 36 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="24" r="1.5" fill="currentColor" />
    <circle cx="28" cy="24" r="1.5" fill="currentColor" />
    <ellipse cx="24" cy="32" rx="2.5" ry="2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const OwlIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="26" rx="12" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="30" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="22" r="2" fill="currentColor" />
    <circle cx="30" cy="22" r="2" fill="currentColor" />
    <path d="M22 30 L24 34 L26 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 12 Q18 16, 24 14 Q30 16, 34 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M16 36 Q20 40, 24 38 Q28 40, 32 36" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const FoxIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M10 14 Q14 8, 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M38 14 Q34 8, 30 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="24" cy="28" rx="12" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="19" cy="26" r="1.5" fill="currentColor" />
    <circle cx="29" cy="26" r="1.5" fill="currentColor" />
    <ellipse cx="24" cy="32" rx="2" ry="1.5" fill="currentColor" opacity="0.8" />
    <path d="M22 35 Q24 37, 26 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <path d="M14 32 Q10 36, 6 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M34 32 Q38 36, 42 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const WolfIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M12 16 Q14 6, 18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 16 Q34 6, 30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="24" cy="26" rx="11" ry="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="19" cy="24" r="1.5" fill="currentColor" />
    <circle cx="29" cy="24" r="1.5" fill="currentColor" />
    <ellipse cx="24" cy="32" rx="3" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M20 36 Q24 40, 28 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M18 20 L14 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M30 20 L34 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// Characters data
const characters: Character[] = [
  {
    key: "veles",
    name: "Велес",
    title: "Хранитель леса",
    description: "Мудрый и спокойный. Говорит философски, использует метафоры природы.",
    color: "#b49b78",
    icon: DeerIcon,
  },
  {
    key: "mudra",
    name: "Мудра",
    title: "Древняя сова",
    description: "Аналитичная и глубокая. Задаёт вопросы, помогает найти ответы внутри.",
    color: "#7a9ebb",
    icon: OwlIcon,
  },
  {
    key: "liska",
    name: "Лиска",
    title: "Рыжая лисица",
    description: "Весёлая и хитрая. Находит светлую сторону, поддерживает с юмором.",
    color: "#c47f5a",
    icon: FoxIcon,
  },
  {
    key: "grey",
    name: "Серый",
    title: "Волк-одиночка",
    description: "Прямой и сильный. Мотивирует действовать, даёт честные советы.",
    color: "#8a9a8a",
    icon: WolfIcon,
  },
];

// Quick prompts
const quickPrompts = [
  { text: "Мне грустно", emoji: "🍂" },
  { text: "Я тревожусь", emoji: "🌪️" },
  { text: "Проблемы в отношениях", emoji: "💔" },
  { text: "Нужен совет", emoji: "💭" },
];

// Typing indicator
const TypingIndicator = ({ color }: { color: string }) => (
  <div className="flex items-center gap-2 px-4 py-3">
    <span className="text-[10px] text-white/30 italic">печатает</span>
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: `${color}80` }}
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

// Message bubble
const MessageBubble = ({ message, character }: { message: Message; character: Character }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
  >
    <div className={`max-w-[85%] ${message.isBot ? "order-2" : ""}`}>
      {message.isBot && (
        <div className="flex items-center gap-2 mb-1.5">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center border"
            style={{ 
              backgroundColor: `${character.color}20`,
              borderColor: `${character.color}40`,
              color: character.color
            }}
          >
            <character.icon className="w-4 h-4" />
          </div>
          <span className="text-[10px]" style={{ color: `${character.color}90` }}>{character.name}</span>
        </div>
      )}
      <div
        className={`px-3 py-2 rounded-2xl ${
          message.isBot
            ? "bg-white/[0.04] border border-white/[0.08] text-white/85"
            : "bg-gradient-to-br from-[#8fb583]/15 to-[#4a6741]/10 border border-[#8fb583]/25 text-white/90"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
      <p className={`text-[9px] text-white/25 mt-1 ${message.isBot ? "ml-8" : "text-right"}`}>
        {message.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  </motion.div>
);

// Character selection screen
const CharacterSelect = ({ onSelect }: { onSelect: (char: CharacterKey) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center h-full p-4"
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="text-center mb-6"
    >
      <h2 className="text-xl font-heading font-light text-white mb-2">Выбери своего помощника</h2>
      <p className="text-sm text-white/40">Каждый персонаж общается в своём стиле</p>
    </motion.div>

    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {characters.map((char, i) => (
        <motion.button
          key={char.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(char.key)}
          className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] transition-all text-left group"
          style={{ 
            borderColor: `${char.color}20`,
          }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 border transition-colors"
            style={{ 
              backgroundColor: `${char.color}15`,
              borderColor: `${char.color}30`,
              color: char.color
            }}
          >
            <char.icon className="w-7 h-7" />
          </div>
          <h3 className="text-base text-white/90 font-medium mb-0.5">{char.name}</h3>
          <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: `${char.color}80` }}>{char.title}</p>
          <p className="text-xs text-white/40 leading-relaxed">{char.description}</p>
          
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ 
              boxShadow: `inset 0 0 0 1px ${char.color}40`
            }}
          />
        </motion.button>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-6 text-[10px] text-white/25 text-center"
    >
      Можно сменить персонажа в любое время
    </motion.p>
  </motion.div>
);

export default function CabinetChat() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved character from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chat-character");
    if (saved && characters.some(c => c.key === saved)) {
      setSelectedCharacter(saved as CharacterKey);
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Select character
  const handleSelectCharacter = (key: CharacterKey) => {
    setSelectedCharacter(key);
    localStorage.setItem("chat-character", key);
    
    const char = characters.find(c => c.key === key);
    if (char) {
      // Initial greeting
      const greetings: Record<CharacterKey, string> = {
        veles: "Добро пожаловать в мой уголок леса. Я Велес, хранитель этих мест. Расскажи, что привело тебя ко мне?",
        mudra: "У-ху... Я Мудра. Я вижу, ты пришла не просто так. Что тревожит твой разум?",
        liska: "Привет-привет! Я Лиска! Рада тебя видеть! Давай поболтаем — расскажи, что у тебя?",
        grey: "Я Серый. Говори прямо — зачем пришла? Я слушаю.",
      };
      
      setTimeout(() => {
        setMessages([{
          id: Date.now(),
          text: greetings[key],
          isBot: true,
          timestamp: new Date(),
        }]);
      }, 300);
    }
  };

  // Change character
  const handleChangeCharacter = () => {
    setSelectedCharacter(null);
    setMessages([]);
  };

  // Send message
  const sendMessage = async (text: string) => {
    if (!text.trim() || !selectedCharacter) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          character: selectedCharacter,
          history: messages.slice(-10),
        }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response || "Прости, я не смог ответить. Попробуй ещё раз.",
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Что-то пошло не так. Попробуй ещё раз.",
        isBot: true,
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const character = characters.find(c => c.key === selectedCharacter);

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col max-w-3xl mx-auto">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h1 className="text-xl font-heading font-light text-white">
            {character ? `Чат с ${character.name}` : "Лесная поддержка"}
          </h1>
          {character && (
            <p className="text-xs text-white/40">{character.title}</p>
          )}
        </div>
        {character && (
          <button
            onClick={handleChangeCharacter}
            className="text-xs text-white/40 hover:text-white/60 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
          >
            Сменить
          </button>
        )}
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          {!selectedCharacter ? (
            <CharacterSelect onSelect={handleSelectCharacter} />
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} character={character!} />
                ))}
                
                {isTyping && character && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center border"
                        style={{ 
                          backgroundColor: `${character.color}20`,
                          borderColor: `${character.color}40`,
                          color: character.color
                        }}
                      >
                        <character.icon className="w-4 h-4" />
                      </div>
                      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl">
                        <TypingIndicator color={character.color} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-4 py-2 border-t border-white/[0.04] flex-shrink-0">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => sendMessage(prompt.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 hover:bg-white/[0.06] hover:text-white/70 transition-all"
                    >
                      <span>{prompt.emoji}</span>
                      <span>{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/[0.04] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Напиши сообщение..."
                    className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white/80 placeholder-white/30 focus:outline-none focus:border-white/20 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: character ? `${character.color}` : '#8fb583',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5 L19 12 L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <p className="mt-2 text-center text-[9px] text-white/20 flex-shrink-0">
        AI-помощник для поддержки. Для серьёзной помощи обратись к специалисту.
      </p>
    </div>
  );
}

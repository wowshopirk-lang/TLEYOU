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

// Forest character - Wise Deer named "Велес"
const CHARACTER = {
  name: "Велес",
  title: "Хранитель леса",
  description: "Мудрый олень из древнего леса. Он видел многое и понимает, как важно иногда просто быть услышанной.",
};

// Deer SVG icon
const DeerIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Antlers */}
    <path 
      d="M20 18 Q16 10, 12 6 M20 18 Q14 14, 10 12 M20 18 Q17 12, 18 8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
      opacity="0.8"
    />
    <path 
      d="M44 18 Q48 10, 52 6 M44 18 Q50 14, 54 12 M44 18 Q47 12, 46 8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Head */}
    <ellipse cx="32" cy="32" rx="14" ry="16" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Ears */}
    <path d="M18 24 Q14 20, 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M46 24 Q50 20, 48 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="26" cy="30" r="2.5" fill="currentColor" opacity="0.9" />
    <circle cx="38" cy="30" r="2.5" fill="currentColor" opacity="0.9" />
    <circle cx="27" cy="29" r="1" fill="white" opacity="0.6" />
    <circle cx="39" cy="29" r="1" fill="white" opacity="0.6" />
    {/* Nose */}
    <ellipse cx="32" cy="42" rx="4" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="32" cy="41" r="1.5" fill="currentColor" opacity="0.6" />
    {/* Gentle smile line */}
    <path d="M28 46 Q32 48, 36 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// Predefined responses from the Deer character
const deerResponses: { [key: string]: string[] } = {
  greeting: [
    "Рад снова тебя видеть, путница. Садись у моего дерева, расскажи что на душе.",
    "Добро пожаловать в мой уголок леса. Здесь безопасно, можешь говорить свободно.",
  ],
  sad: [
    "Грусть — это как осенний дождь. Он питает землю для новых цветов. Позволь себе прочувствовать её, а потом отпустить.",
    "Я вижу печаль в твоих глазах. Знаешь, даже в самом тёмном лесу есть просветы. Давай найдём твой вместе.",
    "В лесу бывают пасмурные дни. Но за тучами всегда есть солнце. Расскажи мне больше о том, что тебя беспокоит.",
  ],
  anxiety: [
    "Тревога — это ветер, который качает деревья. Но корни крепки. Давай найдём твои корни вместе.",
    "Когда олени чувствуют опасность, мы замираем и дышим. Попробуй сделать три глубоких вдоха со мной.",
    "Я слышу беспокойство в твоих словах. Помни — ты в безопасности прямо сейчас, в этот момент.",
  ],
  tired: [
    "Усталость — знак того, что ты много сделала. Даже лес отдыхает зимой. Позволь себе паузу.",
    "Присядь на мой мох, отдохни. Иногда лучшее, что можно сделать — это просто быть.",
    "Ты много несёшь на своих плечах. Положи часть этого здесь, у корней старого дуба.",
  ],
  support: [
    "Ты не одна в этом лесу. Я здесь, рядом, и буду слушать столько, сколько нужно.",
    "Каждый шаг, который ты делаешь, важен. Даже если кажется, что ты стоишь на месте.",
    "Я горжусь тобой за то, что ты пришла поговорить. Это требует смелости.",
  ],
  general: [
    "Расскажи мне больше. В лесу нет спешки, только ты и твои мысли.",
    "Я слушаю тебя внимательно. Каждое твоё слово важно.",
    "Продолжай, я здесь. Иногда просто высказаться — это уже половина пути.",
    "Мудрость приходит, когда мы позволяем себе быть уязвимыми. Ты делаешь это правильно.",
    "В каждом из нас есть внутренний свет. Давай найдём твой вместе.",
    "Помни — ты сильнее, чем думаешь. Лес видел много штормов, но всегда оживает.",
  ],
};

// Keywords for response matching
const getResponseCategory = (text: string): keyof typeof deerResponses => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes("груст") || lowerText.includes("плач") || lowerText.includes("плохо") || lowerText.includes("тоск")) {
    return "sad";
  }
  if (lowerText.includes("тревог") || lowerText.includes("страш") || lowerText.includes("боюсь") || lowerText.includes("паник")) {
    return "anxiety";
  }
  if (lowerText.includes("устал") || lowerText.includes("сил нет") || lowerText.includes("выгор") || lowerText.includes("измот")) {
    return "tired";
  }
  if (lowerText.includes("поддерж") || lowerText.includes("помог") || lowerText.includes("поговор") || lowerText.includes("нужн")) {
    return "support";
  }
  return "general";
};

const quickPrompts = [
  { text: "Мне грустно", emoji: "🍂" },
  { text: "Я тревожусь", emoji: "🌪️" },
  { text: "Я устала", emoji: "🌙" },
  { text: "Просто поговорить", emoji: "🌿" },
];

// Animated typing indicator with forest theme
const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-3">
    <span className="text-[10px] text-white/30 italic">Велес думает</span>
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#b49b78]/60"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  </div>
);

// Message bubble component
const MessageBubble = ({ message }: { message: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
  >
    <div className={`max-w-[85%] ${message.isBot ? "order-2" : ""}`}>
      {message.isBot && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b49b78]/30 to-[#8a7355]/20 border border-[#b49b78]/30 flex items-center justify-center text-[#b49b78]">
            <DeerIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#b49b78]/90 font-medium">{CHARACTER.name}</span>
            <span className="text-[9px] text-white/30 ml-2">{CHARACTER.title}</span>
          </div>
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-2xl ${
          message.isBot
            ? "bg-gradient-to-br from-[#1a1612]/80 to-[#0f0d0a]/60 border border-[#b49b78]/20 text-white/85"
            : "bg-gradient-to-br from-[#8fb583]/15 to-[#4a6741]/10 border border-[#8fb583]/25 text-white/90"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
      <p className={`text-[10px] text-white/25 mt-1.5 ${message.isBot ? "ml-10" : "text-right"}`}>
        {message.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  </motion.div>
);

// Welcome screen component
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0a0c0a] to-[#0f0d0a] z-10"
  >
    {/* Decorative forest elements */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Trees silhouettes */}
      <svg className="absolute bottom-0 left-0 w-full h-48 opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
        <path d="M0 100 L20 40 L40 100 M30 100 L60 20 L90 100 M80 100 L110 50 L140 100" stroke="#8fb583" strokeWidth="1" fill="none" />
        <path d="M260 100 L290 30 L320 100 M310 100 L340 50 L370 100 M360 100 L390 20 L400 60 L400 100" stroke="#8fb583" strokeWidth="1" fill="none" />
      </svg>
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#b49b78]/30"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>

    {/* Character presentation */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mb-6"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[#b49b78]/10 rounded-full blur-2xl scale-150" />
      
      {/* Character avatar */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#1a1612] to-[#0f0d0a] border-2 border-[#b49b78]/40 flex items-center justify-center text-[#b49b78] shadow-lg shadow-[#b49b78]/10">
        <DeerIcon className="w-16 h-16" />
      </div>
      
      {/* Online indicator */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0a0c0a] flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#8fb583] animate-pulse" />
      </div>
    </motion.div>

    {/* Character name and title */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="text-center mb-6"
    >
      <h2 className="text-3xl font-heading font-light text-white mb-1">{CHARACTER.name}</h2>
      <p className="text-sm text-[#b49b78]/80 tracking-wide">{CHARACTER.title}</p>
    </motion.div>

    {/* Description */}
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="text-center text-white/50 text-sm max-w-sm mb-8 leading-relaxed"
    >
      {CHARACTER.description}
    </motion.p>

    {/* Purpose explanation */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 max-w-sm mb-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🌿</span>
        <span className="text-xs uppercase tracking-widest text-white/40">Когда приходить к Велесу</span>
      </div>
      <ul className="space-y-2.5 text-sm text-white/60">
        <li className="flex items-start gap-2">
          <span className="text-[#b49b78] mt-0.5">•</span>
          <span>Когда <span className="text-white/80">грустно</span> и хочется выговориться</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#b49b78] mt-0.5">•</span>
          <span>Когда <span className="text-white/80">тревожно</span> и нужно успокоиться</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#b49b78] mt-0.5">•</span>
          <span>Когда <span className="text-white/80">устала</span> и нужна поддержка</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#b49b78] mt-0.5">•</span>
          <span>Когда просто хочется <span className="text-white/80">поговорить</span></span>
        </li>
      </ul>
    </motion.div>

    {/* Start button */}
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onStart}
      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#b49b78] to-[#8a7355] text-white font-medium shadow-lg shadow-[#b49b78]/20 hover:shadow-[#b49b78]/30 transition-shadow"
    >
      Начать разговор
    </motion.button>

    {/* Gentle note */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mt-6 text-[10px] text-white/25 text-center max-w-xs"
    >
      Велес — твой цифровой друг. Для серьёзной помощи обратись к специалисту 💚
    </motion.p>
  </motion.div>
);

export default function CabinetChat() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const startChat = () => {
    setShowWelcome(false);
    // Initial greeting from Veles
    const greetings = deerResponses.greeting;
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          text: greeting,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Get appropriate response category
    const category = getResponseCategory(text);
    const responses = deerResponses[category];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate typing delay (varies by response length)
    const typingDelay = 1500 + randomResponse.length * 15 + Math.random() * 800;

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#b49b78]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Лесная поддержка</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
              Чат с Велесом
            </h1>
            <p className="text-white/40 text-sm">
              Мудрый хранитель леса выслушает и поддержит тебя
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8fb583]/10 border border-[#8fb583]/20">
            <div className="w-2 h-2 rounded-full bg-[#8fb583] animate-pulse" />
            <span className="text-xs text-[#8fb583]">В лесу</span>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex flex-col h-[calc(100%-8rem)] rounded-2xl bg-gradient-to-b from-[#0f0d0a]/50 to-[#0a0c0a]/80 border border-[#b49b78]/10 overflow-hidden"
      >
        {/* Decorative forest background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle tree pattern */}
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-5" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0 80 L15 30 L30 80 Z" fill="#8fb583" />
            <path d="M40 80 L60 15 L80 80 Z" fill="#8fb583" />
            <path d="M320 80 L345 25 L370 80 Z" fill="#8fb583" />
            <path d="M360 80 L385 40 L400 80 Z" fill="#8fb583" />
          </svg>
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b49b78]/5 rounded-full blur-3xl" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none">
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
            <path d="M0 5 L0 0 L5 0" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none">
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
            <path d="M11 0 L16 0 L16 5" stroke="rgba(180,155,120,0.3)" strokeWidth="1" />
          </svg>
        </div>

        {/* Welcome Screen */}
        <AnimatePresence>
          {showWelcome && <WelcomeScreen onStart={startChat} />}
        </AnimatePresence>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 relative z-0">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b49b78]/30 to-[#8a7355]/20 border border-[#b49b78]/30 flex items-center justify-center text-[#b49b78]">
                  <DeerIcon className="w-5 h-5" />
                </div>
                <div className="bg-gradient-to-br from-[#1a1612]/80 to-[#0f0d0a]/60 border border-[#b49b78]/20 rounded-2xl">
                  <TypingIndicator />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {!showWelcome && (
          <div className="px-4 md:px-6 py-3 border-t border-[#b49b78]/10">
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => sendMessage(prompt.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-[#b49b78]/20 text-xs text-white/50 hover:bg-[#b49b78]/10 hover:text-white/70 hover:border-[#b49b78]/30 transition-all"
                >
                  <span>{prompt.emoji}</span>
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        {!showWelcome && (
          <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-[#b49b78]/10">
            <div className="relative flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Расскажи, что у тебя на душе..."
                className="flex-1 bg-white/[0.03] border border-[#b49b78]/20 rounded-xl px-4 py-3 text-white/80 placeholder-white/30 focus:outline-none focus:border-[#b49b78]/40 focus:bg-white/[0.05] transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b49b78] to-[#8a7355] flex items-center justify-center text-white hover:from-[#c4ab88] hover:to-[#9a8365] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#b49b78]/20"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5 L19 12 L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Disclaimer */}
      {!showWelcome && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-[10px] text-white/25"
        >
          Велес — твой цифровой друг для поддержки. Для серьёзной помощи обратись к специалисту 💚
        </motion.p>
      )}
    </div>
  );
}

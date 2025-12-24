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

// Predefined responses (in real app, this would be AI-powered)
const botResponses = [
  "Я слышу тебя. Расскажи больше о том, что ты чувствуешь.",
  "Это нормально — чувствовать себя так. Давай вместе разберёмся.",
  "Ты уже делаешь важный шаг, просто говоря об этом.",
  "Помни, что каждое чувство временно. Оно пройдёт.",
  "Что бы помогло тебе почувствовать себя лучше прямо сейчас?",
  "Я здесь, чтобы поддержать тебя. Ты не одна.",
  "Попробуй сделать несколько глубоких вдохов. Это поможет успокоиться.",
  "Ты сильнее, чем думаешь. Я верю в тебя.",
];

const quickPrompts = [
  "Мне тревожно",
  "Я устала",
  "Нужна поддержка",
  "Хочу поговорить",
];

// Animated typing indicator
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-[#8fb583]/60"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
        }}
      />
    ))}
  </div>
);

// Message bubble component
const MessageBubble = ({ message, isLast }: { message: Message; isLast: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
  >
    <div className={`max-w-[80%] ${message.isBot ? "order-2" : ""}`}>
      {message.isBot && (
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8fb583]/30 to-[#4a6741]/30 flex items-center justify-center">
            <span className="text-xs">🌿</span>
          </div>
          <span className="text-[10px] text-white/40">Твой помощник</span>
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-2xl ${
          message.isBot
            ? "bg-white/[0.05] border border-white/[0.08] text-white/80"
            : "bg-gradient-to-br from-[#8fb583]/20 to-[#4a6741]/10 border border-[#8fb583]/20 text-white/90"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
      <p className={`text-[10px] text-white/30 mt-1 ${message.isBot ? "" : "text-right"}`}>
        {message.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  </motion.div>
);

export default function CabinetChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! 🌿 Я твой помощник TLEYOU. Я здесь, чтобы поддержать тебя в трудный момент. Как ты себя чувствуешь сегодня?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
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

    // Simulate bot response after delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
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
          <div className="w-1 h-1 rounded-full bg-[#7a9ebb]/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Помощь</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
              Чат поддержки
            </h1>
            <p className="text-white/40 text-sm">
              Твой заботливый AI-компаньон всегда рядом
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8fb583]/10 border border-[#8fb583]/20">
            <div className="w-2 h-2 rounded-full bg-[#8fb583] animate-pulse" />
            <span className="text-xs text-[#8fb583]">Онлайн</span>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex flex-col h-[calc(100%-8rem)] rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-60 h-60 opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="100" cy="100" r="80" stroke="rgba(122,158,187,0.2)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" stroke="rgba(143,181,131,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
          </svg>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none">
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
            <path d="M0 5 L0 0 L5 0" stroke="rgba(122,158,187,0.3)" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none">
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
            <path d="M11 0 L16 0 L16 5" stroke="rgba(122,158,187,0.3)" strokeWidth="1" />
          </svg>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isLast={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8fb583]/30 to-[#4a6741]/30 flex items-center justify-center">
                  <span className="text-xs">🌿</span>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 md:px-6 py-3 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 hover:bg-white/[0.06] hover:text-white/70 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-white/[0.04]">
          <div className="relative flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Напиши сообщение..."
              className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 placeholder-white/30 focus:outline-none focus:border-[#7a9ebb]/40 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7a9ebb]/80 to-[#5f7a9e]/80 flex items-center justify-center text-white hover:from-[#7a9ebb] hover:to-[#5f7a9e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5 L19 12 L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-[10px] text-white/30"
      >
        AI-помощник не заменяет профессиональную психологическую помощь
      </motion.p>
    </div>
  );
}



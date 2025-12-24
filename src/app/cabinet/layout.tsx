"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMoodStore, MoodKey } from "@/stores/moodStore";
import { useCardsStore } from "@/stores/cardsStore";
import { usePracticesStore } from "@/stores/practicesStore";
import { useJournalStore } from "@/stores/journalStore";

// Icons with brand-consistent design
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M12 7 L17 12 L17 17 L7 17 L7 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 17 L10 14 L14 14 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const CardsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="5" y="5" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="7" y="3" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M8 11 L14 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M8 14 L12 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const PracticeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
    <path d="M10 9 L16 12 L10 15 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
  </svg>
);

const JournalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 4 C8 4, 5 7, 5 10 C5 13, 7 15, 9 17 C10 18, 11 19, 12 21 C13 19, 14 18, 15 17 C17 15, 19 13, 19 10 C19 7, 16 4, 12 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

const MoodIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 14 C9 16, 11 17, 12 17 C13 17, 15 16, 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>
);

const TestsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12 L10 14 L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 3 C7 3, 3 7, 3 11 C3 13, 4 15, 5 16 L4 20 L8 18 C9 18.5, 10.5 19, 12 19 C17 19, 21 15, 21 11 C21 7, 17 3, 12 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="8" cy="11" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="16" cy="11" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 10 L20 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M8 3 L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 20 C6 16.69 8.69 14 12 14 C15.31 14 18 16.69 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M9 21 L5 21 C4.45 21 4 20.55 4 20 L4 4 C4 3.45 4.45 3 5 3 L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 17 L21 12 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12 L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 6 L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 12 L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 18 L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M6 6 L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 6 L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { href: "/cabinet", label: "Главная", icon: HomeIcon, category: "main" },
  { href: "/cabinet/cards", label: "Карточки", icon: CardsIcon, category: "main" },
  { href: "/cabinet/practices", label: "Практики", icon: PracticeIcon, category: "main" },
  { href: "/cabinet/journal", label: "Дневник", icon: JournalIcon, category: "wellness" },
  { href: "/cabinet/mood", label: "Настроение", icon: MoodIcon, category: "wellness" },
  { href: "/cabinet/tests", label: "Тесты", icon: TestsIcon, category: "wellness" },
  { href: "/cabinet/chat", label: "Поддержка", icon: ChatIcon, category: "support" },
  { href: "/cabinet/calendar", label: "Календарь", icon: CalendarIcon, category: "support" },
  { href: "/cabinet/profile", label: "Профиль", icon: ProfileIcon, category: "settings" },
];

const categories = {
  main: { label: "Основное", color: "#8fb583" },
  wellness: { label: "Благополучие", color: "#b49b78" },
  support: { label: "Помощь", color: "#7a9ebb" },
  settings: { label: "Настройки", color: "#a0a0a0" },
};

const encouragements = [
  "Ты молодец, что заботишься о себе!",
  "Каждый день — это новый шаг к гармонии",
  "Прекрасно, что ты здесь сегодня",
  "Ты делаешь важную работу над собой",
];

// Mood Icons
const MoodIcons = {
  radiant: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.2" opacity={isActive ? 1 : 0.4} />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={i}
          d={`M16 6 Q18 3, 16 1 Q14 3, 16 6`}
          stroke={color}
          strokeWidth="1"
          fill={isActive ? `${color}30` : "none"}
          transform={`rotate(${angle} 16 16)`}
          opacity={isActive ? 0.8 : 0.3}
        />
      ))}
      <circle cx="16" cy="16" r="2.5" fill={color} opacity={isActive ? 0.8 : 0.3} />
    </svg>
  ),
  calm: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M6 13 Q11 9, 16 13 Q21 17, 26 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 0.9 : 0.35} />
      <path d="M8 18 Q13 14, 18 18 Q23 22, 28 18" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={isActive ? 0.6 : 0.2} />
      <circle cx="24" cy="8" r="2.5" stroke={color} strokeWidth="1" fill={isActive ? `${color}20` : "none"} opacity={isActive ? 0.7 : 0.25} />
    </svg>
  ),
  balanced: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 0.8 : 0.3} />
      <circle cx="8" cy="16" r="3" stroke={color} strokeWidth="1" fill={isActive ? `${color}25` : "none"} opacity={isActive ? 0.7 : 0.3} />
      <circle cx="24" cy="16" r="3" stroke={color} strokeWidth="1" fill={isActive ? `${color}25` : "none"} opacity={isActive ? 0.7 : 0.3} />
      <path d="M16 11 L19 16 L16 21 L13 16 Z" stroke={color} strokeWidth="1" fill={isActive ? `${color}30` : "none"} opacity={isActive ? 0.8 : 0.3} />
    </svg>
  ),
  tender: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path 
        d="M16 4 Q24 9, 24 16 Q24 24, 16 28 Q8 24, 8 16 Q8 9, 16 4" 
        stroke={color} 
        strokeWidth="1.2" 
        fill={isActive ? `${color}15` : "none"} 
        opacity={isActive ? 0.8 : 0.3} 
      />
      <path d="M16 6 L16 26" stroke={color} strokeWidth="0.75" opacity={isActive ? 0.5 : 0.2} />
      <circle cx="12" cy="18" r="1.5" fill={color} opacity={isActive ? 0.6 : 0.2} />
    </svg>
  ),
  tired: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.2" opacity={isActive ? 0.6 : 0.3} />
      <path d="M10 14 L14 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 0.8 : 0.3} />
      <path d="M22 14 L18 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 0.8 : 0.3} />
      <path d="M12 20 Q16 18, 20 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={isActive ? 0.7 : 0.3} />
    </svg>
  ),
  anxious: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M8 16 Q12 10, 16 16 Q20 22, 24 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 0.9 : 0.35} />
      <path d="M10 12 Q14 8, 18 12 Q22 16, 26 12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={isActive ? 0.5 : 0.2} />
      <circle cx="16" cy="24" r="2" stroke={color} strokeWidth="1" fill={isActive ? `${color}30` : "none"} opacity={isActive ? 0.7 : 0.3} />
    </svg>
  ),
  inspired: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 4 L16 28" stroke={color} strokeWidth="1" opacity={isActive ? 0.5 : 0.2} />
      <path d="M16 8 Q20 12, 16 16 Q12 20, 16 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 0.8 : 0.35} />
      <circle cx="16" cy="6" r="2" fill={color} opacity={isActive ? 0.9 : 0.3} />
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <path
          key={i}
          d="M16 4 L17 2 L16 0 L15 2 Z"
          stroke={color}
          strokeWidth="0.5"
          fill={isActive ? `${color}40` : "none"}
          transform={`rotate(${angle} 16 16)`}
          opacity={isActive ? 0.6 : 0.2}
        />
      ))}
    </svg>
  ),
  grateful: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 8 C12 8, 8 12, 8 16 C8 22, 14 26, 16 28 C18 26, 24 22, 24 16 C24 12, 20 8, 16 8" stroke={color} strokeWidth="1.2" fill={isActive ? `${color}15` : "none"} opacity={isActive ? 0.8 : 0.3} />
      <path d="M12 14 Q14 12, 16 14 Q18 12, 20 14" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={isActive ? 0.6 : 0.25} />
      <circle cx="16" cy="18" r="1.5" fill={color} opacity={isActive ? 0.7 : 0.3} />
    </svg>
  ),
  energetic: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 4 L18 14 L28 14 L20 20 L24 30 L16 23 L8 30 L12 20 L4 14 L14 14 Z" stroke={color} strokeWidth="1.2" fill={isActive ? `${color}20` : "none"} opacity={isActive ? 0.9 : 0.35} />
      <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1" fill={isActive ? `${color}30` : "none"} opacity={isActive ? 0.7 : 0.3} />
    </svg>
  ),
  peaceful: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1" opacity={isActive ? 0.5 : 0.2} />
      <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1" opacity={isActive ? 0.7 : 0.3} />
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.2" fill={isActive ? `${color}25` : "none"} opacity={isActive ? 0.9 : 0.35} />
      <circle cx="16" cy="16" r="1.5" fill={color} opacity={isActive ? 0.8 : 0.3} />
    </svg>
  ),
  confused: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M10 10 Q16 6, 22 10 Q26 16, 22 22 Q16 26, 10 22 Q6 16, 10 10" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" fill="none" opacity={isActive ? 0.8 : 0.3} />
      <circle cx="13" cy="14" r="1.5" fill={color} opacity={isActive ? 0.7 : 0.3} />
      <circle cx="19" cy="14" r="1.5" fill={color} opacity={isActive ? 0.7 : 0.3} />
      <path d="M12 20 Q16 22, 20 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={isActive ? 0.6 : 0.25} />
    </svg>
  ),
  hopeful: (color: string, isActive: boolean) => (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 6 L16 26" stroke={color} strokeWidth="1" opacity={isActive ? 0.4 : 0.2} />
      <path d="M8 16 L24 16" stroke={color} strokeWidth="1" opacity={isActive ? 0.4 : 0.2} />
      <circle cx="16" cy="10" r="4" stroke={color} strokeWidth="1.2" fill={isActive ? `${color}20` : "none"} opacity={isActive ? 0.9 : 0.35} />
      <path d="M12 18 L16 26 L20 18" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill={isActive ? `${color}15` : "none"} opacity={isActive ? 0.7 : 0.3} />
    </svg>
  ),
};

const moods: { key: MoodKey; icon: typeof MoodIcons.radiant; label: string; color: string }[] = [
  { key: "radiant", icon: MoodIcons.radiant, label: "Отлично", color: "#8fb583" },
  { key: "calm", icon: MoodIcons.calm, label: "Спокойно", color: "#7a9ebb" },
  { key: "balanced", icon: MoodIcons.balanced, label: "Нормально", color: "#b49b78" },
  { key: "tender", icon: MoodIcons.tender, label: "Грустно", color: "#9a8fb5" },
  { key: "tired", icon: MoodIcons.tired, label: "Устала", color: "#a08090" },
  { key: "anxious", icon: MoodIcons.anxious, label: "Тревожно", color: "#c49b88" },
  { key: "inspired", icon: MoodIcons.inspired, label: "Вдохновлена", color: "#88b5a0" },
  { key: "grateful", icon: MoodIcons.grateful, label: "Благодарна", color: "#b5a888" },
  { key: "energetic", icon: MoodIcons.energetic, label: "Энергичная", color: "#e5a855" },
  { key: "peaceful", icon: MoodIcons.peaceful, label: "Умиротворена", color: "#6b9b8a" },
  { key: "confused", icon: MoodIcons.confused, label: "Растеряна", color: "#9b8b7a" },
];

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("Добрый день");
  const [encouragement, setEncouragement] = useState(encouragements[0]);
  const [userName, setUserName] = useState<string>("");
  
  // Zustand stores
  const { currentMood, setMood } = useMoodStore();
  const { openedCards } = useCardsStore();
  const { getCompletedCount } = usePracticesStore();
  const { getEntriesCount } = useJournalStore();
  
  // Real stats
  const cardsCount = openedCards.length;
  const practicesCount = getCompletedCount();
  const journalCount = getEntriesCount();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6) setGreeting("Доброй ночи");
    else if (hour < 12) setGreeting("Доброе утро");
    else if (hour < 18) setGreeting("Добрый день");
    else setGreeting("Добрый вечер");
    
    const dayOfMonth = new Date().getDate();
    setEncouragement(encouragements[dayOfMonth % encouragements.length]);

    // Get user name from localStorage
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.name && user.name.trim()) {
            setUserName(user.name.trim());
          } else if (user.email) {
            // Extract name from email if name not available
            const emailName = user.email.split('@')[0];
            setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
          }
        }
        // If no user data, userName stays empty and will show nothing
      } catch (error) {
        console.error('Error reading user data:', error);
        // Don't set default name, let it be empty
      }
    }
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        sessionStorage.clear();
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const currentCategory = navItems.find(item => item.href === pathname)?.category || "main";

  return (
    <div className="min-h-screen bg-[#0a0c0a] flex relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large decorative circle - top right */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            <circle cx="250" cy="250" r="200" stroke="rgba(143,181,131,0.03)" strokeWidth="1" />
            <circle cx="250" cy="250" r="150" stroke="rgba(143,181,131,0.02)" strokeWidth="0.5" strokeDasharray="5 10" />
            <circle cx="250" cy="250" r="100" stroke="rgba(180,155,120,0.02)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Decorative flowing line - left */}
        <motion.svg
          className="absolute left-0 top-1/4 w-16 h-[600px]"
          viewBox="0 0 60 600"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
        >
          <path
            d="M60 0 C30 80, 10 160, 30 280 C50 400, 20 500, 40 600"
            stroke="rgba(143,181,131,0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="30" cy="280" r="4" fill="rgba(143,181,131,0.08)" />
        </motion.svg>

        {/* Bottom ambient glow */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8fb583]/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#b49b78]/[0.02] rounded-full blur-[80px]" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#0f120e] to-[#0a0c0a] border-r border-white/[0.04] z-50 hidden lg:flex flex-col">
        {/* Logo area with decorative elements */}
        <div className="relative p-4 border-b border-white/[0.04] flex-shrink-0">
          {/* Corner decoration */}
          <div className="absolute top-2 left-2 w-3 h-3">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M0 5 L0 0 L5 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-3 h-3">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M11 0 L16 0 L16 5" stroke="rgba(143,181,131,0.3)" strokeWidth="1" />
            </svg>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo/tleyou-logo-white.svg"
              alt="TLEYOU"
              className="h-6 w-auto"
            />
          </Link>
          <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
            Личный кабинет
          </p>
        </div>

        {/* Navigation with categories */}
        <nav className="flex-1 py-2 px-3 flex flex-col min-h-0">
          {Object.entries(categories).map(([key, { label, color }]) => {
            const categoryItems = navItems.filter(item => item.category === key);
            if (categoryItems.length === 0) return null;

            return (
              <div key={key} className="mb-3 flex-shrink-0">
                <div className="flex items-center gap-2 px-3 mb-1.5">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: `${color}40` }}
                  />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                    {label}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {categoryItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-white/[0.05]'
                            : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Active indicator line */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        )}

                        <div className={`w-4 h-4 transition-colors duration-300 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                        }`}>
                          <Icon />
                        </div>
                        <span className={`text-xs transition-colors duration-300 ${
                          isActive ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/80'
                        }`}>
                          {item.label}
                        </span>

                        {/* Subtle dot indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeDot"
                            className="ml-auto w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Decorative divider */}
        <div className="px-4 mb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="w-1 h-1 rounded-full bg-[#8fb583]/30" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>
        </div>

        {/* Bottom section */}
        <div className="p-3 border-t border-white/[0.04] flex-shrink-0">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/30 hover:text-white/50 hover:bg-white/[0.02] transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-4 h-4 flex-shrink-0">
              <LogoutIcon />
            </div>
            <span className="text-xs">{isLoggingOut ? 'Выход...' : 'Выйти'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
      >
        <div className="w-5 h-5">
          <MenuIcon />
        </div>
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#0f120e] to-[#0a0c0a] border-r border-white/[0.04] z-50 flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <div className="w-4 h-4">
                  <CloseIcon />
                </div>
              </button>

              {/* Same content as desktop sidebar */}
              <div className="p-4 border-b border-white/[0.04] flex-shrink-0">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/images/logo/tleyou-logo-white.svg"
                    alt="TLEYOU"
                    className="h-6 w-auto"
                  />
                </Link>
                <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Личный кабинет
                </p>
              </div>

              <nav className="flex-1 py-2 px-3 flex flex-col min-h-0">
                {Object.entries(categories).map(([key, { label, color }]) => {
                  const categoryItems = navItems.filter(item => item.category === key);
                  if (categoryItems.length === 0) return null;

                  return (
                    <div key={key} className="mb-3 flex-shrink-0">
                      <div className="flex items-center gap-2 px-3 mb-1.5">
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: `${color}40` }}
                        />
                        <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                          {label}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        {categoryItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all ${
                                isActive
                                  ? 'bg-white/[0.05] text-white'
                                  : 'text-white/50 hover:bg-white/[0.02]'
                              }`}
                            >
                              <div className="w-4 h-4 flex-shrink-0">
                                <Icon />
                              </div>
                              <span className="text-xs">{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </nav>

              <div className="px-4 mb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  <div className="w-1 h-1 rounded-full bg-[#8fb583]/30" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                </div>
              </div>

              <div className="p-3 border-t border-white/[0.04] flex-shrink-0">
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/30 hover:text-white/50 transition-colors w-full"
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <LogoutIcon />
                  </div>
                  <span className="text-xs">{isLoggingOut ? 'Выход...' : 'Выйти'}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className={`flex-1 lg:ml-72 relative z-10 ${pathname === '/cabinet/chat' ? 'pb-0' : 'pb-6'}`}>
        {/* Top bar with organic styling - hidden on chat page for full screen */}
        {pathname !== '/cabinet/chat' && (
          <header className="sticky top-0 z-40 bg-[#0a0c0a]/90 backdrop-blur-xl border-b border-white/[0.04]">
            <div className="flex flex-col">
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-between px-6 lg:px-8 py-3"
              >
                {/* Left - Welcome message with user name */}
                {userName && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                          Добро пожаловать
                        </span>
                        <div className="w-1 h-1 rounded-full bg-[#8fb583]/50" />
                      </div>
                      <h1 className="text-xl lg:text-2xl font-heading font-light text-white/90 leading-tight mt-0.5">
                        {userName}
                      </h1>
                    </div>
                  </motion.div>
                )}

                {/* Center - Mini stats */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1 flex justify-center items-center"
                >
                  {/* Mini stats */}
                  <div className="hidden md:flex items-center gap-6 lg:gap-10">
                    <div className="text-center">
                      <span className="text-2xl lg:text-3xl font-heading text-[#b49b78] leading-tight">{cardsCount}</span>
                      <p className="text-xs uppercase tracking-widest text-white/30 leading-tight">карточек</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl lg:text-3xl font-heading text-[#7a9ebb] leading-tight">{practicesCount}</span>
                      <p className="text-xs uppercase tracking-widest text-white/30 leading-tight">практик</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl lg:text-3xl font-heading text-[#9a8fb5] leading-tight">{journalCount}</span>
                      <p className="text-xs uppercase tracking-widest text-white/30 leading-tight">записей</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right - Stats with encouragement */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                >
                  {/* Progress indicator */}
                  <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" fill="none" />
                      <motion.circle
                        cx="28" cy="28" r="24"
                        stroke="#8fb583"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: 150.8, strokeDashoffset: 150.8 }}
                        animate={{ strokeDashoffset: 60 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base lg:text-lg font-heading text-[#8fb583]">12</span>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="text-right">
                    <p className="text-sm lg:text-base text-white/90 font-light leading-tight">дней подряд</p>
                    <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.1em] text-white/30 mt-0.5 max-w-[140px]">
                      {encouragement}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

            {/* Mood Selector with Date Row - hidden on chat page */}
            {pathname !== '/cabinet/chat' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="px-6 lg:px-8 py-3 border-t border-white/[0.02]"
              >
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] w-full max-w-full">
                  {/* Header with question and date */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-6 bg-gradient-to-r from-transparent to-white/10" />
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Как ты сегодня?
                      </p>
                      <div className="h-px w-6 bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#8fb583]/40" />
                      <p className="text-xs text-white/30 tracking-wide">
                        {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mood options - grid layout */}
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2 lg:gap-3 w-full">
                    {moods.map((mood) => {
                      const isActive = currentMood === mood.key;
                      return (
                        <motion.button
                          key={mood.key}
                          onClick={() => setMood(mood.key)}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex flex-col items-center justify-center gap-2 p-2 lg:p-3 rounded-xl transition-all duration-300 w-full ${
                            isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <div 
                            className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 border p-2.5 lg:p-3 ${
                              isActive ? 'scale-110' : ''
                            }`}
                            style={{ 
                              backgroundColor: isActive ? `${mood.color}18` : 'transparent',
                              borderColor: isActive ? `${mood.color}50` : 'rgba(255,255,255,0.06)'
                            }}
                          >
                            {mood.icon(mood.color, isActive)}
                          </div>
                          <span className={`text-[9px] lg:text-[10px] uppercase tracking-wider whitespace-nowrap text-center ${
                            isActive ? 'text-white/80' : 'text-white/40'
                          }`}>
                            {mood.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </header>
        )}

        {/* Page content with proper padding */}
        <div className={`${pathname === '/cabinet/chat' ? 'h-screen pt-4 px-4 lg:px-6' : 'px-6 lg:px-8 py-4'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}

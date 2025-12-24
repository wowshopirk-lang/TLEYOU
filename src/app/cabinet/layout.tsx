"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <main className="flex-1 lg:ml-72 pb-6 relative z-10">
        {/* Top bar with organic styling */}
        <header className="sticky top-0 z-40 bg-[#0a0c0a]/90 backdrop-blur-xl border-b border-white/[0.04]">
          <div className="flex items-center justify-between px-6 lg:px-8 py-4">
            {/* Left side - empty for mobile (menu button is positioned absolutely) */}
            <div className="lg:hidden w-10" />

            {/* Date with decorative elements */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#8fb583]/40" />
              <p className="text-sm text-white/40 tracking-wide">
                {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <div className="w-1 h-1 rounded-full bg-[#8fb583]/40" />
            </div>

            {/* Right side - user info */}
            <div className="flex items-center gap-4">
              {/* Streak indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8fb583]/10 border border-[#8fb583]/20">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#8fb583]">
                  <path d="M8 2 L9 6 L13 6 L10 9 L11 13 L8 10 L5 13 L6 9 L3 6 L7 6 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3" />
                </svg>
                <span className="text-xs text-[#8fb583] font-medium">12 дней</span>
              </div>

              {/* User avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8fb583]/30 to-[#4a6741]/30 flex items-center justify-center border border-white/[0.08]">
                  <span className="text-sm text-white/80 font-medium">А</span>
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#8fb583] border-2 border-[#0a0c0a]" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content with proper padding */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

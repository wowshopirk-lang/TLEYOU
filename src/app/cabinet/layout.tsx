"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M3 12 L12 4 L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10 L5 19 C5 20.1 5.9 21 7 21 L17 21 C18.1 21 19 20.1 19 19 L19 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 21 L10 15 L14 15 L14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CardsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="6" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M8 10 L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M8 14 L12 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const PracticeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8 L16 12 L10 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
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

const navItems = [
  { href: "/cabinet", label: "Главная", icon: HomeIcon },
  { href: "/cabinet/cards", label: "Карточки", icon: CardsIcon },
  { href: "/cabinet/practices", label: "Практики", icon: PracticeIcon },
  { href: "/cabinet/profile", label: "Профиль", icon: ProfileIcon },
];

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Очищаем данные пользователя из localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        sessionStorage.clear();
      }
      
      // Здесь можно добавить вызов API для выхода
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      // Небольшая задержка для плавности
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Перенаправляем на главную страницу
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // В случае ошибки всё равно перенаправляем
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c0a] flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0f120e] border-r border-white/[0.06] z-50 hidden lg:block">
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-heading font-light text-white tracking-[0.1em]">TLEYOU</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#8fb583]/10 text-[#8fb583]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="w-5 h-5">
                  <Icon />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8fb583]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06]">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white/60 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-5 h-5">
              <LogoutIcon />
            </div>
            <span className="text-sm">{isLoggingOut ? 'Выход...' : 'Выйти'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f120e] border-t border-white/[0.06] z-50 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 ${
                  isActive ? 'text-[#8fb583]' : 'text-white/40'
                }`}
              >
                <div className="w-6 h-6">
                  <Icon />
                </div>
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex flex-col items-center gap-1 px-4 py-2 text-white/40 hover:text-white/60 transition-colors disabled:opacity-50"
          >
            <div className="w-6 h-6">
              <LogoutIcon />
            </div>
            <span className="text-[10px]">{isLoggingOut ? 'Выход...' : 'Выйти'}</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[#0a0c0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="lg:hidden">
              <Link href="/">
                <span className="text-lg font-heading font-light text-white tracking-[0.1em]">TLEYOU</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-white/40">
                {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#8fb583]/20 flex items-center justify-center">
                <span className="text-sm text-[#8fb583] font-medium">А</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

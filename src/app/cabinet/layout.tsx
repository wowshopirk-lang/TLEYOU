"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  Home,
  Play,
  Layers,
  User,
  Menu,
  X,
  LogOut,
  Crown,
} from "lucide-react";

const navItems = [
  { href: "/cabinet", icon: Home, label: "Главная" },
  { href: "/cabinet/practices", icon: Play, label: "Практики" },
  { href: "/cabinet/cards", icon: Layers, label: "Карточки" },
  { href: "/cabinet/profile", icon: User, label: "Профиль" },
];

export default function CabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--color-muted)] h-16 flex items-center px-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-[var(--color-charcoal)]"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="ml-4">
          <Logo variant="dark" width={100} height={33} />
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-[var(--color-muted)] transform transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[var(--color-muted)] flex items-center justify-between">
            <Logo variant="dark" width={120} height={40} />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-[var(--color-charcoal)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subscription Status */}
          <div className="p-4 mx-4 mt-4 bg-[var(--color-primary)]/10 rounded-xl">
            <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">Подписка активна</span>
            </div>
            <p className="text-xs text-[var(--color-stone)]">
              Следующее списание: 21.01.2025
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[var(--color-muted)]">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-[var(--color-stone)] hover:text-[var(--color-charcoal)] transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}


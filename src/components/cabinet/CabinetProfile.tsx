"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Icons
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 20 C6 16.69 8.69 14 12 14 C15.31 14 18 16.69 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 7 L12 13 L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 10 L8 7 C8 4.79 9.79 3 12 3 C14.21 3 16 4.79 16 7 L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M18 8 C18 4.69 15.31 2 12 2 C8.69 2 6 4.69 6 8 C6 15 3 17 3 17 L21 17 C21 17 18 15 18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.73 21 C13.56 21.34 13.3 21.63 12.98 21.83 C12.66 22.04 12.29 22.15 11.91 22.15 C11.53 22.15 11.16 22.04 10.84 21.83 C10.52 21.63 10.26 21.34 10.09 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M2 17 L5 7 L9 12 L12 4 L15 12 L19 7 L22 17 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2 17 L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 20 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Stats data
const stats = [
  { label: "Дней практики", value: "12", color: "#8fb583" },
  { label: "Карточек пройдено", value: "8", color: "#b49b78" },
  { label: "Записей в дневнике", value: "15", color: "#9a8fb5" },
  { label: "Тестов завершено", value: "3", color: "#7a9ebb" },
];

export default function CabinetProfile() {
  const [profile, setProfile] = useState({
    name: "Анна",
    email: "anna@example.com",
    notifications: true,
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Настройки</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-light text-white mb-2">
          Профиль
        </h1>
        <p className="text-white/40 text-sm">
          Управление аккаунтом и настройки
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -right-16 -top-16 w-48 h-48 opacity-20">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <circle cx="100" cy="100" r="80" stroke="rgba(143,181,131,0.2)" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" stroke="rgba(143,181,131,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8fb583]/30 to-[#4a6741]/30 flex items-center justify-center border border-white/[0.1]">
                <span className="text-3xl text-white/80 font-heading">{profile.name.charAt(0)}</span>
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#8fb583] border-2 border-[#0a0c0a]" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-heading text-white/90 mb-1">{profile.name}</h2>
              <p className="text-sm text-white/40 mb-4">{profile.email}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span 
                      className="text-lg font-heading"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-6"
      >
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#4a6741]/15 to-[#8fb583]/10 border border-[#8fb583]/20 overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M0 5 L0 0 L5 0" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 w-4 h-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
              <path d="M11 0 L16 0 L16 5" stroke="rgba(143,181,131,0.4)" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8fb583]/20 flex items-center justify-center">
                <div className="w-5 h-5 text-[#8fb583]">
                  <CrownIcon />
                </div>
              </div>
              <div>
                <span className="text-[#8fb583] font-medium">Годовая подписка</span>
                <p className="text-xs text-white/40">
                  Активна до 15 декабря 2025
                </p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl border border-[#8fb583]/30 text-[#8fb583] text-sm hover:bg-[#8fb583]/10 transition-colors">
              Управление
            </button>
          </div>
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        {/* Name */}
        <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">Имя</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30">
              <UserIcon />
            </div>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white/80 placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
            />
          </div>
        </div>

        {/* Email */}
        <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">Email</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30">
              <MailIcon />
            </div>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white/80 placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-white/40">
                <BellIcon />
              </div>
              <div>
                <p className="text-white/80 font-medium">Уведомления</p>
                <p className="text-xs text-white/40">Напоминания о практиках</p>
              </div>
            </div>
            <button
              onClick={() => setProfile({ ...profile, notifications: !profile.notifications })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                profile.notifications ? 'bg-[#8fb583]' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  profile.notifications ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-white/40">
                <LockIcon />
              </div>
              <div>
                <p className="text-white/80 font-medium">Пароль</p>
                <p className="text-xs text-white/40">••••••••</p>
              </div>
            </div>
            <button className="text-[#8fb583] text-sm hover:text-[#a0c694] transition-colors">
              Изменить
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all duration-300 ${
            isSaved
              ? 'bg-[#8fb583] text-white'
              : 'bg-[#4a6741]/80 hover:bg-[#4a6741] text-white'
          }`}
        >
          {isSaved ? (
            <>
              <div className="w-5 h-5">
                <CheckIcon />
              </div>
              <span>Сохранено</span>
            </>
          ) : (
            <span>Сохранить изменения</span>
          )}
        </button>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Icons
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 20 C6 16.69 8.69 14 12 14 C15.31 14 18 16.69 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 12 L10 17 L19 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/cabinet";
  };

  return (
    <main className="bg-[#0a0c0a] min-h-screen flex items-center justify-center py-20">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#0f120e] to-[#0a0c0a]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4a6741]/[0.06] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-heading font-light text-white tracking-[0.15em]">TLEYOU</span>
            </Link>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mt-4 mb-6" />
            <h1 className="text-xl font-heading font-light text-white mb-2">
              Создать аккаунт
            </h1>
            <p className="text-white/40 text-sm">Начните свой путь к тишине</p>
          </div>

          {/* Form */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Имя</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30">
                    <MailIcon />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Пароль</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30">
                    <LockIcon />
                  </div>
                  <input
                    type="password"
                    placeholder="Минимум 8 символов"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="py-4 space-y-2">
                {["7 дней бесплатно", "Отмена в любой момент", "Доступ ко всем практикам"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/40">
                    <div className="w-4 h-4 text-[#8fb583]"><CheckIcon /></div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Создание...</span>
                ) : (
                  <>
                    <span className="font-medium">Создать аккаунт</span>
                    <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowIcon />
                    </div>
                  </>
                )}
              </button>
            </form>

            {/* Login link */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-sm text-white/40">
              Уже есть аккаунт?{" "}
              <Link href="/auth/login" className="text-[#8fb583] hover:text-[#a0c694] font-medium transition-colors">
                Войти
              </Link>
            </div>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-white/30">
            Регистрируясь, вы соглашаетесь с{" "}
            <Link href="/terms" className="text-[#8fb583]/70 hover:text-[#8fb583]">условиями</Link>
            {" "}и{" "}
            <Link href="/privacy" className="text-[#8fb583]/70 hover:text-[#8fb583]">политикой конфиденциальности</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

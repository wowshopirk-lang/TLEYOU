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

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Get or create user data from localStorage
    // In real app, this would come from API
    let userData = localStorage.getItem('user');
    if (!userData) {
      // If no user data exists, create from email
      const name = formData.email.split('@')[0];
      userData = JSON.stringify({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: formData.email,
      });
      localStorage.setItem('user', userData);
    }
    
    localStorage.setItem('token', 'mock-token-' + Date.now());
    localStorage.setItem('auth', 'true');
    
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
              Добро пожаловать
            </h1>
            <p className="text-white/40 text-sm">Войдите в личный кабинет</p>
          </div>

          {/* Form */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none"><path d="M0 8 L0 0 L8 0" stroke="rgba(143,181,131,0.2)" strokeWidth="1" /></svg>
            </div>
            <div className="absolute top-0 right-0 w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none"><path d="M16 0 L24 0 L24 8" stroke="rgba(143,181,131,0.2)" strokeWidth="1" /></svg>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#8fb583] focus:ring-[#8fb583]/30" />
                  <span className="text-white/40">Запомнить меня</span>
                </label>
                <Link href="/auth/reset" className="text-[#8fb583] hover:text-[#a0c694] transition-colors">
                  Забыли пароль?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Вход...</span>
                ) : (
                  <>
                    <span className="font-medium">Войти</span>
                    <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowIcon />
                    </div>
                  </>
                )}
              </button>
            </form>

            {/* Register link */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-sm text-white/40">
              Нет аккаунта?{" "}
              <Link href="/auth/register" className="text-[#8fb583] hover:text-[#a0c694] font-medium transition-colors">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

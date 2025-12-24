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

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M19 12 L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 17 L5 12 L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
    <path d="M20 32 L28 40 L44 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
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
          {/* Back link */}
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors mb-8">
            <div className="w-5 h-5"><BackIcon /></div>
            <span className="text-sm">Назад к входу</span>
          </Link>

          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-heading font-light text-white tracking-[0.15em]">TLEYOU</span>
            </Link>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8fb583]/50 to-transparent mx-auto mt-4 mb-6" />
            <h1 className="text-xl font-heading font-light text-white mb-2">
              Восстановление пароля
            </h1>
            <p className="text-white/40 text-sm">Введите email для получения ссылки</p>
          </div>

          {/* Form or Success */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
            {!isSubmitted ? (
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#8fb583]/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#4a6741] text-white hover:bg-[#5a7a51] transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Отправка...</span>
                  ) : (
                    <>
                      <span className="font-medium">Отправить ссылку</span>
                      <div className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowIcon />
                      </div>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 text-[#8fb583]">
                  <CheckCircleIcon />
                </div>
                <h3 className="text-lg font-heading text-white mb-2">Письмо отправлено</h3>
                <p className="text-white/40 text-sm mb-6">
                  Проверьте почту {email} и перейдите по ссылке для восстановления пароля
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#8fb583] hover:text-[#a0c694] text-sm transition-colors"
                >
                  Отправить повторно
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

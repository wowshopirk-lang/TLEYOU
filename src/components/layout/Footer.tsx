"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";
import { TelegramIcon } from "@/components/ui/Icons";

// Arrow up icon (custom for footer)
const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 20 L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 11 L12 4 L19 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Footer() {
  const footerLinks = {
    shop: [
      { href: "/product", label: "Набор TLEYOU" },
      { href: "/subscription", label: "Подписка" },
      { href: "/card-of-day", label: "Карточка дня" },
    ],
    about: [
      { href: "/about", label: "О бренде" },
      { href: "/contacts", label: "Контакты" },
    ],
    legal: [
      { href: "/privacy", label: "Конфиденциальность" },
      { href: "/terms", label: "Оферта" },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a0c0a] text-[#a0a0a0] overflow-hidden">
      {/* Simple background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e0c] to-[#080a08]" />
        
        {/* Minimal texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8fb583]/10 to-transparent" />
        
        <div className="py-12 md:py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
            
            {/* Brand column */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5">
                <Logo variant="light" width={120} height={40} />
              </div>
              
              <p className="text-sm text-white/30 max-w-xs mb-6 leading-relaxed">
                Ритуал возвращения к себе через тишину и заботу.
              </p>
              
              {/* Social links */}
              <div className="flex gap-3">
                <a
                  href="https://t.me/tleyouself"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#8fb583]/30 hover:text-[#8fb583] transition-all duration-300"
                  aria-label="Telegram"
                >
                  <div className="w-5 h-5">
                    <TelegramIcon />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Links columns */}
            <motion.div 
              className="md:col-span-1 lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Shop */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 font-medium">
                  Магазин
                </h3>
                <ul className="space-y-2.5">
                  {footerLinks.shop.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/30 hover:text-[#8fb583] transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 font-medium">
                  О нас
                </h3>
                <ul className="space-y-2.5">
                  {footerLinks.about.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/30 hover:text-[#8fb583] transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 font-medium">
                  Информация
                </h3>
                <ul className="space-y-2.5">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/30 hover:text-[#8fb583] transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <motion.div 
          className="border-t border-white/5 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} TLEYOU. Все права защищены.
            </p>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs text-white/30 hover:text-[#8fb583] transition-colors duration-300"
              aria-label="Наверх"
            >
              <span className="uppercase tracking-wider">Наверх</span>
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#8fb583]/30 transition-all duration-300">
                <div className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <ArrowUpIcon />
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

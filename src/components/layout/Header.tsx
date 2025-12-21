"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  // Track scroll to show/hide header background
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/subscription", label: "Подписка" },
    { href: "/about", label: "О бренде" },
    { href: "/contacts", label: "Контакты" },
  ];

  const productLinks = [
    { href: "/product", label: "Набор TLEYOU" },
    { href: "/card-of-day", label: "Карточка дня" },
    { href: "/herbs", label: "Скрутки из трав" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop - appears on scroll */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          hasScrolled 
            ? "bg-[#0a0c0a]/80 backdrop-blur-lg" 
            : "bg-transparent"
        }`}
      />
      
      {/* Bottom border - thin line */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-700 ${
          hasScrolled
            ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
            : "bg-transparent"
        }`}
      />

      {/* Decorative corner elements - visible on scroll */}
      <div 
        className={`absolute top-0 left-0 w-6 h-6 transition-all duration-700 ${
          hasScrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M0 8 L0 0 L8 0" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div 
        className={`absolute top-0 right-0 w-6 h-6 transition-all duration-700 ${
          hasScrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M16 0 L24 0 L24 8" stroke="rgba(143,181,131,0.2)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      
      <Container>
        <div className="relative flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Logo variant="light" width={120} height={40} />

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {/* Главная */}
            <Link
              href="/"
              className="relative text-sm text-white/60 hover:text-white tracking-wide font-light transition-all duration-300 group"
            >
              Главная
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8fb583]/50 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Продукт with Dropdown */}
            <div 
              className="relative group" 
              ref={dropdownRef}
              onMouseEnter={() => setIsProductDropdownOpen(true)}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
            >
              <button
                className={`relative flex items-center gap-1.5 text-sm tracking-wide font-light transition-all duration-300 group ${
                  isProductDropdownOpen 
                    ? "text-white" 
                    : "text-white/60 hover:text-white"
                }`}
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              >
                Продукт
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isProductDropdownOpen ? "rotate-180" : ""
                  }`} 
                />
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8fb583]/50 group-hover:w-full transition-all duration-300" />
              </button>

              {/* Invisible bridge */}
              <div className="absolute top-full left-0 right-0 h-4" />

              {/* Dropdown Menu - Minimalist style */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 py-3 px-2 min-w-[200px] 
                  bg-[#0a0c0a]/95 backdrop-blur-xl 
                  border border-white/[0.08] rounded-xl
                  transition-all duration-300 ease-out
                  ${isProductDropdownOpen 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#8fb583]/30 to-transparent" />
                
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3">
                  <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
                    <circle cx="6" cy="6" r="5" stroke="rgba(143,181,131,0.2)" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-3 h-3">
                  <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
                    <circle cx="6" cy="6" r="5" stroke="rgba(143,181,131,0.2)" strokeWidth="0.5" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  {productLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group/item relative block px-4 py-2.5 text-sm text-white/70 hover:text-white font-light tracking-wide rounded-lg transition-all duration-200 hover:bg-white/[0.05]"
                      onClick={() => setIsProductDropdownOpen(false)}
                    >
                      {/* Hover indicator */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-[#8fb583]/50 group-hover/item:w-2 transition-all duration-200" />
                      <span className="relative z-10 pl-1 group-hover/item:pl-3 transition-all duration-200">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-white/60 hover:text-white tracking-wide font-light transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8fb583]/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Search */}
            <div className="relative hidden lg:block">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Поиск..."
                    className="w-40 px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-all font-light"
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-white/50 hover:text-white transition-colors duration-300"
                  aria-label="Поиск"
                >
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* User */}
            <Link
              href="/auth/login"
              className="hidden lg:flex p-2 text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Войти"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Меню"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white/70" strokeWidth={1.5} />
              ) : (
                <>
                  <span className="block w-6 h-px bg-white/60 rounded-full transition-all"></span>
                  <span className="block w-6 h-px bg-white/60 rounded-full transition-all"></span>
                </>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 top-20 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 visible" 
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0c0a]/98 backdrop-blur-xl" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 opacity-30">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="40" stroke="rgba(143,181,131,0.1)" strokeWidth="0.5" />
          </svg>
        </div>
        
        <Container>
          <nav className="relative flex flex-col py-8 gap-1">
            {/* Search on mobile */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/15 transition-all font-light"
                />
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center justify-between text-lg text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors font-light tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Главная
              <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
            
            {/* Products section in mobile */}
            <div className="py-4 border-b border-white/[0.06]">
              <p className="text-lg text-white/70 mb-4 font-light tracking-wide">Продукт</p>
              <div className="flex flex-col gap-1 pl-4">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-base text-white/50 hover:text-white py-2.5 transition-colors font-light"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8fb583]/40" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between text-lg text-white/70 hover:text-white py-4 border-b border-white/[0.06] transition-colors font-light tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}

            {/* Login button */}
            <Link
              href="/auth/login"
              className="mt-8 group relative flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] rounded-xl text-white/80 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M0 6 L0 0 L6 0" stroke="rgba(143,181,131,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-4 h-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                  <path d="M10 0 L16 0 L16 6" stroke="rgba(143,181,131,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>
              
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-light tracking-wide">Войти в кабинет</span>
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}

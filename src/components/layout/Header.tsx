"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X, ChevronDown, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

// Search data - все страницы и контент для поиска
const searchData = [
  { href: "/", title: "Главная", keywords: ["главная", "главная страница", "home", "тишина", "ритуал", "медитация"] },
  { href: "/product", title: "Набор TLEYOU", keywords: ["набор", "продукт", "керамика", "подставка", "скрутка", "травы", "карточки", "рефлексия", "медитация", "ритуал"] },
  { href: "/card-of-day", title: "Карточка дня", keywords: ["карточка", "карточка дня", "вопрос", "рефлексия", "самопознание", "практика", "бесплатно"] },
  { href: "/herbs", title: "Скрутки из трав", keywords: ["скрутки", "травы", "лаванда", "шалфей", "полынь", "ромашка", "мята", "розмарин", "эвкалипт", "мелисса", "валериана", "кедр", "ароматерапия"] },
  { href: "/subscription", title: "Подписка", keywords: ["подписка", "медитации", "дыхание", "практики", "ежедневно", "контент", "сообщество"] },
  { href: "/about", title: "О бренде", keywords: ["о бренде", "история", "философия", "ценности", "tleyou", "бренд"] },
  { href: "/contacts", title: "Контакты", keywords: ["контакты", "telegram", "email", "instagram", "связаться", "написать", "поддержка"] },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchData>([]);
  // На страницах без Hero показываем фон сразу
  const [hasScrolled, setHasScrolled] = useState(pathname !== '/');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

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

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = searchData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const keywordsMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(query));
      return titleMatch || keywordsMatch;
    });

    setSearchResults(results);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Don't close if clicking on search results
        if (!(event.target as HTMLElement).closest('[data-search-result]')) {
          setIsSearchOpen(false);
          setSearchQuery("");
        }
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      window.location.href = searchResults[0].href;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Track scroll to show/hide header background
  useEffect(() => {
    // Устанавливаем начальное состояние в зависимости от страницы
    const isHomePage = pathname === '/';
    if (!isHomePage) {
      setHasScrolled(true); // На страницах без Hero показываем фон сразу
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // На главной странице показываем фон после 80% высоты экрана
      if (isHomePage) {
        const heroHeight = window.innerHeight;
        setHasScrolled(scrollPosition > heroHeight * 0.8);
      } else {
        // На других страницах фон всегда виден
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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

              {/* Dropdown Menu - TLEYOU style */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 py-4 px-3 min-w-[220px] 
                  bg-gradient-to-b from-[#0c0e0c]/98 via-[#0a0c0a]/98 to-[#0c0e0c]/98
                  backdrop-blur-xl 
                  border border-white/[0.08]
                  rounded-2xl
                  shadow-2xl shadow-black/40
                  transition-all duration-300 ease-out
                  ${isProductDropdownOpen 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {/* Ambient glow */}
                <div className="absolute -inset-4 bg-gradient-to-b from-[#8fb583]/5 via-transparent to-[#4a6741]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#8fb583]/40 to-transparent" />
                
                {/* Corner decorations - organic style */}
                <div className="absolute top-1 left-1 w-4 h-4 opacity-30">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M0 8 L0 0 L8 0" stroke="rgba(143,181,131,0.5)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
                    <circle cx="4" cy="4" r="1.5" stroke="rgba(143,181,131,0.3)" strokeWidth="0.4" fill="none" />
                  </svg>
                </div>
                <div className="absolute top-1 right-1 w-4 h-4 opacity-30">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M8 0 L16 0 L16 8" stroke="rgba(143,181,131,0.5)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
                    <circle cx="12" cy="4" r="1.5" stroke="rgba(143,181,131,0.3)" strokeWidth="0.4" fill="none" />
                  </svg>
                </div>
                <div className="absolute bottom-1 left-1 w-4 h-4 opacity-30">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M0 8 L0 16 L8 16" stroke="rgba(143,181,131,0.5)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
                    <circle cx="4" cy="12" r="1.5" stroke="rgba(143,181,131,0.3)" strokeWidth="0.4" fill="none" />
                  </svg>
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 opacity-30">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M8 16 L16 16 L16 8" stroke="rgba(143,181,131,0.5)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="1.5" stroke="rgba(143,181,131,0.3)" strokeWidth="0.4" fill="none" />
                  </svg>
                </div>
                
                <div className="relative z-10 space-y-1">
                  {productLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group/item relative block px-4 py-3 text-sm text-white/70 hover:text-white font-light tracking-wide rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-white/[0.05] hover:to-white/[0.03]"
                      onClick={() => setIsProductDropdownOpen(false)}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8fb583]/0 via-[#8fb583]/5 to-[#8fb583]/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                      
                      {/* Left indicator dot */}
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#8fb583]/0 group-hover/item:bg-[#8fb583]/60 transition-all duration-200" />
                      
                      {/* Content */}
                      <span className="relative z-10 block pl-2 group-hover/item:pl-3 transition-all duration-200">
                        {link.label}
                      </span>
                      
                      {/* Bottom divider (except last item) */}
                      {index < productLinks.length - 1 && (
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                      )}
                    </Link>
                  ))}
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#8fb583]/30 to-transparent" />
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
                <div className="relative">
                  <div className="flex items-center">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Поиск..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      className="w-64 px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-all font-light"
                    />
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="ml-2 p-1.5 text-white/50 hover:text-white transition-colors duration-300"
                      aria-label="Закрыть поиск"
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  {/* Search Results */}
                  {searchQuery.trim() !== "" && (
                    <div
                      ref={searchResultsRef}
                      className="absolute top-full left-0 right-0 mt-2 py-2 bg-gradient-to-b from-[#0c0e0c]/98 via-[#0a0c0a]/98 to-[#0c0e0c]/98 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 max-h-[400px] overflow-y-auto z-50"
                    >
                      {searchResults.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.map((result, index) => (
                            <Link
                              key={result.href}
                              href={result.href}
                              data-search-result
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-all duration-200 font-light"
                            >
                              <div className="flex items-center gap-2">
                                <Search className="w-3.5 h-3.5 text-white/40" strokeWidth={1.5} />
                                <span>{result.title}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-white/40 font-light">
                          Ничего не найдено
                        </div>
                      )}
                    </div>
                  )}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/15 transition-all font-light"
                />
              </div>
              {/* Mobile Search Results */}
              {searchQuery.trim() !== "" && (
                <div className="mt-2 space-y-1 max-h-[300px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <Link
                        key={result.href}
                        href={result.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setSearchQuery("");
                        }}
                        className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-200 font-light"
                      >
                        <div className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-white/40" strokeWidth={1.5} />
                          <span>{result.title}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-center text-sm text-white/40 font-light">
                      Ничего не найдено
                    </div>
                  )}
                </div>
              )}
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

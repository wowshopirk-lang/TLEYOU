"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cards, categoryNames, categoryColors, Card } from "@/data/cards";
import { X, RotateCcw } from "lucide-react";

export default function CabinetCards() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeCategory, setActiveCategory] = useState<Card["category"] | "all">("all");

  const filteredCards =
    activeCategory === "all"
      ? cards
      : cards.filter((c) => c.category === activeCategory);

  const allCategories: (Card["category"] | "all")[] = [
    "all",
    "self",
    "feelings",
    "desires",
    "relationships",
    "future",
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-light mb-2">
          Все карточки
        </h1>
        <p className="text-[var(--color-stone)]">
          30 вопросов для путешествия к себе
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-muted)]"
            }`}
          >
            {category === "all" ? "Все" : categoryNames[category]}
          </button>
        ))}
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedCard(card)}
            className="aspect-[3/4] bg-[var(--color-primary)] rounded-xl cursor-pointer overflow-hidden group hover:scale-105 transition-transform shadow-md"
          >
            <div className="h-full flex flex-col items-center justify-center p-4 text-white">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                🌿
              </div>
              <p className="text-lg font-heading">День {card.id}</p>
              <p className="text-xs opacity-70 mt-1">
                {categoryNames[card.category]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <div className="aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-8">
                    <p className="text-2xl md:text-3xl font-heading font-light text-center text-[var(--color-charcoal)] leading-relaxed">
                      {selectedCard.question}
                    </p>
                  </div>
                  <div
                    className="p-6 border-t border-[var(--color-muted)]"
                    style={{
                      backgroundColor: `${categoryColors[selectedCard.category]}10`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-medium"
                        style={{ color: categoryColors[selectedCard.category] }}
                      >
                        {categoryNames[selectedCard.category]}
                      </span>
                      <span className="text-sm text-[var(--color-stone)]">
                        День {selectedCard.id}/30
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation hint */}
              <div className="mt-4 text-center text-white/70 text-sm">
                Нажмите за пределами карточки, чтобы закрыть
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





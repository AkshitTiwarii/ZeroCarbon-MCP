"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocCategory } from "./docs-sidebar";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  categories: DocCategory[];
  onSelect: (id: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  categories,
  onSelect,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Flatten all items with category context for easy search & keyboard navigation
  const flatItems = React.useMemo(() => {
    const list: { id: string; label: string; categoryTitle: string }[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          query === "" ||
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          cat.title.toLowerCase().includes(query.toLowerCase())
        ) {
          list.push({
            id: item.id,
            label: item.label,
            categoryTitle: cat.title,
          });
        }
      });
    });
    return list;
  }, [categories, query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on mount
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, flatItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % Math.max(1, flatItems.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems[selectedIndex]) {
          onSelect(flatItems[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose, onSelect]);

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[selectedIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0F0D]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-white/95 dark:bg-[#0c1410]/95 border border-neutral-200/80 dark:border-accent-green/20 rounded-2xl shadow-[0_24px_50px_rgba(3,36,22,0.15)] overflow-hidden z-10 mx-4 backdrop-blur-xl"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100 dark:border-white/8">
              <span className="material-symbols-outlined text-accent-green/80 dark:text-accent-green/70 text-[22px] animate-pulse">
                search
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation sections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-sm text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none font-medium font-sans"
              />
              <button 
                onClick={onClose}
                className="text-[10px] font-bold font-sans px-2 py-0.5 rounded-md border border-neutral-200 dark:border-accent-green/25 text-neutral-400 dark:text-text-muted bg-neutral-50 dark:bg-surface-container-low/40 hover:bg-neutral-100 dark:hover:bg-accent-green/10 transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>
 
            {/* Results List */}
            <div 
              ref={listRef} 
              className="max-h-[320px] overflow-y-auto p-2 space-y-0.5 scrollbar-thin"
            >
              {flatItems.length > 0 ? (
                flatItems.map((item, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelect(item.id);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-150 ${
                        isActive
                          ? "bg-accent-green/8 dark:bg-accent-green/15 text-accent-green border-l-3 border-accent-green rounded-r-xl rounded-l-none pl-3 shadow-[inset_1px_0_0_rgba(16,185,129,0.05)]"
                          : "text-neutral-600 dark:text-text-muted hover:bg-neutral-50/80 dark:hover:bg-white/5 rounded-xl"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-[18px] transition-colors ${
                          isActive ? "text-accent-green opacity-90" : "text-neutral-400 dark:text-text-muted/60"
                        }`}>
                          description
                        </span>
                        <span className="text-xs font-bold font-sans">{item.label}</span>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
                        isActive
                          ? "text-accent-green bg-accent-green/10 border-accent-green/20"
                          : "text-neutral-400 dark:text-text-muted bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200/50 dark:border-white/5"
                      }`}>
                        {item.categoryTitle}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10">
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    No results found for &ldquo;<span className="font-semibold text-text-main dark:text-white">{query}</span>&rdquo;
                  </p>
                </div>
              )}
            </div>
 
            {/* Footer info bar */}
            <div className="px-4 py-2.5 bg-neutral-50/80 dark:bg-[#080d0a]/80 border-t border-neutral-100 dark:border-white/8 flex items-center justify-between text-[9px] text-neutral-400 dark:text-text-muted font-sans select-none">
              <div className="flex gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Enter to select</span>
              </div>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

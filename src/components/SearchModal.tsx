import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

const TRENDING_SEARCHES = [
  'Aurelia Liquid Gold Lamé',
  'Festive Emerald Velvet',
  'Nocturne Party Slip',
  'Banarasi Silk Brocade',
  'Corset Gown',
  'Taffeta Evening Coat',
];

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    openProductDetail,
    formatPrice,
    setQuickViewProductId,
    setActiveView,
    setSelectedCategory,
  } = useStore();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    openProductDetail(id);
  };

  const handleSearchAll = () => {
    setIsSearchOpen(false);
    setActiveView('shop');
    setSelectedCategory('All');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative w-full max-w-3xl bg-[#111111] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Input Header */}
        <div className="p-4 sm:p-6 bg-[#0B0B0B] border-b border-[#222] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gowns, festive velvets, silk co-ords, or collections..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none font-light"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6 text-neutral-200">
          {/* Trending Searches when no query */}
          {!query.trim() && (
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block mb-3">
                Trending Atelier Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 rounded-full bg-[#181818] hover:bg-[#252525] border border-neutral-800 hover:border-[#C5A059]/40 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-2">
                <span>Matching Creations ({results.length})</span>
                <button
                  onClick={handleSearchAll}
                  className="text-[#C5A059] hover:underline flex items-center gap-1"
                >
                  <span>Explore In Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="p-3 bg-[#161616] hover:bg-[#201C12] border border-neutral-800 hover:border-[#C5A059]/50 rounded cursor-pointer transition-all flex gap-3 group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-16 aspect-[3/4] object-cover rounded bg-neutral-900 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                          {p.collection}
                        </span>
                        <h4 className="font-serif text-sm text-white group-hover:text-[#E8D3A2] line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-light line-clamp-1 mt-0.5">
                          {p.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-medium text-white">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="py-12 text-center text-neutral-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
              <p className="font-serif text-lg text-white">No creations matched "{query}"</p>
              <p className="text-xs font-light mt-1">Try searching for keywords like velvet, gown, silk, or gold.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

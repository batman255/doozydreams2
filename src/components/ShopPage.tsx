import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory, ProductOccasion } from '../types';
import { ProductCard } from './ProductCard';
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  Grid2X2,
  X,
  ChevronDown,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Gowns & Dresses',
  'Festive Stories',
  'Party Nights',
  'Co-ord Sets',
  'Silk & Velvet',
  'Tops & Blouses',
  'Outerwear',
  'Accessories & Jewelry',
];

const OCCASIONS = [
  'All',
  'Black Tie & Gala',
  'Cocktail & Soirée',
  'Festive & Celebration',
  'Resort & Vacation',
  'Bridal & Reception',
  'Modern Power & Evening',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const ShopPage: React.FC<{ initialCategory?: ProductCategory }> = ({ initialCategory }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedOccasion,
    setSelectedOccasion,
    formatPrice,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [viewCols, setViewCols] = useState<'2col' | '3col' | '4col'>('3col');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Set category if passed
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'All' && !p.occasion.includes(selectedOccasion as any)) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'All') {
        const hasSize = p.sizes.some((s) => s.size === selectedSize && s.inStock);
        if (!hasSize) return false;
      }
      // Price filter
      if (p.price > priceRange) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedOccasion, selectedSize, priceRange, sortBy, searchQuery]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedOccasion !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (priceRange < 3000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedSize('All');
    setPriceRange(3000);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3EFE6] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Haute Couture & Fine Ready-To-Wear</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#FAF7F0] tracking-tight leading-tight mb-4">
            Women's <span className="italic font-normal text-[#E8D3A2]">Collection</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Immerse yourself in our signature bespoke gowns, festive velvet ensembles, bias-cut silk sets, and soirée nightwear.
          </p>
        </div>

        {/* Category Scroll Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#222] scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C5A059] text-black font-semibold shadow-md shadow-[#C5A059]/20'
                  : 'bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] border border-[#2B2B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls Bar: Filters Summary, Sorting, Grid Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-8 bg-[#111111] p-4 rounded-lg border border-[#222]">
          {/* Left: Filter Trigger & Active Badges */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#262626] border border-neutral-700 text-xs font-mono uppercase tracking-wider rounded text-[#E8D3A2] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-[#C5A059] transition-colors ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}

            <span className="text-xs font-mono text-neutral-400 ml-auto md:ml-4">
              Showing <strong className="text-white">{filteredProducts.length}</strong> creations
            </span>
          </div>

          {/* Right: Sort & Grid View Switcher */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#181818] border border-neutral-700 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="featured">Featured Atelier Picks</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Client Acclaimed</option>
              </select>
            </div>

            {/* Grid Column Layout Switcher (Desktop) */}
            <div className="hidden sm:flex items-center border border-neutral-700 rounded bg-[#181818] p-0.5">
              <button
                onClick={() => setViewCols('2col')}
                className={`p-1.5 rounded transition-colors ${
                  viewCols === '2col' ? 'bg-[#C5A059] text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="2 Columns (Editorial Large View)"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewCols('3col')}
                className={`p-1.5 rounded transition-colors ${
                  viewCols === '3col' ? 'bg-[#C5A059] text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="3 Columns (Standard Grid)"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewCols('4col')}
                className={`p-1.5 rounded transition-colors ${
                  viewCols === '4col' ? 'bg-[#C5A059] text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="4 Columns (Dense Catalog)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#121212] border border-[#2B2B2B] rounded-lg p-6 mb-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Occasion */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-3">
                    Occasion / Soirée
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {OCCASIONS.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                          selectedOccasion === occ
                            ? 'bg-[#C5A059] text-black font-semibold'
                            : 'bg-[#1A1A1A] text-neutral-300 hover:bg-[#252525]'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-3">
                    Garment Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSize('All')}
                      className={`px-3 py-1.5 text-xs font-mono rounded ${
                        selectedSize === 'All'
                          ? 'bg-[#C5A059] text-black font-bold'
                          : 'bg-[#1A1A1A] text-neutral-300 hover:bg-[#252525]'
                      }`}
                    >
                      All Sizes
                    </button>
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-9 h-8 text-xs font-mono rounded ${
                          selectedSize === s
                            ? 'bg-[#C5A059] text-black font-bold'
                            : 'bg-[#1A1A1A] text-neutral-300 hover:bg-[#252525]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
                      Max Price
                    </h4>
                    <span className="text-xs font-mono text-white font-medium">
                      {formatPrice(priceRange)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#C5A059] bg-neutral-800"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>$500</span>
                    <span>$3,000+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 sm:gap-8 ${
              viewCols === '2col'
                ? 'grid-cols-1 md:grid-cols-2'
                : viewCols === '4col'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} viewMode={viewCols} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="py-20 text-center bg-[#111] rounded-lg border border-[#222] p-8 max-w-lg mx-auto">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl text-white mb-2">No Garments Found</h3>
            <p className="text-xs text-neutral-400 font-light mb-6">
              We could not find any creations matching your selected filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-widest rounded"
            >
              Reset Filters & View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

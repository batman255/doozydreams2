import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const FestiveStoriesView: React.FC = () => {
  const { products, setActiveView, setSelectedCategory, formatPrice } = useStore();

  const festiveProducts = products.filter((p) => p.isFestive || p.category === 'Festive Stories');

  return (
    <div className="min-h-screen bg-[#080808] text-[#FAF7F0] pb-28">
      {/* Editorial Banner */}
      <div className="relative h-[65vh] min-h-[480px] w-full overflow-hidden bg-black flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90"
          alt="Festive Stories Editorial"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.3em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Heritage Édition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-serif text-[#FDFBF7] tracking-tight font-light"
          >
            Festive <span className="italic font-normal text-[#E8D3A2]">Stories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            A regal tapestry of pure French micro-velvet, Banarasi raw silk, and hand-embroidered 24k bullion zardozi. Created for sacred celebrations and grand ceremonial evenings.
          </motion.p>
        </div>
      </div>

      {/* Craftsmanship Narrative Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-[#121212] border border-[#242424] p-6 sm:p-8 rounded-sm shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">01 · Fabric Authenticity</span>
            <h4 className="font-serif text-base text-[#FAF7F0]">Pure Mulberry & Velvet</h4>
            <p className="text-xs text-neutral-400 font-light">Heritage textiles woven by Master Artisans in Lyon & Banaras.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">02 · Bespoke Bullion Zari</span>
            <h4 className="font-serif text-base text-[#FAF7F0]">24k Gold Dipped Threads</h4>
            <p className="text-xs text-neutral-400 font-light">Over 180 hours of meticulous needlework per garment.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">03 · White-Glove Presentation</span>
            <h4 className="font-serif text-base text-[#FAF7F0]">Obsidian Velvet Case</h4>
            <p className="text-xs text-neutral-400 font-light">Insured international transit with wax-sealed certification.</p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between mb-8 border-b border-[#222] pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
            Curated Festive Silhouettes ({festiveProducts.length})
          </h2>
          <button
            onClick={() => {
              setActiveView('shop');
              setSelectedCategory('Festive Stories');
            }}
            className="text-xs font-mono uppercase tracking-wider text-[#C5A059] hover:underline flex items-center gap-1.5"
          >
            <span>Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {festiveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const PartyNightsView: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useStore();

  const partyProducts = products.filter((p) => p.isPartyNight || p.category === 'Party Nights');

  return (
    <div className="min-h-screen bg-[#070707] text-[#FAF7F0] pb-28">
      {/* Hero Banner */}
      <div className="relative h-[65vh] min-h-[480px] w-full overflow-hidden bg-black flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=90"
          alt="Party Nights Editorial"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/35 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.3em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>After-Dark Soirée Series</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-serif text-[#FDFBF7] tracking-tight font-light"
          >
            Party <span className="italic font-normal text-[#E8D3A2]">Nights</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Sculptural cutouts, micro-sequin luminescence, and liquid silk eveningwear crafted to catch ambient moonlight and chandelier radiance.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between mb-8 border-b border-[#222] pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
            Nocturnal Silhouettes ({partyProducts.length})
          </h2>
          <button
            onClick={() => {
              setActiveView('shop');
              setSelectedCategory('Party Nights');
            }}
            className="text-xs font-mono uppercase tracking-wider text-[#C5A059] hover:underline flex items-center gap-1.5"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

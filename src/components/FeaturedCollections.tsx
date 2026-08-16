import React from 'react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS_DATA } from '../data/collections';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedCollections: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  const handleCollectionClick = (collectionSlug: string) => {
    if (collectionSlug === 'festive-stories') {
      setActiveView('festive');
      setSelectedCategory('Festive Stories');
    } else if (collectionSlug === 'party-nights') {
      setActiveView('party');
      setSelectedCategory('Party Nights');
    } else if (collectionSlug === 'the-nocturne-gala') {
      setActiveView('shop');
      setSelectedCategory('Gowns & Dresses');
    } else {
      setActiveView('shop');
      setSelectedCategory('Silk & Velvet');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222222] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.2em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#FDFBF7] tracking-tight">
            The Haute Couture <span className="italic font-normal text-[#E8D3A2]">Stories</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
          Four distinct nocturnal chapters crafted with heirloom fabrics, bespoke tailoring, and timeless elegance.
        </p>
      </div>

      {/* Collections Grid - Editorial Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLLECTIONS_DATA.map((col, idx) => (
          <div
            key={col.id}
            onClick={() => handleCollectionClick(col.slug)}
            className="group cursor-pointer relative aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-[#111] border border-[#222] hover:border-[#C5A059]/60 transition-all duration-500 shadow-xl"
          >
            {/* Background Image with Hover Zoom */}
            <img
              src={col.thumbnailImage}
              alt={col.title}
              className="w-full h-full object-cover object-center brightness-[0.78] group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
              loading="lazy"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />

            {/* Top Season Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/70 border border-[#C5A059]/40 text-[#E8D3A2] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                {col.season}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end transform transition-transform duration-300">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif text-2xl text-white group-hover:text-[#E8D3A2] transition-colors tracking-wide">
                  {col.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs text-neutral-300 font-light line-clamp-2 mb-3 leading-relaxed">
                {col.subtitle}
              </p>

              {/* Quote snippet on hover */}
              <div className="border-t border-neutral-700/60 pt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <p className="text-[11px] text-[#E8D3A2] italic font-serif truncate">
                  {col.quote}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

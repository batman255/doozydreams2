import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Play, X, Shield, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSlide {
  id: string;
  badge: string;
  season: string;
  title: string;
  italicWord: string;
  description: string;
  image: string;
  ctaText: string;
  ctaView: 'shop' | 'festive' | 'party' | 'lookbook';
  category?: string;
  quote: string;
  accentColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Haute Atelier Édition Limitée',
    season: 'Autumn / Winter 2026 Couture',
    title: 'The Aurelia Liquid',
    italicWord: 'Lamé Gown',
    description: 'Sculptural Italian liquid gold lamé draped by hand over bespoke corsetry. Uncompromising nocturnal grandeur crafted for red-carpet entrances.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1800&q=90',
    ctaText: 'Discover The Gala Collection',
    ctaView: 'shop',
    category: 'Gowns & Dresses',
    quote: 'Crafted over 140 hours in our Parisian atelier.',
    accentColor: '#D4AF37'
  },
  {
    id: 'slide-2',
    badge: 'Royal Heritage Series',
    season: 'Festive Stories Collection',
    title: 'Imperial Velvet &',
    italicWord: 'Gold Bullion',
    description: 'Plush French micro-velvet steeped in deep royal emerald and ruby vermillion, illuminated by centuries-old bullion zardozi handcraft.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=90',
    ctaText: 'Explore Festive Stories',
    ctaView: 'festive',
    category: 'Festive Stories',
    quote: 'Pure Banarasi zari with authentic 24k gold dipped threads.',
    accentColor: '#C5A059'
  },
  {
    id: 'slide-3',
    badge: 'Nocturne Soirée Edit',
    season: 'Party Nights 2026',
    title: 'Electric Crystal &',
    italicWord: 'Mirrored Silk',
    description: 'Architectural boned bustiers and fluid backless slips hand-stitched with thousands of mirrored paillettes made to dominate the midnight hours.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=90',
    ctaText: 'Shop Party Nights',
    ctaView: 'party',
    category: 'Party Nights',
    quote: 'Designed for effortless movement and radiant luminescence.',
    accentColor: '#E0E0E0'
  }
];

export const HeroSlider: React.FC = () => {
  const { setActiveView, setSelectedCategory, setIsAIStylistOpen } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || isVideoModalOpen) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, isVideoModalOpen]);

  const currentSlide = HERO_SLIDES[currentIdx];

  const handleCta = (slide: HeroSlide) => {
    setActiveView(slide.ctaView);
    if (slide.category) {
      setSelectedCategory(slide.category as any);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full min-h-[90vh] lg:min-h-[94vh] bg-[#070707] overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08]"
          />
          {/* Gradient overlays for editorial text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/75 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#070707]/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          {/* Season & Badge */}
          <motion.div
            key={`badge-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A]/80 border border-[#C5A059]/40 text-[#E8D3A2] text-xs font-mono uppercase tracking-[0.2em] backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              {currentSlide.badge}
            </span>
            <span className="text-xs text-neutral-400 font-mono tracking-widest uppercase hidden sm:inline">
              {currentSlide.season}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            key={`title-${currentSlide.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-[#FAF7F0] tracking-tight leading-[1.08] mb-6"
          >
            {currentSlide.title}{' '}
            <span className="font-serif italic font-normal text-[#E8D3A2]">
              {currentSlide.italicWord}
            </span>
          </motion.h1>

          {/* Editorial Description */}
          <motion.p
            key={`desc-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8 max-w-xl font-sans"
          >
            {currentSlide.description}
          </motion.p>

          {/* Craftsmanship quote */}
          <motion.div
            key={`quote-${currentSlide.id}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="border-l-2 border-[#C5A059] pl-4 py-1 mb-10 text-xs text-[#E8D3A2] italic font-serif"
          >
            "{currentSlide.quote}"
          </motion.div>

          {/* CTA Button Group */}
          <motion.div
            key={`cta-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => handleCta(currentSlide)}
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#D8B469] text-[#0B0B0B] font-sans text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center gap-3 shadow-xl shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 group"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* AI Stylist Button */}
            <button
              onClick={() => setIsAIStylistOpen(true)}
              className="px-6 py-4 bg-[#141414]/90 hover:bg-[#1f1f1f] text-[#F3EFE6] border border-[#383838] hover:border-[#C5A059]/60 font-sans text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>AI Fashion Concierge</span>
            </button>

            {/* Runway Video Trigger */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="p-4 text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-wider"
              title="Watch Haute Couture Runway Clip"
            >
              <div className="w-9 h-9 rounded-full border border-neutral-600 flex items-center justify-center group-hover:border-[#C5A059]">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-[#C5A059]" />
              </div>
              <span className="hidden sm:inline font-mono text-[11px]">Runway Film</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Dots & Slider Progress */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4 bg-[#0A0A0A]/80 border border-neutral-800/80 px-4 py-2.5 rounded-full backdrop-blur-md">
        <span className="text-xs font-mono text-[#C5A059]">0{currentIdx + 1}</span>
        <div className="flex gap-2">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIdx === idx ? 'w-8 bg-[#C5A059]' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-neutral-500">0{HERO_SLIDES.length}</span>
      </div>

      {/* Runway Video Trailer Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#111] border border-[#C5A059]/40 rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs uppercase tracking-widest text-[#E8D3A2] font-semibold">
                    DOOZY DREAM · Autumn / Winter Haute Couture Runway Presentation (Paris)
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Simulated Luxury Video Player with High-Fashion Editorial Imagery Loop */}
              <div className="relative aspect-video bg-neutral-950 flex flex-col items-center justify-center text-center p-8 overflow-hidden group">
                <img
                  src={currentSlide.image}
                  alt="Runway Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 animate-pulse"
                />
                <div className="relative z-10 space-y-4 max-w-md">
                  <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto shadow-lg shadow-[#C5A059]/30">
                    <Play className="w-6 h-6 fill-[#C5A059] text-[#C5A059] ml-1" />
                  </div>
                  <h3 className="font-serif text-2xl text-white tracking-wide">
                    {currentSlide.title} {currentSlide.italicWord}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    Live from the Grand Palais, Paris. Draped in liquid metallic lamé, micro-velvet, and Banarasi zari handlooms.
                  </p>
                  <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-[#C5A059] pt-2">
                    <span>4K HDR ULTRA-DEFINITION</span>
                    <span>SOUND: 7.1 CINEMATIC</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#0A0A0A] border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    handleCta(currentSlide);
                  }}
                  className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Explore This Look In Boutique
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

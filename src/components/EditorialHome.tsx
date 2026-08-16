import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSlider } from './HeroSlider';
import { FeaturedCollections } from './FeaturedCollections';
import { ProductCard } from './ProductCard';
import { LookbookSection } from './LookbookSection';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, Scissors, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const EditorialHome: React.FC = () => {
  const { products, setActiveView, setSelectedCategory, setIsAIStylistOpen } = useStore();

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const festiveHighlights = products.filter((p) => p.isFestive || p.category === 'Festive Stories').slice(0, 3);
  const partyHighlights = products.filter((p) => p.isPartyNight || p.category === 'Party Nights').slice(0, 3);

  return (
    <div className="bg-[#050505] text-[#FAF7F0] overflow-hidden">
      {/* 1. Haute Couture Hero Slider */}
      <HeroSlider />

      {/* 2. Maison Pillars / Trust Marquee */}
      <section className="border-y border-[#1C1C1C] bg-[#0A0A0A] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          <div className="flex items-center gap-2 text-[#C5A059]">
            <Scissors className="w-3.5 h-3.5" />
            <span>Bespoke Parisian Tailoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Complimentary Global Courier</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Pure Mulberry Silks & 24k Zari</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Insured White-Glove Handover</span>
          </div>
        </div>
      </section>

      {/* 3. Featured Collections Bento */}
      <FeaturedCollections />

      {/* 4. New Arrivals Runway Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C1C1C]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Couture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#FAF7F0] tracking-tight">
              New <span className="italic font-normal text-[#E8D3A2]">Arrivals</span>
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView('shop');
              setSelectedCategory('All');
            }}
            className="mt-4 md:mt-0 text-xs font-mono uppercase tracking-widest text-[#C5A059] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Festive Stories Spotlight Banner */}
      <section className="py-20 bg-gradient-to-b from-[#0B0805] via-[#0E0B07] to-[#050505] border-y border-[#261E14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#312513] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
                ✦ Royal Heritage Édition ✦
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FDFBF7] font-light">
                Festive <span className="italic font-normal text-[#E8D3A2]">Stories</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveView('festive');
                setSelectedCategory('Festive Stories');
              }}
              className="mt-4 md:mt-0 px-5 py-2.5 bg-transparent border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all text-xs uppercase tracking-widest font-semibold flex items-center gap-2 self-start md:self-auto"
            >
              <span>Explore Festive Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {festiveHighlights.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Fashion Concierge Feature Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-r from-[#17120B] via-[#211A0E] to-[#120E08] border border-[#C5A059]/40 p-8 sm:p-14 shadow-2xl">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#E8D3A2] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>DOOZY AI Fashion Concierge</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F0] font-light leading-tight">
              Personalized Runway Styling, <span className="italic text-[#E8D3A2] font-normal">Calibrated for You</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Seeking the perfect gala gown, festive ensemble, or cocktail silhouette? Consult with our digital Creative Director to receive bespoke footwear, jewelry, and makeup palettes tailored to your event.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setIsAIStylistOpen(true)}
                className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Begin Bespoke Styling Session</span>
              </button>
              <button
                onClick={() => setActiveView('lookbook')}
                className="px-6 py-3.5 bg-transparent border border-neutral-700 hover:border-neutral-400 text-neutral-300 text-xs uppercase tracking-widest transition-all"
              >
                Inspect Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Party Nights Collection Spotlight */}
      <section className="py-20 bg-[#070707] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
                ✦ Nocturnal Soirée Series ✦
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FDFBF7] font-light">
                Party <span className="italic font-normal text-[#E8D3A2]">Nights</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveView('party');
                setSelectedCategory('Party Nights');
              }}
              className="mt-4 md:mt-0 text-xs font-mono uppercase tracking-widest text-[#C5A059] hover:underline flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View All Party Silhouettes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partyHighlights.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. The Atelier Chronicles (Lookbook Section) */}
      <LookbookSection />
    </div>
  );
};

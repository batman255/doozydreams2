import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, BookOpen, Quote } from 'lucide-react';

const LOOKBOOK_STORIES = [
  {
    id: 'look-1',
    title: 'The Parisian Midnight Salon',
    issue: 'Volume IX · Nocturne Study',
    lead: 'Sculpting light across liquid gold lamé and double-faced satin inside the historic salons of Rue du Faubourg Saint-Honoré.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    artisanNote: 'Draped over 140 hours to achieve an effortless cascade that moves like liquid mercury.',
    featuredProductId: 'prod-1',
    tag: 'Haute Couture Edition'
  },
  {
    id: 'look-2',
    title: 'Imperial Banarasi & Velvet Zardozi',
    issue: 'Heritage Monograph 2026',
    lead: 'Centuries of Varanasi handloom mastery woven with 24k gold-dipped threads, re-imagined for sovereign evening celebrations.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    artisanNote: 'Each bullion motif is hand-stitched by fourth-generation master zardozi craftsmen.',
    featuredProductId: 'prod-2',
    tag: 'Festive Stories'
  },
  {
    id: 'look-3',
    title: 'Nocturne Luminescence & Corsetry',
    issue: 'Mayfair Soirée Dispatch',
    lead: 'Architectural boning meets thousands of mirrored crystal paillettes engineered to catch the ambient light of midnight ballrooms.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    artisanNote: 'Reinforced with internal silk grosgrain stays for impeccable poise and movement.',
    featuredProductId: 'prod-3',
    tag: 'Party Nights'
  }
];

export const LookbookSection: React.FC = () => {
  const { openProductDetail, setActiveView } = useStore();

  return (
    <section className="py-20 lg:py-28 bg-[#080808] border-t border-[#1C1C1C] text-[#F3EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#222] pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#FAF7F0] tracking-tight">
              The Atelier <span className="italic font-normal text-[#E8D3A2]">Chronicles</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Go behind the velvet curtains of our Parisian workshops and explore the philosophy behind every hand-stitched silhouette.
          </p>
        </div>

        {/* Editorial Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LOOKBOOK_STORIES.map((story) => (
            <article
              key={story.id}
              className="bg-[#111111] border border-[#222222] hover:border-[#C5A059]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 group shadow-xl"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0A0A]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 border border-[#C5A059]/40 text-[#E8D3A2] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                  {story.tag}
                </span>
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block mb-1">
                    {story.issue}
                  </span>
                  <h3 className="font-serif text-2xl text-white group-hover:text-[#E8D3A2] transition-colors leading-snug mb-3">
                    {story.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                    {story.lead}
                  </p>

                  <div className="p-3.5 bg-[#181818] border-l-2 border-[#C5A059] rounded-r text-xs text-[#E8D3A2] italic font-serif mb-6">
                    "{story.artisanNote}"
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => openProductDetail(story.featuredProductId)}
                  className="w-full py-3 bg-[#1C1810] border border-[#C5A059]/50 hover:bg-[#C5A059] hover:text-black text-[#E8D3A2] text-xs font-semibold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Featured Look</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

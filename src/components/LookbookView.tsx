import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    title: 'The Aurelia Liquid Lamé Gown',
    season: 'Autumn / Winter Couture',
    location: 'Palais Garnier, Paris',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=90',
    productId: 'dd-001',
    description: 'Sculptural asymmetric cowl with liquid metallic lamé bias drape.',
  },
  {
    id: 'look-2',
    title: 'The Imperial Velvet Festive Anarkali',
    season: 'Festive Stories Collection',
    location: 'Umaid Bhawan Palace, Jodhpur',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=90',
    productId: 'dd-002',
    description: 'Plush emerald micro-velvet illuminated with 24k gold bullion zardozi.',
  },
  {
    id: 'look-3',
    title: 'The Starburst Sequin Cocktail Minidress',
    season: 'Party Nights Collection',
    location: 'Hôtel Plaza Athénée, Paris',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90',
    productId: 'dd-003',
    description: 'Bespoke micro-paillettes with sculptural shoulder volume and open back.',
  },
  {
    id: 'look-4',
    title: 'The Nocturne Halter Column Gown',
    season: 'The Gala Collection',
    location: 'Villa Ephrussi de Rothschild, French Riviera',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=90',
    productId: 'dd-004',
    description: 'Heavy silk crepe column gown with hand-set Austrian crystal halter brooch.',
  },
];

export const LookbookView: React.FC = () => {
  const { openProductDetail, setActiveView } = useStore();

  return (
    <div className="min-h-screen bg-[#090909] text-[#FAF7F0] pb-28">
      {/* Header */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4 border-b border-[#222]">
        <div className="flex items-center justify-center gap-2 text-[#C5A059] text-xs font-mono uppercase tracking-[0.3em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Editorial Campaign 2026</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#FAF7F0]">
          Haute Couture <span className="italic font-normal text-[#E8D3A2]">Lookbook</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
          An intimate lens into the Parisian nocturnal salon. Click any silhouette to inspect details, fabric specifications, and bespoke sizing.
        </p>
      </div>

      {/* Looks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {LOOKBOOK_ITEMS.map((look, idx) => (
          <div
            key={look.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div
                onClick={() => openProductDetail(look.productId)}
                className="group relative aspect-[4/5] rounded-sm overflow-hidden bg-[#141414] border border-[#262626] cursor-pointer"
              >
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="px-4 py-2 bg-[#C5A059] text-black text-xs font-medium uppercase tracking-wider flex items-center gap-2 rounded-sm shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>Inspect Silhouette</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                Look {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} · {look.location}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] font-light">
                {look.title}
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {look.description}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openProductDetail(look.productId)}
                  className="px-5 py-2.5 bg-transparent border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Discover Garment</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

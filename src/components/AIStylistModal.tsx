import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  Check,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Compass,
  Palette,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_OCCASIONS = [
  { label: 'Black-Tie Gala in Monaco', occasion: 'Black Tie & Gala', prompt: 'I need a dramatic, unforgettable gown for a high-society charity gala in Monaco with royal elegance.' },
  { label: 'Royal Festive Reception', occasion: 'Festive & Celebration', prompt: 'Styling for an opulent grand palace wedding reception. I want heirloom velvet with rich gold bullion embroidery.' },
  { label: 'Electric Midnight Soirée', occasion: 'Party Nights', prompt: 'High-energy VIP nightclub opening in Mayfair London. I want modern corsetry, crystal luminescence, and sharp tailored lines.' },
  { label: 'Sunset Gala in Lake Como', occasion: 'Cocktail & Soirée', prompt: 'Summer sunset cocktail party in Villa d\'Este, Lake Como. Looking for fluid mulberry silk and emerald tones.' },
];

export const AIStylistModal: React.FC = () => {
  const {
    isAIStylistOpen,
    setIsAIStylistOpen,
    products,
    openProductDetail,
    addToCart,
    formatPrice,
    addNotification,
  } = useStore();

  const [prompt, setPrompt] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('Black Tie & Gala');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  if (!isAIStylistOpen) return null;

  const handleConsultation = async (customPrompt?: string, customOccasion?: string) => {
    const userPrompt = customPrompt || prompt;
    const occ = customOccasion || selectedOccasion;

    if (!userPrompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          occasion: occ,
          products: products.slice(0, 12).map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            collection: p.collection,
            price: p.price,
            fabric: p.fabric,
            description: p.description,
          })),
        }),
      });

      const data = await res.json();
      setRecommendation(data);
    } catch (err) {
      // Fallback recommendation if server or key unavailable
      const fallbackProducts = products.slice(0, 3);
      setRecommendation({
        verdict: 'An exquisite symphony of high nocturnal glamour pairing liquid textures with structured tailoring.',
        mood: 'Nocturne High-Society Opulence',
        colorPalette: ['Obsidian Black', 'Liquid Champagne Gold', 'Emerald Velvet'],
        recommendedItems: fallbackProducts.map((p) => ({
          productId: p.id,
          title: p.title,
          stylingNote: 'Drapes with bespoke elegance; enhances silhouette contour.',
        })),
        accessoriesAdvice: 'Layer with delicate diamond choker and 24k gold leaf ear cuffs.',
        footwearAdvice: 'Sculptural strappy metallic heels with minimalist ankle wrap.',
        hairMakeupAdvice: 'Sleek architectural chignon paired with a bold Parisian crimson lip and softly smoked bronze eyelids.',
      });
      addNotification('AI Concierge', 'Atelier styling consultation dossier generated.', 'gold');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPreset = (preset: typeof PRESET_OCCASIONS[0]) => {
    setSelectedOccasion(preset.occasion);
    setPrompt(preset.prompt);
    handleConsultation(preset.prompt, preset.occasion);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#111111] border border-[#C5A059]/40 rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#17130A] via-[#121212] to-[#0A0A0A] border-b border-[#2A2316] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-lg shadow-[#C5A059]/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#FAF7F0] tracking-wide flex items-center gap-2">
                DOOZY AI Fashion Concierge
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#C5A059] text-black font-bold">
                  GEMINI 3.7 FLASH
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Haute Couture Styling, Ensemble Pairing & Nocturne Event Consultation
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAIStylistOpen(false)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Quick Preset Occasions */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-2.5">
              Select Curated Occasion Dossier:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_OCCASIONS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPreset(preset)}
                  className="text-left p-3 rounded bg-[#161616] hover:bg-[#201B11] border border-neutral-800 hover:border-[#C5A059]/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-serif font-medium text-white group-hover:text-[#E8D3A2]">
                      {preset.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">
                      {preset.occasion}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Consultation Input */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-neutral-300">
              Or Describe Your Personal Vision & Dress Code:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConsultation()}
                placeholder="e.g. I need an emerald gown for a winter royal wedding in St. Moritz..."
                className="flex-1 px-4 py-3 bg-[#151515] border border-neutral-700 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A059] font-light"
              />
              <button
                onClick={() => handleConsultation()}
                disabled={loading || !prompt.trim()}
                className="px-6 py-3 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Consult</span>
              </button>
            </div>
          </div>

          {/* AI Styling Recommendation Dossier Result */}
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#15130D] border border-[#C5A059]/40 rounded-lg p-6 space-y-6 shadow-2xl"
            >
              {/* Verdict & Mood */}
              <div className="border-b border-[#2D2415] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Style Dossier · {recommendation.mood}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white italic">
                  "{recommendation.verdict}"
                </h3>

                {/* Color Palette Chips */}
                {recommendation.colorPalette && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase">
                      Recommended Palette:
                    </span>
                    {recommendation.colorPalette.map((col: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-[#241E14] border border-[#C5A059]/30 text-[#E8D3A2] text-[10px] font-mono"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Garments Grid */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 mb-3 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Matching Atelier Creations:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendation.recommendedItems?.map((rec: any, idx: number) => {
                    const matchedProduct = products.find((p) => p.id === rec.productId) || products[idx % products.length];
                    if (!matchedProduct) return null;
                    return (
                      <div
                        key={idx}
                        className="bg-[#0E0E0E] border border-neutral-800 rounded overflow-hidden flex flex-col justify-between p-3.5 group hover:border-[#C5A059]/50 transition-colors"
                      >
                        <div>
                          <div className="aspect-[3/4] rounded overflow-hidden bg-neutral-900 mb-2.5 relative">
                            <img
                              src={matchedProduct.images[0]}
                              alt={matchedProduct.title}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#E8D3A2]">
                              {formatPrice(matchedProduct.price)}
                            </span>
                          </div>
                          <h5 className="font-serif text-sm text-white line-clamp-1 group-hover:text-[#E8D3A2]">
                            {matchedProduct.title}
                          </h5>
                          <p className="text-[11px] text-neutral-400 font-light mt-1 line-clamp-2">
                            {rec.stylingNote || matchedProduct.subtitle}
                          </p>
                        </div>

                        <div className="flex gap-2 pt-3 mt-3 border-t border-neutral-800">
                          <button
                            onClick={() => {
                              setIsAIStylistOpen(false);
                              openProductDetail(matchedProduct.id);
                            }}
                            className="flex-1 py-1.5 bg-[#1C1C1C] hover:bg-[#252525] text-white text-[11px] font-mono uppercase rounded flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3 text-[#C5A059]" />
                            <span>Details</span>
                          </button>
                          <button
                            onClick={() => {
                              addToCart(matchedProduct, matchedProduct.colors[0], matchedProduct.sizes[0].size, 1);
                            }}
                            className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#D8B469] text-black text-[11px] font-mono font-bold uppercase rounded flex items-center gap-1"
                            title="Add to bag"
                          >
                            <ShoppingBag className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Complete Ensemble Advice (Accessories, Shoes, Hair/Makeup) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-light text-neutral-300">
                <div className="p-3.5 bg-[#191919] rounded border border-neutral-800 space-y-1">
                  <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider block font-semibold">
                    Jewelry & Accessories
                  </span>
                  <p>{recommendation.accessoriesAdvice}</p>
                </div>
                <div className="p-3.5 bg-[#191919] rounded border border-neutral-800 space-y-1">
                  <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider block font-semibold">
                    Footwear & Bag
                  </span>
                  <p>{recommendation.footwearAdvice}</p>
                </div>
                <div className="p-3.5 bg-[#191919] rounded border border-neutral-800 space-y-1">
                  <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider block font-semibold">
                    Hair & Makeup Palette
                  </span>
                  <p>{recommendation.hairMakeupAdvice}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';
import {
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  Ruler,
  Check,
  ShieldCheck,
  Star,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    products,
    quickViewProductId,
    setQuickViewProductId,
    openProductDetail,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
  } = useStore();

  const product = products.find((p) => p.id === quickViewProductId);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      const firstAvailableSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size;
      setSelectedSize(firstAvailableSize);
      setSelectedImageIdx(0);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  if (!product || !quickViewProductId) return null;

  const isSaved = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);

  const handleAdd = () => {
    if (!selectedColor || !selectedSize) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProductId(null);
    }, 1200);
  };

  const handleViewFullPDP = () => {
    setQuickViewProductId(null);
    openProductDetail(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-[#121212] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProductId(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1A1A1A]/80 hover:bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
          aria-label="Close Quick View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Gallery Column */}
        <div className="w-full md:w-1/2 p-6 bg-[#0B0B0B] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1E1E1E]">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-[#161616] mb-4">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-all duration-500"
            />
            {product.isFestive && (
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#3B1218] text-[#E8A598] text-[10px] font-mono uppercase tracking-widest">
                Festive Story
              </span>
            )}
            {product.isPartyNight && (
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1A1E29] text-[#93C5FD] text-[10px] font-mono uppercase tracking-widest">
                Party Night
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-16 h-20 shrink-0 rounded overflow-hidden border transition-all ${
                    selectedImageIdx === idx
                      ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-none">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#C5A059] mb-1">
                <span>{product.collection}</span>
                <span className="text-neutral-500">SKU: {product.sku}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7] tracking-wide leading-tight">
                {product.title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-neutral-300">
                  {product.rating} ({product.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-2 border-y border-[#222]">
              <span className="text-2xl font-mono font-medium text-[#F3EFE6]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-mono text-neutral-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercentage && (
                <span className="px-2 py-0.5 rounded bg-[#C5A059] text-black text-xs font-bold font-mono">
                  SAVE {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Editorial Description snippet */}
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-300 mb-2">
                Color: <span className="text-[#C5A059]">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c);
                      if (product.images.length > idx) {
                        setSelectedImageIdx(idx % product.images.length);
                      }
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor?.name === c.name
                        ? 'border-[#C5A059] scale-110 ring-2 ring-[#C5A059]/40 ring-offset-2 ring-offset-[#121212]'
                        : 'border-neutral-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor?.name === c.name && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                  Size: <span className="text-[#C5A059]">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-xs text-[#E8D3A2] hover:text-white transition-colors underline decoration-[#C5A059]/50"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      selectedSize === s.size
                        ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold shadow-md shadow-[#C5A059]/20'
                        : s.inStock
                        ? 'bg-[#181818] border-neutral-700 text-neutral-200 hover:border-neutral-500'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-600 line-through cursor-not-allowed'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* Stock status */}
              {currentSizeObj && (
                <div className="mt-2 text-[11px] font-mono">
                  {currentSizeObj.inStock ? (
                    <span className="text-emerald-400">
                      ● In Stock · Complimentary Priority Atelier Dispatch
                    </span>
                  ) : (
                    <span className="text-amber-400">
                      ● Currently being tailored in Paris. Reserve for pre-order.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Fabric Snippet */}
            <div className="p-3 bg-[#181818] rounded border border-neutral-800 text-xs text-neutral-300 font-light">
              <span className="font-semibold text-[#E8D3A2]">Atelier Fabric:</span> {product.fabric}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#222] space-y-3 mt-6">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-700 rounded bg-[#181818] px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                disabled={!currentSizeObj?.inStock}
                className={`flex-1 py-3.5 px-6 rounded text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : currentSizeObj?.inStock
                    ? 'bg-[#C5A059] hover:bg-[#D8B469] text-black shadow-lg shadow-[#C5A059]/20'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded border transition-colors ${
                  isSaved
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'border-neutral-700 text-neutral-300 hover:text-[#C5A059] hover:border-[#C5A059]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* View Full PDP link */}
            <button
              onClick={handleViewFullPDP}
              className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-[#E8D3A2] transition-colors flex items-center justify-center gap-1 group"
            >
              <span>Explore Complete Atelier Dossier & Styling Notes</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

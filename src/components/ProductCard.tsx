import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  viewMode?: '2col' | '3col' | '4col';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = '3col' }) => {
  const {
    formatPrice,
    openProductDetail,
    setQuickViewProductId,
    toggleWishlist,
    isInWishlist,
    addToCart,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [quickSelectSize, setQuickSelectSize] = useState<string | null>(null);

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    addToCart(product, selectedColor, size, 1);
  };

  const handleColorChange = (e: React.MouseEvent, color: ProductColor, idx: number) => {
    e.stopPropagation();
    setSelectedColor(color);
    // If product has multiple images, map to color index if possible
    if (product.images.length > idx) {
      setCurrentImageIdx(idx % product.images.length);
    }
  };

  const handleCardClick = () => {
    openProductDetail(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIdx(0);
      }}
      className="group cursor-pointer flex flex-col bg-[#111111] border border-[#222222] hover:border-[#C5A059]/50 transition-all duration-500 rounded-sm overflow-hidden relative shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-[#C5A059]/10"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A0A0A]">
        {/* Main Editorial Image */}
        <img
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[currentImageIdx]}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFestive && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#3B1218]/90 text-[#E8A598] border border-[#E8A598]/30 text-[10px] font-mono tracking-widest uppercase backdrop-blur-sm">
              Festive Story
            </span>
          )}
          {product.isPartyNight && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1A1E29]/90 text-[#93C5FD] border border-[#93C5FD]/30 text-[10px] font-mono tracking-widest uppercase backdrop-blur-sm">
              Party Night
            </span>
          )}
          {product.isBestSeller && !product.isFestive && !product.isPartyNight && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#261E0E]/90 text-[#E8D3A2] border border-[#C5A059]/40 text-[10px] font-mono tracking-widest uppercase backdrop-blur-sm">
              Bespoke Icon
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2 py-0.5 rounded bg-[#C5A059] text-black text-[10px] font-bold tracking-wider uppercase">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            isSaved
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/30'
              : 'bg-[#121212]/80 text-white hover:text-[#C5A059] hover:bg-[#1C1C1C]'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {/* Quick Size Select Bar */}
          <div className="bg-[#141414]/95 backdrop-blur-md p-2 rounded border border-[#2B2B2B] shadow-xl flex items-center justify-between gap-1">
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider pl-1">
              Select Size:
            </span>
            <div className="flex items-center gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={(e) => handleQuickAdd(e, s.size)}
                  className={`w-7 h-7 text-[11px] font-mono font-medium rounded transition-all flex items-center justify-center ${
                    s.inStock
                      ? 'bg-neutral-800 hover:bg-[#C5A059] hover:text-black text-neutral-200'
                      : 'bg-neutral-900 text-neutral-600 line-through cursor-not-allowed'
                  }`}
                  title={s.inStock ? `Add size ${s.size} to bag` : 'Out of stock'}
                >
                  {s.size === 'Custom Fit' ? 'CF' : s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quick View Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProductId(product.id);
            }}
            className="w-full py-2 bg-[#0A0A0A]/90 hover:bg-[#1E1E1E] text-[#E8D3A2] border border-[#C5A059]/40 text-xs font-medium uppercase tracking-widest rounded flex items-center justify-center gap-2 backdrop-blur-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#111111]">
        <div>
          {/* Collection & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono tracking-wider uppercase mb-1.5">
            <span className="text-[#C5A059] truncate">{product.collection}</span>
            <div className="flex items-center gap-1 text-[#E8D3A2]">
              <Star className="w-3 h-3 fill-current text-[#C5A059]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-[#FDFBF7] group-hover:text-[#E8D3A2] transition-colors leading-snug tracking-wide line-clamp-1 mb-1">
            {product.title}
          </h3>

          {/* Subtitle / Fabric snippet */}
          <p className="text-xs text-neutral-400 font-light line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        <div>
          {/* Color Swatches */}
          <div className="flex items-center gap-2 mb-3">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => handleColorChange(e, c, idx)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-[#C5A059] ring-offset-1 ring-offset-[#111] scale-110'
                    : 'border-neutral-600 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 font-mono tracking-wider ml-1">
              {selectedColor.name}
            </span>
          </div>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-[#1F1F1F]">
            <span className="text-base sm:text-lg font-mono font-medium text-[#F3EFE6]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-neutral-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-[10px] text-neutral-500 ml-auto font-mono">
              VAT Incl.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

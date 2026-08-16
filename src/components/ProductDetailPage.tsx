import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor, Product } from '../types';
import { ProductCard } from './ProductCard';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  Lock,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsAIStylistOpen,
    setIsCheckoutOpen,
    setActiveView,
    addNotification,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size
  );
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('story');

  // Related products & Complete the Look products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const completeTheLookItems = (product.completeTheLookProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const isSaved = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  const handleAddBundleToCart = () => {
    // Add main product + bundle items
    addToCart(product, selectedColor, selectedSize, 1);
    completeTheLookItems.forEach((item) => {
      addToCart(item, item.colors[0], item.sizes[0]?.size || 'One Size', 1);
    });
    addNotification('Look Bundle Added', `Added ${product.title} and matching accessories with VIP styling privilege.`, 'gold');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addNotification('Link Copied', 'Atelier garment link copied to clipboard.', 'info');
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3EFE6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setActiveView('home')} className="hover:text-[#C5A059] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActiveView('shop')} className="hover:text-[#C5A059] transition-colors">
            Women's Collection
          </button>
          <span>/</span>
          <span className="text-neutral-500">{product.category}</span>
          <span>/</span>
          <span className="text-[#E8D3A2] truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Visual Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[650px] shrink-0 pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 aspect-[3/4] rounded overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIdx === idx
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] rounded-lg overflow-hidden bg-[#121212] border border-[#262626] group">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.title}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-black/80 border border-[#C5A059]/40 text-[#E8D3A2] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1.5 rounded text-[11px] font-mono text-neutral-300 backdrop-blur-md pointer-events-none flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Click image to zoom</span>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Specs & Ordering Engine (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Header / Collection */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] mb-2">
                <span>{product.collection}</span>
                <span className="text-neutral-500 font-mono">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#FAF7F0] tracking-tight leading-tight mb-2">
                {product.title}
              </h1>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {product.subtitle}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-neutral-300">
                  {product.rating} · ({product.reviewCount} client appraisals)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="py-4 border-y border-[#262626] flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-mono font-medium text-[#F3EFE6]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base font-mono text-neutral-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="px-2 py-0.5 rounded bg-[#C5A059] text-black text-xs font-bold font-mono">
                    SAVE {product.discountPercentage}%
                  </span>
                )}
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Complimentary White-Glove Global Delivery
              </span>
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-300 mb-2.5">
                Shade / Hue: <span className="text-[#C5A059] font-medium">{selectedColor.name}</span>
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
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'border-[#C5A059] scale-110 ring-2 ring-[#C5A059]/40 ring-offset-2 ring-offset-[#0A0A0A]'
                        : 'border-neutral-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.name === c.name && (
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                  Select Size: <span className="text-[#C5A059] font-medium">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-xs text-[#E8D3A2] hover:text-white transition-colors underline decoration-[#C5A059]/50"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      selectedSize === s.size
                        ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold shadow-lg shadow-[#C5A059]/20'
                        : s.inStock
                        ? 'bg-[#151515] border-neutral-700 text-neutral-200 hover:border-neutral-500'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-600 line-through cursor-not-allowed'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* Stock Indicator */}
              {currentSizeObj && (
                <div className="mt-2.5 flex items-center gap-2 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400">
                    {currentSizeObj.stockCount > 0
                      ? `In Stock (${currentSizeObj.stockCount} pieces available in Parisian Atelier)`
                      : 'Bespoke Order Available'}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-700 rounded bg-[#151515] px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={!currentSizeObj?.inStock}
                  className="flex-1 py-4 px-6 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded shadow-xl shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded border transition-colors ${
                    isSaved
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'border-neutral-700 text-neutral-300 hover:text-[#C5A059] hover:border-[#C5A059]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now / Direct Checkout */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#1C1C1C] hover:bg-[#262626] text-[#F3EFE6] border border-[#3A3A3A] hover:border-[#C5A059]/60 text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Instant Express Checkout</span>
              </button>
            </div>

            {/* AI Stylist Consultation Box for this Garment */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-[#1C170E] via-[#14120D] to-[#0D0D0D] border border-[#C5A059]/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E8D3A2] text-xs font-mono uppercase tracking-widest font-semibold">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>DOOZY Atelier Styling Advice</span>
                </div>
                <button
                  onClick={() => setIsAIStylistOpen(true)}
                  className="text-[11px] font-mono text-[#C5A059] hover:underline"
                >
                  Ask AI Concierge →
                </button>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300 font-light">
                {product.stylingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-0.5">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#262626] pt-2 divide-y divide-[#202020]">
              {/* Silhouette & Design Story */}
              <div>
                <button
                  onClick={() => toggleAccordion('story')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-[#C5A059] transition-colors"
                >
                  <span>Design Silhouette & Couture Story</span>
                  {activeAccordion === 'story' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'story' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4 text-xs text-neutral-300 font-light leading-relaxed space-y-3"
                    >
                      <p>{product.description}</p>
                      {product.editorialQuote && (
                        <p className="italic text-[#E8D3A2] font-serif border-l-2 border-[#C5A059] pl-3 py-1">
                          {product.editorialQuote}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fabric & Sustainable Craftsmanship */}
              <div>
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-[#C5A059] transition-colors"
                >
                  <span>Fabric & Atelier Care</span>
                  {activeAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'fabric' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4 text-xs text-neutral-300 font-light space-y-2"
                    >
                      <p>
                        <strong className="text-[#E8D3A2]">Fabric Composition:</strong> {product.fabric}
                      </p>
                      <div className="pt-1">
                        <strong className="text-[#E8D3A2] block mb-1">Preservation & Care:</strong>
                        <ul className="list-disc list-inside space-y-1 text-neutral-400">
                          {product.care.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Delivery & Complimentary Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-[#C5A059] transition-colors"
                >
                  <span>White-Glove Delivery & Returns</span>
                  {activeAccordion === 'delivery' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'delivery' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4 text-xs text-neutral-300 font-light space-y-2 leading-relaxed"
                    >
                      <div className="flex items-start gap-2.5">
                        <Truck className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-white block">Complimentary Express Global Transit:</strong>
                          <span>Delivered in signature obsidian linen box with personalized wax seal within 2–4 business days.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 pt-2">
                        <RotateCcw className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-white block">30-Day Atelier Returns:</strong>
                          <span>Complimentary courier pickup from your residence. Garment must remain unworn with intact security ribbon.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Model & Fit Specs */}
              <div>
                <button
                  onClick={() => toggleAccordion('model')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-[#C5A059] transition-colors"
                >
                  <span>Model Measurements & Fit</span>
                  {activeAccordion === 'model' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'model' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4 text-xs text-neutral-300 font-light space-y-1.5"
                    >
                      <p>Model is wearing size: <strong className="text-[#E8D3A2]">{product.modelSpecs.wearingSize}</strong></p>
                      <p>Height: {product.modelSpecs.height}</p>
                      <p>Bust: {product.modelSpecs.bust} · Waist: {product.modelSpecs.waist}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Curated Bundle Section */}
        {completeTheLookItems.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#222]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <span className="text-[#C5A059] text-xs font-mono uppercase tracking-[0.2em] block mb-1">
                  Atelier Ensemble
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  Complete The <span className="italic text-[#E8D3A2]">Look</span>
                </h3>
              </div>
              <button
                onClick={handleAddBundleToCart}
                className="mt-4 md:mt-0 px-6 py-3 bg-[#1C1810] border border-[#C5A059] hover:bg-[#C5A059] hover:text-black text-[#E8D3A2] text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Complete Ensemble To Bag</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completeTheLookItems.map((item) => (
                <ProductCard key={item.id} product={item} viewMode="3col" />
              ))}
            </div>
          </section>
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#222]">
            <div className="mb-8">
              <span className="text-[#C5A059] text-xs font-mono uppercase tracking-[0.2em] block mb-1">
                More From This Collection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                You May Also <span className="italic text-[#E8D3A2]">Admire</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} viewMode="4col" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Gift,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FREE_SHIPPING_THRESHOLD = 350;

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    formatPrice,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    setIsCheckoutOpen,
    openProductDetail,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = appliedPromo ? (cartSubtotal * appliedPromo.percent) / 100 : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="w-screen max-w-md bg-[#0F0F0F] border-l border-[#262626] text-[#F3EFE6] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#222] flex items-center justify-between bg-[#0B0B0B]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h2 className="font-serif text-xl tracking-wide uppercase text-white">
                Shopping Bag <span className="font-mono text-xs text-[#C5A059]">({cart.length})</span>
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-[#141414] border-b border-[#222]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">
                    Complimentary White-Glove Delivery Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#C5A059]">{formatPrice(remainingForFreeShipping)}</strong> for Free Express Delivery
                  </span>
                )}
              </span>
              <span className="text-neutral-500 font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#997B38] to-[#C5A059] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#2B2B2B] flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8 stroke-1 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-xl text-white">Your Bag is Empty</h3>
                <p className="text-xs text-neutral-400 font-light max-w-xs mx-auto">
                  Explore our Haute Couture collections and add bespoke garments to your shopping bag.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded mt-2"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#141414] border border-[#222] rounded flex gap-3.5 relative group hover:border-[#C5A059]/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      openProductDetail(item.product.id);
                    }}
                    className="w-20 aspect-[3/4] rounded overflow-hidden bg-neutral-900 shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between pr-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                        {item.product.collection}
                      </span>
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          openProductDetail(item.product.id);
                        }}
                        className="font-serif text-base text-white hover:text-[#E8D3A2] cursor-pointer line-clamp-1"
                      >
                        {item.product.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono mt-1">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-600 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                        <span>·</span>
                        <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-mono font-medium text-[#FAF7F0]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center border border-neutral-700 rounded bg-[#0B0B0B] px-1.5 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-1.5 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-1.5 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-neutral-500 hover:text-rose-400 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}

            {/* Gift Packaging Section */}
            {cart.length > 0 && (
              <div className="p-4 bg-[#141414] border border-[#262626] rounded space-y-2 mt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#E8D3A2]">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="accent-[#C5A059] rounded"
                  />
                  <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Complimentary Signature Gift Box & Handwritten Card</span>
                </label>
                {giftWrap && (
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Enter your personal gift message to be written with golden calligraphy..."
                    className="w-full text-xs bg-[#0B0B0B] border border-neutral-700 rounded p-2.5 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#C5A059] resize-none h-16 font-light"
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#0B0B0B] border-t border-[#222] space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#1F190F] border border-[#C5A059]/40 rounded text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#E8D3A2]">
                      <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{appliedPromo.code} ({appliedPromo.percent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-neutral-400 hover:text-white underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. DOOZYVIP15)"
                      className="flex-1 px-3 py-2 bg-[#141414] border border-neutral-700 rounded text-xs text-neutral-200 placeholder-neutral-500 uppercase font-mono focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase tracking-wider rounded text-[#E8D3A2]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400 mt-1 font-mono">{promoError}</p>
                )}
              </div>

              {/* Price Calculation Rows */}
              <div className="space-y-1.5 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-neutral-200">{formatPrice(cartSubtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#C5A059]">
                    <span>VIP Privilege Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Delivery</span>
                  <span className="text-emerald-400 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-neutral-800">
                  <span>Estimated Total</span>
                  <span className="font-mono font-medium text-[#FAF7F0]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded shadow-xl shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 group"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Proceed to White-Glove Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-neutral-500 font-mono flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>256-Bit Encrypted Secure Checkout · Authenticity Guaranteed</span>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

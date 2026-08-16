import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    removeFromWishlist,
    addToCart,
    formatPrice,
    openProductDetail,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const handleMoveToBag = (product: any) => {
    const firstColor = product.colors[0];
    const firstSize = product.sizes.find((s: any) => s.inStock)?.size || product.sizes[0]?.size;
    addToCart(product, firstColor, firstSize, 1);
    removeFromWishlist(product.id);
  };

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((product) => {
      if (product) {
        const firstColor = product.colors[0];
        const firstSize = product.sizes.find((s: any) => s.inStock)?.size || product.sizes[0]?.size;
        addToCart(product, firstColor, firstSize, 1);
        removeFromWishlist(product.id);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsWishlistOpen(false)}
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
              <Heart className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
              <h2 className="font-serif text-xl tracking-wide uppercase text-white">
                Saved Creations <span className="font-mono text-xs text-[#C5A059]">({wishlist.length})</span>
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#2B2B2B] flex items-center justify-center mx-auto text-neutral-500">
                  <Heart className="w-8 h-8 stroke-1 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-xl text-white">Your Wishlist is Empty</h3>
                <p className="text-xs text-neutral-400 font-light max-w-xs mx-auto">
                  Save your most cherished couture dresses, gowns, and accessories to admire later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded mt-2"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => {
                if (!product) return null;
                return (
                  <div
                    key={product.id}
                    className="p-3.5 bg-[#141414] border border-[#222] rounded flex gap-3.5 relative group hover:border-[#C5A059]/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product.id);
                      }}
                      className="w-20 aspect-[3/4] rounded overflow-hidden bg-neutral-900 shrink-0 cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between pr-6">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                          {product.collection}
                        </span>
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductDetail(product.id);
                          }}
                          className="font-serif text-base text-white hover:text-[#E8D3A2] cursor-pointer line-clamp-1"
                        >
                          {product.title}
                        </h4>
                        <span className="text-sm font-mono font-medium text-[#FAF7F0] mt-1 block">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      {/* Move to bag button */}
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="w-full mt-2 py-1.5 px-3 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 text-neutral-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Action */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 bg-[#0B0B0B] border-t border-[#222] space-y-3">
              <button
                onClick={handleMoveAllToBag}
                className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2 shadow-xl shadow-[#C5A059]/20 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

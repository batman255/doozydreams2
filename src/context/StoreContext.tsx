import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  ProductCategory,
  CartItem,
  Order,
  MediaAsset,
  CurrencyCode,
  CurrencyConfig,
  ProductColor,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_MEDIA_ASSETS } from '../data/media';
import { INITIAL_ORDERS } from '../data/orders';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getProducts, createProduct as createProductApi, updateProduct as updateProductApi, deleteProduct as deleteProductApi } from '../services/productService';
import { getOrders, saveOrder, updateOrderStatusInDb } from '../services/orderService';
import { signInWithEmail, signUpWithEmail, signOutUser, getProfile, CustomerProfile } from '../services/authService';
import { uploadImageToStorage } from '../services/storageService';
import { User, Session } from '@supabase/supabase-js';

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', rate: 155 },
  INR: { code: 'INR', symbol: '₹', rate: 84 },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67 },
};

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface StoreContextType {
  // Navigation & Views
  activeView: 'home' | 'shop' | 'festive' | 'party' | 'lookbook' | 'pdp' | 'admin';
  setActiveView: (view: 'home' | 'shop' | 'festive' | 'party' | 'lookbook' | 'pdp' | 'admin') => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  quickViewProductId: string | null;
  setQuickViewProductId: (productId: string | null) => void;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAIStylistOpen: boolean;
  setIsAIStylistOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  
  // Currency & Formatting
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;

  // Filter & Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;

  // Products & Supabase State
  products: Product[];
  isLoadingProducts: boolean;
  productsError: string | null;
  isSupabaseLive: boolean;
  refreshProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<boolean>;
  deleteProduct: (productId: string) => Promise<boolean>;
  uploadProductImage: (file: File) => Promise<{ url: string | null; error: string | null }>;

  // Auth & Profile
  user: User | null;
  session: Session | null;
  customerProfile: CustomerProfile | null;
  isAuthLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Promo Engine
  appliedPromo: { code: string; percent: number; discountAmount: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Gift Option
  giftWrap: boolean;
  setGiftWrap: (wrap: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'timeline'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string) => Promise<void>;

  // Media
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: MediaAsset) => void;
  deleteMediaAsset: (id: string) => void;

  // Admin
  adminActiveTab: 'overview' | 'products' | 'orders' | 'media' | 'reviews' | 'schema';
  setAdminActiveTab: (tab: 'overview' | 'products' | 'orders' | 'media' | 'reviews' | 'schema') => void;

  // Notifications
  notifications: ToastMessage[];
  addNotification: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeNotification: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Views
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'festive' | 'party' | 'lookbook' | 'pdp' | 'admin'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Currency
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');

  // Supabase & Products Data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [isSupabaseLive, setIsSupabaseLive] = useState(isSupabaseConfigured);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Cart, Wishlist, Orders, Media
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dd_wishlist');
      return saved ? JSON.parse(saved) : ['dd-001', 'dd-005'];
    } catch {
      return ['dd-001', 'dd-005'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('dd_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem('dd_media');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
    } catch {
      return INITIAL_MEDIA_ASSETS;
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; discountAmount: number } | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState<'overview' | 'products' | 'orders' | 'media' | 'reviews' | 'schema'>('overview');
  const [notifications, setNotifications] = useState<ToastMessage[]>([]);

  // Load products from Supabase or fallback
  const refreshProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const { data, error, fromDatabase } = await getProducts();
      setProducts(data);
      setIsSupabaseLive(fromDatabase);
      if (error) {
        setProductsError(error);
      } else {
        setProductsError(null);
      }
    } catch (err: any) {
      setProductsError(err.message || 'Failed to fetch catalog');
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    refreshProducts();

    // Check orders from Supabase
    getOrders().then(({ data }) => {
      if (data && data.length > 0) {
        setOrders(data);
      }
    });

    // Check Supabase Auth
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id).then(setCustomerProfile);
        }
        setIsAuthLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id).then(setCustomerProfile);
        } else {
          setCustomerProfile(null);
        }
        setIsAuthLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local demo profile check
      getProfile('vip-demo').then((prof) => {
        if (prof) setCustomerProfile(prof);
        setIsAuthLoading(false);
      });
    }
  }, [refreshProducts]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('dd_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Cart storage sync error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('dd_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Wishlist storage sync error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('dd_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Orders storage sync error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('dd_media', JSON.stringify(mediaAssets));
    } catch (e) {
      console.warn('Media storage sync error', e);
    }
  }, [mediaAssets]);

  const addNotification = (title: string, message: string, type: ToastMessage['type'] = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const setCurrencyCode = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrency(CURRENCIES[code]);
      addNotification('Currency Updated', `Switched display currency to ${code} (${CURRENCIES[code].symbol})`, 'info');
    }
  };

  const formatPrice = (amountInUSD: number) => {
    const converted = amountInUSD * currency.rate;
    if (currency.code === 'JPY' || currency.code === 'INR') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const itemId = `${product.id}-${color.name.toLowerCase().replace(/\s+/g, '-')}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedColor: color, selectedSize: size, quantity }];
    });

    addNotification('Added to Shopping Bag', `${product.title} (${size} · ${color.name})`, 'gold');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addNotification('Item Removed', 'Garment removed from your shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addNotification('Removed from Wishlist', prod ? prod.title : 'Item removed', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addNotification('Saved to Wishlist', prod ? prod.title : 'Item saved', 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Promo Code
  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DOOZYVIP15') {
      const percent = 15;
      const discountAmount = Math.round((cartSubtotal * percent) / 100);
      setAppliedPromo({ code: cleanCode, percent, discountAmount });
      addNotification('VIP Code Applied', '15% VIP Courtesy privilege applied to your order.', 'gold');
      return { success: true, message: '15% VIP discount applied!' };
    }
    if (cleanCode === 'GALA2026') {
      const percent = 20;
      const discountAmount = Math.round((cartSubtotal * percent) / 100);
      setAppliedPromo({ code: cleanCode, percent, discountAmount });
      addNotification('Gala Privilege Applied', '20% Gala season discount applied.', 'gold');
      return { success: true, message: '20% Gala discount applied!' };
    }
    if (cleanCode === 'FESTIVE50') {
      const percent = 10;
      const discountAmount = Math.round((cartSubtotal * percent) / 100);
      setAppliedPromo({ code: cleanCode, percent, discountAmount });
      addNotification('Festive Welcome Applied', '10% Festive promotion applied.', 'gold');
      return { success: true, message: '10% Festive discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "DOOZYVIP15" or "GALA2026".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addNotification('Promo Removed', 'Promotional code has been cleared.', 'info');
  };

  // Product Admin Operations (Supabase connected)
  const addProduct = async (product: Product): Promise<boolean> => {
    const res = await createProductApi(product);
    if (res.success) {
      setProducts((prev) => [product, ...prev]);
      addNotification('Product Added', `${product.title} saved to the atelier catalog.`, 'gold');
      return true;
    } else {
      addNotification('Error Saving', res.error || 'Failed to save product to database', 'info');
      return false;
    }
  };

  const updateProduct = async (product: Product): Promise<boolean> => {
    const res = await updateProductApi(product);
    if (res.success) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      addNotification('Product Updated', `${product.title} changes committed.`, 'gold');
      return true;
    } else {
      addNotification('Error Updating', res.error || 'Failed to update in database', 'info');
      return false;
    }
  };

  const deleteProduct = async (productId: string): Promise<boolean> => {
    const res = await deleteProductApi(productId);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      addNotification('Product Archived', 'Garment removed from catalog.', 'info');
      return true;
    } else {
      addNotification('Error Deleting', res.error || 'Failed to delete product', 'info');
      return false;
    }
  };

  const uploadProductImage = async (file: File) => {
    return await uploadImageToStorage(file, 'products');
  };

  // Auth operations
  const login = async (email: string, pass: string) => {
    const res = await signInWithEmail(email, pass);
    if (res.error) {
      addNotification('Authentication Failed', res.error, 'info');
      return { success: false, error: res.error };
    }
    setUser(res.user);
    setSession(res.session);
    if (res.user) {
      const prof = await getProfile(res.user.id);
      setCustomerProfile(prof);
    }
    addNotification('Welcome Back', `Authenticated as VIP Client (${email})`, 'gold');
    setIsAuthOpen(false);
    return { success: true };
  };

  const signup = async (email: string, pass: string, name: string) => {
    const res = await signUpWithEmail(email, pass, name);
    if (res.error) {
      addNotification('Registration Failed', res.error, 'info');
      return { success: false, error: res.error };
    }
    setUser(res.user);
    if (res.user) {
      const prof = await getProfile(res.user.id);
      setCustomerProfile(prof);
    }
    addNotification('Atelier VIP Created', `Welcome to DOOZY DREAM, ${name}.`, 'gold');
    setIsAuthOpen(false);
    return { success: true };
  };

  const logout = async () => {
    await signOutUser();
    setUser(null);
    setSession(null);
    setCustomerProfile(null);
    addNotification('Signed Out', 'You have been safely signed out.', 'info');
  };

  // Order Operations
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'timeline'>): Promise<Order> => {
    const id = `DD-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `DHL-LUXE-${Math.floor(100000000 + Math.random() * 900000000)}US`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString(),
      trackingNumber,
      timeline: [
        { status: 'Order Confirmed', date: 'Just now', description: 'Order verified by DOOZY Atelier VIP Concierge', completed: true, current: true },
        { status: 'Tailoring & QC', date: 'Pending', description: 'White-glove garment calibration and inspection', completed: false },
        { status: 'Handcrafted Packaging', date: 'Pending', description: 'Placed in signature obsidian box with wax seal', completed: false },
        { status: 'Dispatched', date: 'Pending', description: 'Direct insured express transit', completed: false },
        { status: 'Delivered', date: 'Pending', description: 'White-glove doorstep handover', completed: false },
      ],
    };

    await saveOrder(newOrder, user?.id);
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedPromo(null);
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status'], trackingNumber?: string) => {
    await updateOrderStatusInDb(orderId, status, trackingNumber);
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = order.timeline.map((step) => {
            if (step.status === status) {
              return { ...step, completed: true, current: true, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) };
            }
            return step;
          });
          return {
            ...order,
            status,
            trackingNumber: trackingNumber || order.trackingNumber,
            timeline: updatedTimeline,
          };
        }
        return order;
      })
    );
    addNotification('Order Status Updated', `Order ${orderId} is now ${status}.`, 'gold');
  };

  // Media Operations
  const addMediaAsset = (asset: MediaAsset) => {
    setMediaAssets((prev) => [asset, ...prev]);
    addNotification('Media Asset Added', `${asset.title} added to media repository.`, 'gold');
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
    addNotification('Media Deleted', 'Asset removed from library.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        openProductDetail,
        quickViewProductId,
        setQuickViewProductId,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAIStylistOpen,
        setIsAIStylistOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        isAuthOpen,
        setIsAuthOpen,
        currency,
        setCurrencyCode,
        formatPrice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedOccasion,
        setSelectedOccasion,
        products,
        isLoadingProducts,
        productsError,
        isSupabaseLive,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        user,
        session,
        customerProfile,
        isAuthLoading,
        login,
        signup,
        logout,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        giftWrap,
        setGiftWrap,
        giftMessage,
        setGiftMessage,
        orders,
        createOrder,
        updateOrderStatus,
        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,
        adminActiveTab,
        setAdminActiveTab,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

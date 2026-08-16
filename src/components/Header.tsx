import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CurrencyCode } from '../types';
import {
  Search,
  ShoppingBag,
  Heart,
  Sparkles,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ANNOUNCEMENTS = [
  'Complimentary White-Glove Global Delivery on Orders Over $350',
  'Haute Couture Autumn / Winter Festive Stories Now Live',
  'Experience Personal Styling with DOOZY AI Fashion Concierge',
  'Private Atelier Appointments Open · Paris & New York',
];

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartTotalCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAIStylistOpen,
    setIsAccountOpen,
    currency,
    setCurrencyCode,
    setSelectedCategory,
  } = useStore();

  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Rotating top announcement
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Header scroll shadow / blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'shop' | 'festive' | 'party' | 'lookbook' | 'pdp' | 'admin', category?: string) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category as any);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#050505] text-[#C5A059] border-b border-[#C5A059]/20 px-4 py-2 text-xs font-sans tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-neutral-400 font-light tracking-wider">
            <span>PARIS · MILAN · NEW YORK · LONDON</span>
          </div>

          <div className="flex-1 text-center overflow-hidden h-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={announcementIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-[11px] font-medium tracking-widest text-[#E8D3A2] truncate max-w-xl"
              >
                ✦ {ANNOUNCEMENTS[announcementIdx]} ✦
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Quick Currency & Admin Switch */}
          <div className="hidden lg:flex items-center gap-5 text-[11px]">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-[#C5A059] transition-colors uppercase tracking-wider"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              <AnimatePresence>
                {isCurrencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-32 bg-[#121212] border border-[#C5A059]/30 rounded-md shadow-2xl py-1 z-50"
                  >
                    {(['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AED'] as CurrencyCode[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrencyCode(c);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors flex items-center justify-between ${
                          currency.code === c ? 'text-[#C5A059] bg-[#C5A059]/10 font-semibold' : 'text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        <span>{c}</span>
                        <span className="text-neutral-500">{c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : c === 'JPY' ? '¥' : c === 'INR' ? '₹' : 'AED'}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Switcher */}
            <button
              onClick={() => handleNavClick(activeView === 'admin' ? 'home' : 'admin')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded border transition-all ${
                activeView === 'admin'
                  ? 'bg-[#C5A059] text-black border-[#C5A059] font-semibold shadow-md shadow-[#C5A059]/30'
                  : 'bg-neutral-900/90 text-[#E8D3A2] border-[#C5A059]/40 hover:border-[#C5A059]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{activeView === 'admin' ? 'Exit Admin' : 'Atelier Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#262626] shadow-xl shadow-black/60'
            : 'bg-[#0B0B0B]/90 backdrop-blur-sm border-b border-[#1E1E1E]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-[#C5A059] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left / Center Nav links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.16em] uppercase font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-2 relative ${
                activeView === 'home' ? 'text-[#C5A059]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Home
              {activeView === 'home' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`transition-colors py-2 relative ${
                activeView === 'shop' ? 'text-[#C5A059]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Women's Collection
              {activeView === 'shop' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('festive', 'Festive Stories')}
              className={`transition-colors py-2 relative ${
                activeView === 'festive' ? 'text-[#C5A059]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Festive Stories
              {activeView === 'festive' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('party', 'Party Nights')}
              className={`transition-colors py-2 relative ${
                activeView === 'party' ? 'text-[#C5A059]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Party Nights
              {activeView === 'party' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('lookbook')}
              className={`transition-colors py-2 relative ${
                activeView === 'lookbook' ? 'text-[#C5A059]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              The Atelier Journal
              {activeView === 'lookbook' && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
              )}
            </button>
          </nav>

          {/* Center Brand Identity / Monogram */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer text-center group py-2"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] font-light text-[#FDFBF7] group-hover:text-[#E8D3A2] transition-colors uppercase block">
              DOOZY DREAM
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#C5A059] uppercase font-sans font-light block -mt-0.5">
              Haute Couture · Paris
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* AI Stylist Trigger Button */}
            <button
              onClick={() => setIsAIStylistOpen(true)}
              className="relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#211b11] via-[#312513] to-[#211b11] border border-[#C5A059]/60 text-[#E8D3A2] text-xs font-medium tracking-wider hover:border-[#C5A059] hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-[11px] uppercase tracking-widest font-sans font-medium text-[#F5EFEB]">AI Stylist</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-300 hover:text-[#C5A059] transition-colors rounded-full hover:bg-white/5"
              aria-label="Search garments"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-neutral-300 hover:text-[#C5A059] transition-colors relative rounded-full hover:bg-white/5"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Orders Modal */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-neutral-300 hover:text-[#C5A059] transition-colors rounded-full hover:bg-white/5"
              aria-label="My Account and Orders"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-100 hover:text-[#C5A059] transition-colors relative flex items-center gap-2 rounded-full hover:bg-white/5 pl-2 pr-3 bg-neutral-900/60 border border-[#2B2B2B]"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <span className="text-xs font-semibold tracking-wider font-mono">
                {cartTotalCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F0F0F] border-b border-[#262626] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <button
                onClick={() => {
                  setIsAIStylistOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#2B200D] to-[#17140E] border border-[#C5A059]/50 flex items-center justify-center gap-2 text-[#E8D3A2] text-xs font-bold uppercase tracking-widest mb-4"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Consult DOOZY AI Stylist Concierge</span>
              </button>

              <div className="flex flex-col space-y-3 text-sm font-sans tracking-widest uppercase text-neutral-300">
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-left py-2 border-b border-neutral-800 hover:text-[#C5A059]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'All')}
                  className="text-left py-2 border-b border-neutral-800 hover:text-[#C5A059]"
                >
                  Women's Collection
                </button>
                <button
                  onClick={() => handleNavClick('festive', 'Festive Stories')}
                  className="text-left py-2 border-b border-neutral-800 hover:text-[#C5A059]"
                >
                  Festive Stories
                </button>
                <button
                  onClick={() => handleNavClick('party', 'Party Nights')}
                  className="text-left py-2 border-b border-neutral-800 hover:text-[#C5A059]"
                >
                  Party Nights
                </button>
                <button
                  onClick={() => handleNavClick('lookbook')}
                  className="text-left py-2 border-b border-neutral-800 hover:text-[#C5A059]"
                >
                  The Atelier Journal
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-left py-2 border-b border-neutral-800 text-[#C5A059] flex items-center justify-between"
                >
                  <span>Atelier Admin Portal</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>

              {/* Currency Selector on Mobile */}
              <div className="pt-4 flex items-center justify-between border-t border-neutral-800 text-xs">
                <span className="text-neutral-400">Display Currency:</span>
                <div className="flex gap-2">
                  {(['USD', 'EUR', 'GBP', 'INR'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrencyCode(c)}
                      className={`px-2 py-1 rounded text-xs ${
                        currency.code === c
                          ? 'bg-[#C5A059] text-black font-bold'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

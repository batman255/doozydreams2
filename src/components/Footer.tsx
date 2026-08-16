import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Shield, Truck, RotateCcw, Clock, Mail, ArrowRight, Instagram, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, addNotification, currency, setCurrencyCode } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    addNotification('Privilege Enrolled', 'You have been granted early access to our private seasonal trunk shows.', 'gold');
    setNewsletterEmail('');
  };

  const handleNav = (view: any, cat?: string) => {
    setActiveView(view);
    if (cat) setSelectedCategory(cat as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#FAF7F0] border-t border-[#222222] font-sans">
      {/* Brand Assurances Bar */}
      <div className="border-b border-[#1A1A1A] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#FAF7F0] font-semibold">
                White-Glove Global Delivery
              </h4>
              <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                Complimentary insured transit to over 120 countries.
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#FAF7F0] font-semibold">
                Haute Atelier Craftsmanship
              </h4>
              <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                Hand-draped bias cuts, Mulberry silks and 24k bullion zardozi.
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#FAF7F0] font-semibold">
                Complimentary VIP Tailoring
              </h4>
              <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                Bespoke sizing and custom fit calibrations upon request.
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#FAF7F0] font-semibold">
                Effortless 30-Day Returns
              </h4>
              <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                Doorstep courier collection in original obsidian packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl tracking-[0.25em] text-[#FAF7F0] uppercase font-light">
              DOOZY DREAM
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
            HAUTE COUTURE & LUXURY ATELIER
          </span>
          <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
            DOOZY DREAM represents the pinnacle of modern luxury eveningwear. Defined by architectural silhouettes, liquid drape silks, and opulent hand-embroidery.
          </p>

          {/* Salon Locations */}
          <div className="pt-2 text-[11px] text-neutral-400 space-y-1">
            <p><strong className="text-neutral-200">Paris Salon:</strong> 42 Avenue Montaigne, 75008 Paris</p>
            <p><strong className="text-neutral-200">New York Atelier:</strong> 740 Madison Avenue, NY 10065</p>
            <p><strong className="text-neutral-200">London Suite:</strong> 14 Bond Street, Mayfair W1S</p>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
            Collections
          </h5>
          <ul className="space-y-2 text-xs text-neutral-400 font-light">
            <li>
              <button onClick={() => handleNav('shop', 'Gowns & Dresses')} className="hover:text-[#FAF7F0] transition-colors">
                The Gala Collection
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('festive', 'Festive Stories')} className="hover:text-[#FAF7F0] transition-colors">
                Festive Stories
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('party', 'Party Nights')} className="hover:text-[#FAF7F0] transition-colors">
                Party Nights & Soirées
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('shop', 'Silk & Velvet')} className="hover:text-[#FAF7F0] transition-colors">
                Silk & Micro-Velvet
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('shop', 'Co-ord Sets')} className="hover:text-[#FAF7F0] transition-colors">
                Haute Co-ord Sets
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('lookbook')} className="hover:text-[#FAF7F0] transition-colors">
                Autumn / Winter Lookbook
              </button>
            </li>
          </ul>
        </div>

        {/* Client Concierge */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
            Concierge Services
          </h5>
          <ul className="space-y-2 text-xs text-neutral-400 font-light">
            <li>
              <button onClick={() => handleNav('shop')} className="hover:text-[#FAF7F0] transition-colors">
                VIP Private Appointments
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('shop')} className="hover:text-[#FAF7F0] transition-colors">
                Bespoke Fit Calibration
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('shop')} className="hover:text-[#FAF7F0] transition-colors">
                Track Haute Delivery
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('admin')} className="hover:text-[#FAF7F0] transition-colors text-[#C5A059]">
                Atelier Console ✦
              </button>
            </li>
          </ul>
        </div>

        {/* VIP Newsletter */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
            VIP Trunk Access
          </h5>
          <p className="text-xs text-neutral-400 font-light">
            Receive private invites to limited edition runway drops and private salon fittings.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter private email..."
                className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#C5A059] text-xs text-[#FAF7F0] px-3 py-2.5 rounded-sm outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D4AF37] transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {isSubscribed && (
              <p className="text-[11px] text-[#C5A059]">
                ✦ Privilege invitation recorded.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Copyright & Disclaimer Bar */}
      <div className="border-t border-[#1C1C1C] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
        <p>© 2026 DOOZY DREAM HAUTE ATELIER. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6">
          <span>Paris · Milan · New York · London · Tokyo</span>
          <span>Supabase Production Data Layer</span>
        </div>
      </div>
    </footer>
  );
};

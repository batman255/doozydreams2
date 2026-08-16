import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Shield,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AccountOrdersModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders, formatPrice, setActiveView, user, customerProfile, setIsAuthOpen, logout } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id || null);

  if (!isAccountOpen) return null;

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#111111] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-[#0B0B0B] border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#FAF7F0] tracking-wide">
                VIP Atelier Client Portal
              </h2>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059]">
                Membership Tier: Haute Couture Diamant Private Circle
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content (Left: Orders list / Profile, Right: Live Tracker) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 text-neutral-200">
          {/* Left Column: Client Dossier & Order History (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 border-b lg:border-b-0 lg:border-r border-[#222] pb-6 lg:pb-0 lg:pr-6">
            {/* VIP Client Profile Summary */}
            <div className="p-4 bg-[#161616] border border-neutral-800 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base text-white font-medium">
                  {customerProfile?.fullName || (user ? user.email : 'Lady Genevieve Du Pont')}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#E8D3A2] border border-[#C5A059]/40">
                  {user ? 'VIP Verified' : 'Guest Dossier'}
                </span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[11px] font-light">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#C5A059]" /> {user?.email || 'genevieve.dupont@hauteluxe.fr'}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A059]" /> 42 Avenue Montaigne, Paris
                </p>
                <p className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#C5A059]" /> Private Stylist: Madame Claudine
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                {user ? (
                  <button
                    onClick={() => logout()}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      setIsAuthOpen(true);
                    }}
                    className="text-[11px] text-[#C5A059] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Sign In to VIP Account →</span>
                  </button>
                )}
              </div>
            </div>

            {/* Orders Tab */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-3">
                Your Atelier Commissions ({orders.length})
              </h4>
              <div className="space-y-2.5">
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                      selectedOrder?.id === ord.id
                        ? 'bg-[#1D180F] border-[#C5A059] ring-1 ring-[#C5A059]'
                        : 'bg-[#151515] border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-semibold text-white">{ord.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>{ord.createdAt}</span>
                      <span className="font-mono text-white font-medium">{formatPrice(ord.total)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Tracking Stepper & Order Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedOrder ? (
              <>
                {/* Order Details Header */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059]">
                      Tracking Commission
                    </span>
                    <h3 className="font-serif text-2xl text-white mt-0.5">
                      Order {selectedOrder.id}
                    </h3>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-neutral-400 block">Courier:</span>
                    <span className="text-[#E8D3A2]">{selectedOrder.deliveryMethod}</span>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="bg-[#161616] p-5 rounded-lg border border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block mb-4">
                    Live Atelier Transit Progress
                  </span>

                  <div className="relative flex items-center justify-between">
                    {/* Line */}
                    <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-neutral-800 -translate-y-1/2 z-0" />
                    <div
                      className="absolute top-1/2 left-4 h-0.5 bg-[#C5A059] -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        width: `${((getStatusStepIndex(selectedOrder.status) - 1) / 3) * 100}%`,
                      }}
                    />

                    {/* Step 1: Registered */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#C5A059] text-black flex items-center justify-center text-xs font-bold shadow-md shadow-[#C5A059]/40">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono mt-2 text-neutral-300">Registered</span>
                    </div>

                    {/* Step 2: Tailoring / Processing */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        getStatusStepIndex(selectedOrder.status) >= 2
                          ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/40'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono mt-2 text-neutral-300">Paris Atelier</span>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        getStatusStepIndex(selectedOrder.status) >= 3
                          ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/40'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono mt-2 text-neutral-300">In Air Transit</span>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        getStatusStepIndex(selectedOrder.status) >= 4
                          ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/40'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}>
                        <Package className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono mt-2 text-neutral-300">Delivered</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between text-xs font-mono text-neutral-300">
                    <div>
                      <span className="text-neutral-500 block">Tracking Reference:</span>
                      <span className="text-white font-medium">{selectedOrder.trackingNumber}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 block">Est. Delivery:</span>
                      <span className="text-emerald-400 font-medium">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
                    Garments in Commission ({selectedOrder.items.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#151515] border border-neutral-800 rounded flex items-center gap-3"
                      >
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-12 aspect-[3/4] object-cover rounded bg-neutral-900"
                        />
                        <div className="flex-1">
                          <h5 className="font-serif text-sm text-white">{it.title}</h5>
                          <div className="flex gap-2 text-xs font-mono text-neutral-400 mt-0.5">
                            <span>Size: {it.size}</span>
                            <span>·</span>
                            <span>Hue: {it.color}</span>
                            <span>·</span>
                            <span>Qty: {it.quantity}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-medium text-white">
                          {formatPrice(it.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Receipt Actions */}
                <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 border border-neutral-700 hover:border-neutral-500 rounded text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#C5A059]" />
                    <span>Download VAT Invoice</span>
                  </button>

                  <div className="text-right text-xs font-mono">
                    <span className="text-neutral-400 mr-2">Grand Total:</span>
                    <span className="font-serif text-base text-white font-bold">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-neutral-500">
                <Package className="w-10 h-10 mx-auto mb-2 text-[#C5A059]" />
                <p>No order selected</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

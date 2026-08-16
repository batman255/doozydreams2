import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderItem } from '../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Gift,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    appliedPromo,
    giftWrap,
    giftMessage,
    formatPrice,
    createOrder,
    setIsAccountOpen,
    setActiveView,
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment' | 'confirmation'>('shipping');

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Lady Genevieve Du Pont',
    email: 'genevieve.dupont@hauteluxe.fr',
    phone: '+33 6 42 98 11 02',
    address: '42 Avenue Montaigne, Appt 5B',
    city: 'Paris',
    state: 'Île-de-France',
    zip: '75008',
    country: 'France',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'White-Glove Courier' | 'Express Air Luxe' | 'Standard Eco'>('White-Glove Courier');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Apple Pay' | 'Klarna Luxury Split' | 'Wire Transfer'>('Credit Card');

  // Simulated Card State
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    name: 'GENEVIEVE DU PONT',
    expiry: '09/28',
    cvc: '888',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const discountAmount = appliedPromo ? (cartSubtotal * appliedPromo.percent) / 100 : 0;
  const shippingCost = deliveryMethod === 'White-Glove Courier' ? 0 : deliveryMethod === 'Express Air Luxe' ? 0 : 0;
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderItems: OrderItem[] = cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        sku: item.product.sku,
        image: item.product.images[0],
        price: item.product.price,
        color: item.selectedColor.name,
        size: item.selectedSize,
        quantity: item.quantity,
      }));

      const newOrder = createOrder({
        customer: formData,
        items: orderItems,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: shippingCost,
        total: totalAmount,
        promoCode: appliedPromo?.code,
        giftWrap,
        giftMessage,
        deliveryMethod,
        paymentMethod,
        paymentStatus: 'Paid',
        status: 'Pending',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-[#111111] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-[#0B0B0B] border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl tracking-widest text-[#FDFBF7] uppercase">
              DOOZY DREAM
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase px-2 py-0.5 rounded bg-[#C5A059]/10 border border-[#C5A059]/30">
              White-Glove Checkout
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper (Hidden on confirmation) */}
        {step !== 'confirmation' && (
          <div className="px-6 py-3 bg-[#161616] border-b border-[#222] flex items-center justify-between text-xs font-mono uppercase tracking-wider">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-[#C5A059] font-bold' : 'text-neutral-400'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span>Client Address</span>
            </div>
            <span className="text-neutral-600">———</span>
            <div className={`flex items-center gap-2 ${step === 'delivery' ? 'text-[#C5A059] font-bold' : 'text-neutral-400'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span>Atelier Delivery</span>
            </div>
            <span className="text-neutral-600">———</span>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#C5A059] font-bold' : 'text-neutral-400'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
              <span>Secure Payment</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-neutral-200">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-white mb-1">Shipping & Recipient Details</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Please provide your residence or private suite details for secure signature delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Full Name / Title
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Email for VIP Tracking
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Postal Code / Zip
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="France">France</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Italy">Italy</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Phone (Courier Contact)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              {/* Next CTA */}
              <div className="flex justify-end pt-4 border-t border-neutral-800">
                <button
                  onClick={() => setStep('delivery')}
                  className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center gap-2"
                >
                  <span>Continue to Delivery Options</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY METHOD */}
          {step === 'delivery' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-white mb-1">Select Delivery Tier</h3>
                <p className="text-xs text-neutral-400 font-light">
                  All shipments are fully insured and packaged in our signature luxury obsidian box.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'White-Glove Courier',
                    title: 'White-Glove Dedicated Courier',
                    desc: 'Scheduled personal hand-delivery with signature verification & hanger bag inspection.',
                    time: '1–2 Business Days',
                    cost: 'Complimentary',
                  },
                  {
                    id: 'Express Air Luxe',
                    title: 'DHL Express Air Luxe',
                    desc: 'Direct priority air transit with real-time GPS tracking and climate control.',
                    time: '2–3 Business Days',
                    cost: 'Complimentary',
                  },
                  {
                    id: 'Standard Eco',
                    title: 'Standard Eco Carbon-Neutral',
                    desc: 'Sustainable ground transport with 100% offset carbon footprint.',
                    time: '4–6 Business Days',
                    cost: 'Complimentary',
                  },
                ].map((tier) => (
                  <label
                    key={tier.id}
                    onClick={() => setDeliveryMethod(tier.id as any)}
                    className={`p-4 rounded-lg border cursor-pointer flex items-start justify-between transition-all ${
                      deliveryMethod === tier.id
                        ? 'bg-[#1C180E] border-[#C5A059] ring-1 ring-[#C5A059]'
                        : 'bg-[#151515] border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === tier.id}
                        onChange={() => setDeliveryMethod(tier.id as any)}
                        className="mt-1 accent-[#C5A059]"
                      />
                      <div>
                        <h4 className="text-sm font-serif font-medium text-white">{tier.title}</h4>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">{tier.desc}</p>
                        <span className="text-[11px] font-mono text-[#C5A059] mt-1 block">
                          Estimated Time: {tier.time}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                      {tier.cost}
                    </span>
                  </label>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between pt-4 border-t border-neutral-800">
                <button
                  onClick={() => setStep('shipping')}
                  className="px-6 py-3 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider rounded flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep('payment')}
                  className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-white mb-1">Encrypted Payment Gateway</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Select your preferred high-security luxury payment method.
                </p>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Credit Card', label: 'Credit Card' },
                  { id: 'Apple Pay', label: 'Apple Pay' },
                  { id: 'Klarna Luxury Split', label: 'Klarna Split' },
                  { id: 'Wire Transfer', label: 'Wire Transfer' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2.5 px-3 rounded text-xs font-mono uppercase tracking-wider border transition-all ${
                      paymentMethod === m.id
                        ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                        : 'bg-[#151515] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Simulated Card Fields */}
              {paymentMethod === 'Credit Card' && (
                <div className="p-4 bg-[#161616] border border-neutral-800 rounded-lg space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full bg-[#0E0E0E] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                      />
                      <CreditCard className="w-4 h-4 text-[#C5A059] absolute right-3.5 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full bg-[#0E0E0E] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full bg-[#0E0E0E] border border-neutral-700 rounded px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="p-4 bg-[#141414] border border-[#222] rounded space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Garments Subtotal:</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C5A059]">
                    <span>VIP Privilege Promo:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>White-Glove Delivery:</span>
                  <span className="text-emerald-400 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-serif text-white pt-2 border-t border-neutral-800 font-bold">
                  <span>Grand Total:</span>
                  <span className="font-mono text-[#FAF7F0]">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between pt-4 border-t border-neutral-800">
                <button
                  onClick={() => setStep('delivery')}
                  className="px-6 py-3 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider rounded flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center gap-2 shadow-xl shadow-[#C5A059]/30 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-black" />
                      <span>Authorizing Bespoke Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize & Place Order ({formatPrice(totalAmount)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION & RECEIPT */}
          {step === 'confirmation' && completedOrder && (
            <div className="py-4 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059] shadow-xl shadow-[#C5A059]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059]">
                  Atelier Verification Complete
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                  Thank You, {completedOrder.customer.fullName}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-2 max-w-md mx-auto">
                  Your haute couture order has been registered with our Parisian atelier. A personalized confirmation dossier has been sent to <strong className="text-white">{completedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Dossier Card */}
              <div className="bg-[#161616] border border-neutral-800 rounded-lg p-6 text-left space-y-4 max-w-lg mx-auto">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
                  <span className="text-neutral-400">Order Reference:</span>
                  <span className="text-[#C5A059] font-bold">{completedOrder.id}</span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
                  <span className="text-neutral-400">Tracking Number:</span>
                  <span className="text-white font-medium">{completedOrder.trackingNumber}</span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
                  <span className="text-neutral-400">Estimated Delivery:</span>
                  <span className="text-emerald-400 font-medium">{completedOrder.estimatedDelivery}</span>
                </div>

                {/* Items Summary */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Reserved Creations:
                  </span>
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-neutral-200 line-clamp-1">
                        {it.title} ({it.size} · {it.color})
                      </span>
                      <span className="font-mono text-neutral-400">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-800 pt-3 flex justify-between font-serif text-sm text-white">
                  <span>Total Paid:</span>
                  <span className="font-mono text-[#FAF7F0]">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-6 py-3 border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-xs font-mono uppercase tracking-wider rounded flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#C5A059]" />
                  <span>Print Atelier Receipt</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    setIsAccountOpen(true);
                  }}
                  className="px-6 py-3 bg-[#C5A059] hover:bg-[#D8B469] text-black text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2"
                >
                  <span>Track Live Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

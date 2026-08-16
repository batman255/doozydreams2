import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'DD-ORD-88291',
    createdAt: '2026-08-14T14:30:00Z',
    customer: {
      fullName: 'Genevieve Du Pont',
      email: 'genevieve.dupont@hauteluxe.fr',
      phone: '+33 6 42 98 11 02',
      address: '42 Avenue Montaigne',
      city: 'Paris',
      state: 'Île-de-France',
      zip: '75008',
      country: 'France'
    },
    items: [
      {
        productId: 'dd-001',
        title: 'The Aurelia Liquid Gold Draped Gown',
        sku: 'DD-GL-8901',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
        price: 1850,
        color: 'Champagne Gold',
        size: 'S',
        quantity: 1
      },
      {
        productId: 'dd-007',
        title: 'The Palais Crystal-Embellished Minaudière Clutch',
        sku: 'DD-AC-9901',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
        price: 680,
        color: 'Crystal Gold',
        size: 'One Size',
        quantity: 1
      }
    ],
    subtotal: 2530,
    discount: 0,
    shipping: 0,
    total: 2530,
    giftWrap: true,
    giftMessage: 'Pour une soirée inoubliable à Monte-Carlo. Avec tout mon amour.',
    deliveryMethod: 'White-Glove Courier',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Dispatched',
    trackingNumber: 'DHL-LUXE-992834812FR',
    estimatedDelivery: '2026-08-18',
    timeline: [
      { status: 'Order Confirmed', date: 'Aug 14, 2:30 PM', description: 'Order verified by DOOZY VIP Atelier Concierge', completed: true },
      { status: 'Tailoring & QC', date: 'Aug 15, 10:15 AM', description: 'Hand-inspection and custom hem calibration complete', completed: true },
      { status: 'Handcrafted Packaging', date: 'Aug 15, 4:45 PM', description: 'Packaged in signature obsidian linen box with golden wax seal', completed: true },
      { status: 'Dispatched', date: 'Aug 16, 9:00 AM', description: 'In transit via DHL Express Air Luxe to Paris', completed: true, current: true },
      { status: 'Out for Delivery', date: 'Pending', description: 'White-glove courier courier assignment', completed: false },
      { status: 'Delivered', date: 'Pending', description: 'Handed over with signature verification', completed: false }
    ]
  },
  {
    id: 'DD-ORD-88290',
    createdAt: '2026-08-15T09:12:00Z',
    customer: {
      fullName: 'Charlotte Kensington',
      email: 'c.kensington@mayfairclub.co.uk',
      phone: '+44 20 7946 0912',
      address: '14 Berkeley Square, Mayfair',
      city: 'London',
      state: 'Greater London',
      zip: 'W1J 6BQ',
      country: 'United Kingdom'
    },
    items: [
      {
        productId: 'dd-002',
        title: 'The Zari Embroidered Velvet Festive Ensemble',
        sku: 'DD-FS-4412',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        price: 1650,
        color: 'Royal Emerald',
        size: 'M',
        quantity: 1
      }
    ],
    subtotal: 1650,
    discount: 165,
    shipping: 0,
    promoCode: 'DOOZYVIP15',
    total: 1485,
    giftWrap: true,
    giftMessage: 'Happy Festive Season from DOOZY DREAM.',
    deliveryMethod: 'Express Air Luxe',
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    status: 'Tailoring & QC',
    trackingNumber: 'FDX-PRIO-77192834GB',
    estimatedDelivery: '2026-08-19',
    timeline: [
      { status: 'Order Confirmed', date: 'Aug 15, 9:12 AM', description: 'Order placed via VIP Club membership', completed: true },
      { status: 'Tailoring & QC', date: 'Aug 15, 2:00 PM', description: 'Gold bullion embroidery quality audit in progress', completed: true, current: true },
      { status: 'Handcrafted Packaging', date: 'Pending', description: 'Signature box preparation', completed: false },
      { status: 'Dispatched', date: 'Pending', description: 'Dispatch via FedEx International Priority', completed: false },
      { status: 'Delivered', date: 'Pending', description: 'Delivery scheduled', completed: false }
    ]
  },
  {
    id: 'DD-ORD-88289',
    createdAt: '2026-08-12T18:45:00Z',
    customer: {
      fullName: 'Aria Montgomery',
      email: 'aria.m@tribecaarts.ny',
      phone: '+1 (212) 555-0199',
      address: '74 Franklin Street, Penthouse B',
      city: 'New York',
      state: 'NY',
      zip: '10013',
      country: 'United States'
    },
    items: [
      {
        productId: 'dd-003',
        title: 'The Stardust Micro-Sequin Corset Mini Dress',
        sku: 'DD-PN-7721',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        price: 1250,
        color: 'Platinum Noir',
        size: 'S',
        quantity: 1
      }
    ],
    subtotal: 1250,
    discount: 0,
    shipping: 0,
    total: 1250,
    giftWrap: false,
    deliveryMethod: 'White-Glove Courier',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNumber: 'UPS-EXP-11928471US',
    estimatedDelivery: '2026-08-15',
    timeline: [
      { status: 'Order Confirmed', date: 'Aug 12, 6:45 PM', description: 'Order confirmed', completed: true },
      { status: 'Tailoring & QC', date: 'Aug 13, 9:00 AM', description: 'Corset boning verification completed', completed: true },
      { status: 'Handcrafted Packaging', date: 'Aug 13, 3:30 PM', description: 'Sealed with protective garment shroud', completed: true },
      { status: 'Dispatched', date: 'Aug 14, 8:00 AM', description: 'Dispatched via UPS Express Next Day', completed: true },
      { status: 'Delivered', date: 'Aug 15, 1:15 PM', description: 'Signed for by Doorman / Resident', completed: true, current: true }
    ]
  }
];

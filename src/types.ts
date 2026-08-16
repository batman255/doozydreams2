export type ProductCategory =
  | 'All'
  | 'Gowns & Dresses'
  | 'Festive Stories'
  | 'Party Nights'
  | 'Co-ord Sets'
  | 'Silk & Velvet'
  | 'Tops & Blouses'
  | 'Outerwear'
  | 'Accessories & Jewelry';

export type ProductOccasion =
  | 'Black Tie & Gala'
  | 'Cocktail & Soirée'
  | 'Party & Soirée'
  | 'Festive & Celebration'
  | 'Resort & Vacation'
  | 'Bridal & Reception'
  | 'Modern Power & Evening';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Fit';
  inStock: boolean;
  stockCount: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: ProductCategory;
  collection: string;
  occasion: ProductOccasion[];
  description: string;
  editorialQuote?: string;
  fabric: string;
  lining?: string;
  care: string[];
  modelSpecs: {
    height: string;
    wearingSize: string;
    bust: string;
    waist: string;
  };
  sizes: ProductSize[];
  colors: ProductColor[];
  images: string[];
  tags: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isFestive?: boolean;
  isPartyNight?: boolean;
  isBestSeller?: boolean;
  stockTotal: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  stylingTips: string[];
  completeTheLookProductIds?: string[];
  published: boolean;
}

export interface CollectionInfo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  thumbnailImage: string;
  season: string;
  quote: string;
  curator: string;
  themeColor: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  sku: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Tailoring & QC' | 'Handcrafted Packaging' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface OrderTimelineStep {
  status: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode?: string;
  giftWrap: boolean;
  giftMessage?: string;
  deliveryMethod: 'White-Glove Courier' | 'Express Air Luxe' | 'Standard Eco';
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Klarna Luxury Split' | 'Wire Transfer';
  paymentStatus: 'Paid' | 'Authorized' | 'Pending';
  status: OrderStatus;
  trackingNumber: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category: string;
  dimensions: string;
  size: string;
  uploadedAt: string;
  aspectRatio: string;
}

export interface StylistRequest {
  occasion: string;
  aesthetic: string;
  colorPreference?: string;
  budgetRange?: string;
  additionalNotes?: string;
}

export interface StylistRecommendation {
  lookTitle: string;
  editorialSummary: string;
  recommendedGarmentId: string;
  stylingNotes: string;
  footwear: string;
  jewelryAndBag: string;
  hairAndMakeup: string;
  confidenceTip: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // against USD base
}

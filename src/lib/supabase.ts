import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Safe URL formatting and validation
function sanitizeSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return 'https://placeholder-project.supabase.co';
  }
  let trimmed = rawUrl.trim();
  if (!trimmed || trimmed.includes('placeholder') || trimmed.includes('your-project') || trimmed.includes('your-supabase')) {
    return 'https://placeholder-project.supabase.co';
  }
  // Auto-prepend https:// if missing
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return trimmed;
    }
  } catch {
    // If URL parsing fails, fallback safely
  }
  return 'https://placeholder-project.supabase.co';
}

function sanitizeSupabaseKey(rawKey?: string): string {
  if (!rawKey || typeof rawKey !== 'string') {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';
  }
  const trimmed = rawKey.trim();
  if (!trimmed || trimmed.includes('placeholder') || trimmed.includes('your-anon-key') || trimmed.includes('your-publishable-key')) {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';
  }
  return trimmed;
}

const rawEnvUrl = import.meta.env.VITE_SUPABASE_URL;
const rawEnvKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl: string = sanitizeSupabaseUrl(rawEnvUrl);
const supabasePublishableKey: string = sanitizeSupabaseKey(rawEnvKey);

/**
 * Flag indicating whether real production Supabase credentials are configured.
 */
export const isSupabaseConfigured: boolean = Boolean(
  rawEnvUrl &&
  rawEnvKey &&
  supabaseUrl !== 'https://placeholder-project.supabase.co' &&
  !supabaseUrl.includes('placeholder') &&
  !supabasePublishableKey.includes('placeholder')
);

/**
 * Singleton Supabase Client instance.
 * Lazily instantiated and exported as a singleton for the entire application lifecycle.
 */
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client with current credentials; using fallback client.', err);
      supabaseInstance = createClient('https://placeholder-project.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder', {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      });
    }
  }
  return supabaseInstance;
}

// Export singleton instance
export const supabase: SupabaseClient = getSupabaseClient();

/**
 * Database Table Types & Interfaces for Supabase schema
 */
export interface DbProduct {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  price: number;
  original_price?: number | null;
  discount_percentage?: number | null;
  category: string;
  collection: string;
  occasion: string[];
  description: string;
  editorial_quote?: string | null;
  fabric: string;
  lining?: string | null;
  care: string[];
  model_specs: {
    height: string;
    wearingSize: string;
    bust: string;
    waist: string;
  };
  sizes: Array<{
    size: string;
    inStock: boolean;
    stockCount: number;
  }>;
  colors: Array<{
    name: string;
    hex: string;
    imageIndex?: number;
  }>;
  images: string[];
  tags: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
  is_festive: boolean;
  is_party_night: boolean;
  is_best_seller: boolean;
  stock_total: number;
  rating: number;
  review_count: number;
  styling_tips: string[];
  complete_the_look_ids?: string[] | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbOrder {
  id: string;
  user_id?: string | null;
  customer_full_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zip: string;
  customer_country: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promo_code?: string | null;
  gift_wrap: boolean;
  gift_message?: string | null;
  delivery_method: string;
  payment_method: string;
  payment_status: string;
  status: string;
  tracking_number: string;
  estimated_delivery: string;
  created_at: string;
}

export interface DbOrderItem {
  id?: string;
  order_id: string;
  product_id: string;
  title: string;
  sku: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

export interface DbProfile {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  tier?: 'VIP Atelier' | 'Haute Patron' | 'Member';
  created_at?: string;
}

export interface DbReview {
  id: string;
  product_id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  fit_feedback: string;
  date: string;
}

export interface DbCoupon {
  code: string;
  discount_percent: number;
  active: boolean;
  expires_at?: string | null;
  min_spend?: number | null;
}

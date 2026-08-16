import { supabase, isSupabaseConfigured, DbProduct } from '../lib/supabase';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

// Transform DB product to frontend Product
export function mapDbProductToProduct(item: any): Product {
  return {
    id: item.id,
    sku: item.sku,
    title: item.title,
    subtitle: item.subtitle || '',
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    discountPercentage: item.discount_percentage ? Number(item.discount_percentage) : undefined,
    category: item.category as any,
    collection: item.collection,
    occasion: Array.isArray(item.occasion) ? item.occasion : [],
    description: item.description,
    editorialQuote: item.editorial_quote || undefined,
    fabric: item.fabric,
    lining: item.lining || undefined,
    care: Array.isArray(item.care) ? item.care : [],
    modelSpecs: item.model_specs || {
      height: "5'10\"",
      wearingSize: 'S',
      bust: '34B',
      waist: '25"',
    },
    sizes: Array.isArray(item.sizes) ? item.sizes : [],
    colors: Array.isArray(item.colors) ? item.colors : [],
    images: Array.isArray(item.images) ? item.images : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
    isFeatured: Boolean(item.is_featured),
    isNewArrival: Boolean(item.is_new_arrival),
    isFestive: Boolean(item.is_festive),
    isPartyNight: Boolean(item.is_party_night),
    isBestSeller: Boolean(item.is_best_seller),
    stockTotal: Number(item.stock_total || 0),
    rating: Number(item.rating || 5.0),
    reviewCount: Number(item.review_count || 0),
    reviews: Array.isArray(item.reviews) ? item.reviews : [],
    stylingTips: Array.isArray(item.styling_tips) ? item.styling_tips : [],
    completeTheLookProductIds: item.complete_the_look_ids || [],
    published: item.published !== false,
  };
}

// Transform frontend Product to DB Product
export function mapProductToDbProduct(product: Product): Partial<DbProduct> {
  return {
    id: product.id,
    sku: product.sku,
    title: product.title,
    subtitle: product.subtitle,
    price: product.price,
    original_price: product.originalPrice || null,
    discount_percentage: product.discountPercentage || null,
    category: product.category,
    collection: product.collection,
    occasion: product.occasion,
    description: product.description,
    editorial_quote: product.editorialQuote || null,
    fabric: product.fabric,
    lining: product.lining || null,
    care: product.care,
    model_specs: product.modelSpecs,
    sizes: product.sizes,
    colors: product.colors,
    images: product.images,
    tags: product.tags,
    is_featured: Boolean(product.isFeatured),
    is_new_arrival: Boolean(product.isNewArrival),
    is_festive: Boolean(product.isFestive),
    is_party_night: Boolean(product.isPartyNight),
    is_best_seller: Boolean(product.isBestSeller),
    stock_total: product.stockTotal,
    rating: product.rating,
    review_count: product.reviewCount,
    styling_tips: product.stylingTips,
    complete_the_look_ids: product.completeTheLookProductIds || [],
    published: product.published,
  };
}

/**
 * Fetch all products with Supabase fallback
 */
export async function getProducts(): Promise<{ data: Product[]; error: string | null; fromDatabase: boolean }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, falling back to local dataset:', error.message);
        return { data: INITIAL_PRODUCTS, error: error.message, fromDatabase: false };
      }

      if (data && data.length > 0) {
        return { data: data.map(mapDbProductToProduct), error: null, fromDatabase: true };
      }
    } catch (err: any) {
      console.warn('Supabase query failed:', err);
    }
  }

  // Fallback to local storage or initial products
  try {
    const cached = localStorage.getItem('dd_products');
    if (cached) {
      return { data: JSON.parse(cached), error: null, fromDatabase: false };
    }
  } catch (e) {
    // ignore
  }

  return { data: INITIAL_PRODUCTS, error: null, fromDatabase: false };
}

/**
 * Create or save a product
 */
export async function createProduct(product: Product): Promise<{ success: boolean; data?: Product; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = mapProductToDbProduct(product);
      const { data, error } = await supabase
        .from('products')
        .upsert(dbPayload)
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert product error:', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data ? mapDbProductToProduct(data) : product };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, data: product };
}

/**
 * Update an existing product
 */
export async function updateProduct(product: Product): Promise<{ success: boolean; data?: Product; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = mapProductToDbProduct(product);
      const { data, error } = await supabase
        .from('products')
        .update(dbPayload)
        .eq('id', product.id)
        .select()
        .single();

      if (error) {
        console.warn('Supabase update product error:', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data ? mapDbProductToProduct(data) : product };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, data: product };
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
  return { success: true };
}

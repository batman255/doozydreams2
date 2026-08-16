import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, MediaAsset, ProductCategory, ProductOccasion } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Truck,
  Shield,
  Search,
  Filter,
  Copy,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Database,
  Layers,
  ArrowRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: ProductCategory[] = [
  'Gowns & Dresses',
  'Festive Stories',
  'Party Nights',
  'Co-ord Sets',
  'Silk & Velvet',
  'Tops & Blouses',
  'Outerwear',
  'Accessories & Jewelry',
];

const OCCASIONS: ProductOccasion[] = [
  'Black Tie & Gala',
  'Cocktail & Soirée',
  'Festive & Celebration',
  'Resort & Vacation',
  'Bridal & Reception',
  'Modern Power & Evening',
];

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    orders,
    updateOrderStatus,
    mediaAssets,
    addMediaAsset,
    deleteMediaAsset,
    formatPrice,
    adminActiveTab,
    setAdminActiveTab,
    isSupabaseLive,
    refreshProducts,
    isLoadingProducts,
    addNotification,
    setActiveView,
  } = useStore();

  // Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Product Add / Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New/Edit Product Form State
  const [formSku, setFormSku] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formPrice, setFormPrice] = useState<number>(1250);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(1500);
  const [formCategory, setFormCategory] = useState<ProductCategory>('Gowns & Dresses');
  const [formCollection, setFormCollection] = useState('The Nocturne Gala');
  const [formOccasion, setFormOccasion] = useState<ProductOccasion[]>(['Black Tie & Gala']);
  const [formDescription, setFormDescription] = useState('');
  const [formFabric, setFormFabric] = useState('100% Silk Crepe de Chine');
  const [formLining, setFormLining] = useState('100% Pure Mulberry Silk');
  const [formCare, setFormCare] = useState('Specialist Dry Clean Only');
  const [formStock, setFormStock] = useState<number>(12);
  const [formImages, setFormImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=90',
  ]);
  const [formTags, setFormTags] = useState('gala, evening, silk, haute');
  const [formIsFeatured, setFormIsFeatured] = useState(true);
  const [formIsNewArrival, setFormIsNewArrival] = useState(true);
  const [formIsFestive, setFormIsFestive] = useState(false);
  const [formIsPartyNight, setFormIsPartyNight] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsInCatalog = products.length;
  const activeFulfillmentOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormSku(`DD-${Math.floor(100 + Math.random() * 900)}`);
    setFormTitle('');
    setFormSubtitle('');
    setFormPrice(1200);
    setFormOriginalPrice(1450);
    setFormCategory('Gowns & Dresses');
    setFormCollection('The Nocturne Gala');
    setFormOccasion(['Black Tie & Gala']);
    setFormDescription('An ethereal nocturnal silhouette crafted with liquid silk draping.');
    setFormFabric('100% Pure Italian Silk Lamé');
    setFormLining('100% Silk Habotai');
    setFormCare('Specialist Luxury Dry Clean Only');
    setFormStock(10);
    setFormImages(['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=90']);
    setFormTags('evening, couture, silk');
    setFormIsFeatured(true);
    setFormIsNewArrival(true);
    setFormIsFestive(false);
    setFormIsPartyNight(false);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormSku(p.sku);
    setFormTitle(p.title);
    setFormSubtitle(p.subtitle);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormCategory(p.category);
    setFormCollection(p.collection);
    setFormOccasion(p.occasion);
    setFormDescription(p.description);
    setFormFabric(p.fabric);
    setFormLining(p.lining || '');
    setFormCare(p.care.join(', '));
    setFormStock(p.stockTotal);
    setFormImages(p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=90']);
    setFormTags(p.tags.join(', '));
    setFormIsFeatured(Boolean(p.isFeatured));
    setFormIsNewArrival(Boolean(p.isNewArrival));
    setFormIsFestive(Boolean(p.isFestive));
    setFormIsPartyNight(Boolean(p.isPartyNight));
    setIsProductModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const file = files[0];
      const res = await uploadProductImage(file);
      if (res.url) {
        setFormImages((prev) => [res.url!, ...prev]);
        addNotification('Image Uploaded', 'Stored to Supabase luxury media repository', 'gold');
      } else {
        addNotification('Upload Error', res.error || 'Failed to upload', 'info');
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `dd-${Date.now().toString().slice(-4)}`,
      sku: formSku,
      title: formTitle,
      subtitle: formSubtitle,
      price: Number(formPrice),
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
      discountPercentage: formOriginalPrice && formPrice < formOriginalPrice
        ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)
        : undefined,
      category: formCategory,
      collection: formCollection,
      occasion: formOccasion,
      description: formDescription,
      fabric: formFabric,
      lining: formLining || undefined,
      care: formCare.split(',').map((s) => s.trim()).filter(Boolean),
      modelSpecs: editingProduct?.modelSpecs || {
        height: "5'10\"",
        wearingSize: 'S',
        bust: '34B',
        waist: '25"',
      },
      sizes: editingProduct?.sizes || [
        { size: 'XS', inStock: true, stockCount: 3 },
        { size: 'S', inStock: true, stockCount: 5 },
        { size: 'M', inStock: true, stockCount: 4 },
        { size: 'L', inStock: true, stockCount: 2 },
      ],
      colors: editingProduct?.colors || [
        { name: 'Obsidian Noir', hex: '#0B0B0B' },
        { name: 'Champagne Gold', hex: '#D4AF37' },
      ],
      images: formImages.filter(Boolean),
      tags: formTags.split(',').map((s) => s.trim()).filter(Boolean),
      isFeatured: formIsFeatured,
      isNewArrival: formIsNewArrival,
      isFestive: formIsFestive,
      isPartyNight: formIsPartyNight,
      isBestSeller: editingProduct?.isBestSeller || false,
      stockTotal: Number(formStock),
      rating: editingProduct?.rating || 5.0,
      reviewCount: editingProduct?.reviewCount || 1,
      reviews: editingProduct?.reviews || [],
      stylingTips: editingProduct?.stylingTips || ['Pair with bespoke 105mm heels and a gold minaudière.'],
      completeTheLookProductIds: editingProduct?.completeTheLookProductIds || [],
      published: true,
    };

    if (editingProduct) {
      await updateProduct(productPayload);
    } else {
      await addProduct(productPayload);
    }
    setIsProductModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'All' && o.status !== orderStatusFilter) return false;
    if (!orderSearch) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customer.fullName.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q) ||
      o.trackingNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF7F0] pb-24">
      {/* Admin Subheader */}
      <div className="bg-[#111111] border-b border-[#222222] sticky top-16 z-30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#C5A059]/10 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] tracking-wide">
                  DOOZY Atelier Console
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                    isSupabaseLive
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                  }`}
                >
                  <Database className="w-3 h-3" />
                  {isSupabaseLive ? 'Supabase Live' : 'Local Fallback'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-light">
                Haute Couture Catalog, VIP Orders, Inventory & Media Storage
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => refreshProducts()}
              disabled={isLoadingProducts}
              className="px-3 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingProducts ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold rounded text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Garment</span>
            </button>
            <button
              onClick={() => setActiveView('shop')}
              className="px-3 py-2 bg-transparent border border-neutral-700 hover:border-neutral-500 rounded text-xs text-neutral-300 transition-colors"
            >
              Storefront ↗
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto flex items-center gap-6 mt-4 border-t border-[#222] pt-3 overflow-x-auto text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setAdminActiveTab('overview')}
            className={`pb-2 border-b-2 transition-colors flex items-center gap-2 ${
              adminActiveTab === 'overview'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setAdminActiveTab('products')}
            className={`pb-2 border-b-2 transition-colors flex items-center gap-2 ${
              adminActiveTab === 'products'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Garments ({products.length})</span>
          </button>
          <button
            onClick={() => setAdminActiveTab('orders')}
            className={`pb-2 border-b-2 transition-colors flex items-center gap-2 ${
              adminActiveTab === 'orders'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Fulfillment ({orders.length})</span>
          </button>
          <button
            onClick={() => setAdminActiveTab('media')}
            className={`pb-2 border-b-2 transition-colors flex items-center gap-2 ${
              adminActiveTab === 'media'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media Library</span>
          </button>
          <button
            onClick={() => setAdminActiveTab('schema')}
            className={`pb-2 border-b-2 transition-colors flex items-center gap-2 ${
              adminActiveTab === 'schema'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Schema</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* OVERVIEW TAB */}
        {adminActiveTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#121212] border border-[#222] p-5 rounded-sm">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase mb-2">
                  <span>Gross Orders Value</span>
                  <TrendingUp className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#FAF7F0] font-light">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>✦ 100% luxury conversion rate</span>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222] p-5 rounded-sm">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase mb-2">
                  <span>Active Tailoring Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#FAF7F0] font-light">
                  {activeFulfillmentOrders}
                </div>
                <div className="text-[11px] text-[#C5A059] mt-2">
                  <span>White-glove verification in progress</span>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222] p-5 rounded-sm">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase mb-2">
                  <span>Boutique Catalog</span>
                  <Package className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#FAF7F0] font-light">
                  {totalItemsInCatalog} Silhouettes
                </div>
                <div className="text-[11px] text-neutral-400 mt-2">
                  <span>{products.filter((p) => p.isFestive).length} Festive · {products.filter((p) => p.isPartyNight).length} Party Nights</span>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222] p-5 rounded-sm">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase mb-2">
                  <span>VIP Atelier Patrons</span>
                  <Users className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#FAF7F0] font-light">
                  {orders.length + 48} Registered
                </div>
                <div className="text-[11px] text-neutral-400 mt-2">
                  <span>Paris, New York, London, Milan</span>
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#121212] border border-[#222] rounded-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-[#FAF7F0]">Recent VIP Orders</h3>
                <button
                  onClick={() => setAdminActiveTab('orders')}
                  className="text-xs text-[#C5A059] hover:underline"
                >
                  View all fulfillment ({orders.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#222] text-neutral-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Garments</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A]">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-900/50">
                        <td className="py-3.5 px-4 font-mono font-medium text-[#C5A059]">{o.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-[#FAF7F0]">{o.customer.fullName}</div>
                          <div className="text-[10px] text-neutral-400">{o.customer.city}, {o.customer.country}</div>
                        </td>
                        <td className="py-3.5 px-4">{o.items.length} item(s)</td>
                        <td className="py-3.5 px-4 font-mono text-[#FAF7F0] font-semibold">{formatPrice(o.total)}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 text-[10px] uppercase font-mono rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">{o.trackingNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GARMENTS / PRODUCTS TAB */}
        {adminActiveTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search catalog by title, SKU, or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-[#141414] border border-[#262626] pl-9 pr-4 py-2 text-xs rounded text-[#FAF7F0] outline-none focus:border-[#C5A059]"
                />
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Silhouette</span>
              </button>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0E0E0E] border-b border-[#222] text-neutral-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Garment</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Curations</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-900/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              className="w-10 h-14 object-cover rounded bg-neutral-900 border border-neutral-800"
                            />
                            <div>
                              <div className="font-serif text-sm text-[#FAF7F0] font-medium">{p.title}</div>
                              <div className="text-[11px] text-neutral-400 truncate max-w-xs">{p.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-300">{p.sku}</td>
                        <td className="py-3 px-4 text-neutral-300">{p.category}</td>
                        <td className="py-3 px-4 font-mono text-[#FAF7F0] font-medium">{formatPrice(p.price)}</td>
                        <td className="py-3 px-4">
                          <span className={`font-mono ${p.stockTotal < 5 ? 'text-amber-400' : 'text-neutral-300'}`}>
                            {p.stockTotal} in atelier
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.isFestive && (
                              <span className="px-1.5 py-0.5 text-[9px] bg-amber-950 text-amber-300 rounded border border-amber-800">
                                Festive
                              </span>
                            )}
                            {p.isPartyNight && (
                              <span className="px-1.5 py-0.5 text-[9px] bg-purple-950 text-purple-300 rounded border border-purple-800">
                                Party
                              </span>
                            )}
                            {p.isFeatured && (
                              <span className="px-1.5 py-0.5 text-[9px] bg-neutral-800 text-neutral-300 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300 hover:text-[#C5A059]"
                              title="Edit Garment"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Archive ${p.title} from the active catalog?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-red-400"
                              title="Archive Garment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FULFILLMENT & ORDERS TAB */}
        {adminActiveTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders by ID, client name, email..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-[#141414] border border-[#262626] pl-9 pr-4 py-2 text-xs rounded text-[#FAF7F0] outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                {['All', 'Pending', 'Tailoring & QC', 'Handcrafted Packaging', 'Dispatched', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded font-mono text-[11px] transition-colors whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-[#C5A059] text-black font-bold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-[#121212] border border-[#222] rounded-sm p-5 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#222] pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#C5A059]">{order.id}</span>
                        <span className="text-xs text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/40">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-300 mt-1">
                        Client: <strong className="text-white">{order.customer.fullName}</strong> ({order.customer.email}) · {order.customer.city}, {order.customer.country}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-neutral-400">Total Charged</div>
                        <div className="font-serif text-lg text-[#FAF7F0] font-semibold">{formatPrice(order.total)}</div>
                      </div>

                      {/* Status Action Selector */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-[#1C1C1C] border border-[#333] text-xs text-[#FAF7F0] px-3 py-2 rounded outline-none focus:border-[#C5A059]"
                      >
                        <option value="Pending">Pending Verification</option>
                        <option value="Tailoring & QC">Tailoring & QC</option>
                        <option value="Handcrafted Packaging">Handcrafted Packaging</option>
                        <option value="Dispatched">Dispatched (Courier)</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded bg-[#161616] border border-[#222]">
                        <img src={item.image} alt={item.title} className="w-10 h-14 object-cover rounded" />
                        <div className="min-w-0 text-xs">
                          <div className="text-[#FAF7F0] font-medium truncate">{item.title}</div>
                          <div className="text-neutral-400 text-[11px]">
                            {item.size} · {item.color} · Qty {item.quantity}
                          </div>
                          <div className="font-mono text-[#C5A059] font-medium">{formatPrice(item.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking & Note */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 gap-2 pt-2 border-t border-[#1C1C1C]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Tracking: <strong className="font-mono text-neutral-200">{order.trackingNumber}</strong> ({order.deliveryMethod})</span>
                    </div>
                    {order.giftWrap && (
                      <div className="text-[#E8D3A2] text-[11px]">
                        ✦ Gift Wrapped with wax seal {order.giftMessage ? `("${order.giftMessage}")` : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEDIA LIBRARY TAB */}
        {adminActiveTab === 'media' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#121212] border border-[#222] rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg text-[#FAF7F0]">Supabase Media Storage</h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Upload high-resolution editorial fashion campaign photos directly to the Supabase Storage bucket.
                </p>
              </div>

              <label className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold rounded text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-lg">
                <Upload className="w-4 h-4" />
                <span>Upload New Asset</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaAssets.map((asset) => (
                <div key={asset.id} className="group relative aspect-[3/4] bg-[#141414] border border-[#262626] rounded overflow-hidden">
                  <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="text-right">
                      <button
                        onClick={() => deleteMediaAsset(asset.id)}
                        className="p-1.5 bg-red-950/80 text-red-300 rounded hover:bg-red-900"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <div className="text-xs font-serif text-white truncate">{asset.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{asset.dimensions} · {asset.size}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(asset.url);
                          addNotification('URL Copied', 'Asset URL copied to clipboard', 'gold');
                        }}
                        className="mt-2 w-full py-1 bg-[#C5A059] text-black text-[10px] font-mono uppercase font-semibold rounded"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUPABASE SCHEMA TAB */}
        {adminActiveTab === 'schema' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#121212] border border-[#222] rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#FAF7F0]">Supabase Database Architecture</h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Complete PostgreSQL schema with tables, RLS policies, indexes, and initial luxury seeds.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-neutral-900 border border-neutral-700 text-xs font-mono text-[#C5A059] rounded">
                    schema.sql
                  </span>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded">
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Environment Variable</div>
                  <div className="font-mono text-xs text-emerald-400 mt-1 font-semibold">VITE_SUPABASE_URL</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Configured in .env.example</div>
                </div>

                <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded">
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Public Anon Key</div>
                  <div className="font-mono text-xs text-emerald-400 mt-1 font-semibold">VITE_SUPABASE_PUBLISHABLE_KEY</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Frontend safe authentication</div>
                </div>

                <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded">
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Security Architecture</div>
                  <div className="font-mono text-xs text-[#C5A059] mt-1 font-semibold">Row-Level Security (RLS)</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Public read, authenticated write</div>
                </div>
              </div>

              {/* Schema snippet preview */}
              <div className="bg-[#0A0A0A] border border-[#222] p-4 rounded text-xs font-mono text-neutral-300 overflow-x-auto max-h-96">
                <pre className="text-[11px] leading-relaxed text-neutral-300">
{`-- Tables Included in DOOZY DREAM Supabase Database:
1. public.profiles (Linked to Supabase Auth auth.users)
2. public.addresses (Saved VIP shipping addresses)
3. public.categories (Couture categories & display ordering)
4. public.collections (Curated editorial stories: Festive, Party, Gala)
5. public.products (Silhouettes, sizes, colors, fabrics, model specs, pricing)
6. public.coupons (VIP privileges: DOOZYVIP15, GALA2026, FESTIVE50)
7. public.orders (Client orders with white-glove delivery methods)
8. public.order_items (Line items with selected size & color)
9. public.order_timeline (Real-time tailoring & courier tracking steps)
10. public.reviews (Verified client testimonials & fit ratings)
11. public.media_assets (High-resolution campaign storage)`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl bg-[#111111] border border-[#2A2A2A] rounded-sm shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 bg-[#0B0B0B] border-b border-[#222] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#FAF7F0]">
                  {editingProduct ? 'Edit Silhouette' : 'Add New Couture Garment'}
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Changes will be synchronized to the Supabase products table.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Garment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="The Aurelia Liquid Lamé Gown"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="DD-890"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Subtitle / Silhouette Summary
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Draped Asymmetrical Halterneck Evening Gown"
                  className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Original / Comparative Price
                  </label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Total Atelier Stock
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Collection *
                  </label>
                  <input
                    type="text"
                    value={formCollection}
                    onChange={(e) => setFormCollection(e.target.value)}
                    placeholder="The Nocturne Gala"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={formFabric}
                    onChange={(e) => setFormFabric(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Lining
                  </label>
                  <input
                    type="text"
                    value={formLining}
                    onChange={(e) => setFormLining(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] outline-none"
                  />
                </div>
              </div>

              {/* Primary Image & Supabase Upload */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Garment Image URL & Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImages[0] || ''}
                    onChange={(e) => setFormImages([e.target.value, ...formImages.slice(1)])}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#181818] border border-[#2E2E2E] focus:border-[#C5A059] p-2.5 rounded text-[#FAF7F0] font-mono text-xs outline-none"
                  />
                  <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 rounded flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Curation Checkboxes */}
              <div className="p-3 bg-[#161616] border border-[#262626] rounded grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Featured Piece</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsNewArrival}
                    onChange={(e) => setFormIsNewArrival(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFestive}
                    onChange={(e) => setFormIsFestive(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Festive Stories</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPartyNight}
                    onChange={(e) => setFormIsPartyNight(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Party Nights</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#222] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 border border-neutral-700 text-neutral-300 rounded uppercase font-medium hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C5A059] text-black font-semibold rounded uppercase tracking-wider hover:bg-[#D4AF37] shadow-lg"
                >
                  Save Silhouette
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

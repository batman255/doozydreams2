import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { EditorialHome } from './components/EditorialHome';
import { ShopPage } from './components/ShopPage';
import { FestiveStoriesView } from './components/FestiveStoriesView';
import { PartyNightsView } from './components/PartyNightsView';
import { LookbookView } from './components/LookbookView';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';

// Drawers & Modals
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AIStylistModal } from './components/AIStylistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountOrdersModal } from './components/AccountOrdersModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAF7F0] flex flex-col font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Universal Luxury Header */}
      <Header />

      {/* Dynamic View Rendering */}
      <main className="flex-1">
        {activeView === 'home' && <EditorialHome />}
        {activeView === 'shop' && <ShopPage />}
        {activeView === 'festive' && <FestiveStoriesView />}
        {activeView === 'party' && <PartyNightsView />}
        {activeView === 'lookbook' && <LookbookView />}
        {activeView === 'pdp' && <ProductDetailPage />}
        {activeView === 'admin' && <AdminPortal />}
      </main>

      {/* Universal Haute Couture Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <SizeGuideModal />
      <AIStylistModal />
      <CheckoutModal />
      <AccountOrdersModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}

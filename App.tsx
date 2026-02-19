import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ContactPage } from './pages/ContactPage';
import { OrderPage } from './pages/OrderPage';
import { MessageCircle } from 'lucide-react';
import { config } from './siteConfig';

// Komponen untuk reset scroll saat pindah halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    // Menggunakan HashRouter agar reload halaman tidak error di static hosting
    <HashRouter>
      <div className="min-h-screen bg-brand-dark flex flex-col font-sans">
        <ScrollToTop />
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating WhatsApp Button (Global) */}
        {/* Mobile: bottom-24 (di atas bottom nav), Desktop: bottom-6 */}
        <a
          href={`https://wa.me/${config.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group animate-bounce"
          style={{ animationDuration: '3s' }}
          aria-label="Chat WhatsApp"
        >
          <MessageCircle size={32} />
          <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md hidden md:block">
            Chat Admin
          </span>
        </a>
      </div>
    </HashRouter>
  );
}

export default App;
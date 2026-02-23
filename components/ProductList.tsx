
import React, { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../siteConfig';
import { ArrowRight, Search, PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductDetailModal } from './ProductDetailModal';
import { Product } from '../types';

interface ProductListProps {
  limit?: number;
  showTitle?: boolean;
}

const categories = ['Semua', 'Akun Premium', 'PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan', 'Lainnya'];

export const ProductList: React.FC<ProductListProps> = ({ limit, showTitle = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Jika limit ada (misal di homepage), kita tidak menampilkan filter
  // Jika limit tidak ada (di halaman produk), kita tampilkan filter
  const showFilters = !limit;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (selectedCategory !== 'Semua') {
      if (selectedCategory === 'Akun Premium') {
        // Filter khusus untuk Akun Premium (exclude PPOB categories)
        result = result.filter(product => !['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(product.category));
      } else {
        result = result.filter(product => product.category === selectedCategory);
      }
    }

    // Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Jika ada limit, potong array hasil filter (biasanya di homepage pakai data raw products sih, tapi biar konsisten)
  const displayedProducts = limit ? products.slice(0, limit) : filteredProducts;

  // Search Suggestions Logic
  const suggestions = searchQuery.length > 0 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  return (
    <section className={`bg-brand-dark relative min-h-[60vh] ${showTitle ? 'py-16 md:py-24' : 'pt-4 pb-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight">
              {limit ? 'Produk Terpopuler' : 'Katalog Produk Lengkap'}
            </h2>
            <p className="text-brand-muted max-w-2xl mx-auto text-lg">
              Temukan akun premium, pulsa, token listrik, dan top up game dengan harga terbaik dan proses cepat.
            </p>
          </div>
        )}

        {/* --- Search & Filter Section (Only on Products Page) --- */}
        {showFilters && (
          <div className="mb-12 space-y-8">
            
            {/* Search Bar with Live Suggestions */}
            <div className="relative max-w-2xl mx-auto group" ref={searchRef}>
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari produk (contoh: Netflix, Pulsa, Token PLN, Mobile Legends)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-brand-surface border border-brand-border rounded-2xl py-4 pl-14 pr-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all shadow-xl shadow-black/20"
              />
              
              {/* Live Suggestions Dropdown */}
              {showSuggestions && searchQuery && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-brand-surface border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden">
                  {suggestions.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => {
                        setSearchQuery(product.name);
                        setShowSuggestions(false);
                      }}
                      className="px-5 py-3 hover:bg-slate-800 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center overflow-hidden">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Search size={14} className="text-slate-500" />
                          )}
                        </div>
                        <span className="text-slate-300 group-hover:text-white font-medium">{product.name}</span>
                      </div>
                      <span className="text-xs text-brand-muted">{product.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25 scale-105'
                      : 'bg-brand-surface text-slate-400 border-brand-border hover:bg-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- Product Grid --- */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick}
                onAddToCart={handleProductClick}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-brand-surface/50 rounded-3xl border border-brand-border border-dashed backdrop-blur-sm">
            <div className="inline-block p-6 bg-brand-surface rounded-full mb-6 shadow-xl">
              <PackageX className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-heading">Produk Tidak Ditemukan</h3>
            <p className="text-brand-muted max-w-md mx-auto mb-8">
              Maaf, kami tidak menemukan produk dengan kata kunci "{searchQuery}" di kategori "{selectedCategory}".
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Semua');}}
              className="px-6 py-3 bg-brand-surface border border-brand-border rounded-xl text-white font-semibold hover:bg-slate-800 transition-all hover:shadow-lg"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* --- See All Link (Homepage only) --- */}
        {limit && (
          <div className="mt-16 text-center">
            <Link 
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-brand-surface border border-brand-border rounded-full text-white font-semibold hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group shadow-lg hover:shadow-brand-primary/25"
            >
              Lihat Semua Produk
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};


import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../siteConfig';
import { ArrowRight, Search, PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductListProps {
  limit?: number;
  showTitle?: boolean;
}

const categories = ['Semua', 'Akun Premium', 'PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan', 'Lainnya'];

export const ProductList: React.FC<ProductListProps> = ({ limit, showTitle = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Jika limit ada (misal di homepage), kita tidak menampilkan filter
  // Jika limit tidak ada (di halaman produk), kita tampilkan filter
  const showFilters = !limit;

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

  // Jika ada limit, potong array hasil filter (biasanya di homepage pakai data raw products sih, tapi biar konsisten)
  const displayedProducts = limit ? products.slice(0, limit) : filteredProducts;

  return (
    <section className="py-12 md:py-24 bg-brand-dark relative min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        {showTitle && (
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {limit ? 'Produk Terpopuler' : 'Katalog Produk Lengkap'}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Temukan akun premium, pulsa, token listrik, dan top up game dengan harga terbaik.
            </p>
          </div>
        )}

        {/* --- Search & Filter Section (Only on Products Page) --- */}
        {showFilters && (
          <div className="mb-12 space-y-6">
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Cari produk (contoh: Netflix, Pulsa, Token PLN, Mobile Legends)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-full py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-lg"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-105'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
            <div className="inline-block p-4 bg-slate-800 rounded-full mb-4">
              <PackageX className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Produk Tidak Ditemukan</h3>
            <p className="text-slate-400">
              Maaf, kami tidak menemukan produk dengan kata kunci "{searchQuery}" di kategori "{selectedCategory}".
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Semua');}}
              className="mt-6 text-brand-accent hover:text-white font-medium underline underline-offset-4"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* --- See All Link (Homepage only) --- */}
        {limit && (
          <div className="mt-12 text-center">
            <Link 
              to="/products"
              className="inline-flex items-center text-brand-accent hover:text-white font-semibold transition-colors group"
            >
              Lihat Semua Produk
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

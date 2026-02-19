import React from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../siteConfig';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductListProps {
  limit?: number;
  showTitle?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ limit, showTitle = true }) => {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {limit ? 'Produk Terpopuler' : 'Katalog Produk Premium'}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Temukan akun premium favoritmu dengan harga terbaik di pasaran.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

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
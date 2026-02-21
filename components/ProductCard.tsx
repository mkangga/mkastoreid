import React from 'react';
import { ShoppingCart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleBuy = () => {
    // Navigasi ke halaman order dengan parameter produk
    navigate(`/order?product=${encodeURIComponent(product.name)}`);
  };

  const IconComponent = product.icon ? (LucideIcons as any)[product.icon] : null;

  return (
    <div className="group relative flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-10 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-800 p-6 flex items-center justify-center">
        {/* Background gradient effect for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-0"
          />
        ) : IconComponent ? (
          <IconComponent className="w-24 h-24 text-brand-primary group-hover:scale-110 transition-transform duration-500 relative z-0" />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Harga</span>
            <span className="text-lg font-bold text-brand-accent">{product.priceStart}</span>
          </div>
          
          <button
            onClick={handleBuy}
            className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95"
          >
            <ShoppingCart size={16} />
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};
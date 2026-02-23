import React from 'react';
import { ShoppingCart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      // Fallback navigation if no onClick handler provided
      navigate(`/order?product=${encodeURIComponent(product.name)}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const IconComponent = product.icon ? (LucideIcons as any)[product.icon] : null;

  return (
    <div 
      onClick={handleClick}
      className="group relative flex flex-col bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-primary/10 cursor-pointer"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-20 bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-brand-primary/20 tracking-wide">
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark/50 p-6 flex items-center justify-center">
        {/* Background gradient effect for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent z-10 pointer-events-none opacity-50"></div>
        
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

        {product.imageUrl ? (
          <ImageWithSkeleton
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-xl"
          />
        ) : IconComponent ? (
          <IconComponent className="w-16 h-16 text-brand-primary group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-lg" />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-brand-muted border border-white/5">
              {product.category}
            </span>
          </div>
          <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-brand-primary transition-colors font-heading" title={product.name}>
            {product.name}
          </h3>
          <p className="text-brand-muted text-xs line-clamp-2 leading-relaxed h-8">{product.description}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-brand-muted uppercase tracking-wider font-medium">Mulai Dari</span>
            <span className="text-sm font-bold text-brand-accent">{product.priceStart}</span>
          </div>
          
          <div className="flex gap-2">
            {onAddToCart && (
              <button
                onClick={handleAddToCart}
                className="bg-slate-700 hover:bg-slate-600 text-white p-2.5 rounded-xl transition-all hover:shadow-lg active:scale-95"
                aria-label="Tambah ke Keranjang"
                title="Tambah ke Keranjang"
              >
                <ShoppingCart size={16} strokeWidth={2.5} />
              </button>
            )}
            <button
              className="bg-brand-primary hover:bg-brand-primaryHover text-white p-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95 group-hover:translate-x-1"
              aria-label="Beli"
              title="Beli Sekarang"
            >
              <LucideIcons.ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
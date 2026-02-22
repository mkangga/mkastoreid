import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const IconComponent = product.icon ? (LucideIcons as any)[product.icon] : null;

  const handleBuy = () => {
    onClose();
    navigate(`/order?product=${encodeURIComponent(product.name)}`);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal Panel */}
        <div className="relative transform overflow-hidden rounded-3xl bg-brand-surface border border-brand-border text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full z-10">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          {/* Header Image/Icon */}
          <div className="h-56 bg-gradient-to-br from-brand-dark to-brand-surface flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/10"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="h-40 object-contain relative z-10 drop-shadow-2xl"
              />
            ) : IconComponent ? (
              <IconComponent className="w-24 h-24 text-brand-primary relative z-10 drop-shadow-lg" />
            ) : null}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full mb-2 border border-brand-primary/20">
                  {product.category}
                </span>
                <h2 className="text-2xl font-bold text-white font-heading tracking-tight">{product.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-brand-muted uppercase tracking-wider font-medium mb-1">Mulai dari</p>
                <p className="text-xl font-bold text-brand-accent">{product.priceStart}</p>
              </div>
            </div>

            <p className="text-brand-muted leading-relaxed mb-8 text-sm">
              {product.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-brand-muted">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Check size={16} className="text-green-500" />
                </div>
                <span>Proses Cepat & Otomatis</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-muted">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Check size={16} className="text-green-500" />
                </div>
                <span>Garansi Transaksi Sukses</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-muted">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Check size={16} className="text-green-500" />
                </div>
                <span>Layanan Pelanggan Responsif</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border">
              <button
                onClick={handleBuy}
                className="w-full py-4 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl shadow-lg shadow-brand-primary/25 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                Beli Sekarang
              </button>
              <p className="text-center text-xs text-brand-muted mt-4">
                Anda akan diarahkan ke form pemesanan yang aman
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

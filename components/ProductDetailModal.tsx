import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductFormFields } from './ProductFormFields';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      setFormData({});
      setErrors({});
      setAddedToCart(false);
      setQuantity(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const IconComponent = product.icon ? (LucideIcons as any)[product.icon] : null;

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (product.id === 'pulsa' || product.id === 'paket-data') {
      if (!formData.provider) newErrors.provider = 'Provider harus dipilih';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Nomor HP harus diisi';
      if (product.id === 'pulsa' && !formData.nominal) newErrors.nominal = 'Nominal harus dipilih';
      if (product.id === 'paket-data' && !formData.quotaDuration) newErrors.quotaDuration = 'Paket harus diisi';
    } else if (product.id === 'pln') {
      if (!formData.meterNumber) newErrors.meterNumber = 'Nomor Meter harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus dipilih';
      if (formData.nominal === 'Request' && !formData.customNominal) newErrors.customNominal = 'Nominal request harus diisi';
    } else if (product.id === 'ewallet') {
      if (!formData.walletType) newErrors.walletType = 'E-Wallet harus dipilih';
      if (!formData.walletNumber) newErrors.walletNumber = 'Nomor E-Wallet harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal top up harus diisi';
    } else if (product.id === 'games') {
      if (!formData.gameName) newErrors.gameName = 'Nama game harus diisi';
      if (!formData.userId) newErrors.userId = 'User ID harus diisi';
      if (!formData.gameItem) newErrors.gameItem = 'Item/Nominal harus diisi';
    } else if (product.id === 'ecommerce') {
      if (!formData.ecommercePlatform) newErrors.ecommercePlatform = 'Platform harus dipilih';
      if (!formData.vaNumber) newErrors.vaNumber = 'Nomor VA harus diisi';
    } else if (product.id === 'convert') {
      if (!formData.sourcePlatform) newErrors.sourcePlatform = 'Platform asal harus dipilih';
      if (!formData.sourceNumber) newErrors.sourceNumber = 'Nomor asal harus diisi';
      if (!formData.destPlatform) newErrors.destPlatform = 'Platform tujuan harus dipilih';
      if (!formData.destNumber) newErrors.destNumber = 'Nomor tujuan harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'transfer') {
      if (!formData.destNumber) newErrors.destNumber = 'Nomor tujuan harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'angsuran') {
      if (!formData.contractNumber) newErrors.contractNumber = 'Nomor Kontrak harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'pendidikan') {
      if (!formData.studentId) newErrors.studentId = 'ID Siswa harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'va') {
      if (!formData.vaNumber) newErrors.vaNumber = 'Nomor VA harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'internet-tv') {
      if (!formData.customerId) newErrors.customerId = 'ID Pelanggan harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'bpjs') {
      if (!formData.vaNumber) newErrors.vaNumber = 'Nomor VA harus diisi';
      if (!formData.nominal) newErrors.nominal = 'Nominal harus diisi';
    } else if (product.id === 'pdam') {
      if (!formData.customerId) newErrors.customerId = 'ID Pelanggan harus diisi';
    } else if (!['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(product.category)) {
      // For premium apps, ensure duration is selected
      if (!formData.duration) {
         newErrors.duration = 'Durasi langganan harus dipilih';
      }
    } else {
      // Generic PPOB validation fallback
      if (!formData.genericTarget) {
        newErrors.genericTarget = 'Nomor Tujuan / ID harus diisi';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEstimatedPrice = () => {
    let price = 0;

    const parsePrice = (label: string) => {
      const match = label.match(/Rp\s?([\d.]+)/);
      return match ? parseInt(match[1].replace(/\./g, ''), 10) : 0;
    };

    switch (product.id) {
      case 'pulsa':
        if (formData.nominal) {
          const options = [
            { value: '5000', label: '5.000 (Harga: Rp 7.000)' },
            { value: '10000', label: '10.000 (Harga: Rp 12.000)' },
            { value: '15000', label: '15.000 (Harga: Rp 17.000)' },
            { value: '20000', label: '20.000 (Harga: Rp 22.000)' },
            { value: '25000', label: '25.000 (Harga: Rp 27.000)' },
            { value: '30000', label: '30.000 (Harga: Rp 32.000)' },
            { value: '50000', label: '50.000 (Harga: Rp 52.000)' },
            { value: '100000', label: '100.000 (Harga: Rp 102.000)' },
          ];
          const selected = options.find(o => o.value === formData.nominal);
          if (selected) price = parsePrice(selected.label);
        }
        break;

      case 'pln':
        if (formData.nominal && formData.nominal !== 'Request') {
           const options = [
              { value: '20000', label: '20.000 (Biaya Admin: Rp 2.000)' },
              { value: '50000', label: '50.000 (Biaya Admin: Rp 2.000)' },
              { value: '100000', label: '100.000 (Biaya Admin: Rp 2.000)' },
           ];
           const selected = options.find(o => o.value === formData.nominal);
           if (selected) {
             price = parseInt(formData.nominal) + 2000;
           }
        } else if (formData.nominal === 'Request' && formData.customNominal) {
             price = parseInt(formData.customNominal) + 2000;
        }
        break;

      case 'convert':
      case 'transfer':
      case 'angsuran':
      case 'pendidikan':
      case 'va':
      case 'bpjs':
      case 'internet-tv':
      case 'ewallet':
         if (formData.nominal) {
           const nominal = parseInt(formData.nominal);
           const adminFee = 2000; 
           if (!isNaN(nominal)) price = nominal + adminFee;
         }
         break;
      
      default:
        // For premium apps
        if (!['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(product.category)) {
           const duration = formData.duration;
           if (duration) {
             switch (product.id) {
               case 'netflix':
                 if (duration === 'Netflix Private (1 Akun)') price = 120000;
                 else if (duration === 'Netflix Sharing (1 Profile)') price = 40000;
                 break;
               case 'canva':
                 if (duration === 'Canva Edu 1 Tahun') price = 25000;
                 break;
               case 'viu':
                 if (duration === 'Viu 12 Bulan') price = 15000;
                 break;
               case 'spotify':
                 if (duration === 'Spotify Family Plan') price = 20000;
                 break;
               case 'youtube':
                 if (duration === '1 Bulan') price = 10000;
                 else if (duration === '3 Bulan') price = 25000;
                 break;
               default:
                 // Fallback for other premium apps using multiplier logic
                 if (product.priceStart) {
                   const basePriceMatch = product.priceStart.match(/Rp\s?([\d.]+)/);
                   if (basePriceMatch) {
                     const basePrice = parseInt(basePriceMatch[1].replace(/\./g, ''), 10);
                     let multiplier = 1;
                     if (duration === '2 Bulan') multiplier = 2;
                     else if (duration === '3 Bulan') multiplier = 3;
                     else if (duration === '6 Bulan') multiplier = 6;
                     else if (duration === '1 Tahun') multiplier = 12;
                     price = basePrice * multiplier;
                   }
                 }
                 break;
             }
           }
        }
        break;
    }

    return price;
  };

  const estimatedPrice = calculateEstimatedPrice();

  const handleBuy = () => {
    if (validateForm()) {
      const queryParams = new URLSearchParams();
      queryParams.append('product', product.name);
      queryParams.append('quantity', quantity.toString());
      Object.entries(formData).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      onClose();
      navigate(`/order?${queryParams.toString()}`);
    }
  };

  const handleAddToCart = () => {
    if (validateForm()) {
      addToCart(product, formData, quantity);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
        onClose();
      }, 1500);
    }
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
        <div className="relative transform overflow-hidden rounded-3xl bg-brand-surface border border-brand-border text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl w-full z-10 flex flex-col max-h-[90vh]">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          {/* Header Image/Icon */}
          <div className="h-40 sm:h-48 bg-gradient-to-br from-brand-dark to-brand-surface flex items-center justify-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-brand-primary/10"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="h-32 sm:h-40 object-contain relative z-10 drop-shadow-2xl"
              />
            ) : IconComponent ? (
              <IconComponent className="w-20 h-20 sm:w-24 sm:h-24 text-brand-primary relative z-10 drop-shadow-lg" />
            ) : null}
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
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

            {/* Form Fields */}
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 mb-8">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Lengkapi Data Pesanan</h4>
              <ProductFormFields 
                productId={product.id}
                category={product.category}
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />
              
              {/* Price Estimator */}
              {estimatedPrice > 0 && (
                <div className="mt-6 bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-primary font-medium text-sm">Harga Satuan</span>
                    <span className="text-lg font-bold text-white">Rp {estimatedPrice.toLocaleString('id-ID')}</span>
                  </div>
                  
                  {/* Quantity Control */}
                  <div className="flex items-center justify-between border-t border-brand-primary/20 pt-4">
                    <span className="text-brand-primary font-medium text-sm">Jumlah</span>
                    <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-1 border border-slate-700">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white font-bold w-8 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-brand-primary text-white hover:bg-brand-primaryHover transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-primary/20 pt-4">
                    <span className="text-brand-primary font-bold text-sm">Total Bayar</span>
                    <span className="text-xl font-bold text-brand-accent">Rp {(estimatedPrice * quantity).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-brand-muted">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Check size={16} className="text-green-500" />
                </div>
                <span>Proses Cepat & Aman</span>
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
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-brand-border bg-brand-surface shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  addedToCart 
                    ? 'bg-green-500/20 text-green-500 border border-green-500/50' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 size={20} />
                    Ditambahkan
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Tambah Keranjang
                  </>
                )}
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 py-4 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl shadow-lg shadow-brand-primary/25 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                Beli Sekarang
              </button>
            </div>
            <p className="text-center text-xs text-brand-muted mt-4">
              Anda akan diarahkan ke form pemesanan yang aman
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

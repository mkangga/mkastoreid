import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PageTransition } from '../components/PageTransition';
import { Trash2, ShoppingBag, Send, User, CreditCard, Info } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, totalItems } = useCart();
  const [userName, setUserName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');

  const calculateEstimatedPrice = (item: any) => {
    let price = 0;
    const { product, formData } = item;

    if (!formData) return 0;

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
           const adminFee = product.id === 'ewallet' ? 0 : 2000; 
           if (!isNaN(nominal)) price = nominal + adminFee;
         }
         break;
      
      default:
        if (!['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(product.category) && product.priceStart) {
          const basePriceMatch = product.priceStart.match(/Rp\s?([\d.]+)/);
          if (basePriceMatch) {
            const basePrice = parseInt(basePriceMatch[1].replace(/\./g, ''), 10);
            let multiplier = 1;
            const duration = formData.duration || '1 Bulan';
            if (duration === '2 Bulan') multiplier = 2;
            else if (duration === '3 Bulan') multiplier = 3;
            else if (duration === '6 Bulan') multiplier = 6;
            else if (duration === '1 Tahun') multiplier = 12;
            
            price = basePrice * multiplier;
          }
        }
        break;
    }

    return price * item.quantity;
  };

  const totalPrice = items.reduce((sum, item) => sum + calculateEstimatedPrice(item), 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = `Halo Admin, saya mau order beberapa produk sekaligus:\n\n`;
    
    if (userName) {
      message += `*Nama:* ${userName}\n`;
    }
    message += `*Metode Pembayaran:* ${paymentMethod}\n\n`;
    message += `*Daftar Pesanan:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (x${item.quantity})\n`;
      if (item.formData) {
        Object.entries(item.formData).forEach(([key, value]) => {
          if (value) {
            // Format key for better readability
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            message += `   - ${formattedKey}: ${value}\n`;
          }
        });
      }
      const itemPrice = calculateEstimatedPrice(item);
      if (itemPrice > 0) {
        message += `   - Estimasi Harga: Rp ${itemPrice.toLocaleString('id-ID')}\n`;
      }
      message += `\n`;
    });
    
    if (totalPrice > 0) {
      message += `*Estimasi Total Keseluruhan: Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`;
    }
    
    message += `Mohon info total harganya ya kak. Terima kasih!`;

    const waLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  return (
    <PageTransition className="pt-24 min-h-screen pb-32 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heading">Keranjang Belanja</h1>

        {items.length > 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
            <div className="p-6 md:p-8 space-y-6">
              {items.map((item, index) => {
                const itemPrice = calculateEstimatedPrice(item);
                const IconComponent = item.product.icon ? (LucideIcons as any)[item.product.icon] : null;
                
                return (
                  <div key={`${item.product.id}-${index}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 gap-4">
                    <div className="flex items-start gap-4 w-full sm:w-auto">
                      <div className="w-16 h-16 bg-slate-700 rounded-xl overflow-hidden flex-shrink-0 mt-1 flex items-center justify-center p-1">
                        {item.product.imageUrl ? (
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                        ) : IconComponent ? (
                          <IconComponent className="w-8 h-8 text-brand-primary" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <ShoppingBag size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{item.product.name}</h3>
                        <p className="text-brand-muted text-sm mb-2">{item.product.category}</p>
                        
                        {/* Display Form Data */}
                        {item.formData && (
                          <div className="bg-slate-900/50 rounded-lg p-3 text-xs text-slate-300 space-y-1 border border-slate-700/50">
                            {Object.entries(item.formData).map(([key, value]) => {
                              if (!value) return null;
                              const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                              return (
                                <div key={key} className="flex justify-between gap-4">
                                  <span className="text-slate-500">{formattedKey}:</span>
                                  <span className="font-medium text-right break-all">{value}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        
                        {itemPrice > 0 ? (
                          <p className="text-brand-accent text-sm font-bold mt-2">Estimasi: Rp {itemPrice.toLocaleString('id-ID')}</p>
                        ) : (
                          <p className="text-brand-accent text-sm font-medium mt-2">{item.product.priceStart}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 border-t sm:border-t-0 border-slate-700/50 pt-4 sm:pt-0">
                      <span className="text-white font-bold bg-slate-700 px-3 py-1 rounded-lg">x{item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-full transition-colors flex items-center gap-2"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                        <span className="sm:hidden text-sm font-medium">Hapus</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checkout Form Fields */}
            <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-900/80">
              <h3 className="text-lg font-bold text-white mb-4">Informasi Pembeli</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <User size={16} /> Nama Anda (Opsional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Contoh: Budi"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <CreditCard size={16} /> Metode Pembayaran
                  </label>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer"
                    >
                      <option value="QRIS">QRIS (Semua E-Wallet/Bank)</option>
                      <option value="DANA">DANA</option>
                      <option value="OVO">OVO</option>
                      <option value="GoPay">GoPay</option>
                      <option value="ShopeePay">ShopeePay</option>
                      <option value="LinkAja">LinkAja</option>
                      <option value="Transfer Bank">Transfer Bank (BRI dan SeaBank)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                    <Info size={16} className="shrink-0 text-brand-accent mt-0.5" />
                    <span>
                      Nomor rekening dan Scan QRIS tersedia di menu{' '}
                      <Link to="/payment" className="text-brand-accent hover:text-brand-primary font-medium hover:underline">
                        Bayar
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/50 p-6 md:p-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left w-full md:w-auto">
                <p className="text-slate-400 text-sm mb-1">Total Item: <span className="text-white font-bold">{totalItems} Produk</span></p>
                {totalPrice > 0 && (
                  <>
                    <p className="text-slate-400 text-sm mb-1">Estimasi Total Harga:</p>
                    <p className="text-2xl font-bold text-brand-primary">Rp {totalPrice.toLocaleString('id-ID')}</p>
                  </>
                )}
                <p className="text-xs text-slate-500 mt-2">*Harga akhir akan dikonfirmasi oleh Admin</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button 
                  onClick={clearCart}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition-colors font-medium"
                >
                  Kosongkan
                </button>
                <button 
                  onClick={handleCheckout}
                  className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 font-bold"
                >
                  <Send size={20} />
                  Checkout WhatsApp
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
            <div className="inline-block p-6 bg-slate-800/50 rounded-full mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Keranjang Kosong</h3>
            <p className="text-slate-400 mb-8">Belum ada produk yang dipilih.</p>
            <Link 
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primaryHover transition-colors font-medium"
            >
              Mulai Belanja
            </Link>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

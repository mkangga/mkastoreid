
import React, { useState, useEffect } from 'react';
import { Send, CreditCard, Clock, User, ShoppingBag, Info } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { config, products } from '../siteConfig';

export const OrderForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productFromUrl = searchParams.get('product') || '';

  const [name, setName] = useState('');
  const [product, setProduct] = useState(productFromUrl);
  const [duration, setDuration] = useState('1 Bulan');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');

  // Update product state jika URL berubah (misal dari klik tombol Beli di card)
  useEffect(() => {
    if (productFromUrl) {
      setProduct(productFromUrl);
    }
  }, [productFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = name.trim() || 'Pembeli';
    const finalProduct = product || 'Belum dipilih';

    const message = `Halo kak, saya ${finalName}, tertarik beli akun ${finalProduct} durasi ${duration}, metode pembayaran ${paymentMethod}. Bisa tau dulu harganya berapa?`;
    
    const waLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waLink, '_blank');
  };

  return (
    <section className="bg-slate-900 border-t border-slate-800 rounded-3xl mx-auto max-w-4xl overflow-hidden shadow-2xl">
      <div className="p-6 md:p-10 relative">
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-6">
               {/* Produk (Dropdown Select) */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <ShoppingBag size={16} /> Pilih Produk
                </label>
                <div className="relative">
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer"
                  >
                    <option value="" disabled>-- Pilih Layanan Premium --</option>
                    {products.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} ({item.priceStart})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <User size={16} /> Nama Anda (Opsional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              {/* Durasi */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <Clock size={16} /> Durasi Langganan
                </label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer"
                  >
                    <option value="1 Bulan">1 Bulan</option>
                    <option value="2 Bulan">2 Bulan</option>
                    <option value="3 Bulan">3 Bulan</option>
                    <option value="6 Bulan">6 Bulan</option>
                    <option value="1 Tahun">1 Tahun</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Metode Pembayaran */}
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
                    . Anda bisa cek dulu sebelum atau sesudah chat admin.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
             {/* Tombol Submit */}
            <button
              type="submit"
              disabled={!product}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                product 
                  ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Lanjut ke WhatsApp</span>
              <Send size={20} />
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Anda akan diarahkan ke WhatsApp admin untuk konfirmasi harga total dan pembayaran.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

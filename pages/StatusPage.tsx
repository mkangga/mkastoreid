
import React, { useState } from 'react';
import { Search, Send, Loader2 } from 'lucide-react';
import { config } from '../siteConfig';
import { PageTransition } from '../components/PageTransition';

export const StatusPage: React.FC = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi loading sebentar biar kerasa 'ngecek'
    setTimeout(() => {
      const finalName = name.trim() || 'Kak';
      const message = `Halo Admin MKA Store, saya mau cek status pesanan saya atas nama "${finalName}". Apakah sudah diproses?`;
      const waLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(waLink, '_blank');
      setIsLoading(false);
    }, 800);
  };

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">Cek Status Pesanan</h1>
          <p className="text-slate-400">
            Sudah transfer tapi belum dapat akun atau pulsa belum masuk? Cek status pesananmu langsung ke Admin.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
           {/* Decorative bg */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

          <form onSubmit={handleCheck} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Nama Pemesan (Sesuai Transfer)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama anda..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isLoading || !name.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-brand-primary hover:bg-blue-600 text-white shadow-lg shadow-brand-primary/25 hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Memproses...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Cek via WhatsApp
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
             <p className="text-xs text-slate-500">
               Sistem kami akan mengarahkan anda ke WhatsApp Admin dengan format pesan yang sudah disiapkan.
             </p>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

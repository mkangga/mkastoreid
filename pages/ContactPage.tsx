
import React from 'react';
import { MessageCircle, Clock, CheckCircle2, AlertCircle, Moon, Sun } from 'lucide-react';
import { config } from '../siteConfig';
import { PageTransition } from '../components/PageTransition';

export const ContactPage: React.FC = () => {
  return (
    <PageTransition className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Hubungi Kami</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Butuh bantuan atau ingin memesan langsung? Tim kami siap melayani Anda.
          </p>
        </div>

        {/* --- STATUS BANNER --- */}
        <div className={`mb-10 p-4 rounded-xl flex items-center justify-center gap-3 border ${
          config.status.isOnline 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-slate-800 border-slate-700 text-slate-400'
        }`}>
          {config.status.isOnline ? <Sun size={24} className="animate-pulse" /> : <Moon size={24} />}
          <span className="font-bold text-lg">
            {config.status.isOnline ? config.status.onlineMessage : config.status.offlineMessage}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-green-500/50 transition-colors shadow-lg">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Chat WhatsApp</h2>
            <p className="text-slate-400 mb-8">
              Respon cepat untuk pemesanan akun premium, transaksi PPOB, klaim garansi, atau tanya jawab seputar produk.
            </p>
            
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-4 font-bold rounded-xl text-center transition-colors ${
                config.status.isOnline 
                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {config.status.isOnline ? 'Chat Admin Sekarang' : 'Tinggalkan Pesan (Slow Respon)'}
            </a>
            
            {!config.status.isOnline && (
              <p className="text-xs text-center text-slate-500 mt-4">
                Admin sedang istirahat, pesan anda akan dibalas saat online kembali.
              </p>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">Informasi Layanan</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-brand-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Jam Operasional</h4>
                  <p className="text-slate-400 text-sm mt-1">{config.footer.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Proses Transaksi</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    Transfer &rarr; Konfirmasi &rarr; Akun Dikirim. Proses 5-10 menit saat admin online.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-brand-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Metode Pembayaran</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    Menerima QRIS, E-Wallet (Dana, GoPay, OVO, ShopeePay) dan Transfer Bank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

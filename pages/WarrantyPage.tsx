
import React from 'react';
import { ShieldCheck, MessageSquare, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { config } from '../siteConfig';
import { PageTransition } from '../components/PageTransition';

export const WarrantyPage: React.FC = () => {
  const handleClaim = () => {
    const message = "Halo Admin, saya mau klaim garansi untuk akun [Sebutkan Produk]. Berikut lampiran bukti kendalanya:";
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <PageTransition className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6">
            <ShieldCheck className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Garansi & Layanan Purna Jual</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Kami berkomitmen memberikan pengalaman terbaik. Jika terjadi kendala pada akun Anda, kami siap membantu hingga tuntas.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-primary text-white font-bold flex items-center justify-center rounded-full shadow-lg">1</div>
            <div className="mb-4 text-brand-accent"><AlertTriangle size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-2">Screenshot Kendala</h3>
            <p className="text-slate-400 text-sm">
              Jika akun tidak bisa diakses, atau pulsa/token belum masuk dalam 10 menit, segera screenshot bukti transaksi/kendala.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-primary text-white font-bold flex items-center justify-center rounded-full shadow-lg">2</div>
            <div className="mb-4 text-brand-accent"><MessageSquare size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-2">Chat Admin</h3>
            <p className="text-slate-400 text-sm">
              Kirimkan bukti screenshot dan email akun yang bermasalah ke WhatsApp Admin. Gunakan tombol klaim di bawah.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
             <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-primary text-white font-bold flex items-center justify-center rounded-full shadow-lg">3</div>
            <div className="mb-4 text-brand-accent"><Clock size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-2">Tunggu Perbaikan</h3>
            <p className="text-slate-400 text-sm">
              Admin akan segera mengecek. Proses perbaikan/penggantian akun biasanya memakan waktu 5 - 30 menit.
            </p>
          </div>
        </div>

        {/* Rules Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <ShieldCheck className="text-green-500" />
            Syarat & Ketentuan Garansi
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-slate-300">Garansi berlaku <strong>FULL</strong> sesuai durasi sewa (misal beli 1 bulan, garansi 1 bulan).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-slate-300">Dilarang mengubah <strong>Email & Password</strong> akun (untuk akun Sharing/Private tertentu).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-slate-300">Dilarang login melebihi batas device yang ditentukan (1 Device = 1 Perangkat).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-slate-300">Garansi <strong>Uang Kembali</strong> jika transaksi PPOB gagal dari server pusat.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-slate-300">Komplain PPOB maksimal <strong>1x24 Jam</strong> setelah transaksi dinyatakan sukses.</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={handleClaim}
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-red-900/20 transition-transform hover:-translate-y-1 active:scale-95"
          >
            <MessageSquare size={24} />
            Klaim Garansi via WhatsApp
          </button>
          <p className="mt-4 text-slate-500 text-sm">
            Admin akan merespon secepatnya pada jam operasional (08.00 - 22.00 WIB).
          </p>
        </div>

      </div>
    </PageTransition>
  );
};

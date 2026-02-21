
import React from 'react';
import { TrendingUp, Users, Wallet, ShieldCheck, MessageCircle } from 'lucide-react';
import { config } from '../siteConfig';

export const ResellerPage: React.FC = () => {
  const handleJoin = () => {
    const message = "Halo Admin, saya tertarik join Reseller MKA Store. Boleh info syarat dan ketentuannya?";
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const benefits = [
    {
      icon: Wallet,
      title: "Harga Modal Termurah",
      desc: "Dapatkan harga khusus reseller yang jauh lebih murah dari harga ecer. Margin keuntungan besar!"
    },
    {
      icon: ShieldCheck,
      title: "Full Garansi",
      desc: "Produk aman dan bergaransi. Anda tidak perlu pusing dimarahi customer karena akun bermasalah."
    },
    {
      icon: Users,
      title: "Grup Support",
      desc: "Bergabung dengan komunitas reseller lain. Sharing tips jualan dan update stok real-time."
    },
    {
      icon: TrendingUp,
      title: "Prioritas Transaksi",
      desc: "Pesanan reseller diproses lebih cepat (Fast Lane) agar customer anda tidak menunggu lama."
    }
  ];

  return (
    <div className="page-enter pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Reseller */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 mb-6 border border-brand-accent/30 rounded-full bg-brand-accent/10">
            <span className="text-brand-accent text-sm font-semibold tracking-wide uppercase">
              Program Mitra MKA Store
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Cari Cuan Tambahan? <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              Gabung Jadi Reseller!
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Tanpa stok barang, tanpa ribet, modal HP aja. Mulai bisnis produk digital & PPOB sekarang bersama supplier terpercaya.
          </p>
          <button 
            onClick={handleJoin}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1 hover:shadow-green-500/30"
          >
            <MessageCircle size={24} />
            Daftar Reseller Sekarang
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-brand-primary/50 transition-colors group">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Simulasi Cuan */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

           <h2 className="text-3xl font-bold text-white mb-8 relative z-10">Simulasi Keuntungan</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
             
             {/* Card 1 */}
             <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <div className="text-sm text-slate-500 mb-2">Jual 1 Akun/Hari</div>
                <div className="text-2xl font-bold text-white mb-1">Rp 150.000</div>
                <div className="text-xs text-brand-accent">Profit / Bulan</div>
             </div>

             {/* Card 2 (Highlight) */}
             <div className="p-6 bg-slate-950/80 rounded-2xl border border-brand-primary/50 shadow-lg shadow-brand-primary/10 transform md:scale-110 relative z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Target Santai
                </div>
                <div className="text-sm text-brand-accent font-bold mb-2">Jual 5 Akun/Hari</div>
                <div className="text-3xl font-bold text-white mb-1">Rp 750.000</div>
                <div className="text-xs text-brand-accent">Profit / Bulan</div>
             </div>

             {/* Card 3 */}
             <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <div className="text-sm text-slate-500 mb-2">Jual 10 Akun/Hari</div>
                <div className="text-2xl font-bold text-white mb-1">Rp 1.500.000+</div>
                <div className="text-xs text-brand-accent">Profit / Bulan</div>
             </div>
           </div>
           
           <p className="mt-8 text-slate-500 text-sm relative z-10 max-w-xl mx-auto">
             *Estimasi keuntungan rata-rata Rp 5.000 per akun. Keuntungan bisa lebih besar tergantung harga jual yang anda tentukan ke pelanggan.
           </p>
        </div>

      </div>
    </div>
  );
};

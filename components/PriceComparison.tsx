
import React from 'react';
import { Check, TrendingDown } from 'lucide-react';

const comparisons = [
  {
    name: "Netflix Premium (4K)",
    officialPrice: "Rp 186.000",
    ourPrice: "Rp 40.000",
    savings: "Rp 146.000",
  },
  {
    name: "Spotify Premium",
    officialPrice: "Rp 54.990",
    ourPrice: "Rp 20.000",
    savings: "Rp 34.990",
  },
  {
    name: "YouTube Premium",
    officialPrice: "Rp 59.000",
    ourPrice: "Rp 10.000",
    savings: "Rp 49.000",
  },
  {
    name: "Canva Pro (1 Tahun)",
    officialPrice: "Rp 769.000",
    ourPrice: "Rp 25.000",
    savings: "Rp 744.000",
  },
];

export const PriceComparison: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-xl mb-4 text-red-500">
             <TrendingDown size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kenapa Bayar Mahal?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Bandingkan harga resmi dengan harga MKA Store. Hemat hingga 80% untuk fitur premium yang sama!
          </p>
        </div>

        <div className="overflow-hidden bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl">
          {/* Header Tabel */}
          <div className="grid grid-cols-4 bg-slate-900/80 border-b border-slate-800 p-4 text-[10px] sm:text-sm font-bold text-slate-300 uppercase tracking-wider text-center backdrop-blur-sm">
            <div className="col-span-1 text-left pl-2 sm:pl-4">Produk</div>
            <div className="col-span-1 text-red-400">Harga Resmi</div>
            <div className="col-span-1 text-green-400">MKA Store</div>
            <div className="col-span-1 text-brand-accent">Hemat</div>
          </div>
          
          {/* Isi Tabel */}
          <div className="divide-y divide-slate-800">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 p-4 md:p-6 items-center hover:bg-slate-900/30 transition-colors">
                {/* Nama Produk */}
                <div className="col-span-1 font-bold text-white text-xs sm:text-lg pl-2 sm:pl-4">{item.name}</div>
                
                {/* Harga Resmi */}
                <div className="col-span-1 text-center flex flex-col items-center justify-center">
                   <span className="text-slate-500 line-through decoration-red-500/50 text-xs sm:text-base">{item.officialPrice}</span>
                </div>
                
                {/* Harga Kita */}
                <div className="col-span-1 text-center font-bold text-green-400 text-sm sm:text-xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                   {item.ourPrice}
                   <div className="bg-green-500/10 p-0.5 rounded-full hidden sm:block">
                      <Check size={14} className="text-green-500" />
                   </div>
                </div>
                
                {/* Hemat */}
                 <div className="col-span-1 flex justify-center">
                    <span className="font-bold text-brand-accent text-[10px] sm:text-sm bg-brand-primary/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-brand-primary/20">
                      {item.savings}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-500">*Harga resmi berdasarkan data website official per bulan.</p>
        </div>
      </div>
    </section>
  );
};

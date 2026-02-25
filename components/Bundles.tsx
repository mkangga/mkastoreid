import React from 'react';
import { Package, Plus, Sparkles } from 'lucide-react';
import { config } from '../siteConfig';

const bundles = [
  {
    title: "Paket Nonton Puas",
    description: "Netflix Sharing 1 Profile + Viu 12 Bulan.",
    items: [
      { name: "Netflix Premium", img: "https://i.imgur.com/fEegJrC.png" },
      { name: "Viu Premium", img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Viu_logo.svg" }
    ],
    oldPrice: "Rp 55.000",
    newPrice: "Rp 52.000",
    save: "Rp 3.000",
    color: "from-red-500/20 to-yellow-500/20",
    borderColor: "hover:border-yellow-500/50"
  },
  {
    title: "Paket Produktif",
    description: "Canva Pro Edu 1 Tahun + Spotify 1 Bulan.",
    items: [
      { name: "Canva Pro", img: "https://public.canva.site/logo/media/dfb96cc174513093cd6ed61489ccb750.svg" },
      { name: "Spotify Premium", img: "https://i.imgur.com/1b57Ych.png" }
    ],
    oldPrice: "Rp 45.000",
    newPrice: "Rp 42.000",
    save: "Rp 3.000",
    color: "from-cyan-500/20 to-green-500/20",
    borderColor: "hover:border-green-500/50"
  },
  {
    title: "Paket YouTube Mania",
    description: "YouTube Premium + YouTube Music (1 Bulan).",
    items: [
      { name: "YouTube Premium", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/YouTube_Premium_logo.svg/960px-YouTube_Premium_logo.svg.png?20180923014634" },
      { name: "YouTube Music", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/2048px-Youtube_Music_icon.svg.png" }
    ],
    oldPrice: "Rp 15.000",
    newPrice: "Rp 10.000", 
    save: "Hemat",
    color: "from-red-600/20 to-red-900/20",
    borderColor: "hover:border-red-500/50"
  }
];

export const Bundles: React.FC = () => {
  const handleBuy = (bundleName: string) => {
    const message = `Halo Admin, saya mau ambil promo bundling "${bundleName}". Masih tersedia?`;
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
              <Sparkles size={14} />
              Hemat Combo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Paket Bundling Spesial</h2>
            <p className="text-slate-400">
              Ambil lebih banyak, bayar lebih murah. Promo terbatas!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle, idx) => (
            <div 
              key={idx} 
              className={`relative bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${bundle.borderColor} group`}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${bundle.color} opacity-20 pointer-events-none transition-opacity group-hover:opacity-30`}></div>
              
              {/* Badge Save */}
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                Hemat {bundle.save}
              </div>

              {/* Icons Combo */}
              <div className="flex items-center justify-center gap-4 mb-8 relative z-10 mt-4">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl p-2 shadow-lg flex items-center justify-center border border-slate-700">
                   <img src={bundle.items[0].img} alt={bundle.items[0].name} className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 shadow-lg z-20">
                  <Plus size={16} />
                </div>
                <div className="w-16 h-16 bg-slate-800 rounded-2xl p-2 shadow-lg flex items-center justify-center border border-slate-700">
                   <img src={bundle.items[1].img} alt={bundle.items[1].name} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">{bundle.title}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{bundle.description}</p>
                
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-slate-500 line-through text-sm">{bundle.oldPrice}</span>
                  <span className="text-2xl font-bold text-white">{bundle.newPrice}</span>
                </div>

                <button 
                  onClick={() => handleBuy(bundle.title)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-brand-primary text-white font-bold transition-all border border-slate-700 hover:border-brand-primary flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-brand-primary/20"
                >
                  <Package size={18} />
                  Ambil Promo Ini
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

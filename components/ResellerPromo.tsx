
import React from 'react';
import { ArrowRight, Crown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResellerPromo: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-lg shadow-yellow-500/20 group">
          
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-6">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-white/20">
                <Crown size={14} className="text-yellow-200" />
                Open Reseller
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                Mau Harga Lebih Murah? <br className="hidden md:block" />
                <span className="text-yellow-100">Gabung Mitra MKA Store Aja!</span>
              </h2>
              <p className="text-white/90 text-sm md:text-base max-w-xl">
                Dapatkan akses harga modal termurah, grup support eksklusif, dan prioritas layanan. Cocok untuk pelajar, mahasiswa, atau sampingan pekerja.
              </p>
            </div>

            {/* Right Action */}
            <div className="flex-shrink-0">
              <Link 
                to="/reseller"
                className="flex items-center gap-2 bg-white text-yellow-700 hover:text-yellow-800 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold shadow-xl transition-transform transform hover:-translate-y-1 active:scale-95"
              >
                <TrendingUp size={20} />
                Cek Keuntungan Reseller
                <ArrowRight size={20} />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/10 backdrop-blur-sm shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <span className="text-brand-accent text-sm font-semibold tracking-wide uppercase">
              {config.hero.title}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            {config.hero.subtitle}
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            {config.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-primary rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-brand-primary/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-dark"
            >
              Lihat Produk
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-800 hover:text-white hover:border-slate-500 focus:outline-none"
            >
              Hubungi Admin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
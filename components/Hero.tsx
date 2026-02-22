import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-brand-primary/30 rounded-full bg-brand-primary/10 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-brand-accent text-xs font-bold tracking-wide uppercase font-heading">
              {config.hero.title}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-tight font-heading drop-shadow-2xl">
            Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Digital</span> <br className="hidden md:block" />
            Terlengkap
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-brand-muted mb-12 leading-relaxed font-light">
            {config.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-brand-primary rounded-full hover:bg-brand-primaryHover hover:shadow-lg hover:shadow-brand-primary/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-dark active:scale-95"
            >
              Belanja Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-lg hover:-translate-y-1 focus:outline-none active:scale-95 backdrop-blur-sm"
            >
              Hubungi Admin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
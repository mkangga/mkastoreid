
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Home, Phone, Grid, CreditCard, HelpCircle } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Style untuk link mobile bottom nav
  const bottomNavClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 active:scale-95 ${
      isActive ? 'text-brand-accent' : 'text-slate-400 hover:text-slate-200'
    }`;

  // Status Badge Component (Reusable)
  const StatusBadge = () => (
    <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ml-4 transition-all ${
      config.status.isOnline 
        ? 'bg-green-500/10 border-green-500/20 text-green-500' 
        : 'bg-red-500/10 border-red-500/20 text-red-500'
    }`}>
      <span className="relative flex h-2 w-2">
        {config.status.isOnline && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.status.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </span>
      {config.status.isOnline ? 'Online' : 'Offline'}
    </div>
  );

  return (
    <>
      {/* --- TOP HEADER (Logo & Desktop Menu) --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl shadow-black/20'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* LOGO & STATUS */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group z-50">
                {config.logoUrl ? (
                  <img 
                    src={config.logoUrl} 
                    alt={config.name} 
                    className="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-lg"
                  />
                ) : (
                  <>
                    <div className="bg-brand-primary p-2 rounded-xl shadow-lg shadow-brand-primary/20 group-hover:bg-brand-primaryHover transition-colors">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight font-heading">
                      {config.name}
                    </span>
                  </>
                )}
              </Link>
              
              {/* Status Badge (Desktop & Tablet) */}
              <StatusBadge />
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
              <NavLink to="/" className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                Beranda
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                Produk
              </NavLink>
              <NavLink to="/reseller" className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                Reseller
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </NavLink>
              <NavLink to="/payment" className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                Bayar
              </NavLink>
              <NavLink to="/faq" className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                FAQ
              </NavLink>
            </nav>
              
            {/* CTA Button */}
            <div className="hidden md:block">
              <a 
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-brand-dark text-sm font-bold rounded-full transition-all duration-300 hover:bg-brand-accent hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transform hover:-translate-y-0.5"
              >
                Hubungi Admin
              </a>
            </div>

            {/* Mobile Status Dot (Visible only on mobile header) */}
            <div className="md:hidden flex items-center">
               <span className={`flex h-3 w-3 relative`}>
                {config.status.isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${config.status.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 z-50 h-[72px] pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        <div className="grid grid-cols-5 h-full">
          <NavLink to="/" className={bottomNavClass}>
            <Home size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Beranda</span>
          </NavLink>
          <NavLink to="/products" className={bottomNavClass}>
            <Grid size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Produk</span>
          </NavLink>
           <NavLink to="/payment" className={bottomNavClass}>
            <CreditCard size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Bayar</span>
          </NavLink>
          <NavLink to="/faq" className={bottomNavClass}>
            <HelpCircle size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">FAQ</span>
          </NavLink>
          <NavLink to="/contact" className={bottomNavClass}>
            <Phone size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Kontak</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};
